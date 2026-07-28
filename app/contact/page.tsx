import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, FlaskConical, Handshake, Headphones, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { DisclaimerBanner, GlassCard } from "@/components/ui";
import { DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Contact Vanguard Performance Labs for research materials, wholesale accounts, partnerships, Peptastic demos, and professional support.",
};

const DEPARTMENTS = [
  { label: "Research materials", desc: "Catalog, availability, documentation, and order support", href: "/products", Icon: FlaskConical },
  { label: "Wholesale accounts", desc: "Business verification, pricing, and account terms", href: "/wholesale", Icon: BriefcaseBusiness },
  { label: "Peptastic demos", desc: "Clinic operating system and AI workflow walkthroughs", href: "/peptastic", Icon: Headphones },
  { label: "Partnerships", desc: "Clinical, laboratory, academic, and technology conversations", href: "/partnerships", Icon: Handshake },
];

export default function ContactPage() {
  return (
    <div className="launch-page contact-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Vanguard Response Desk</div>
          <h1>Reach the right team without being passed around.</h1>
          <p>
            Send one secure inquiry for research materials, wholesale accounts, partnerships, Peptastic, or general support. The request is stored and routed to a monitored Vanguard inbox.
          </p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>1</strong><span>Secure intake</span></div>
          <div><strong>4</strong><span>Specialist routes</span></div>
          <div><strong>0</strong><span>Fake success screens</span></div>
          <div><strong>100%</strong><span>Human reviewed</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Contact standards">
        <div><ShieldCheck /><span><strong>Securely saved</strong>Production inquiries require durable storage</span></div>
        <div><Headphones /><span><strong>Monitored delivery</strong>Owner alerts use verified email delivery</span></div>
        <div><BriefcaseBusiness /><span><strong>Business routing</strong>Sales, wholesale, and account support</span></div>
        <div><Handshake /><span><strong>Real follow-up</strong>A Vanguard team member reviews the request</span></div>
      </section>

      <section className="commerce-layout mt-6">
        <GlassCard className="checkout-form-card">
          <div className="launch-kicker">Send a secure message</div>
          <h2 className="mt-2 font-serif text-4xl font-normal text-bone">What can Vanguard help you accomplish?</h2>
          <p className="mt-3 mb-6 max-w-2xl text-sm leading-relaxed text-muted">Include the relevant product, business type, timeline, or platform question so the first response is useful.</p>
          <ContactForm />
        </GlassCard>

        <aside className="commerce-summary">
          <div className="launch-kicker">Direct paths</div>
          <h2>Choose the fastest route</h2>
          <div className="mt-5 space-y-2">
            {DEPARTMENTS.map(({ label, desc, href, Icon }) => (
              <Link key={href} href={href} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3 transition hover:border-vanguard-violet/40 hover:bg-vanguard-violet/[0.06]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-vanguard-amber/25 bg-vanguard-amber/[0.05] text-vanguard-amber"><Icon size={18} /></span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm text-bone">{label}</strong>
                  <span className="mt-0.5 block text-[10px] leading-relaxed text-muted">{desc}</span>
                </span>
                <ArrowUpRight size={15} className="shrink-0 text-muted transition group-hover:text-vanguard-violet" />
              </Link>
            ))}
          </div>
          <p className="commerce-summary__note">Not sure which route applies? Use the message form. Vanguard will route it internally.</p>
        </aside>
      </section>

      <div className="launch-legal"><DisclaimerBanner text={DISCLAIMER} /></div>
    </div>
  );
}
