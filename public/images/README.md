# Drop approved artwork here

The site renders SVG stand-ins until a real file exists AND is registered in `lib/assets.ts`.
Nothing breaks if a file is missing — but nothing upgrades until you register it.

## Required files

| Put file here | Register in lib/assets.ts as | Notes |
|---|---|---|
| `concierge/jessie-hero.webp` | `jessieHero` | Waist-up cinematic Jessie, transparent or dark bg, ~900×1200 |
| `concierge/jessie-portrait.webp` | `jessiePortrait` | Head & shoulders crop, ~480×600 |
| `concierge/jessie-avatar.webp` | `jessieAvatar` | Square face crop, ~128×128 |
| `hero/vanguard-winged-vial.webp` | `heroVial` | Winged vial, TRANSPARENT background, ~1200×900 |
| `brand/vanguard-mark.webp` | `logoMark` | Eagle-V mark, transparent |
| `products/<slug>.webp` | `productImages["<slug>"]` | slugs: bpc-157, tb-500, ghk-cu, cjc-1295, ipamorelin, retatrutide |

## How to register
Open `lib/assets.ts` and uncomment the line under the asset, e.g.

```ts
jessieHero: { src: "/images/concierge/jessie-hero.webp", width: 900, height: 1200 },
```

## Rules
- Transparent PNG/WebP for anything that sits in the hero scene.
- Never regenerate approved character art — crop a different view from the approved sheet.
- Don't stretch Jessie; use the correct crop per variant (hero / portrait / avatar).
