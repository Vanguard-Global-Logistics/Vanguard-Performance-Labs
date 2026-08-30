import type { Order } from "@/lib/orders-store";

export async function releaseOrderToShipping(order: Order) {
  const url = process.env.SHIPPING_WEBHOOK_URL;
  if (!url || order.fulfillment !== "ship") return { attempted: false, ok: true };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.SHIPPING_RELEASE_TOKEN
          ? { Authorization: `Bearer ${process.env.SHIPPING_RELEASE_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        event: "order.release_to_shipping",
        orderId: order.id,
        shipping: order.shipping,
        paymentReference: order.payment_reference,
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      console.error("[shipping release] rejected", response.status, (await response.text()).slice(0, 300));
      return { attempted: true, ok: false };
    }
    return { attempted: true, ok: true };
  } catch (error) {
    console.error("[shipping release] failed", error);
    return { attempted: true, ok: false };
  }
}
