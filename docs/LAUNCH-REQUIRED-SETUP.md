# Vanguard Performance Labs — Required Launch Setup

This checklist separates code readiness from external account configuration. The website intentionally refuses production orders or inquiries when critical services are missing, so no customer receives a false confirmation and no order is lost during a Vercel restart.

## 1. Vercel project

Connected repository:

`Vanguard-Global-Logistics/Vanguard-Performance-Labs`

Protected review branch:

`rebuild/vpl-launch`

Add these variables under **Vercel → Project Settings → Environment Variables**. Apply them to Production and Preview unless noted otherwise.

### Required for the website

- `NEXT_PUBLIC_SITE_URL` — final `https://` website address
- `ADMIN_TOKEN` — long private owner token for `/admin`
- `ANTHROPIC_API_KEY` — existing Anthropic API key
- `ANTHROPIC_MODEL` — optional; defaults to `claude-sonnet-4-20250514`

### Required before accepting live orders or inquiries

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `ORDER_EMAIL_FROM`
- `OWNER_EMAIL`

### Required for the selected settlement/fulfillment features

- `PAYMENT_PHONE` — required when pay-by-phone is shown
- `WILLCALL_ADDRESS` — required before enabling will-call pickup publicly
- `SHIPPING_WEBHOOK_URL` — optional until automated carrier release is needed

After changing Vercel variables, create a new deployment because existing deployments do not receive newly added values automatically.

## 2. Supabase

1. Create or open the Vanguard Performance Labs Supabase project.
2. Open **SQL Editor**.
3. Run the complete file: `supabase/orders.sql`.
4. Confirm these tables exist:
   - `orders`
   - `inquiries`
   - `newsletter_subscribers`
   - `articles`
5. Keep Row Level Security enabled and do not add anonymous public policies. The Next.js server uses the service-role key.
6. Copy the project URL into `SUPABASE_URL` and the service-role key into `SUPABASE_SERVICE_ROLE_KEY` in Vercel. Never use the anonymous key in place of the service-role key for server persistence.

## 3. Resend

1. Add and verify the sending domain in Resend.
2. Create a Resend API key.
3. Add it to Vercel as `RESEND_API_KEY`.
4. Set `ORDER_EMAIL_FROM` to a verified sender, for example:

   `Vanguard Performance Labs <orders@your-verified-domain.com>`

5. Set `OWNER_EMAIL` to the monitored owner/order-management inbox.
6. Submit one contact inquiry and one test order request, then confirm both the customer and owner messages are delivered.

## 4. Anthropic / Jessie

- Keep `ANTHROPIC_API_KEY` server-side in Vercel.
- Do not commit `.env.local`.
- Jessie rejects dosing, injection, reconstitution, diagnosis, treatment, and human-use requests before an API call is made.
- The endpoint limits history, response length, and requests per minute to reduce unnecessary usage.
- The approved Jessie still image remains in use. No Higgsfield animation is required for launch.

## 5. Owner command center

Open `/admin` on the deployed preview and enter `ADMIN_TOKEN`.

The command center must report **GO** for live order readiness. Critical green checks are:

- Supabase order persistence
- Resend customer email
- Owner email alerts
- Admin protection

It also reports Jessie, payment phone, shipping webhook, and canonical site URL without displaying any secret value.

## 6. Functional launch test

Complete this exact test on the approved Vercel deployment:

1. Open `/products`.
2. Search for BPC-157.
3. Select a vial strength.
4. Confirm the strength changes on the vial label.
5. Add the vial to the order.
6. Open `/cart`.
7. Increase quantity, decrease quantity, and remove/re-add the line.
8. Continue to `/checkout`.
9. Verify empty required fields produce clear validation.
10. Submit a real internal test order using a monitored company email.
11. Confirm the order appears in `/admin` after a refresh.
12. Confirm customer confirmation and owner alert emails arrive.
13. Confirm payment status can be changed in `/admin`.

## 7. Domain and GoDaddy

Keep GoDaddy as the registrar/DNS provider and Vercel as the website host.

1. Approve the Vercel preview first.
2. Add the final custom domain inside the Vercel project.
3. Copy the exact A/CNAME records Vercel provides into GoDaddy DNS.
4. Do not delete or overwrite MX, SPF, DKIM, or other business-email records.
5. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.
6. Submit the resulting sitemap URL to Google Search Console after launch.

## 8. Production promotion rule

Do not merge `rebuild/vpl-launch` into `main` until all of the following are true:

- Vercel build is green
- Approved homepage visually matches the locked reference
- Product, cart, and checkout tests pass
- `/admin` reports GO for critical live-order services
- Test order persists after a deployment refresh
- Customer and owner emails are confirmed
- Legal pages and research-use language are owner-reviewed
- Custom domain is ready or the temporary Vercel address is intentionally approved
