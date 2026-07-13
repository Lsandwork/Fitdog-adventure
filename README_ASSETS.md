# Asset Drop Guide

| Asset | Path | Notes |
|-------|------|-------|
| **Fitdog avatar (required)** | `public/assets/avatar/fitdog-avatar.png` **and** `assets/avatar/fitdog-avatar.png` | Exact uploaded PNG only. Same file in both places. Transparent BG. Never recreate. |
| App icon | `assets/images/icon.png` | 1024×1024 |
| Splash | `assets/images/splash-icon.png` | Centered logo |
| Map pins | `assets/map/{location}.png` | Optional location art |
| Accessory shop icons | `assets/accessories/{id}.png` | Optional shop list icons only — not drawn on the avatar |
| Mini-game banners | `assets/games/{gameId}.png` | Optional card art |
| SFX | `assets/sounds/{id}.mp3` | tap, win, levelup, coin |

## Avatar rules

- The app must load `/assets/avatar/fitdog-avatar.png` (web) / bundled `assets/avatar/fitdog-avatar.png` (native).
- Use `resizeMode="contain"` / `object-fit: contain`. Never crop or stretch.
- Do not use SVG dog bodies, emoji dogs, or generated character art for the avatar.
- Shop accessories may still be listed as items, but they are **not** composited onto the official avatar image.

Wire sounds in `lib/sounds.ts` via `expo-av` when files are added.
