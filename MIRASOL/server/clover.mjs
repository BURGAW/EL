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
  return Math.round((Number(body.totals?.total) || 0) * 100);
}

function lineItems(body) {
  return (body.items || []).map((item) => ({
    name: item.name || 'Menu item',
    unitQty: item.quantity || 1,
    price: Math.round((Number(item.unitPrice) || 0) * 100),
  }));
}

export function envFromProcess() {
  return {
    CLOVER_MERCHANT_ID: process.env.CLOVER_MERCHANT_ID || '0BQTHJMTQ5MP1',
    CLOVER_ECOMM_PRIVATE_TOKEN: process.env.CLOVER_ECOMM_PRIVATE_TOKEN || '',
    CLOVER_PLATFORM_TOKEN: process.env.CLOVER_PLATFORM_TOKEN || '',
    CLOVER_KITCHEN_DEVICE_ID: process.env.CLOVER_KITCHEN_DEVICE_ID || '',
  };
}

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
  if (!orderRes.ok) {
    const err = new Error(order.message || order.error || 'order_failed');
    err.status = orderRes.status;
    err.details = order;
    throw err;
  }

  const deviceId = env.CLOVER_KITCHEN_DEVICE_ID || body.kitchenDevice?.deviceId;
  if (deviceId && order.id) {
    const printRes = await fetch(`${PLATFORM_BASE}/v3/merchants/${merchantId}/print_event`, {
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
    if (!printRes.ok) {
      const printErr = await printRes.json().catch(() => ({}));
      console.warn('print_event failed', printRes.status, printErr);
    }
  }

  return order;
}

export async function chargePickupOrder(body, env) {
  if (!env.CLOVER_ECOMM_PRIVATE_TOKEN) {
    const err = new Error('server_missing_ecomm_token');
    err.status = 500;
    throw err;
  }

  const amount = totalCents(body);
  const source = body.source;
  if (!source?.startsWith('clv_') || amount < 1) {
    const err = new Error('invalid_charge_request');
    err.status = 400;
    throw err;
  }

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
  if (!chargeRes.ok) {
    const err = new Error(charge.message || charge.error || 'charge_failed');
    err.status = chargeRes.status;
    err.details = charge;
    throw err;
  }

  const order = await createKitchenOrder(body, env, charge.id);

  return {
    ok: true,
    chargeId: charge.id,
    orderId: order?.id || null,
    status: charge.status,
    kitchenPrint: Boolean(order?.id),
  };
}