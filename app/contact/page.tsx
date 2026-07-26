import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            <p className="mt-1 text-xs text-muted">Go straight to the right team.</p>
            <ul className="mt-4 space-y-1">
              {[
                { label: "Sales & demos", desc: "See Peptastic in action", href: "/peptastic" },
                { label: "Wholesale & accounts", desc: "Apply for pricing and terms", href: "/wholesale" },
                { label: "Medical professionals", desc: "Clinical resources and access", href: "/professionals" },
                { label: "Specialty sourcing", desc: "Something we don't stock", href: "/specialty-request" },
                { label: "Partnerships", desc: "Clinics, labs, and universities", href: "/partnerships" },
              ].map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition hover:bg-white/[0.05]"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-bone group-hover:text-vanguard-violet">{d.label}</span>
                      <span className="block text-xs text-muted">{d.desc}</span>
                    </span>
                    <ArrowUpRight size={14} className="shrink-0 text-muted transition group-hover:text-vanguard-violet" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-muted">
              Not sure which? Use the form — we route it for you.
            </p>
          </GlassCard>
          <DisclaimerBanner text={DISCLAIMER} />
        </div>
      </div>
    </div>
  );
}
