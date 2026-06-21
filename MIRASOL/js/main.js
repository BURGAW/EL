const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

let navBackdrop = document.querySelector('.nav-backdrop');
if (!navBackdrop) {
  navBackdrop = document.createElement('div');
  navBackdrop.className = 'nav-backdrop';
  navBackdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(navBackdrop);
}

function setNavOpen(open) {
  nav?.classList.toggle('open', open);
  menuBtn?.classList.toggle('open', open);
  navBackdrop?.classList.toggle('open', open);
  menuBtn?.setAttribute('aria-expanded', open);
  menuBtn?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('nav-open', open);
}

menuBtn?.addEventListener('click', () => {
  setNavOpen(!nav?.classList.contains('open'));
});

navBackdrop?.addEventListener('click', () => setNavOpen(false));

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setNavOpen(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) setNavOpen(false);
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

if (document.querySelector('.mobile-cta')) {
  document.body.classList.add('has-mobile-cta');
}

function initReveal() {
  const foldLine = window.innerHeight * 0.88;
  document.querySelectorAll('.reveal').forEach((el) => {
    const show = () => {
      el.classList.add('visible');
      el.classList.remove('reveal--pending');
    };
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top >= foldLine;
    if (!belowFold) {
      show();
      return;
    }
    el.classList.add('reveal--pending');
    if (!('IntersectionObserver' in window)) {
      show();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    observer.observe(el);
  });
}

initReveal();

function markUiStable() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('ui-stable');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', markUiStable);
} else {
  markUiStable();
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox?.classList.remove('open');
  if (!nav?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
  if (lightboxImg) lightboxImg.src = '';
}

document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function bindGalleryLightbox(selector) {
  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.gallery-slideshow__btn, .gallery-slideshow__dot')) return;
      const img = card.querySelector('img');
      openLightbox(card.dataset.full, img?.alt || '');
    });
  });
}

bindGalleryLightbox('.photo-card[data-full]');
bindGalleryLightbox('.gallery-slide[data-full]');

function escapeGalleryHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildKitchenGallery() {
  const items = window.SITE_PHOTOS?.gallery;
  const root = document.getElementById('photo-gallery');
  const viewport = root?.querySelector('.gallery-slideshow__viewport');
  if (!items?.length || !viewport) return;

  const nav =
    viewport.querySelector('.gallery-slideshow__btn--prev')?.outerHTML +
    (viewport.querySelector('.gallery-slideshow__btn--next')?.outerHTML || '');

  viewport.innerHTML =
    items
      .map(
        (p, i) =>
          `<figure class="gallery-slide${i === 0 ? ' is-active' : ''}" data-full="${escapeGalleryHtml(p.src)}">` +
          `<img src="${escapeGalleryHtml(p.src)}" alt="${escapeGalleryHtml(p.alt)}" loading="${i === 0 ? 'eager' : 'lazy'}">` +
          `<figcaption>${escapeGalleryHtml(p.caption || p.alt)}</figcaption></figure>`
      )
      .join('') + nav;
}

function initGallerySlideshow() {
  buildKitchenGallery();

  const root = document.getElementById('photo-gallery');
  if (!root?.classList.contains('gallery-slideshow')) return;

  const slides = [...root.querySelectorAll('.gallery-slide')];
  const prevBtn = root.querySelector('.gallery-slideshow__btn--prev');
  const nextBtn = root.querySelector('.gallery-slideshow__btn--next');
  const dotsWrap = root.querySelector('.gallery-slideshow__dots');
  const countEl = document.getElementById('gallery-slide-count');
  if (!slides.length || !dotsWrap) return;

  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if (index < 0) index = 0;

  let timer = null;
  const delay = 5500;

  dotsWrap.innerHTML = slides
    .map(
      (_, i) =>
        `<button type="button" class="gallery-slideshow__dot${i === index ? ' is-active' : ''}" role="tab" aria-label="Photo ${i + 1}" aria-selected="${i === index ? 'true' : 'false'}"></button>`
    )
    .join('');

  const dots = [...dotsWrap.querySelectorAll('.gallery-slideshow__dot')];
  const viewport = root.querySelector('.gallery-slideshow__viewport');
  const fit = window.SlideshowFit;

  if (viewport && fit) {
    fit.preloadSlides(viewport, slides);
    fit.bindResize(viewport, slides);
  }

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    if (countEl) countEl.textContent = `${index + 1} / ${slides.length}`;
    if (viewport && fit) fit.fitViewport(viewport, slides[index]);
  }

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, delay);
  }

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    prev();
    startAuto();
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    next();
    startAuto();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      show(i);
      startAuto();
    });
  });

  root.addEventListener('mouseenter', stopAuto);
  root.addEventListener('mouseleave', startAuto);
  root.addEventListener('focusin', stopAuto);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) startAuto();
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
      startAuto();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
      startAuto();
    }
  });

  let touchX = null;
  root.addEventListener(
    'touchstart',
    (e) => {
      touchX = e.changedTouches[0]?.clientX ?? null;
    },
    { passive: true }
  );
  root.addEventListener(
    'touchend',
    (e) => {
      if (touchX == null) return;
      const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
      touchX = null;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) next();
      else prev();
      startAuto();
    },
    { passive: true }
  );

  show(index);
  startAuto();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallerySlideshow);
} else {
  initGallerySlideshow();
}

function renderFollowBandPhotos() {
  const container = document.getElementById('follow-band-photos');
  const photos = window.SITE_PHOTOS?.followBand;
  if (!container || !photos?.length) return;
  container.innerHTML = photos
    .map(
      (p) =>
        `<a href="https://www.facebook.com/elmirasolburgaw/" target="_blank" rel="noopener noreferrer">` +
        `<img src="${p.src}" alt="${p.alt}" loading="lazy" width="200" height="200"></a>`
    )
    .join('');
}

renderFollowBandPhotos();

const GOOGLE_G_SVG =
  '<svg class="google-review-tab__icon" viewBox="0 0 24 24" aria-hidden="true">' +
  '<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>' +
  '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>' +
  '<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>' +
  '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>' +
  '</svg>';

function googleReviewCopy() {
  const isEs = document.documentElement.lang === 'es' || window.MENU_LANG === 'es';
  return {
    label: isEs ? 'Reseña' : 'Review',
    labelLong: isEs ? 'Reseña en Google' : 'Review on Google',
    aria: isEs ? 'Dejar una reseña en Google' : 'Leave us a Google review',
    title: isEs ? '4.8 estrellas en Google — toque para reseñar' : '4.8 stars on Google — tap to leave a review',
  };
}

function initGoogleReviewTab() {
  if (document.body.hasAttribute('data-no-review-tab')) return;

  const url = window.SITE_CONFIG?.google?.reviewUrl;
  if (!url) return;

  let tab = document.getElementById('google-review-tab');
  if (!tab) {
    tab = document.createElement('a');
    tab.id = 'google-review-tab';
    tab.className = 'google-review-tab';
    tab.href = url;
    tab.target = '_blank';
    tab.rel = 'noopener noreferrer';
    document.body.appendChild(tab);
  } else {
    tab.href = url;
  }

  const rating = window.SITE_CONFIG?.google?.rating;
  const copy = googleReviewCopy();
  const titleRating = rating ? `${rating}★` : '';
  tab.setAttribute('aria-label', copy.aria);
  tab.title = titleRating ? copy.title.replace('4.8', String(rating)) : copy.labelLong;
  const ratingHtml = rating
    ? `<span class="google-review-tab__rating"><span class="google-review-tab__num">${rating}</span><span class="google-review-tab__star" aria-hidden="true">★</span></span>`
    : '';
  const labelHtml = `<span class="google-review-tab__text">${copy.label}</span>`;
  tab.innerHTML = GOOGLE_G_SVG + ratingHtml + labelHtml;
}

initGoogleReviewTab();
window.addEventListener('elmirasol:lang-change', initGoogleReviewTab);
window.addEventListener('elmirasol:ui-applied', initGoogleReviewTab);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});