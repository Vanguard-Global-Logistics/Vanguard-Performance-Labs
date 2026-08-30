import { LegalDocument } from "@/components/legal-document";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Service" summary="The operating terms for Vanguard business accounts, research-material requests, reviewed orders, educational content, and website use.">
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Research use only</h2>
        <p>All research materials are offered strictly for laboratory research by qualified businesses and institutions. They are not for human or veterinary consumption and are not represented as drugs, foods, supplements, cosmetics, or medical treatments. Purchasers confirm they are acting on behalf of an appropriate business or institution.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Account and order review</h2>
        <p>Orders, inquiries, quotes, and wholesale accounts are subject to review. Vanguard may decline, pause, or cancel a request when intended use, business identity, documentation, legal context, availability, payment status, or another material factor does not satisfy the applicable requirements.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Payment and acceptance</h2>
        <p>Submitting an order request does not charge a payment method or guarantee acceptance. Reviewed orders are settled through the payment workflow confirmed by Vanguard. An order is not released for fulfillment until required payment and availability checks are complete. A customer-supplied PO or reference number does not itself constitute payment or acceptance.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Educational content and Jessie</h2>
        <p>The evidence library, articles, videos, product information, and Jessie concierge are educational and navigational resources. They are not medical advice, diagnosis, treatment, prescribing, dosing, reconstitution, injection instruction, legal advice, or a substitute for a qualified professional.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Availability and documentation</h2>
        <p>Product availability, specifications, documentation, batch information, shipping terms, and pricing may change before an order is accepted. Website display does not guarantee that a specific material, strength, batch, timeline, or document will be available.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Limitation and governing terms</h2>
        <p>To the maximum extent permitted by applicable law, Vanguard’s liability relating to an accepted order is limited to the amount paid for the order at issue. Final governing-law, dispute, warranty, indemnity, and limitation language remains subject to legal review before production approval.</p>
      </section>
    </LegalDocument>
  );
}
