# Jessie Vault

This folder is an Obsidian-compatible knowledge vault for Jessie, Vanguard Performance Labs' AI Concierge.

## Governance model

Jessie does **not** learn directly from the public internet into production behavior. New material follows this path:

1. **Discover** — collect potentially useful sales, compliance, research-business, and customer-service knowledge.
2. **Quarantine** — place unreviewed material in `90-quarantine/`. Quarantined notes are never supplied to Jessie at runtime.
3. **Review** — check accuracy, source quality, date, legal/compliance impact, and whether the tactic is ethical and truthful.
4. **Approve** — promote only safe material into approved vault folders and, when needed, into `lib/jessie-brain.ts` for runtime retrieval.
5. **Audit** — periodically retire stale, contradicted, or unsafe tactics.

## Priority order

`00-core` Constitution > `20-compliance` > approved sales/objection knowledge > visitor requests > quarantined/untrusted material.

Nothing in the vault may override the Constitution. Sales tactics may improve discovery, objection handling, value communication, follow-up, and closing, but may never authorize medical advice, human-use recommendations, deceptive claims, fake scarcity, or fabricated evidence.

## Approved folders

- `00-core/` — immutable identity, boundaries, escalation rules.
- `10-sales/` — ethical consultative sales playbooks.
- `20-compliance/` — regulatory and marketing guardrails.
- `30-objections/` — truthful objection handling.
- `40-learning/` — learning and promotion workflow.
- `90-quarantine/` — untrusted discoveries; never runtime-approved.

## Runtime connection

The production API imports `lib/jessie-brain.ts`, which is the compiled/approved runtime representation of this vault. Any future automated ingestion must write to quarantine first; production promotion requires an explicit review step.
