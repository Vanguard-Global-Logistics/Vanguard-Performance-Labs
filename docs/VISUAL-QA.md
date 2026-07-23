# VISUAL-QA — render before you claim done

Do NOT declare a visual task complete from code inspection. Render, compare, fix, re-render.

## Process
1. Read approved references in `reference/` (see ASSET-MANIFEST). If missing, note it and proceed with
   the chat-approved mockups as guidance; flag that baselines are absent.
2. Start the site locally (`npm run dev`).
3. Render with Playwright at: 1920x1080, 1440x900, 1024x768, 430x932.
4. Capture screenshots to `test-results/visual/`.
5. Compare against approved references. Review, in priority order:
   Jessie scale/placement · winged-vial scale/placement · headline hierarchy · nav · CTA visibility ·
   lighting · visual balance · first-viewport fit · mobile composition · text clipping · broken images ·
   dashboard placement · concierge open/close behavior.
6. Produce a ranked difference report; fix highest-impact first; repeat until no significant discrepancy.

## Principle
Luminance scores, DOM geometry, and automated percentages may DETECT bugs. They do not REPLACE visual
inspection. The approved mockup determines taste.
