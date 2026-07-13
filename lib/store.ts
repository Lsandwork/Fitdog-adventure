import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  createDefaultBadges,
  createDefaultQuests,
  DAILY_REWARD_BASE,
  ENERGY_REFILL_MS,
  GAMES,
  levelFromXp,
  MAX_ENERGY,
  xpForLevel,
} from './constants';
import type { AccessoryId, DogStyle, GameId, PlayStyle } from './types';

interface GameStore {
  onboardingComplete: boolean;
  dogName: string;
  dogStyle: DogStyle;
  playStyle: PlayStyle;
  furColor: string;
  equippedAccessory: AccessoryId | null;
  ownedAccessories: AccessoryId[];
  coins: number;
  xp: number;
  level: number;
  energy: number;
  maxEnergy: number;
  lastEnergyRefill: string;
  dailyStreak: number;
  lastDailyClaim: string | null;
  highScores: Partial<Record<GameId, number>>;
  gamesPlayed: number;
  totalCoinsEarned: number;
  quests: ReturnType<typeof createDefaultQuests>;
  badges: ReturnType<typeof createDefaultBadges>;
  visitedLocations: string[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  completeOnboarding: (name: string, style: DogStyle, play: PlayStyle) => void;
  setFurColor: (color: string) => void;
  refillEnergy: () => void;
  claimDailyReward: () => { ok: boolean; coins: number; streak: number };
  canClaimDaily: () => boolean;
  completeGame: (gameId: GameId, score: number, practice: boolean) => { coins: number; xp: number; leveledUp: boolean };
  buyAccessory: (id: AccessoryId, price: number) => boolean;
  equipAccessory: (id: AccessoryId | null) => void;
  visitLocation: (id: string) => void;
  claimQuest: (id: string) => boolean;
  unlockBadge: (id: string) => void;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      onboardingComplete: false,
      dogName: 'Buddy',
      dogStyle: 'sporty',
      playStyle: 'explorer',
      furColor: '#C68642',
      equippedAccessory: null,
      ownedAccessories: [],
      coins: 50,
      xp: 0,
      level: 1,
      energy: MAX_ENERGY,
      maxEnergy: MAX_ENERGY,
      lastEnergyRefill: new Date().toISOString(),
      dailyStreak: 0,
      lastDailyClaim: null,
      highScores: {},
      gamesPlayed: 0,
      totalCoinsEarned: 0,
      quests: createDefaultQuests(),
      badges: createDefaultBadges(),
      visitedLocations: ['backyard'],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      completeOnboarding: (name, style, play) =>
        set({
          onboardingComplete: true,
          dogName: name.trim() || 'Buddy',
          dogStyle: style,
          playStyle: play,
        }),

      setFurColor: (color) => set({ furColor: color }),

      refillEnergy: () => {
        const state = get();
        const elapsed = Date.now() - new Date(state.lastEnergyRefill).getTime();
        const gained = Math.floor(elapsed / ENERGY_REFILL_MS);
        if (gained <= 0 || state.energy >= state.maxEnergy) return;
        const newEnergy = Math.min(state.maxEnergy, state.energy + gained);
        const usedMs = gained * ENERGY_REFILL_MS;
        set({
          energy: newEnergy,
          lastEnergyRefill: new Date(new Date(state.lastEnergyRefill).getTime() + usedMs).toISOString(),
        });
      },

      canClaimDaily: () => get().lastDailyClaim !== todayKey(),

      claimDailyReward: () => {
        const state = get();
        if (state.lastDailyClaim === todayKey()) return { ok: false, coins: 0, streak: state.dailyStreak };
        let streak = 1;
        if (state.lastDailyClaim === yesterdayKey()) streak = state.dailyStreak + 1;
        const coins = DAILY_REWARD_BASE + streak * 5;
        const newCoins = state.coins + coins;
        const quests = state.quests.map((q) =>
          q.id === 'earn-100' ? { ...q, progress: Math.min(q.target, newCoins) } : q
        );
        set({
          coins: newCoins,
          dailyStreak: streak,
          lastDailyClaim: todayKey(),
          quests,
        });
        if (streak >= 3) get().unlockBadge('streak-3');
        return { ok: true, coins, streak };
      },

      completeGame: (gameId, score, practice) => {
        const state = get();
        const game = GAMES.find((g) => g.id === gameId)!;
        const canSpend = state.energy >= game.energyCost;
        const isPractice = practice || !canSpend;

        if (!isPractice) {
          set({ energy: state.energy - game.energyCost });
        }

        const multiplier = 0.5 + Math.min(score, 100) / 100;
        let coins = Math.round(game.baseCoins * multiplier);
        let xp = Math.round(game.baseXp * multiplier);

        if (state.playStyle === 'trainer' && gameId === 'training-quest') {
          coins = Math.round(coins * 1.2);
        }
        if (isPractice) {
          coins = Math.round(coins * 0.5);
          xp = Math.round(xp * 0.5);
        }

        const prevLevel = state.level;
        const newXp = state.xp + xp;
        const newLevel = levelFromXp(newXp);
        const newCoins = state.coins + coins;
        const newHigh = Math.max(state.highScores[gameId] ?? 0, score);
        const gamesPlayed = state.gamesPlayed + 1;

        let quests = state.quests.map((q) => {
          if (q.id === 'play-3') return { ...q, progress: Math.min(q.target, gamesPlayed) };
          if (q.id === 'earn-100') return { ...q, progress: Math.min(q.target, state.totalCoinsEarned + coins) };
          return q;
        });

        set({
          coins: newCoins,
          xp: newXp,
          level: newLevel,
          highScores: { ...state.highScores, [gameId]: newHigh },
          gamesPlayed,
          totalCoinsEarned: state.totalCoinsEarned + coins,
          quests,
        });

        if (gamesPlayed === 1) get().unlockBadge('first-game');
        if (newLevel >= 2) get().unlockBadge('level-2');
        if (newLevel >= 5) get().unlockBadge('level-5');

        return { coins, xp, leveledUp: newLevel > prevLevel };
      },

      buyAccessory: (id, price) => {
        const state = get();
        if (state.coins < price || state.ownedAccessories.includes(id)) return false;
        set({
          coins: state.coins - price,
          ownedAccessories: [...state.ownedAccessories, id],
          equippedAccessory: id,
        });
        get().unlockBadge('shopper');
        return true;
      },

      equipAccessory: (id) => {
        if (id !== null && !get().ownedAccessories.includes(id)) return;
        set({ equippedAccessory: id });
      },

      visitLocation: (id) => {
        const state = get();
        if (state.visitedLocations.includes(id)) return;
        const visited = [...state.visitedLocations, id];
        const quests = state.quests.map((q) =>
          q.id === 'visit-2' ? { ...q, progress: Math.min(q.target, visited.length) } : q
        );
        set({ visitedLocations: visited, quests });
        if (visited.length >= 5) get().unlockBadge('explorer');
      },

      claimQuest: (id) => {
        const state = get();
        const quest = state.quests.find((q) => q.id === id);
        if (!quest || quest.claimed || quest.progress < quest.target) return false;
        const newXp = state.xp + quest.rewardXp;
        const newLevel = levelFromXp(newXp);
        set({
          coins: state.coins + quest.rewardCoins,
          xp: newXp,
          level: newLevel,
          quests: state.quests.map((q) => (q.id === id ? { ...q, claimed: true } : q)),
        });
        return true;
      },

      unlockBadge: (id) => {
        set({
          badges: get().badges.map((b) => (b.id === id ? { ...b, unlocked: true } : b)),
        });
      },
    }),
    {
      name: 'fitdog-save',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        state?.refillEnergy();
      },
      partialize: (s) => {
        const { hydrated, setHydrated, refillEnergy, ...rest } = s as GameStore & Record<string, unknown>;
        return rest;
      },
    }
  )
);

export function levelUpReward(level: number): number {
  return level * 20;
}
