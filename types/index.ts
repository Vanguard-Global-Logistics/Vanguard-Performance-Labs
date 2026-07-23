// Core domain types for Vanguard Performance Labs

export type EvidenceLevel = "strong" | "moderate" | "limited" | "insufficient";

// Server-side rules determine available actions (per spec Phase 7)
export type RegulatoryStatus =
  | "education_only"
  | "inquiry_only"
  | "wholesale_review"
  | "approved_for_sale"
  | "unavailable";

export type OrderingMode =
  | "information_request"
  | "quote_only"
  | "po_only"
  | "invoice_only"
  | "approved_checkout";

export interface Compound {
  slug: string;
  strength?: string;
  listPrice?: number; // USD list; wholesale terms on approved accounts
  name: string;
  aliases: string[];
  category: string;
  evidence: EvidenceLevel;
  researchStatus: string;
  overview: string;
  mechanism: string;
  areasOfStudy: string[];
  safety: string;
  faq: { q: string; a: string }[];
  references: { label: string; note: string }[]; // marked for editorial review
  lastReviewed: string;
  reviewStatus: "draft" | "in_review" | "published";
  regulatory: RegulatoryStatus;
}

export interface RoleCard {
  role: string;
  blurb: string;
}

// Which B2B actions a given regulatory status unlocks (server-authoritative)
export const ACTIONS_BY_STATUS: Record<RegulatoryStatus, OrderingMode[]> = {
  education_only: ["information_request"],
  inquiry_only: ["information_request", "quote_only"],
  wholesale_review: ["information_request", "quote_only", "po_only"],
  approved_for_sale: ["information_request", "quote_only", "po_only", "invoice_only"],
  unavailable: [],
};

export const ACTION_LABEL: Record<OrderingMode, string> = {
  information_request: "Request Information",
  quote_only: "Request a Quote",
  po_only: "Submit a Purchase Order",
  invoice_only: "Request an Invoice",
  approved_checkout: "Checkout",
};

// Cart eligibility is server-controlled by regulatory status — never by UI presence.
export const CART_ELIGIBLE: RegulatoryStatus[] = ["wholesale_review", "approved_for_sale"];
export const cartEligible = (s: RegulatoryStatus) => CART_ELIGIBLE.includes(s);
