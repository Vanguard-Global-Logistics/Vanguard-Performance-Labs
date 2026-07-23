# Next steps in Claude Code

This repo now contains a WORKING implementation (not a spec). In Claude Code:

1. `npm install && npm run lint && npm run typecheck && npm run build` — fix any
   environment-specific issues (version pins, minor type nits).
2. `npm run dev` and walk every route: /, /about, /products, /products/[slug],
   /education, /education/[slug], /research, /articles, /videos, /peptastic,
   /professionals, /wholesale, /partnerships, /contact.
3. From here, all work is REFINEMENT — do not rebuild. Follow docs/VANGUARD-SPEC.md.
4. Owner tasks: wire /api/inquiry to a real backend; drop approved artwork into
   /public and swap the SVG components; editorial/medical review of references;
   legal + merchant review before any payment workflow.
