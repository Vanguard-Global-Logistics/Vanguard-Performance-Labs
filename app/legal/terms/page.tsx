import { GlassCard } from "@/components/ui";

export const metadata = { title: "Website Terms" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Website Terms & Professional Inquiry Notice</h1>
      <p className="mt-2 text-xs text-muted">
        Last updated: July 2026 · Vanguard Global Logistics LLC, DBA Vanguard Performance Labs · Draft pending review by qualified counsel
      </p>

      <GlassCard className="mt-6 space-y-5 p-6 text-sm leading-relaxed text-muted">
        <p>
          <span className="font-bold text-bone">Informational website.</span> This website provides company information, research education, professional inquiry forms, and information about clinic-operations software. Content is not an offer to sell, a promise of availability, or confirmation that any person or organization is eligible for a transaction.
        </p>
        <p>
          <span className="font-bold text-bone">No consumer checkout.</span> The public website does not accept payment or complete product orders. Any future commercial discussion would require separate review of the organization, intended use, material, documentation, operating requirements, and applicable legal and merchant-account considerations.
        </p>
        <p>
          <span className="font-bold text-bone">Research and educational context.</span> Product and compound information is presented for research education and professional inquiry. It is not intended for human or veterinary use, self-experimentation, diagnosis, treatment, prescribing, dosing, reconstitution, injection, or individualized medical decision-making.
        </p>
        <p>
          <span className="font-bold text-bone">No medical or legal advice.</span> Website content, research summaries, forms, and AI responses do not replace advice from a licensed medical professional, attorney, compliance professional, or other qualified adviser.
        </p>
        <p>
          <span className="font-bold text-bone">AI limitations.</span> Jessie and the specialist-agent system provide automated education, navigation, and business routing. Automated responses may be incomplete or inaccurate and must not be relied on for medical, legal, regulatory, financial, safety-critical, or purchasing decisions.
        </p>
        <p>
          <span className="font-bold text-bone">Research sources.</span> Links and summaries are provided for convenience. Evidence levels, citations, and editorial status should be reviewed against the primary source. A reference to a study does not establish that a marketed material is safe, effective, approved, or appropriate for any use.
        </p>
        <p>
          <span className="font-bold text-bone">Acceptable use.</span> Do not use the website to request human-use instructions, submit protected health information, misrepresent an organization or intended use, interfere with the site, attempt unauthorized access, or use automated systems to overwhelm forms or services.
        </p>
        <p>
          <span className="font-bold text-bone">No warranties.</span> The website is provided on an “as available” basis. Final warranty, limitation-of-liability, dispute, governing-law, and commercial terms require attorney approval before launch and are intentionally not represented here as final legal language.
        </p>
      </GlassCard>
    </div>
  );
}
