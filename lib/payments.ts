// Payment provider adapter — the slot where an approved processor mounts.
// Today: InvoiceProvider (bank wire/ACH after human review). No card capture
// exists in this codebase until a provider is approved and configured.

export type SettlementResult = { method: string; instructions: string };

export interface PaymentProvider {
  id: string;
  label: string;
  /** Called at order submission; returns settlement instructions shown to the buyer. */
  settle(orderId: string, totalUSD: number): Promise<SettlementResult>;
}

export const InvoiceProvider: PaymentProvider = {
  id: "invoice_wire",
  label: "Invoice — Bank Wire / ACH",
  async settle(orderId) {
    return {
      method: "Invoice — Bank Wire / ACH",
      instructions:
        `Order ${orderId} received. Our team will review it and email an invoice with bank wire/ACH ` +
        `instructions. Fulfilment begins after payment is verified. No payment is collected on this site.`,
    };
  },
};

// When a processor is approved: implement PaymentProvider with its SDK server-side,
// register it here, and select per-product via OrderingMode "approved_checkout".
export const activeProvider: PaymentProvider = InvoiceProvider;
