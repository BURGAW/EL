/** Facebook homepage photos + iPhone menu photos */
(function () {
  const FB_V = '?v=itemphoto3';
  const MENU_V = '?v=itemphoto3';

  function fb(file) {
    return 'assets/images/facebook/' + file + FB_V;
  }

  function menu(file) {
    return 'assets/images/menu/' + file + '.jpg' + MENU_V;
  }

  window.SITE_PHOTOS = {
    version: MENU_V,

    /** Homepage “From Our Kitchen” slideshow — one photo per dish, no angle duplicates */
    gallery: [
      { src: fb('pozole.jpg'), alt: 'Bowl of pozole with hominy and pork', caption: 'Pozole' },
      { src: fb('nachos.jpg'), alt: 'Chicken nachos with queso and fresh toppings', caption: 'Chicken Nachos' },
      { src: fb('menudo.jpg'), alt: 'Bowls of menudo with cilantro, onion, and lime', caption: 'Menudo' },
      { src: menu('IMG_2876'), alt: 'Sizzling mixed fajitas in a cast-iron skillet', caption: 'Sizzling Fajitas' },
      { src: menu('IMG_1512'), alt: 'Steak and shrimp combo platters', caption: 'Combo Platters' },
      { src: menu('IMG_1902'), alt: 'Tacos and enchiladas verde', caption: 'Tacos & Enchiladas' },
      { src: menu('IMG_0399'), alt: 'Mexican street corn in a to-go container', caption: 'Street Corn' },
      { src: menu('IMG_2751'), alt: 'Shrimp cocktail with avocado and tortilla chips', caption: 'Shrimp Cocktail' },
      { src: fb('shrimp-plate.jpg'), alt: 'Seasoned shrimp plate with rice, beans, and avocado', caption: 'Shrimp Plate' },
      { src: menu('IMG_0065'), alt: 'Seafood caldo with crab and shrimp', caption: 'Seafood Caldo' },
      { src: menu('IMG_0335'), alt: 'Enchiladas verdes, tacos, and flautas', caption: 'Lunch Favorites' },
      { src: menu('IMG_1031'), alt: 'Tray of fresh tamales', caption: 'Tamales' },
      { src: fb('margarita-pineapple.jpg'), alt: 'Pineapple margaritas with chili-lime rim', caption: 'Pineapple Margaritas' },
      { src: menu('IMG_2973'), alt: 'Strawberry margarita at the bar', caption: 'Strawberry Margarita' },
      { src: fb('beers.jpg'), alt: 'Mexican beers including Corona, Victoria, and Modelo', caption: 'Mexican Beers' },
      { src: menu('IMG_2920'), alt: 'Torta on a wooden table', caption: 'Torta' },
      { src: fb('fb-1536624234924037.jpg'), alt: 'Seasoned shrimp with rice and beans', caption: 'Shrimp Combo' },
      { src: menu('IMG_1585'), alt: 'Toasted breakfast sandwich', caption: 'Breakfast Sandwich' },
      { src: menu('IMG_2860'), alt: 'Omelette with avocado and pico de gallo', caption: 'Breakfast Omelette' },
      { src: menu('IMG_1958'), alt: 'Strawberry margarita at the bar', caption: 'Bar Margarita' },
      { src: menu('IMG_0440'), alt: 'Takeout combo plate', caption: 'Combo To-Go' },
    ],

    followBand: [
      { src: fb('nachos.jpg'), alt: 'Chicken nachos with queso' },
      { src: fb('pozole.jpg'), alt: 'Bowl of pozole' },
      { src: menu('IMG_2876'), alt: 'Sizzling fajitas' },
      { src: menu('IMG_0399'), alt: 'Mexican street corn' },
      { src: fb('shrimp-plate.jpg'), alt: 'Seasoned shrimp plate' },
      { src: fb('beers.jpg'), alt: 'Mexican beers' },
    ],

    menuStrip: {
      breakfast: [
        { src: menu('IMG_2915'), alt: 'Breakfast sandwich' },
        { src: menu('IMG_2920'), alt: 'Breakfast plate' },
        { src: menu('IMG_2865'), alt: 'Breakfast at MIRASOL' },
        { src: menu('IMG_1578'), alt: 'Morning plate' },
        { src: menu('IMG_1585'), alt: 'Toasted sandwich' },
        { src: menu('IMG_2920'), alt: 'Torta' },
      ],
      'daily-lunch': [],
      dinner: [
        { src: menu('IMG_1512'), alt: 'Combo platters' },
        { src: menu('IMG_2876'), alt: 'Sizzling fajitas' },
        { src: menu('IMG_2751'), alt: 'Shrimp cocktail' },
        { src: menu('IMG_0065'), alt: 'Seafood caldo' },
        { src: menu('IMG_1541'), alt: 'Dinner plate' },
        { src: menu('IMG_2973'), alt: 'Margarita at the bar' },
      ],
    },

    /** Menu page — one spotlight photo per category (matches section id) */
    categorySpotlight: {
      breakfast: { src: menu('IMG_2860'), alt: 'Omelette with avocado and pico de gallo' },
      'daily-lunch': null,
      appetizers: { src: menu('IMG_0399'), alt: 'Mexican street corn' },
      tacos: { src: menu('IMG_0335'), alt: 'Birria tacos with consommé' },
      burritos: { src: menu('IMG_1670'), alt: 'Burrito plate with rice and queso' },
      chimichangas: { src: menu('IMG_0440'), alt: 'Chimichanga with rice and beans' },
      quesadillas: { src: menu('IMG_1964'), alt: 'Quesadilla with fresh salad' },
      tortas: { src: menu('IMG_2920'), alt: 'Torta on a wooden table' },
      fajitas: { src: menu('IMG_2876'), alt: 'Sizzling mixed fajitas in cast iron' },
      enchiladas: { src: menu('IMG_1902'), alt: 'Tacos and enchiladas verde' },
      platters: { src: menu('IMG_1512'), alt: 'Steak and shrimp combo platters' },
      kids: { src: menu('IMG_1541'), alt: 'Carne asada plate with rice and queso' },
      broths: { src: fb('menudo.jpg'), alt: 'Bowls of menudo with garnishes' },
      desserts: { src: fb('pozole.jpg'), alt: 'Bowl of pozole' },
      alcohol: {
        src: fb('margarita-pineapple.jpg'),
        alt: 'Pineapple margaritas and Mexican beers at the bar',
      },
    },

    desserts: [
      { src: fb('margarita-pineapple.jpg'), alt: 'Pineapple margaritas' },
      { src: menu('IMG_2973'), alt: 'Strawberry margarita' },
      { src: fb('shrimp-cocktail.jpg'), alt: 'Shrimp cocktail' },
      { src: fb('nachos.jpg'), alt: 'Nachos with queso' },
      { src: fb('beers.jpg'), alt: 'Mexican beers' },
    ],
  };

  function normalizeName(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function photoKey(sectionId, name) {
    return `${sectionId}|${normalizeName(name)}`;
  }

  /** IMG_1902 is a two-plate shot — crop left (tacos) or right (enchiladas) */
  const PLATE_1902 = menu('IMG_1902');
  function plate1902(side, alt) {
    return { src: PLATE_1902, alt, crop: side };
  }

  /**
   * Verified item photos only — no category guesses or rotation.
   * If a dish is not listed here, the modal shows description only.
   */
  const itemPhotos = {
    /* breakfast */
    [photoKey('breakfast', 'Carne Asada con Huevo')]: { src: menu('IMG_1541'), alt: 'Carne asada with eggs' },
    [photoKey('breakfast', 'Chilaquiles en Salsa Verde')]: { src: menu('IMG_0335'), alt: 'Chilaquiles in green salsa' },
    [photoKey('breakfast', 'Strawberry Pancakes')]: { src: menu('IMG_2865'), alt: 'Strawberry pancakes' },
    [photoKey('breakfast', 'Bacon & Eggs')]: { src: menu('IMG_1585'), alt: 'Bacon and eggs' },

    /* daily lunch — no photos yet; modal shows description only */

    /* appetizers */
    [photoKey('appetizers', 'Esquite')]: { src: menu('IMG_0399'), alt: 'Esquite cup' },
    [photoKey('appetizers', 'Street Corn')]: { src: menu('IMG_0399'), alt: 'Mexican street corn' },
    [photoKey('appetizers', 'Elote')]: { src: menu('IMG_0399'), alt: 'Elote' },
    [photoKey('appetizers', 'Tamales')]: { src: menu('IMG_1031'), alt: 'Fresh tamales' },

    /* tacos */
    [photoKey('tacos', 'Birria Tacos')]: { src: menu('IMG_0335'), alt: 'Birria tacos with consommé' },
    [photoKey('tacos', 'Tacos de Birria')]: { src: menu('IMG_0335'), alt: 'Tacos de birria con consomé' },
    [photoKey('tacos', 'Chicken Birria Tacos')]: { src: menu('IMG_0335'), alt: 'Chicken birria tacos' },
    [photoKey('tacos', 'Tacos de Birria de Pollo')]: { src: menu('IMG_0335'), alt: 'Tacos de birria de pollo' },
    [photoKey('tacos', 'Shrimp Tacos')]: { src: fb('shrimp-plate.jpg'), alt: 'Shrimp tacos' },
    [photoKey('tacos', 'Tacos de Camarones')]: { src: fb('shrimp-plate.jpg'), alt: 'Tacos de camarones' },
    [photoKey('tacos', 'Tacos Albañil')]: plate1902('left', 'Tacos albañil with chorizo and eggs'),
    [photoKey('tacos', 'Tacos Albanil')]: plate1902('left', 'Tacos albañil with chorizo and eggs'),

    /* burritos */
    [photoKey('burritos', 'Burrito Meal')]: { src: menu('IMG_1670'), alt: 'Burrito plate' },
    [photoKey('burritos', 'Shrimp Burrito')]: { src: menu('IMG_1670'), alt: 'Shrimp burrito' },
    [photoKey('burritos', 'Burrito de Camarones')]: { src: menu('IMG_1670'), alt: 'Burrito de camarones' },

    /* chimichangas */
    [photoKey('chimichangas', 'Chimichanga Meal')]: { src: menu('IMG_0440'), alt: 'Chimichanga plate' },
    [photoKey('chimichangas', 'Shrimp Chimichanga')]: { src: menu('IMG_0440'), alt: 'Shrimp chimichanga' },
    [photoKey('chimichangas', 'Chimichanga de Camarones')]: { src: menu('IMG_0440'), alt: 'Chimichanga de camarones' },

    /* quesadillas */
    [photoKey('quesadillas', 'Quesadilla Meal')]: { src: menu('IMG_1964'), alt: 'Quesadilla plate' },
    [photoKey('quesadillas', 'Quesadilla de Birria')]: { src: menu('IMG_0335'), alt: 'Quesadilla de birria' },
    [photoKey('quesadillas', 'Shrimp Quesadilla')]: { src: menu('IMG_1964'), alt: 'Shrimp quesadilla' },
    [photoKey('quesadillas', 'Quesadilla de Camarones')]: { src: menu('IMG_1964'), alt: 'Quesadilla de camarones' },

    /* fajitas */
    [photoKey('fajitas', 'Campechanas Fajitas')]: { src: menu('IMG_2876'), alt: 'Campechanas fajitas' },
    [photoKey('fajitas', 'Fajitas Campechanas')]: { src: menu('IMG_2876'), alt: 'Fajitas campechanas' },
    [photoKey('fajitas', 'Mix Fajitas')]: { src: menu('IMG_2876'), alt: 'Mix fajitas' },
    [photoKey('fajitas', 'Fajitas Mixtas')]: { src: menu('IMG_2876'), alt: 'Fajitas mixtas' },
    [photoKey('fajitas', 'Shrimp Fajitas')]: { src: menu('IMG_2876'), alt: 'Shrimp fajitas' },
    [photoKey('fajitas', 'Fajitas de Camarones')]: { src: menu('IMG_2876'), alt: 'Fajitas de camarones' },
    [photoKey('fajitas', 'Steak Fajitas')]: { src: menu('IMG_2876'), alt: 'Steak fajitas' },
    [photoKey('fajitas', 'Fajitas de Res')]: { src: menu('IMG_2876'), alt: 'Fajitas de res' },
    [photoKey('fajitas', 'Chicken Fajitas')]: { src: menu('IMG_2876'), alt: 'Chicken fajitas' },
    [photoKey('fajitas', 'Fajitas de Pollo')]: { src: menu('IMG_2876'), alt: 'Fajitas de pollo' },

    /* enchiladas — right plate from IMG_1902 */
    [photoKey('enchiladas', 'Enchiladas')]: plate1902('right', 'Enchiladas verde'),
    [photoKey('enchiladas', 'Queso Enchiladas')]: plate1902('right', 'Queso enchiladas'),
    [photoKey('enchiladas', 'Enchiladas con Queso')]: plate1902('right', 'Enchiladas con queso'),
    [photoKey('enchiladas', 'Enchiladas Campechanas')]: plate1902('right', 'Enchiladas campechanas'),

    /* platters */
    [photoKey('platters', 'Nachos')]: { src: fb('nachos.jpg'), alt: 'Loaded nachos' },
    [photoKey('platters', 'Carne Asada')]: { src: menu('IMG_1541'), alt: 'Carne asada plate' },
    [photoKey('platters', 'Chilaquiles')]: { src: menu('IMG_0335'), alt: 'Chilaquiles platter' },
    [photoKey('platters', 'Mar y Tierra')]: { src: menu('IMG_1512'), alt: 'Steak and shrimp platter' },
    [photoKey('platters', 'Oaxaqueño')]: { src: menu('IMG_1512'), alt: 'Oaxaqueño platter' },
    [photoKey('platters', 'Oaxaqueño de Pollo')]: { src: menu('IMG_1512'), alt: 'Oaxaqueño de pollo' },
    [photoKey('platters', 'Molcajete')]: { src: menu('IMG_1512'), alt: 'Molcajete platter' },
    [photoKey('platters', 'Coctel de Camarones')]: { src: fb('shrimp-cocktail.jpg'), alt: 'Shrimp cocktail' },
    [photoKey('platters', 'Camarones Empanizados')]: { src: fb('shrimp-plate.jpg'), alt: 'Breaded shrimp plate' },
    [photoKey('platters', 'Grilled or Fried Chicken')]: { src: menu('IMG_1541'), alt: 'Chicken plate' },
    [photoKey('platters', 'Pollo Asado o Frito')]: { src: menu('IMG_1541'), alt: 'Pollo asado o frito' },
    [photoKey('platters', 'Fried Steak')]: { src: menu('IMG_1541'), alt: 'Fried steak plate' },
    [photoKey('platters', 'Bistec Frito')]: { src: menu('IMG_1541'), alt: 'Bistec frito' },

    /* broths */
    [photoKey('broths', 'Menudo')]: { src: fb('menudo.jpg'), alt: 'Menudo' },
    [photoKey('broths', 'Siete Mares')]: { src: menu('IMG_0065'), alt: 'Siete mares seafood soup' },

    /* alcohol */
    [photoKey('alcohol', 'Margarita')]: { src: fb('margarita-pineapple.jpg'), alt: 'Margarita' },
    [photoKey('alcohol', 'Beer (12 oz)')]: { src: fb('beers.jpg'), alt: 'Mexican beers' },
    [photoKey('alcohol', 'Beer (24 oz)')]: { src: fb('beers.jpg'), alt: 'Mexican beers' },
    [photoKey('alcohol', 'Beer (32 oz)')]: { src: fb('beers.jpg'), alt: 'Mexican beers' },
  };

  /** Sections with no verified photos — never borrow from dinner menu */
  const noPhotoSections = new Set(['daily-lunch']);

  /** Same photo for every item in a section (when no item-specific match) */
  const sectionDefaultPhotos = {
    tortas: { src: menu('IMG_2920'), alt: 'Torta on a wooden table' },
  };

  const skuPhotos = {
    'taco-birria': { src: menu('IMG_0335'), alt: 'Birria tacos' },
    'plt-oaxaqueno': { src: menu('IMG_1512'), alt: 'Oaxaqueño platter' },
    'plt-molcajete': { src: menu('IMG_1512'), alt: 'Molcajete' },
    'broth-menudo': { src: fb('menudo.jpg'), alt: 'Menudo' },
    'drk-margarita': { src: fb('margarita-pineapple.jpg'), alt: 'Margarita' },
  };

  function lookupFeaturedPhoto(sectionId, itemName) {
    const pools = []
      .concat(window.FEATURED_ITEMS || [])
      .concat(window.FEATURED_ITEMS_ES || []);
    const target = normalizeName(itemName);
    const hit = pools.find(
      (entry) => entry.section === sectionId && normalizeName(entry.name) === target && entry.image
    );
    return hit ? { src: hit.image, alt: itemName } : null;
  }

  /** Photo for item detail modal — verified matches only; otherwise blank */
  function resolveItemPhoto(sectionId, item) {
    if (!item) return null;
    if (noPhotoSections.has(sectionId)) return null;
    if (item.image) return { src: item.image, alt: item.name || '' };

    if (item.sku && skuPhotos[item.sku]?.src) {
      const skuPhoto = skuPhotos[item.sku];
      return { src: skuPhoto.src, alt: skuPhoto.alt || item.name || '' };
    }

    const mapped = itemPhotos[photoKey(sectionId, item.name)];
    if (mapped?.src) return { src: mapped.src, alt: mapped.alt || item.name || '' };

    const featured = lookupFeaturedPhoto(sectionId, item.name);
    if (featured?.src) return featured;

    const sectionPhoto = sectionDefaultPhotos[sectionId];
    if (sectionPhoto?.src) {
      return { src: sectionPhoto.src, alt: item.name || sectionPhoto.alt || '' };
    }

    return null;
  }

  window.SITE_PHOTOS.itemPhotos = itemPhotos;
  window.SITE_PHOTOS.resolveItemPhoto = resolveItemPhoto;
})();