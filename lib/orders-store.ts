// Order persistence with two backends:
//  - Supabase (production): set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (server-only)
//  - In-memory (dev fallback): orders DO NOT survive restarts/redeploys — dev only.

export type PaymentMethod = "wire" | "phone";
export type Fulfillment = "ship" | "willcall";
export type OrderStatus =
  | "pending_payment"      // saved, waiting on owner to confirm payment
  | "payment_confirmed"    // owner confirmed; released to shipping or ready for will-call
  | "shipped"
  | "completed"
  | "cancelled";

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
  fulfillment: Fulfillment;
  shipping?: ShippingAddress;
  lines: OrderLine[];
  total: number;
}

const hasSupabase = () => !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

async function sb(path: string, init: RequestInit = {}) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
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
  if (!res.ok) throw new Error(`supabase ${res.status}: ${await res.text()}`);
  return res.json();
}

// dev fallback
const mem: Order[] = [];

export async function saveOrder(o: Order): Promise<void> {
  if (hasSupabase()) { await sb("orders", { method: "POST", body: JSON.stringify(o) }); return; }
  mem.unshift(o);
  console.warn("[orders] IN-MEMORY store (dev only) — configure SUPABASE_URL for persistence");
}

export async function listOrders(): Promise<Order[]> {
  if (hasSupabase()) return sb("orders?order=created_at.desc&limit=200");
  return mem;
}

export async function getOrder(id: string): Promise<Order | null> {
  if (hasSupabase()) { const r = await sb(`orders?id=eq.${encodeURIComponent(id)}&limit=1`); return r[0] ?? null; }
  return mem.find((o) => o.id === id) ?? null;
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  if (hasSupabase()) {
    const r = await sb(`orders?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(patch) });
    return r[0] ?? null;
  }
  const i = mem.findIndex((o) => o.id === id);
  if (i < 0) return null;
  mem[i] = { ...mem[i], ...patch };
  return mem[i];
}
