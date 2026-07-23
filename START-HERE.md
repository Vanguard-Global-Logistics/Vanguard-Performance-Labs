# START HERE — Vanguard Performance Labs (with repository brain)

This repo now contains **working code** AND a **permanent project brain** so no future Claude Code
session confuses Vanguard, Peptastic, or Throne.

## 4 steps
1. New GitHub repo `vanguard-site` (its own repo — never merge with Peptastic OS, the app, or Throne).
2. Unzip and upload everything (keep folders: app/ components/ lib/ types/ docs/ reference/ tests/ .devcontainer/).
3. Open Claude Code on the web → point it at `vanguard-site`.
4. First message: "Read CLAUDE.md and everything it points to, verify skill status in docs/CLAUDE-SKILLS.md,
   run npm install && lint && typecheck && build && test, fix issues, then follow docs/VISUAL-QA.md."

## The brain (read automatically each session)
- CLAUDE.md — loading order + non-negotiable facts
- docs/LOCKED-SPEC, COMPLIANCE-GUARDRAILS, ASSET-MANIFEST, VISUAL-QA, CLAUDE-SKILLS, ROUTE-MAP,
  ORDERING-WORKFLOWS, DECISIONS, VANGUARD-SPEC, NEXT-STEPS
- reference/ — drop approved mockups here (approved-desktop.png / approved-mobile.png / approved-hero.png)

## Verify it works
`npm install && npm run lint && npm run typecheck && npm run build && npm run test`
Playwright renders all 12 routes at 4 viewports, checks for console errors, forbidden project names
(Throne/Jarvis/SARGE/Kai), mobile overflow, and the contact-form success path.

## Your jobs only
Accounts/keys · wire /api/inquiry to a real backend · add approved artwork to reference/ and /public ·
legal + merchant review before any payment workflow · authorize deploy.

*Educational only. Not medical advice. Consult a licensed medical professional.*
