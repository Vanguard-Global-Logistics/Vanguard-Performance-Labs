"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { ACTION_LABEL, type OrderingMode } from "@/types";
import { GlowButton } from "@/components/ui";

export function B2BForm({
  product,
  action,
  allowed,
}: {
  product: string;
  action: OrderingMode;
  allowed: OrderingMode[];
}) {
  const [mode, setMode] = useState<OrderingMode>(action);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("action") as OrderingMode | null;
    if (requested && allowed.includes(requested)) setMode(requested);
  }, [allowed]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErr(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.company?.trim()) return setErr("Company or practice is required.");
    if (!data.name?.trim()) return setErr("A contact name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) return setErr("A valid work email is required.");

    setBusy(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, mode, ...data }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "The request could not be delivered.");
      setSent(true);
      form.reset();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "The request could not be delivered. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-vanguard-teal/40 bg-vanguard-teal/10 p-5 text-center" role="status">
        <CheckCircle className="mx-auto text-vanguard-teal" />
        <div className="mt-2 font-semibold text-bone">Request received</div>
        <p className="mt-1 text-sm text-muted">Your {ACTION_LABEL[mode].toLowerCase()} was saved securely and sent to the Vanguard team.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 text-xs text-vanguard-violet hover:underline">Submit another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      {allowed.length > 1 && (
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-muted">Request type</span>
          <select value={mode} onChange={(event) => setMode(event.target.value as OrderingMode)} className="w-full rounded-lg border border-white/10 bg-[#0b0917] px-3 py-2 text-sm text-bone">
            {allowed.map((item) => <option key={item} value={item}>{ACTION_LABEL[item]}</option>)}
          </select>
        </label>
      )}
      <Field name="company" label="Company / practice *" autoComplete="organization" required />
      <Field name="name" label="Contact name *" autoComplete="name" required />
      <Field name="email" label="Work email *" type="email" autoComplete="email" required />
      <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
      {(mode === "quote_only" || mode === "po_only") && (
        <div className="grid grid-cols-2 gap-3">
          <Field name="quantity" label="Quantity" inputMode="numeric" />
          <Field name="size" label="Size / format" />
        </div>
      )}
      {mode === "po_only" && <Field name="po_number" label="Customer PO number" />}
      <label className="block">
        <span className="mb-1 block text-[11px] font-medium text-muted">Notes</span>
        <textarea name="message" rows={4} placeholder="Specifications, intended research context, or questions" className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted focus:border-vanguard-violet/60" />
      </label>
      {err && <p className="text-xs text-vanguard-rose" role="alert">{err}</p>}
      <p className="text-[10px] leading-relaxed text-muted">A PO number or reference entered here does not constitute an approved or paid order. Every request is reviewed by the Vanguard team.</p>
      <GlowButton type="submit">{busy ? "Sending securely…" : ACTION_LABEL[mode]}</GlowButton>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
  inputMode,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} required={required} inputMode={inputMode} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none focus:border-vanguard-violet/60" />
    </label>
  );
}
