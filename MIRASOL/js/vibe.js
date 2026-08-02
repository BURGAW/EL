/**
 * El Mirasol vibe — single hero image (polaroids removed)
 */
(function () {
  const HERO_IMAGE = 'assets/images/hero/el-mirasol-hero.jpg?v=storefront1';
  const HERO_POSITION = 'center 58%';
  const HERO_SIZE = '90% auto';

  function initHeroRotator() {
    const root = document.getElementById('hero-rotator');
    if (!root) return;

    root.innerHTML =
      `<div class="hero-rotator__slide is-active" style="background-image:url('${HERO_IMAGE}');background-position:${HERO_POSITION};background-size:${HERO_SIZE}" role="img" aria-label="El Mirasol Mexican Restaurant storefront at dusk in Burgaw, NC"></div>`;
  }

  function init() {
    initHeroRotator();
    window.ElMirasolReviews?.updateReviewStats?.();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();