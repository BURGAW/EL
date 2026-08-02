/**
 * El Mirasol vibe — single hero image + Polaroid floaters
 */
(function () {
  const HERO_IMAGE = 'assets/images/hero/el-mirasol-hero.jpg?v=storefront1';
  /* Keep lot + fence in frame when JS rewrites the hero slide */
  const HERO_POSITION = 'center 58%';
  const HERO_SIZE = '90% auto';

  const FLOATERS = [
    'assets/images/facebook/nachos.jpg?v=vibe1',
    'assets/images/facebook/margarita-mango.jpg?v=vibe1',
    'assets/images/menu/IMG_1514.jpg?v=vibe1',
    'assets/images/facebook/pozole.jpg?v=vibe1',
  ];

  function floaterHtml(src, i) {
    return (
      `<div class="hero-floater hero-floater--snap" style="--snap-i:${i}">` +
      `<article class="hero-snap">` +
      `<div class="hero-snap__paper">` +
      `<div class="hero-snap__photo">` +
      `<img src="${src}" alt="" loading="lazy" width="72" height="72">` +
      `</div>` +
      `</div>` +
      `<span class="hero-snap__shadow" aria-hidden="true"></span>` +
      `</article>` +
      `</div>`
    );
  }

  function fillFloaters(root, images, indexOffset) {
    if (!root) return;
    root.innerHTML = images.map((src, i) => floaterHtml(src, indexOffset + i)).join('');
  }

  function initHeroRotator() {
    const root = document.getElementById('hero-rotator');
    if (!root) return;

    root.innerHTML =
      `<div class="hero-rotator__slide is-active" style="background-image:url('${HERO_IMAGE}');background-position:${HERO_POSITION};background-size:${HERO_SIZE}" role="img" aria-label="El Mirasol Mexican Restaurant storefront at dusk in Burgaw, NC"></div>`;
  }

  function initHeroFloaters() {
    const left = document.getElementById('hero-floaters-left');
    const right = document.getElementById('hero-floaters-right');
    const legacy = document.getElementById('hero-floaters');

    if (left || right) {
      fillFloaters(left, FLOATERS.slice(0, 2), 0);
      fillFloaters(right, FLOATERS.slice(2, 4), 2);
      return;
    }

    fillFloaters(legacy, FLOATERS, 0);
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