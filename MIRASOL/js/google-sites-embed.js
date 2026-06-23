/**
 * Google Sites embed mode — auto-detect iframe / ?embed=1 and tune layout.
 * Tuned for iPhone (Safari), Android (Chrome/Samsung Internet), and narrow iframes.
 */
(function () {
  const EMBED_PARAM = 'embed';

  function isEmbedRequest() {
    try {
      if (/[?&](embed|gsites)(=1)?(?=&|$)/i.test(window.location.search)) return true;
    } catch (e) { /* ignore */ }
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function markEmbed() {
    document.documentElement.classList.add('gsites-embed');
    if (document.body) document.body.classList.add('gsites-embed');
  }

  function stripEmbedChrome(body) {
    body.classList.remove('has-topbar', 'has-mobile-cta');
  }

  function preserveEmbedLinks() {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
      if (link.target && link.target !== '_self') return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          return;
        }

        const page = url.pathname.split('/').pop() || '';
        const isInternalPage =
          page === '' ||
          page === 'index.html' ||
          page === 'menu.html' ||
          /\.html$/i.test(page);

        if (!isInternalPage) return;
        if (url.searchParams.has('embed') || url.searchParams.has('gsites')) return;

        url.searchParams.set(EMBED_PARAM, '1');
        link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
      } catch (e) { /* ignore */ }
    });
  }

  function enablePageScroll() {
    const html = document.documentElement;
    const body = document.body;
    if (!body) return;
    html.style.overflowY = 'auto';
    html.style.height = 'auto';
    body.style.overflowY = 'auto';
    body.style.height = 'auto';
    body.style.minHeight = '0';
    body.classList.remove('nav-open', 'roulette-open');
    const tuesdayOpen = document.getElementById('tuesday-closed-modal')?.classList.contains('is-open');
    const cloverOpen = document.getElementById('clover-order-modal')?.classList.contains('is-open');
    if (!tuesdayOpen && !cloverOpen) {
      body.classList.remove('modal-open', 'tuesday-modal-open', 'clover-order-open');
    }
    body.style.overflow = '';
  }

  function tuneBody() {
    if (!document.documentElement.classList.contains('gsites-embed')) return;
    const body = document.body;
    if (!body) return;

    body.classList.add('gsites-embed');
    stripEmbedChrome(body);
    preserveEmbedLinks();
    enablePageScroll();
  }

  if (isEmbedRequest()) {
    markEmbed();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tuneBody);
    } else {
      tuneBody();
    }
    window.addEventListener('load', tuneBody);
  }

  window.ElMirasolEmbed = { isEmbedRequest, tuneBody, preserveEmbedLinks };
})();