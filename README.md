# Fitdog Adventure World

A polished Expo React Native game MVP where anyone can adopt a virtual dog, play mini-games, earn coins and XP, unlock badges, customize their pup, and explore Fitdog-inspired adventure worlds.

## Features

- Expo Router tab app for iOS and Android
- First-run onboarding with dog naming, style selection, and play-style choice
- Persistent local save data with Zustand and AsyncStorage
- Daily rewards, streaks, energy refill, quests, XP, leveling, badges, and accessory unlocks
- Playable mini-games: Treat Hunt, Grooming Glow-Up, Dog Daycare Dash, Training Quest, Guess the Breed, and Beach Recall Run
- Avatar customization and coin-only shop
- Adventure map with unlock rules, location details, and progress
- Haptic feedback, animation hooks, confetti bursts, level-up rewards, and sound-ready hooks
- No backend, no login, no real-money purchases, no loot boxes

## Setup

```bash
npm install
npx expo start
```

Then open the app in Expo Go or a simulator from the Expo CLI.

## Useful Commands

```bash
npm run typecheck
npm run lint
npx expo start
```

## Manual Test Checklist

1. Start a fresh install and complete onboarding.
2. Claim the daily reward and confirm coins/streak update.
3. Play every mini-game and confirm score, coins, XP, energy, and high scores update.
4. Reach level 2 and confirm level-up rewards/unlocks appear.
5. Visit the map and open each location detail.
6. Customize the pup, buy an accessory with coins, and confirm it stays equipped after restart.
7. Claim completed quests from Home or Rewards.
8. Spend energy below a game cost and confirm practice mode still allows play.
9. Restart the app and verify progress persists.

## Assets

See `README_ASSETS.md` for the Firefly/production asset drop locations and suggested filenames. The app currently uses built-in gradient/vector fallback artwork, so it runs cleanly without any external image files.
# Fitdog-adventure
