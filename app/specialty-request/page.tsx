"use client";

import { useState } from "react";
import { CheckCircle, FileSearch, FlaskConical, Scale, ShieldAlert, ShieldCheck } from "lucide-react";
import { DisclaimerBanner, GlassCard, GlowButton } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export default function SpecialtyRequestPage() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErr(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.company?.trim()) return setErr("Company or institution is required.");
    if (!data.contact?.trim()) return setErr("A contact name is required.");
    if (!data.compound?.trim()) return setErr("The requested compound or material is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) return setErr("A valid work email is required.");
    if (!ack) return setErr("Confirm the research-use and quotation terms before submitting.");

    setBusy(true);
    try {
      const response = await fetch("/api/specialty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ack }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "The sourcing request could not be delivered.");
      setReference(result.ref);
      form.reset();
      setAck(false);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "The sourcing request could not be delivered.");
    } finally {
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div className="launch-page specialty-page">
        <section className="checkout-success">
          <CheckCircle size={48} />
          <div className="launch-kicker mt-4">Specialty request received</div>
          <h1>{reference}</h1>
          <p>Your request was stored securely and routed for human review. Vanguard will evaluate documentation, legality, supplier traceability, research-use context, availability, and pricing before responding.</p>
          <p>This confirmation is not a quote, an order, or a promise that the requested material can be sourced.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <GlowButton href="/products">Browse the catalog</GlowButton>
            <GlowButton href="/education" variant="secondary">Open the evidence library</GlowButton>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="launch-page specialty-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Specialty Research Sourcing</div>
          <h1>Tell Vanguard the specification—not just the compound name.</h1>
          <p>
            Qualified businesses and institutions can request review of a research material that is not listed in the public catalog. Every request is evaluated for identity, documentation, legality, research-use context, supplier traceability, and realistic availability.
          </p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>1</strong><span>Detailed request</span></div>
          <div><strong>5</strong><span>Review controls</span></div>
          <div><strong>0</strong><span>Automatic promises</span></div>
          <div><strong>100%</strong><span>Human reviewed</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Specialty sourcing standards">
        <div><FileSearch /><span><strong>Identity review</strong>Compound, CAS, format, purity, and documentation</span></div>
        <div><Scale /><span><strong>Legal review</strong>Controlled and prohibited requests are declined</span></div>
        <div><ShieldCheck /><span><strong>Durable intake</strong>Production requests require secure storage</span></div>
        <div><FlaskConical /><span><strong>Research-only context</strong>No human or veterinary administration</span></div>
      </section>

      <section className="commerce-layout mt-6">
        <GlassCard className="checkout-form-card">
          <div className="launch-kicker">Request specification</div>
          <h2 className="mt-2 font-serif text-4xl font-normal text-bone">What does the research require?</h2>
          <p className="mt-3 mb-6 text-sm leading-7 text-muted">More specific requests receive more useful reviews. Include identifiers, desired format, purity requirement, quantity, and timeline where known.</p>

          <form onSubmit={submit} className="space-y-5" noValidate>
            <fieldset>
              <legend className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-vanguard-amber">Material specification</legend>
              <div className="checkout-fields">
                <Field name="compound" label="Compound or material *" required />
                <Field name="cas" label="CAS number / identifier" />
                <Field name="quantity" label="Quantity and vial size" placeholder="Example: 10 vials, 10 mg each" />
                <Field name="purity" label="Purity requirement" placeholder="Example: ≥98% by HPLC" />
                <Field name="application" label="Research application" />
                <Field name="timeline" label="Target timeline" />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-vanguard-amber">Business contact</legend>
              <div className="checkout-fields">
                <Field name="company" label="Company / institution *" autoComplete="organization" required />
                <Field name="contact" label="Contact name *" autoComplete="name" required />
                <Field name="email" label="Work email *" type="email" autoComplete="email" required />
                <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
              </div>
            </fieldset>

            <label className="checkout-field checkout-field--wide">
              <span>Additional notes</span>
              <textarea name="notes" rows={4} placeholder="Documentation requirements, packaging constraints, or other details" />
            </label>

            <label className="checkout-ack">
              <input type="checkbox" checked={ack} onChange={(event) => setAck(event.target.checked)} />
              <span>I am requesting on behalf of a business or institution for laboratory research use only, not for human or veterinary consumption. This is a request for review and quotation, not an order or confirmation of availability.</span>
            </label>

            {err && <div className="checkout-error" role="alert">{err}</div>}
            <button type="submit" className="checkout-submit" disabled={busy}><ShieldCheck size={18} /> {busy ? "Saving and routing…" : "Submit specialty sourcing request"}</button>
          </form>
        </GlassCard>

        <aside className="space-y-4">
          <GlassCard className="p-6">
            <FlaskConical className="text-vanguard-amber" />
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">How review works</h2>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li><strong className="text-bone">1.</strong> Vanguard reviews the requested identity and specification.</li>
              <li><strong className="text-bone">2.</strong> The team checks legality, traceability, documentation, and research-use context.</li>
              <li><strong className="text-bone">3.</strong> A qualified request receives availability and pricing—or an honest decline.</li>
              <li><strong className="text-bone">4.</strong> Accepted quotes move into the reviewed business ordering workflow.</li>
            </ol>
          </GlassCard>

          <GlassCard className="border-vanguard-amber/30 p-6">
            <ShieldAlert className="text-vanguard-amber" />
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">Requests Vanguard declines</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
              <li>Controlled or scheduled substances</li>
              <li>Materials requested for human or veterinary administration</li>
              <li>Approved-drug APIs represented as research supply</li>
              <li>Materials that cannot be documented for identity and purity</li>
              <li>Requests outside lawful laboratory research supply</li>
            </ul>
          </GlassCard>

          <DisclaimerBanner text={DISCLAIMER} />
        </aside>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="checkout-field">
      <span>{label}</span>
      <input name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} />
    </label>
  );
}
