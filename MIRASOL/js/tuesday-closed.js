/**
 * Tuesday closed notice ΓÇö home + menu
 */
(function () {
  const TZ = 'America/New_York';
  const MODAL_VERSION = '27';
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

  function openTuesdayPopup(modal) {
    if (!modal || modal.classList.contains('is-open')) return;
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
      `<div class="tuesday-closed-modal__shell">` +
      `<span class="tuesday-closed-modal__selvedge tuesday-closed-modal__selvedge--left" aria-hidden="true"></span>` +
      `<span class="tuesday-closed-modal__selvedge tuesday-closed-modal__selvedge--right" aria-hidden="true"></span>` +
      `<div class="tuesday-closed-modal__craft-top" aria-hidden="true">` +
      `<div class="tuesday-closed-modal__craft-top__shine"></div>` +
      `<div class="tuesday-closed-modal__craft-top__band"></div>` +
      `</div>` +
      `<header class="tuesday-closed-modal__hero">` +
      `<div class="tuesday-closed-modal__logo-stage" aria-hidden="true">` +
      `<div class="tuesday-closed-modal__logo-halo">` +
      `<div class="tuesday-closed-modal__logo-frame">` +
      `<img src="${escapeHtml(logo)}" alt="${escapeHtml(brandName)}" class="tuesday-closed-modal__logo" width="86" height="50">` +
      `</div></div></div>` +
      `<p class="tuesday-closed-modal__eyebrow">` +
      `<span class="tuesday-closed-modal__eyebrow-dot" aria-hidden="true"></span>Tuesday` +
      `<span class="tuesday-closed-modal__eyebrow-dot" aria-hidden="true"></span>` +
      `</p>` +
      `<h2 class="tuesday-closed-modal__title" id="tuesday-closed-title">We&rsquo;re closed <em>today</em></h2>` +
      `<p class="tuesday-closed-modal__subtitle">Weekly rest day</p>` +
      `</header>` +
      `<div class="tuesday-closed-modal__divider" aria-hidden="true">` +
      `<span class="tuesday-closed-modal__divider-star"></span>` +
      `</div>` +
      `<div class="tuesday-closed-modal__body">` +
      `<p class="tuesday-closed-modal__lead">The kitchen rests on Tuesdays. We&rsquo;ll be ready for you Wednesday.</p>` +
      `<div class="tuesday-closed-modal__reopen">` +
      `<span class="tuesday-closed-modal__reopen-label">We reopen</span>` +
      `<p class="tuesday-closed-modal__reopen-time"><span>Wednesday</span> &middot; 8&nbsp;AM</p>` +
      `<p class="tuesday-closed-modal__reopen-note">Doors open for pickup &amp; dine-in</p>` +
      `</div>` +
      `<div class="tuesday-closed-modal__details">` +
      `<div class="tuesday-closed-modal__details-head">` +
      `<span class="tuesday-closed-modal__details-title">Visit us</span>` +
      `</div>` +
      `<div class="tuesday-closed-modal__detail-row">` +
      `<span class="tuesday-closed-modal__detail-label">Hours</span>` +
      `<p class="tuesday-closed-modal__detail-value">Mon, Wed&ndash;Sun 8&ndash;9&nbsp;PM<br>Fri &amp; Sat until 9:30&nbsp;PM</p>` +
      `</div>` +
      `<div class="tuesday-closed-modal__detail-row">` +
      `<span class="tuesday-closed-modal__detail-label">Place</span>` +
      `<p class="tuesday-closed-modal__detail-value">${escapeHtml(address)}</p>` +
      `</div>` +
      `<div class="tuesday-closed-modal__detail-row">` +
      `<span class="tuesday-closed-modal__detail-label">Call</span>` +
      `<p class="tuesday-closed-modal__detail-value">` +
      `<a class="tuesday-closed-modal__info-link" href="tel:${escapeHtml(phoneTel)}">${escapeHtml(phone)}</a>` +
      `</p></div></div>` +
      `<p class="tuesday-closed-modal__footnote">Closed every Tuesday &middot; Eastern time</p>` +
      `<div class="tuesday-closed-modal__actions">` +
      `<button type="button" class="btn btn-primary tuesday-closed-modal__btn tuesday-closed-modal__btn--primary" data-tuesday-close>Got it</button>` +
      `</div></div>` +
      `<div class="tuesday-closed-modal__craft-foot" aria-hidden="true">` +
      `<div class="tuesday-closed-modal__craft-foot__band"></div>` +
      `<div class="tuesday-closed-modal__craft-foot__shine"></div>` +
      `</div></div></div>`;
    document.body.appendChild(modal);

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
