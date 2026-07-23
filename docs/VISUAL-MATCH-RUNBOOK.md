# VISUAL-MATCH RUNBOOK — bounded loop with real exit conditions

Goal: make the live site match the approved reference mockups **as closely as a live HTML site can**,
then **stop**. This is a convergence loop, not an infinite one.

## Reality check (read before starting)
- A live site will **never** pixel-diff to zero against a raster mockup: real fonts, antialiasing,
  dynamic data, and responsive reflow guarantee differences. "Pixel-perfect" is not the target and is
  not an achievable stop condition. **"Faithful match, owner-approved" is the target.**
- Therefore this loop is **bounded** and ends with a human decision, not a perfect score.

## Preconditions (do not start the loop until both are true)
1. `reference/approved-desktop.png` and `reference/approved-mobile.png` exist and are committed.
   - If missing: STOP. Post a note asking the owner to add them. Do not invent a target.
2. `npm run build` is green.

## The loop (hard cap: 5 passes)
For pass = 1..5:
1. `npm run start`; with Playwright capture `/` at 1920x1080 and 430x932 → `test-results/visual/`.
2. Score against the reference using the rubric below (0–100). Record the score and a ranked list of the
   top differences (max 8), each with: element, observed vs. reference, severity (high/med/low), fix.
3. Fix **only high- and medium-severity** items this pass. Do not touch low-severity polish yet.
4. Re-run `lint`/`typecheck`/`build`; if any fails, fix before continuing.
5. Re-render and re-score.

## Stop when ANY of these is true (exit conditions)
- Score ≥ **90** on both desktop and mobile, OR
- Score improved < **3 points** versus the previous pass (diminishing returns — converged), OR
- **5 passes** completed, OR
- Only low-severity/subjective-taste items remain.

On stop: write `test-results/visual/REPORT.md` with the final scores, before/after screenshots,
remaining known differences, and an explicit line: **"Owner decision needed on remaining items."**
Then STOP and hand back to the owner. Do NOT keep iterating past a stop condition.

## Scoring rubric (weight toward structure, not pixels)
- Layout & composition match (30) — hero regions, dashboard placement, concierge position.
- Element presence & hierarchy (20) — Jessie, winged vial, trust strip, CTAs, nav.
- Typography scale & weight (15).
- Color/lighting family (15) — NOTE: palette is intentionally cyan/blue right now; do not "fix" toward
  purple/gold unless DECISIONS.md says the swap was approved.
- Spacing & alignment (10).
- Responsive integrity: no overflow, no clipping, mobile composition sane (10).

## Never
- Never loop past a stop condition "to make it better."
- Never regress passing tests or approved artwork to chase a diff.
- Never change palette, copy, or scope under the banner of "visual match" — that's a separate decision.
- Never claim "pixel-perfect" or "100%." Report the real score and let the owner approve.
```
