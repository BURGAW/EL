/**
 * Tuesday closed notice ΓÇö home + menu
 */
(function () {
  const TZ = 'America/New_York';
  const MODAL_VERSION = '34';
  const TUESDAY_POPUP_KEY = `elmirasol-tuesday-v${MODAL_VERSION}`;
  function isPreviewMode() {
    try {
      return /[?&]tuesday(=1)?(?=&|$)/i.test(window.location.search);
    } catch {
      return false;
    }
  }

  function easternWeekday() {
    return new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' }).format(new Date());
  }

  function easternDateKey() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value || '';
    return `${get('year')}-${get('month')}-${get('day')}`;
  }

  function isTuesdayEastern() {
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
    if (isPreviewMode()) return true;
    if (!isTuesdayEastern()) return false;
    try {
      return localStorage.getItem(TUESDAY_POPUP_KEY) !== easternDateKey();
    } catch {
      return true;
    }
  }

  function markTuesdayPopupSeen() {
    if (isPreviewMode()) return;
    try {
      localStorage.setItem(TUESDAY_POPUP_KEY, easternDateKey());
    } catch { /* ignore */ }
  }

  function closeTuesdayPopup(modal) {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('tuesday-modal-open');
    document.body.classList.remove('modal-open');
  }

  function syncViewportMode(modal) {
    if (!modal) return;
    const desktop = window.matchMedia('(min-width: 769px)').matches;
    modal.dataset.viewport = desktop ? 'desktop' : 'mobile';
  }

  function openTuesdayPopup(modal) {
    if (!modal || modal.classList.contains('is-open')) return;
    syncViewportMode(modal);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('tuesday-modal-open');
    document.body.classList.add('modal-open');
    modal.querySelector('.tuesday-closed-modal__btn--primary')?.focus({ preventScroll: true });
  }

  function buildTuesdayPopup() {
    const brand = window.SITE_CONFIG?.brand || {};
    const locations = window.SITE_CONFIG?.map?.locations || [];
    const location = locations.find((loc) => loc.id === window.SITE_CONFIG?.map?.activeId) || locations[0] || {};
    const phone = brand.phone || '(910) 789-1154';
    const phoneTel = brand.phoneTel || '9107891154';
    const address = location.address || '211 U.S. Hwy 117 S, Burgaw, NC 28425';
    const logo = brand.logo || 'assets/images/facebook/logo.jpg?v=brand1';
    const brandName = brand.name || 'MIRASOL';

    let modal = document.getElementById('tuesday-closed-modal');
    if (modal && modal.dataset.version === MODAL_VERSION) return modal;
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'tuesday-closed-modal';
    modal.className = 'tuesday-closed-modal';
    modal.dataset.version = MODAL_VERSION;
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      `<div class="tuesday-closed-modal__backdrop" tabindex="-1" aria-hidden="true"></div>` +
      `<div class="tuesday-closed-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="tuesday-closed-title">` +
      `<span class="tuesday-closed-modal__jewel tuesday-closed-modal__jewel--tl" aria-hidden="true"></span>` +
      `<span class="tuesday-closed-modal__jewel tuesday-closed-modal__jewel--tr" aria-hidden="true"></span>` +
      `<span class="tuesday-closed-modal__jewel tuesday-closed-modal__jewel--bl" aria-hidden="true"></span>` +
      `<span class="tuesday-closed-modal__jewel tuesday-closed-modal__jewel--br" aria-hidden="true"></span>` +
      `<div class="tuesday-closed-modal__shell">` +
      `<span class="tuesday-closed-modal__selvedge tuesday-closed-modal__selvedge--left" aria-hidden="true"></span>` +
      `<span class="tuesday-closed-modal__selvedge tuesday-closed-modal__selvedge--right" aria-hidden="true"></span>` +
      `<div class="tuesday-closed-modal__craft-top" aria-hidden="true">` +
      `<div class="tuesday-closed-modal__craft-top__shine"></div>` +
      `<div class="tuesday-closed-modal__craft-top__zigzag"></div>` +
      `<div class="tuesday-closed-modal__craft-top__band"></div>` +
      `</div>` +
      `<header class="tuesday-closed-modal__hero">` +
      `<div class="tuesday-closed-modal__logo-stage" aria-hidden="true">` +
      `<div class="tuesday-closed-modal__logo-halo">` +
      `<div class="tuesday-closed-modal__logo-frame">` +
      `<img src="${escapeHtml(logo)}" alt="${escapeHtml(brandName)}" class="tuesday-closed-modal__logo" width="128" height="75">` +
      `</div></div></div>` +
      `<p class="tuesday-closed-modal__eyebrow">` +
      `<span class="tuesday-closed-modal__eyebrow-dot" aria-hidden="true"></span>Tuesday` +
      `<span class="tuesday-closed-modal__eyebrow-dot" aria-hidden="true"></span>` +
      `</p>` +
      `<h2 class="tuesday-closed-modal__title" id="tuesday-closed-title">We&rsquo;re closed <em>today</em></h2>` +
      `</header>` +
      `<div class="tuesday-closed-modal__divider" aria-hidden="true">` +
      `<span class="tuesday-closed-modal__divider-sun"></span>` +
      `</div>` +
      `<div class="tuesday-closed-modal__body">` +
      `<p class="tuesday-closed-modal__reopen-pill">Back <span>Wednesday</span> &middot; 8&nbsp;AM</p>` +
      `<div class="tuesday-closed-modal__details">` +
      `<p class="tuesday-closed-modal__detail-line">Mon, Wed&ndash;Thu &amp; Sun 8&ndash;9&nbsp;PM &middot; Fri&ndash;Sat 9:30</p>` +
      `<p class="tuesday-closed-modal__detail-line">${escapeHtml(address)}</p>` +
      `<p class="tuesday-closed-modal__detail-line">` +
      `<a class="tuesday-closed-modal__info-link" href="tel:${escapeHtml(phoneTel)}">${escapeHtml(phone)}</a>` +
      `</p></div>` +
      `<div class="tuesday-closed-modal__actions">` +
      `<button type="button" class="btn btn-primary tuesday-closed-modal__btn tuesday-closed-modal__btn--primary" data-tuesday-close>Got it</button>` +
      `</div></div>` +
      `<div class="tuesday-closed-modal__craft-foot" aria-hidden="true">` +
      `<div class="tuesday-closed-modal__craft-foot__band"></div>` +
      `<div class="tuesday-closed-modal__craft-foot__zigzag"></div>` +
      `<div class="tuesday-closed-modal__craft-foot__shine"></div>` +
      `</div></div></div>`;
    document.body.appendChild(modal);
    syncViewportMode(modal);

    if (!window.__tuesdayViewportBound) {
      window.__tuesdayViewportBound = true;
      window.addEventListener('resize', () => {
        syncViewportMode(document.getElementById('tuesday-closed-modal'));
      }, { passive: true });
    }

    modal.querySelectorAll('[data-tuesday-close]').forEach((el) => {
      el.addEventListener('click', () => {
        markTuesdayPopupSeen();
        closeTuesdayPopup(modal);
      });
    });

    return modal;
  }

  let openTimer = null;

  function scheduleTuesdayPopup() {
    if (!shouldShowTuesdayPopup()) return;
    const modal = buildTuesdayPopup();
    if (openTimer) window.clearTimeout(openTimer);
    openTimer = window.setTimeout(() => openTuesdayPopup(modal), 600);
  }

  function initTuesdayPopup() {
    scheduleTuesdayPopup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTuesdayPopup, { once: true });
  } else {
    initTuesdayPopup();
  }

  window.addEventListener('load', () => {
    window.setTimeout(scheduleTuesdayPopup, 500);
  }, { once: true });
})();
