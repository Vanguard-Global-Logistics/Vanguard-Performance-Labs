# ⭐ THE ONE PROMPT — Vanguard Performance Labs corporate site

Paste this whole block as your first message to Claude Code in the **vanguard-site** repo.

---

```
You are the Lead Architect, Senior UX Designer, Principal Frontend Engineer, and QA
Engineer completing the Vanguard Performance Labs corporate website.

FIRST: read docs/VANGUARD-SPEC.md in full. It is the governing specification.

You are NOT designing from scratch and NOT rebuilding. If an implementation exists,
REFINE it toward the approved mockup while preserving the current architecture. The
approved mockup is the visual source of truth.

SCOPE BOUNDARY:
  - This repo is ONLY the Vanguard Performance Labs corporate website.
  - Peptastic is ONE Vanguard product showcased here — it never replaces Vanguard as
    the parent brand.
  - Throne / Jarvis / Forge / Ledger / Aegis must NEVER appear anywhere.

THE HERO IS LOCKED — refine, never restructure:
  LEFT: Jessie (cinematic, purple rim lighting, white coat, arms crossed, confident
        executive posture, integrated into the environment), headline, copy, primary +
        secondary CTA, floating AI Optimization Score card.
  CENTER: large Peptastic dashboard (analytics, CRM, KPIs, charts, activity, BI) at
        roughly 60% of the hero.
  RIGHT: persistent Jessie AI Concierge panel — greeting, voice, waveform, quick
        prompts, input — integrated into the platform chrome.
  BRAND: the cinematic Vanguard winged research vial sits IN the environment behind
        Jessie and the dashboard. Build it so a future featured vial can swap in
        WITHOUT changing the composition.

BUILD/REFINE, in order (foundation before polish):
  1. Foundation solid: nav works, responsive works, buttons work, forms work, dark
     mode works, every component renders, every import resolves. Zero TypeScript,
     build, hydration, or console errors.
  2. Navigation + pages: Home, About Vanguard, Research Products, Peptide Education
     Library, Scientific Research, Articles, Video Library, Peptastic, Medical
     Professionals, Wholesale, Partnerships, Contact.
  3. Jessie AI Concierge across the site (navigate, explain Vanguard, introduce
     Peptastic, schedule demos, route partnership inquiries).
  4. Peptastic software showcase (AI Concierge, CRM, scheduling, memberships,
     marketing, inventory, analytics, reporting, automation, BI) → demo requests.
  5. Education library (per peptide: overview, mechanisms, research summaries,
     references, FAQs, videos, diagrams, timelines, history, current research).
  6. Professional/B2B experiences + working inquiry forms with success confirmation.
  7. THEN polish only: spacing, lighting, typography, cinematic presentation,
     dashboard realism, glass effects, micro-interactions, responsiveness.

MODULAR ORDERING LAYER (critical):
  Do NOT hard-code a checkout or payment workflow. Build the transaction layer as a
  MODULAR, admin-configurable service supporting: Request Information, Request a
  Quote, Request Wholesale Pricing, Submit a PO, Apply for a Wholesale Account,
  Schedule a Consultation, Book a Peptastic Demo, Contact Sales, Become a Partner.
  Future payment/invoicing/ERP/CRM integrations must be addable, replaceable,
  enable-able, or disable-able from admin WITHOUT redesigning the site.
  Research Products pages ship as luxury EDUCATIONAL presentation + these B2B workflow
  actions — not a consumer add-to-cart checkout.

HARD GUARDRAILS:
  - Education only. No dosing, no diagnosis, no prescribing, no individualized medical
    advice, no treatment decisions, no use-claims — in any page copy, product page,
    seed content, or Jessie's system prompt.
  - Every educational/product surface carries the research-use + educational disclaimer.
  - NO placeholder or broken assets. If an image/video doesn't exist, build it as
    premium CSS/SVG/gradient/glassmorphism. Never reference a file not in the repo.
  - No broken links, routes, imports, or unfinished components.

SELF-QA — do this yourself, don't wait for me:
  After EVERY major section: review your own work, walk it mentally as the browser
  (missing imports, broken routes/assets, hydration, animations, spacing, typography,
  accessibility, responsive, color consistency, conversion flow) and FIX every issue
  before continuing.

QUALITY GATE before declaring done:
  npm install && npm run lint && npm run typecheck && npm run build  — all green.
  Then re-walk the site and repeat until no obvious issues remain.
  Targets: Lighthouse 95+, responsive, accessible, SEO + schema markup.

REPORT AT THE END: folder structure, files changed, build instructions, npm run build
status, remaining TODOs, and why each major decision strengthens the Vanguard brand
and drives inquiries/demos.

Do not stop when tests pass. Stop when the experience matches the approved mockup and
feels worthy of a premium biotechnology company. Start now.
```

---

**Pause only for human-only items:** accounts/API keys, wiring inquiry forms to a real backend/CRM, and deploy authorization.
