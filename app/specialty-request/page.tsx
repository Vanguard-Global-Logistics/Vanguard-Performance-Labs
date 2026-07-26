"use client";
import { useState } from "react";
import { FlaskConical, CheckCircle, ShieldAlert } from "lucide-react";
import { GlassCard, GlowButton, DisclaimerBanner } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { DISCLAIMER } from "@/lib/content";

export default function SpecialtyRequestPage() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!d.company?.trim() || !d.compound?.trim()) return setErr("Company and compound are required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "")) return setErr("A valid work email is required.");
    if (!ack) return setErr("Please confirm the research-use terms.");
    setBusy(true);
    try {
      const res = await fetch("/api/specialty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, ack }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setRef(data.ref);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally { setBusy(false); }
  }

  if (ref) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <GlassCard className="p-8 text-center">
          <CheckCircle className="mx-auto text-vanguard-teal" size={40} />
          <h1 className="mt-3 font-display text-2xl font-black text-bone">Request {ref} received</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            Our team reviews every sourcing request individually and will respond with availability and
            pricing — or let you know if we can&apos;t source it. Check your inbox for confirmation.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <GlowButton href="/products">Browse Catalog</GlowButton>
            <GlowButton href="/education" variant="secondary">Education Library</GlowButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-3 py-1 text-[11px] font-semibold text-vanguard-violet">
          <FlaskConical size={13} /> SPECIALTY SOURCING
        </div>
        <h1 className="mt-4 font-display text-3xl font-black text-bone sm:text-4xl">
          Need something not in our catalog?
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          We source specialty research compounds for qualified businesses and institutions. Tell us what
          your work requires and we&apos;ll come back with availability, purity documentation, and pricing.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <GlassCard className="p-6">
          <form onSubmit={submit} className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-vanguard-violet">What you need</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <F name="compound" label="Compound name *" />
              <F name="cas" label="CAS number / identifier" />
              <F name="quantity" label="Quantity & vial size" placeholder="e.g. 10 vials, 10mg each" />
              <F name="purity" label="Purity requirement" placeholder="e.g. ≥98% HPLC" />
              <F name="application" label="Research application" />
              <F name="timeline" label="Target timeline" />
            </div>

            <div className="pt-2 text-[11px] font-bold uppercase tracking-widest text-vanguard-violet">Who you are</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <F name="company" label="Company / Institution *" />
              <F name="contact" label="Contact name" />
              <F name="email" label="Work email *" type="email" />
              <F name="phone" label="Phone" />
            </div>

            <textarea name="notes" rows={3} placeholder="Anything else we should know…"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted" />

            <label className="flex items-start gap-2.5 text-xs text-muted">
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-0.5 accent-[#a855f7]" />
              <span>I am requesting on behalf of a business or institution, for laboratory research use only —
              not for human or veterinary consumption. I understand this is a request for quotation, not an
              order, and that availability is not guaranteed.</span>
            </label>

            {err && <p className="text-xs text-vanguard-rose">{err}</p>}
            <GlowButton type="submit">{busy ? "Submitting…" : "Submit Sourcing Request"}</GlowButton>
          </form>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="text-sm font-bold text-bone">How it works</div>
            <ol className="mt-3 space-y-2.5 text-sm text-muted">
              <li><span className="font-bold text-bone">1.</span> You submit the compound and specs.</li>
              <li><span className="font-bold text-bone">2.</span> Our team reviews it against our supplier network.</li>
              <li><span className="font-bold text-bone">3.</span> We respond with availability, purity documentation, and a quote.</li>
              <li><span className="font-bold text-bone">4.</span> If you accept, it&apos;s invoiced and fulfilled like any wholesale order.</li>
            </ol>
          </GlassCard>

          <GlassCard className="border-vanguard-amber/30 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-vanguard-amber">
              <ShieldAlert size={15} /> What we cannot source
            </div>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted">
              <li>· Controlled or scheduled substances</li>
              <li>· Active pharmaceutical ingredients intended for human use</li>
              <li>· Any material requested for human or veterinary administration</li>
              <li>· Anything we cannot document for identity and purity</li>
            </ul>
            <p className="mt-3 text-[11px] text-muted">
              Requests are reviewed individually. We decline anything outside laboratory research supply.
            </p>
          </GlassCard>

          <DisclaimerBanner text={DISCLAIMER} />
        </div>
      </div>
    </div>
  );
}

function F({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type} placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted/60" />
    </label>
  );
}
