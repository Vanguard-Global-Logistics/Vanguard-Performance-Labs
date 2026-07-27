"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, RefreshCw, ShieldCheck, XCircle } from "lucide-react";
import { GlassCard, GlowButton } from "@/components/ui";
import type { Order } from "@/lib/orders-store";

type LaunchStatus = {
  readyForLiveOrders: boolean;
  environment: string;
  services: Record<string, boolean>;
  critical: Record<string, boolean>;
};

const SERVICE_LABEL: Record<string, string> = {
  anthropic: "Anthropic / Jessie",
  orderPersistence: "Supabase order persistence",
  customerEmail: "Resend customer email",
  ownerEmailAlert: "Owner email alerts",
  paymentPhone: "Payment phone",
  shippingWebhook: "Shipping webhook",
  siteUrl: "Production site URL",
  adminProtection: "Admin protection",
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [status, setStatus] = useState<LaunchStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(value = token) {
    setError(null);
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${value}` };
      const [ordersResponse, statusResponse] = await Promise.all([
        fetch("/api/admin/orders", { headers, cache: "no-store" }),
        fetch("/api/admin/status", { headers, cache: "no-store" }),
      ]);
      if (!ordersResponse.ok || !statusResponse.ok) {
        setError(ordersResponse.status === 401 || statusResponse.status === 401
          ? "Invalid token, or ADMIN_TOKEN is not configured."
          : "The admin command center could not be loaded.");
        return;
      }
      const orderData = await ordersResponse.json();
      const statusData = await statusResponse.json();
      setOrders(Array.isArray(orderData.orders) ? orderData.orders : []);
      setStatus(statusData);
    } catch {
      setError("The admin command center could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  async function act(id: string, action: string) {
    setBusyId(id);
    setError(null);
    try {
      const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, action }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setError(data.error ?? "The order action failed.");
        return;
      }
      await load();
    } catch {
      setError("The order action could not reach the server.");
    } finally {
      setBusyId(null);
    }
  }

  if (orders === null) {
    return (
      <div className="launch-page">
        <section className="mx-auto mt-10 max-w-lg">
          <GlassCard className="p-7">
            <div className="launch-kicker">Owner Access</div>
            <h1 className="mt-3 font-serif text-4xl font-normal text-bone">Vanguard order command center</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">Enter the private ADMIN_TOKEN stored in Vercel. The token is used for this browser session and is never displayed by the website.</p>
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && load()}
              placeholder="Admin token"
              aria-label="Admin token"
              autoComplete="current-password"
              className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-bone outline-none focus:border-vanguard-violet/60"
            />
            {error && <p className="mt-3 text-xs text-vanguard-rose" role="alert">{error}</p>}
            <div className="mt-5"><GlowButton onClick={() => load()}>{loading ? "Opening…" : "Open command center"}</GlowButton></div>
          </GlassCard>
        </section>
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    pending_payment: "text-vanguard-amber",
    payment_confirmed: "text-vanguard-teal",
    shipped: "text-vanguard-violet",
    completed: "text-muted",
    cancelled: "text-vanguard-rose",
  };
  const pending = orders.filter((order) => order.status === "pending_payment").length;
  const active = orders.filter((order) => ["payment_confirmed", "shipped"].includes(order.status)).length;

  return (
    <div className="launch-page admin-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Owner Command Center</div>
          <h1>Orders, integrations, and launch readiness in one place.</h1>
          <p>Confirm payment, release fulfillment, monitor production services, and catch missing settings before they affect a customer.</p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{orders.length}</strong><span>Total orders</span></div>
          <div><strong>{pending}</strong><span>Awaiting payment</span></div>
          <div><strong>{active}</strong><span>Active fulfillment</span></div>
          <div><strong>{status?.readyForLiveOrders ? "GO" : "HOLD"}</strong><span>Live order readiness</span></div>
        </div>
      </section>

      <section className="mt-5">
        <GlassCard className={`p-5 ${status?.readyForLiveOrders ? "border-vanguard-teal/35" : "border-vanguard-amber/35"}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {status?.readyForLiveOrders ? <CheckCircle2 className="text-vanguard-teal" /> : <AlertTriangle className="text-vanguard-amber" />}
              <div>
                <h2 className="font-display text-lg font-bold text-bone">{status?.readyForLiveOrders ? "Critical live-order services are configured" : "Live orders need configuration"}</h2>
                <p className="text-xs text-muted">Environment: {status?.environment ?? "unknown"}</p>
              </div>
            </div>
            <button type="button" onClick={() => load()} className="inline-flex items-center gap-2 text-xs text-vanguard-violet"><RefreshCw size={14} /> Refresh status</button>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {status && Object.entries(status.services).map(([key, configured]) => (
              <div key={key} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-3">
                {configured ? <CheckCircle2 size={16} className="shrink-0 text-vanguard-teal" /> : <XCircle size={16} className="shrink-0 text-vanguard-rose" />}
                <span className="text-[11px] text-muted">{SERVICE_LABEL[key] ?? key}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="launch-kicker">Order Board</div>
            <h2 className="mt-2 font-serif text-4xl font-normal text-bone">Reviewed business orders</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/content" className="text-xs text-vanguard-violet hover:underline">Content queue</Link>
            <button type="button" onClick={() => load()} className="inline-flex items-center gap-2 text-xs text-vanguard-violet"><RefreshCw size={13} /> Refresh orders</button>
          </div>
        </div>

        {error && <p className="mt-3 text-xs text-vanguard-rose" role="alert">{error}</p>}
        <div className="mt-5 space-y-4">
          {orders.length === 0 && <GlassCard className="p-8 text-center text-muted">No orders have been submitted yet.</GlassCard>}
          {orders.map((order) => {
            const canComplete = (order.fulfillment === "willcall" && order.status === "payment_confirmed") ||
              (order.fulfillment === "ship" && order.status === "shipped");
            return (
              <GlassCard key={order.id} className="p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm font-bold text-bone">{order.id}</span>
                  <span className={`text-xs font-bold uppercase ${statusColor[order.status] ?? "text-muted"}`}>{order.status.replaceAll("_", " ")}</span>
                  <span className="text-xs text-muted">{new Date(order.created_at).toLocaleString()}</span>
                  <span className="ml-auto font-display font-bold text-bone tabular-nums">${Number(order.total).toFixed(2)}</span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
                  <div><span className="text-bone">{order.company}</span>{order.contact ? ` · ${order.contact}` : ""}<br /><span className="text-xs">{order.email}{order.phone ? ` · ${order.phone}` : ""}</span></div>
                  <div>Payment: <span className="text-bone">{order.payment_method === "phone" ? "Phone" : "Wire / ACH"}</span><br />Fulfillment: <span className="text-bone">{order.fulfillment === "willcall" ? "Will call" : "Ship"}</span></div>
                </div>
                {order.fulfillment === "ship" && order.shipping && (
                  <div className="mt-2 text-xs text-muted">Ship to: {[order.shipping.name, order.shipping.line1, order.shipping.line2, order.shipping.city, order.shipping.state, order.shipping.zip].filter(Boolean).join(", ")}</div>
                )}
                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-muted">{order.lines.map((line) => `${line.name} × ${line.qty}`).join(" · ")}</div>
                {order.notes && <div className="mt-2 text-xs italic text-muted">“{order.notes}”</div>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {order.status === "pending_payment" && (
                    <>
                      <button disabled={busyId === order.id} onClick={() => act(order.id, "confirm_payment")} className="rounded-lg bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] px-3 py-2 text-xs font-bold text-[#130f08] disabled:opacity-50">{busyId === order.id ? "Working…" : order.fulfillment === "ship" ? "Confirm payment and release" : "Confirm payment"}</button>
                      <button disabled={busyId === order.id} onClick={() => act(order.id, "cancel")} className="rounded-lg border border-vanguard-rose/40 px-3 py-2 text-xs font-bold text-vanguard-rose disabled:opacity-50">Cancel unpaid request</button>
                    </>
                  )}
                  {order.status === "payment_confirmed" && order.fulfillment === "ship" && (
                    <button disabled={busyId === order.id} onClick={() => act(order.id, "mark_shipped")} className="rounded-lg border border-vanguard-violet/40 px-3 py-2 text-xs font-bold text-vanguard-violet disabled:opacity-50">Mark shipped and notify customer</button>
                  )}
                  {canComplete && (
                    <button disabled={busyId === order.id} onClick={() => act(order.id, "complete")} className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-bone disabled:opacity-50">Complete and notify customer</button>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <div className="mt-6 flex items-start gap-2 text-[10px] leading-relaxed text-muted"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-vanguard-amber" /> This board is excluded from search indexing and requires the private server-side ADMIN_TOKEN for every read or write action. Status changes send customer notifications when Resend is configured.</div>
    </div>
  );
}
