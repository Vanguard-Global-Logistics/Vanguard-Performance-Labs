"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Landmark, Phone, ShieldCheck } from "lucide-react";
import { useCart, lineKey } from "@/lib/cart";
import { DisclaimerBanner, GlowButton } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const [payment, setPayment] = useState<"wire" | "phone">("wire");
  const [fulfil, setFulfil] = useState<"ship" | "willcall">("ship");
  const [done, setDone] = useState<{
    orderId: string;
    paymentReference: string;
    total: number;
    instructions: string;
  } | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErr(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!data.company?.trim()) return setErr("Company or institution is required.");
    if (!data.contact?.trim()) return setErr("A contact name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) return setErr("A valid work email is required.");
    if (!ack) return setErr("Confirm the research-use and business-order terms before submitting.");
    if (fulfil === "ship" && (!data.ship_line1?.trim() || !data.ship_city?.trim() || !data.ship_state?.trim() || !data.ship_zip?.trim())) {
      return setErr("A complete shipping address is required, or select will-call pickup.");
    }

    setBusy(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ack,
          paymentMethod: payment,
          fulfillment: fulfil,
          shipping: fulfil === "ship" ? {
            name: data.ship_name,
            line1: data.ship_line1,
            line2: data.ship_line2,
            city: data.ship_city,
            state: data.ship_state,
            zip: data.ship_zip,
          } : undefined,
          items: items.map(({ slug, size, qty }) => ({ slug, size, qty })),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "The order could not be submitted.");
      if (typeof result.paymentReference !== "string" || !result.paymentReference) {
        throw new Error("The secure payment reference was not generated. Please contact Vanguard before sending payment.");
      }
      setDone({
        orderId: result.orderId,
        paymentReference: result.paymentReference,
        total: result.total,
        instructions: result.settlement.instructions,
      });
      clear();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Something went wrong while submitting the order.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    const evidenceHref = `/payment-evidence?order=${encodeURIComponent(done.orderId)}&ref=${encodeURIComponent(done.paymentReference)}`;
    return (
      <div className="launch-page checkout-page">
        <section className="checkout-success">
          <CheckCircle size={48} />
          <div className="launch-kicker mt-4">Order Request Received</div>
          <h1>{done.orderId}</h1>
          <p><strong className="text-bone">Payment reference: {done.paymentReference}</strong></p>
          <p><strong className="text-bone">List total: ${done.total.toFixed(2)}</strong></p>
          <p>{done.instructions}</p>
          <p>Use the payment reference exactly as provided. Vanguard keeps the complete itemized order in its secure internal record.</p>
          <p>A receipt image can help match a transaction, but it never marks an order paid by itself. Shipping is released only after independent payment verification.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <GlowButton href={evidenceHref}>Submit payment evidence</GlowButton>
            <GlowButton href="/products" variant="secondary">Return to catalog</GlowButton>
            <GlowButton href="/contact" variant="secondary">Contact Vanguard</GlowButton>
          </div>
        </section>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="launch-page checkout-page">
        <section className="commerce-empty">
          <h2>There is nothing to check out yet.</h2>
          <p>Select a research material and vial strength before continuing.</p>
          <GlowButton href="/products">Browse research products</GlowButton>
        </section>
      </div>
    );
  }

  return (
    <div className="launch-page checkout-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Secure Order Request</div>
          <h1>One final review before Vanguard receives your order.</h1>
          <p>
            This checkout saves a reviewed business order request. It does not charge a card. Your selected strengths and prices are validated against the server catalog before acceptance.
          </p>
        </div>
        <div className="commerce-progress" aria-label="Checkout progress">
          <span>1</span><i /><span className="is-active">2</span><i /><span>3</span>
        </div>
      </section>

      <section className="commerce-layout">
        <form onSubmit={submit} className="checkout-form-card" noValidate>
          <div className="checkout-section">
            <div className="launch-kicker">01 · Business Contact</div>
            <h2>Who is placing this order?</h2>
            <p>Use a monitored business email so order updates reach the right person.</p>
            <div className="checkout-fields">
              <Field name="company" label="Company / institution *" autoComplete="organization" required />
              <Field name="contact" label="Contact name *" autoComplete="name" required />
              <Field name="email" label="Work email *" type="email" autoComplete="email" required />
              <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
              <label className="checkout-field checkout-field--wide">
                <span>PO reference, shipping notes, or questions</span>
                <textarea name="notes" rows={3} />
              </label>
            </div>
          </div>

          <div className="checkout-section">
            <div className="launch-kicker">02 · Fulfillment</div>
            <h2>How should the order be released?</h2>
            <div className="checkout-choice-grid">
              <label className={`checkout-choice ${fulfil === "ship" ? "is-active" : ""}`}>
                <input type="radio" name="fulfil" checked={fulfil === "ship"} onChange={() => setFulfil("ship")} />
                <span><strong>Ship to a business address</strong>Released after payment and availability are confirmed.</span>
              </label>
              <label className={`checkout-choice ${fulfil === "willcall" ? "is-active" : ""}`}>
                <input type="radio" name="fulfil" checked={fulfil === "willcall"} onChange={() => setFulfil("willcall")} />
                <span><strong>Will-call pickup</strong>Pickup details are provided after payment review.</span>
              </label>
            </div>

            {fulfil === "ship" && (
              <div className="checkout-fields">
                <Field name="ship_name" label="Recipient / attention" autoComplete="name" />
                <Field name="ship_line1" label="Street address *" autoComplete="address-line1" required />
                <Field name="ship_line2" label="Suite / unit" autoComplete="address-line2" />
                <Field name="ship_city" label="City *" autoComplete="address-level2" required />
                <Field name="ship_state" label="State *" autoComplete="address-level1" required />
                <Field name="ship_zip" label="ZIP *" autoComplete="postal-code" required />
              </div>
            )}
          </div>

          <div className="checkout-section">
            <div className="launch-kicker">03 · Settlement Preference</div>
            <h2>Choose how Vanguard should follow up.</h2>
            <div className="checkout-choice-grid">
              <label className={`checkout-choice ${payment === "wire" ? "is-active" : ""}`}>
                <input type="radio" name="payment" checked={payment === "wire"} onChange={() => setPayment("wire")} />
                <Landmark size={18} />
                <span><strong>Bank wire / ACH invoice</strong>Instructions are sent after order review.</span>
              </label>
              <label className={`checkout-choice ${payment === "phone" ? "is-active" : ""}`}>
                <input type="radio" name="payment" checked={payment === "phone"} onChange={() => setPayment("phone")} />
                <Phone size={18} />
                <span><strong>Arrange payment by phone</strong>Reference the generated payment code.</span>
              </label>
            </div>
          </div>

          <label className="checkout-ack">
            <input type="checkbox" checked={ack} onChange={(event) => setAck(event.target.checked)} />
            <span>
              I am ordering on behalf of a business or institution. I confirm all materials are for laboratory research use only, not for human consumption, and submitting this request does not constitute payment or guarantee availability.
            </span>
          </label>

          {err && <div className="checkout-error" role="alert">{err}</div>}
          <button type="submit" className="checkout-submit" disabled={busy}>
            <ShieldCheck size={18} /> {busy ? "Validating and submitting…" : "Submit reviewed order request"}
          </button>
        </form>

        <aside className="commerce-summary">
          <div className="launch-kicker">Order Summary</div>
          <h2>Selected materials</h2>
          <div className="checkout-summary-list">
            {items.map((item) => (
              <div key={lineKey(item.slug, item.size)} className="checkout-summary-line">
                <span>{item.name} · {item.size} × {item.qty}</span>
                <strong>${(item.qty * item.listPrice).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="commerce-summary__row is-total"><span>List subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <p className="commerce-summary__note">Final shipping, wholesale terms, and settlement instructions are confirmed after human review.</p>
          <div className="mt-5"><DisclaimerBanner text={DISCLAIMER} /></div>
          <p className="mt-4 text-[10px] leading-relaxed text-muted">
            By submitting, you agree to the <Link href="/legal/terms" className="text-vanguard-violet">Terms</Link>, <Link href="/legal/privacy" className="text-vanguard-violet">Privacy Policy</Link>, and <Link href="/legal/refunds" className="text-vanguard-violet">Refund Policy</Link>.
          </p>
        </aside>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="checkout-field">
      <span>{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} required={required} />
    </label>
  );
}
