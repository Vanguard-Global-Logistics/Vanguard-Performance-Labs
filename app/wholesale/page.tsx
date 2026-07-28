import { BadgeCheck, Building2, FileCheck2, Landmark, ShieldCheck, Truck } from "lucide-react";
import { WholesaleForm } from "@/components/wholesale-form";
import { DisclaimerBanner, GlassCard } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Wholesale",
  description: "Apply for a reviewed Vanguard wholesale account with documented research materials, business pricing, and purchase-order or invoice workflows.",
};

const STEPS = [
  { number: "01", title: "Apply", description: "Submit legal business details, contact information, intended product range, and expected order profile." },
  { number: "02", title: "Verify", description: "Vanguard reviews the business and requests resale, license, or tax documentation only when needed." },
  { number: "03", title: "Set terms", description: "Approved accounts receive applicable pricing, payment, documentation, and fulfillment terms." },
  { number: "04", title: "Order", description: "Place reviewed orders through quote, purchase-order, invoice, or configured checkout workflows." },
];

export default function WholesalePage() {
  return (
    <div className="launch-page wholesale-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Professional & Wholesale Accounts</div>
          <h1>Business pricing should come with business-grade controls.</h1>
          <p>
            Vanguard wholesale accounts are reviewed for clinics, laboratories, universities, qualified distributors, and other legitimate business buyers. Pricing, documentation, payment, and fulfillment terms are attached to the approved account—not promised by a public form.
          </p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>4</strong><span>Review stages</span></div>
          <div><strong>1</strong><span>Named account path</span></div>
          <div><strong>0</strong><span>Consumer payment apps</span></div>
          <div><strong>100%</strong><span>Business verified</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Wholesale account standards">
        <div><Building2 /><span><strong>Business verification</strong>Legal entity and operating context reviewed</span></div>
        <div><FileCheck2 /><span><strong>Documentation</strong>COAs and batch records for approved accounts</span></div>
        <div><Landmark /><span><strong>Business settlement</strong>Wire, ACH, PO, or approved invoice terms</span></div>
        <div><Truck /><span><strong>Controlled release</strong>Fulfillment begins after payment and availability review</span></div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <GlassCard key={step.number} className="min-h-[230px] p-6">
            <div className="font-mono text-[10px] font-bold tracking-[.18em] text-vanguard-amber">{step.number}</div>
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
          </GlassCard>
        ))}
      </section>

      <section className="commerce-layout mt-6">
        <GlassCard className="checkout-form-card">
          <div className="launch-kicker">Wholesale application</div>
          <h2 className="mt-2 font-serif text-4xl font-normal text-bone">Start the account review.</h2>
          <p className="mt-3 mb-6 text-sm leading-7 text-muted">The initial form collects business information only. Sensitive tax or resale documents are requested later through a secure follow-up.</p>
          <WholesaleForm />
        </GlassCard>

        <aside className="space-y-4">
          <GlassCard className="p-6">
            <BadgeCheck className="text-vanguard-amber" />
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">Approved account benefits</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              <li>Tiered pricing where qualified volume supports it</li>
              <li>Batch documentation and Certificate of Analysis access</li>
              <li>Quote, purchase-order, and invoice workflows</li>
              <li>A monitored account contact and order history</li>
              <li>Peptastic OS conversations for clinic operations</li>
            </ul>
          </GlassCard>

          <GlassCard className="p-6">
            <ShieldCheck className="text-vanguard-amber" />
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">Who qualifies</h2>
            <p className="mt-3 text-sm leading-7 text-muted">Medical clinics, med spas, research laboratories, universities, functional-medicine and wellness businesses, and qualified distributors may apply. Approval is not automatic.</p>
          </GlassCard>

          <GlassCard className="p-6">
            <Landmark className="text-vanguard-amber" />
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">Payment rails</h2>
            <p className="mt-3 text-sm leading-7 text-muted">Business orders use reviewed wire, ACH, purchase-order, or approved invoice workflows. Consumer payment apps are not presented as business settlement methods.</p>
          </GlassCard>
        </aside>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
