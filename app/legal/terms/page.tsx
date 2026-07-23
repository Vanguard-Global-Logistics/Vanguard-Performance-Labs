import { GlassCard } from "@/components/ui";
export const metadata = { title: "Terms of Service" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-black text-bone">Terms of Service</h1>
      <p className="mt-2 text-xs text-muted">Last updated: July 2026 · Vanguard Global Logistics LLC, DBA Vanguard Performance Labs · Draft pending legal review</p>
      <GlassCard className="mt-6 space-y-4 p-6 text-sm leading-relaxed text-muted">
        <p><span className="font-bold text-bone">Research use only.</span> All research materials are sold strictly for laboratory research by qualified businesses and institutions. They are not for human or veterinary consumption, and are not drugs, foods, supplements, or cosmetics. Purchasers confirm they are ordering on behalf of a business or institution.</p>
        <p><span className="font-bold text-bone">Account review.</span> Orders and wholesale accounts are subject to review. We may decline or cancel any order at our discretion, including where intended use appears inconsistent with research use.</p>
        <p><span className="font-bold text-bone">Payment.</span> Orders are settled by invoice (bank wire / ACH) issued after review. An order is not accepted until payment is received and verified. A customer-supplied reference number does not constitute payment.</p>
        <p><span className="font-bold text-bone">No medical advice.</span> Content on this site, including the education library and the Jessie concierge, is educational only and is not medical advice, diagnosis, or treatment.</p>
        <p><span className="font-bold text-bone">Limitation.</span> To the maximum extent permitted by law, our liability is limited to the amount paid for the order at issue.</p>
      </GlassCard>
    </div>
  );
}
