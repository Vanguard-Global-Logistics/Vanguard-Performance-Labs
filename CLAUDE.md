# CLAUDE.md — Vanguard Performance Labs (READ FIRST, EVERY SESSION)

You are working **only** inside the **Vanguard Performance Labs** repository. This file is the permanent project brain. Read it — and the docs it points to — at the start of every session. The **repository, not chat memory, is the source of truth.**

## Read in this order before doing anything
1. `CLAUDE.md` (this file)
2. `docs/MASTER.md` ← **single source of truth; if anything conflicts, MASTER wins**
3. `docs/COMPLIANCE-GUARDRAILS.md`
4. `docs/LOCKED-SPEC.md`
5. `docs/ASSET-MANIFEST.md`
6. `docs/VISUAL-QA.md`
7. `docs/ORDERING-WORKFLOWS.md`
8. `docs/ROUTE-MAP.md`
9. `docs/CLAUDE-SKILLS.md`
10. `docs/DECISIONS.md`
11. `docs/VANGUARD-SPEC.md`

## Non-negotiable project facts
- **Vanguard Performance Labs** is the active project — the public-facing company website.
- **Peptastic** is a Vanguard *software product* showcased/sold from this site. It must **never replace** the Vanguard homepage or parent brand.
- **Throne** and **Jarvis** are separate projects. They must never appear in Vanguard source, copy, nav, assets, metadata, or design. Also excluded publicly: **Kai**, **SARGE**.
- **Jessie** is the **only** public AI concierge.
- The **winged research vial** is the splash-page centerpiece.
- **Approved Jessie and vial artwork must never be regenerated** — reuse the approved reference assets.
- The **approved reference images** in `reference/` are the visual source of truth.
- Research-product presentation is **research-use-only** positioning.
- **Product availability and ordering actions are server-controlled** (see `docs/ORDERING-WORKFLOWS.md`). Never infer approval from the presence of artwork or copy.
- The ordering architecture is **payment-provider-neutral**; future payment integrations must not require rebuilding the site.

## The rule that prevents "looks done but isn't"
**Never declare a visual task complete from code inspection alone.** Render the page (Playwright), compare against the approved references, document visible differences, fix them, and render again. Passing code checks is **not** visual approval. Metrics detect bugs; the approved mockup determines taste.

## Working agreement
- Build complete vertical slices (UI + validation + states + a11y + responsive + tests + docs), not isolated files.
- Use current official docs for framework-level changes; don't rely on deprecated/remembered APIs.
- Never suppress type errors to force a green build.
- Branch → implement → typecheck/lint/test/build/Playwright → review → merge. Never overwrite an approved version without a recoverable commit/branch.
- Record notable technical/design decisions in `docs/DECISIONS.md`.

Do not ask the owner to re-paste project instructions in future sessions. Read them from this repository every time.
