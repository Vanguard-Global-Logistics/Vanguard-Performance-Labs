"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { NAV } from "@/lib/content";
import { VanguardLogo } from "@/components/brand";
import { GlowButton } from "@/components/ui";
import { useCart } from "@/lib/cart";
import { usePathname } from "next/navigation";
import { travelTo } from "@/components/journey";

const pick = (...hrefs: string[]) =>
  hrefs.map((h) => NAV.find((n) => n.href === h)).filter(Boolean) as { href: string; label: string }[];

/** Twelve flat links do not fit a single bar. Grouped by what a visitor is
 *  actually trying to do. */
const MENUS = [
  { label: "Learn", items: pick("/education", "/research", "/articles", "/videos") },
  { label: "Products", items: pick("/products", "/specialty-request") },
  { label: "Software", items: pick("/peptastic") },
  { label: "Business", items: pick("/professionals", "/wholesale", "/partnerships", "/about") },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();

  // On the homepage, nav links that map to a station travel instead of navigating.
  const STATION_FOR: Record<string, string> = {
    "/education": "library",
    "/products": "catalog",
    "/peptastic": "peptastic",
    "/about": "standard",
    "/contact": "contact",
  };
  function handleNav(href: string, e: React.MouseEvent) {
    if (pathname !== "/") return;
    const station = STATION_FOR[href];
    if (!station || !document.getElementById(station)) return;
    e.preventDefault();
    travelTo(station);
    setOpen(false);
  }
  return (
    <header className="vt-nav sticky top-0 z-50 border-b border-white/10 bg-ink-0/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Vanguard Performance Labs home"><VanguardLogo size="lg" /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {MENUS.map((m) => (
            <div key={m.label} className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/[0.05] hover:text-bone">
                {m.label}
                <ChevronDown size={13} className="opacity-60 transition group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full w-64 translate-y-1 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-1/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  {m.items.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={(e) => handleNav(n.href, e)}
                      className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-vanguard-violet/10 hover:text-bone"
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/cart" aria-label="Order request" className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-bone hover:border-vanguard-violet/50">
            <ShoppingCart size={18} />
            {count > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-vg-grad px-1 text-[10px] font-black text-ink-0 tabular-nums">{count}</span>}
          </Link>
          <GlowButton href="/contact" variant="secondary">Contact</GlowButton>
          <GlowButton href="/peptastic">Book Demo</GlowButton>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/cart" aria-label="Order request" className="relative text-bone">
            <ShoppingCart size={20} />
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-vg-grad px-1 text-[9px] font-black text-ink-0 tabular-nums">{count}</span>}
          </Link>
          <button className="text-bone" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink-0/95 backdrop-blur-xl lg:hidden" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-4 py-3">
            <VanguardLogo size="lg" />
            <button aria-label="Close menu" className="text-bone" onClick={() => setOpen(false)}><X /></button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={(e) => { handleNav(n.href, e); setOpen(false); }}
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
