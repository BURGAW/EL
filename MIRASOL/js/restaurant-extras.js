/**
 * El Mirasol — The Side Order: gag widgets + useful restaurant shortcuts
 */
(function () {
  const TZ = 'America/New_York';
  const SAVED_KEY = 'elmirasol-saved-dishes-v1';
  const VISIT_KEY = 'elmirasol-visit-count';
  const TUESDAY_POPUP_KEY = 'elmirasol-tuesday-popup-v1';
  const isMenu = document.body.classList.contains('menu-page');
  const isHome = !isMenu;

  function nowLocal() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
  }

  function toast(msg, type) {
    if (window.FiestaAlive?.toast) {
      window.FiestaAlive.toast(msg, type);
      return;
    }
    let wrap = document.querySelector('.feat-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'feat-toast-wrap';
      wrap.setAttribute('aria-live', 'polite');
      document.body.appendChild(wrap);
    }
    const t = document.createElement('div');
    t.className = 'feat-toast' + (type ? ` feat-toast--${type}` : '');
    t.innerHTML = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 5000);
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadSaved() {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveSaved(list) {
    localStorage.setItem(SAVED_KEY, JSON.stringify(list));
    updateSavedFab();
  }

  function isSaved(key) {
    return loadSaved().some((x) => x.key === key);
  }

  function toggleSaved(entry) {
    if (!entry) return false;
    let list = loadSaved();
    const idx = list.findIndex((x) => x.key === entry.key);
    if (idx >= 0) {
      list.splice(idx, 1);
      saveSaved(list);
      toast('Removed from saved dishes');
      return false;
    }
    list.unshift({
      key: entry.key,
      name: entry.name,
      sectionId: entry.sectionId,
      savedAt: Date.now(),
    });
    list = list.slice(0, 12);
    saveSaved(list);
    toast(`Saved <strong>${escapeHtml(entry.name)}</strong> to your list`);
    return true;
  }

  function buildPhoneLine(item, modifierLines) {
    const mods = modifierLines?.length ? ` (${modifierLines.join(', ')})` : '';
    return `Hi, I'd like to order ${item.name}${mods} for pickup please.`;
  }

  /* ── Homepage: The Side Order widgets ── */
  function initSideOrder() {
    const root = document.getElementById('extras-side-order');
    if (!root) return;

    initLuckyTable(root);
    initDriveEta(root);
  }

  const LUCKY_TABLE_MIN = 6;
  const LUCKY_TABLE_MAX = 16;

  function rollLuckyTableNumber() {
    const span = LUCKY_TABLE_MAX - LUCKY_TABLE_MIN + 1;
    return LUCKY_TABLE_MIN + Math.floor(Math.random() * span);
  }

  function initLuckyTable(root) {
    const btn = root.querySelector('#extras-lucky-btn');
    const out = root.querySelector('#extras-lucky-result');
    if (!btn || !out) return;
    btn.addEventListener('click', () => {
      const num = rollLuckyTableNumber();
      const vibes = ['extra queso energy', 'prime fajita sizzle zone', 'margarita alignment', 'birria blessings', 'window booth luck'];
      const vibe = vibes[Math.floor(Math.random() * vibes.length)];
      out.innerHTML = `Table <strong>#${num}</strong> — ${escapeHtml(vibe)}. Tell the host you\'re feeling lucky.`;
    });
  }

  function initDriveEta(root) {
    root.querySelector('#extras-drive-btn')?.remove();
    root.querySelector('#extras-drive-result')?.remove();
  }

  /* Menu tip bar hidden — Tuesday closed uses its own popup only */
  function getMenuBarTip() {
    return { tip: '', closed: false, show: false };
  }

  function updateMenuBar() {
    if (!isMenu) return;
    const anchor = document.querySelector('.menu-online');
    if (!anchor) return;

    const view = window.MENU_VIEW || 'dinner';
    const { tip, closed, show } = getMenuBarTip(view);
    let bar = document.getElementById('menu-extras-bar');

    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'menu-extras-bar';
      bar.className = 'menu-extras-bar';
      bar.innerHTML = '<span></span>';
      const tabs = document.getElementById('menu-view-tabs');
      if (tabs?.parentNode) {
        tabs.parentNode.insertBefore(bar, tabs.nextSibling);
      } else {
        anchor.prepend(bar);
      }
    }

    const tipEl = bar.querySelector('span');
    if (tipEl) tipEl.innerHTML = tip;
    bar.classList.toggle('menu-extras-bar--closed', closed);
    bar.hidden = !show;
  }

  function initMenuBar() {
    updateMenuBar();
  }

  function tuesdayDateKey() {
    const d = nowLocal();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function isTuesdayLocal() {
    return nowLocal().getDay() === 2;
  }

  function shouldShowTuesdayPopup() {
    if (!isTuesdayLocal()) return false;
    try {
      return localStorage.getItem(TUESDAY_POPUP_KEY) !== tuesdayDateKey();
    } catch {
      return true;
    }
  }

  function markTuesdayPopupSeen() {
    try {
      localStorage.setItem(TUESDAY_POPUP_KEY, tuesdayDateKey());
    } catch { /* ignore */ }
  }

  function closeTuesdayPopup(modal) {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function openTuesdayPopup(modal) {
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.tuesday-closed-modal__close')?.focus();
  }

  function initTuesdayClosedPopup() {
    if (!shouldShowTuesdayPopup()) return;

    const brand = window.SITE_CONFIG?.brand || {};
    const locations = window.SITE_CONFIG?.map?.locations || [];
    const location = locations.find((loc) => loc.id === window.SITE_CONFIG?.map?.activeId) || locations[0] || {};
    const phone = brand.phone || '(910) 789-1154';
    const phoneTel = brand.phoneTel || '9107891154';
    const address = location.address || '211 U.S. Hwy 117 S, Burgaw, NC 28425';

    let modal = document.getElementById('tuesday-closed-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'tuesday-closed-modal';
      modal.className = 'tuesday-closed-modal';
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML =
        `<div class="tuesday-closed-modal__backdrop" data-tuesday-close tabindex="-1"></div>` +
        `<div class="tuesday-closed-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="tuesday-closed-title">` +
        `<button type="button" class="tuesday-closed-modal__close" data-tuesday-close aria-label="Close">&times;</button>` +
        `<p class="tuesday-closed-modal__emoji" aria-hidden="true">:(</p>` +
        `<h2 class="tuesday-closed-modal__title" id="tuesday-closed-title">We&rsquo;re closed on Tuesdays</h2>` +
        `<p class="tuesday-closed-modal__lead">Our kitchen takes Tuesdays off. You can still browse the menu &mdash; we reopen Wednesday at 8&nbsp;AM.</p>` +
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
        if (e.key === 'Escape' && !modal.hidden) {
          markTuesdayPopupSeen();
          closeTuesdayPopup(modal);
        }
      });
    }

    setTimeout(() => openTuesdayPopup(modal), 600);
  }

  /* ── Menu modal: bookmark + copy phone line ── */
  function enhanceItemModal() {
    if (!isMenu) return;
    const modal = document.getElementById('item-modal');
    if (!modal || modal.dataset.extrasBound) return;
    modal.dataset.extrasBound = '1';

    const dialog = modal.querySelector('.item-modal__dialog');
    const closeBtn = modal.querySelector('.item-modal__close');
    if (!dialog) return;

    const bookmark = document.createElement('button');
    bookmark.type = 'button';
    bookmark.className = 'item-modal__bookmark';
    bookmark.id = 'item-modal-bookmark';
    bookmark.setAttribute('aria-label', 'Save dish');
    bookmark.textContent = '☆';
    closeBtn?.before(bookmark);

    const actions = modal.querySelector('.item-modal__actions');
    if (actions) {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn btn-outline';
      copyBtn.id = 'item-modal-copy-phone';
      copyBtn.textContent = 'Copy phone order';
      actions.prepend(copyBtn);

      copyBtn.addEventListener('click', () => {
        const state = window.MenuOrder?.getModalState?.();
        if (!state?.key) return;
        const line = window.RestaurantExtras?.buildPhoneLineFromModal?.();
        if (!line) return;
        navigator.clipboard?.writeText(line).then(() => toast('Copied — paste when you call!'));
      });
    }

    bookmark.addEventListener('click', () => {
      const state = window.MenuOrder?.getModalState?.();
      if (!state?.key) return;
      const entry = window.RestaurantExtras?.getRegistryEntry?.(state.key);
      if (!entry) return;
      const on = toggleSaved({ key: state.key, name: entry.item.name, sectionId: entry.sectionId });
      bookmark.classList.toggle('is-saved', on);
      bookmark.textContent = on ? '★' : '☆';
    });

    window.addEventListener('elmirasol:menu-modal-open', (e) => {
      const key = e.detail?.key;
      if (!key) return;
      const saved = isSaved(key);
      bookmark.classList.toggle('is-saved', saved);
      bookmark.textContent = saved ? '★' : '☆';
    });
  }

  function getRegistryEntry(key) {
    return window.MenuOrder?.getEntry?.(key) || null;
  }

  function buildPhoneLineFromModal() {
    const state = window.MenuOrder?.getModalState?.();
    if (!state?.key) return '';
    const entry = getRegistryEntry(state.key);
    if (!entry) return '';
    const lines = window.MenuOrder?.getModifierLines?.(state.key, state.selections) || [];
    return buildPhoneLine(entry.item, lines);
  }

  /* ── Saved dishes FAB (menu) ── */
  function initSavedFab() {
    if (!isMenu) return;
    if (document.getElementById('extras-saved-fab')) return;

    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'extras-saved-fab';
    fab.id = 'extras-saved-fab';
    fab.hidden = true;
    fab.textContent = '★ Saved';

    const panel = document.createElement('div');
    panel.className = 'extras-saved-panel';
    panel.id = 'extras-saved-panel';
    panel.hidden = true;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    fab.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      if (open) renderSavedPanel();
    });

    document.addEventListener('click', (e) => {
      if (!panel.hidden && !e.target.closest('#extras-saved-fab, #extras-saved-panel')) {
        panel.hidden = true;
      }
    });

    updateSavedFab();
  }

  function updateSavedFab() {
    const fab = document.getElementById('extras-saved-fab');
    const list = loadSaved();
    if (fab) {
      fab.hidden = !isMenu || !list.length;
      fab.textContent = `★ Saved (${list.length})`;
    }
  }

  function renderSavedPanel() {
    const panel = document.getElementById('extras-saved-panel');
    if (!panel) return;
    const list = loadSaved();
    if (!list.length) {
      panel.hidden = true;
      return;
    }
    panel.innerHTML =
      `<h4>Your saved dishes</h4><ul>` +
      list.map((x) => `<li>${escapeHtml(x.name)}</li>`).join('') +
      `</ul><button type="button" class="menu-extras-chip" id="extras-clear-saved" style="margin-top:0.5rem">Clear all</button>`;
    document.getElementById('extras-clear-saved')?.addEventListener('click', () => {
      saveSaved([]);
      panel.hidden = true;
    });
  }

  /* ── Secret word listener (gag) ── */
  function initSecretWords() {
    const codes = {
      consome: '🍲 Consommé connoisseur detected. Extra dip cup incoming if you ask nicely.',
      birria: '🌮 Birria believer status: confirmed. The plancha respects you.',
      oaxaca: '🏔️ Oaxaca mode unlocked. Mole knowledge +10.',
      tuesday: () =>
        nowLocal().getDay() === 2
          ? '😴 Yes, we\'re closed. But you can still plan Wednesday\'s order.'
          : '📅 Tuesday is our day off — plan ahead!',
      margarita: '🍹 Bar team has been notified. (Not really. But order one anyway.)',
    };
    let buffer = '';
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select')) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-12);
      Object.keys(codes).forEach((word) => {
        if (buffer.endsWith(word)) {
          const msg = typeof codes[word] === 'function' ? codes[word]() : codes[word];
          toast(msg);
          buffer = '';
        }
      });
    });
  }

  function initFirstVisit() {}

  function init() {
    initSideOrder();
    initMenuBar();
    initTuesdayClosedPopup();
    enhanceItemModal();
    initSavedFab();
    initSecretWords();
    initFirstVisit();
  }

  window.RestaurantExtras = {
    getRegistryEntry,
    buildPhoneLineFromModal,
    toggleSaved,
    loadSaved,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('elmirasol:menu-rendered', () => {
    enhanceItemModal();
    updateMenuBar();
  });
})();