"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";
import { VanguardLogo } from "@/components/brand";
import { GlowButton } from "@/components/ui";
import { useCart } from "@/lib/cart";
import { travelTo } from "@/components/journey";

const pick = (...hrefs: string[]) => hrefs.map((href) => NAV.find((item) => item.href === href)).filter(Boolean) as { href: string; label: string }[];
const MENUS = [
  { label: "Learn", items: pick("/education", "/videos") },
  { label: "Products", items: pick("/products", "/specialty-request") },
  { label: "Research", items: pick("/research", "/articles") },
  { label: "AI Platform", items: pick("/peptastic") },
  { label: "Company", items: pick("/about", "/professionals", "/wholesale", "/partnerships", "/contact") },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const STATION_FOR: Record<string, string> = {
    "/education": "library",
    "/products": "catalog",
    "/peptastic": "peptastic",
    "/about": "standard",
    "/contact": "contact",
  };

  function closeDesktopMenus() {
    document.querySelectorAll<HTMLDetailsElement>(".nav-details[open]").forEach((details) => details.removeAttribute("open"));
  }

  function handleNav(href: string, event: React.MouseEvent) {
    closeDesktopMenus();
    setOpen(false);
    if (pathname !== "/") return;
    const station = STATION_FOR[href];
    if (!station || !document.getElementById(station)) return;
    event.preventDefault();
    travelTo(station);
  }

  function openJessie() {
    document.querySelector<HTMLButtonElement>('[aria-label^="Open Jessie"]')?.click();
  }

  return (
    <header className={`vt-nav sticky top-0 z-50 border-b border-white/10 bg-[#03040b]/88 backdrop-blur-2xl ${isHome ? "home-site-nav" : ""}`}>
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Vanguard Performance Labs home" className="home-nav-brand shrink-0">
          {isHome ? <Image src="/images/approved/vanguard-wordmark.webp" width={230} height={50} alt="Vanguard Performance Labs" priority /> : <VanguardLogo size="lg" />}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {MENUS.map((menu) => (
            <details key={menu.label} className="nav-details group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition marker:content-none hover:bg-white/[0.05] hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vanguard-violet/60">
                {menu.label}<ChevronDown size={13} className="opacity-60 transition group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full w-64 pt-2">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#090814]/98 p-1.5 shadow-2xl backdrop-blur-2xl">
                  {menu.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={(event) => handleNav(item.href, event)} className="block rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-vanguard-violet/10 hover:text-bone focus-visible:bg-vanguard-violet/10 focus-visible:text-bone focus-visible:outline-none">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/education" aria-label="Search research" className="grid h-10 w-10 place-items-center rounded-xl text-muted transition hover:bg-white/[0.04] hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vanguard-violet/60"><Search size={18} /></Link>
          <Link href="/wholesale" aria-label="Business account" className="grid h-10 w-10 place-items-center rounded-xl text-muted transition hover:bg-white/[0.04] hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vanguard-violet/60"><UserRound size={18} /></Link>
          <Link href="/cart" aria-label={`Order request${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`} className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-bone transition hover:border-vanguard-violet/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vanguard-violet/60">
            <ShoppingBag size={18} />
            {count > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] px-1 text-[10px] font-black text-[#130f08] tabular-nums">{count}</span>}
          </Link>
          <button type="button" onClick={openJessie} className="rounded-full border border-vanguard-amber/55 bg-vanguard-amber/[0.05] px-5 py-2 text-xs font-bold uppercase tracking-widest text-vanguard-amber transition hover:bg-vanguard-amber/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vanguard-amber/60">Ask Jessie</button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/cart" aria-label={`Order request${count ? `, ${count} items` : ""}`} className="relative text-bone">
            <ShoppingBag size={21} />
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] px-1 text-[9px] font-black text-[#130f08] tabular-nums">{count}</span>}
          </Link>
          <button type="button" className="text-bone" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#03040b]/98 backdrop-blur-2xl lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#03040b]/95 px-4 py-3 backdrop-blur-xl">
            <VanguardLogo size="lg" />
            <button type="button" aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-bone" onClick={() => setOpen(false)}><X /></button>
          </div>
          <nav className="mx-auto flex max-w-xl flex-col gap-1 px-4 py-5" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={(event) => handleNav(item.href, event)} className="rounded-xl border border-transparent px-4 py-3 text-base text-bone transition hover:border-white/10 hover:bg-white/[0.04]">{item.label}</Link>
            ))}
            <div className="mt-4 grid gap-3 border-t border-white/10 px-1 pt-5">
              <button type="button" onClick={() => { setOpen(false); window.setTimeout(openJessie, 50); }} className="rounded-xl border border-vanguard-amber/50 bg-vanguard-amber/[0.06] px-5 py-3 text-sm font-bold text-vanguard-amber">Ask Jessie</button>
              <GlowButton href="/peptastic">Request a Peptastic demo</GlowButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
