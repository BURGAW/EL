/**
 * Clover Hosted iFrame — card fields + Apple Pay on MIRASOL checkout.
 * Tokenizes on the browser; charges run on your secure backend only.
 */
(function () {
  const ordering = () => window.SITE_CONFIG?.ordering || {};
  const cloverCfg = () => ordering().clover || {};
  const payment = () => ordering().payment || {};
  const ecommerce = () => cloverCfg().ecommerce || {};

  let sdkPromise = null;
  let clover = null;
  let elements = null;
  let mounted = false;
  let cardElements = {};
  let appleButton = null;
  let appleListenerBound = false;
  let lastTotalCents = 0;

  function isEs() {
    return document.documentElement.lang === 'es' || window.MENU_LANG === 'es';
  }

  function t(en, es) {
    return isEs() ? es : en;
  }

  function isIframeMode() {
    return payment().mode === 'iframe' || ecommerce().mode === 'iframe';
  }

  function publicKey() {
    return (ecommerce().publicKey || '').trim();
  }

  function merchantId() {
    return (cloverCfg().merchantId || '').trim();
  }

  function apiBase() {
    return (cloverCfg().api?.baseUrl || payment().apiBaseUrl || '').replace(/\/$/, '');
  }

  function chargePath() {
    return cloverCfg().api?.chargePath || payment().chargePath || '/v1/charges/pickup';
  }

  function sdkUrl() {
    if (ecommerce().sandbox) return 'https://checkout.sandbox.dev.clover.com/sdk.js';
    return 'https://checkout.clover.com/sdk.js';
  }

  function hasPublicKey() {
    return Boolean(publicKey() && merchantId());
  }

  function isChargeLive() {
    return Boolean(apiBase());
  }

  function iframeStyles() {
    return {
      body: {
        fontFamily: 'Montserrat, system-ui, sans-serif',
        fontSize: '14px',
      },
      input: {
        fontSize: '14px',
        padding: '8px 10px',
        border: '1px solid #e0d6c8',
        borderRadius: '6px',
        backgroundColor: '#fff',
        color: '#1a1a1a',
      },
    };
  }

  function labels() {
    return {
      cardDetails: t('Card details', 'Datos de la tarjeta'),
      cardNumber: t('Card number', 'Número de tarjeta'),
      expiry: t('Expiry', 'Vencimiento'),
      cvv: t('CVV', 'CVV'),
      postal: t('ZIP code', 'Código postal'),
      payNow: t('Pay with card or Apple Pay', 'Pagar con tarjeta o Apple Pay'),
      processing: t('Processing payment…', 'Procesando pago…'),
      tokenError: t('Check your card details and try again.', 'Revise los datos de la tarjeta e intente de nuevo.'),
      chargeError: t('Payment failed. Please call us to order.', 'El pago falló. Llámenos para ordenar.'),
      paid: t('Payment received — thank you!', '¡Pago recibido — gracias!'),
      paidSub: t('We\'re preparing your order for pickup.', 'Estamos preparando su pedido para recoger.'),
      sdkLoading: t('Loading secure payment fields…', 'Cargando campos de pago seguros…'),
      sdkError: t('Payment fields could not load. Use pay at pickup or call us.', 'No se cargaron los campos de pago. Pague al recoger o llámenos.'),
    };
  }

  function fieldsHtml() {
    const L = labels();
    return (
      `<div class="clover-iframe" id="clover-iframe-root">` +
      `<div class="clover-iframe__status" id="clover-iframe-status" aria-live="polite"></div>` +
      `<div class="clover-iframe__field clover-iframe__field--card">` +
      `<div id="clover-card-number" class="clover-iframe__mount" aria-label="${L.cardNumber}"></div>` +
      `<div class="clover-iframe__error" id="clover-card-number-errors" role="alert"></div>` +
      `</div>` +
      `<div class="clover-iframe__row clover-iframe__row--3">` +
      `<div class="clover-iframe__field">` +
      `<div id="clover-card-date" class="clover-iframe__mount" aria-label="${L.expiry}"></div>` +
      `<div class="clover-iframe__error" id="clover-card-date-errors" role="alert"></div>` +
      `</div>` +
      `<div class="clover-iframe__field">` +
      `<div id="clover-card-cvv" class="clover-iframe__mount" aria-label="${L.cvv}"></div>` +
      `<div class="clover-iframe__error" id="clover-card-cvv-errors" role="alert"></div>` +
      `</div>` +
      `<div class="clover-iframe__field">` +
      `<div id="clover-card-postal" class="clover-iframe__mount" aria-label="${L.postal}"></div>` +
      `<div class="clover-iframe__error" id="clover-card-postal-errors" role="alert"></div>` +
      `</div>` +
      `</div>` +
      `<div id="clover-apple-pay" class="clover-iframe__apple" hidden></div>` +
      `<div class="clover-iframe__response" id="clover-card-response" role="alert"></div>` +
      `</div>`
    );
  }

  function setStatus(msg, isError) {
    const el = document.getElementById('clover-iframe-status');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('clover-iframe__status--error', Boolean(isError));
  }

  function showFieldError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message || '';
  }

  function bindCardValidation() {
    const map = {
      CARD_NUMBER: 'clover-card-number-errors',
      CARD_DATE: 'clover-card-date-errors',
      CARD_CVV: 'clover-card-cvv-errors',
      CARD_POSTAL_CODE: 'clover-card-postal-errors',
    };

    Object.entries(cardElements).forEach(([key, el]) => {
      if (!el?.addEventListener) return;
      const errId = map[key];
      el.addEventListener('change', (event) => {
        const field = event?.field || key;
        const err = event?.errors?.[field] || event?.error;
        showFieldError(errId, err || '');
      });
      el.addEventListener('blur', (event) => {
        const field = event?.field || key;
        const err = event?.errors?.[field] || event?.error;
        if (err) showFieldError(errId, err);
      });
    });
  }

  function loadSdk() {
    if (typeof window.Clover === 'function') return Promise.resolve();
    if (sdkPromise) return sdkPromise;

    sdkPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-clover-sdk]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('sdk_load_failed')));
        if (typeof window.Clover === 'function') resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = sdkUrl();
      script.async = true;
      script.dataset.cloverSdk = '1';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('sdk_load_failed'));
      document.head.appendChild(script);
    });

    return sdkPromise;
  }

  function initClover() {
    if (clover && elements) return true;
    if (!hasPublicKey() || typeof window.Clover !== 'function') return false;

    clover = new window.Clover(publicKey(), {
      merchantId: merchantId(),
      locale: 'en-US',
    });
    elements = clover.elements();
    return true;
  }

  function mountCardFields() {
    if (!initClover() || mounted) return false;

    const styles = iframeStyles();
    cardElements = {
      CARD_NUMBER: elements.create('CARD_NUMBER', styles),
      CARD_DATE: elements.create('CARD_DATE', styles),
      CARD_CVV: elements.create('CARD_CVV', styles),
      CARD_POSTAL_CODE: elements.create('CARD_POSTAL_CODE', styles),
    };

    cardElements.CARD_NUMBER.mount('#clover-card-number');
    cardElements.CARD_DATE.mount('#clover-card-date');
    cardElements.CARD_CVV.mount('#clover-card-cvv');
    cardElements.CARD_POSTAL_CODE.mount('#clover-card-postal');
    bindCardValidation();
    mounted = true;
    return true;
  }

  function mountApplePay(totalCents) {
    if (!initClover() || !payment().methods?.includes('apple_pay')) return;
    const wrap = document.getElementById('clover-apple-pay');
    if (!wrap || !clover?.createApplePaymentRequest) return;

    try {
      if (appleButton?.unmount) appleButton.unmount();
      const applePaymentRequest = clover.createApplePaymentRequest({
        amount: totalCents,
        countryCode: 'US',
        currencyCode: 'USD',
      });
      appleButton = elements.create('PAYMENT_REQUEST_BUTTON_APPLE_PAY', {
        applePaymentRequest,
        sessionIdentifier: merchantId(),
      });
      appleButton.mount('#clover-apple-pay');
      wrap.hidden = false;
      lastTotalCents = totalCents;
    } catch {
      wrap.hidden = true;
    }
  }

  function bindApplePayCharge(handler) {
    if (appleListenerBound) return;
    appleListenerBound = true;

    window.addEventListener('paymentMethod', async (event) => {
      const token = event?.detail?.tokenRecieved?.id || event?.detail?.tokenReceived?.id;
      if (!token) {
        clover?.updateApplePaymentStatus?.('failed');
        return;
      }
      const ok = await handler(token);
      clover?.updateApplePaymentStatus?.(ok ? 'success' : 'failed');
    });
  }

  function unmount() {
    Object.values(cardElements).forEach((el) => {
      try {
        el?.unmount?.();
      } catch {
        /* ignore */
      }
    });
    cardElements = {};
    if (appleButton?.unmount) {
      try {
        appleButton.unmount();
      } catch {
        /* ignore */
      }
    }
    appleButton = null;
    mounted = false;
    clover = null;
    elements = null;
  }

  function uuid() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function buildChargePayload(orderInfo, cart, source) {
    const items = (cart?.items || []).map((line) => ({
      name: line.name || 'Menu item',
      quantity: line.qty || 1,
      unitPrice: line.unitPrice || 0,
      modifierLines: line.modifierLines || [],
    }));

    return {
      source,
      merchantId: merchantId(),
      idempotencyKey: uuid(),
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
      kitchenDevice: cloverCfg().kitchenDevice || null,
    };
  }

  async function chargeToken(source, orderInfo, cart) {
    const base = apiBase();
    if (!base || !source) return { ok: false, reason: 'not_configured' };

    const payload = buildChargePayload(orderInfo, cart, source);

    try {
      const res = await fetch(`${base}${chargePath()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, reason: data.message || data.error || 'charge_failed' };
      }
      return { ok: true, data };
    } catch {
      return { ok: false, reason: 'network' };
    }
  }

  async function createCardToken() {
    if (!clover?.createToken) return { ok: false, reason: 'sdk_not_ready' };
    try {
      const result = await clover.createToken();
      if (result?.errors) {
        const msg = Object.values(result.errors).find(Boolean);
        return { ok: false, reason: msg || 'validation_failed', errors: result.errors };
      }
      if (!result?.token) return { ok: false, reason: 'no_token' };
      return { ok: true, token: result.token };
    } catch {
      return { ok: false, reason: 'tokenize_failed' };
    }
  }

  async function payWithCard(orderInfo, cart) {
    const L = labels();
    const tokenResult = await createCardToken();
    if (!tokenResult.ok) {
      const response = document.getElementById('clover-card-response');
      if (response) response.textContent = tokenResult.reason || L.tokenError;
      return tokenResult;
    }
    return chargeToken(tokenResult.token, orderInfo, cart);
  }

  async function afterCheckoutRender(totalDollars, onApplePay) {
    if (!isIframeMode() || !hasPublicKey()) return;

    const L = labels();
    const totalCents = Math.round((Number(totalDollars) || 0) * 100);
    setStatus(L.sdkLoading, false);

    try {
      await loadSdk();
      if (!mountCardFields()) {
        setStatus(L.sdkError, true);
        return;
      }
      if (isChargeLive() && onApplePay) {
        bindApplePayCharge(onApplePay);
        mountApplePay(totalCents);
      } else if (lastTotalCents !== totalCents && clover?.updateApplePaymentRequest) {
        clover.updateApplePaymentRequest({ amount: totalCents, countryCode: 'US', currencyCode: 'USD' });
        lastTotalCents = totalCents;
      }
      setStatus('', false);
    } catch {
      setStatus(L.sdkError, true);
    }
  }

  window.CloverIframe = {
    isIframeMode,
    hasPublicKey,
    isChargeLive,
    isMounted: () => mounted,
    fieldsHtml,
    labels,
    afterCheckoutRender,
    unmount,
    payWithCard,
    chargeToken,
    createCardToken,
    loadSdk,
  };
})();