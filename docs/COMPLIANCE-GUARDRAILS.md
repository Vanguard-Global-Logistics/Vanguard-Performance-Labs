# COMPLIANCE GUARDRAILS — public launch branch

These are engineering and content safeguards, not legal advice or a substitute for qualified counsel.

## Public positioning

- Research education and professional inquiry only.
- No consumer checkout, payment collection, invoice issuance, shipping promise, or public order submission.
- No statement that catalog presence means availability, approval, legality, safety, efficacy, or suitability for human use.
- No diagnosis, medical advice, dosing, reconstitution, injection instructions, treatment protocols, prescribing, or combination guidance.
- No cures, guaranteed outcomes, before/after claims, or implied therapeutic results.
- No invented citations, statistics, testimonials, laboratory results, certifications, inventory, availability, or prices.
- Evidence model and editorial verification status must remain visible and accurate.
- Use `HIPAA-ready architecture` only when supported by the actual design. Never claim HIPAA compliance, certification, or a BAA unless documented.
- Named experts, affiliations, endorsements, and testimonials require documented permission and substantiation.

## Net-impression rule

A disclaimer is not a shield if the page as a whole implies human use, self-experimentation, treatment, safety, efficacy, or consumer availability. Review text, imagery, product names, vial presentation, research summaries, navigation, calls to action, AI responses, metadata, and linked content together.

## Jessie and specialist agents

- Static approved portrait plus optional browser audio is the launch implementation.
- No autoplay audio and no microphone requirement.
- Jessie is education, navigation, and business routing only.
- `lib/ai-agents.ts` defines narrow responsibilities.
- The Compliance Gate must deterministically refuse prohibited medical and human-use requests.
- AI must never give legal or regulatory conclusions.
- Do not accept patient records or protected health information.
- External links returned by the AI are restricted to an allowlisted internal site map.
- The Anthropic key stays server-side.

## Commerce

- `wholesale_review` supports information and quote requests only.
- No product is cart-eligible unless explicitly marked `approved_for_sale` after separate review.
- `/cart` and `/checkout` remain disabled notices.
- `/api/orders` remains disabled unless `ENABLE_ORDER_REQUESTS=true`.
- Do not set that variable during public launch review.
- A form submission never confirms availability, account approval, pricing, an order, payment, or shipment.

## Legal-review boundary

Before enabling any commercial workflow, obtain product-specific review of federal and state law, intended use, labeling and advertising, customer qualification, sourcing, documentation, insurance, banking, merchant terms, shipping, recordkeeping, privacy, and final contract language.

See `CLAUDE-LAUNCH-REVIEW.md` for the technical and legal handoff checklist.
