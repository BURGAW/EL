/**
 * El Mirasol — visit map embed with Map / Satellite toggle
 */
(function () {
  const MAP_TYPES = {
    roadmap: { t: 'm', useCid: true },
    satellite: { t: 'k', useCid: false },
  };

  let currentMapType = 'roadmap';

  function cfg() {
    return window.SITE_CONFIG?.map || {};
  }

  function activeLocation() {
    const c = cfg();
    const locations = c.locations || [];
    const activeId = c.activeId || locations[0]?.id;
    return locations.find((loc) => loc.id === activeId) || locations[0] || null;
  }

  function featuredLocation() {
    const c = cfg();
    const locations = c.locations || [];
    const featureId = c.featureId;
    if (!featureId) return null;
    return locations.find((loc) => loc.id === featureId) || null;
  }

  function mapCenter(loc) {
    const c = cfg();
    if (c.center?.lat != null && c.center?.lng != null) return c.center;
    if (loc) return { lat: loc.lat, lng: loc.lng };
    return null;
  }

  function mapZoom(loc) {
    const c = cfg();
    return c.zoom ?? loc?.zoom ?? 15;
  }

  function buildEmbedUrl(loc, mapType) {
    const type = MAP_TYPES[mapType] || MAP_TYPES.roadmap;
    const center = mapCenter(loc);
    if (!loc || !center) return '';

    const zoom = mapZoom(loc);
    const featured = featuredLocation();
    const params = new URLSearchParams({
      ll: `${center.lat},${center.lng}`,
      z: String(zoom),
      hl: 'en',
      output: 'embed',
      t: type.t,
    });

    if (type.useCid && loc.cid) {
      params.set('cid', loc.cid);
    } else if (featured) {
      params.set('q', `${featured.name}, ${featured.address}`);
    } else {
      params.set('q', loc.address || `${loc.lat},${loc.lng}`);
    }

    return `https://maps.google.com/maps?${params.toString()}`;
  }

  function buildDirectionsUrl(loc) {
    if (!loc) return '#';
    if (loc.cid) {
      return `https://www.google.com/maps/dir/?api=1&destination_place_id=&destination=${encodeURIComponent(loc.address)}&destination_cid=${loc.cid}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
  }

  function setMapType(mapType) {
    if (!MAP_TYPES[mapType]) return;
    currentMapType = mapType;

    const wrap = document.getElementById('site-map');
    wrap?.querySelectorAll('[data-map-type]').forEach((btn) => {
      const active = btn.dataset.mapType === mapType;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    initMapEmbed();
  }

  function initMapTypeToggle() {
    const wrap = document.getElementById('site-map');
    if (!wrap) return;

    wrap.querySelectorAll('[data-map-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.mapType;
        if (next && next !== currentMapType) setMapType(next);
      });
    });
  }

  function initMapEmbed() {
    const loc = activeLocation();
    const iframe = document.getElementById('site-map-iframe');
    if (!iframe || !loc) return;

    const url = buildEmbedUrl(loc, currentMapType);
    if (url) iframe.src = url;
    iframe.title = `${loc.name} on Google Maps`;

    document.querySelectorAll('[data-map-directions]').forEach((el) => {
      el.href = buildDirectionsUrl(loc);
    });
  }

  function init() {
    const defaultType = cfg().defaultType;
    if (defaultType && MAP_TYPES[defaultType]) currentMapType = defaultType;
    initMapTypeToggle();
    initMapEmbed();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ElMirasolMap = { init, activeLocation, buildEmbedUrl, setMapType };
})();