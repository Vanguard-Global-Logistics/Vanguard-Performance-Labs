# Vanguard Performance Labs — Website (production foundation)

A real Next.js 14 (App Router) + TypeScript + Tailwind implementation of the Vanguard corporate site. This is **working source code**, not a spec. Jessie concierge, the locked hero, the education library, research products (B2B-only), Peptastic showcase, and all 12 routes are built.

## Run it
```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run dev      # http://localhost:3000
```
> Built in an offline sandbox, so `npm install`/`build` were **not** run here. Run the four commands above in your Codespace and fix anything environment-specific (pin versions if needed). Everything is written to compile against the versions in `package.json`.

## What's implemented
- **Locked hero:** Jessie presenter + floating AI Optimization Score card (left), ~60% Peptastic dashboard (center), Jessie AI Concierge rail with waveform (right), winged Vanguard vial integrated in the background (swappable).
- **Persistent Jessie dock** on every page — structured routing + refuses dosing/diagnosis/medical-advice questions.
- **Education library** (`/education`) with search + evidence filter; dynamic detail pages (`/education/[slug]`) with the full content model (overview, mechanism, areas of study, safety, FAQ, references marked for editorial review, last-reviewed/status).
- **Research Products** (`/products`) — luxury educational presentation + **B2B actions only** (Request Info / Quote / PO / Wholesale). **No consumer checkout.** Available actions are decided server-side from each product's `RegulatoryStatus`.
- **Peptastic showcase** (`/peptastic`) — signature AI Knowledge & Operations Assistant, features, role cards, integrations, security (HIPAA-ready language), pricing → demo.
- **All 12 nav routes** are real pages with layout, copy, CTAs, metadata.
- **System:** not-found, error, loading, sitemap, robots, Organization JSON-LD, OG/SEO metadata, reduced-motion support, mobile drawer nav.

## Architecture notes
- **Modular ordering layer:** `types/index.ts` defines `RegulatoryStatus` and `OrderingMode`. `ACTIONS_BY_STATUS` maps status → allowed actions, enforced server-side. To enable a future payment path, add `approved_checkout` to a product's allowed actions **only** after a provider + legal review — nothing is hard-coded.
- **Forms:** post to `/api/inquiry`, which validates server-side. It's a safe **stub** that logs and acknowledges. A customer-entered PO/reference never marks anything paid.

## Asset inventory
All brand visuals are built as **SVG/CSS** so the repo has zero missing/broken assets:
- Jessie portrait — `components/brand.tsx` → `JessiePortrait` (swap for approved artwork later)
- Winged Vanguard vial — `components/brand.tsx` → `WingedVial` (swappable hero artwork)
- Vanguard logo — `components/brand.tsx` → `VanguardLogo`
- Peptastic dashboard — `components/hero.tsx` (live component mock)
- Particles/waveform/orb — CSS/canvas in `components/ui.tsx` + `hero.tsx`
**No external image/video files are referenced.** When approved artwork (Jessie hero image, real vial renders, product photography, videos) is ready, drop it into `public/` and swap the SVG components — layout won't change.

## Remaining real dependencies (owner)
1. **Wire `/api/inquiry`** to a real backend (email/CRM/Supabase) — TODO is marked in the file.
2. **Supply approved artwork** (Jessie, vials, product photography, videos) to replace SVG placeholders.
3. **Editorial/medical review** of every compound's references before flipping `reviewStatus` to `published`.
4. **Legal + merchant-account review** before enabling any payment workflow — Stripe/PayPal/Square/Authorize.net prohibit research-chemical/unapproved-injectable sales.
5. **Fill real content** for Articles/Videos/Research (currently premium placeholders clearly written as such).

## Deploy (Vercel)
Push to GitHub → import in Vercel → set env vars from `.env.example` → deploy. Next.js is auto-detected.

*Educational only. Not medical advice. Consult a licensed medical professional.*
