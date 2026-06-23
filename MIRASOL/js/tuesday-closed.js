/**
 * Tuesday closed notice — home + menu
 */
(function () {
  const TZ = 'America/New_York';
  const TUESDAY_POPUP_KEY = 'elmirasol-tuesday-v4';
  const isMenu = document.body.classList.contains('menu-page');

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
    if (!isTuesdayEastern()) return false;
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
    document.body.classList.remove('tuesday-modal-open');
    document.body.classList.remove('modal-open');
  }

  function openTuesdayPopup(modal) {
    if (!modal || modal.classList.contains('is-open')) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('tuesday-modal-open');
    document.body.classList.add('modal-open');
    modal.querySelector('.tuesday-closed-modal__close')?.focus({ preventScroll: true });
  }

  function buildTuesdayPopup() {
    const brand = window.SITE_CONFIG?.brand || {};
    const locations = window.SITE_CONFIG?.map?.locations || [];
    const location = locations.find((loc) => loc.id === window.SITE_CONFIG?.map?.activeId) || locations[0] || {};
    const phone = brand.phone || '(910) 789-1154';
    const phoneTel = brand.phoneTel || '9107891154';
    const address = location.address || '211 U.S. Hwy 117 S, Burgaw, NC 28425';
    const brandName = brand.name || 'MIRASOL';

    let modal = document.getElementById('tuesday-closed-modal');
    if (modal) return modal;

    const menuAction = isMenu
      ? `<button type="button" class="btn btn-outline tuesday-closed-modal__btn tuesday-closed-modal__btn--menu" data-tuesday-close>View menu</button>`
      : `<a href="menu.html" class="btn btn-outline tuesday-closed-modal__btn tuesday-closed-modal__btn--menu">View menu</a>`;

    modal = document.createElement('div');
    modal.id = 'tuesday-closed-modal';
    modal.className = 'tuesday-closed-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      `<div class="tuesday-closed-modal__backdrop" data-tuesday-close tabindex="-1"></div>` +
      `<div class="tuesday-closed-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="tuesday-closed-title">` +
      `<header class="tuesday-closed-modal__hero">` +
      `<button type="button" class="tuesday-closed-modal__close" data-tuesday-close aria-label="Close">&times;</button>` +
      `<span class="tuesday-closed-modal__badge">Closed today</span>` +
      `<p class="tuesday-closed-modal__brand">${escapeHtml(brandName)} · Burgaw</p>` +
      `<h2 class="tuesday-closed-modal__title" id="tuesday-closed-title">We&rsquo;re closed on Tuesdays</h2>` +
      `<p class="tuesday-closed-modal__tagline">Our weekly rest day for the team and kitchen.</p>` +
      `</header>` +
      `<div class="tuesday-closed-modal__body">` +
      `<p class="tuesday-closed-modal__lead">` +
      `${escapeHtml(brandName)} is closed every <strong>Tuesday</strong> so our family and staff can rest. ` +
      `We reopen <strong>Wednesday at 8&nbsp;AM</strong> with full service.</p>` +
      `<p class="tuesday-closed-modal__reopen">Opens tomorrow · 8:00&nbsp;AM</p>` +
      `<div class="tuesday-closed-modal__cards">` +
      `<article class="tuesday-closed-modal__card">` +
      `<p class="tuesday-closed-modal__card-label">Hours</p>` +
      `<p class="tuesday-closed-modal__card-text">Mon, Wed&ndash;Sun: 8&nbsp;AM &ndash; 9&nbsp;PM<br>` +
      `Fri &amp; Sat: until 9:30&nbsp;PM<br>` +
      `<span class="tuesday-closed-modal__closed-pill">Closed Tuesdays</span></p>` +
      `</article>` +
      `<article class="tuesday-closed-modal__card">` +
      `<p class="tuesday-closed-modal__card-label">Location</p>` +
      `<p class="tuesday-closed-modal__card-text">${escapeHtml(address)}<br>` +
      `<a href="tel:${escapeHtml(phoneTel)}">${escapeHtml(phone)}</a></p>` +
      `</article>` +
      `</div>` +
      `<p class="tuesday-closed-modal__note">You may still browse our menu online and plan your next visit.</p>` +
      `<div class="tuesday-closed-modal__actions">` +
      menuAction +
      `<button type="button" class="btn btn-primary tuesday-closed-modal__btn tuesday-closed-modal__btn--primary" data-tuesday-close>Understood</button>` +
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

  let openTimer = null;

  function scheduleTuesdayPopup() {
    if (!shouldShowTuesdayPopup()) return;
    const modal = buildTuesdayPopup();
    if (openTimer) window.clearTimeout(openTimer);
    openTimer = window.setTimeout(() => openTuesdayPopup(modal), 600);
  }

  function boot() {
    if (!isTuesdayEastern()) return;
    scheduleTuesdayPopup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener('load', () => {
    window.setTimeout(scheduleTuesdayPopup, 400);
  }, { once: true });
})();