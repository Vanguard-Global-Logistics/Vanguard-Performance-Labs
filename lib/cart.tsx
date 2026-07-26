"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = { slug: string; size: string; name: string; listPrice: number; qty: number };

/** Cart lines are unique per compound AND vial size. */
export const lineKey = (slug: string, size: string) => `${slug}::${size}`;

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
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
                typeof (x as CartItem).size === "string" &&
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
      const i = xs.findIndex((x) => lineKey(x.slug, x.size) === lineKey(item.slug, item.size));
      if (i >= 0) { const c = [...xs]; c[i] = { ...c[i], qty: Math.min(99, c[i].qty + qty) }; return c; }
      return [...xs, { ...item, qty }];
    });
  const remove = (key: string) => setItems((xs) => xs.filter((x) => lineKey(x.slug, x.size) !== key));
  const setQty = (key: string, qty: number) =>
    setItems((xs) =>
      qty <= 0
        ? xs.filter((x) => lineKey(x.slug, x.size) !== key)
        : xs.map((x) => (lineKey(x.slug, x.size) === key ? { ...x, qty: Math.min(99, qty) } : x))
    );
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
