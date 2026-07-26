# The one vial render you need

The site now draws every label as real text over a photoreal vial. That means you
need **one** base render, not fifty-six — and every product name, size, batch and
accent colour comes from the data, always spelled correctly, always sharp.

## The prompt

```
A single photorealistic pharmaceutical research vial, product photography.

Clear glass vial standing upright, perfectly centred, shot straight-on at eye
level with no perspective tilt. The vial fills the frame vertically with a small
margin at top and bottom.

Matte black flip-off aluminium cap with fine vertical ridges and a few small
water droplets on top. A brushed silver aluminium crimp seal below the cap.
Clear glass body with a bright specular highlight running down the left edge and
a softer one on the right. Empty vial, no powder or liquid inside.

Wrapped around the middle of the vial is a COMPLETELY BLANK matte black label —
no text, no logo, no symbols, no printing of any kind. Pure flat black label
surface. The label occupies the middle portion of the vial body, leaving clear
glass visible above and below it.

Soft studio lighting from the upper left, pure white background, subtle soft
reflection beneath the vial.

Absolutely no text anywhere in the image.

Portrait orientation, tall aspect ratio, high resolution.
```

## What to do with it

1. Generate it. Regenerate until the label is genuinely blank and the vial is
   centred and straight-on — those two things matter more than anything else,
   because the vector label is positioned against them.
2. **Remove the white background** (Adobe, Higgsfield, remove.bg). The site is
   near-black.
3. Save as `public/images/vials/base.png`
4. In `lib/assets.ts`, change `VIAL_BASE_READY = false` to `true`.

Every one of the 61 products immediately renders as photoreal glass with a
perfect vector label. Add a product later and it gets artwork for free.

## If the label sits slightly wrong

The overlay position lives in one place — `LABEL` at the top of
`components/vial-composite.tsx`:

```ts
const LABEL = { left: 15.5, top: 30, width: 69, height: 44 };
```

Those are percentages of the image box. Nudge `top` if the label sits high or low,
`left`/`width` if it is off horizontally. One edit moves all 61 vials together.
