"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = { slug: string; name: string; strength?: string; listPrice: number; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "vpl-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        // Validate shape — corrupt/legacy storage must never crash the cart.
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (x): x is CartItem =>
                !!x && typeof x === "object" &&
                typeof (x as CartItem).slug === "string" &&
                typeof (x as CartItem).name === "string" &&
                typeof (x as CartItem).listPrice === "number" &&
                Number.isFinite((x as CartItem).listPrice) &&
                typeof (x as CartItem).qty === "number" && (x as CartItem).qty > 0
            )
          );
        }
      }
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items, ready]);

  const add: CartCtx["add"] = (item, qty = 1) =>
    setItems((xs) => {
      const i = xs.findIndex((x) => x.slug === item.slug);
      if (i >= 0) { const c = [...xs]; c[i] = { ...c[i], qty: Math.min(99, c[i].qty + qty) }; return c; }
      return [...xs, { ...item, qty }];
    });
  const remove = (slug: string) => setItems((xs) => xs.filter((x) => x.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems((xs) => (qty <= 0 ? xs.filter((x) => x.slug !== slug) : xs.map((x) => (x.slug === slug ? { ...x, qty: Math.min(99, qty) } : x))));
  const clear = () => setItems([]);
  const count = items.reduce((n, x) => n + x.qty, 0);
  const subtotal = items.reduce((n, x) => n + x.qty * x.listPrice, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
