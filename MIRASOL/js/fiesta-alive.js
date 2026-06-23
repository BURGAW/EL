/**
 * El Mirasol — Fiesta Alive
 * Festive visuals + marketing psychology (social proof, urgency, gamification, personalization)
 * Grounded in: peer influence, scarcity/urgency, interactive menus, loyalty gamification.
 */
(function () {
  const TZ = 'America/New_York';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isHome = !document.body.classList.contains('menu-page');

  const ROULETTE_DISHES = [
    { name: 'Birria Tacos', desc: 'Corn tortillas with birria beef, mozzarella, rice, and consommé.', tag: 'Signature' },
    { name: 'Chicken Birria Tacos', desc: 'Corn tortillas with birria chicken, mozzarella, rice, and consommé.', tag: 'Birria' },
    { name: 'Tacos Campechanos', desc: 'Soft corn tacos with steak, chorizo, onion, cilantro, rice, and beans.', tag: 'Tacos' },
    { name: 'Tacos Dorados', desc: 'Rolled fried tacos with chicken, crema, cheese, lettuce, pico, and rice.', tag: 'Tacos' },
    { name: 'Shrimp Tacos', desc: 'Soft corn tacos with grilled shrimp, onion, and cilantro.', tag: 'Seafood' },
    { name: 'Quesadilla de Birria', desc: 'Birria beef and mozzarella with extra broth, rice, cilantro, onions, and limes.', tag: 'Birria' },
    { name: 'Campechanas Fajitas', desc: 'Chicken, steak, shrimp, and chorizo with grilled onions and peppers.', tag: 'Fajitas' },
    { name: 'Burrito Campechano', desc: 'Steak and chorizo with mozzarella, rice, and beans.', tag: 'Burrito' },
    { name: 'California Burrito', desc: 'Flour tortilla with meat, cheese, beans, and rice.', tag: 'Burrito' },
    { name: 'Choripollo Burrito', desc: 'Chicken and chorizo with mozzarella, rice, and beans.', tag: 'Burrito' },
    { name: 'Shrimp Burrito', desc: 'Shrimp, mozzarella, rice, and beans, covered in queso sauce.', tag: 'Seafood' },
    { name: 'Burrito Mummia', desc: 'Steak and shrimp in a flour tortilla, wrapped in bacon, fried, with queso and chipotle.', tag: 'Burrito' },
    { name: 'Chimichanga Meal', desc: 'Fried flour tortilla with meat, mozzarella, and queso sauce.', tag: 'Chimichanga' },
    { name: 'Shrimp Chimichanga', desc: 'Fried flour tortilla with shrimp, mozzarella, and queso sauce.', tag: 'Seafood' },
    { name: 'Enchiladas', desc: 'Corn tortillas with your choice of meat, poblano salsa, sour cream, and cheese.', tag: 'Enchiladas' },
    { name: 'Enchiladas Campechanas', desc: 'Enchiladas with steak, chorizo, poblano salsa, sour cream, and cheese.', tag: 'Enchiladas' },
    { name: 'Queso Enchiladas', desc: 'Enchiladas with queso sauce, sour cream, and cheese.', tag: 'Enchiladas' },
    { name: 'Torta', desc: 'Large sandwich with meat, mozzarella, lettuce, cheese, avocado, and mayo.', tag: 'Torta' },
    { name: 'Torta Cubana', desc: 'Steak, ham, chorizo, fried egg, cheese, lettuce, tomato, avocado, and mayo.', tag: 'Torta' },
    { name: 'Fried Chicken Torta', desc: 'Fried chicken with mozzarella, lettuce, cheese, avocado, and mayo.', tag: 'Torta' },
    { name: 'Huarache', desc: 'Steak with grilled onions and peppers.', tag: 'Platter' },
    { name: 'Gorditas', desc: 'Steak and chorizo with mozzarella, rice, and beans.', tag: 'Antojitos' },
    { name: 'Empanadas', desc: 'Fried corn empanadas filled with chicken or cheese.', tag: 'Antojitos' },
    { name: "Davey's Special", desc: 'Grilled chicken and chorizo with queso sauce, rice, and tortillas.', tag: 'Platter' },
    { name: 'Parrillada', desc: 'Chicken, longaniza, and asada with rice, beans, pico, and guacamole.', tag: 'Platter' },
    { name: 'Oaxaqueño', desc: 'Steak, shrimp, cactus, cheese, onions, rice, beans, lettuce, and pico.', tag: 'Signature' },
    { name: 'Mojarra Frita', desc: 'Fried tilapia with rice, beans, lettuce, and pico.', tag: 'Seafood' },
    { name: 'Chile Relleno', desc: 'Poblano pepper stuffed with ground beef and mozzarella, with rice and beans.', tag: 'Platter' },
    { name: 'Mar y Tierra', desc: 'Steak, shrimp, and chicken with rice, beans, and tortillas.', tag: 'Platter' },
    { name: 'Molcajete', desc: 'Steak, chicken, sausage, cactus, cheese, and green salsa, served in a stone bowl.', tag: 'Popular' },
    { name: 'Cazuelón', desc: 'Steak, chicken, and chorizo with rice, beans, queso sauce, and pico.', tag: 'Platter' },
    { name: 'Tlayuda', desc: 'Large tostada with beans, steak, chorizo, and queso Oaxaqueño.', tag: 'Platter' },
    { name: 'Fried Steak', desc: 'Fried steak with onions, rice, beans, lettuce, pico, and tortillas.', tag: 'Platter' },
    { name: 'Grilled or Fried Chicken', desc: 'Grilled or fried chicken with onions, rice, beans, lettuce, pico, and tortillas.', tag: 'Platter' },
    { name: 'Camarones Empanizados', desc: 'Breaded shrimp with rice, beans, lettuce, pico, and tortillas.', tag: 'Seafood' },
    { name: 'Coctel de Camarones', desc: 'Shrimp, calamari, pico, avocado, and cucumber in michelada salsa.', tag: 'Seafood' },
  ];

  const ROULETTE_BAG_KEY = 'elmirasol-roulette-bag-v36';
  const ROULETTE_LAST_KEY = 'elmirasol-roulette-last-v36';
  const ROULETTE_SPINS_KEY = 'elmirasol-roulette-spins-v36';

  function secureRandom() {
    if (window.crypto?.getRandomValues) {
      const buf = new Uint32Array(1);
      window.crypto.getRandomValues(buf);
      return buf[0] / 0x100000000;
    }
    return Math.random();
  }

  function shuffleIndices(count) {
    const arr = Array.from({ length: count }, (_, i) => i);
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(secureRandom() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function sanitizeBag(bag) {
    if (!Array.isArray(bag)) return [];
    const max = ROULETTE_DISHES.length;
    const seen = new Set();
    const clean = [];
    bag.forEach((n) => {
      const i = parseInt(n, 10);
      if (Number.isFinite(i) && i >= 0 && i < max && !seen.has(i)) {
        seen.add(i);
        clean.push(i);
      }
    });
    return clean;
  }

  function loadRouletteBag() {
    try {
      const raw = sessionStorage.getItem(ROULETTE_BAG_KEY);
      if (raw) {
        const bag = sanitizeBag(JSON.parse(raw));
        if (bag.length) return bag;
      }
    } catch (_) { /* ignore */ }
    const fresh = shuffleIndices(ROULETTE_DISHES.length);
    try { sessionStorage.setItem(ROULETTE_BAG_KEY, JSON.stringify(fresh)); } catch (_) { /* ignore */ }
    return fresh;
  }

  function saveRouletteBag(bag) {
    try { sessionStorage.setItem(ROULETTE_BAG_KEY, JSON.stringify(bag)); } catch (_) { /* ignore */ }
  }

  function pickRouletteDish() {
    let bag = loadRouletteBag();
    if (!bag.length) {
      bag = shuffleIndices(ROULETTE_DISHES.length);
    }

    let dishIdx = bag.pop();
    const lastName = sessionStorage.getItem(ROULETTE_LAST_KEY);

    if (lastName && ROULETTE_DISHES[dishIdx]?.name === lastName && bag.length) {
      const alt = bag.findIndex((i) => ROULETTE_DISHES[i]?.name !== lastName);
      if (alt !== -1) {
        const swap = bag[alt];
        bag[alt] = dishIdx;
        dishIdx = swap;
      }
    }

    const untilReset = bag.length;

    if (!bag.length) {
      bag = shuffleIndices(ROULETTE_DISHES.length);
      if (ROULETTE_DISHES[bag[bag.length - 1]]?.name === ROULETTE_DISHES[dishIdx]?.name) {
        bag = shuffleIndices(ROULETTE_DISHES.length);
      }
    }

    saveRouletteBag(bag);
    if (!Number.isFinite(dishIdx) || dishIdx < 0 || dishIdx >= ROULETTE_DISHES.length) {
      dishIdx = Math.floor(secureRandom() * ROULETTE_DISHES.length);
    }
    const pick = ROULETTE_DISHES[dishIdx];
    try { sessionStorage.setItem(ROULETTE_LAST_KEY, pick.name); } catch (_) { /* ignore */ }

    let spins = parseInt(sessionStorage.getItem(ROULETTE_SPINS_KEY) || '0', 10);
    if (!Number.isFinite(spins)) spins = 0;
    spins++;
    try { sessionStorage.setItem(ROULETTE_SPINS_KEY, String(spins)); } catch (_) { /* ignore */ }

    return { pick, spins, untilReset };
  }

  const WELCOME_KEY = 'elmirasol-fiesta-welcome';

  function nowLocal() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
  }

  function toast(msg, type) {
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

  /* ── Ambient gold dust (hero + top of page) ── */
  function initGoldDust() {
    if (!isHome || reducedMotion || document.body.classList.contains('site-coastal') || document.body.classList.contains('site-clase-azul') || document.body.classList.contains('site-oaxaca')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'fiesta-gold-dust';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    const particles = [];
    const MAX = isMobile ? 18 : 32;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = Math.min(window.innerHeight, isHome ? 520 : 320);
      canvas.style.height = h + 'px';
    }

    function seed() {
      particles.length = 0;
      for (let i = 0; i < MAX; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.2 + 0.6,
          vy: Math.random() * 0.35 + 0.12,
          vx: (Math.random() - 0.5) * 0.25,
          phase: Math.random() * Math.PI * 2,
          hue: Math.random() > 0.25 ? 43 : 38,
        });
      }
    }

    let running = true;
    let rafId = 0;

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.phase + performance.now() * 0.001) * 0.15;
        p.phase += 0.02;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        const alpha = 0.25 + Math.sin(p.phase) * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const sat = p.hue < 10 ? 85 : 92;
        const lit = p.hue < 10 ? 55 : 58;
        ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${lit}%, ${alpha})`;
        ctx.fill();
        if (p.r > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(50, 100%, 85%, ${alpha * 0.8})`;
          ctx.fill();
        }
      });
      rafId = requestAnimationFrame(frame);
    }

    resize();
    seed();
    window.addEventListener('resize', () => { resize(); seed(); }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else {
        running = true;
        if (!rafId) rafId = requestAnimationFrame(frame);
      }
    });
    rafId = requestAnimationFrame(frame);
  }

  let openRoulettePanel = null;
  let closeRoulettePanel = null;

  function scrollToRoulette() {
    const target = document.getElementById('spin') || document.getElementById('fiesta-roulette');
    if (!target) return false;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
    window.scrollTo({ top, behavior: 'smooth' });
    return true;
  }

  /* ── Dish roulette widget (compact FAB + panel — menu page only) ── */
  function initRouletteWidget() {
    if (document.getElementById('roulette-widget')) return;
    if (document.querySelector('main #fiesta-roulette, #spin #fiesta-roulette')) return;

    const widget = document.createElement('div');
    widget.className = 'roulette-widget';
    widget.id = 'roulette-widget';
    widget.innerHTML =
      `<button type="button" class="roulette-fab" id="roulette-fab" aria-label="Dish roulette — spin to pick a dish" aria-expanded="false" aria-controls="roulette-panel">` +
      `<span class="roulette-fab__icon" aria-hidden="true">🎡</span>` +
      `<span class="roulette-fab__label">Spin</span></button>` +
      `<div class="roulette-panel" id="roulette-panel" role="dialog" aria-modal="true" aria-label="Dish roulette" hidden>` +
      `<div class="roulette-panel__inner">` +
      `<button type="button" class="roulette-panel__close" id="roulette-panel-close" aria-label="Close dish roulette">&times;</button>` +
      `<h3 class="roulette-panel__title">Dish Roulette</h3>` +
      `<p class="roulette-panel__lead">36 popular plates — no repeats until all have been picked.</p>` +
      `<article class="fiesta-card fiesta-card--roulette fiesta-card--roulette-compact" id="fiesta-roulette">` +
      `<div class="fiesta-roulette__wheel-wrap">` +
      `<div class="fiesta-roulette__pointer" aria-hidden="true"></div>` +
      `<div class="fiesta-roulette__wheel" aria-hidden="true"></div>` +
      `<div class="fiesta-roulette__center" aria-hidden="true">🌮</div></div>` +
      `<div class="fiesta-roulette__result"><p>Tap Spin to pick your dish.</p></div>` +
      `<button type="button" class="fiesta-spin-btn" id="fiesta-spin-btn">Spin</button>` +
      `</article></div></div>` +
      `<div class="roulette-panel__backdrop" id="roulette-backdrop" hidden aria-hidden="true"></div>`;
    document.body.appendChild(widget);

    const fab = document.getElementById('roulette-fab');
    const panel = document.getElementById('roulette-panel');
    const backdrop = document.getElementById('roulette-backdrop');
    const closeBtn = document.getElementById('roulette-panel-close');

    function setOpen(open) {
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
      backdrop.hidden = !open;
      document.body.classList.toggle('roulette-open', open);
      if (open) {
        closeBtn.focus({ preventScroll: true });
      } else if (!document.body.classList.contains('nav-open') && !document.querySelector('.lightbox.open')) {
        document.body.style.overflow = '';
      }
      if (open) document.body.style.overflow = 'hidden';
    }

    openRoulettePanel = () => setOpen(true);
    closeRoulettePanel = () => setOpen(false);

    fab.addEventListener('click', () => {
      setOpen(panel.hidden);
    });
    closeBtn.addEventListener('click', () => setOpen(false));
    backdrop.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) setOpen(false);
    });

    if (location.hash === '#spin' || location.hash === '#roulette') {
      requestAnimationFrame(() => setOpen(true));
    }
  }

  function handleRouletteHash() {
    if (location.hash !== '#spin' && location.hash !== '#roulette') return;
    if (scrollToRoulette()) return;
    openRoulettePanel?.();
  }

  /* ── Dish roulette (gamification) ── */
  function initRoulette() {
    const root = document.getElementById('fiesta-roulette');
    if (!root) return;

    const wheel = root.querySelector('.fiesta-roulette__wheel');
    const result = root.querySelector('.fiesta-roulette__result');
    const btn = document.getElementById('fiesta-spin-btn');
    if (!wheel || !result || !btn) return;

    const BTN_SPIN = 'Spin';
    const BTN_AGAIN = 'Spin Again';
    const BTN_BUSY = 'Spinning...';

    let spinning = false;
    let hasSpun = false;
    let rotation = 0;
    let finishTimer = null;
    let failsafeTimer = null;

    function clearTimers() {
      if (finishTimer) {
        clearTimeout(finishTimer);
        finishTimer = null;
      }
      if (failsafeTimer) {
        clearTimeout(failsafeTimer);
        failsafeTimer = null;
      }
    }

    function releaseSpin() {
      spinning = false;
      btn.removeAttribute('aria-busy');
      btn.textContent = hasSpun ? BTN_AGAIN : BTN_SPIN;
    }

    function renderResult(pick, untilReset) {
      const cycleNote = untilReset === 0
        ? `<p class="fiesta-roulette__meta">All ${ROULETTE_DISHES.length} dishes are back in the wheel. Start again!</p>`
        : `<p class="fiesta-roulette__meta">${untilReset} more dish${untilReset === 1 ? '' : 'es'} before the wheel reshuffles.</p>`;
      result.innerHTML =
        `<span class="fiesta-roulette__tag">${pick.tag}</span>` +
        `<strong>${pick.name}</strong><p>${pick.desc}</p>` +
        cycleNote +
        `<div class="fiesta-roulette__actions">` +
        `<a href="menu.html" class="btn btn-primary fiesta-roulette__menu-link">View on Menu</a>` +
        `</div>`;
    }

    function finishSpin(pick, spins, untilReset) {
      try {
        renderResult(pick, untilReset);
        hasSpun = true;
        toast(`🎉 Spin #${spins}: <strong>${pick.name}</strong>!`);
      } catch (_) {
        result.innerHTML = '<p>Something went wrong. Tap Spin the Wheel to try again.</p>';
      } finally {
        clearTimers();
        releaseSpin();
      }
    }

    function doSpin() {
      if (spinning) return;
      spinning = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = BTN_BUSY;
      result.innerHTML = '<p>Spinning the wheel...</p>';
      clearTimers();

      let pick;
      let spins;
      let untilReset;
      try {
        ({ pick, spins, untilReset } = pickRouletteDish());
      } catch (_) {
        result.innerHTML = '<p>Something went wrong. Tap Spin the Wheel to try again.</p>';
        releaseSpin();
        return;
      }

      const fullSpins = 5 + Math.floor(secureRandom() * 5);
      const jitter = secureRandom() * 360;
      const duration = reducedMotion ? 80 : 2800 + Math.floor(secureRandom() * 2200);

      rotation += fullSpins * 360 + jitter;
      wheel.style.transition = reducedMotion
        ? 'none'
        : `transform ${duration}ms cubic-bezier(0.15, 0.85, 0.2, 1)`;
      void wheel.offsetWidth;
      wheel.style.transform = `rotate(${rotation}deg)`;

      finishTimer = setTimeout(() => finishSpin(pick, spins, untilReset), duration + 80);
      failsafeTimer = setTimeout(() => {
        if (!spinning) return;
        finishSpin(pick, spins, untilReset);
      }, Math.max(duration + 500, 6000));
    }

    root.addEventListener('click', (e) => {
      if (!e.target.closest('#fiesta-spin-btn')) return;
      e.preventDefault();
      doSpin();
    });
  }

  /* ── Stamp card (account-linked — see js/stamp-card.js) ── */
  function initStampCard() {
    window.ElMirasolStampCard?.init?.();
  }

  /* ── Trending badges on signature cards ── */
  function initTrendingBadges() {
    if (!isHome) return;
    const tags = ['🔥 Trending', '★ #1 Ordered', 'Guest Favorite'];
    document.querySelectorAll('.fav-card').forEach((card, i) => {
      if (card.querySelector('.fav-card__trending')) return;
      const badge = document.createElement('span');
      badge.className = 'fav-card__trending';
      badge.textContent = tags[i % tags.length];
      card.style.position = 'relative';
      card.appendChild(badge);
    });
  }

  function getPickupEta() {
    const eta = window.SITE_CONFIG?.ordering?.pickupEta || {};
    const min = Math.max(1, parseInt(eta.min, 10) || 8);
    const max = Math.max(min, parseInt(eta.max, 10) || 14);
    return { min, max };
  }

  /* ── Pickup time estimator (operational transparency) ── */
  function initPickupEstimator() {
    const hero = document.querySelector('.hero-btns');
    if (!hero || document.getElementById('fiesta-pickup')) return;

    const day = nowLocal().getDay();
    if (day === 2) return;

    const { min, max } = getPickupEta();
    const rangeLabel = min === max ? `${min} min` : `${min}\u2013${max} min`;

    const el = document.createElement('a');
    el.className = 'fiesta-pickup';
    el.id = 'fiesta-pickup';
    el.href = 'tel:9107891154';
    el.setAttribute(
      'aria-label',
      min === max
        ? `Call now for pickup in about ${min} minutes`
        : `Call now for pickup in ${min} to ${max} minutes`
    );
    el.innerHTML =
      `<span class="fiesta-pickup__action">` +
      `<span class="fiesta-pickup__icon" aria-hidden="true">📞</span>` +
      `<strong class="fiesta-pickup__call">Call now</strong>` +
      `<span class="fiesta-pickup__arrow" aria-hidden="true">→</span>` +
      `</span>` +
      `<span class="fiesta-pickup__eta">Pick up in <strong class="fiesta-pickup__time">${rangeLabel}</strong></span>`;
    hero.after(el);
  }

  /* ── Welcome toast (first-visit engagement) ── */
  function initWelcome() {
    if (sessionStorage.getItem(WELCOME_KEY)) return;
    sessionStorage.setItem(WELCOME_KEY, '1');
    setTimeout(() => {
      toast('Welcome! Scroll to <strong>Dish Roulette</strong> or tap Spin the Wheel to pick a plate.', 'review');
    }, 2200);
  }

  /* ── Menu page nudge ── */
  function initMenuNudge() {
    if (isHome) return;
    const main = document.querySelector('.menu-online');
    if (!main || document.querySelector('.fiesta-menu-nudge')) return;
    const nudge = document.createElement('p');
    nudge.className = 'fiesta-menu-nudge';
    nudge.textContent = '🔥 Birria is the #1 order today — tap any dish for details';
    main.prepend(nudge);
  }

  /* ── Expose toast for other scripts ── */
  window.featToast = toast;
  window.FiestaAlive = {
    toast,
    openRoulette() {
      if (!scrollToRoulette()) openRoulettePanel?.();
    },
    closeRoulette() {
      closeRoulettePanel?.();
    },
  };

  function init() {
    initGoldDust();
    initRoulette();
    initRouletteWidget();
    handleRouletteHash();
    initStampCard();
    initTrendingBadges();
    initPickupEstimator();
    initWelcome();
    initMenuNudge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();