/**
 * Corporate menu — category nav, ordering integration hooks.
 * Depends on: site-config.js, menu-data.js (or menu-data-es.js)
 */
(function () {
  const config = window.SITE_CONFIG || {};
  const ordering = config.ordering || {};

  function isEs() {
    return window.MENU_LANG === 'es' || document.documentElement.lang === 'es';
  }

  const orderBtnLabel = () => {
    if (ordering.provider === 'clover') {
      return isEs() ? 'Ordenar para recoger' : 'Order Pickup Online';
    }
    return isEs() ? 'Ordenar en línea' : 'Order Online';
  };

  function cloverStoreUrl() {
    return (ordering.clover?.storeUrl || ordering.orderUrl || '').trim();
  }

  function cloverLive() {
    return Boolean(
      ordering.enabled &&
      ordering.provider === 'clover' &&
      cloverStoreUrl()
    );
  }

  function orderingLive() {
    return Boolean(
      ordering.enabled &&
      (ordering.provider === 'native' || cloverLive() || ordering.orderUrl)
    );
  }

  function initOrdering() {
    const enabled = orderingLive();
    const cloverPending = ordering.enabled && ordering.provider === 'clover' && !cloverStoreUrl();
    document.body.classList.toggle('ordering-enabled', enabled);
    document.body.classList.toggle('ordering-clover-pending', cloverPending);

    const strips = document.querySelectorAll('[data-order-strip]');
    strips.forEach((strip) => {
      const btn = strip.querySelector('[data-order-btn]');
      const badge = strip.querySelector('[data-order-badge]');
      const title = strip.querySelector('[data-order-title]');
      const sub = strip.querySelector('[data-order-sub]');

      if (enabled) {
        strip.classList.add('is-live');
        strip.classList.remove('is-pending');
        if (badge) {
          badge.textContent = ordering.provider === 'clover'
            ? (isEs() ? 'Clover · Para llevar' : 'Clover · Pickup')
            : (isEs() ? 'Pedidos en línea' : 'Order Online');
        }
        if (title) title.textContent = isEs() ? 'Pida para recoger' : 'Order for Pickup';
        if (sub) {
          sub.textContent = ordering.provider === 'clover'
            ? (isEs()
              ? 'Pague en línea con Clover — recoja en el mostrador. Sin entregas.'
              : 'Pay online with Clover — pick up at the counter. No delivery.')
            : (isEs()
              ? 'Ordene directamente — pague en línea de forma segura.'
              : 'Order directly from our menu — pay securely online.');
        }
        if (btn) {
          btn.classList.add('is-live');
          btn.classList.remove('is-disabled');
          btn.removeAttribute('disabled');
          btn.textContent = orderBtnLabel();
          btn.removeAttribute('href');
          btn.removeAttribute('target');
          if (ordering.provider === 'native') {
            btn.setAttribute('href', '#order-cart');
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('elmirasol:open-cart'));
            });
          } else if (ordering.provider === 'clover' && cloverLive()) {
            btn.setAttribute('data-clover-order', '1');
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              window.CloverOrdering?.open?.();
            });
          } else if (ordering.orderUrl) {
            btn.setAttribute('href', ordering.orderUrl);
            btn.setAttribute('target', '_blank');
            btn.setAttribute('rel', 'noopener noreferrer');
          }
        }
      } else if (cloverPending) {
        strip.classList.add('is-pending');
        strip.classList.remove('is-live');
        if (badge) badge.textContent = isEs() ? 'Clover en camino' : 'Clover coming soon';
        if (title) title.textContent = isEs() ? 'Pronto: pedidos para recoger' : 'Pickup ordering — coming soon';
        if (sub) {
          sub.textContent = isEs()
            ? 'Estamos conectando Clover para pedidos en línea solo para recoger. Llame mientras tanto.'
            : (ordering.comingSoonSub || 'Connecting Clover for pickup-only online orders. Call ahead for now.');
        }
        if (btn) {
          btn.classList.add('is-disabled');
          btn.setAttribute('disabled', 'disabled');
          btn.textContent = orderBtnLabel();
        }
      } else {
        if (badge) badge.textContent = ordering.comingSoonLabel || (isEs() ? 'Próximamente' : 'Coming Soon');
        if (title) {
          title.textContent = isEs()
            ? 'Pronto: pedidos en línea'
            : 'Online Ordering — Coming Soon';
        }
        if (sub) {
          sub.textContent =
            ordering.comingSoonSub ||
            (isEs()
              ? 'Llame para ordenar para llevar. Estamos preparando pedidos en línea.'
              : 'Call ahead for takeout. We\'re setting up online ordering.');
        }
        if (btn) {
          btn.classList.add('is-disabled');
          btn.setAttribute('disabled', 'disabled');
          btn.textContent = orderBtnLabel();
        }
      }
    });

    if (enabled && ordering.provider === 'native') {
      document.querySelectorAll('.menu-item[data-sku]').forEach((item) => {
        if (item.dataset.customizable === 'true') return;
        item.querySelector('.menu-item__order')?.remove();
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'menu-item__order';
        btn.textContent = isEs() ? '+ Agregar' : '+ Add';
        btn.dataset.sku = item.dataset.sku;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.dispatchEvent(
            new CustomEvent('elmirasol:add-to-cart', {
              detail: {
                sku: item.dataset.sku,
                itemKey: item.dataset.itemKey,
                name: item.querySelector('.menu-card__name')?.textContent?.trim(),
                price: item.dataset.price,
              },
            })
          );
        });
        item.appendChild(btn);
      });
    }
  }

  let categoryNavObserver = null;

  function initCategoryNav() {
    const nav = document.getElementById('menu-cat-nav');
    if (!nav) return;

    if (categoryNavObserver) {
      categoryNavObserver.disconnect();
      categoryNavObserver = null;
    }

    const links = [...nav.querySelectorAll('a')];
    const sections = links
      .map((a) => {
        const id = a.getAttribute('href')?.slice(1);
        const el = id ? document.getElementById(id) : null;
        return el ? { link: a, el } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((a) => {
        const active = a.getAttribute('href') === `#${id}`;
        a.classList.toggle('is-active', active);
        if (active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };

    if ('IntersectionObserver' in window) {
      categoryNavObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target?.id) setActive(visible.target.id);
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
      );
      sections.forEach(({ el }) => categoryNavObserver.observe(el));
    }

    links.forEach((a) => a.classList.remove('is-active'));
    links[0]?.classList.add('is-active');
  }

  function boot() {
    initOrdering();
    initCategoryNav();
  }

  document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('elmirasol:lang-change', () => {
    initOrdering();
  });
  window.addEventListener('elmirasol:menu-rendered', () => {
    initCategoryNav();
    initOrdering();
  });
})();