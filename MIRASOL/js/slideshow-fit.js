/** Size slideshow frame to each photo — full image visible, no cropping. */
(function () {
  function fitViewport(viewport, slide) {
    if (!viewport || !slide) return;
    const img = slide.querySelector('img');
    if (!img) return;

    const apply = () => {
      requestAnimationFrame(() => {
        const h = slide.offsetHeight;
        if (h > 0) viewport.style.height = h + 'px';
      });
    };

    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener('load', apply, { once: true });
  }

  function preloadSlides(viewport, slides) {
    slides.forEach((slide) => {
      const img = slide.querySelector('img');
      if (!img) return;
      const onLoad = () => {
        if (slide.classList.contains('is-active')) fitViewport(viewport, slide);
      };
      if (img.complete && img.naturalWidth) onLoad();
      else img.addEventListener('load', onLoad, { once: true });
    });
  }

  function bindResize(viewport, slides) {
    let timer = null;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const active = slides.find((s) => s.classList.contains('is-active'));
        if (active) fitViewport(viewport, active);
      }, 120);
    });
  }

  window.SlideshowFit = {
    fitViewport,
    preloadSlides,
    bindResize,
  };
})();