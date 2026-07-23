# ⭐ FIRST-SESSION PROMPT — paste into Claude Code (vanguard-site repo)

Paste the block below as your first message. It loads the brain, verifies environment, runs the full
gate, and runs the BOUNDED visual-match loop (not an infinite one).

---

```
You are working in the Vanguard Performance Labs repository.

STEP 1 — Load the brain (read fully, in order):
  CLAUDE.md → docs/MASTER.md → docs/COMPLIANCE-GUARDRAILS.md → docs/LOCKED-SPEC.md →
  docs/ASSET-MANIFEST.md → docs/VISUAL-QA.md → docs/VISUAL-MATCH-RUNBOOK.md →
  docs/ORDERING-WORKFLOWS.md → docs/ROUTE-MAP.md → docs/CLAUDE-SKILLS.md → docs/DECISIONS.md.
  docs/MASTER.md is the single source of truth; if anything conflicts, MASTER wins.

STEP 2 — Verify environment. Update docs/CLAUDE-SKILLS.md with the REAL installed status of each
  optional plugin (do not assume any are present). Then run and make green:
    npm install && npm run lint && npm run typecheck && npm run build && npm run test
  Fix real errors. Never suppress a type error to force green.

STEP 3 — Check preconditions for visual matching:
  - Do reference/approved-desktop.png and reference/approved-mobile.png exist?
    If NOT: stop the visual step, tell me they're missing, and do everything else. Do not invent a target.
  - If they exist, proceed to Step 4.

STEP 4 — Run docs/VISUAL-MATCH-RUNBOOK.md EXACTLY:
  - Bounded loop, hard cap 5 passes.
  - Fix high/medium-severity differences only; leave subjective polish for owner review.
  - STOP at the first exit condition (score >= 90 both viewports, OR < 3-point gain vs last pass,
    OR 5 passes, OR only low-severity items remain).
  - Do NOT chase pixel-perfection; a live site never diffs to zero against a raster mockup.
  - Do NOT change palette (still cyan/blue), copy, or scope under the banner of visual matching.
  - Write test-results/visual/REPORT.md with final scores, before/after shots, remaining differences,
    and "Owner decision needed on remaining items." Then STOP and hand back to me.

GUARDRAILS (always): research-use-only; no medical/dosing claims; Jessie is education/routing only;
no consumer peptide checkout; ordering is server-controlled; no Throne/Jarvis/Kai/SARGE anywhere.

Commit after each green pass with a clear message. When you hit a stop condition or a precondition
failure, stop and report — do not keep iterating.
```

---

**Why bounded:** an unattended "loop until perfect" against a raster mockup has no reachable finish line —
it burns time and can regress good work. This version converges, then hands the final taste call to you.
