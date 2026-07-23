import { GlassCard, DisclaimerBanner } from "@/components/ui";
import { WholesaleForm } from "@/components/wholesale-form";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Wholesale",
  description: "Professional and wholesale accounts with documentation, quotes, and purchase-order workflows.",
};

const STEPS = [
  { n: "01", t: "Apply", d: "Submit your business details and resale or licensing documentation." },
  { n: "02", t: "Review", d: "Our team verifies the business and reviews the requested catalog." },
  { n: "03", t: "Terms", d: "Approved accounts receive tiered pricing and payment terms." },
  { n: "04", t: "Order", d: "Place orders by quote, purchase order, or invoice request." },
];

export default function WholesalePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <header className="max-w-2xl">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Wholesale</div>
        <h1 className="mt-2 font-display text-4xl font-black text-bone">Professional & Wholesale Accounts</h1>
        <p className="mt-3 text-muted">
          Vanguard works with clinics, laboratories, universities, and qualified businesses through reviewed
          accounts — not consumer checkout. Apply below and our team will follow up with terms.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <GlassCard key={s.n} className="p-5">
            <div className="font-mono text-xs font-bold text-vanguard-gold">{s.n}</div>
            <div className="mt-1 font-display font-bold text-bone">{s.t}</div>
            <p className="mt-1.5 text-sm text-muted">{s.d}</p>
          </GlassCard>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <GlassCard className="p-6">
          <h2 className="mb-1 font-display text-lg font-bold text-bone">Wholesale Application</h2>
          <p className="mb-5 text-sm text-muted">All fields marked * are required. Review typically takes 2–3 business days.</p>
          <WholesaleForm />
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="text-sm font-bold text-bone">What approved accounts receive</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Tiered pricing for qualified volume</li>
              <li>Certificates of Analysis and batch records</li>
              <li>Quote, purchase-order, and invoice workflows</li>
              <li>A dedicated account contact</li>
              <li>Access to Peptastic OS for clinic operations</li>
            </ul>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="text-sm font-bold text-bone">How approved accounts pay</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><span className="font-semibold text-bone">Bank wire / ACH</span> — invoices include transfer instructions; orders fulfil after payment is verified by our team.</li>
              <li><span className="font-semibold text-bone">Purchase order</span> — net terms available to qualified accounts after review.</li>
            </ul>
            <p className="mt-3 text-[11px] text-muted">We do not accept consumer payment apps (Venmo, Cash App, Apple Cash) — business transactions only, on business rails.</p>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="text-sm font-bold text-bone">Who qualifies</div>
            <p className="mt-2 text-sm text-muted">
              Medical clinics, med spas, research laboratories, universities, wellness and functional-medicine
              practices, and qualified distributors. Business verification is required.
            </p>
          </GlassCard>
          <DisclaimerBanner text={DISCLAIMER} />
        </div>
      </div>
    </div>
  );
}
