/**
 * Example secure server for MIRASOL → Clover pickup + pay.
 * Deploy separately (Railway, Render, Cloudflare Worker, etc.).
 * Never commit Clover private API keys to the public website repo.
 *
 * Env vars:
 *   CLOVER_MERCHANT_ID=0BQTHJMTQ5MP1
 *   CLOVER_ECOMM_PRIVATE_TOKEN=...
 *   CLOVER_PLATFORM_TOKEN=...  (orders + kitchen print)
 *
 * Flow:
 *   1. POST /v1/checkout/pickup — create Hosted Checkout session (Visa/MC/Apple Pay on Clover page)
 *   2. Webhook — on payment success, create atomic order + print_event to kitchen Station Duo
 */

export async function createPickupCheckout(body, env) {
  const totalCents = Math.round((body.totals?.total || 0) * 100);
  const lineItems = (body.items || []).map((item) => ({
    name: item.name,
    unitQty: item.quantity || 1,
    price: Math.round((item.unitPrice || 0) * 100),
  }));

  const res = await fetch('https://checkout.clover.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.CLOVER_ECOMM_PRIVATE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer: { email: body.customer?.email || 'pickup@elmirasol.local' },
      shoppingCart: { lineItems },
      amount: totalCents,
      currency: 'usd',
      successUrl: body.returnUrls?.success,
      cancelUrl: body.returnUrls?.cancel,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'checkout_failed');
  return { checkoutUrl: data.href || data.checkoutUrl, checkoutSessionId: data.id };
}