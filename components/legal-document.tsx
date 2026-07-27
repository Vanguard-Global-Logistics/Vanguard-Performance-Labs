import Link from "next/link";
import { AlertTriangle, ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui";

export function LegalDocument({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <div className="launch-page legal-page">
      <div className="launch-breadcrumb"><Link href="/"><ArrowLeft size={15} /> Home</Link><span>/</span><span>Legal</span></div>

      <section className="launch-hero mt-5">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Vanguard Legal & Policy</div>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>JUL</strong><span>Last updated</span></div>
          <div><strong>2026</strong><span>Current draft</span></div>
          <div><strong>VGL</strong><span>Legal entity</span></div>
          <div><strong>DRAFT</strong><span>Review status</span></div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-vanguard-amber/35 bg-vanguard-amber/[0.06] p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-vanguard-amber" size={20} />
          <div>
            <h2 className="text-sm font-bold text-bone">Draft pending legal and owner review</h2>
            <p className="mt-1 text-xs leading-6 text-muted">This policy is operational copy prepared for review. It should not be treated as legal advice or represented as attorney-approved until Vanguard completes the appropriate review.</p>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <GlassCard className="p-7 sm:p-10">
          <div className="legal-document-body space-y-7 text-sm leading-8 text-muted">{children}</div>
        </GlassCard>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <GlassCard className="p-6">
            <FileText className="text-vanguard-amber" />
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">Related policies</h2>
            <div className="mt-4 grid gap-2">
              <Link href="/legal/terms" className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-muted hover:border-vanguard-violet/40 hover:text-bone">Terms of Service</Link>
              <Link href="/legal/privacy" className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-muted hover:border-vanguard-violet/40 hover:text-bone">Privacy Policy</Link>
              <Link href="/legal/refunds" className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-muted hover:border-vanguard-violet/40 hover:text-bone">Refund & Shipping Policy</Link>
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <ShieldCheck className="text-vanguard-amber" />
            <h2 className="mt-4 font-serif text-3xl font-normal text-bone">Policy question?</h2>
            <p className="mt-3 text-xs leading-6 text-muted">Use the contact form and identify the relevant policy or order number. Vanguard can route the question to the appropriate owner.</p>
            <Link href="/contact" className="mt-4 inline-flex rounded-lg border border-vanguard-amber/45 bg-vanguard-amber/[0.07] px-4 py-2 text-xs font-bold text-vanguard-amber">Contact Vanguard</Link>
          </GlassCard>
        </aside>
      </section>
    </div>
  );
}
