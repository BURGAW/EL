/**
 * Bilingual UI — English by default; single button toggles Spanish on/off.
 */
(function () {
  const STORAGE_KEY = 'elmirasol-menu-lang';

  const UI = {
    en: {
      htmlLang: 'en',
      skip: 'Skip to menu',
      navHome: 'Home',
      navMenu: 'Menu',
      navCta: 'Visit Us',
      topbarFb: 'Follow us on Facebook',
      heroTitle: 'The Collection',
      heroSub: 'Breakfast, lunch & dinner \u2014 curated with the standards of a luxury house.',
      viewNavAria: 'Menu sections',
      viewBreakfast: 'Breakfast',
      viewDailyLunch: 'Daily Lunch',
      viewDinner: 'Dinner',
      heroBreakfast: 'Breakfast',
      heroBreakfastSub: 'Morning selections \u2014 eggs, burritos, chilaquiles & artisan plates.',
      heroDailyLunch: 'Daily Lunch',
      heroDailyLunchSub: '10 AM\u20133 PM \u2014 seasonal compositions, prepared fresh daily.',
      heroDinner: 'Dinner',
      heroDinnerSub: 'Signature tacos, birria, fajitas & platters \u2014 the evening collection.',
      callBtn: 'Call to Order',
      browseBtn: 'Jump to menu',
      catNavAria: 'Menu categories',
      featuredTag: 'Chef Favorites',
      featuredEm: 'Signature',
      featuredTitle: 'Dishes',
      orderFooterTitle: 'Ready to order?',
      orderFooterSub: 'Call us for takeout or dine in with us.',
      footerTag: 'Family-run Mexican grill \u2014 hard work, love for food, and community care in Burgaw, NC.',
      footerExplore: 'Explore',
      footerContact: 'Contact',
      footerHours: 'Hours',
      closedDay: 'Closed Tuesday',
      dirBtn: 'Directions',
      langToggleLabel: 'Espa\u00f1ol',
      langToggleAria: 'Switch to Spanish',
      orderBadge: 'Coming Soon',
      orderTitle: 'Online ordering soon',
      orderSub: 'Call (910) 789-1154 for takeout today.',
      orderBtn: 'Order Online',
      orderPickupHint: 'Pickup only · Closed Tuesdays',
      orderHint: 'Or call (910) 789-1154',
      orderAria: 'Online ordering',
      orderFooterAria: 'Order call to action',
      pageTitle: 'The Collection | MIRASOL',
      metaDesc: 'The MIRASOL menu \u2014 family-run Mexican grill with full prices. Burgaw, North Carolina.',
      menuFine: 'Prices subject to change. Call (910) 789-1154 to confirm availability.',
      photoStripAria: 'Photos from our kitchen',
      photoGridTitle: 'From the kitchen',
      modalClose: 'Close',
      cartBtn: 'Cart',
      cartQty: 'Quantity',
      addToCart: 'Add to Cart',
    },
    es: {
      htmlLang: 'es',
      skip: 'Ir al menú',
      navHome: 'Inicio',
      navMenu: 'Menú',
      navCta: 'Visítenos',
      topbarFb: 'Síguenos en Facebook',
      heroTitle: 'La Colecci\u00f3n',
      heroSub: 'Desayuno, almuerzo y cena \u2014 con los est\u00e1ndares de una casa de lujo.',
      viewNavAria: 'Secciones del men\u00fa',
      viewBreakfast: 'Desayuno',
      viewDailyLunch: 'Almuerzo del D\u00eda',
      viewDinner: 'Cena',
      heroBreakfast: 'Desayuno',
      heroBreakfastSub: 'Selecci\u00f3n matutina \u2014 huevos, burritos, chilaquiles y m\u00e1s.',
      heroDailyLunch: 'Almuerzo del D\u00eda',
      heroDailyLunchSub: '10 AM\u20133 PM \u2014 composiciones de temporada, frescas cada d\u00eda.',
      heroDinner: 'Cena',
      heroDinnerSub: 'Tacos, birria, fajitas y platillos insignia \u2014 la colecci\u00f3n de la noche.',
      callBtn: 'Llamar para ordenar',
      browseBtn: 'Ver menú',
      catNavAria: 'Categorías del menú',
      featuredTag: 'Favoritos',
      featuredEm: 'Platillos',
      featuredTitle: 'Insignia',
      orderFooterTitle: '¿Listo para ordenar?',
      orderFooterSub: 'Llámenos para llevar o visítenos.',
      footerTag: 'Restaurante familiar \u2014 trabajo, amor por la comida y cuidado de nuestra comunidad en Burgaw, NC.',
      footerExplore: 'Explorar',
      footerContact: 'Contacto',
      footerHours: 'Horario',
      closedDay: 'Cerrado los martes',
      dirBtn: 'Mapa',
      langToggleLabel: 'English',
      langToggleAria: 'Switch to English',
      orderBadge: 'Próximamente',
      orderTitle: 'Pedidos en línea pronto',
      orderSub: 'Llame al (910) 789-1154 para llevar hoy.',
      orderBtn: 'Ordenar en línea',
      orderPickupHint: 'Solo para llevar · Cerrado los martes',
      orderHint: 'O llame al (910) 789-1154',
      orderAria: 'Pedidos en línea',
      orderFooterAria: 'Llamado a la acción',
      pageTitle: 'La Colecci\u00f3n | MIRASOL',
      metaDesc: 'Men\u00fa MIRASOL con precios \u2014 restaurante familiar en Burgaw, Carolina del Norte.',
      menuFine: 'Los precios pueden cambiar. Llame al (910) 789-1154 para confirmar disponibilidad.',
      photoStripAria: 'Fotos de nuestra cocina',
      photoGridTitle: 'De la cocina',
      modalClose: 'Cerrar',
      cartBtn: 'Carrito',
      cartQty: 'Cantidad',
      addToCart: 'Agregar al carrito',
    },
  };

  function resolveInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('lang');
    if (q === 'es' || q === 'en') return q;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
    return 'en';
  }

  function updateLangButton(lang) {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    const strings = UI[lang] || UI.en;
    toggle.textContent = strings.langToggleLabel;
    toggle.setAttribute('aria-label', strings.langToggleAria);
    toggle.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
  }

  function applyUi(lang) {
    const strings = UI[lang] || UI.en;
    document.documentElement.lang = strings.htmlLang;
    document.title = strings.pageTitle;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', strings.metaDesc);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (strings[key] != null) el.textContent = strings[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (strings[key] != null) el.setAttribute('placeholder', strings[key]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (strings[key] != null) el.setAttribute('aria-label', strings[key]);
    });

    updateLangButton(lang);
    window.dispatchEvent(new CustomEvent('elmirasol:ui-applied', { detail: { lang } }));
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'es') return;
    window.MENU_LANG = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyUi(lang);
    window.dispatchEvent(new CustomEvent('elmirasol:lang-change', { detail: { lang } }));
  }

  function initToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      setLang(window.MENU_LANG === 'es' ? 'en' : 'es');
    });
  }

  const HERO_KEYS = {
    breakfast: ['heroBreakfast', 'heroBreakfastSub'],
    'daily-lunch': ['heroDailyLunch', 'heroDailyLunchSub'],
    dinner: ['heroDinner', 'heroDinnerSub'],
  };

  window.setMenuHero = function setMenuHero(view) {
    const v = HERO_KEYS[view] ? view : 'dinner';
    const strings = UI[window.MENU_LANG === 'es' ? 'es' : 'en'] || UI.en;
    const keys = HERO_KEYS[v];
    const h1 = document.getElementById('menu-hero-title');
    const sub = document.getElementById('menu-hero-sub');
    if (h1 && strings[keys[0]]) h1.textContent = strings[keys[0]];
    if (sub && strings[keys[1]]) sub.textContent = strings[keys[1]];
    window.MENU_VIEW = v;
  };

  function stripVisitNav() {
    if (!document.body.classList.contains('menu-page')) return;
    document.querySelectorAll('.header .nav a.nav-cta, .header .nav a[href*="#visit"], .header .nav a[href*="visit"]').forEach((link) => {
      link.remove();
    });
  }

  window.MENU_LANG = resolveInitialLang();
  document.addEventListener('DOMContentLoaded', () => {
    stripVisitNav();
    applyUi(window.MENU_LANG);
    initToggle();
    if (!window.MENU_VIEW) window.setMenuHero('dinner');
  });
})();