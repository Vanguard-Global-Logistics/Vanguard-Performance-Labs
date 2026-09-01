import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter, JessieDock } from "@/components/site-chrome";
import { CartProvider } from "@/lib/cart";

// Wire a real ID into these env vars and both go live automatically —
// nothing here is a placeholder ID, since a fake one would just silently
// eat pageviews into a dashboard nobody can see.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vanguardperformancelabs.com"),
  title: {
    default: "Vanguard Performance Labs — Peptide Education & Clinic AI",
    template: "%s · Vanguard Performance Labs",
  },
  description:
    "Veteran-owned biotechnology, education, and AI software company. World-class peptide education and Peptastic — the AI operating system for modern clinics.",
  keywords: ["peptide education", "clinic software", "Peptastic", "Vanguard Performance Labs", "AI clinic OS"],
  openGraph: {
    title: "Vanguard Performance Labs",
    description: "Peptide education and AI-powered clinic technology. Veteran-owned.",
    type: "website",
    siteName: "Vanguard Performance Labs",
  },
  twitter: { card: "summary_large_image", title: "Vanguard Performance Labs" },
  robots: { index: true, follow: true },
  verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vanguard Performance Labs",
    legalName: "Vanguard Global Logistics LLC",
    description: "Veteran-owned peptide education and clinic AI software company.",
    url: "https://vanguardperformancelabs.com",
    logo: "https://vanguardperformancelabs.com/images/brand/vanguard-mark.png",
  };
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <CartProvider>
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
          <JessieDock />
        </CartProvider>
      </body>
    </html>
  );
}
