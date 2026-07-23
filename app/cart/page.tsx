"use client";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { ProductVial } from "@/components/product-vial";
import { DISCLAIMER } from "@/lib/content";

export default function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Order Request</h1>
      <p className="mt-2 text-sm text-muted">
        Business orders only. Submitted orders are reviewed by our team and settled by invoice
        (bank wire / ACH). List prices shown; wholesale terms apply to approved accounts.
      </p>

      {items.length === 0 ? (
        <GlassCard className="mt-8 p-10 text-center">
          <p className="text-muted">Your order is empty.</p>
          <div className="mt-5"><GlowButton href="/products">Browse Research Products</GlowButton></div>
        </GlassCard>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            {items.map((it) => (
              <GlassCard key={it.slug} className="flex items-center gap-4 p-4">
                <div className="hidden sm:block"><ProductVial slug={it.slug} name={it.name} strength={it.strength} size={44} /></div>
                <div className="flex-1">
                  <div className="font-display font-bold text-bone">{it.name}{it.strength ? ` · ${it.strength}` : ""}</div>
                  <div className="text-xs text-muted">${it.listPrice.toFixed(2)} list / unit</div>
                </div>
                <div className="flex items-center gap-2">
                  <button aria-label="Decrease quantity" onClick={() => setQty(it.slug, it.qty - 1)} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-bone hover:border-vanguard-violet/50"><Minus size={14} /></button>
                  <span className="w-8 text-center text-sm font-bold text-bone tabular-nums">{it.qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty(it.slug, it.qty + 1)} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-bone hover:border-vanguard-violet/50"><Plus size={14} /></button>
                </div>
                <div className="w-20 text-right text-sm font-bold text-bone tabular-nums">${(it.qty * it.listPrice).toFixed(2)}</div>
                <button aria-label={`Remove ${it.name}`} onClick={() => remove(it.slug)} className="text-muted hover:text-vanguard-rose"><Trash2 size={16} /></button>
              </GlassCard>
            ))}
          </div>

          <div>
            <GlassCard className="p-5">
              <div className="flex items-center justify-between text-sm text-muted"><span>Items</span><span className="tabular-nums">{count}</span></div>
              <div className="mt-2 flex items-center justify-between text-sm text-muted"><span>Subtotal (list)</span><span className="tabular-nums font-bold text-bone">${subtotal.toFixed(2)}</span></div>
              <div className="mt-1 text-[11px] text-muted">Shipping, terms, and final pricing confirmed on your invoice.</div>
              <div className="mt-5"><GlowButton href="/checkout">Proceed to Checkout</GlowButton></div>
              <div className="mt-3 text-center"><Link href="/products" className="text-xs text-vanguard-violet hover:underline">Continue browsing</Link></div>
            </GlassCard>
            <div className="mt-4"><DisclaimerBanner text={DISCLAIMER} /></div>
          </div>
        </div>
      )}
    </div>
  );
}
