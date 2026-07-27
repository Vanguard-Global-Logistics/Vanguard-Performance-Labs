"use client";

import { useState } from "react";
import { CheckCircle, FileCheck2 } from "lucide-react";
import { GlowButton } from "@/components/ui";

export function WholesaleForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ack, setAck] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErr(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!data.legal_name?.trim()) return setErr("Legal company name is required.");
    if (!data.buyer_name?.trim()) return setErr("A buyer or account contact is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) return setErr("A valid work email is required.");
    if (!data.business_type) return setErr("Select a business type.");
    if (!ack) return setErr("Confirm the research-use and business-application terms.");

    setBusy(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "wholesale_application", company: data.legal_name, ...data }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "The application could not be delivered.");
      setSent(true);
      form.reset();
      setAck(false);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "The application could not be delivered. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-vanguard-teal/40 bg-vanguard-teal/10 p-6 text-center" role="status">
        <CheckCircle className="mx-auto text-vanguard-teal" />
        <div className="mt-2 font-display font-bold text-bone">Application received</div>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Your wholesale application was saved securely and sent to the Vanguard team. We will request any resale certificate, business license, or tax documentation through a secure follow-up after the initial review.
        </p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 text-xs text-vanguard-violet hover:underline">Submit another application</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <Group title="Business">
        <Field name="legal_name" label="Legal company name *" autoComplete="organization" required />
        <Field name="dba" label="DBA / trade name" />
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-muted">Business type *</span>
          <select name="business_type" defaultValue="" required className="w-full rounded-lg border border-white/10 bg-[#0b0917] px-3 py-2 text-sm text-bone outline-none focus:border-vanguard-violet/60">
            <option value="">Select…</option>
            {["Medical clinic", "Med spa", "Research laboratory", "University", "Wellness center", "Functional medicine", "Distributor", "Other"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <Field name="website" label="Company website" type="url" autoComplete="url" />
      </Group>

      <Group title="Contact">
        <Field name="buyer_name" label="Buyer / account contact *" autoComplete="name" required />
        <Field name="email" label="Work email *" type="email" autoComplete="email" required />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Field name="ap_contact" label="Accounts payable contact" />
      </Group>

      <Group title="Shipping & billing">
        <Field name="billing_city" label="Billing city / state" autoComplete="billing address-level2" />
        <Field name="shipping_city" label="Shipping city / state" autoComplete="shipping address-level2" />
      </Group>

      <Group title="Order profile">
        <Field name="expected_volume" label="Expected monthly volume" />
        <Field name="requested_products" label="Products of interest" />
      </Group>

      <div className="flex items-start gap-3 rounded-xl border border-vanguard-amber/25 bg-vanguard-amber/[0.05] p-4">
        <FileCheck2 size={18} className="mt-0.5 shrink-0 text-vanguard-amber" />
        <div>
          <div className="text-xs font-bold text-bone">Business documentation is requested after initial review</div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">This form does not upload files. Vanguard will send secure instructions for resale certificates, licenses, or tax records only when they are needed.</p>
        </div>
      </div>

      <label className="block">
        <span className="mb-1 block text-[11px] font-medium text-muted">Additional information</span>
        <textarea name="notes" rows={4} placeholder="Anything else we should know?" className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted focus:border-vanguard-violet/60" />
      </label>

      <label className="flex items-start gap-2.5 text-xs text-muted">
        <input type="checkbox" checked={ack} onChange={(event) => setAck(event.target.checked)} className="mt-0.5 accent-[#a855f7]" />
        <span>
          I confirm I am applying on behalf of a business, and that research materials are for laboratory research use only, not for human consumption. Submitting this application does not create an approved account, guarantee pricing, or place an order.
        </span>
      </label>

      {err && <p className="text-xs text-vanguard-rose" role="alert">{err}</p>}
      <GlowButton type="submit">{busy ? "Submitting securely…" : "Apply for a wholesale account"}</GlowButton>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-vanguard-amber">{title}</legend>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
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
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} required={required} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none focus:border-vanguard-violet/60" />
    </label>
  );
}
