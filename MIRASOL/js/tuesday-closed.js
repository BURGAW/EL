/**
 * Tuesday closed notice — home page only
 */
(function () {
  if (document.body.classList.contains('menu-page')) return;

  const TZ = 'America/New_York';
  const TUESDAY_POPUP_KEY = 'elmirasol-tuesday-home-v2';

  function easternNow() {
    return new Date();
  }

  function easternWeekday() {
    return new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' }).format(easternNow());
  }

  function easternDateKey() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(easternNow());
    const get = (type) => parts.find((p) => p.type === type)?.value || '';
    return `${get('year')}-${get('month')}-${get('day')}`;
  }

  function isTuesdayLocal() {
    return easternWeekday() === 'Tue';
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function shouldShowTuesdayPopup() {
    if (!isTuesdayLocal()) return false;
    try {
      return localStorage.getItem(TUESDAY_POPUP_KEY) !== easternDateKey();
    } catch {
      return true;
    }
  }

  function markTuesdayPopupSeen() {
    try {
      localStorage.setItem(TUESDAY_POPUP_KEY, easternDateKey());
    } catch { /* ignore */ }
  }

  function closeTuesdayPopup(modal) {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function openTuesdayPopup(modal) {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.tuesday-closed-modal__close')?.focus();
  }

  function buildTuesdayPopup() {
    const brand = window.SITE_CONFIG?.brand || {};
    const locations = window.SITE_CONFIG?.map?.locations || [];
    const location = locations.find((loc) => loc.id === window.SITE_CONFIG?.map?.activeId) || locations[0] || {};
    const phone = brand.phone || '(910) 789-1154';
    const phoneTel = brand.phoneTel || '9107891154';
    const address = location.address || '211 U.S. Hwy 117 S, Burgaw, NC 28425';

    let modal = document.getElementById('tuesday-closed-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'tuesday-closed-modal';
    modal.className = 'tuesday-closed-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      `<div class="tuesday-closed-modal__backdrop" data-tuesday-close tabindex="-1"></div>` +
      `<div class="tuesday-closed-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="tuesday-closed-title">` +
      `<header class="tuesday-closed-modal__hero">` +
      `<div class="tuesday-closed-modal__floaters" aria-hidden="true">` +
      `<span class="tuesday-closed-modal__floater tuesday-closed-modal__floater--1">✨</span>` +
      `<span class="tuesday-closed-modal__floater tuesday-closed-modal__floater--2">🌙</span>` +
      `<span class="tuesday-closed-modal__floater tuesday-closed-modal__floater--3">⭐</span>` +
      `<span class="tuesday-closed-modal__floater tuesday-closed-modal__floater--4">🍹</span>` +
      `<span class="tuesday-closed-modal__floater tuesday-closed-modal__floater--5">💤</span>` +
      `</div>` +
      `<button type="button" class="tuesday-closed-modal__close" data-tuesday-close aria-label="Close">&times;</button>` +
      `<span class="tuesday-closed-modal__badge">` +
      `<span class="tuesday-closed-modal__badge-dot" aria-hidden="true"></span>` +
      `Kitchen day off` +
      `</span>` +
      `<div class="tuesday-closed-modal__emoji-stage" aria-hidden="true">` +
      `<span class="tuesday-closed-modal__zzz">z z z</span>` +
      `<span class="tuesday-closed-modal__emoji">😴</span>` +
      `<span class="tuesday-closed-modal__emoji-alt">🌮</span>` +
      `</div>` +
      `<h2 class="tuesday-closed-modal__title" id="tuesday-closed-title">Taco Tuesday? Not today, amigo.</h2>` +
      `<p class="tuesday-closed-modal__tagline">Even the tortillas are napping.</p>` +
      `</header>` +
      `<div class="tuesday-closed-modal__body">` +
      `<p class="tuesday-closed-modal__lead">Our family takes every <strong>Tuesday</strong> to recharge the griddle ` +
      `and refill the salsa bowls. We&rsquo;ll be back <strong>Wednesday at 8&nbsp;AM</strong> with hot plates and cold margaritas.</p>` +
      `<p class="tuesday-closed-modal__countdown">` +
      `<span class="tuesday-closed-modal__countdown-icon" aria-hidden="true">🔥</span>` +
      `Doors swing open tomorrow morning` +
      `</p>` +
      `<div class="tuesday-closed-modal__cards">` +
      `<article class="tuesday-closed-modal__card">` +
      `<span class="tuesday-closed-modal__card-icon" aria-hidden="true">🕐</span>` +
      `<div>` +
      `<p class="tuesday-closed-modal__card-label">When we&rsquo;re open</p>` +
      `<p class="tuesday-closed-modal__card-text">Mon, Wed&ndash;Sun: 8&nbsp;AM &ndash; 9&nbsp;PM<br>` +
      `Fri &amp; Sat: until 9:30&nbsp;PM<br>` +
      `<span class="tuesday-closed-modal__closed-pill">` +
      `<span aria-hidden="true">🚪</span> Closed every Tuesday` +
      `</span></p>` +
      `</div></article>` +
      `<article class="tuesday-closed-modal__card">` +
      `<span class="tuesday-closed-modal__card-icon" aria-hidden="true">📍</span>` +
      `<div>` +
      `<p class="tuesday-closed-modal__card-label">Find us in Burgaw</p>` +
      `<p class="tuesday-closed-modal__card-text">${escapeHtml(address)}<br>` +
      `<a href="tel:${escapeHtml(phoneTel)}">${escapeHtml(phone)}</a></p>` +
      `</div></article>` +
      `</div>` +
      `<p class="tuesday-closed-modal__fun-fact">` +
      `Pro tip: peek the menu now, dream about birria, place your order Wednesday. 🌶️` +
      `</p>` +
      `<div class="tuesday-closed-modal__actions">` +
      `<a href="menu.html" class="btn btn-outline tuesday-closed-modal__btn tuesday-closed-modal__btn--menu">Browse the menu anyway</a>` +
      `<button type="button" class="btn btn-primary tuesday-closed-modal__btn tuesday-closed-modal__btn--primary" data-tuesday-close>See you Wednesday! 👋</button>` +
      `</div></div></div>`;
    document.body.appendChild(modal);

    modal.querySelectorAll('[data-tuesday-close]').forEach((el) => {
      el.addEventListener('click', () => {
        markTuesdayPopupSeen();
        closeTuesdayPopup(modal);
      });
    });

    modal.querySelector('.tuesday-closed-modal__btn--menu')?.addEventListener('click', () => {
      markTuesdayPopupSeen();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        markTuesdayPopupSeen();
        closeTuesdayPopup(modal);
      }
    });

    return modal;
  }

  function initTuesdayClosedPopup() {
    if (!shouldShowTuesdayPopup()) return;
    const modal = buildTuesdayPopup();
    window.setTimeout(() => openTuesdayPopup(modal), 800);
  }

  function boot() {
    initTuesdayClosedPopup();
  }

  if (document.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot, { once: true });
  }
})();