"use client";
import { useState } from "react";
import { CheckCircle, Upload } from "lucide-react";
import { GlowButton } from "@/components/ui";

export function WholesaleForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ack, setAck] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const d = Object.fromEntries(fd.entries()) as Record<string, string>;

    if (!d.legal_name?.trim()) return setErr("Legal company name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "")) return setErr("A valid work email is required.");
    if (!d.business_type) return setErr("Select a business type.");
    if (!ack) return setErr("You must acknowledge the research-use terms.");

    setBusy(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "wholesale_application", company: d.legal_name, ...d }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setErr("Something went wrong. Please try again or email us directly.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-vanguard-teal/40 bg-vanguard-teal/10 p-6 text-center">
        <CheckCircle className="mx-auto text-vanguard-teal" />
        <div className="mt-2 font-display font-bold text-bone">Application received</div>
        <p className="mt-1 text-sm text-muted">
          Our team reviews wholesale applications and business documentation before approving an account.
          We&apos;ll follow up with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Group title="Business">
        <Field name="legal_name" label="Legal company name *" />
        <Field name="dba" label="DBA / trade name" />
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-muted">Business type *</span>
          <select name="business_type" defaultValue="" className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none">
            <option value="" className="bg-ink-1">Select…</option>
            {["Medical clinic", "Med spa", "Research laboratory", "University", "Wellness center", "Functional medicine", "Distributor", "Other"].map((o) => (
              <option key={o} value={o} className="bg-ink-1">{o}</option>
            ))}
          </select>
        </label>
        <Field name="website" label="Company website" />
      </Group>

      <Group title="Contact">
        <Field name="buyer_name" label="Buyer / account contact" />
        <Field name="email" label="Work email *" type="email" />
        <Field name="phone" label="Phone" />
        <Field name="ap_contact" label="Accounts payable contact" />
      </Group>

      <Group title="Shipping & billing">
        <Field name="billing_city" label="Billing city / state" />
        <Field name="shipping_city" label="Shipping city / state" />
      </Group>

      <Group title="Order profile">
        <Field name="expected_volume" label="Expected monthly volume" />
        <Field name="requested_products" label="Products of interest" />
      </Group>

      <div>
        <span className="mb-1 block text-[11px] font-medium text-muted">Tax / resale documentation</span>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-3 py-3 text-xs text-muted hover:border-vanguard-violet/50">
          <Upload size={14} className="text-vanguard-violet" />
          <span>Attach resale certificate or business license (PDF/JPG)</span>
          <input type="file" name="tax_doc" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" />
        </label>
        <p className="mt-1 text-[10px] text-muted">Documents are reviewed manually before account approval.</p>
      </div>

      <textarea
        name="notes"
        rows={3}
        placeholder="Anything else we should know?"
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted"
      />

      <label className="flex items-start gap-2.5 text-xs text-muted">
        <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-0.5 accent-[#a855f7]" />
        <span>
          I confirm I am applying on behalf of a business, and that research materials are for research use
          only — not for human consumption. Submitting this application does not create an approved account
          or an order.
        </span>
      </label>

      {err && <p className="text-xs text-vanguard-rose">{err}</p>}
      <GlowButton type="submit">{busy ? "Submitting…" : "Apply for a Wholesale Account"}</GlowButton>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[11px] font-bold uppercase tracking-widest text-vanguard-violet">{title}</legend>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none" />
    </label>
  );
}
