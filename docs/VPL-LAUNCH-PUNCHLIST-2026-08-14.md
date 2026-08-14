# Vanguard Performance Labs — Tomorrow Launch Punch List

Status date: 2026-08-14  
Working branch: `agent/vpl-cart-launch-recovery-2026-08-14`  
Target: an owner-approved Vercel website with a demonstrable B2B research product-to-cart-to-reviewed-order flow for Aegis Merchant Services.

## What is already built

- [x] Vanguard Performance Labs public brand and route structure
- [x] Research-use-only positioning and Jessie safety boundaries
- [x] Searchable product catalog with server-controlled product data
- [x] Product variants and strength-aware vial presentation
- [x] Add-to-cart controls
- [x] Persistent cart with quantity, removal, subtotal, and empty states
- [x] Checkout form with required-field validation
- [x] Research-use acknowledgement
- [x] Server-side order-line and price validation
- [x] Shipping and will-call fulfillment choices
- [x] Payment-provider interface with invoice/manual-payment implementation
- [x] Order request confirmation experience
- [x] Supabase order schema and repository
- [x] Owner admin order board and order-status workflow
- [x] Customer and owner email-delivery code through Resend
- [x] Automated Playwright coverage for primary launch routes and ordering flow

## Launch blockers — work that can be completed without owner credentials

- [x] Repair the approved hero-asset preparation failure
- [x] Run lint and strict TypeScript checks
- [x] Push the recovery branch so the work is durable in GitHub
- [x] Upgrade the framework and QA tooling away from known vulnerable launch versions
- [x] Obtain a green GitHub Launch QA run
- [x] Obtain a green Vercel preview deployment
- [x] Confirm all public routes and the approved hero asset load from the recovered build
- [ ] Make the approved preview accessible to Aegis; the current URL redirects unauthenticated visitors to Vercel login
- [x] Test catalog selection, variants, cart persistence across navigation, quantity changes, and checkout handoff
- [ ] Verify subtotal math, item removal, and return-to-empty behavior as one explicit browser flow
- [x] Test checkout validation, research-use acknowledgement, server-authoritative order submission, and confirmation behavior
- [x] Review desktop and mobile layouts in deterministic CI browser captures
- [ ] Repeat desktop and mobile review against the accessible deployed preview
- [x] Verify no Peptastic/Jarvis/Sophisticated Sips brand conflation
- [x] Verify no medical, dosing, reconstitution, injection, or human-use guidance

## Current validation evidence

- GitHub Actions `Vanguard Launch QA` run 228 passed on commit `7b94c121ab13428bc27308f21fe38df9c29c7842`.
- Playwright result: 121 passed, 3 intentional project skips, 0 failed.
- Production build generated 154 static pages and completed successfully on Next.js 16.3.1.
- Full dependency audit reported 0 known vulnerabilities.
- The approved homepage hero was reconstructed and verified as 701×320, 18,340 bytes, Git blob SHA `c7c8114885f83bcb0216ea481e32875eee4de270`.
- Vercel reported a successful deployment for the same commit.
- Browser evidence is retained in the `playwright-launch-report` artifact for run 228 through 2026-08-21.

## Owner/account setup needed for durable live orders

Do not put secret values in GitHub, documentation, or chat. Add them directly to the protected Vercel environment when requested.

- [ ] Confirm the final public VPL domain
- [ ] Create or select the VPL Supabase project
- [ ] Run `supabase/orders.sql`
- [ ] Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel
- [ ] Choose the monitored owner/order email
- [ ] Verify a sending domain in Resend
- [ ] Add `RESEND_API_KEY`, `ORDER_EMAIL_FROM`, and `OWNER_EMAIL` to Vercel
- [ ] Add a private `ADMIN_TOKEN` to Vercel
- [ ] Set `NEXT_PUBLIC_SITE_URL`
- [ ] If Jessie is enabled at launch, add the approved server-side model key and model name

## Aegis Merchant Services / card processing

The site currently has a functioning cart and checkout workflow for underwriting review, but it must not pretend to charge a card before the actual gateway is identified and integrated.

- [ ] Obtain the exact gateway/product name supplied by Aegis Merchant Services
- [ ] Obtain official API or hosted-checkout integration documentation
- [ ] Confirm in writing that the merchant account supports the exact research-material catalog
- [ ] Obtain sandbox credentials and enter them only in protected Vercel variables
- [ ] Record the approved merchant descriptor, refund policy, shipping policy, privacy policy, and required checkout disclosures
- [ ] Implement the gateway behind the existing `PaymentProvider` interface
- [ ] Use tokenization or hosted fields so raw card data never reaches Vanguard application code
- [ ] Verify approved/declined/cancelled/error flows in the gateway sandbox
- [ ] Verify webhook signatures, replay protection, idempotency, and order-status transitions
- [ ] Run one owner-authorized end-to-end test transaction before enabling public card payment

## Legal, policy, and operations approvals

- [ ] Owner reviews all product names, variants, prices, inventory posture, and contact details
- [ ] Owner/counsel reviews Terms, Privacy, Shipping, Refund, and Research Use pages
- [ ] Owner approves the website preview on desktop and mobile
- [ ] Owner verifies `/admin` reports **GO** for critical live-order services
- [ ] Submit one internal test order and confirm it survives a redeploy/refresh
- [ ] Confirm customer confirmation and owner alert emails arrive
- [ ] Confirm an owner can update payment and fulfillment status

## Domain and production promotion

- [ ] Add the approved domain to the Vercel project
- [ ] Copy only Vercel's exact A/CNAME records into GoDaddy DNS
- [ ] Preserve all existing MX, SPF, DKIM, and business-email records
- [ ] Re-test the site over the custom HTTPS domain
- [ ] Merge to `main` only after CI, preview QA, order persistence, email delivery, and owner approval are green
- [ ] Promote the approved build to production

## Definition of “loadable tomorrow”

The website is ready to show Aegis tomorrow when:

1. The Vercel preview loads without build errors.
2. A reviewer can browse the catalog, choose a variant, add it to the cart, change quantities, and reach checkout.
3. Checkout clearly demonstrates validation and research-use acknowledgement.
4. The site accurately labels the currently available payment method and does not claim a card was charged.
5. Desktop and mobile smoke tests pass.

## Definition of “fully live commerce”

Public card payments remain a separate release gate. They require durable Supabase orders, verified Resend delivery, owner-reviewed legal/policy content, an Aegis-supported gateway, protected credentials, sandbox transaction testing, and explicit owner approval to enable live charging.
