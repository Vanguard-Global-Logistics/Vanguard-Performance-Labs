# Vanguard Performance Labs — Master Build Spec (LOCKED)

**Entity:** Vanguard Global Logistics LLC · **DBA:** Vanguard Performance Labs
**This repo:** the official public-facing **corporate website**.

> **Scope boundary.** This is the Vanguard corporate site. Peptastic is *one Vanguard product* showcased here — it never replaces Vanguard as the parent brand. **Throne / Jarvis / Forge / Ledger / Aegis must never appear.** Separate repos.

> **Do not redesign. Do not rebuild from scratch.** Refine the existing implementation until it matches the approved mockup. The approved mockup is the visual source of truth.

---

## Positioning
Biotechnology, education, AI software, consulting, and research company. Should feel like Apple / Stripe / SpaceX / Linear / Vercel / Tesla. Premium, elegant, confident, sophisticated. Never template-like.

## THE HERO (LOCKED — refine only, never restructure)
- **LEFT:** Jessie (cinematic presenter, purple rim lighting, white medical coat, arms crossed, confident executive posture, integrated into the environment) · large headline · supporting copy · primary + secondary CTA · floating **AI Optimization Score** card.
- **CENTER:** large **Peptastic dashboard** — analytics, CRM, KPIs, charts, activity, business intelligence. **~60% of the hero.**
- **RIGHT:** persistent **Jessie AI Concierge** panel — greeting, voice, waveform, quick prompts, input — integrated into the platform chrome.
- **BRAND ARTWORK:** the cinematic **Vanguard winged research vial** sits *in the environment* behind Jessie and the dashboard — integrated, not floating. Build it so a future featured vial (Retatrutide, BPC-157, TB-500, GHK-Cu…) can swap in **without changing the composition**. This winged vial is Vanguard's signature visual identity.

## Jessie — permanent AI Concierge
Represents **Vanguard** (not just Peptastic). Appears throughout the site to: navigate, locate educational resources, explain Vanguard, introduce Peptastic, answer business questions, schedule demos, assist partnership inquiries, route to the right department. Always intelligent, trustworthy, warm, professional, premium. Never intrusive.

**Hard guardrail (from the directive):** Jessie **never** provides individualized medical advice, diagnosis, prescribing guidance, dosing recommendations, or treatment decisions. Education only. Route all clinical questions to a licensed professional.

## Five objectives
1. **Build the Vanguard brand** — premium biotech/innovation company.
2. **World-class education platform** — per peptide: overview, mechanisms, research summaries, scientific references, FAQs, educational videos, diagrams, timelines, historical development, current research. **Educational only** — no dosing, no treatment advice, no use-claims.
3. **Showcase Peptastic** — AI Concierge, CRM, scheduling, memberships, marketing, inventory, analytics, reporting, automation, BI. Drives **demo requests and business inquiries**.
4. **Professional relationships** — clinics, medical professionals, researchers, universities, laboratories, med spas, wellness centers, functional medicine, partners, wholesale. Inquiry forms, consultations, partnership requests, demos.
5. **Build trust** — references, articles, research summaries, white papers, videos, AI demos, business insights, professional resources.

## Navigation
Home · About Vanguard · Research Products · Peptide Education Library · Scientific Research · Articles · Video Library · Peptastic · Medical Professionals · Wholesale · Partnerships · Contact

---

## Flexible Ordering & Business Workflow (modular — DO NOT hard-code a checkout)
Build the transaction layer as a **modular service**, configurable from the admin panel, independent of the site design. Supported configurable business actions:

- Request Information · Request a Quote · Request Wholesale Pricing
- Submit a Purchase Order (PO) · Apply for a Wholesale Account
- Schedule a Consultation · Book a Peptastic Demo · Contact Sales · Become a Partner

Architect so future workflows, payment integrations, invoicing, ERP, or CRM integrations can be **added, replaced, enabled, or disabled from admin without redesigning the site**.

**Research Products pages therefore ship as: luxury educational presentation + B2B workflow actions** (quote / wholesale / PO / account application) — **not** a consumer add-to-cart checkout. Every product page carries the research-use and educational disclaimer. *(Note for the owner: mainstream processors — Stripe, PayPal, Square, Authorize.net — prohibit research-chemical/unapproved-injectable sales in their ToS. Any future payment workflow enabled here needs legal + merchant-account review first. The modular architecture exists precisely so that decision isn't baked into the codebase.)*

---

## Visual quality — refine only
Improve **only**: spacing · lighting · typography · cinematic presentation · dashboard realism · premium glass effects · micro-interactions · responsiveness · polish. **Never redesign approved sections.**

## Performance
Lighthouse 95+ · fast loading · responsive · accessible (WCAG AA) · SEO + schema markup · optimized assets · clean architecture.

## Asset rule
**No placeholder or broken assets.** If an image/video doesn't exist, build it as premium CSS/SVG/gradient/glassmorphism. Never reference a file not in the repo.

## Final standard
Stop only when a visitor — researcher, clinician, lab, clinic owner, university, investor, partner — would believe this is a company capable of becoming the industry leader. Not when tests pass; when the *experience* matches the approved mockup.
