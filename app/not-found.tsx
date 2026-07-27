import { Compass, Home, Search } from "lucide-react";
import { GlassCard, GlowButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="launch-page">
      <section className="mx-auto mt-8 max-w-3xl">
        <GlassCard className="relative overflow-hidden p-8 text-center sm:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,.18),transparent_38%),radial-gradient(circle_at_15%_85%,rgba(227,180,90,.08),transparent_35%)]" />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-vanguard-violet/35 bg-vanguard-violet/[0.08] text-vanguard-violet"><Compass size={30} /></div>
          <div className="mt-6 font-serif text-7xl font-normal leading-none text-vanguard-amber">404</div>
          <h1 className="mt-4 font-serif text-4xl font-normal text-bone">This route is not in the Vanguard map.</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">The page may have moved, the address may be incomplete, or the content may not be published. Use the catalog, evidence library, or homepage to continue.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <GlowButton href="/"><Home size={16} /> Return home</GlowButton>
            <GlowButton href="/products" variant="secondary"><Search size={16} /> Search the catalog</GlowButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
