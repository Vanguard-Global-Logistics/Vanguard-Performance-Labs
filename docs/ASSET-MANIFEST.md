# ASSET-MANIFEST — approved references and brand assets

## Approved reference images (visual source of truth)
Place the owner-approved mockups here. If missing, that is recorded below — do NOT fabricate substitutes.
- reference/approved-desktop.png   — STATUS: [MISSING — owner to add the approved desktop splash]
- reference/approved-mobile.png    — STATUS: [MISSING — owner to add the approved mobile splash]
- reference/approved-hero.png      — STATUS: [MISSING — owner to add the approved hero crop]

> Two approved mockups were shared in chat (Image 1 dashboard-forward, Image 2 hero-forward). Export
> those to the filenames above and commit them. Until then, VISUAL-QA compares against these once present.

## Brand assets in code (SVG stand-ins — swappable, do not "regenerate" approved art)
- components/brand.tsx → WingedVial  (gold winged research vial centerpiece; swap for approved render)
- components/brand.tsx → JessiePortrait (swap for approved Jessie artwork; never regenerate)
- components/brand.tsx → VanguardLogo (V-eagle wordmark)
- public/  — drop approved raster/render/video assets here and swap the components. No external hotlinks.

## Rule
Never overwrite an approved reference file if it already exists. If an asset is missing, record it here.


## Canonical character sheet (LOCKED)
- Jessie's canonical reference is the owner-supplied 4-view character sheet (front/back/left/right,
  cream suit, purple blouse, Peptastic mark). NEVER regenerate her; crop from this sheet for any new angle.
- Kai appears on the same sheet — he is Peptastic/admin-only and must NOT appear on the Vanguard site.
- Current crops in public/images/concierge/ are taken from the FRONT panel of this sheet.
- For a voice avatar (Higgsfield/ElevenLabs), generate FROM this sheet as the identity reference.
