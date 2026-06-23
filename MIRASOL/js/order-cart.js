/**
 * El Mirasol — native multi-item cart & checkout
 * Persists to localStorage; checkout generates order summary + call/SMS handoff.
 */
(function () {
  const STORAGE_KEY = 'elmirasol-cart-v1';
  const listeners = new Set();

  let items = [];
  let drawerOpen = false;
  let checkoutOpen = false;

  function cfg() {
    return window.SITE_CONFIG?.ordering || {};
  }

  function enabled() {
    const c = cfg();
    return c.enabled && (c.provider === 'native' || c.cartEnabled);
  }

  function isEs() {
    return document.documentElement.lang === 'es' || window.MENU_LANG === 'es';
  }

  function t(en, es) {
    return isEs() ? es : en;
  }

  function labels() {
    return {
      cart: t('Cart', 'Carrito'),
      empty: t('Your cart is empty', 'Tu carrito está vacío'),
      emptySub: t('Tap a menu item to add it here.', 'Toca un platillo del menú para agregarlo.'),
      checkout: t('Checkout', 'Pagar'),
      subtotal: t('Subtotal', 'Subtotal'),
      tax: t('Tax', 'Impuesto'),
      total: t('Total', 'Total'),
      qty: t('Qty', 'Cant'),
      remove: t('Remove', 'Quitar'),
      addToCart: t('Add to Cart', 'Agregar al carrito'),
      added: t('Added to cart', 'Agregado al carrito'),
      continueShopping: t('Keep ordering', 'Seguir ordenando'),
      placeOrder: t('Place order', 'Enviar pedido'),
      yourOrder: t('Your order', 'Tu pedido'),
      name: t('Name', 'Nombre'),
      phone: t('Phone', 'Teléfono'),
      fulfillment: t('How would you like it?', '¿Cómo lo desea?'),
      pickup: t('Pickup', 'Para llevar'),
      dineIn: t('Dine in', 'Comer aquí'),
      notes: t('Special instructions (optional)', 'Instrucciones especiales (opcional)'),
      orderPlaced: t('Order ready to send!', '¡Pedido listo para enviar!'),
      orderPlacedSub: t(
        'Call us to confirm — or copy your order and text it.',
        'Llámenos para confirmar — o copie su pedido y envíelo por mensaje.'
      ),
      copyOrder: t('Copy order', 'Copiar pedido'),
      copied: t('Copied!', '¡Copiado!'),
      callConfirm: t('Call to confirm', 'Llamar para confirmar'),
      clearCart: t('Clear cart', 'Vaciar carrito'),
      items: t('items', 'artículos'),
      item: t('item', 'artículo'),
      close: t('Close', 'Cerrar'),
      review: t('Review & checkout', 'Revisar y pagar'),
      back: t('Back', 'Atrás'),
      required: t('Please enter your name and phone.', 'Ingrese su nombre y teléfono.'),
    };
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatMoney(n) {
    return '$' + (Number(n) || 0).toFixed(2);
  }

  function phoneTel() {
    return window.SITE_CONFIG?.brand?.phoneTel || '9107891154';
  }

  function phoneDisplay() {
    return window.SITE_CONFIG?.brand?.phone || '(910) 789-1154';
  }

  function taxRate() {
    return typeof cfg().taxRate === 'number' ? cfg().taxRate : 0.0675;
  }

  function pickupEtaLabel() {
    const minutes = window.SITE_CONFIG?.getRandomPickupMinutes?.() ?? 10;
    return t(`Pick up in ${minutes} min`, `Recoger en ${minutes} min`);
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(items)) items = [];
    } catch {
      items = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    notify();
  }

  function notify() {
    listeners.forEach((fn) => fn(getSnapshot()));
    updateFab();
    renderDrawer();
  }

  function getSnapshot() {
    const totals = calcTotals();
    return { items: [...items], ...totals, count: itemCount() };
  }

  function itemCount() {
    return items.reduce((n, it) => n + (it.qty || 1), 0);
  }

  function calcTotals() {
    const subtotal = items.reduce((s, it) => s + (it.unitPrice || 0) * (it.qty || 1), 0);
    const tax = Math.round(subtotal * taxRate() * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;
    return { subtotal, tax, total };
  }

  function lineSignature(line) {
    return `${line.itemKey}::${JSON.stringify(line.selections || {})}`;
  }

  function addLine(line) {
    if (!line) return false;
    const sig = lineSignature(line);
    const existing = items.find((it) => lineSignature(it) === sig);
    if (existing) {
      existing.qty = (existing.qty || 1) + (line.qty || 1);
    } else {
      items.push({
        ...line,
        id: line.id || `li-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        qty: line.qty || 1,
      });
    }
    save();
    showToast(labels().added);
    return true;
  }

  function updateQty(id, qty) {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    it.qty = Math.max(1, Math.min(99, qty));
    save();
  }

  function removeLine(id) {
    items = items.filter((x) => x.id !== id);
    save();
  }

  function clear() {
    items = [];
    save();
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function buildOrderText(orderInfo) {
    const L = labels();
    const { subtotal, tax, total } = calcTotals();
    const lines = [];
    lines.push(`MIRASOL — ${L.yourOrder}`);
    lines.push('—'.repeat(28));
    items.forEach((it) => {
      let row = `${it.qty}x ${it.name} — ${formatMoney(it.unitPrice * it.qty)}`;
      if (it.modifierLines?.length) {
        it.modifierLines.forEach((m) => {
          row += `\n   · ${m}`;
        });
      }
      lines.push(row);
    });
    lines.push('—'.repeat(28));
    lines.push(`${L.subtotal}: ${formatMoney(subtotal)}`);
    lines.push(`${L.tax}: ${formatMoney(tax)}`);
    lines.push(`${L.total}: ${formatMoney(total)}`);
    lines.push('—'.repeat(28));
    if (orderInfo) {
      lines.push(`${L.name}: ${orderInfo.name}`);
      lines.push(`${L.phone}: ${orderInfo.phone}`);
      lines.push(`${L.fulfillment}: ${orderInfo.fulfillment === 'dine-in' ? L.dineIn : L.pickup}`);
      if (orderInfo.fulfillment !== 'dine-in') lines.push(pickupEtaLabel());
      if (orderInfo.notes) lines.push(`${L.notes}: ${orderInfo.notes}`);
    }
    lines.push(`\n${phoneDisplay()}`);
    return lines.join('\n');
  }

  function showToast(msg) {
    let el = document.getElementById('cart-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cart-toast';
      el.className = 'cart-toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => el.classList.remove('is-visible'), 2200);
  }

  function updateFab() {
    const fab = document.getElementById('cart-fab');
    const barBtn = document.getElementById('menu-cart-btn');
    const barBadge = document.getElementById('menu-cart-count');
    const addBtn = document.getElementById('item-modal-add-cart');
    const badge = document.getElementById('cart-fab-count');
    const count = itemCount();
    const on = enabled();

    [fab, barBtn, addBtn].forEach((el) => {
      if (el) el.hidden = !on;
    });

    if (fab) {
      if (badge) {
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.hidden = count === 0;
      }
      fab.setAttribute('aria-label', `${labels().cart} — ${count} ${count === 1 ? labels().item : labels().items}`);
    }

    if (barBtn) {
      const label = labels().cart;
      barBtn.setAttribute('aria-label', `${label} — ${count}`);
      if (barBadge) {
        barBadge.textContent = count > 99 ? '99+' : String(count);
        barBadge.hidden = count === 0;
      }
    }
  }

  function openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    drawerOpen = true;
    checkoutOpen = false;
    renderDrawer();
    document.getElementById('cart-drawer-close')?.focus();
  }

  function closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
    drawerOpen = false;
    checkoutOpen = false;
  }

  function renderDrawer() {
    const list = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    const checkoutPanel = document.getElementById('cart-checkout-panel');
    const cartView = document.getElementById('cart-view');
    if (!list || !summary) return;

    const L = labels();
    const { subtotal, tax, total } = calcTotals();

    if (checkoutOpen && checkoutPanel && cartView) {
      cartView.hidden = true;
      checkoutPanel.hidden = false;
      return;
    }

    if (checkoutPanel && cartView) {
      cartView.hidden = false;
      checkoutPanel.hidden = true;
    }

    if (!items.length) {
      list.innerHTML =
        `<div class="cart-empty">` +
        `<p class="cart-empty__title">${escapeHtml(L.empty)}</p>` +
        `<p class="cart-empty__sub">${escapeHtml(L.emptySub)}</p></div>`;
      summary.innerHTML =
        `<button type="button" class="btn btn-primary cart-checkout-btn" disabled>${escapeHtml(L.checkout)}</button>`;
      return;
    }

    list.innerHTML = items
      .map((it) => {
        return (
          `<article class="cart-line" data-line-id="${escapeHtml(it.id)}">` +
          `<div class="cart-line__top">` +
          `<span class="cart-line__name">${escapeHtml(it.name)}</span>` +
          `<span class="cart-line__price">${escapeHtml(formatMoney(it.unitPrice * it.qty))}</span>` +
          `</div>` +
          `<div class="cart-line__controls">` +
          `<div class="qty-stepper qty-stepper--sm">` +
          `<button type="button" class="qty-stepper__btn" data-cart-qty-minus="${escapeHtml(it.id)}" aria-label="Decrease">−</button>` +
          `<span class="qty-stepper__val">${it.qty}</span>` +
          `<button type="button" class="qty-stepper__btn" data-cart-qty-plus="${escapeHtml(it.id)}" aria-label="Increase">+</button>` +
          `</div>` +
          `<button type="button" class="cart-line__remove" data-cart-remove="${escapeHtml(it.id)}">${escapeHtml(L.remove)}</button>` +
          `</div></article>`
        );
      })
      .join('');

    summary.innerHTML =
      `<div class="cart-totals">` +
      `<div class="cart-totals__row"><span>${escapeHtml(L.subtotal)}</span><span>${formatMoney(subtotal)}</span></div>` +
      `<div class="cart-totals__row cart-totals__row--muted"><span>${escapeHtml(L.tax)}</span><span>${formatMoney(tax)}</span></div>` +
      `<div class="cart-totals__row cart-totals__row--total"><span>${escapeHtml(L.total)}</span><span>${formatMoney(total)}</span></div>` +
      `</div>` +
      `<button type="button" class="btn btn-primary cart-checkout-btn" id="cart-go-checkout">${escapeHtml(L.review)}</button>` +
      `<button type="button" class="cart-clear-btn" id="cart-clear">${escapeHtml(L.clearCart)}</button>`;
  }

  function renderCheckoutForm() {
    const panel = document.getElementById('cart-checkout-panel');
    if (!panel) return;
    const L = labels();
    const { total } = calcTotals();
    panel.innerHTML =
      `<button type="button" class="cart-back-btn" id="cart-checkout-back">← ${escapeHtml(L.back)}</button>` +
      `<h3 class="cart-checkout__title">${escapeHtml(L.checkout)}</h3>` +
      `<p class="cart-checkout__total">${escapeHtml(L.total)}: <strong>${formatMoney(total)}</strong></p>` +
      `<form class="cart-checkout__form" id="cart-checkout-form">` +
      `<label class="cart-field"><span>${escapeHtml(L.name)}</span><input type="text" name="name" required autocomplete="name"></label>` +
      `<label class="cart-field"><span>${escapeHtml(L.phone)}</span><input type="tel" name="phone" required autocomplete="tel" inputmode="tel"></label>` +
      `<fieldset class="cart-field cart-field--radio">` +
      `<legend>${escapeHtml(L.fulfillment)}</legend>` +
      `<label><input type="radio" name="fulfillment" value="pickup" checked> ${escapeHtml(L.pickup)}</label>` +
      `<label><input type="radio" name="fulfillment" value="dine-in"> ${escapeHtml(L.dineIn)}</label>` +
      `</fieldset>` +
      `<label class="cart-field"><span>${escapeHtml(L.notes)}</span><textarea name="notes" rows="2"></textarea></label>` +
      `<button type="submit" class="btn btn-primary cart-place-btn">${escapeHtml(L.placeOrder)}</button>` +
      `</form>` +
      `<div class="cart-confirm" id="cart-confirm" hidden>` +
      `<p class="cart-confirm__title">${escapeHtml(L.orderPlaced)}</p>` +
      `<p class="cart-confirm__sub">${escapeHtml(L.orderPlacedSub)}</p>` +
      `<pre class="cart-confirm__text" id="cart-confirm-text"></pre>` +
      `<div class="cart-confirm__actions">` +
      `<a href="tel:${phoneTel()}" class="btn btn-primary">${escapeHtml(L.callConfirm)}</a>` +
      `<button type="button" class="btn btn-outline" id="cart-copy-order">${escapeHtml(L.copyOrder)}</button>` +
      `<button type="button" class="btn btn-outline" id="cart-done">${escapeHtml(L.continueShopping)}</button>` +
      `</div></div>`;
  }

  function bindDrawerEvents() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer || drawer.dataset.bound) return;
    drawer.dataset.bound = '1';

    document.getElementById('cart-fab')?.addEventListener('click', openDrawer);
    document.getElementById('menu-cart-btn')?.addEventListener('click', openDrawer);
    document.getElementById('cart-drawer-close')?.addEventListener('click', closeDrawer);
    drawer.querySelector('.cart-drawer__backdrop')?.addEventListener('click', closeDrawer);

    drawer.addEventListener('click', (e) => {
      const minus = e.target.closest('[data-cart-qty-minus]');
      const plus = e.target.closest('[data-cart-qty-plus]');
      const rem = e.target.closest('[data-cart-remove]');
      if (minus) {
        const it = items.find((x) => x.id === minus.dataset.cartQtyMinus);
        if (it) updateQty(it.id, (it.qty || 1) - 1);
      }
      if (plus) {
        const it = items.find((x) => x.id === plus.dataset.cartQtyPlus);
        if (it) updateQty(it.id, (it.qty || 1) + 1);
      }
      if (rem) removeLine(rem.dataset.cartRemove);
      if (e.target.id === 'cart-go-checkout') {
        checkoutOpen = true;
        renderCheckoutForm();
        renderDrawer();
      }
      if (e.target.id === 'cart-clear' && confirm(t('Clear your cart?', '¿Vaciar el carrito?'))) {
        clear();
      }
    });

    drawer.addEventListener('submit', (e) => {
      const form = e.target.closest('#cart-checkout-form');
      if (!form) return;
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const phone = String(fd.get('phone') || '').trim();
      if (!name || !phone) {
        showToast(labels().required);
        return;
      }
      const orderInfo = {
        name,
        phone,
        fulfillment: fd.get('fulfillment') || 'pickup',
        notes: String(fd.get('notes') || '').trim(),
      };
      const text = buildOrderText(orderInfo);
      const confirm = document.getElementById('cart-confirm');
      const confirmText = document.getElementById('cart-confirm-text');
      if (confirmText) confirmText.textContent = text;
      form.hidden = true;
      confirm?.removeAttribute('hidden');
      window._lastOrderText = text;
    });

    drawer.addEventListener('click', (e) => {
      if (e.target.id === 'cart-checkout-back') {
        checkoutOpen = false;
        renderDrawer();
      }
      if (e.target.id === 'cart-copy-order' && window._lastOrderText) {
        navigator.clipboard?.writeText(window._lastOrderText).then(() => showToast(labels().copied));
      }
      if (e.target.id === 'cart-done') {
        clear();
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerOpen) closeDrawer();
    });
  }

  function buildShell() {
    if (document.getElementById('cart-drawer') || !enabled()) return;

    const root = document.createElement('div');
    root.id = 'order-cart-root';
    root.innerHTML =
      `<button type="button" class="cart-fab" id="cart-fab" aria-label="Cart">` +
      `<svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h8.45l1.2 3H7.16zM6 6h14l-1 4H7L6 6zm-2 0L3.27 2H1v2h2l3.6 7.59L5.25 14c-.05.16-.25.16-.25.16H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20.04 4H5.21l-.94-2H6z"/></svg>` +
      `<span class="cart-fab__badge" id="cart-fab-count" hidden>0</span></button>` +
      `<aside class="cart-drawer" id="cart-drawer" hidden aria-hidden="true" aria-label="Shopping cart">` +
      `<div class="cart-drawer__backdrop"></div>` +
      `<div class="cart-drawer__panel" role="dialog" aria-modal="true">` +
      `<header class="cart-drawer__head">` +
      `<h2 class="cart-drawer__title">${escapeHtml(labels().cart)}</h2>` +
      `<button type="button" class="cart-drawer__close" id="cart-drawer-close" aria-label="${escapeHtml(labels().close)}">&times;</button>` +
      `</header>` +
      `<div id="cart-view">` +
      `<div class="cart-drawer__body" id="cart-items"></div>` +
      `<footer class="cart-drawer__foot" id="cart-summary"></footer>` +
      `</div>` +
      `<div id="cart-checkout-panel" hidden></div>` +
      `</div></aside>`;

    document.body.appendChild(root);
    bindDrawerEvents();
    updateFab();
    renderDrawer();
  }

  function init() {
    if (!enabled()) return;
    load();
    buildShell();
    notify();
  }

  window.OrderCart = {
    enabled,
    addLine,
    updateQty,
    removeLine,
    clear,
    subscribe,
    getSnapshot,
    openDrawer,
    closeDrawer,
    formatMoney,
    labels,
  };

  function handleQuickAdd(e) {
    const { sku, name, price, itemKey } = e.detail || {};
    if (!sku && !itemKey) return;
    const unitPrice = parseFloat(price) || 0;
    if (!unitPrice) return;
    addLine({
      itemKey: itemKey || sku,
      sku: sku || itemKey,
      name: name || sku,
      unitPrice,
      qty: 1,
      selections: {},
      priceDisplay: formatMoney(unitPrice),
    });
    openDrawer();
  }

  function handleOpenCart() {
    openDrawer();
  }

  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('elmirasol:lang-change', () => {
    renderDrawer();
    updateFab();
  });
  window.addEventListener('elmirasol:add-to-cart', handleQuickAdd);
  window.addEventListener('elmirasol:open-cart', handleOpenCart);
})();