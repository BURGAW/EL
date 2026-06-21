/**
 * El Mirasol — Depth Illusion System
 * Ambient light, mouse tilt, scroll parallax, staggered enters
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const TILT_SEL =
    '.fiesta-card, .trust-pillar, .extras-card, .wc-match, .wc-spotlight, .wc-bite, .feature, .food-wall__cell, .menu-card, .feat-tonight__card, .about-img, .review-card';

  const TILT_CFG = {
    maxX: 11,
    maxY: 13,
    lift: 10,
    perspective: 900,
  };

  function init() {
    document.body.classList.add('site-depth');
    injectAtmosphere();
    tagDepthLayers();
    if (reduced || mobile) {
      document.querySelectorAll('.depth-enter').forEach((el) => el.classList.add('is-visible'));
      return;
    }
    initAmbientLight();
    initHeroStage();
    initTilt();
    initScrollParallax();
    initDepthEnter();
    initFoodWallStagger();
    observeDynamicCards();
  }

  function injectAtmosphere() {
    if (!document.querySelector('.depth-ambient')) {
      const amb = document.createElement('div');
      amb.className = 'depth-ambient';
      amb.setAttribute('aria-hidden', 'true');
      document.body.appendChild(amb);
    }
    if (!document.querySelector('.depth-vignette')) {
      const vig = document.createElement('div');
      vig.className = 'depth-vignette';
      vig.setAttribute('aria-hidden', 'true');
      document.body.appendChild(vig);
    }
  }

  function tagDepthLayers() {
    document.querySelectorAll(TILT_SEL).forEach((el) => {
      el.classList.add('depth-float', 'depth-cast');
    });

    document.querySelectorAll('.fav-card').forEach((el) => {
      el.classList.add('depth-float');
    });

    document.querySelectorAll('.fiesta-card, .trust-pillar, .feature').forEach((el) => {
      el.classList.add('depth-bevel');
    });

    document.querySelectorAll('.wc-match, .feat-panel').forEach((el) => {
      el.classList.add('depth-recess');
    });

    document.querySelectorAll('.burgaw-town-band, .fiesta-hub').forEach((el) => {
      el.classList.add('depth-layer-mid');
    });
  }

  function initAmbientLight() {
    let lx = 50;
    let ly = 28;
    let tx = 50;
    let ty = 28;

    function tick() {
      lx += (tx - lx) * 0.08;
      ly += (ty - ly) * 0.08;
      document.body.style.setProperty('--depth-light-x', lx + '%');
      document.body.style.setProperty('--depth-light-y', ly + '%');
      requestAnimationFrame(tick);
    }

    document.addEventListener(
      'mousemove',
      (e) => {
        tx = (e.clientX / window.innerWidth) * 100;
        ty = (e.clientY / window.innerHeight) * 100;
      },
      { passive: true }
    );

    tick();
  }

  function initHeroStage() {
    if (!finePointer) return;
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const rotator = document.getElementById('hero-rotator');
    const floaters = document.getElementById('hero-floaters');
    if (!hero || !content) return;

    hero.addEventListener(
      'mousemove',
      (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;

        content.style.transform =
          `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateZ(0)`;

        if (rotator) {
          rotator.style.transform =
            `translateZ(-80px) scale(1.08) translate(${x * 18}px, ${y * 12}px)`;
        }

        if (floaters) {
          floaters.style.transform =
            `translateZ(96px) translate(${x * -22}px, ${y * -16}px)`;
        }
      },
      { passive: true }
    );

    hero.addEventListener('mouseleave', () => {
      content.style.transform = '';
      if (rotator) rotator.style.transform = '';
      if (floaters) floaters.style.transform = '';
    });
  }

  function bindTilt(el) {
    if (el.dataset.depthTilt) return;
    el.dataset.depthTilt = '1';

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const rx = -y * TILT_CFG.maxY;
      const ry = x * TILT_CFG.maxX;

      el.classList.add('depth-tilt-active');
      el.style.transform =
        `perspective(${TILT_CFG.perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-${TILT_CFG.lift}px) translateZ(18px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.classList.remove('depth-tilt-active');
      el.style.transform = '';
    });
  }

  function initTilt() {
    if (!finePointer) return;
    document.querySelectorAll(TILT_SEL).forEach(bindTilt);
  }

  function initScrollParallax() {
    const layers = document.querySelectorAll('.depth-layer-mid, .depth-layer-back');
    if (!layers.length) return;

    let ticking = false;

    function update() {
      layers.forEach((el) => {
        const factor = 0.45;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const viewCenter = window.innerHeight * 0.5;
        const offset = (center - viewCenter) * factor * 0.06;
        el.style.transform = `translateY(${-offset}px)`;
      });
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  function initDepthEnter() {
    const targets = document.querySelectorAll(
      '.fiesta-card, .trust-pillar, .feature, .wc-match, .extras-card, .food-wall__cell, .wc-bites, .wc-spotlight, .review-card'
    );

    targets.forEach((el, i) => {
      el.classList.add('depth-enter');
      el.style.transitionDelay = Math.min(i * 0.04, 0.45) + 's';
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => obs.observe(el));
  }

  function initFoodWallStagger() {
    document.querySelectorAll('.food-wall__cell').forEach((cell, i) => {
      const z = 4 + (i % 3) * 6 + Math.floor(i / 6) * 4;
      cell.style.setProperty('--cell-z', z + 'px');
    });
  }

  function observeDynamicCards() {
    if (!finePointer) return;

    const obs = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.(TILT_SEL)) {
            node.classList.add('depth-float', 'depth-cast');
            bindTilt(node);
          }
          node.querySelectorAll?.(TILT_SEL).forEach((el) => {
            el.classList.add('depth-float', 'depth-cast', 'depth-enter', 'is-visible');
            bindTilt(el);
          });
          if (node.matches?.('.wc-match, .wc-bite')) {
            node.classList.add('depth-enter', 'is-visible');
          }
        });
      });
    });

    const grid = document.getElementById('menu-grid');
    if (grid) obs.observe(grid, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.DepthIllusion = { init, bindTilt };
})();