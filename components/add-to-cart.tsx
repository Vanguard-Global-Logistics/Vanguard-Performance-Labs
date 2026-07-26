"use client";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Variant } from "@/types";

export function AddToCart({
  slug, name, variants, compact = false,
}: { slug: string; name: string; variants: Variant[]; compact?: boolean }) {
  const { add } = useCart();
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const v = variants[idx];
  if (!v) return null;

  function handle() {
    add({ slug, size: v.size, name, listPrice: v.price });
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  }

  return (
    <div className={compact ? "w-full space-y-2" : "space-y-3"}>
      {variants.length > 1 && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={`${name} vial size`}>
          {variants.map((x, i) => (
            <button key={x.size} onClick={() => setIdx(i)} aria-pressed={i === idx}
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                i === idx ? "border-vanguard-violet bg-vanguard-violet/15 text-vanguard-violet" : "border-white/10 text-muted hover:border-white/25"
              }`}>
              {x.size}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-display font-black text-bone tabular-nums ${compact ? "text-base" : "text-2xl"}`}>${v.price.toFixed(2)}</span>
          <span className="text-[10px] text-muted">/ {v.size}</span>
          {v.onSale && <span className="rounded bg-vanguard-rose/20 px-1.5 py-0.5 text-[9px] font-bold text-vanguard-rose">SALE</span>}
        </div>
        <button onClick={handle} aria-label={`Add ${name} ${v.size} to order`}
          className={`inline-flex items-center justify-center gap-2 rounded-lg bg-vg-grad font-bold text-ink-0 transition ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"}`}>
          {done ? <Check size={compact ? 13 : 16} /> : <ShoppingCart size={compact ? 13 : 16} />}
          {done ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}
