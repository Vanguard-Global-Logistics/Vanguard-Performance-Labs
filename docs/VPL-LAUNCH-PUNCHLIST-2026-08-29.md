# Vanguard Performance Labs — Launch Punch List — 2026-08-29

Launch candidate: `agent/vpl-cart-launch-recovery-2026-08-14` @ `cf1dc89c535af8bee77222f341561a810e521e48`

Goal: finish production wiring, promote the verified launch build, and connect the final GoDaddy-managed domain to Vercel today.

## Confirmed complete

- [x] Approved Vanguard public design and route structure
- [x] Searchable research catalog and product variants
- [x] Cart persistence, quantity controls, removal, and subtotal behavior
- [x] Checkout validation and research-use acknowledgement
- [x] Server-authoritative product/price validation
- [x] Shipping / will-call workflow support
- [x] Owner admin order-management UI and status workflow
- [x] Jessie server route and deterministic medical/human-use safety boundaries
- [x] Supabase schema and repository code committed
- [x] Resend customer/owner email-delivery code committed
- [x] Next.js runtime upgraded to 16.3.1 / React 19.2.8
- [x] Dependency audit recorded with 0 known vulnerabilities
- [x] GitHub Launch QA run 230 passed
- [x] Playwright recorded 125 passed, 3 intentional skips, 0 failed
- [x] Production build recorded 154 static pages
- [x] Latest recovery-branch Vercel preview is READY
- [x] Latest preview homepage responds HTTP 200
- [x] Temporary authenticated-review link can be generated for the preview
- [x] Vanguard Performance Labs Supabase project exists and reports ACTIVE_HEALTHY

## P0 — finish today before public launch

- [ ] Verify the VPL Supabase schema. Confirm `orders`, `inquiries`, `newsletter_subscribers`, and `articles` exist. If missing, run `supabase/orders.sql`.
- [ ] Configure Vercel Production + Preview environment values:
  - `NEXT_PUBLIC_SITE_URL`
  - `ADMIN_TOKEN`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `ORDER_EMAIL_FROM`
  - `OWNER_EMAIL`
  - `ANTHROPIC_API_KEY` if live Jessie is desired at launch
  - optional `ANTHROPIC_MODEL`
  - `PAYMENT_PHONE` if pay-by-phone is shown
  - `WILLCALL_ADDRESS` if will-call is shown
  - optional `SHIPPING_WEBHOOK_URL`
- [ ] Redeploy after environment-variable changes.
- [ ] Verify the Resend sending domain/sender is approved and live.
- [ ] Open `/admin` and confirm the critical readiness checks report **GO**:
  - Supabase order persistence
  - customer email delivery
  - owner email alerts
  - admin protection
- [ ] Run one internal end-to-end order test:
  1. Products → choose a product/strength
  2. Add to cart
  3. Change quantity/remove/re-add
  4. Checkout validation
  5. Submit internal order using a monitored company email
  6. Confirm order appears in `/admin`
  7. Confirm order survives refresh/redeploy
  8. Confirm customer and owner emails arrive
  9. Confirm admin can update payment/fulfillment status
- [ ] Final desktop + mobile visual review on the accessible deployment.
- [ ] Owner review of final product names, variants, prices, contact details, Terms, Privacy, Refund/Shipping, and research-use language.

## Git / release sequence

- [ ] Merge PR #3 (`agent/vpl-cart-launch-recovery-2026-08-14` → `rebuild/vpl-launch`) only after the production-service checks above are green.
- [ ] Merge PR #2 (`rebuild/vpl-launch` → `main`).
- [ ] Promote the approved main build to Vercel Production.
- [ ] Do not merge the stale inquiry-only PR #1 into this release; close/archive it after launch unless a specific change is intentionally cherry-picked.

## GoDaddy / custom domain

This Next.js application should remain hosted on Vercel. GoDaddy should remain the registrar/DNS provider.

- [ ] Confirm the final Vanguard Performance Labs public domain.
- [ ] Add that domain to the Vercel `vanguard-performance-labs` project.
- [ ] Copy only the exact A/CNAME records Vercel provides into GoDaddy DNS.
- [ ] Preserve all existing MX, SPF, DKIM, and business-email records.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://<final-domain>` and redeploy.
- [ ] Verify HTTPS, homepage, products, cart, checkout, Jessie, contact, legal pages, sitemap, and admin behavior on the custom domain.
- [ ] Submit the sitemap to Google Search Console after launch.

## Payment gateway gate

The existing launch build can demonstrate/accept reviewed order requests without pretending a card was charged. Public card charging remains a separate gate unless the Aegis Merchant Services gateway is already approved and available.

- [ ] If live card processing is required today: obtain the exact Aegis gateway/product, official integration documentation, written catalog approval, sandbox credentials, tokenized/hosted-field integration, webhook verification, and an owner-authorized test transaction before enabling live charging.
- [ ] If the Aegis gateway is not ready today: launch the verified order-request/manual-settlement workflow and keep public card charging disabled.

## Definition of done today

VPL is complete for launch when the recovery build is merged through `main`, critical production services are green, one durable internal order and both emails are verified, the final VPL domain resolves through GoDaddy DNS to Vercel over HTTPS, and the production custom-domain smoke test passes.
