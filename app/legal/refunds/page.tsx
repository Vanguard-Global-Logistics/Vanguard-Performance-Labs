import { LegalDocument } from "@/components/legal-document";

export const metadata = { title: "Refund & Shipping Policy" };

export default function RefundsPage() {
  return (
    <LegalDocument title="Refund & Shipping Policy" summary="The draft operating policy for reviewed orders, payment confirmation, shipping, cold-chain handling, damage claims, cancellation, and returns.">
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Review before payment</h2>
        <p>No payment is collected merely by submitting the website checkout form. Vanguard reviews the business, product availability, selected strengths, quantities, fulfillment details, and applicable terms before confirming the settlement workflow. An unpaid request may be cancelled without charge.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Shipping and cold-chain handling</h2>
        <p>Shipping method, packaging, cold-chain requirements, timing, cost, and destination restrictions are confirmed for the accepted order. A website estimate or general statement does not override the written invoice, order confirmation, carrier limitation, or handling requirement for the specific shipment.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Damage, shortage, or incorrect items</h2>
        <p>Report a visible problem promptly using the order number, delivery date, package condition, product information, and clear photographs. The current operating target is within 48 hours of delivery, subject to final legal and owner approval. Vanguard will investigate carrier, packaging, batch, and fulfillment records before determining replacement, credit, or another remedy.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Returns and temperature integrity</h2>
        <p>Because research materials may have identity, chain-of-custody, contamination, tamper, and temperature-integrity concerns, returned materials may be ineligible for restocking or resale. Opened, used, compromised, or temperature-exposed items are generally not returnable. Final exceptions and procedures remain subject to written order terms and legal review.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Cancellation and refund timing</h2>
        <p>An unpaid order request can be cancelled before settlement. After payment, cancellation depends on whether sourcing, preparation, special handling, or shipment has begun. Approved refund method and timing should follow the original settlement rail where practical and remain subject to final policy approval.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">How to report an issue</h2>
        <p>Use the Contact page with the order number and a concise description of the issue. Do not discard packaging, temperature indicators, labels, or the affected material until Vanguard confirms what records or photographs are needed.</p>
      </section>
    </LegalDocument>
  );
}
