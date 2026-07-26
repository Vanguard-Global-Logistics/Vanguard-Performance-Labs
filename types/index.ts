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

/** A purchasable vial size for a compound. Prices are owner-set list prices. */
/** A literature citation. `verified` means the identifier was confirmed against
 *  PubMed/the publisher directly — unverified entries must not be published. */
export type StudyModel =
  | "human-rct" | "human-trial" | "human-observational"
  | "animal" | "in-vitro" | "review" | "systematic-review";

export interface Reference {
  citation?: string;
  pmid?: string;
  doi?: string;
  nct?: string;
  finding?: string;
  model?: StudyModel;
  verified?: boolean;
  label?: string;
  note?: string;
}

export interface Variant {
  size: string;        // e.g. "10mg", "30mL"
  price: number;       // USD list per bottle
  onSale?: boolean;
  percentOff?: number;
}

export interface Compound {
  slug: string;
  strength?: string;          // headline/default size (display)
  listPrice?: number;         // headline/default price (display)
  variants?: Variant[];        // priced, orderable sizes — source of truth for pricing
  availableSizes?: string[];   // sizes offered on quote (no public price)
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
  references: Reference[];
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
