"use client";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart";

export function AddToCart({
  slug, name, strength, listPrice, compact = false,
}: { slug: string; name: string; strength?: string; listPrice: number; compact?: boolean }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  function handle() {
    add({ slug, name, strength, listPrice });
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  }

  return (
    <button
      onClick={handle}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-vg-grad font-bold text-ink-0 transition ${compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"}`}
      aria-label={`Add ${name} to order`}
    >
      {done ? <Check size={compact ? 14 : 16} /> : <ShoppingCart size={compact ? 14 : 16} />}
      {done ? "Added" : "Add to Order"}
    </button>
  );
}
