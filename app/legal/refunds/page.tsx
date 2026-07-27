import { GlassCard } from "@/components/ui";

export const metadata = { title: "Inquiry & Shipping Policy" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Inquiry & Future Shipping Policy</h1>
      <p className="mt-2 text-xs text-muted">
        Last updated: July 2026 · Vanguard Global Logistics LLC, DBA Vanguard Performance Labs · Draft pending review by qualified counsel
      </p>

      <GlassCard className="mt-6 space-y-5 p-6 text-sm leading-relaxed text-muted">
        <p>
          <span className="font-bold text-bone">No public transactions.</span> The current website does not collect payment, accept product orders, issue invoices, promise fulfillment, or create a shipment. Submitting an inquiry is non-binding and does not reserve inventory or establish a customer relationship.
        </p>
        <p>
          <span className="font-bold text-bone">No refund event at inquiry stage.</span> Because no payment is collected through the public website, there is no website purchase to refund. A person may withdraw an inquiry at any time before a separate agreement is made.
        </p>
        <p>
          <span className="font-bold text-bone">Future commercial terms.</span> If a commercial workflow is later enabled after legal, regulatory, operational, and merchant review, the applicable quote, purchase order, invoice, shipping terms, inspection period, damage-report procedure, return limitations, and refund terms must be provided before payment.
        </p>
        <p>
          <span className="font-bold text-bone">Handling statements.</span> Handling and shipping requirements vary by material, packaging, route, destination, and documentation. The website does not make a universal cold-chain, delivery-time, stability, or storage guarantee.
        </p>
        <p>
          <span className="font-bold text-bone">Questions.</span> Contact Management@VanguardGlobalLogisticsLLC.com and include the organization name and inquiry reference, if one exists.
        </p>
      </GlassCard>
    </div>
  );
}
