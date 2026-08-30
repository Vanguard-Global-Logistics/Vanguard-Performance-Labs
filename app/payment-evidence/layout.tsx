import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Payment Review — Vanguard Performance Labs",
  description: "Private Vanguard payment-evidence review workflow.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function PaymentEvidenceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
