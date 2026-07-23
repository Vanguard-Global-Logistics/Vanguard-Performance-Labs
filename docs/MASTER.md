# VANGUARD MASTER DOCUMENT — Single Source of Truth

**Status:** authoritative · **Scope:** Vanguard Performance Labs website · **Read this first, every session.**

This is the consolidated master. It supersedes scattered instructions and points to the detailed docs.
If anything anywhere conflicts with this file, **this file wins** — then fix the conflict and log it in
`docs/DECISIONS.md`. The **repository is the source of truth, not chat memory.**

---

## 0. Session loading order
1. `CLAUDE.md` → 2. **this file** → 3. `docs/COMPLIANCE-GUARDRAILS.md` → 4. `docs/LOCKED-SPEC.md`
→ 5. `docs/ASSET-MANIFEST.md` → 6. `docs/VISUAL-QA.md` → 6b. `docs/VISUAL-MATCH-RUNBOOK.md` → 7. `docs/ORDERING-WORKFLOWS.md`
→ 8. `docs/ROUTE-MAP.md` → 9. `docs/CLAUDE-SKILLS.md` → 10. `docs/DECISIONS.md` → 11. `docs/VANGUARD-SPEC.md`

---

## 1. What this project is
- **Vanguard Performance Labs** = the public company website (this repo). The active build.
- **Peptastic** = a Vanguard *software product* showcased and sold from this site. Never the parent brand,
  never replaces the Vanguard homepage.
- **Throne · Jarvis · Kai · SARGE** = NOT part of Vanguard. Must never appear in code, copy, nav, assets,
  or metadata. (`tests/smoke.spec.ts` fails the build if they do.)
- **Jessie** = the only public AI concierge (education, navigation, routing — never medical advice).
- **Winged research vial** = the splash-page centerpiece and signature identity.

## 2. Hard guardrails (never cross — full detail in COMPLIANCE-GUARDRAILS.md)
- Research-use-only positioning; educational only; **no medical claims, dosing, or injection instructions**
  anywhere (UI, seed data, Jessie prompts, docs).
- **No consumer add-to-cart checkout** for research peptides.
- Ordering is **B2B + server-controlled** (RegulatoryStatus → allowed actions). Never infer availability
  from artwork or copy. A customer-entered PO never marks anything paid.
- `approved_checkout` stays OFF until the owner's **legal + merchant-account review** (mainstream
  processors prohibit this category).
- HIPAA-**ready** architecture language only — no unearned certification claims.
- Any real named expert appears only with **documented consent**.

## 3. Current build state (honest — update as it changes)
- Stack: Next.js 14 App Router · TypeScript · Tailwind · Playwright. 12 routes + dynamic
  education/products + `/api/inquiry`.
- Hero: **blended composition** — cinematic hero (Jessie + winged vial + concierge + trust strip) on top;
  Peptastic OS dashboard below.
- **Palette: violet on near-black (APPLIED).** `#050510` base; `#c084fc` / `#a855f7` / `#7c3aed` violet scale; `#E8A93B` gold for wings, wordmark, veteran mark. Fonts: Space Grotesk (display) + Inter (body) + IBM Plex Mono.
- **Brand art: REAL artwork integrated** — Jessie (3 variants, from the canonical character sheet),
  winged vial + logo mark + 5 photoreal product vials (from the brand sheet), all in `/public/images`
  and registered in `lib/assets.ts` with SVG fallback. **Never regenerate approved art** — crop from
  the canonical sheets. 5 compounds (cjc-1295, ipamorelin, mots-c, ss-31, nad-plus) still use the
  branded SVG vial until renders exist.
- **Reference baselines: MISSING.** `reference/approved-*.png` not yet committed — VISUAL-QA cannot do a
  true comparison until they are. (Owner: export the two approved mockups there.)

## 4. Definition of done (a task is NOT done until all pass)
1. `npm run lint` · `npm run typecheck` · `npm run build` · `npm run test` — all green.
2. Never suppress a type error to force green.
3. **Visual tasks:** render with Playwright at 1920/1440/1024/430, compare to `reference/` approved art,
   fix highest-impact differences, re-render. Code passing ≠ visually approved (VISUAL-QA.md).
4. Complete vertical slice: UI + validation + states + a11y + responsive + tests + docs.
5. Notable decisions logged in `docs/DECISIONS.md`.

## 5. Skills / plugins — verify, don't assume (CLAUDE-SKILLS.md)
Core capabilities (TypeScript, Playwright, GitHub, current-docs lookup, design judgment, code review) are
effectively always available. Marketplace plugins (Context7, FeatureDev, PR Review Toolkit, Superpowers,
Hookify, Skill Creator, Code Simplifier) **may not be installed** — verify on first run and record real
status. The brain works regardless.

## 6. Routes (ROUTE-MAP.md)
Home · About · Research Products (+[slug]) · Peptide Education (+[slug]) · Scientific Research · Articles ·
Video Library · Peptastic · Medical Professionals · Wholesale · Partnerships · Contact · `/api/inquiry`.

## 7. Owner-only tasks (only a human can do these)
Accounts/API keys · wire `/api/inquiry` to a real backend (email/CRM/Supabase) · add approved artwork to
`reference/` and `/public` · legal + merchant review before any payment workflow · authorize deploy.

## 8. Working agreement
Branch → implement → typecheck/lint/test/build/Playwright → review → merge. Never overwrite an approved
version without a recoverable commit/branch. Use current official docs for framework changes. Do not ask
the owner to re-paste instructions — read them from this repository every session. Keep this master file
current; when reality changes, update §3 and log it in DECISIONS.md.
