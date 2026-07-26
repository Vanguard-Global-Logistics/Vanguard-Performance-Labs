# Handoff → Claude Code

This project was built in Claude chat. Everything below is current as of the handoff.

## The one thing that has never happened

**`npm run build` has never been run on this codebase.** Not once. Every check so far
has been static analysis — imports, types, braces, lint patterns, client/server
boundaries — all green, but no compiler has touched it. That is the first job.

## Where the code is

- **GitHub `main`** is at commit `4b05255` — 107 files. Real, but ~3 sessions stale.
- **The current version is the zip** the user has from chat: 110 files, adds the
  full catalog, specialty sourcing, and the citation system.

If the zip and the repo disagree, **the zip wins.**

## What this is

Vanguard Performance Labs corporate website. Next.js 14 App Router, TypeScript,
Tailwind. 23 pages, 6 API routes, 13 components.

Entity: Vanguard Global Logistics LLC, DBA Vanguard Performance Labs. Veteran-owned.
Sells research peptides B2B and showcases Peptastic OS (clinic SaaS, separate repo,
still in development).

## Read these first

`CLAUDE.md` → `docs/MASTER.md` (single source of truth, wins conflicts) →
`docs/DECISIONS.md` (every decision and why — read this before changing anything
that looks odd; it is probably deliberate).

## Hard lines — do not cross these

These are owner-set and were held through the entire build. Do not "improve" past them.

1. **No dosing, no diagnosis, no treatment advice, no reconstitution instructions**
   anywhere — page copy, product data, Jessie's system prompt, generated articles.
2. **No fabricated citations, statistics, testimonials, or certifications.** Every
   reference carries a `verified` flag; unverified ones display as "Awaiting
   verification" rather than being presented as checked. Never add a PMID that has
   not been confirmed against the primary source.
3. **Payment confirmation is a human action** behind `ADMIN_TOKEN` in `/admin`.
   Nothing auto-releases an order. A customer-supplied reference never marks paid.
4. **No consumer P2P payment rails** (Venmo, Cash App, Apple Cash). Wire/ACH invoice
   and phone payment only. Card checkout stays off pending merchant approval.
5. **"HIPAA-ready architecture"** — never "HIPAA compliant" or "certified."
6. **Throne, Jarvis, Kai, SARGE must never appear** in public code. Kai is
   Peptastic-only. The Playwright suite fails the build if these names appear.
7. **Excluded compounds must never be added** to the catalog: botulinum toxin,
   HGH/somatropin, insulin, EPO, HCG/HMG, dermorphin, gonadorelin, triptorelin,
   oxytocin, cerebrolysin, injectable glutathione, and all Lipo-C style compounded
   injectable blends. See `docs/DECISIONS.md` for the reasoning.

## Job 1 — run the build

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Fix whatever it finds. Expect a small number of real errors — this is the first
compile. Do not refactor beyond what the errors require.

## Job 2 — push

Commit and push to `Vanguard-Global-Logistics/Vanguard-Performance-Labs` on `main`.
Vercel is not yet importing this repo; once the build is green the user will import it.

## Job 3 — walk it

```bash
npm run dev
```

Then check by eye: home → products → a product detail → education → a compound →
cart → checkout. Confirm the size selector changes price, the cart badge counts,
and checkout reaches the payment/fulfilment choices.

## Known open items (do not treat as bugs)

- **48 of 61 compounds still have `[Editorial review required]` reference
  placeholders.** Only BPC-157, TB-500, GHK-Cu, and retatrutide have real citations.
  This is expected — real ones get added a compound at a time, verified.
- **26 compounds are `inquiry_only`** with `availableSizes` but no price. Deliberate:
  the supplier price list was wholesale cost, not the owner's retail. Waiting on
  owner's retail numbers before flipping them to priced variants.
- **Jessie and the winged vial images are low-resolution crops** from mockups. They
  will look soft at large sizes. The canonical Jessie source is the owner's 4-view
  character sheet — crop from it, never regenerate her.
- **The winged vial still has a baked-in dark background.** Needs background removal.
- **Legal pages are drafts** pending attorney review.

## Environment variables

`.env.example` lists all of them. None are required for the build — every integration
degrades gracefully. In rough priority order once deployed:

- `ANTHROPIC_API_KEY` — makes Jessie a live AI concierge (falls back to scripted routing)
- `ADMIN_TOKEN` — opens `/admin`; admin is fully disabled without it
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — order/article persistence
  (run `supabase/orders.sql` once); without it, in-memory dev fallback that warns loudly
- `RESEND_API_KEY` + `ORDER_EMAIL_FROM` — customer emails
- `OWNER_EMAIL`, `TWILIO_*`, `OWNER_PHONE` — owner order alerts (pick-list email + SMS)
- `PAYMENT_PHONE`, `WILLCALL_ADDRESS`, `SHIPPING_WEBHOOK_URL`, `NEXT_PUBLIC_SITE_URL`

## Working style the owner expects

Direct and honest. Say what is actually true about the state of things, flag real
risks plainly, and do not claim something works until it has been verified. When
showing visual work, give a blunt first reaction before the detailed pass.
