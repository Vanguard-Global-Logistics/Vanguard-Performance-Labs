"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useCart, lineKey } from "@/lib/cart";
import { VialComposite } from "@/components/vial-composite";
import { DisclaimerBanner, GlowButton } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export default function CartPage() {
  const { items, setQty, remove, clear, subtotal, count } = useCart();

  return (
    <div className="launch-page cart-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Reviewed Business Ordering</div>
          <h1>Build the order. We verify every detail.</h1>
          <p>
            Your selected compound, vial strength, quantity, and list price stay attached to each line.
            The server validates every item again before an order request is accepted.
          </p>
        </div>
        <div className="commerce-progress" aria-label="Checkout progress">
          <span className="is-active">1</span><i /><span>2</span><i /><span>3</span>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="commerce-empty">
          <h2>Your order is ready for a fresh start.</h2>
          <p>Browse the research catalog, select a vial strength, and the exact choice will appear here.</p>
          <GlowButton href="/products">Explore research products</GlowButton>
        </section>
      ) : (
        <section className="commerce-layout">
          <div className="commerce-stack">
            {items.map((item) => {
              const key = lineKey(item.slug, item.size);
              return (
                <article key={key} className="cart-line">
                  <div className="cart-line__visual">
                    <VialComposite slug={item.slug} name={item.name} size={item.size} width={72} />
                  </div>
                  <div>
                    <h2>{item.name} <span className="text-vanguard-violet">· {item.size}</span></h2>
                    <p>${item.listPrice.toFixed(2)} per research vial · server validated at checkout</p>
                    <Link href={`/products/${item.slug}`} className="mt-2 inline-flex items-center gap-1 text-[10px] text-vanguard-violet hover:underline">
                      Review product <ArrowRight size={11} />
                    </Link>
                  </div>
                  <div className="quantity-picker" aria-label={`${item.name} ${item.size} quantity`}>
                    <button type="button" onClick={() => setQty(key, item.qty - 1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={14} /></button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => setQty(key, item.qty + 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={14} /></button>
                  </div>
                  <div className="cart-line__total">${(item.qty * item.listPrice).toFixed(2)}</div>
                  <button type="button" className="cart-line__remove" onClick={() => remove(key)} aria-label={`Remove ${item.name} ${item.size}`}><Trash2 size={17} /></button>
                </article>
              );
            })}

            <button type="button" onClick={clear} className="justify-self-start text-xs text-muted hover:text-vanguard-rose">
              Clear entire order
            </button>
          </div>

          <aside className="commerce-summary">
            <div className="launch-kicker">Order Summary</div>
            <h2>Review before checkout</h2>
            <div className="commerce-summary__row"><span>Total vials</span><span>{count}</span></div>
            <div className="commerce-summary__row is-total"><span>List subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <p className="commerce-summary__note">
              Shipping, wholesale terms, payment instructions, and final availability are confirmed after human review.
              Submitting checkout does not charge a card.
            </p>
            <div className="commerce-summary__actions">
              <GlowButton href="/checkout">Continue to checkout</GlowButton>
              <GlowButton href="/products" variant="secondary">Continue shopping</GlowButton>
            </div>
            <div className="mt-5 flex items-start gap-2 text-[10px] leading-relaxed text-muted">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-vanguard-amber" />
              Every submitted line is matched against the live catalog before the order is saved.
            </div>
          </aside>
        </section>
      )}

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
