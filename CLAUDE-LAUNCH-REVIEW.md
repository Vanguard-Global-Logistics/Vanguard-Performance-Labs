# Claude Launch Review — Vanguard Performance Labs

## Branch to review

`launch/audio-jessie-compliance-polish`

Base: `main`

Do **not** review an old zip or stale chat export. The GitHub branch is the source of truth for this pass.

## Goal of this branch

Prepare a polished, deployable corporate website while Jessie video states are postponed.

Jessie is now:

- a static approved portrait
- audio-first through browser/OS speech synthesis
- text-transcribed for accessibility
- backed by a server-side specialist-agent router when `ANTHROPIC_API_KEY` is configured
- safely degraded to scripted navigation when live AI is unavailable

No microphone recording is required. No generated Jessie video is required for launch.

## Public AI agent architecture

`lib/ai-agents.ts` defines five narrow specialists:

1. AI Concierge
2. Research Guide
3. Business Desk
4. Peptastic Guide
5. Compliance Gate

`app/api/jessie/route.ts` selects a specialist based on the visitor's current message. The Compliance Gate returns a deterministic refusal for dosing, injection, diagnosis, treatment, human-use, and similar requests instead of asking a model to improvise.

### Do not weaken these rules

- no diagnosis
- no personalized medical advice
- no dosing
- no reconstitution
- no injection instructions
- no treatment protocols
- no prescribing guidance
- no drug-combination recommendations
- no human-use guidance
- no legal advice
- no invented citations, certifications, inventory, prices, availability, testimonials, or lab results
- no claim that an investigational material is safe, effective, approved, or legally available for human use
- no patient data or protected health information
- no `HIPAA compliant` or `HIPAA certified` claim

## Commerce posture — intentionally inquiry only

This branch removes public purchase controls and public prices from the catalog experience.

- navigation has no cart button
- product cards route to professional inquiry
- product details display referenced formats without prices
- `/cart` is a professional-review notice
- `/checkout` is intentionally disabled
- `/api/orders` returns `503` unless `ENABLE_ORDER_REQUESTS=true`
- `.env.example` sets `ENABLE_ORDER_REQUESTS=false`
- `wholesale_review` permits information and quote requests only
- no product is currently marked `approved_for_sale`

### Do not re-enable ordering

Do not restore add-to-cart, checkout, invoice, wire/ACH, phone payment, pickup, shipping, or payment messaging during this review.

Any commercial workflow requires separate product-specific review of:

- federal and state law
- intended-use evidence
- labeling and website net impression
- business/customer qualification
- material sourcing and documentation
- insurance
- banking
- merchant-account terms
- shipping and handling procedures
- final terms, privacy, returns, and recordkeeping

## Why the inquiry-only posture matters

Use these official sources as review inputs, not as a substitute for legal counsel:

- FDA, **Gram Peptides Warning Letter**, March 31, 2026:
  https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/gram-peptides-721806-03312026
- FDA, **FDA's Concerns with Unapproved GLP-1 Drugs Used for Weight Loss**:
  https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss
- FDA, **USApeptide.com Warning Letter**, February 26, 2025:
  https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/usapeptidecom-696885-02262025
- FTC, **Health Products Compliance Guidance**:
  https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance

Important review principle: a `research use only` disclaimer is not automatically protective when the website's overall wording, imagery, education, product presentation, customer audience, or other evidence creates a human-use or therapeutic net impression.

## Required technical review

Run in this order:

```bash
npm ci
npm run typecheck
npm run build
npm run test
```

`npm run lint` currently uses the legacy Next 14 command and may require a config/version adjustment. Do not make broad dependency upgrades unless necessary for a green build.

### Inspect these changed files first

- `lib/ai-agents.ts`
- `app/api/jessie/route.ts`
- `components/site-chrome.tsx`
- `components/jessie-hero.tsx`
- `app/page.tsx`
- `app/products/page.tsx`
- `app/products/[slug]/page.tsx`
- `components/site-nav.tsx`
- `types/index.ts`
- `app/cart/page.tsx`
- `app/checkout/page.tsx`
- `app/api/orders/route.ts`
- `.env.example`
- `app/legal/terms/page.tsx`
- `app/legal/privacy/page.tsx`
- `app/legal/refunds/page.tsx`
- `tests/smoke.spec.ts`

## Functional checks

### Jessie

- static image loads without layout shift
- `Hear Jessie` works only after a user click
- no autoplay audio
- speech can be muted
- text remains visible for accessibility
- chat falls back safely when no Anthropic key exists
- specialist label changes according to intent
- compliance requests receive deterministic refusal
- no client-side API key exposure
- no raw model output or unsafe external links

### Catalog

- no public prices
- no add-to-cart controls
- no cart icon in navigation
- every product has a professional-inquiry path or unavailable state
- no page implies approval, guaranteed availability, human use, treatment, or outcome
- education pages clearly distinguish evidence model and editorial verification status

### Legal and privacy

The legal pages are **working drafts**, not final legal documents. Flag missing provisions and factual mismatches, but do not invent final legal language or claim the documents are attorney-approved.

Confirm the production privacy policy matches the services actually enabled, including:

- hosting
- email
- database
- analytics
- security tooling
- Anthropic or another AI provider
- form retention
- cookies/local storage
- state-specific privacy obligations
- contact and deletion procedures

## Visual QA

Review at minimum:

- 390 × 844 mobile
- 768 × 1024 tablet
- 1440 × 900 desktop

Check:

- black/violet/gold premium visual system
- no clipped hero content
- no horizontal overflow
- Jessie portrait remains sharp enough at intended size
- audio controls are understandable
- AI Agent Network reads as operational capability, not a medical claim
- all focus states and buttons are keyboard accessible
- reduced-motion mode remains usable
- no black frames or video placeholders

## Final deliverable from Claude

Return:

1. build/typecheck/test results with exact commands
2. files changed and why
3. launch blockers
4. legal-counsel questions
5. privacy/provider mismatches
6. unsupported or risky copy found
7. visual QA findings by viewport
8. exact deployment steps
9. a clear `GO`, `GO WITH CONDITIONS`, or `NO-GO` recommendation

Do not merge to `main` until the owner reviews the result.
