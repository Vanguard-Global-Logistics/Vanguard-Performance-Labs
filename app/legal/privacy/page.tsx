import { GlassCard } from "@/components/ui";
export const metadata = { title: "Privacy Policy" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted">Last updated: July 2026 · Vanguard Global Logistics LLC, DBA Vanguard Performance Labs · Draft pending legal review</p>
      <GlassCard className="mt-6 space-y-4 p-6 text-sm leading-relaxed text-muted">
        <p><span className="font-bold text-bone">What we collect.</span> Business contact details you submit through inquiry, wholesale, order, and contact forms; and standard technical data needed to operate the site. A small browser-storage marker remembers whether your device has visited before, so our concierge can greet returning visitors — it contains no personal information and stays on your device.</p>
        <p><span className="font-bold text-bone">How we use it.</span> To review applications, process and fulfil orders, respond to inquiries, and send updates you request. We do not sell personal information.</p>
        <p><span className="font-bold text-bone">Jessie concierge.</span> Concierge conversations are processed to generate responses and improve routing. Do not submit health information — Jessie is educational only.</p>
        <p><span className="font-bold text-bone">Retention and access.</span> We keep records as needed for business and legal purposes. Contact us to request access or deletion of your information.</p>
        <p><span className="font-bold text-bone">Contact.</span> Privacy questions: use the Contact page and reference Privacy.</p>
      </GlassCard>
    </div>
  );
}
