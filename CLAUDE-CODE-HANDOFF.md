# Handoff → Claude Code

The current review target is the GitHub branch:

`launch/audio-jessie-compliance-polish`

Read **`CLAUDE-LAUNCH-REVIEW.md` first**. It is the authoritative handoff for this launch pass.

## Source of truth

The GitHub branch wins over old chat exports, zips, screenshots, and earlier handoff notes.

## Immediate job

```bash
npm ci
npm run typecheck
npm run build
npm run test
```

Then complete the visual, compliance-copy, privacy-provider, and launch-blocker review described in `CLAUDE-LAUNCH-REVIEW.md`.

## Non-negotiable launch posture

- Jessie uses a static approved portrait plus optional browser audio.
- No Jessie video is required for launch.
- Public catalog is professional inquiry only.
- No public prices, cart, checkout, payment, invoice, shipping, or pickup workflow.
- `/api/orders` remains disabled unless `ENABLE_ORDER_REQUESTS=true`.
- Do not set that variable or restore order controls during this review.
- No medical advice, dosing, reconstitution, injection guidance, treatment claims, human-use guidance, or legal advice.
- No invented citations, laboratory results, certifications, inventory, availability, or claims.
- Legal pages remain drafts pending qualified attorney review.

Do not merge to `main` until the owner reviews Claude's report.
