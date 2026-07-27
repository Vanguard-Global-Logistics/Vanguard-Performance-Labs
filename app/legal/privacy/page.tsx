import { LegalDocument } from "@/components/legal-document";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" summary="How Vanguard collects, uses, stores, and routes business contact data, order information, website activity, and concierge conversations.">
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Information submitted to Vanguard</h2>
        <p>Vanguard may collect business and contact information submitted through contact, inquiry, wholesale, specialty sourcing, newsletter, cart, checkout, and administrative workflows. This can include names, company information, work email, phone, shipping details, product selections, notes, and related business records.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Website and device information</h2>
        <p>The website may process standard technical information required for security, performance, abuse prevention, and reliable delivery. A browser-storage marker may remember whether a device has visited previously so Jessie can greet returning visitors. That marker is stored on the device and is not intended to contain direct personal information.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">How information is used</h2>
        <p>Information is used to respond to inquiries, review business applications, process order requests, manage fulfillment, provide requested communications, improve routing, secure the website, preserve business records, and operate Vanguard services. Vanguard does not represent that it sells personal information.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Jessie and AI processing</h2>
        <p>Concierge messages are processed to generate a response and route visitors to relevant website resources. Visitors should not submit protected health information, diagnosis details, treatment records, or other sensitive medical information. Jessie is designed for education and routing, not clinical care.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Service providers and storage</h2>
        <p>Vanguard may use infrastructure, database, email, analytics, security, and AI service providers to operate the website. Production configuration is intended to keep secret credentials server-side and restrict direct public access to business records. Final vendor disclosures, retention periods, geographic processing, and state-specific rights require legal review.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-normal text-bone">Access, correction, and deletion requests</h2>
        <p>Use the Contact page and identify the request as a privacy matter. Vanguard will verify the requester and respond according to applicable obligations, operational requirements, fraud prevention needs, and record-retention rules.</p>
      </section>
    </LegalDocument>
  );
}
