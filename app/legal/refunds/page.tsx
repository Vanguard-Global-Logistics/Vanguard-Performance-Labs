import { GlassCard } from "@/components/ui";
export const metadata = { title: "Refund & Shipping Policy" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Refund & Shipping Policy</h1>
      <p className="mt-2 text-xs text-muted">Last updated: July 2026 · Vanguard Global Logistics LLC, DBA Vanguard Performance Labs · Draft pending legal review</p>
      <GlassCard className="mt-6 space-y-4 p-6 text-sm leading-relaxed text-muted">
        <p><span className="font-bold text-bone">Review before charge.</span> No payment is collected at order submission. Invoices are issued after review; you may cancel at no cost any time before payment.</p>
        <p><span className="font-bold text-bone">Cold chain and shipping.</span> Research materials ship with appropriate cold-chain handling to business addresses. Shipping terms and timelines are confirmed on your invoice.</p>
        <p><span className="font-bold text-bone">Damaged or incorrect items.</span> Report within 48 hours of delivery with photos; verified issues are replaced or credited in full.</p>
        <p><span className="font-bold text-bone">Returns.</span> Because of the nature of research materials and cold-chain integrity, opened or temperature-compromised items cannot be returned. Unopened, unshipped orders are refundable in full.</p>
        <p><span className="font-bold text-bone">Questions.</span> Contact us with your order number and we will make it right.</p>
      </GlassCard>
    </div>
  );
}
