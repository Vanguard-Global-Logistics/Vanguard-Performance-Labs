# DECISIONS — architecture & design log (append-only)

- 2026-07: Project split locked — Vanguard (this site), Peptastic (product), Throne/Jarvis (separate).
- 2026-07: Hero = blended composition (Image 2 hero on top + Image 1 dashboard below). Owner choice.
- 2026-07: Palette kept cyan/blue for now; purple/gold is a token-only swap in tailwind.config.ts +
  the --vg-grad token + GRAD constant when owner approves. No structural change required.
- 2026-07: Brand art shipped as SVG stand-ins (WingedVial/JessiePortrait/VanguardLogo) to keep the repo
  free of broken assets; swap for approved renders in /public later.
- 2026-07: Commerce = B2B inquiry only; no consumer peptide checkout. Server-controlled ordering.
- 2026-07: Consolidated all project instructions into docs/MASTER.md as the single source of truth,
  referenced at top of CLAUDE.md load order. On conflict, MASTER wins, then reconcile + log here.
- 2026-07: Visual matching is a BOUNDED loop (docs/VISUAL-MATCH-RUNBOOK.md): hard cap 5 passes, exit at
  score>=90 or <3-pt gain or only low-severity items; ends with REPORT.md + owner decision. Rejected the
  "iterate autonomously until pixel-perfect" framing — unreachable against a raster mockup and prone to
  regressing good work. Human makes the final taste call.
- 2026-07: Palette swap APPLIED to the locked brand system — violet (#c084fc/#a855f7/#7c3aed) on #050510
  with gold (#E8A93B) for wings/wordmark/veteran mark. Fonts -> Space Grotesk + Inter + IBM Plex Mono.
  Token `vanguard-cyan` renamed `vanguard-violet` across the codebase. Logo now silver eagle-V + gold
  wordmark to match approved references.
- 2026-07: Jessie's canonical identity = owner's 4-view character sheet. All site crops come from its
  FRONT panel. Kai (on same sheet) is excluded from Vanguard. Voice-avatar work should use this sheet
  as the identity reference in Higgsfield.
- 2026-07: One-shot completion pass — real artwork wired for Jessie/vial/logo/5 products, favicon added
  (app/icon.png), smoke test updated to accept <img> Jessie, unused import removed. Site is
  content-complete + asset-complete pending: build verification in Codespaces, transparent-bg vial,
  hi-res Jessie regen (optional), backend wiring, deploy.
- 2026-07: Jessie is now a LIVE AI concierge: /api/jessie calls Anthropic server-side
  (claude-sonnet-4-6) with a guardrailed system prompt (education/routing only; no dosing/diagnosis;
  routes to B2B actions; JSON reply+links contract). Client dock = real chat with history, client-side
  medical-question deflection, and graceful scripted fallback when ANTHROPIC_API_KEY is absent (503).
- 2026-07: Payment rails locked — wire/ACH invoicing + net-terms POs for approved accounts (human
  verifies funds; reference never auto-marks paid). Consumer P2P apps rejected permanently as
  payment-evasion risk (owner's own early boundary). Cards stay off pending legal/merchant review.
- 2026-07: Functioning cart shipped for merchant underwriting — cart/checkout/order flow with SERVER
  re-validation of every line against catalog + regulatory status; settles via PaymentProvider adapter
  (today InvoiceProvider: wire/ACH after human review; card slot visible as "coming soon, pending
  merchant approval"). Retatrutide stays education_only (no cart) — demonstrates the compliance gating
  live. Legal trio added (/legal/terms, /legal/privacy, /legal/refunds) marked draft pending legal
  review. List prices from owner's mockup.
- 2026-07: Full order lifecycle shipped — saved orders (Supabase/orders.sql, service-role REST, dev
  memory fallback), wire OR phone payment choice, ship OR will-call fulfilment with address capture,
  customer emails at intake + payment confirmation (Resend, graceful no-op), owner /admin board with
  Bearer-token auth, Confirm Payment → release (shipping webhook or will-call email), robots disallow
  /admin + /api. Human payment confirmation remains the gate — nothing auto-releases.
- 2026-07: Premium motion layer shipped, dependency-free (CSS + IntersectionObserver, no framer-motion):
  staggered hero entrance, shimmer on gradient display text, glow-pulse on the winged vial, aurora drift
  behind hero scenes, scroll-reveal with variants (left/right/scale), card lift+glow hovers, button sheen
  sweep, trusted-by infinite marquee (pause on hover), dashboard bars grow-in. Safety: reveal hidden ONLY
  when the js class is present (no-JS users see everything), prefers-reduced-motion kills all motion via
  the existing global switch, transforms/opacity only (no layout thrash).
- 2026-07: Rate limiting added to public POST APIs (token bucket per IP): /api/jessie 10/min (protects
  Anthropic spend), /api/inquiry 5/min, /api/orders 4/min. In-memory per instance — pair with Vercel
  WAF/Upstash for hard global caps at scale. Admin API untouched (already bearer-token gated).
- 2026-07: Content engine shipped HUMAN-GATED (not auto-publish): /api/admin/drafts generates
  evidence-honest article drafts per compound (hard prompt rules: no dosing/advice, no fabricated
  citations or stats), queued at /admin/content for approve/edit/reject. Only "approved" articles are
  publicly visible at /articles/[slug] with MedicalWebPage schema + product cross-link; sitemap includes
  them. Rationale: Google's scaled-content-abuse policy + YMYL scrutiny make auto-published bulk AI
  health pages a ranking and compliance risk.
- 2026-07: Owner order alerts — Twilio SMS (short, actionable) + pick-list email with line items,
  ship-to/will-call, and a link to the order board. Both env-gated and wrapped so a notification
  failure never blocks an order.
- 2026-07: Static audit pass — fixed 6 real defects that would have failed the build or misrendered:
  duplicate react import (site-chrome), 3 unused imports (not-found/education-slug/products) which fail
  next lint, invalid Tailwind class h-4.5 (silently no-op) in the mobile cart badge, and an untyped
  `const lines = []` in the orders API (strict-mode risk) now typed as OrderLine[]. Verified: client/server
  boundaries, named-export resolution, prop contracts, no dead internal links across all 19 static routes,
  Playwright selectors still match live markup.
- 2026-07: Audit passes 3-5 (bounded loop, converged): fixed literal quotes around {o.notes} in /admin
  (react/no-unescaped-entities = build failure), raw <a> anchor -> next/link, and hardened cart
  localStorage hydration with shape validation so corrupt/legacy data can't crash the cart page.
  Pass 5 re-ran EVERY category (braces, hooks/boundaries, dup/unused imports, tailwind validity,
  anchors, entities, module resolution) → zero findings. Loop terminated on convergence.
- 2026-07: Specialty sourcing service added (/specialty-request + /api/specialty). Captures compound,
  CAS, quantity, purity spec, application, timeline + business identity; owner-alert email with full
  spec sheet; customer receipt states explicitly it is a request for quotation, NOT an order or a
  confirmation of availability. Page publishes what we will NOT source (controlled/scheduled substances,
  APIs for human use, anything for human/veterinary administration, anything undocumentable). Rate
  limited 3/min. Jessie routes off-catalog compound questions here without promising sourcing.
- 2026-07: Catalog expanded to 27 products from owner's price list (CSV, 34 size variants). Added
  Variant type {size, price, onSale, percentOff}; cart lines now key on slug+size (lineKey), server
  re-validates BOTH slug and size against the catalog and takes unit price from the catalog — the
  client price is never trusted. Compounds absent from the price list (ss-31) set to inquiry_only.
  Retatrutide is now priced/sellable per owner's list (was education_only).
- 2026-07: Catalog expanded to 61 products from supplier list. EXCLUDED on owner agreement, and these
  must never be added: botulinum toxin, HGH/somatropin (21 USC 333(e) felony), insulin, EPO, HCG/HMG,
  dermorphin (opioid peptide), gonadorelin, triptorelin, oxytocin, cerebrolysin, injectable glutathione,
  hyaluronic acid, vitamin B12 injections, all Lipo-C / Super Shred / Relaxation PM style compounded
  injectable blends, and "Lemon Bottle".
- 2026-07: New additions are inquiry_only with availableSizes shown but NO public price. Rationale: the
  supplier PDF lists WHOLESALE COST PER 10-VIAL KIT, not owner retail. Publishing those figures would
  expose cost basis and imply per-vial pricing at cost. Flip to priced variants once the owner supplies
  retail numbers.
- 2026-07: Real citations replace placeholders on flagship compounds. New Reference type {citation,
  pmid, doi, nct, finding, model, verified}. 12 citations added across BPC-157 (4), TB-500 (4),
  GHK-Cu (3), retatrutide (1) — 8 confirmed directly against PubMed/ClinicalTrials.gov, 4 captured
  from secondary sources and marked verified:false. UI shows study-model badges (human RCT / animal /
  in vitro / systematic review), a Verified or Awaiting-verification flag, a one-line honest finding,
  and a deep link to PubMed/CT.gov/DOI. Compounds with no real citations render an explicit
  "we do not list references we have not checked" notice rather than a fake list.
  NEVER add a PMID that has not been confirmed against the primary source.
- 2026-07: Vial artwork approach changed to composite. AI image generators reliably render
  photoreal glass but garble small text (observed: VANGUARO, PERTDRMANCE LABS, RESEARCH PERTIDE)
  and invented false purity claims (66%+, 89%+, GS%) — unacceptable on a product label. Now: ONE
  photoreal render with a BLANK label (public/images/vials/base.png) + the entire label drawn as
  vector SVG over it (components/vial-composite.tsx). Text is always correct, always sharp, and
  driven by catalog data. Gated behind VIAL_BASE_READY in lib/assets.ts so the SVG fallback
  stays active until the base render exists. Label position is a single LABEL constant.
