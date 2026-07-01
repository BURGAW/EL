/**
 * Guest reviews — all Google reviews rated 4+ stars (see google-reviews-data.js).
 */
(function () {
  function getGoogle() {
    return window.SITE_CONFIG?.google || {};
  }

  function getMinRating() {
    const g = getGoogle();
    return typeof g.minRating === 'number' ? g.minRating : 4;
  }

  function cleanText(text) {
    return String(text || '')
      .replace(/\s+\d\s*$/, '')
      .replace(/\s*Â·\s*/g, ' · ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getReviews() {
    const minRating = getMinRating();
    const pool = window.GOOGLE_REVIEWS_DATA?.length
      ? window.GOOGLE_REVIEWS_DATA
      : window.SITE_CONFIG?.reviews || [];
    return pool
      .filter((r) => (r.rating ?? 5) >= minRating)
      .map((r) => ({ ...r, text: cleanText(r.text) }))
      .filter((r) => r.text);
  }

  function starsFor(rating) {
    const n = Math.max(0, Math.min(5, Math.round(Number(rating) || 5)));
    const filled = '★'.repeat(n);
    const empty = '☆'.repeat(5 - n);
    return `<span class="review-stars" aria-label="${n} out of 5 stars">${filled}${empty}</span>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function reviewCard(review) {
    const name = review.name
      ? `<cite class="review-card__name review-card__name--head">${escapeHtml(review.name)}</cite>`
      : '';
    return (
      `<article class="review-card">` +
      `<div class="review-card__top">${starsFor(review.rating)}${name}</div>` +
      `<blockquote class="review-card__quote">&ldquo;${escapeHtml(review.text)}&rdquo;</blockquote>` +
      `</article>`
    );
  }

  function renderHomeReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid || grid.dataset.rendered === '1') return;
    const reviews = getReviews();
    grid.innerHTML = reviews.map(reviewCard).join('');
    grid.dataset.rendered = '1';
    grid.dataset.loadedCount = String(reviews.length);
  }

  function renderHomeReviewsCarousel() {
    const wrap = document.getElementById('reviews-carousel-wrap');
    if (!wrap || wrap.dataset.rendered === '1') return;
    const reviews = getReviews();
    if (!reviews.length) return;
    const track = reviews.concat(reviews).map(reviewCard).join('');
    wrap.innerHTML = `<div class="reviews-carousel__track">${track}</div>`;
    wrap.dataset.rendered = '1';
  }

  function renderMenuReviews() {
    const strip = document.getElementById('menu-reviews-strip');
    if (!strip || strip.dataset.rendered === '1') return;
    strip.dataset.rendered = '1';
    const g = getGoogle();
    const rating = g.rating || '4.8';
    const count = g.reviewCount ? `${g.reviewCount} Google reviews` : 'Google reviews';
    strip.innerHTML =
      `<p class="menu-reviews-strip__line">` +
      `<strong>${rating}</strong> ★ · ${count}` +
      `</p>`;
  }

  function updateReviewStats() {
    const g = getGoogle();
    const shown = getReviews().length;
    document.querySelectorAll('[data-review-rating]').forEach((el) => {
      el.textContent = String(g.rating || '4.8');
    });
    document.querySelectorAll('[data-review-count]:not(#reviews-grid)').forEach((el) => {
      el.textContent = String(g.reviewCount || '124');
    });
    document.querySelectorAll('[data-fb-rating]').forEach((el) => {
      el.textContent = String(g.facebookRating || '4.7');
    });
    document.querySelectorAll('[data-reviews-shown]').forEach((el) => {
      el.textContent = String(shown);
    });
  }

  function init() {
    renderHomeReviews();
    renderHomeReviewsCarousel();
    renderMenuReviews();
    updateReviewStats();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ElMirasolReviews = {
    init,
    getReviews,
    getMinRating,
    renderHomeReviews,
    renderHomeReviewsCarousel,
    renderMenuReviews,
    updateReviewStats,
  };
})();