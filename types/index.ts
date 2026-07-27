// Core domain types for Vanguard Performance Labs

export type EvidenceLevel = "strong" | "moderate" | "limited" | "insufficient";

// Server-side rules determine available actions.
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
  size: string;
  price: number;
  onSale?: boolean;
  percentOff?: number;
}

export interface Compound {
  slug: string;
  strength?: string;
  listPrice?: number;
  variants?: Variant[];
  availableSizes?: string[];
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

// Public-launch actions are deliberately conservative. Materials under wholesale
// review support information and quote requests only. Purchase orders and invoice
// requests become available only after a product has been independently cleared
// for sale and the owner has completed legal and merchant-account review.
export const ACTIONS_BY_STATUS: Record<RegulatoryStatus, OrderingMode[]> = {
  education_only: ["information_request"],
  inquiry_only: ["information_request", "quote_only"],
  wholesale_review: ["information_request", "quote_only"],
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

// The public website has no direct checkout. A product becomes cart-eligible only
// after its regulatory status is explicitly changed to approved_for_sale.
export const CART_ELIGIBLE: RegulatoryStatus[] = ["approved_for_sale"];
export const cartEligible = (status: RegulatoryStatus) => CART_ELIGIBLE.includes(status);
