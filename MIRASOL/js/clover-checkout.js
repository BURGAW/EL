/**
 * Clover checkout — Visa, Mastercard, Apple Pay (via Clover Ecommerce).
 * Payments run on a secure server; this file only starts checkout and shows UI.
 */
(function () {
  const ordering = () => window.SITE_CONFIG?.ordering || {};
  const clover = () => ordering().clover || {};
  const payment = () => ordering().payment || {};

  function isEs() {
    return document.documentElement.lang === 'es' || window.MENU_LANG === 'es';
  }

  function t(en, es) {
    return isEs() ? es : en;
  }

  function apiBase() {
    return (clover().api?.baseUrl || payment().apiBaseUrl || '').replace(/\/$/, '');
  }

  function checkoutPath() {
    return clover().api?.checkoutPath || payment().checkoutPath || '/v1/checkout/pickup';
  }

  function isPaymentLive() {
    return Boolean(apiBase());
  }

  function siteOrigin() {
    try {
      return window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    } catch {
      return '';
    }
  }

  function labels() {
    return {
      payNow: t('Pay with card or Apple Pay', 'Pagar con tarjeta o Apple Pay'),
      payAtPickup: t('Place order — pay at pickup', 'Enviar pedido — pagar al recoger'),
      payMethods: t('We accept', 'Aceptamos'),
      secure: t('Secure checkout powered by Clover', 'Pago seguro con Clover'),
      connecting: t(
        'Card & Apple Pay checkout is being connected. You can still order — call to confirm.',
        'Pago con tarjeta y Apple Pay en camino. Puede ordenar — llame para confirmar.'
      ),
      processing: t('Opening secure payment…', 'Abriendo pago seguro…'),
      paymentError: t('Could not start payment. Please call us to order.', 'No se pudo iniciar el pago. Llámenos para ordenar.'),
    };
  }

  function buildCheckoutPayload(orderInfo, cart) {
    const items = (cart?.items || []).map((line) => ({
      name: line.name || 'Menu item',
      quantity: line.qty || 1,
      unitPrice: line.unitPrice || 0,
      modifierLines: line.modifierLines || [],
    }));

    return {
      merchantId: clover().merchantId || '',
      pickupOnly: true,
      customer: {
        name: orderInfo.name,
        phone: orderInfo.phone,
        email: orderInfo.email || '',
      },
      notes: orderInfo.notes || '',
      fulfillment: 'pickup',
      totals: {
        subtotal: cart.subtotal,
        tax: cart.tax,
        total: cart.total,
      },
      items,
      orderText: orderInfo.orderText || '',
      returnUrls: {
        success: `${siteOrigin()}menu.html?order=paid`,
        cancel: `${siteOrigin()}menu.html?order=cancelled`,
      },
      kitchenDevice: clover().kitchenDevice || null,
    };
  }

  async function startCheckout(orderInfo, cart) {
    const base = apiBase();
    if (!base) return { ok: false, reason: 'not_configured' };

    const L = labels();
    const payload = buildCheckoutPayload(orderInfo, cart);

    try {
      const res = await fetch(`${base}${checkoutPath()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { ok: false, reason: data.message || data.error || 'request_failed' };
      }

      if (data.checkoutUrl || data.href) {
        window.location.href = data.checkoutUrl || data.href;
        return { ok: true, redirect: true };
      }

      if (data.checkoutSessionId && data.embed && payment().mode === 'iframe') {
        return { ok: true, sessionId: data.checkoutSessionId, embed: true };
      }

      return { ok: false, reason: 'no_checkout_url' };
    } catch {
      return { ok: false, reason: 'network' };
    }
  }

  function paymentBadgesHtml() {
    const L = labels();
    return (
      `<div class="cart-pay-methods" aria-label="${L.payMethods}">` +
      `<p class="cart-pay-methods__label">${L.payMethods}</p>` +
      `<ul class="cart-pay-methods__list">` +
      `<li class="cart-pay-methods__item cart-pay-methods__item--visa" title="Visa">` +
      `<span class="cart-pay-methods__icon" aria-hidden="true">VISA</span></li>` +
      `<li class="cart-pay-methods__item cart-pay-methods__item--mc" title="Mastercard">` +
      `<span class="cart-pay-methods__icon" aria-hidden="true">MC</span></li>` +
      `<li class="cart-pay-methods__item cart-pay-methods__item--apple" title="Apple Pay">` +
      `<span class="cart-pay-methods__icon cart-pay-methods__icon--apple" aria-hidden="true">Apple&nbsp;Pay</span></li>` +
      `</ul>` +
      `<p class="cart-pay-methods__secure">${L.secure}</p>` +
      `</div>`
    );
  }

  function paymentNoteHtml() {
    if (isPaymentLive()) return '';
    const L = labels();
    return `<p class="cart-pay-note">${L.connecting}</p>`;
  }

  window.CloverCheckout = {
    isPaymentLive,
    labels,
    paymentBadgesHtml,
    paymentNoteHtml,
    buildCheckoutPayload,
    startCheckout,
    acceptedMethods: ['visa', 'mastercard', 'apple_pay'],
  };
})();