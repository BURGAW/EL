/**
 * FIFA World Cup 2026 — promo strip, bunting & hero badge
 */
(function () {
  const FLAGS = {
    mx: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#006847" width="10" height="20"/><rect fill="#fff" x="10" width="10" height="20"/><rect fill="#CE1126" x="20" width="10" height="20"/><circle cx="15" cy="10" r="3.2" fill="#8B4513" opacity=".85"/></svg>',
    us: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#B22234" width="30" height="20"/><rect fill="#fff" y="1.54" width="30" height="1.54"/><rect fill="#fff" y="4.62" width="30" height="1.54"/><rect fill="#fff" y="7.69" width="30" height="1.54"/><rect fill="#fff" y="10.77" width="30" height="1.54"/><rect fill="#fff" y="13.85" width="30" height="1.54"/><rect fill="#fff" y="16.92" width="30" height="1.54"/><rect fill="#3C3B6E" width="12" height="10.77"/></svg>',
    ca: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#FF0000" width="8" height="20"/><rect fill="#fff" x="8" width="14" height="20"/><rect fill="#FF0000" x="22" width="8" height="20"/><path fill="#FF0000" d="M15 5.5l1.2 2.5 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z"/></svg>',
    br: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#009B3A" width="30" height="20"/><polygon fill="#FEDF00" points="15,2 26,10 15,18 4,10"/><circle cx="15" cy="10" r="4" fill="#002776"/></svg>',
    ar: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#74ACDF" width="30" height="6.67"/><rect fill="#fff" y="6.67" width="30" height="6.67"/><rect fill="#74ACDF" y="13.33" width="30" height="6.67"/><circle cx="15" cy="10" r="2.5" fill="#F6B40E"/></svg>',
    co: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#FCD116" width="30" height="10"/><rect fill="#003893" y="10" width="30" height="5"/><rect fill="#CE1126" y="15" width="30" height="5"/></svg>',
    es: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#AA151B" width="30" height="5"/><rect fill="#F1BF00" y="5" width="30" height="10"/><rect fill="#AA151B" y="15" width="30" height="5"/></svg>',
    fr: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#002395" width="10" height="20"/><rect fill="#fff" x="10" width="10" height="20"/><rect fill="#ED2939" x="20" width="10" height="20"/></svg>',
    de: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#000" width="30" height="6.67"/><rect fill="#DD0000" y="6.67" width="30" height="6.67"/><rect fill="#FFCE00" y="13.33" width="30" height="6.67"/></svg>',
  };

  const FLAG_NAMES = {
    mx: 'Mexico',
    us: 'United States',
    ca: 'Canada',
    br: 'Brazil',
    ar: 'Argentina',
    co: 'Colombia',
    es: 'Spain',
    fr: 'France',
    de: 'Germany',
  };

  function cfg() {
    return window.SITE_CONFIG?.worldCup || {};
  }

  function isEs() {
    return document.documentElement.lang === 'es' || window.MENU_LANG === 'es';
  }

  function copy() {
    const c = cfg();
    if (isEs()) {
      return {
        promo: c.promoEs || 'Copa Mundial 2026 — <strong>comida, margaritas y partidos</strong>',
        promoSub: c.promoSubEs || 'Anfitriones',
      };
    }
    return {
      promo: c.promo || 'World Cup 2026 — <strong>every match on our TVs</strong>',
      promoSub: c.promoSub || 'Host nations',
      ribbon: c.ribbonSpecial || 'World Cup 2026 — we\'ll keep the scores on screen',
      menuHint: c.menuHint || 'World Cup 2026 — catch the matches here',
    };
  }

  function ribbonCopy() {
    const c = cfg();
    if (isEs()) {
      return c.ribbonSpecialEs || 'Copa 2026 — llevamos el marcador en pantalla';
    }
    return copy().ribbon;
  }

  function menuHintCopy() {
    const c = cfg();
    if (isEs()) {
      return c.menuHintEs || 'Copa 2026 — partidos en nuestras pantallas';
    }
    return copy().menuHint;
  }

  function miniFlag(code) {
    const svg = FLAGS[code];
    if (!svg) return '';
    return `<span class="wc-mini-flag" title="${FLAG_NAMES[code] || code}">${svg}</span>`;
  }

  function menuHref() {
    return document.body.classList.contains('menu-page') ? '#menu' : 'menu.html';
  }

  function buildPromo() {
    if (document.body.classList.contains('menu-page')) return;
    if (document.getElementById('wc-promo')) return;
    const c = cfg();
    const hostFlags = (c.hostFlags || ['mx', 'us', 'ca']).map(miniFlag).join('');
    const text = copy();

    const el = document.createElement('div');
    el.id = 'wc-promo';
    el.className = 'wc-promo wc-promo--compact';
    el.setAttribute('role', 'note');
    el.innerHTML =
      `<span class="wc-promo__ball" aria-hidden="true">⚽</span>` +
      `<span class="wc-promo__text">${text.promo}</span>` +
      `<span class="wc-promo__hosts" aria-label="${text.promoSub}">${hostFlags}</span>`;

    const header = document.querySelector('.header');
    if (header) header.after(el);
  }

  function buildBunting() {
    if (!cfg().showBunting) return;
    if (document.getElementById('wc-bunting')) return;
    const codes = cfg().flags || ['mx', 'us', 'ca', 'br', 'ar', 'co', 'es', 'fr'];
    const items = codes
      .filter((code) => FLAGS[code])
      .map(
        (code) =>
          `<li class="wc-bunting__flag" title="${FLAG_NAMES[code] || code}">${FLAGS[code]}</li>`
      )
      .join('');

    const el = document.createElement('div');
    el.id = 'wc-bunting';
    el.className = 'wc-bunting';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<div class="wc-bunting__rope"></div><ul class="wc-bunting__flags">${items}</ul>`;

    const promo = document.getElementById('wc-promo');
    const anchor = promo || document.querySelector('.header');
    if (anchor) anchor.after(el);
  }

  function removeHeroPill() {
    document.querySelectorAll('.wc-hero-pill').forEach((el) => el.remove());
  }

  function enhanceRibbon() {
    const el = document.querySelector('[data-feat-special]');
    if (!ribbonCopy() || !el || el.dataset.wcDone) return;
    el.dataset.wcDone = '1';
    el.textContent = ribbonCopy();
    el.classList.add('wc-ribbon-special');
  }

  function buildMenuHint() {
    if (cfg().showMenuHint === false) return;
    if (!document.body.classList.contains('menu-page')) return;
    if (document.getElementById('wc-menu-hint')) return;
    const tabs = document.getElementById('menu-view-tabs');
    if (!tabs) return;

    const el = document.createElement('p');
    el.id = 'wc-menu-hint';
    el.className = 'wc-menu-hint';
    el.setAttribute('role', 'note');
    el.innerHTML =
      `<span class="wc-menu-hint__ball" aria-hidden="true">⚽</span>` +
      `<span>${menuHintCopy()}</span>`;

    tabs.after(el);
  }

  function refreshCopy() {
    const text = copy();
    const hostFlags = (cfg().hostFlags || ['mx', 'us', 'ca']).map(miniFlag).join('');

    const promo = document.getElementById('wc-promo');
    if (promo) {
      promo.innerHTML =
        `<span class="wc-promo__ball" aria-hidden="true">⚽</span>` +
        `<span class="wc-promo__text">${text.promo}</span>` +
        `<span class="wc-promo__hosts" aria-label="${text.promoSub}">${hostFlags}</span>`;
    }

    const ribbon = document.querySelector('[data-feat-special].wc-ribbon-special');
    if (ribbon) ribbon.textContent = ribbonCopy();

    const hint = document.getElementById('wc-menu-hint');
    if (hint) {
      hint.innerHTML =
        `<span class="wc-menu-hint__ball" aria-hidden="true">⚽</span>` +
        `<span>${menuHintCopy()}</span>`;
    }
  }

  function init() {
    const c = cfg();
    if (!c.enabled) return;
    document.body.classList.add('site-worldcup');
    buildPromo();
    buildBunting();
    removeHeroPill();
    enhanceRibbon();
    buildMenuHint();
  }

  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('elmirasol:lang-change', refreshCopy);
})();