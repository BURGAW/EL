/**
 * Clover Online Ordering — pickup only
 * Opens your Clover store (tab or embed). Native cart is disabled when storeUrl is set.
 */
(function () {
  const ordering = () => window.SITE_CONFIG?.ordering || {};
  const clover = () => ordering().clover || {};

  function isEs() {
    return document.documentElement.lang === 'es' || window.MENU_LANG === 'es';
  }

  function t(en, es) {
    return isEs() ? es : en;
  }

  function storeUrl() {
    const c = clover();
    const url = (c.storeUrl || ordering().orderUrl || '').trim();
    return url;
  }

  function isLive() {
    return ordering().enabled && ordering().provider === 'clover' && Boolean(storeUrl());
  }

  function pickupOnly() {
    return clover().pickupOnly !== false && ordering().pickupOnly !== false;
  }

  function openMode() {
    return clover().openIn || 'tab';
  }

  function labels() {
    return {
      badge: t('Pickup orders', 'Pedidos para llevar'),
      title: t('Order online — pickup only', 'Ordene en línea — solo para llevar'),
      sub: t(
        'Pay securely on Clover. We\'ll have your order ready at the counter.',
        'Pague de forma segura en Clover. Tendremos su pedido listo en el mostrador.'
      ),
      btn: t('Order pickup online', 'Ordenar para recoger'),
      btnShort: t('Order pickup', 'Ordenar'),
      modalTitle: t('MIRASOL — Pickup order', 'MIRASOL — Pedido para llevar'),
      close: t('Close', 'Cerrar'),
      openTab: t('Open in new tab', 'Abrir en nueva pestaña'),
      noDelivery: t('Pickup only — no delivery', 'Solo para llevar — sin entregas'),
    };
  }

  function ensureModal() {
    let modal = document.getElementById('clover-order-modal');
    if (modal) return modal;

    const L = labels();
    modal = document.createElement('div');
    modal.id = 'clover-order-modal';
    modal.className = 'clover-order-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      `<div class="clover-order-modal__backdrop" data-clover-close tabindex="-1"></div>` +
      `<div class="clover-order-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="clover-order-title">` +
      `<header class="clover-order-modal__head">` +
      `<div>` +
      `<p class="clover-order-modal__badge">${L.badge}</p>` +
      `<h2 class="clover-order-modal__title" id="clover-order-title">${L.modalTitle}</h2>` +
      `<p class="clover-order-modal__sub">${L.noDelivery}</p>` +
      `</div>` +
      `<button type="button" class="clover-order-modal__close" data-clover-close aria-label="${L.close}">&times;</button>` +
      `</header>` +
      `<div class="clover-order-modal__frame-wrap">` +
      `<iframe class="clover-order-modal__frame" id="clover-order-frame" title="${L.modalTitle}" loading="lazy"></iframe>` +
      `</div>` +
      `<footer class="clover-order-modal__foot">` +
      `<a href="#" class="btn btn-outline clover-order-modal__tab" id="clover-order-tab" target="_blank" rel="noopener noreferrer">${L.openTab}</a>` +
      `</footer></div>`;
    document.body.appendChild(modal);

    modal.querySelectorAll('[data-clover-close]').forEach((el) => {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    return modal;
  }

  function open(url) {
    const target = (url || storeUrl()).trim();
    if (!target) return false;

    const mode = openMode();
    if (mode === 'tab') {
      window.open(target, '_blank', 'noopener,noreferrer');
      return true;
    }
    if (mode === 'same') {
      window.location.href = target;
      return true;
    }

    const modal = ensureModal();
    const frame = document.getElementById('clover-order-frame');
    const tabLink = document.getElementById('clover-order-tab');
    if (frame) frame.src = target;
    if (tabLink) tabLink.href = target;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('clover-order-open');
    document.body.classList.add('modal-open');
    modal.querySelector('.clover-order-modal__close')?.focus({ preventScroll: true });
    return true;
  }

  function close() {
    const modal = document.getElementById('clover-order-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('clover-order-open');
    if (!document.getElementById('tuesday-closed-modal')?.classList.contains('is-open')) {
      document.body.classList.remove('modal-open');
    }
    const frame = document.getElementById('clover-order-frame');
    if (frame) frame.src = 'about:blank';
  }

  function bindClick(el) {
    if (!el || el.dataset.cloverBound) return;
    el.dataset.cloverBound = '1';
    el.addEventListener('click', (e) => {
      if (!isLive()) return;
      e.preventDefault();
      open();
    });
  }

  function injectMenuToolbarBtn() {
    if (!document.body.classList.contains('menu-page')) return;
    const toolbar = document.getElementById('menu-cat-toolbar');
    if (!toolbar || document.getElementById('clover-pickup-btn')) return;

    const L = labels();
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'clover-pickup-btn menu-online__clover';
    btn.id = 'clover-pickup-btn';
    btn.textContent = L.btnShort;
    btn.setAttribute('aria-label', L.btn);
    bindClick(btn);
    toolbar.appendChild(btn);
  }

  function injectHeroBtn() {
    const wrap = document.querySelector('.hero-btns');
    if (!wrap || document.getElementById('hero-clover-order')) return;

    const L = labels();
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.id = 'hero-clover-order';
    btn.textContent = L.btn;
    bindClick(btn);
    wrap.insertBefore(btn, wrap.firstChild);
  }

  function injectMobileQuick() {
    const quick = document.querySelector('.mobile-quick');
    if (!quick || document.getElementById('quick-clover-order')) return;

    const L = labels();
    const link = document.createElement('button');
    link.type = 'button';
    link.className = 'quick-clover-order';
    link.id = 'quick-clover-order';
    link.textContent = L.btnShort;
    bindClick(link);
    quick.insertBefore(link, quick.children[1] || null);
  }

  function enhanceItemModal() {
    const addBtn = document.getElementById('item-modal-add-cart');
    if (!addBtn || addBtn.dataset.cloverEnhanced) return;
    addBtn.dataset.cloverEnhanced = '1';

    const orderBtn = document.createElement('button');
    orderBtn.type = 'button';
    orderBtn.className = 'btn btn-primary';
    orderBtn.id = 'item-modal-clover-order';
    orderBtn.hidden = true;
    orderBtn.textContent = labels().btn;
    addBtn.before(orderBtn);
    bindClick(orderBtn);
  }

  function syncUi() {
    const live = isLive();
    document.body.classList.toggle('ordering-clover-live', live);
    document.body.classList.toggle('ordering-pickup-only', live && pickupOnly());

    document.querySelectorAll('[data-clover-order]').forEach(bindClick);

    const addBtn = document.getElementById('item-modal-add-cart');
    const cloverBtn = document.getElementById('item-modal-clover-order');
    if (addBtn) addBtn.hidden = live;
    if (cloverBtn) cloverBtn.hidden = !live;

    const pickupBtn = document.getElementById('clover-pickup-btn');
    if (pickupBtn) pickupBtn.hidden = !live;

    const heroBtn = document.getElementById('hero-clover-order');
    if (heroBtn) heroBtn.hidden = !live;

    const quickBtn = document.getElementById('quick-clover-order');
    if (quickBtn) quickBtn.hidden = !live;
  }

  function init() {
    if (!ordering().enabled || ordering().provider !== 'clover') return;

    injectMenuToolbarBtn();
    injectHeroBtn();
    injectMobileQuick();
    enhanceItemModal();
    syncUi();
  }

  window.CloverOrdering = {
    isLive,
    pickupOnly,
    storeUrl,
    open,
    close,
    labels,
    blocksNativeCart: () => isLive(),
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('elmirasol:lang-change', syncUi);
  window.addEventListener('elmirasol:menu-rendered', () => {
    enhanceItemModal();
    syncUi();
  });
})();