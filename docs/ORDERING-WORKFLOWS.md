# ORDERING-WORKFLOWS — modular, provider-neutral, server-controlled

Types live in `types/index.ts`:

type RegulatoryStatus = "education_only" | "inquiry_only" | "wholesale_review" | "approved_for_sale" | "unavailable";
type OrderingMode     = "information_request" | "quote_only" | "po_only" | "invoice_only" | "approved_checkout";

`ACTIONS_BY_STATUS` maps status → allowed OrderingModes and is authoritative on the SERVER.
The product page reads it; the client form validates any ?action= against the allowed list.

Rules:
- Never infer availability/approval from artwork or copy.
- `approved_checkout` stays OFF until a provider + legal review (see COMPLIANCE-GUARDRAILS).
- A customer-entered PO/payment reference never marks anything paid; approval happens in admin workflow.
- Adding a future payment provider must NOT require redesigning the site — add it behind this layer.

## Payment rails (decided)
- ACCEPTED for approved accounts: bank wire / ACH against a team-issued invoice, and net-terms POs.
  Fulfilment only after a human verifies funds in admin — a customer-entered reference NEVER marks paid.
- REJECTED permanently: consumer P2P apps (Venmo, Cash App, Apple Cash, Zelle-personal). Their ToS
  prohibit this category and routing commerce through them is the payment-evasion pattern that freezes
  funds and draws enforcement. This is an owner-set boundary — do not revisit.
- Card checkout remains OFF pending legal + high-risk-merchant review (see COMPLIANCE-GUARDRAILS).
- Bank note: use a business account at a bank aware of the product category; banks can exit high-risk
  clients without notice. Wire instructions live in admin/env config, never hard-coded in the site.

## Order lifecycle (implemented)
pending_payment → (owner confirms in /admin) → payment_confirmed → shipped → completed (or cancelled).
- Intake saves the order + emails the customer wire or phone-payment instructions.
- Confirm Payment is a HUMAN action in /admin (Bearer ADMIN_TOKEN). It:
  ship: POSTs the order to SHIPPING_WEBHOOK_URL (Zapier→shipping app) + emails shipping confirmation.
  willcall: emails pickup instructions (WILLCALL_ADDRESS).
- Store: Supabase table (supabase/orders.sql); dev fallback is in-memory (non-persistent — never prod).
