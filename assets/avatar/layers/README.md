# Avatar layer source notes

The runtime avatar is composed from SVG layers in `components/AccessoryOverlay.tsx`.
Those layers are modeled after the two dog references provided in chat:

- `front` pose: happy forward-facing golden pup with cream muzzle/belly and blue paw bandana.
- `side` pose: right-facing golden pup with the same cream markings and bandana.

Layer order:

1. Back accessories (`backpack`)
2. Dog base artwork (`DogBodySvg`)
3. Front accessories (`bandana`, `bowtie`, `sunglasses`, `crown`)
4. Interaction overlays (`hearts`, speech bubbles)

When production raster art is available, export transparent PNGs with the same
front/side pose alignment and replace the SVG body/accessory layers without
changing the store or shop/profile equip flow.
