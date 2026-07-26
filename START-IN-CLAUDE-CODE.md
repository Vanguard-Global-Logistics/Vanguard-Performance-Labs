# Paste this into Claude Code as your first message

```
Read CLAUDE-CODE-HANDOFF.md first, then docs/MASTER.md and docs/DECISIONS.md.

This codebase was built in Claude chat and has NEVER been compiled. Your first job
is to prove it builds.

1. npm install && npm run lint && npm run typecheck && npm run build
2. Fix every error the build reports. Do not refactor beyond what the errors
   require — the architecture is deliberate and documented in docs/DECISIONS.md.
3. Re-run until all four commands are green.
4. npm run dev, then walk these routes and report anything broken or ugly:
   / /products /products/bpc-157 /education /education/bpc-157 /cart /checkout
   /specialty-request /peptastic /wholesale /contact
5. Commit and push to main.

Report at the end: what errors you found, what you changed to fix them, build status,
and anything you noticed that concerns you but did not fix.

Do not add features. Do not change copy. Do not touch the compliance guardrails
listed in CLAUDE-CODE-HANDOFF.md — they are owner-set and non-negotiable.
```
