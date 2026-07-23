"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { NAV } from "@/lib/content";
import { VanguardLogo } from "@/components/brand";
import { GlowButton } from "@/components/ui";
import { useCart } from "@/lib/cart";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-0/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Vanguard Performance Labs home"><VanguardLogo tagline /></Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {NAV.slice(1, 9).map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-muted transition hover:text-bone">{n.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/cart" aria-label="Order request" className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-bone hover:border-vanguard-violet/50">
            <ShoppingCart size={18} />
            {count > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-vg-grad px-1 text-[10px] font-black text-ink-0 tabular-nums">{count}</span>}
          </Link>
          <GlowButton href="/contact" variant="secondary">Contact</GlowButton>
          <GlowButton href="/peptastic">Book Demo</GlowButton>
        </div>
        <div className="flex items-center gap-3 xl:hidden">
          <Link href="/cart" aria-label="Order request" className="relative text-bone">
            <ShoppingCart size={20} />
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-vg-grad px-1 text-[9px] font-black text-ink-0 tabular-nums">{count}</span>}
          </Link>
          <button className="text-bone" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink-0/95 backdrop-blur-xl xl:hidden" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-4 py-3">
            <VanguardLogo />
            <button aria-label="Close menu" className="text-bone" onClick={() => setOpen(false)}><X /></button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-bone hover:bg-white/5">{n.label}</Link>
            ))}
            <div className="mt-4 flex gap-3 px-3">
              <GlowButton href="/peptastic">Book Demo</GlowButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
