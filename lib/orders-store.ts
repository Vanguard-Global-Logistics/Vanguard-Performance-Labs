// Order persistence with two backends:
//  - Supabase (production): set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (server-only)
//  - In-memory (local development only): never used as a production success path.

export type PaymentMethod = "wire" | "phone";
export type Fulfillment = "ship" | "willcall";
export type OrderStatus =
  | "pending_payment"
  | "payment_confirmed"
  | "shipped"
  | "completed"
  | "cancelled";
export type PaymentEvidenceStatus = "none" | "submitted" | "verified" | "rejected";

export interface OrderLine { slug: string; name: string; qty: number; unit: number }
export interface ShippingAddress { name?: string; line1?: string; line2?: string; city?: string; state?: string; zip?: string }

export interface Order {
  id: string;
  created_at: string;
  status: OrderStatus;
  company: string;
  contact?: string;
  email: string;
  phone?: string;
  notes?: string;
  payment_method: PaymentMethod;
  /** Opaque customer-facing reference used to reconcile an approved payment. */
  payment_reference: string;
  payment_evidence_status?: PaymentEvidenceStatus;
  payment_evidence_path?: string;
  payment_confirmed_at?: string;
  payment_confirmation_source?: string;
  fulfillment: Fulfillment;
  shipping?: ShippingAddress;
  lines: OrderLine[];
  total: number;
  carrier?: string;
  tracking_number?: string;
  tracking_url?: string;
  shipped_at?: string;
}

const hasSupabase = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const isProduction = () => process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

async function supabase(path: string, init: RequestInit = {}) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`supabase ${response.status}: ${await response.text()}`);
  return response.json();
}

const memoryOrders: Order[] = [];

export async function saveOrder(order: Order): Promise<void> {
  if (hasSupabase()) {
    await supabase("orders", { method: "POST", body: JSON.stringify(order) });
    return;
  }
  if (isProduction()) {
    throw new Error("Durable order storage is not configured.");
  }
  memoryOrders.unshift(order);
  console.warn("[orders] local in-memory store — configure Supabase before production ordering");
}

export async function listOrders(): Promise<Order[]> {
  if (hasSupabase()) return supabase("orders?order=created_at.desc&limit=200");
  if (isProduction()) return [];
  return memoryOrders;
}

export async function getOrder(id: string): Promise<Order | null> {
  if (hasSupabase()) {
    const rows = await supabase(`orders?id=eq.${encodeURIComponent(id)}&limit=1`);
    return rows[0] ?? null;
  }
  if (isProduction()) return null;
  return memoryOrders.find((order) => order.id === id) ?? null;
}

export async function getOrderByPaymentReference(reference: string): Promise<Order | null> {
  if (hasSupabase()) {
    const rows = await supabase(`orders?payment_reference=eq.${encodeURIComponent(reference)}&limit=1`);
    return rows[0] ?? null;
  }
  if (isProduction()) return null;
  return memoryOrders.find((order) => order.payment_reference === reference) ?? null;
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  if (hasSupabase()) {
    const rows = await supabase(`orders?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(patch) });
    return rows[0] ?? null;
  }
  if (isProduction()) return null;
  const index = memoryOrders.findIndex((order) => order.id === id);
  if (index < 0) return null;
  memoryOrders[index] = { ...memoryOrders[index], ...patch };
  return memoryOrders[index];
}
