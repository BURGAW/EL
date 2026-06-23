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
      `<button type="button" class="tuesday-closed-modal__close" data-tuesday-close aria-label="Close">&times;</button>` +
      `<p class="tuesday-closed-modal__emoji" aria-hidden="true">:(</p>` +
      `<h2 class="tuesday-closed-modal__title" id="tuesday-closed-title">We&rsquo;re closed on Tuesdays</h2>` +
      `<p class="tuesday-closed-modal__lead">Our kitchen takes Tuesdays off. We reopen Wednesday at 8&nbsp;AM.</p>` +
      `<div class="tuesday-closed-modal__details">` +
      `<h3 class="tuesday-closed-modal__label">Hours</h3>` +
      `<p class="tuesday-closed-modal__text">Mon, Wed&ndash;Sun: 8&nbsp;AM &ndash; 9&nbsp;PM<br>Fri &amp; Sat: until 9:30&nbsp;PM<br><strong>Closed Tuesday</strong></p>` +
      `<h3 class="tuesday-closed-modal__label">Address</h3>` +
      `<p class="tuesday-closed-modal__text">${escapeHtml(address)}</p>` +
      `<p class="tuesday-closed-modal__text"><a href="tel:${escapeHtml(phoneTel)}">${escapeHtml(phone)}</a></p>` +
      `</div>` +
      `<button type="button" class="btn btn-primary tuesday-closed-modal__btn" data-tuesday-close>Got it</button>` +
      `</div>`;
    document.body.appendChild(modal);

    modal.querySelectorAll('[data-tuesday-close]').forEach((el) => {
      el.addEventListener('click', () => {
        markTuesdayPopupSeen();
        closeTuesdayPopup(modal);
      });
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