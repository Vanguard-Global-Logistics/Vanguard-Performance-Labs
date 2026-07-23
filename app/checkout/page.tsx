"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Landmark, CreditCard, Phone } from "lucide-react";
import { useCart } from "@/lib/cart";
import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const [payment, setPayment] = useState<"wire" | "phone">("wire");
  const [fulfil, setFulfil] = useState<"ship" | "willcall">("ship");
  const [done, setDone] = useState<{ orderId: string; total: number; instructions: string } | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const d = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (!d.company?.trim()) return setErr("Company is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "")) return setErr("A valid work email is required.");
    if (!ack) return setErr("You must confirm the research-use terms.");
    if (fulfil === "ship" && (!d.ship_line1?.trim() || !d.ship_city?.trim() || !d.ship_zip?.trim()))
      return setErr("Shipping address (street, city, ZIP) is required — or choose Will Call.");
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...d, ack,
          paymentMethod: payment,
          fulfillment: fulfil,
          shipping: fulfil === "ship" ? { name: d.ship_name, line1: d.ship_line1, line2: d.ship_line2, city: d.ship_city, state: d.ship_state, zip: d.ship_zip } : undefined,
          items: items.map(({ slug, qty }) => ({ slug, qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Order failed");
      setDone({ orderId: data.orderId, total: data.total, instructions: data.settlement.instructions });
      clear();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <GlassCard className="p-8 text-center">
          <CheckCircle className="mx-auto text-vanguard-teal" size={40} />
          <h1 className="mt-3 font-display text-2xl font-black text-bone">Order {done.orderId} received</h1>
          <p className="mt-1 text-sm font-bold text-vanguard-violet">Order total (list): ${done.total.toFixed(2)}</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">{done.instructions}</p>
          <div className="mt-6 flex justify-center gap-3">
            <GlowButton href="/products">Back to Products</GlowButton>
            <GlowButton href="/contact" variant="secondary">Questions?</GlowButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-muted">Your order is empty.</p>
        <div className="mt-5"><GlowButton href="/products">Browse Research Products</GlowButton></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Checkout</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <GlassCard className="p-6">
          <form onSubmit={submit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <F name="company" label="Company / Institution *" />
              <F name="contact" label="Contact name" />
              <F name="email" label="Work email *" type="email" />
              <F name="phone" label="Phone" />
            </div>
            <textarea name="notes" rows={3} placeholder="Shipping notes, PO reference, questions…"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted" />
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-vanguard-violet">Fulfilment</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 text-xs ${fulfil === "ship" ? "border-vanguard-violet/60 bg-vanguard-violet/10" : "border-white/10"}`}>
                  <input type="radio" name="fulfil" checked={fulfil === "ship"} onChange={() => setFulfil("ship")} className="mt-0.5 accent-[#a855f7]" />
                  <span><span className="font-bold text-bone">Ship to my address</span><br /><span className="text-muted">Released to our shipping partner after payment is confirmed.</span></span>
                </label>
                <label className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 text-xs ${fulfil === "willcall" ? "border-vanguard-violet/60 bg-vanguard-violet/10" : "border-white/10"}`}>
                  <input type="radio" name="fulfil" checked={fulfil === "willcall"} onChange={() => setFulfil("willcall")} className="mt-0.5 accent-[#a855f7]" />
                  <span><span className="font-bold text-bone">Will call (pickup)</span><br /><span className="text-muted">Pickup details emailed once payment is confirmed.</span></span>
                </label>
              </div>
            </div>
            {fulfil === "ship" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <F name="ship_name" label="Recipient / attention" />
                <F name="ship_line1" label="Street address *" />
                <F name="ship_line2" label="Suite / unit" />
                <F name="ship_city" label="City *" />
                <F name="ship_state" label="State" />
                <F name="ship_zip" label="ZIP *" />
              </div>
            )}
            <label className="flex items-start gap-2.5 text-xs text-muted">
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-0.5 accent-[#a855f7]" />
              <span>I am ordering on behalf of a business or institution. I confirm all materials are for
              laboratory research use only — not for human consumption — and that submitting this order
              does not constitute payment.</span>
            </label>
            {err && <p className="text-xs text-vanguard-rose">{err}</p>}
            <GlowButton type="submit">{busy ? "Submitting…" : "Submit Order"}</GlowButton>
          </form>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="text-sm font-bold text-bone">Order summary</div>
            {items.map((it) => (
              <div key={it.slug} className="mt-2 flex justify-between text-sm text-muted">
                <span>{it.name} × {it.qty}</span>
                <span className="tabular-nums">${(it.qty * it.listPrice).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-sm font-bold text-bone">
              <span>Subtotal (list)</span><span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-sm font-bold text-bone">Payment method</div>
            <label className={`mt-3 flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 ${payment === "wire" ? "border-vanguard-violet/60 bg-vanguard-violet/10" : "border-white/10"}`}>
              <input type="radio" name="pay" checked={payment === "wire"} onChange={() => setPayment("wire")} className="mt-0.5 accent-[#a855f7]" />
              <span className="text-xs text-bone"><Landmark size={14} className="mr-1 inline text-vanguard-violet" /><span className="font-bold">Bank Wire / ACH.</span>{" "}
                <span className="text-muted">Invoice with transfer instructions is emailed after review.</span></span>
            </label>
            <label className={`mt-2 flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 ${payment === "phone" ? "border-vanguard-violet/60 bg-vanguard-violet/10" : "border-white/10"}`}>
              <input type="radio" name="pay" checked={payment === "phone"} onChange={() => setPayment("phone")} className="mt-0.5 accent-[#a855f7]" />
              <span className="text-xs text-bone"><Phone size={14} className="mr-1 inline text-vanguard-violet" /><span className="font-bold">Call to pay by phone.</span>{" "}
                <span className="text-muted">Your order is saved; call our team to arrange payment.</span></span>
            </label>
            <div className="mt-2 flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 opacity-70">
              <CreditCard size={16} className="mt-0.5 shrink-0 text-muted" />
              <div className="text-xs text-muted"><span className="font-bold text-bone">Card payment</span> — coming soon, pending merchant approval.</div>
            </div>
            <p className="mt-3 text-[10px] text-muted">Your order is saved immediately and held as <span className="font-bold text-vanguard-amber">awaiting payment</span>. Shipping or pickup is released only after our team confirms payment — you&apos;ll get an email at every step.</p>
          </GlassCard>

          <DisclaimerBanner text={DISCLAIMER} />
          <p className="text-[10px] text-muted">By submitting you agree to our <Link href="/legal/terms" className="text-vanguard-violet hover:underline">Terms</Link> and <Link href="/legal/refunds" className="text-vanguard-violet hover:underline">Refund Policy</Link>.</p>
        </div>
      </div>
    </div>
  );
}

function F({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none" />
    </label>
  );
}
