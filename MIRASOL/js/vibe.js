/**
 * El Mirasol vibe — single hero image + Polaroid floaters, review carousel
 */
(function () {
  const HERO_IMAGE = 'assets/images/hero/el-mirasol-hero.jpg?v=storefront1';

  const FLOATERS = [
    'assets/images/facebook/nachos.jpg?v=vibe1',
    'assets/images/facebook/margarita-mango.jpg?v=vibe1',
    'assets/images/menu/IMG_1514.jpg?v=vibe1',
    'assets/images/facebook/pozole.jpg?v=vibe1',
  ];

  function initHeroRotator() {
    const root = document.getElementById('hero-rotator');
    if (!root) return;

    root.innerHTML =
      `<div class="hero-rotator__slide is-active" style="background-image:url('${HERO_IMAGE}')" role="img" aria-label="El Mirasol Mexican Restaurant storefront at dusk in Burgaw, NC"></div>`;
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

    const duration = Math.max(280, Math.min(560, Math.round(cards.length * 5)));
    track.style.animationDuration = `${duration}s`;

    wrap.appendChild(track);
  }

  function init() {
    initHeroRotator();
    initHeroFloaters();
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