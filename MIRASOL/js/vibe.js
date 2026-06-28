/**
 * El Mirasol vibe — single hero image + Polaroid floaters
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
        `<div class="hero-snap__photo">` +
        `<img src="${src}" alt="" loading="lazy" width="140" height="140">` +
        `</div>` +
        `</div>` +
        `<span class="hero-snap__shadow" aria-hidden="true"></span>` +
        `</article>` +
        `</div>`
    ).join('');
  }

  function init() {
    initHeroRotator();
    initHeroFloaters();
    window.ElMirasolReviews?.updateReviewStats?.();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();