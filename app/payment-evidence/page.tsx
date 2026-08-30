"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Upload } from "lucide-react";
import { GlowButton } from "@/components/ui";

export default function PaymentEvidencePage() {
  const [orderId, setOrderId] = useState("");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId((params.get("order") ?? "").slice(0, 80));
    setReference((params.get("ref") ?? "").slice(0, 80));
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);
    setOk(false);
    if (!orderId.trim() || !reference.trim() || !file) {
      setMessage("Order reference, payment reference, and an image are required.");
      return;
    }
    setBusy(true);
    try {
      const form = new FormData();
      form.set("orderId", orderId.trim());
      form.set("paymentReference", reference.trim());
      form.set("evidence", file);
      const response = await fetch("/api/payment-evidence", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Submission failed.");
      setOk(true);
      setMessage("Payment evidence received for review. Your order is not marked paid until Vanguard independently verifies the ledger transaction.");
      setFile(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit payment evidence.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="launch-page checkout-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Secure Payment Review</div>
          <h1>Submit payment evidence without exposing order details.</h1>
          <p>
            Upload a screenshot or receipt image only after using the payment instructions approved for your order. Images assist reconciliation but cannot independently confirm payment.
          </p>
        </div>
        <ShieldCheck size={44} aria-hidden />
      </section>

      <section className="commerce-layout">
        <form onSubmit={submit} className="checkout-form-card" noValidate>
          <div className="checkout-section">
            <div className="launch-kicker">Verification</div>
            <h2>Match your receipt to the secure order record.</h2>
            <div className="checkout-fields">
              <label className="checkout-field">
                <span>Order reference *</span>
                <input value={orderId} onChange={(event) => setOrderId(event.target.value)} maxLength={80} required />
              </label>
              <label className="checkout-field">
                <span>Payment reference *</span>
                <input value={reference} onChange={(event) => setReference(event.target.value.toUpperCase())} maxLength={80} required />
              </label>
              <label className="checkout-field checkout-field--wide">
                <span>Receipt / completed-payment screenshot *</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  required
                />
              </label>
            </div>
            <p className="commerce-summary__note">JPEG, PNG or WebP only. Maximum 5 MB. Evidence is stored privately and is not published.</p>
            {message && <div className={ok ? "checkout-success" : "checkout-error"} role="status">{message}</div>}
            <button type="submit" className="checkout-submit" disabled={busy}>
              <Upload size={18} /> {busy ? "Uploading securely…" : "Submit for payment review"}
            </button>
          </div>
        </form>

        <aside className="commerce-summary">
          <div className="launch-kicker">Important</div>
          <h2>What happens next</h2>
          <p>A trusted payment or bank record must match the payment reference and exact amount before the order can be released.</p>
          <p>Once payment is confirmed, Vanguard can hand the order to the configured shipping provider. Tracking is emailed automatically when the provider reports a valid carrier and tracking number.</p>
          <div className="mt-6"><GlowButton href="/contact" variant="secondary">Contact Vanguard</GlowButton></div>
        </aside>
      </section>
    </div>
  );
}
