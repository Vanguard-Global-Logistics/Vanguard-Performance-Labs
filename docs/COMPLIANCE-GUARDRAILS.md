# COMPLIANCE-GUARDRAILS — read before touching products, Jessie, or copy

These are hard lines. They protect the company, not just the code.

## Positioning
- Research-use-only. Product surfaces state "Research use only. Not for human consumption."
- Educational only. No medical claims, no cures, no treatment advice.
- No dosing, reconstitution, or injection instructions anywhere — UI, seed data, Jessie prompts, docs.
- HIPAA-READY architecture language only. Never claim a certification not independently obtained.
- Any real named expert (e.g. an educational reference) may appear ONLY with documented consent.

## Jessie
- Jessie is education/navigation/routing only. She must refuse or redirect: diagnosis, personalized
  medical advice, dosing, prescribing, individualized treatment, injection instructions.

## Commerce (the important one)
- NO consumer add-to-cart checkout for research peptides.
- Ordering is B2B + server-controlled: information request, quote, PO, invoice request, wholesale
  application, contact sales. Available actions come from server-side RegulatoryStatus — never inferred
  from artwork/copy.
- A customer-entered PO number or payment reference must NEVER mark an invoice paid.
- Before enabling ANY payment workflow (`approved_checkout`): mainstream processors (Stripe, PayPal,
  Square, Authorize.net) prohibit research-chemical / unapproved-injectable sales in their ToS. Requires
  owner's legal + merchant-account review first. Do not wire a peptide checkout without it.
