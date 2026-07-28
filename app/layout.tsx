import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./approved-home-01.css";
import "./approved-home-02.css";
import "./approved-home-03.css";
import "./approved-home-04.css";
import "./approved-home-05.css";
import "./approved-home-06.css";
import "./approved-home-07.css";
import "./approved-home-08.css";
import "./launch-polish.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter, JessieDock } from "@/components/site-chrome";
import { JessieOpenBridge } from "@/components/jessie-open-bridge";
import { CartProvider } from "@/lib/cart";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanguardperformancelabs.com"),
  title: {
    default: "Vanguard Performance Labs — Research Materials & AI Support",
    template: "%s · Vanguard Performance Labs",
  },
  description: "Veteran-owned research materials, transparent educational content, and AI-assisted research support from Vanguard Performance Labs.",
  keywords: ["research peptides", "research materials", "peptide education", "Vanguard Performance Labs", "research AI guide"],
  applicationName: "Vanguard Performance Labs",
  category: "science",
  openGraph: {
    title: "Vanguard Performance Labs",
    description: "Research with confidence. Premium research materials, documentation, and AI-assisted support.",
    type: "website",
    siteName: "Vanguard Performance Labs",
  },
  twitter: { card: "summary_large_image", title: "Vanguard Performance Labs" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03040b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vanguard Performance Labs",
    legalName: "Vanguard Global Logistics LLC",
    description: "Veteran-owned research materials, education, and AI support company.",
  };
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <CartProvider>
          <SiteNav />
          <JessieOpenBridge />
          <main>{children}</main>
          <SiteFooter />
          <JessieDock />
        </CartProvider>
      </body>
    </html>
  );
}
