# ROUTE-MAP — Vanguard Performance Labs

Public routes (all implemented):
- /                      Home (blended hero + dashboard + sections)
- /about                 About Vanguard
- /products              Research Products (educational + B2B actions, NO checkout)
- /products/[slug]       Product detail + B2B inquiry form
- /education             Peptide Education Library (search + evidence filter)
- /education/[slug]      Compound detail (full educational content model)
- /research              Scientific Research
- /articles              Articles
- /videos                Video Library
- /peptastic             Peptastic software showcase
- /professionals         Medical Professionals
- /wholesale             Wholesale
- /partnerships          Partnerships
- /contact               Contact (working form → /api/inquiry)

API:
- /api/inquiry           Server-validated inquiry stub (TODO: wire to email/CRM/Supabase)

System: not-found, error, loading, sitemap.ts, robots.ts, Organization JSON-LD.
