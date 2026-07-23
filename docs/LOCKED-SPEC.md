# LOCKED-SPEC — Vanguard Performance Labs

The governing product spec is `docs/VANGUARD-SPEC.md` (visual + section spec). This file locks the
distinctions and the current build state so no future session drifts.

## Project boundary (permanent)
- Vanguard Performance Labs = the website being built (public company brand + commerce-adjacent B2B).
- Peptastic = a Vanguard software product, showcased here; never the parent brand or homepage.
- Throne / Jarvis / Kai / SARGE = excluded from Vanguard entirely (code, copy, nav, assets, metadata).

## Current implementation state (as delivered)
- Next.js 14 App Router + TypeScript + Tailwind. 12 nav routes + dynamic education/products + /api/inquiry.
- Hero = BLENDED composition: cinematic hero (Jessie + winged vial centerpiece + concierge + trust strip)
  on top; Peptastic OS dashboard section below.
- Palette currently cyan/blue via design tokens. Purple/gold swap is a token change (see DECISIONS.md).
- Brand artwork (Jessie, winged vial, logo) are SVG stand-ins in components/brand.tsx — swappable for
  approved raster/render assets without layout change.

## What "done" means
Matches the approved reference images in `reference/` AND passes typecheck/lint/build/Playwright.
Code passing alone is not done.
