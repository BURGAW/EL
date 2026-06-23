/**
 * El Mirasol — site & commerce configuration
 * Flip ordering.enabled to true when you connect a provider below.
 */
window.SITE_CONFIG = {
  brand: {
    name: 'MIRASOL',
    tagline: 'BURGAW',
    location: 'Burgaw, NC',
    phone: '(910) 789-1154',
    phoneTel: '9107891154',
    logo: 'assets/images/facebook/logo.jpg?v=brand1',
  },

  ordering: {
    enabled: true,

    /**
     * native = MIRASOL menu + cart on this site (what guests see now).
     * clover + useStorefront = send guests to Clover's hosted store (off by default).
     */
    provider: 'native',

    /** Pickup only — no delivery on this site */
    pickupOnly: true,

    orderUrl: '',

    /**
     * Clover POS — kitchen sync later via API backend (not the cloveronline.com storefront).
     * useStorefront: false keeps guests on MIRASOL; set true only if you want Clover's ordering page.
     */
    clover: {
      merchantId: '0BQTHJMTQ5MP1',
      storeUrl: 'https://el-mirasol-burgaw.cloveronline.com/',
      pickupOnly: true,
      useStorefront: false,
      openIn: 'tab',
      /**
       * Kitchen Station Duo only — tickets route here, not the front register.
       * serial = label on device; deviceId = Clover UUID from Dashboard → Devices (for API print target).
       */
      kitchenDevice: {
        role: 'kitchen',
        model: 'Station Duo (WiFi)',
        serial: 'C153UQ22840459',
        deviceId: '',
      },
      /**
       * Future: small server posts cart → Clover Orders API (needs merchant API token on server only).
       * baseUrl: 'https://your-api.example.com'
       */
      api: {
        baseUrl: '',
        submitPath: '/v1/orders/pickup',
      },
    },

    payment: {
      provider: 'stripe',
      publishableKey: '',
    },

    comingSoonLabel: 'Order from our menu',
    comingSoonSub: 'Build your cart here — pickup only. Call to confirm your order.',

    fulfillment: ['pickup'],

    pickupEta: { min: 8, max: 14 },

    taxRate: 0.0675,
  },

  menu: {
    priceYear: 2026,
    currency: 'USD',
    /** false = hide modifier/customization UI until groups are complete */
    customizationEnabled: false,
  },

  /** FIFA World Cup 2026 — watch party hub (set enabled: false after the tournament) */
  worldCup: {
    enabled: true,
    flags: ['mx', 'us', 'ca', 'br', 'ar', 'co', 'es', 'fr', 'de'],
    hostFlags: ['mx', 'us', 'ca'],
    promo: 'World Cup 2026 — <strong>matches on our TVs</strong>',
    promoEs: 'Copa 2026 — <strong>partidos en nuestras pantallas</strong>',
    promoSub: 'Host nations',
    promoSubEs: 'Países anfitriones',
    showBunting: false,
    showMenuHint: false,
    ribbonSpecial: 'World Cup 2026 — we\'ll keep the scores on screen',
    ribbonSpecialEs: 'Copa 2026 — llevamos el marcador en pantalla',
    menuHint: 'World Cup 2026 — catch the matches here',
    menuHintEs: 'Copa 2026 — partidos en nuestras pantallas',
  },

  /**
   * Fiesta stamp card — Clover customer account (name, phone, username, password).
   * 1. Set clover.api.baseUrl to your server (never put Clover API secrets in this file).
   * 2. Server creates Clover customers and handles login.
   * 3. Set enabled: true when checkout + stamp earning is live.
   */
  loyalty: {
    stampCard: {
      provider: 'clover',

      /** false = Fiesta Pass hidden off-site; set true when Clover checkout + stamps are live */
      enabled: false,

      stampOnPurchase: true,
      stampsPerReward: 5,
      oneStampPerOrderDay: true,

      clover: {
        /** Your Clover merchant ID */
        merchantId: '',

        /**
         * Backend proxy — example payloads your server should accept:
         * POST registerPath { name, phone, username, password, merchantId }
         * POST loginPath    { username, password, merchantId }
         * GET  sessionPath  → { accountId, cloverCustomerId, name, phone, username }
         * GET  stampsPath   → { stamps, lastOrderDay, redeemedPending }
         * POST stampPath    { accountId, cloverCustomerId, orderId, purchasedAt }
         * POST redeemPath   → resets card after free dessert
         */
        api: {
          baseUrl: '',
          registerPath: '/v1/clover/customers/register',
          loginPath: '/v1/clover/customers/login',
          sessionPath: '/v1/clover/customers/me',
          stampsPath: '/v1/clover/loyalty/stamps',
          stampPath: '/v1/clover/loyalty/stamps/earn',
          redeemPath: '/v1/clover/loyalty/stamps/redeem',
        },
      },
    },
  },

  google: {
    /** Opens Google Maps listing — tap “Write a review” on the listing */
    reviewUrl: 'https://www.google.com/maps?cid=9919601015129450221',
    rating: 4.8,
    reviewCount: 124,
    /** Only show guest reviews at or above this star count */
    minRating: 4,
    facebookRating: 4.7,
    facebookCount: 47,
  },

  /**
   * Google Sites embed — Insert → Embed → By URL:
   *   Home: https://YOUR-SITE/index.html?embed=1
   *   Menu: https://YOUR-SITE/menu.html?embed=1
   * Width: 100%. Suggested iframe height:
   *   Phone: 820px (home) / 960px (menu)
   *   Tablet/desktop: 900px (home) / 1100px (menu)
   * Internal Home ↔ Menu links keep ?embed=1 automatically in iframe.
   */
  embed: {
    param: 'embed',
    hideTopbar: true,
    hideMobileCta: true,
    suggestedHeights: {
      home: { mobile: 820, desktop: 900 },
      menu: { mobile: 960, desktop: 1100 },
    },
  },

  /** Site map — activeId selects which location pin/embed to show */
  map: {
    activeId: 'el-mirasol',
    /**
     * Zoom 17, north offset: southern edge stays above Burgaw Milling (305)
     * even when the sidebar map stretches tall. El Mirasol cid only.
     */
    center: { lat: 34.553, lng: -77.913414 },
    zoom: 17,
    locations: [
      {
        id: 'el-mirasol',
        name: 'MIRASOL BURGAW',
        shortLabel: 'MIRASOL',
        cid: '9919601015129450221',
        lat: 34.551919,
        lng: -77.913414,
        address: '211 U.S. Hwy 117 S, Burgaw, NC 28425',
      },
      {
        id: 'bnk-general-store',
        name: 'B & K General Store',
        shortLabel: 'B & K General Store',
        lat: 34.55029,
        lng: -77.91306,
        address: '315 U.S. Hwy 117 S, Burgaw, NC 28425',
        mapsUrl: 'https://www.google.com/maps/search/B+%26+K+General+Store+315+US+Highway+117+S+Burgaw+NC',
      },
    ],
    areaPromos: {
      enabled: false,
    },
  },

  /**
   * Fallback if google-reviews-data.js is missing — primary source is GOOGLE_REVIEWS_DATA.
   * Refresh full set: scripts/fetch-google-reviews.ps1
   */
  reviews: [],
};

/** Random pickup ETA within ordering.pickupEta min–max (stable per browser session). */
window.SITE_CONFIG.getRandomPickupMinutes = function getRandomPickupMinutes(opts) {
  const eta = (opts && opts.eta) || window.SITE_CONFIG.ordering?.pickupEta || {};
  const min = Math.max(1, parseInt(eta.min, 10) || 8);
  const max = Math.max(min, parseInt(eta.max, 10) || 14);
  const storageKey = (opts && opts.storageKey) || 'elmirasol:pickup-eta-min';

  if (!opts || opts.stable !== false) {
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const n = parseInt(stored, 10);
        if (n >= min && n <= max) return n;
      }
    } catch (_) {
      /* ignore */
    }
  }

  const minutes = Math.floor(Math.random() * (max - min + 1)) + min;

  if (!opts || opts.stable !== false) {
    try {
      sessionStorage.setItem(storageKey, String(minutes));
    } catch (_) {
      /* ignore */
    }
  }

  return minutes;
};