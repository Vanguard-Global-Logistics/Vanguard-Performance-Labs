# SHIP IT — final 4 steps (≈30 min)

The code and artwork are complete. These four steps are the ones only you can do.

## 1. Push (5 min)
Upload this folder's contents to the `vanguard-performance-labs` repo (replace everything, keep git history).

## 2. Build (10 min)
In Codespaces:
```bash
npm install
npm run lint && npm run typecheck && npm run build
```
If anything is red, paste the error to Claude — expect at most a version-pin nit.

## 3. Look (5 min)
```bash
npm run dev
```
Open localhost:3000. Walk: Home → Products → a product page → Education → a compound →
Peptastic → Wholesale → Contact. Send the contact form once (success banner should show).

## 4. Deploy (10 min)
vercel.com → Import the GitHub repo → framework auto-detects → Deploy.
Add your domain in Vercel settings when ready.

## Turn on order management (10 min)
1. Supabase (free): new project → SQL editor → paste `supabase/orders.sql` → run.
2. Vercel env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_TOKEN` (any strong secret),
   `RESEND_API_KEY` + `ORDER_EMAIL_FROM` (emails), `PAYMENT_PHONE`, `WILLCALL_ADDRESS`,
   optional `SHIPPING_WEBHOOK_URL` (Zapier hook → your shipping app).
3. Your flow: order arrives (customer emailed) → open `/admin` with your token →
   **Confirm Payment → Release** (fires shipping webhook or will-call email) → Mark Shipped → Complete.

## Make Jessie LIVE (2 min)
In Vercel → Settings → Environment Variables add `ANTHROPIC_API_KEY` (from console.anthropic.com).
Without it she still works in scripted-routing mode.

## After launch (not blockers)
- Wire /api/inquiry to email/CRM (TODO marked in the file)
- Transparent background on hero winged vial (Adobe/Higgsfield, 2 min)
- Hi-res Jessie regen from the canonical sheet if the hero looks soft
- Renders for cjc-1295 / ipamorelin / mots-c / ss-31 / nad-plus (SVG fallback active meanwhile)
- Legal + merchant review BEFORE enabling any payment workflow
