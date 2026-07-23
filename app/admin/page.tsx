"use client";
import { useState } from "react";
import Link from "next/link";
import { GlassCard, GlowButton } from "@/components/ui";
import type { Order } from "@/lib/orders-store";

// Owner-only order board. Enter ADMIN_TOKEN to load. Not linked in public nav;
// /admin is disallowed in robots.txt.

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load(t = token) {
    setErr(null);
    const res = await fetch("/api/admin/orders", { headers: { Authorization: `Bearer ${t}` } });
    if (!res.ok) { setErr(res.status === 401 ? "Invalid token (or ADMIN_TOKEN not configured)." : "Failed to load."); return; }
    const data = await res.json();
    setOrders(data.orders);
  }

  async function act(id: string, action: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setErr(d.error ?? "Action failed."); return; }
      await load();
    } finally { setBusyId(null); }
  }

  if (orders === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <GlassCard className="p-6">
          <h1 className="font-display text-xl font-bold text-bone">Order Administration</h1>
          <p className="mt-1 text-xs text-muted">Enter the admin token to manage orders.</p>
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            placeholder="Admin token" aria-label="Admin token"
            className="mt-4 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none" />
          {err && <p className="mt-2 text-xs text-vanguard-rose">{err}</p>}
          <div className="mt-4"><GlowButton onClick={() => load()}>Open Board</GlowButton></div>
        </GlassCard>
      </div>
    );
  }

  const STATUS_COLOR: Record<string, string> = {
    pending_payment: "text-vanguard-amber", payment_confirmed: "text-vanguard-teal",
    shipped: "text-vanguard-violet", completed: "text-muted", cancelled: "text-vanguard-rose",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-black text-bone">Orders</h1>
        <div className="flex items-center gap-4">
          <Link href="/admin/content" className="text-xs text-vanguard-violet hover:underline">Content Queue →</Link>
          <button onClick={() => load()} className="text-xs text-vanguard-violet hover:underline">Refresh</button>
        </div>
      </div>
      {err && <p className="mt-2 text-xs text-vanguard-rose">{err}</p>}
      <div className="mt-6 space-y-4">
        {orders.length === 0 && <p className="text-muted">No orders yet.</p>}
        {orders.map((o) => (
          <GlassCard key={o.id} className="p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-bold text-bone">{o.id}</span>
              <span className={`text-xs font-bold uppercase ${STATUS_COLOR[o.status] ?? "text-muted"}`}>{o.status.replace("_", " ")}</span>
              <span className="text-xs text-muted">{new Date(o.created_at).toLocaleString()}</span>
              <span className="ml-auto font-display font-bold text-bone tabular-nums">${Number(o.total).toFixed(2)}</span>
            </div>
            <div className="mt-2 grid gap-1 text-sm text-muted sm:grid-cols-2">
              <div><span className="text-bone">{o.company}</span>{o.contact ? ` · ${o.contact}` : ""} · {o.email}{o.phone ? ` · ${o.phone}` : ""}</div>
              <div>Pay: <span className="text-bone">{o.payment_method === "phone" ? "Phone" : "Wire/ACH"}</span> · Fulfil: <span className="text-bone">{o.fulfillment === "willcall" ? "Will call" : "Ship"}</span></div>
            </div>
            {o.fulfillment === "ship" && o.shipping && (
              <div className="mt-1 text-xs text-muted">
                Ship to: {[o.shipping.name, o.shipping.line1, o.shipping.line2, o.shipping.city, o.shipping.state, o.shipping.zip].filter(Boolean).join(", ")}
              </div>
            )}
            <div className="mt-2 text-xs text-muted">
              {o.lines.map((l) => `${l.name}×${l.qty}`).join(" · ")}
            </div>
            {o.notes && <div className="mt-1 text-xs italic text-muted">&ldquo;{o.notes}&rdquo;</div>}
            <div className="mt-3 flex flex-wrap gap-2">
              {o.status === "pending_payment" && (
                <>
                  <button disabled={busyId === o.id} onClick={() => act(o.id, "confirm_payment")}
                    className="rounded-lg bg-vg-grad px-3 py-1.5 text-xs font-bold text-ink-0 disabled:opacity-50">
                    {busyId === o.id ? "Working…" : "Confirm Payment → Release"}
                  </button>
                  <button disabled={busyId === o.id} onClick={() => act(o.id, "cancel")}
                    className="rounded-lg border border-vanguard-rose/40 px-3 py-1.5 text-xs font-bold text-vanguard-rose disabled:opacity-50">Cancel</button>
                </>
              )}
              {o.status === "payment_confirmed" && o.fulfillment === "ship" && (
                <button disabled={busyId === o.id} onClick={() => act(o.id, "mark_shipped")}
                  className="rounded-lg border border-vanguard-violet/40 px-3 py-1.5 text-xs font-bold text-vanguard-violet disabled:opacity-50">Mark Shipped</button>
              )}
              {(o.status === "payment_confirmed" || o.status === "shipped") && (
                <button disabled={busyId === o.id} onClick={() => act(o.id, "complete")}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold text-bone disabled:opacity-50">Complete</button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
