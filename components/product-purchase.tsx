"use client";

import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Variant } from "@/types";
import { VialComposite } from "@/components/vial-composite";

export function ProductPurchase({
  slug,
  name,
  variants,
  mode = "card",
}: {
  slug: string;
  name: string;
  variants: Variant[];
  mode?: "card" | "detail";
}) {
  const { add } = useCart();
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = variants[idx];
  const isDetail = mode === "detail";

  const originalPrice = useMemo(() => {
    if (!variant?.onSale || !variant.percentOff) return null;
    return variant.price / (1 - variant.percentOff / 100);
  }, [variant]);

  if (!variant) return null;

  function addSelected() {
    for (let i = 0; i < qty; i += 1) {
      add({ slug, size: variant.size, name, listPrice: variant.price });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className={isDetail ? "product-purchase product-purchase--detail" : "product-purchase"}>
      <div className="product-purchase__visual" aria-live="polite">
        <VialComposite
          slug={slug}
          name={name}
          size={variant.size}
          width={isDetail ? 250 : 150}
          className="product-purchase__vial"
        />
        <div className="product-purchase__halo" aria-hidden />
      </div>

      <div className="product-purchase__controls">
        {variants.length > 1 && (
          <div className="variant-picker" role="group" aria-label={`${name} vial strength`}>
            {variants.map((item, index) => (
              <button
                key={item.size}
                type="button"
                onClick={() => setIdx(index)}
                aria-pressed={index === idx}
                className={index === idx ? "is-active" : ""}
              >
                {item.size}
              </button>
            ))}
          </div>
        )}

        <div className="product-purchase__price-row">
          <div>
            <div className="product-purchase__price">
              ${variant.price.toFixed(2)}
              <span>/ vial</span>
            </div>
            {originalPrice && (
              <div className="product-purchase__sale">
                <s>${originalPrice.toFixed(2)}</s> · Save {variant.percentOff}%
              </div>
            )}
          </div>

          {isDetail && (
            <div className="quantity-picker" aria-label="Quantity">
              <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((value) => Math.min(99, value + 1))} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>

        <button type="button" onClick={addSelected} className="product-purchase__add">
          {added ? <Check size={17} /> : <ShoppingCart size={17} />}
          {added ? "Added to order" : isDetail ? `Add ${qty} to order` : "Add to order"}
        </button>

        <p className="product-purchase__note">
          Research use only. Final availability, shipping, and business terms are confirmed during order review.
        </p>
      </div>
    </div>
  );
}
