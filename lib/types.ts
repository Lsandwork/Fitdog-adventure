export type DogStyle = 'sporty' | 'fluffy' | 'adventurer';
export type PlayStyle = 'explorer' | 'trainer' | 'social';

export type GameId =
  | 'treat-hunt'
  | 'grooming'
  | 'daycare-dash'
  | 'training-quest'
  | 'guess-breed'
  | 'beach-recall';

export type AccessoryId = 'bandana' | 'sunglasses' | 'backpack' | 'bowtie' | 'crown';

export interface Quest {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  rewardCoins: number;
  rewardXp: number;
  claimed: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  unlockLevel: number;
  emoji: string;
}

export interface GameDefinition {
  id: GameId;
  title: string;
  description: string;
  energyCost: number;
  emoji: string;
  baseCoins: number;
  baseXp: number;
}

export interface GameState {
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
  quests: Quest[];
  badges: Badge[];
  visitedLocations: string[];
  hydrated: boolean;
}
