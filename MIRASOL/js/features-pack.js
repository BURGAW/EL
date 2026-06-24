/**
 * El Mirasol — feature pack (interactive tools, chrome, easter eggs)
 */
(function () {
  const TZ = 'America/New_York';
  const RESTAURANT = { lat: 34.551919, lng: -77.913414 };
  const HOURS = {
    0: { open: 8, close: 21 },
    1: { open: 8, close: 21 },
    2: null,
    3: { open: 8, close: 21 },
    4: { open: 8, close: 21 },
    5: { open: 8, close: 21.5 },
    6: { open: 8, close: 21.5 },
  };

  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const HERO_CAPTIONS = [
    'Shrimp Plate', 'Pozole', 'Nachos', 'Menudo', 'Pineapple Margarita',
    'Birria Tacos', 'Sizzling Fajitas', 'Breakfast Spread',
  ];

  const SPECIALS = [
    'Tonight: Birria consommé — ask for extra',
    '100% fresh — zero frozen tortillas, pressed in-house',
    'Margarita flight: pineapple, mango, strawberry',
    'Sunday breakfast chilaquiles until 11 AM',
    'Campechanas fajitas — the full experience',
    'Quesadilla de birria — dip, don\'t miss',
    'Road-trip favorite: tacos al pastor',
  ];

  const COMMANDS = [
    { label: 'Explore the Menu', keys: 'M', action: () => { location.href = 'menu.html'; } },
    { label: 'Breakfast Menu', keys: '', action: () => { location.href = 'menu.html#breakfast'; } },
    { label: 'Dinner Menu', keys: '', action: () => { location.href = 'menu.html#dinner'; } },
    { label: 'Call to Order', keys: 'C', action: () => { location.href = 'tel:9107891154'; } },
    { label: 'Get Directions', keys: 'D', action: () => { location.href = 'https://www.google.com/maps/dir/?api=1&destination=34.551919,-77.913414'; } },
    { label: 'Guest Reviews', keys: 'R', action: () => scrollToEl('#reviews') },
    { label: 'Dish Roulette — Spin', keys: 'F', action: () => {
      if (window.FiestaAlive?.openRoulette) {
        window.FiestaAlive.openRoulette();
        return;
      }
      location.href = isHome ? 'index.html#spin' : 'index.html#spin';
    } },

    { label: 'Hours & Location', keys: 'V', action: () => scrollToEl('#visit') },
    { label: 'Share El Mirasol', keys: 'S', action: shareSite },
    { label: 'Copy Address', keys: '', action: copyAddress },
    { label: 'Leave a Google Review', keys: '', action: () => { window.open(window.SITE_CONFIG?.google?.reviewUrl || '#', '_blank'); } },
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
  const isHome = !document.body.classList.contains('menu-page');
  let lightboxImages = [];
  let lightboxIndex = 0;

  function nowInBurgaw() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
  }

  function formatTime(d) {
    return d.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function getKitchenStatus() {
    const d = nowInBurgaw();
    const day = d.getDay();
    const h = d.getHours() + d.getMinutes() / 60;
    const schedule = HOURS[day];

    if (!schedule) {
      let reopen = 'See hours below';
      for (let i = 1; i <= 7; i++) {
        const next = (day + i) % 7;
        if (HOURS[next]) {
          reopen = `We reopen ${DAY_NAMES[next]} at 8 AM`;
          break;
        }
      }
      return { open: false, label: 'Closed today', sub: reopen };
    }
    if (h < schedule.open) {
      const mins = Math.round((schedule.open - h) * 60);
      return { open: false, label: `Opens at ${schedule.open === 8 ? '8 AM' : '8:00'}`, sub: `Kitchen opens in ${mins} min` };
    }
    if (h >= schedule.close) {
      return { open: false, label: 'Kitchen closed', sub: 'See you tomorrow' };
    }
    const minsLeft = Math.round((schedule.close - h) * 60);
    return { open: true, label: 'Kitchen open now', sub: `${minsLeft} min until close` };
  }

  function isTuesday() {
    return nowInBurgaw().getDay() === 2;
  }

  function getMealPeriod() {
    const h = nowInBurgaw().getHours();
    if (h < 11) return 'Breakfast';
    if (h < 15) return 'Lunch';
    return 'Dinner';
  }

  function scrollToEl(sel) {
    const el = document.querySelector(sel);
    if (!el) {
      const homeAnchors = {
        '#reviews': 'index.html#reviews',
        '#spin': 'index.html#spin',
        '#roulette': 'index.html#spin',

        '#visit': 'index.html#visit',
        '#main': 'index.html#main',
      };
      if (!isHome && homeAnchors[sel]) {
        location.href = homeAnchors[sel];
        return;
      }
      toast('That section isn\'t on this page — try the home page.');
      return;
    }
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset - 12, behavior: 'smooth' });
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

  function shareSite() {
    const data = {
      title: 'El Mirasol — Burgaw, NC',
      text: 'You HAVE to try the birria tacos at El Mirasol in Burgaw — 4.8★ on Google. Family-owned, hardworking, and worth the drive.',
      url: location.origin + location.pathname.replace(/menu\.html.*/, 'index.html'),
    };
    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else {
      navigator.clipboard?.writeText(data.url).then(() => {
        toast('Link copied — spread the fiesta! 🎉');
      }).catch(() => toast('Copy the URL from your browser bar to share'));
    }
  }

  function copyAddress() {
    const addr = '211 U.S. Hwy 117 S, Burgaw, NC 28425';
    navigator.clipboard?.writeText(addr).then(() => {
      toast('Address copied — see you soon');
    }).catch(() => toast('211 U.S. Hwy 117 S, Burgaw, NC 28425'));
  }

  /* ── Scroll progress ── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'feat-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      bar.style.width = `${Math.min(100, pct * 100)}%`;
    }, { passive: true });
  }

  /* ── Ribbon ── */
  function ensureRibbon() {
    if (document.getElementById('feat-ribbon')) return;
    const ribbon = document.createElement('div');
    ribbon.className = 'feat-ribbon';
    ribbon.id = 'feat-ribbon';
    ribbon.setAttribute('aria-live', 'polite');
    ribbon.innerHTML =
      `<div class="feat-ribbon__inner">` +
      `<span class="feat-ribbon__specials" data-feat-special>Tonight: Birria consommé — ask for extra</span>` +
      `<div class="feat-ribbon__right">` +
      `<span class="feat-ribbon__status"><span class="feat-ribbon__dot" aria-hidden="true"></span> <span data-feat-status>Kitchen open</span></span>` +
      `<span class="feat-ribbon__meal" data-feat-meal>Now serving: Dinner</span>` +
      `<span class="feat-ribbon__clock" data-feat-clock></span></div></div>`;
    const header = document.querySelector('.header');
    if (header) header.after(ribbon);
    else document.body.prepend(ribbon);
  }

  function initRibbon() {
    if (document.body.classList.contains('menu-page')) return;
    ensureRibbon();
    const el = document.getElementById('feat-ribbon');
    if (!el) return;

    const statusEl = el.querySelector('[data-feat-status]');
    const clockEl = el.querySelector('[data-feat-clock]');
    const mealEl = el.querySelector('[data-feat-meal]');
    const specialEl = el.querySelector('[data-feat-special]');
    let specialIdx = 0;

    function tick() {
      const status = getKitchenStatus();
      const dot = el.querySelector('.feat-ribbon__dot');
      if (statusEl) statusEl.textContent = status.label;
      if (dot) dot.classList.toggle('feat-ribbon__dot--closed', !status.open);
      if (clockEl) clockEl.textContent = formatTime(nowInBurgaw()) + ' · Burgaw';
      if (mealEl) {
        if (isTuesday()) {
          mealEl.hidden = true;
          mealEl.textContent = '';
        } else {
          mealEl.hidden = false;
          mealEl.textContent = `Now serving: ${getMealPeriod()}`;
        }
      }
      if (specialEl && !specialEl.dataset.wcDone) {
        specialEl.textContent = SPECIALS[specialIdx % SPECIALS.length];
      }
    }

    tick();
    setInterval(tick, 30000);
    if (specialEl && !specialEl.dataset.wcDone) {
      setInterval(() => {
        specialIdx++;
        const current = el.querySelector('[data-feat-special]');
        if (current && !current.dataset.wcDone) {
          current.textContent = SPECIALS[specialIdx % SPECIALS.length];
        }
      }, 6000);
    }
  }

  /* ── Hero captions ── */
  function initHeroCaptions() {
    if (!isHome) return;
    const hero = document.querySelector('.hero');
    if (!hero || hero.classList.contains('hero--single')) return;

    const rotator = document.getElementById('hero-rotator');
    if (!rotator) return;

    const cap = document.createElement('div');
    cap.className = 'feat-hero-caption';
    cap.setAttribute('aria-live', 'polite');
    hero.appendChild(cap);

    function update() {
      const active = rotator.querySelector('.hero-rotator__slide.is-active');
      const slides = [...rotator.querySelectorAll('.hero-rotator__slide')];
      const idx = slides.indexOf(active);
      cap.textContent = `Now viewing — ${HERO_CAPTIONS[idx] || 'From our kitchen'}`;
      cap.classList.add('is-visible');
    }

    update();
    setInterval(update, 4500);
  }

  /* ── Stats counters ── */
  function initStats() {
    const nums = document.querySelectorAll('[data-feat-count]');
    if (!nums.length) return;

    const google = window.SITE_CONFIG?.google;
    if (google) {
      nums.forEach((el) => {
        const label = el.closest('.feat-stat')?.querySelector('.feat-stat__label')?.textContent?.toLowerCase() || '';
        if (label.includes('google') && google.rating) {
          el.dataset.featCount = String(google.rating);
          el.dataset.featSuffix = '★';
          el.dataset.featDecimals = '1';
        }
        if (label.includes('review') && google.reviewCount) {
          el.dataset.featCount = String(google.reviewCount);
          el.dataset.featSuffix = '+';
          el.dataset.featDecimals = '0';
        }
      });
    }

    const animate = (el) => {
      const target = parseFloat(el.dataset.featCount);
      const suffix = el.dataset.featSuffix || '';
      const decimals = parseInt(el.dataset.featDecimals || '0', 10);
      const duration = 1800;
      const start = performance.now();

      function frame(t) {
        const p = Math.min(1, (t - start) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = target * ease;
        el.textContent = val.toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    nums.forEach((n) => obs.observe(n));
  }

  /* ── Section spy ── */
  function initSectionSpy() {
    if (!isHome) return;
    const sections = [
      { id: '#spin', label: 'Dish Roulette' },
      { id: '#main', label: 'Story' },
      { id: '#reviews', label: 'Reviews' },
      { id: '#visit', label: 'Visit' },
    ].filter((s) => document.querySelector(s.id));

    if (sections.length < 2) return;

    const spy = document.createElement('nav');
    spy.className = 'feat-spy';
    spy.setAttribute('aria-label', 'Page sections');
    spy.innerHTML = sections.map((s, i) =>
      `<button type="button" class="feat-spy__dot${i === 0 ? ' is-active' : ''}" data-target="${s.id}" aria-label="${s.label}"></button>`
    ).join('');
    document.body.appendChild(spy);

    spy.querySelectorAll('.feat-spy__dot').forEach((dot) => {
      dot.addEventListener('click', () => scrollToEl(dot.dataset.target));
    });

    const visible = new Map();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = '#' + e.target.id;
        if (e.isIntersecting) visible.set(id, e.intersectionRatio);
        else visible.delete(id);
      });
      let bestId = null;
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });
      if (!bestId) return;
      spy.querySelectorAll('.feat-spy__dot').forEach((d) => {
        d.classList.toggle('is-active', d.dataset.target === bestId);
      });
    }, { threshold: [0, 0.2, 0.35, 0.5, 0.65] });

    sections.forEach((s) => {
      const el = document.querySelector(s.id);
      if (el?.id) obs.observe(el);
    });
  }

  /* ── Command palette ── */
  let cmdOpen = false;
  let cmdHighlight = 0;

  function openCommandPalette() {
    let cmd = document.getElementById('feat-cmd');
    if (!cmd) {
      cmd = document.createElement('div');
      cmd.id = 'feat-cmd';
      cmd.className = 'feat-cmd';
      cmd.innerHTML =
        `<div class="feat-cmd__dialog" role="dialog" aria-label="Command palette">` +
        `<input type="text" class="feat-cmd__input" placeholder="Search actions…" autocomplete="off" aria-label="Search">` +
        `<ul class="feat-cmd__list" role="listbox"></ul>` +
        `<p class="feat-cmd__hint">↑↓ navigate · Enter run · Esc close · ? shortcuts</p></div>`;
      document.body.appendChild(cmd);

      cmd.addEventListener('click', (e) => { if (e.target === cmd) closeCommandPalette(); });
      const input = cmd.querySelector('.feat-cmd__input');
      input.addEventListener('input', () => { cmdHighlight = 0; renderCommands(input.value); });
      input.addEventListener('keydown', handleCmdKey);
    }
    cmd.classList.add('is-open');
    cmdOpen = true;
    cmdHighlight = 0;
    renderCommands('');
    cmd.querySelector('.feat-cmd__input').value = '';
    cmd.querySelector('.feat-cmd__input').focus();
  }

  function closeCommandPalette() {
    document.getElementById('feat-cmd')?.classList.remove('is-open');
    cmdOpen = false;
  }

  function renderCommands(q) {
    const list = document.querySelector('.feat-cmd__list');
    if (!list) return;
    const query = q.toLowerCase().trim();
    const filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(query));
    list.innerHTML = filtered.map((c, i) =>
      `<li class="feat-cmd__item${i === cmdHighlight ? ' is-highlighted' : ''}" role="option" data-idx="${i}">` +
      `${c.label}${c.keys ? `<kbd>${c.keys}</kbd>` : ''}</li>`
    ).join('');

    list.querySelectorAll('.feat-cmd__item').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.idx, 10);
        runCommand(filtered[idx]);
      });
    });
  }

  function runCommand(cmd) {
    closeCommandPalette();
    cmd?.action?.();
  }

  function handleCmdKey(e) {
    const list = document.querySelector('.feat-cmd__list');
    const items = list ? [...list.querySelectorAll('.feat-cmd__item')] : [];
    if (e.key === 'Escape') { closeCommandPalette(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdHighlight = Math.min(cmdHighlight + 1, items.length - 1); renderCommands(e.target.value); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); cmdHighlight = Math.max(cmdHighlight - 1, 0); renderCommands(e.target.value); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      const q = e.target.value.toLowerCase();
      const filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
      if (!filtered.length) return;
      const idx = Math.min(cmdHighlight, filtered.length - 1);
      runCommand(filtered[idx]);
    }
  }

  /* ── Keyboard shortcuts ── */
  function initKeyboard() {
    const hint = document.createElement('div');
    hint.className = 'feat-kbd-hint';
    hint.innerHTML = 'Press <kbd>?</kbd> for shortcuts · <kbd>Ctrl K</kbd> command palette';
    document.body.appendChild(hint);

    let hintTimer;
    window.addEventListener('keydown', (e) => {
      if (cmdOpen) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
        return;
      }
      if (e.target.matches('input, textarea, select')) return;
      if (e.key === '?') {
        const extra = isHome ? ' · R reviews · F fiesta · V visit · type birria for secrets' : ' · R/F/V jump to home sections · type consome for secrets';
        toast(`Shortcuts: M menu · C call · D directions${extra} · Ctrl+K palette`);
        return;
      }
      const key = e.key.toUpperCase();
      const map = {
        M: COMMANDS[0], C: COMMANDS[3], D: COMMANDS[4], R: COMMANDS[5],
        F: COMMANDS[6], V: COMMANDS[8], S: COMMANDS[9],
      };
      if (map[key] && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        map[key].action();
      }
    });

    window.addEventListener('mousemove', () => {
      hint.classList.add('is-visible');
      clearTimeout(hintTimer);
      hintTimer = setTimeout(() => hint.classList.remove('is-visible'), 4000);
    }, { once: true, passive: true });
  }

  /* ── Konami code ── */
  function initKonami() {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
      if (e.key === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          pos = 0;
          toast('🌶️ Kitchen secret unlocked: ask for <strong>extra consommé</strong> with your birria — on the house when you mention the code');
          document.body.style.animation = 'featKonami 0.5s ease';
          setTimeout(() => { document.body.style.animation = ''; }, 500);
        }
      } else pos = 0;
    });
  }

  /* ── Distance (disabled — no location prompts) ── */
  function initDistance() {
    document.getElementById('feat-distance')?.remove();
  }

  /* ── Share row ── */
  function initShareRow() {
    const row = document.getElementById('feat-share-row');
    if (row) {
      row.querySelector('[data-share]')?.addEventListener('click', shareSite);
      row.querySelector('[data-sms]')?.addEventListener('click', () => {
        window.FriendText?.openSms?.();
      });
    }
    document.querySelectorAll('[data-copy-addr]').forEach((el) => {
      el.addEventListener('click', copyAddress);
    });
  }

  /* ── Lightbox enhancement ── */
  function collectLightboxImages() {
    const urls = new Set();
    document.querySelectorAll('[data-full]').forEach((el) => urls.add(el.dataset.full));
    document.querySelectorAll('.food-wall__cell').forEach((el) => urls.add(el.dataset.full));
    lightboxImages = [...urls].filter(Boolean);
  }

  function openLightboxFromList(images, index) {
    lightboxImages = images;
    lightboxIndex = index;
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lb || !img) return;
    img.src = lightboxImages[lightboxIndex];
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    ensureLightboxNav();
  }

  function ensureLightboxNav() {
    const lb = document.getElementById('lightbox');
    if (!lb || lb.dataset.navReady) return;
    lb.dataset.navReady = '1';

    const prev = document.createElement('button');
    prev.className = 'lightbox-nav lightbox-nav--prev';
    prev.innerHTML = '‹';
    prev.setAttribute('aria-label', 'Previous image');
    const next = document.createElement('button');
    next.className = 'lightbox-nav lightbox-nav--next';
    next.innerHTML = '›';
    next.setAttribute('aria-label', 'Next image');
    lb.appendChild(prev);
    lb.appendChild(next);
    prev.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
    next.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });

    let touchX = null;
    lb.addEventListener('touchstart', (e) => {
      touchX = e.changedTouches[0]?.clientX ?? null;
    }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (touchX == null) return;
      const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
      touchX = null;
      if (Math.abs(dx) < 50) return;
      stepLightbox(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function stepLightbox(dir) {
    if (!lightboxImages.length) return;
    lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
    const img = document.getElementById('lightbox-img');
    if (img) img.src = lightboxImages[lightboxIndex];
  }

  /* ── Gold particles ── */
  function initParticles() {
    if (!isHome || isMobile || reducedMotion) return;
    document.querySelectorAll('.btn-primary').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        burstParticles(e.clientX, e.clientY);
      });
    });
  }

  function burstParticles(x, y) {
    const canvas = document.createElement('canvas');
    canvas.className = 'feat-particles';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: 24 }, () => ({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      life: 1,
      size: Math.random() * 4 + 2,
    }));

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.025;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = '#c9a962';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      if (alive) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  /* ── 3D tilt cards ── */
  function initTilt() {
    if (reducedMotion || isMobile || document.body.classList.contains('site-depth')) return;
    document.querySelectorAll('.fav-card').forEach((card) => {
      card.classList.add('feat-tilt');
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ── Custom cursor (disabled — hides system pointer; bad for accessibility) ── */
  function initCursor() {
    document.body.classList.remove('feat-cursor-on');
    return;
    if (!isHome || reducedMotion || isMobile) return;
    document.body.classList.add('feat-cursor-on');
    const dot = document.createElement('div');
    dot.className = 'feat-cursor';
    const ring = document.createElement('div');
    ring.className = 'feat-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

    document.querySelectorAll('a, button, .feat-chip, .feat-mood-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('feat-cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('feat-cursor-hover'));
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ── Parallax hero ── */
  function initParallax() {
    if (reducedMotion || isMobile || document.body.classList.contains('site-depth')) return;
    const hero = document.querySelector('.hero');
    const rotator = document.getElementById('hero-rotator');
    if (!hero || !rotator) return;

    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      rotator.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => { rotator.style.transform = ''; });
  }

  function init() {
    initScrollProgress();
    initRibbon();
    if (isHome) {
      initHeroCaptions();
      initStats();
      initSectionSpy();
      initTilt();
      initParallax();
    }
    initKeyboard();
    initKonami();
    initDistance();
    initShareRow();
    initParticles();
    initCursor();
    collectLightboxImages();
    ensureLightboxNav();


  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();