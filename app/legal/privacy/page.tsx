import { GlassCard } from "@/components/ui";

export const metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted">
        Last updated: July 2026 · Vanguard Global Logistics LLC, DBA Vanguard Performance Labs · Draft pending review by qualified counsel
      </p>

      <GlassCard className="mt-6 space-y-5 p-6 text-sm leading-relaxed text-muted">
        <p>
          <span className="font-bold text-bone">Information you submit.</span> We may receive business contact information and the content you enter in contact, wholesale, specialty-sourcing, partnership, Peptastic, or other professional inquiry forms. Do not submit patient records, protected health information, government identifiers, payment-card data, passwords, or other sensitive information through public forms or Jessie.
        </p>
        <p>
          <span className="font-bold text-bone">Jessie and AI processing.</span> Messages sent to Jessie may be processed by a configured AI service to generate a response and route the request. Conversations are intended for education and business navigation only. When live AI is unavailable, Jessie falls back to scripted routing. The site should not be treated as a HIPAA service or a channel for clinical information.
        </p>
        <p>
          <span className="font-bold text-bone">Audio playback.</span> Jessie’s temporary voice feature uses the speech capabilities available in your browser or operating system. Voice playback begins only after you enable it. The website does not need to record your microphone for this feature.
        </p>
        <p>
          <span className="font-bold text-bone">Device storage.</span> The site may store limited preferences on your device, such as whether the browser has visited before and whether Jessie’s voice is enabled. These settings can be cleared through your browser controls.
        </p>
        <p>
          <span className="font-bold text-bone">How information is used.</span> Information may be used to respond to requests, route a professional inquiry, schedule a working session, maintain security, prevent abuse, troubleshoot the website, and meet business or legal obligations. We do not use public inquiry forms to make automated medical decisions.
        </p>
        <p>
          <span className="font-bold text-bone">Service providers.</span> Hosting, email, database, analytics, security, and AI providers may process limited information on our behalf when those services are enabled. Production deployment must document the providers actually used and align this policy with their contracts and settings.
        </p>
        <p>
          <span className="font-bold text-bone">Retention and requests.</span> Retention periods and procedures for access, correction, or deletion must be finalized before launch. Privacy questions may be sent to Management@VanguardGlobalLogisticsLLC.com with “Privacy” in the subject line.
        </p>
      </GlassCard>
    </div>
  );
}
