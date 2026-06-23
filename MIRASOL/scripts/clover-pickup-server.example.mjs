/**
 * Example secure server for MIRASOL → Clover pickup + pay (Hosted iFrame flow).
 * Deploy separately (Railway, Render, Cloudflare Worker, etc.).
 * Never commit Clover private API keys to the public website repo.
 *
 * Env vars:
 *   CLOVER_MERCHANT_ID=0BQTHJMTQ5MP1
 *   CLOVER_ECOMM_PRIVATE_TOKEN=...   (Hosted iFrame + API/SDK private key)
 *   CLOVER_PLATFORM_TOKEN=...      (Orders read/write + kitchen print_event)
 *   CLOVER_KITCHEN_DEVICE_ID=...   (UUID for Station Duo C153UQ22840459)
 *
 * Endpoints:
 *   POST /v1/charges/pickup  — charge clv_ token + create order + kitchen ticket
 *   POST /v1/checkout/pickup — legacy Hosted Checkout redirect (optional)
 */

const ECOMM_BASE = process.env.CLOVER_SANDBOX === '1'
  ? 'https://scl-sandbox.dev.clover.com'
  : 'https://scl.clover.com';

const PLATFORM_BASE = process.env.CLOVER_SANDBOX === '1'
  ? 'https://apisandbox.dev.clover.com'
  : 'https://api.clover.com';

function uuid() {
  return crypto.randomUUID();
}

function totalCents(body) {
  return Math.round((body.totals?.total || 0) * 100);
}

function lineItems(body) {
  return (body.items || []).map((item) => ({
    name: item.name || 'Menu item',
    unitQty: item.quantity || 1,
    price: Math.round((item.unitPrice || 0) * 100),
  }));
}

/**
 * Charge a tokenized card (clv_) from the Clover iFrame on MIRASOL checkout.
 */
export async function chargePickupOrder(body, env) {
  const amount = totalCents(body);
  const source = body.source;
  if (!source || !amount) throw new Error('invalid_charge_request');

  const chargeRes = await fetch(`${ECOMM_BASE}/v1/charges`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.CLOVER_ECOMM_PRIVATE_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'idempotency-key': body.idempotencyKey || uuid(),
    },
    body: JSON.stringify({
      amount,
      currency: 'usd',
      source,
      description: `MIRASOL pickup — ${body.customer?.name || 'guest'}`,
    }),
  });

  const charge = await chargeRes.json();
  if (!chargeRes.ok) throw new Error(charge.message || charge.error || 'charge_failed');

  const order = await createKitchenOrder(body, env, charge.id);

  return {
    ok: true,
    chargeId: charge.id,
    orderId: order?.id,
    status: charge.status,
  };
}

/**
 * Create atomic order on Clover POS and send print_event to kitchen Station Duo.
 */
async function createKitchenOrder(body, env, chargeId) {
  const merchantId = env.CLOVER_MERCHANT_ID || body.merchantId;
  const platformToken = env.CLOVER_PLATFORM_TOKEN;
  if (!merchantId || !platformToken) {
    return { id: null, skipped: 'no_platform_token' };
  }

  const items = lineItems(body);
  const noteParts = [
    'MIRASOL WEB PICKUP',
    body.customer?.name ? `Name: ${body.customer.name}` : '',
    body.customer?.phone ? `Phone: ${body.customer.phone}` : '',
    body.notes ? `Notes: ${body.notes}` : '',
    chargeId ? `Charge: ${chargeId}` : '',
  ].filter(Boolean);

  const orderRes = await fetch(`${PLATFORM_BASE}/v3/merchants/${merchantId}/atomic_order/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${platformToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderCart: {
        lineItems: items,
        note: noteParts.join('\n'),
      },
    }),
  });

  const order = await orderRes.json();
  if (!orderRes.ok) throw new Error(order.message || 'order_failed');

  const deviceId = env.CLOVER_KITCHEN_DEVICE_ID || body.kitchenDevice?.deviceId;
  if (deviceId && order.id) {
    await fetch(`${PLATFORM_BASE}/v3/merchants/${merchantId}/print_event`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${platformToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderRef: { id: order.id },
        deviceRef: { id: deviceId },
      }),
    });
  }

  return order;
}

/** Legacy Hosted Checkout redirect flow (optional fallback). */
export async function createPickupCheckout(body, env) {
  const amount = totalCents(body);

  const res = await fetch('https://checkout.clover.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.CLOVER_ECOMM_PRIVATE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer: { email: body.customer?.email || 'pickup@elmirasol.local' },
      shoppingCart: { lineItems: lineItems(body) },
      amount,
      currency: 'usd',
      successUrl: body.returnUrls?.success,
      cancelUrl: body.returnUrls?.cancel,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'checkout_failed');
  return { checkoutUrl: data.href || data.checkoutUrl, checkoutSessionId: data.id };
}

/**
 * Minimal HTTP router example (Node 18+):
 *
 * import http from 'node:http';
 * import { chargePickupOrder, createPickupCheckout } from './clover-pickup-server.example.mjs';
 *
 * const env = {
 *   CLOVER_MERCHANT_ID: process.env.CLOVER_MERCHANT_ID,
 *   CLOVER_ECOMM_PRIVATE_TOKEN: process.env.CLOVER_ECOMM_PRIVATE_TOKEN,
 *   CLOVER_PLATFORM_TOKEN: process.env.CLOVER_PLATFORM_TOKEN,
 *   CLOVER_KITCHEN_DEVICE_ID: process.env.CLOVER_KITCHEN_DEVICE_ID,
 * };
 *
 * http.createServer(async (req, res) => {
 *   if (req.method === 'POST' && req.url === '/v1/charges/pickup') {
 *     const body = await readJson(req);
 *     const result = await chargePickupOrder(body, env);
 *     json(res, 200, result);
 *     return;
 *   }
 *   res.writeHead(404).end();
 * }).listen(process.env.PORT || 8787);
 */