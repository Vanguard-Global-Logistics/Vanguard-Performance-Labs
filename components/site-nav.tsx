"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV } from "@/lib/content";
import { VanguardLogo } from "@/components/brand";
import { GlowButton } from "@/components/ui";
import { usePathname } from "next/navigation";
import { travelTo } from "@/components/journey";

const pick = (...hrefs: string[]) =>
  hrefs.map((href) => NAV.find((item) => item.href === href)).filter(Boolean) as { href: string; label: string }[];

const MENUS = [
  { label: "Learn", items: pick("/education", "/research", "/articles", "/videos") },
  { label: "Research Materials", items: pick("/products", "/specialty-request") },
  {
    label: "AI & Software",
    items: [
      { href: "/#agents", label: "AI Agent Network" },
      ...pick("/peptastic"),
    ],
  },
  { label: "Business", items: pick("/professionals", "/wholesale", "/partnerships", "/about") },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const stationFor: Record<string, string> = {
    "/education": "library",
    "/products": "catalog",
    "/peptastic": "peptastic",
    "/#agents": "agents",
    "/about": "standard",
    "/contact": "contact",
  };

  function handleNav(href: string, event: React.MouseEvent) {
    if (pathname !== "/") return;
    const station = stationFor[href];
    if (!station || !document.getElementById(station)) return;
    event.preventDefault();
    travelTo(station);
    setOpen(false);
  }

  return (
    <header className="vt-nav sticky top-0 z-50 border-b border-white/10 bg-ink-0/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Vanguard Performance Labs home"><VanguardLogo size="lg" /></Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {MENUS.map((menu) => (
            <div key={menu.label} className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/[0.05] hover:text-bone">
                {menu.label}
                <ChevronDown size={13} className="opacity-60 transition group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full w-64 translate-y-1 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-1/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(event) => handleNav(item.href, event)}
                      className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-vanguard-violet/10 hover:text-bone"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <GlowButton href="/contact" variant="secondary">Contact</GlowButton>
          <GlowButton href="/peptastic">Book Working Session</GlowButton>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
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
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => { handleNav(item.href, event); setOpen(false); }}
                className="rounded-lg px-3 py-3 text-base text-bone hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#agents"
              onClick={(event) => { handleNav("/#agents", event); setOpen(false); }}
              className="rounded-lg px-3 py-3 text-base text-bone hover:bg-white/5"
            >
              AI Agent Network
            </Link>
            <div className="mt-4 flex gap-3 px-3">
              <GlowButton href="/contact" variant="secondary">Contact</GlowButton>
              <GlowButton href="/peptastic">Book Session</GlowButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
