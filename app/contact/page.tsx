import { SectionHeading, GlassCard, DisclaimerBanner } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { DISCLAIMER } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading kicker="Contact" title="Talk to Vanguard" sub="Sales, wholesale, partnerships, demos, or general questions — we route you to the right team." />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <GlassCard className="p-6"><ContactForm /></GlassCard>
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="text-sm font-bold text-bone">Departments</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Sales &amp; demos</li><li>Wholesale &amp; accounts</li><li>Medical professionals</li>
              <li>Partnerships</li><li>Support</li>
            </ul>
          </GlassCard>
          <DisclaimerBanner text={DISCLAIMER} />
        </div>
      </div>
    </div>
  );
}
