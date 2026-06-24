/**
 * MIRASOL — dedicated payment page (card fields off the cart drawer).
 */
(function () {
  const CART_KEY = 'elmirasol-cart-v1';
  const DRAFT_KEY = 'elmirasol-checkout-draft';

  function isEs() {
    return document.documentElement.lang === 'es' || window.MENU_LANG === 'es';
  }

  function t(en, es) {
    return isEs() ? es : en;
  }

  function labels() {
    return {
      pickup: t('Pickup order', 'Pedido para llevar'),
      items: t('items', 'artículos'),
      item: t('item', 'artículo'),
      subtotal: t('Subtotal', 'Subtotal'),
      tax: t('Tax', 'Impuesto'),
      total: t('Total', 'Total'),
      payNow: t('Pay now', 'Pagar ahora'),
      processing: t('Processing payment…', 'Procesando pago…'),
      paymentError: t('Payment failed. Please call us to order.', 'El pago falló. Llámenos para ordenar.'),
      paid: t('Payment received — thank you!', '¡Pago recibido — gracias!'),
      paidSub: t("We're preparing your order for pickup.", 'Estamos preparando su pedido para recoger.'),
      backMenu: t('Back to menu', 'Volver al menú'),
      loading: t('Loading secure payment…', 'Cargando pago seguro…'),
      notReady: t('Payment is not available. Please order from the menu.', 'Pago no disponible. Ordene desde el menú.'),
    };
  }

  function embedSuffix() {
    try {
      if (/[?&](embed|gsites)(=1)?(?=&|$)/i.test(window.location.search)) return '?embed=1';
      if (document.documentElement.classList.contains('gsites-embed')) return '?embed=1';
    } catch {
      /* ignore */
    }
    return '';
  }

  function menuUrl() {
    return `menu.html${embedSuffix()}`;
  }

  function formatMoney(n) {
    return '$' + (Number(n) || 0).toFixed(2);
  }

  function taxRate() {
    return typeof window.SITE_CONFIG?.ordering?.taxRate === 'number'
      ? window.SITE_CONFIG.ordering.taxRate
      : 0.0675;
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const items = raw ? JSON.parse(raw) : [];
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  }

  function loadDraft() {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      const draft = JSON.parse(raw);
      if (!draft?.name || !draft?.phone) return null;
      const age = Date.now() - (draft.savedAt || 0);
      if (age > 30 * 60 * 1000) return null;
      return draft;
    } catch {
      return null;
    }
  }

  function calcTotals(items) {
    const subtotal = items.reduce((s, it) => s + (it.unitPrice || 0) * (it.qty || 1), 0);
    const tax = Math.round(subtotal * taxRate() * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;
    const count = items.reduce((n, it) => n + (it.qty || 1), 0);
    return { subtotal, tax, total, count };
  }

  function cartSnapshot(items) {
    const totals = calcTotals(items);
    return { items: [...items], ...totals };
  }

  function redirectMenu() {
    window.location.replace(menuUrl());
  }

  function renderSummary(items, draft, totals) {
    const L = labels();
    const el = document.getElementById('pay-summary');
    if (!el) return;

    const countLabel = `${totals.count} ${totals.count === 1 ? L.item : L.items}`;
    el.innerHTML =
      `<p class="pay-summary__items">${countLabel}</p>` +
      `<div class="pay-summary__row"><span>${L.subtotal}</span><span>${formatMoney(totals.subtotal)}</span></div>` +
      `<div class="pay-summary__row pay-summary__row--muted"><span>${L.tax}</span><span>${formatMoney(totals.tax)}</span></div>` +
      `<div class="pay-summary__row pay-summary__row--total"><span>${L.total}</span><strong>${formatMoney(totals.total)}</strong></div>` +
      `<p class="pay-summary__guest"><strong>${draft.name}</strong> · ${draft.phone}</p>`;
  }

  function showSuccess() {
    const L = labels();
    document.querySelector('.pay-card')?.setAttribute('hidden', '');
    document.getElementById('pay-summary')?.setAttribute('hidden', '');
    const success = document.getElementById('pay-success');
    if (success) {
      success.removeAttribute('hidden');
      const title = document.getElementById('pay-success-title');
      const sub = document.getElementById('pay-success-sub');
      if (title) title.textContent = L.paid;
      if (sub) sub.textContent = L.paidSub;
    }
  }

  function clearOrder() {
    try {
      localStorage.removeItem(CART_KEY);
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  }

  async function completePayment(orderInfo, snapshot) {
    const L = labels();
    const btn = document.getElementById('pay-submit');
    if (btn) {
      btn.disabled = true;
      btn.textContent = L.processing;
    }

    const result = await window.CloverCheckout?.payWithIframe?.(orderInfo, snapshot);
    if (result?.ok) {
      clearOrder();
      showSuccess();
      return;
    }

    if (btn) {
      btn.disabled = false;
      btn.textContent = L.payNow;
    }
    const hint = document.getElementById('pay-hint');
    if (hint) {
      hint.textContent = L.paymentError;
      hint.hidden = false;
    }
  }

  function orderingEnabled() {
    return window.SITE_CONFIG?.ordering?.enabled === true;
  }

  async function init() {
    const L = labels();
    if (!orderingEnabled()) {
      redirectMenu();
      return;
    }

    const items = loadCart();
    const draft = loadDraft();

    if (!items.length || !draft) {
      redirectMenu();
      return;
    }

    const snapshot = cartSnapshot(items);
    const orderInfo = {
      name: draft.name,
      phone: draft.phone,
      notes: draft.notes || '',
      fulfillment: draft.fulfillment || 'pickup',
      orderText: draft.orderText || '',
    };

    document.querySelectorAll('[data-pay-back]').forEach((link) => {
      link.setAttribute('href', menuUrl());
    });

    const pickupLabel = document.getElementById('pay-pickup-label');
    if (pickupLabel) pickupLabel.textContent = L.pickup;

    renderSummary(items, draft, snapshot);

    const trust = document.getElementById('pay-trust');
    if (trust && window.CloverCheckout?.paymentTrustLineHtml) {
      trust.innerHTML = window.CloverCheckout.paymentTrustLineHtml();
      trust.hidden = false;
    }

    const payBtn = document.getElementById('pay-submit');
    const iframeMount = document.getElementById('pay-iframe-mount');
    const canPay = window.CloverCheckout?.isPaymentLive?.() && window.CloverCheckout?.hasPublicKey?.();

    if (!canPay || !window.CloverIframe?.fieldsHtml) {
      const hint = document.getElementById('pay-hint');
      if (hint) {
        hint.textContent = L.notReady;
        hint.hidden = false;
      }
      return;
    }

    if (iframeMount) {
      iframeMount.innerHTML = window.CloverIframe.fieldsHtml();
    }

    if (payBtn) {
      payBtn.textContent = L.payNow;
      payBtn.disabled = true;
      payBtn.addEventListener('click', () => completePayment(orderInfo, snapshot));
    }

    await window.CloverIframe.afterCheckoutRender(snapshot.total, async (token) => {
      const charge =
        window.CloverIframe?.chargeToken?.(token, orderInfo, snapshot) ||
        (await Promise.resolve({ ok: false }));
      if (charge?.ok) {
        clearOrder();
        showSuccess();
        return true;
      }
      const hint = document.getElementById('pay-hint');
      if (hint) {
        hint.textContent = L.paymentError;
        hint.hidden = false;
      }
      return false;
    });

    if (payBtn) payBtn.disabled = false;
  }

  document.addEventListener('DOMContentLoaded', init);
})();