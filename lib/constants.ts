import type { AccessoryId, Badge, GameDefinition, MapLocation, Quest } from './types';

export const MAX_ENERGY = 10;
export const ENERGY_REFILL_MS = 5 * 60 * 1000;
export const DAILY_REWARD_BASE = 25;

export const DOG_STYLES = [
  { id: 'sporty' as const, label: 'Sporty', emoji: '🏃', color: '#FF8C42' },
  { id: 'fluffy' as const, label: 'Fluffy', emoji: '🐩', color: '#F4A6D7' },
  { id: 'adventurer' as const, label: 'Adventurer', emoji: '🎒', color: '#4ECDC4' },
];

export const PLAY_STYLES = [
  { id: 'explorer' as const, label: 'Explorer', emoji: '🗺️', bonus: 'Map XP +20%' },
  { id: 'trainer' as const, label: 'Trainer', emoji: '🎯', bonus: 'Training game coins +20%' },
  { id: 'social' as const, label: 'Social', emoji: '🐾', bonus: 'Daycare streak bonus' },
];

export const FUR_COLORS = ['#C68642', '#8B5A2B', '#F5DEB3', '#4A3728', '#E8C39E', '#2F4F4F'];

export const GAMES: GameDefinition[] = [
  {
    id: 'treat-hunt',
    title: 'Treat Hunt',
    description: 'Tap treats before they vanish!',
    energyCost: 2,
    emoji: '🦴',
    baseCoins: 12,
    baseXp: 15,
  },
  {
    id: 'grooming',
    title: 'Grooming Glow-Up',
    description: 'Swipe to brush and sparkle your pup.',
    energyCost: 2,
    emoji: '✨',
    baseCoins: 10,
    baseXp: 12,
  },
  {
    id: 'daycare-dash',
    title: 'Dog Daycare Dash',
    description: 'Guide pups to the right play zones.',
    energyCost: 3,
    emoji: '🏫',
    baseCoins: 18,
    baseXp: 20,
  },
  {
    id: 'training-quest',
    title: 'Training Quest',
    description: 'Repeat the trick sequence!',
    energyCost: 2,
    emoji: '🎓',
    baseCoins: 14,
    baseXp: 18,
  },
  {
    id: 'guess-breed',
    title: 'Guess the Breed',
    description: 'Match the pup to its breed.',
    energyCost: 1,
    emoji: '🔍',
    baseCoins: 8,
    baseXp: 10,
  },
  {
    id: 'beach-recall',
    title: 'Beach Recall Run',
    description: 'Call your dog back from the surf!',
    energyCost: 3,
    emoji: '🏖️',
    baseCoins: 20,
    baseXp: 22,
  },
];

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'backyard',
    name: 'Backyard Playpen',
    description: 'Where every adventure begins. Practice tricks and chase squirrels.',
    unlockLevel: 1,
    emoji: '🏡',
  },
  {
    id: 'park',
    name: 'Sunset Park',
    description: 'Wide open fields for fetch and new friends.',
    unlockLevel: 2,
    emoji: '🌳',
  },
  {
    id: 'beach',
    name: 'Fitdog Beach',
    description: 'Sandy paws, rolling waves, and recall training.',
    unlockLevel: 3,
    emoji: '🏖️',
  },
  {
    id: 'mountain',
    name: 'Canyon Hike',
    description: 'A moderate trail through Santa Monica Mountains.',
    unlockLevel: 4,
    emoji: '⛰️',
  },
  {
    id: 'downtown',
    name: 'Downtown Daycare',
    description: 'The bustling hub for social pups and group classes.',
    unlockLevel: 5,
    emoji: '🏙️',
  },
];

export const ACCESSORIES: { id: AccessoryId; name: string; price: number; emoji: string }[] = [
  { id: 'bandana', name: 'Blue Paw Bandana', price: 50, emoji: '🔷' },
  { id: 'sunglasses', name: 'Cool Shades', price: 80, emoji: '🕶️' },
  { id: 'backpack', name: 'Trail Pack', price: 120, emoji: '🎒' },
  { id: 'bowtie', name: 'Fancy Bowtie', price: 60, emoji: '🎀' },
  { id: 'crown', name: 'Goodest Crown', price: 200, emoji: '👑' },
];

export function createDefaultQuests(): Quest[] {
  return [
    {
      id: 'play-3',
      title: 'Playtime Pro',
      description: 'Play 3 mini-games',
      target: 3,
      progress: 0,
      rewardCoins: 30,
      rewardXp: 25,
      claimed: false,
    },
    {
      id: 'earn-100',
      title: 'Coin Collector',
      description: 'Earn 100 coins total',
      target: 100,
      progress: 0,
      rewardCoins: 40,
      rewardXp: 30,
      claimed: false,
    },
    {
      id: 'visit-2',
      title: 'Trail Blazer',
      description: 'Visit 2 map locations',
      target: 2,
      progress: 0,
      rewardCoins: 25,
      rewardXp: 20,
      claimed: false,
    },
  ];
}

export function createDefaultBadges(): Badge[] {
  return [
    { id: 'first-game', title: 'First Fetch', description: 'Play your first mini-game', unlocked: false },
    { id: 'level-2', title: 'Growing Pup', description: 'Reach level 2', unlocked: false },
    { id: 'level-5', title: 'Top Dog', description: 'Reach level 5', unlocked: false },
    { id: 'streak-3', title: 'Loyal Companion', description: '3-day daily streak', unlocked: false },
    { id: 'shopper', title: 'Fashion Hound', description: 'Buy an accessory', unlocked: false },
    { id: 'explorer', title: 'World Wanderer', description: 'Visit all map locations', unlocked: false },
  ];
}

export function xpForLevel(level: number): number {
  return level * 50;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  let needed = xpForLevel(level);
  while (xp >= needed) {
    level += 1;
    needed += xpForLevel(level);
  }
  return level;
}

export function xpProgressInLevel(xp: number): { current: number; needed: number; level: number } {
  const level = levelFromXp(xp);
  let spent = 0;
  for (let l = 1; l < level; l += 1) {
    spent += xpForLevel(l);
  }
  const needed = xpForLevel(level);
  return { current: xp - spent, needed, level };
}
