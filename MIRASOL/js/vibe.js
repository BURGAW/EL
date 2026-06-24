/**
 * El Mirasol vibe — single hero image, review carousel
 */
(function () {
  const HERO_IMAGE = 'assets/images/hero/el-mirasol-hero.jpg?v=hero2';

  function initHeroRotator() {
    const root = document.getElementById('hero-rotator');
    if (!root) return;

    const slide = root.querySelector('.hero-rotator__slide');
    if (slide) {
      slide.style.backgroundImage = `url('${HERO_IMAGE}')`;
      slide.classList.add('is-active');
      return;
    }

    root.innerHTML =
      `<div class="hero-rotator__slide is-active" style="background-image:url('${HERO_IMAGE}')" role="img" aria-label="Seasoned shrimp platter at El Mirasol"></div>`;
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