# Asset Drop Guide

Place production art under `assets/` using these suggested paths. The app runs without them using gradient and emoji fallbacks.

| Asset | Path | Notes |
|-------|------|-------|
| App icon | `assets/images/icon.png` | 1024×1024 |
| Splash | `assets/images/splash-icon.png` | Centered logo |
| Dog body sprites | `assets/dogs/{pose}-{style}.png` | front/side poses for sporty, fluffy, adventurer |
| Map pins | `assets/map/{location}.png` | backyard, park, beach, mountain, downtown |
| Accessory overlays | `assets/accessories/{pose}-{id}.png` | transparent front/side overlays: bandana, sunglasses, etc. |
| Mini-game banners | `assets/games/{gameId}.png` | Optional card art |
| SFX | `assets/sounds/{id}.mp3` | tap, win, levelup, coin |

Runtime SVG source layers are documented in `assets/avatar/layers/README.md`.
Wire sounds in `lib/sounds.ts` via `expo-av` when files are added.
