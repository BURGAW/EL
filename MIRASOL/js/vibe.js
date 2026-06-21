/**
 * El Mirasol vibe — hero rotator, food wall, review carousel
 */
(function () {
  const HERO_IMAGES = [
    'assets/images/facebook/shrimp-plate.jpg?v=vibe1',
    'assets/images/facebook/pozole.jpg?v=vibe1',
    'assets/images/facebook/nachos.jpg?v=vibe1',
    'assets/images/facebook/menudo.jpg?v=vibe1',
    'assets/images/facebook/margarita-pineapple.jpg?v=vibe1',
    'assets/images/menu/IMG_1512.jpg?v=vibe1',
    'assets/images/menu/IMG_2876.jpg?v=sharpfix1',
    'assets/images/menu/IMG_2920.jpg?v=vibe1',
  ];

  const FLOATERS = [
    'assets/images/facebook/nachos.jpg?v=vibe1',
    'assets/images/facebook/margarita-mango.jpg?v=vibe1',
    'assets/images/menu/IMG_1514.jpg?v=vibe1',
    'assets/images/facebook/pozole.jpg?v=vibe1',
  ];

  const WALL_IMAGES = [
    { src: 'assets/images/facebook/pozole.jpg?v=vibe1', label: 'Pozole', wide: true },
    { src: 'assets/images/facebook/nachos.jpg?v=vibe1', label: 'Nachos' },
    { src: 'assets/images/facebook/menudo.jpg?v=vibe1', label: 'Menudo' },
    { src: 'assets/images/menu/IMG_1512.jpg?v=vibe1', label: 'Platters' },
    { src: 'assets/images/menu/IMG_2876.jpg?v=sharpfix1', label: 'Fajitas', wide: true },
    { src: 'assets/images/menu/IMG_2920.jpg?v=vibe1', label: 'Breakfast' },
    { src: 'assets/images/facebook/margarita-pineapple.jpg?v=vibe1', label: 'Margaritas' },
    { src: 'assets/images/facebook/shrimp-plate.jpg?v=vibe1', label: 'Shrimp' },
    { src: 'assets/images/menu/IMG_2751.jpg?v=vibe1', label: 'Cocktails' },
    { src: 'assets/images/facebook/beers.jpg?v=vibe1', label: 'Cervezas' },
  ];

  function initHeroRotator() {
    const root = document.getElementById('hero-rotator');
    if (!root) return;

    const existing = [...root.querySelectorAll('.hero-rotator__slide')];
    if (!existing.length) {
      root.innerHTML = HERO_IMAGES.map(
        (url, i) =>
          `<div class="hero-rotator__slide${i === 0 ? ' is-active' : ''}" style="background-image:url('${url}')" role="img" aria-label="Food from MIRASOL"></div>`
      ).join('');
    } else if (existing.length < HERO_IMAGES.length) {
      HERO_IMAGES.slice(existing.length).forEach((url) => {
        const slide = document.createElement('div');
        slide.className = 'hero-rotator__slide';
        slide.style.backgroundImage = `url('${url}')`;
        slide.setAttribute('role', 'img');
        slide.setAttribute('aria-label', 'Food from MIRASOL');
        root.appendChild(slide);
      });
    }

    const slides = [...root.querySelectorAll('.hero-rotator__slide')];
    if (slides.length < 2) return;

    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('is-active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('is-active');
    }, 4500);
  }

  function initHeroFloaters() {
    const root = document.getElementById('hero-floaters');
    if (!root) return;

    root.innerHTML = FLOATERS.map(
      (src, i) =>
        `<div class="hero-floater hero-floater--snap" style="--snap-i:${i}">` +
        `<article class="hero-snap">` +
        `<div class="hero-snap__paper">` +
        `<img src="${src}" alt="" loading="lazy" width="140" height="140">` +
        `</div>` +
        `<span class="hero-snap__shadow" aria-hidden="true"></span>` +
        `</article>` +
        `</div>`
    ).join('');
  }

  function initFoodWall() {
    const grid = document.getElementById('food-wall-grid');
    if (!grid) return;

    grid.innerHTML = WALL_IMAGES.map((item) => {
      const cls = item.wide ? ' food-wall__cell--wide' : '';
      return (
        `<button type="button" class="food-wall__cell${cls}" data-full="${item.src}" aria-label="${item.label}">` +
        `<img src="${item.src}" alt="${item.label}" loading="lazy">` +
        `<span class="food-wall__label">${item.label}</span></button>`
      );
    }).join('');

    grid.querySelectorAll('.food-wall__cell').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        if (!lightbox || !img) return;
        img.src = btn.dataset.full || '';
        img.alt = btn.getAttribute('aria-label') || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  function initReviewCarousel() {
    const wrap = document.getElementById('reviews-carousel-wrap');
    const grid = document.getElementById('reviews-grid');
    if (!wrap || !grid || !grid.children.length || wrap.querySelector('.reviews-carousel__track')) return;

    const track = document.createElement('div');
    track.className = 'reviews-carousel__track';
    track.id = 'reviews-carousel-track';

    const cards = [...grid.children];
    grid.style.display = 'none';
    grid.setAttribute('aria-hidden', 'true');

    const cloneSet = () => cards.map((c) => c.cloneNode(true)).forEach((c) => track.appendChild(c));
    cloneSet();
    cloneSet();

    /* ~5s per card — unhurried scroll through 80+ reviews */
    const duration = Math.max(280, Math.min(560, Math.round(cards.length * 5)));
    track.style.animationDuration = `${duration}s`;

    wrap.appendChild(track);
  }

  function init() {
    initHeroRotator();
    initHeroFloaters();
    initFoodWall();
    if (window.ElMirasolReviews) {
      const grid = document.getElementById('reviews-grid');
      if (grid && grid.dataset.rendered !== '1') {
        window.ElMirasolReviews.init();
      } else {
        window.ElMirasolReviews.updateReviewStats?.();
      }
      requestAnimationFrame(() => requestAnimationFrame(initReviewCarousel));
    } else {
      setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(initReviewCarousel)), 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();