/** Kitchen + menu photos (groky-import → assets/images/menu/groky/) */
(function () {
  const GROKY_V = '?v=groky2';
  const FB_V = '?v=groky2';
  const MENU_V = '?v=groky2';

  function groky(slug) {
    return 'assets/images/menu/groky/' + slug + '.jpg' + GROKY_V;
  }

  function fb(file) {
    return 'assets/images/facebook/' + file + FB_V;
  }

  function menu(file) {
    return 'assets/images/menu/' + file + '.jpg' + MENU_V;
  }

  window.SITE_PHOTOS = {
    version: GROKY_V,

    gallery: [
      { src: groky('birria-tacos'), alt: 'Birria tacos with consommé', caption: 'Birria Tacos' },
      { src: groky('menudo'), alt: 'Menudo with garnishes', caption: 'Menudo' },
      { src: groky('shrimp-fajitas'), alt: 'Shrimp fajitas sizzling', caption: 'Shrimp Fajitas' },
      { src: groky('carne-asada'), alt: 'Carne asada platter', caption: 'Carne Asada' },
      { src: groky('molcajete'), alt: 'Molcajete platter', caption: 'Molcajete' },
      { src: groky('coctel-de-camaron'), alt: 'Shrimp cocktail', caption: 'Coctel de Camarones' },
      { src: groky('mango-margarita'), alt: 'Mango margarita', caption: 'Margaritas' },
      { src: groky('chilaquiles'), alt: 'Chilaquiles platter', caption: 'Chilaquiles' },
      { src: groky('torta'), alt: 'Mexican torta', caption: 'Torta' },
      { src: groky('quesadilla'), alt: 'Quesadilla plate', caption: 'Quesadilla' },
      { src: groky('chimichanga'), alt: 'Chimichanga', caption: 'Chimichanga' },
      { src: groky('mojara'), alt: 'Fried tilapia platter', caption: 'Mojarra Frita' },
      { src: groky('breakfast-platters'), alt: 'Breakfast platters', caption: 'Breakfast' },
      { src: groky('7-mares'), alt: 'Seven seas seafood soup', caption: 'Siete Mares' },
    ],

    followBand: [
      { src: groky('birria-tacos'), alt: 'Birria tacos' },
      { src: groky('shrimp-fajitas'), alt: 'Fajitas' },
      { src: groky('menudo'), alt: 'Menudo' },
      { src: groky('mango-margarita'), alt: 'Margarita' },
      { src: groky('carne-asada'), alt: 'Carne asada' },
    ],

    menuStrip: {
      breakfast: [
        { src: groky('breakfast-platters'), alt: 'Breakfast platters' },
        { src: groky('pancake'), alt: 'Pancakes' },
        { src: groky('omlete'), alt: 'Omelette' },
      ],
      'daily-lunch': [
        { src: groky('birria-tacos'), alt: 'Birria tacos' },
        { src: groky('crunchy-tacos'), alt: 'Crunchy tacos' },
        { src: groky('quesadilla'), alt: 'Quesadilla' },
      ],
      dinner: [
        { src: groky('carne-asada'), alt: 'Carne asada' },
        { src: groky('shrimp-fajitas'), alt: 'Fajitas' },
        { src: groky('molcajete'), alt: 'Molcajete' },
        { src: groky('coctel-de-camaron'), alt: 'Shrimp cocktail' },
        { src: groky('mango-margarita'), alt: 'Margarita' },
      ],
    },

    categorySpotlight: {
      breakfast: { src: groky('breakfast-platters'), alt: 'Breakfast at El Mirasol' },
      'daily-lunch': { src: groky('multi-item'), alt: 'Daily lunch favorites' },
      appetizers: { src: groky('empandas'), alt: 'Sopes and antojitos' },
      tacos: { src: groky('birria-tacos'), alt: 'Birria tacos with consommé' },
      burritos: { src: groky('burrito-meal'), alt: 'Burrito plate' },
      chimichangas: { src: groky('chimichanga'), alt: 'Chimichanga' },
      quesadillas: { src: groky('quesadilla'), alt: 'Quesadilla' },
      tortas: { src: groky('torta'), alt: 'Torta' },
      fajitas: { src: groky('shrimp-fajitas'), alt: 'Sizzling fajitas' },
      enchiladas: { src: groky('chilaquiles'), alt: 'Queso enchiladas' },
      platters: { src: groky('carne-asada'), alt: 'Combo platters' },
      kids: { src: groky('quesadilla'), alt: 'Kids plate' },
      broths: { src: groky('menudo'), alt: 'Menudo' },
      desserts: { src: groky('fruit-cups'), alt: 'Fresh fruit cups' },
      drinks: { src: groky('fruit-cups'), alt: 'Aguas frescas' },
      alcohol: { src: groky('mango-margarita'), alt: 'Margaritas at the bar' },
    },

    desserts: [
      { src: groky('mango-margarita'), alt: 'Margarita' },
      { src: groky('fruit-cups'), alt: 'Fruit cups' },
      { src: groky('mangonada'), alt: 'Mangonada' },
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

  function g(slug, alt) {
    return { src: groky(slug), alt };
  }

  const itemPhotos = {
    /* breakfast */
    [photoKey('breakfast', 'Bacon & Eggs')]: g('breakfast-platters', 'Bacon and eggs'),
    [photoKey('breakfast', 'Huevo con Jamón')]: g('breakfast-platters', 'Huevo con jamón'),
    [photoKey('breakfast', 'Pancake Tacos')]: g('pancake', 'Pancake tacos'),
    [photoKey('breakfast', 'Carne Asada con Huevo')]: g('carne-asada', 'Carne asada con huevo'),
    /* Huevo con Chorizo / chorizo burritos photo removed (wrong image; replace later) */
    [photoKey('breakfast', 'Strawberry Pancakes')]: g('pancake', 'Strawberry pancakes'),
    /* Huevos Ahogados / Burrito Huevo a la Mexicana photo removed (wrong image; replace later) */
    [photoKey('breakfast', 'Chilaquiles en Salsa Verde')]: g('chilaquiles-2', 'Chilaquiles en salsa verde'),
    [photoKey('breakfast', 'Burrito de Huevo con Jamón')]: g('breakfast-platters', 'Burrito de huevo con jamón'),
    [photoKey('breakfast', 'Pancakes')]: g('pancake', 'Pancakes'),
    [photoKey('breakfast', 'Aguas Frescas')]: g('fruit-cups', 'Aguas frescas'),

    /* daily lunch */
    [photoKey('daily-lunch', 'Crunchy Tacos')]: g('crunchy-tacos', 'Crunchy tacos'),
    [photoKey('daily-lunch', 'Tacos')]: g('order-of-tacos', 'Tacos with rice and beans'),
    [photoKey('daily-lunch', 'Empanadas')]: g('empandas', 'Empanadas'),
    /* daily-lunch Enchiladas photo removed (wrong queso-enchiladas image; replace later) */
    [photoKey('daily-lunch', 'Quesadilla')]: g('quesadilla', 'Quesadilla'),
    [photoKey('daily-lunch', 'Half-Size Torta')]: g('torta', 'Half-size torta'),
    [photoKey('daily-lunch', 'Tamales')]: g('ls-tamles', 'Tamales'),
    /* daily-lunch Fajitas / Fried Eggs / Small ACP photos removed (wrong images; replace later) */
    /* Davey's Special photo removed (wrong image; replace later) */
    [photoKey('daily-lunch', 'Birria Tacos')]: g('birria-tacos', 'Birria tacos'),

    /* appetizers — Sope photo removed (wrong image; replace later) */
    [photoKey('appetizers', 'Huarache')]: g('huarache', 'Huarache'),
    /* Gorditas photo removed (wrong masita image; replace later) */
    [photoKey('appetizers', 'Tamales')]: g('ls-tamles', 'Tamales'),
    [photoKey('appetizers', 'Tostada')]: g('4-tostadas', 'Four tostadas shown — $5 each'),
    [photoKey('appetizers', 'Empanadas')]: g('empandas', 'Empanadas'),
    /* Esquite / Street Corn / Guacamole photos removed (wrong images; replace later) */

    /* tacos */
    [photoKey('tacos', 'Taco')]: g('tacos', 'Four tacos shown — $3.12 each'),
    [photoKey('tacos', 'Order of Tacos')]: g('order-of-tacos', 'Order of tacos'),
    [photoKey('tacos', 'Crunchy Tacos')]: g('crunchy-tacos', 'Crunchy tacos'),
    [photoKey('tacos', 'Tacos Dorados')]: g('tacos-dorados', 'Tacos dorados'),
    [photoKey('tacos', 'Birria Tacos')]: g('birria-tacos', 'Birria tacos with consommé'),
    [photoKey('tacos', 'Tacos de Birria')]: g('birria-tacos', 'Birria tacos with consommé'),
    [photoKey('tacos', 'Chicken Birria Tacos')]: g('birria-tacos', 'Birria tacos with consommé'),
    [photoKey('tacos', 'Tacos de Birria de Pollo')]: g('birria-tacos', 'Birria tacos with consommé'),
    [photoKey('tacos', 'Shrimp Tacos')]: g('shrimp-tacos-on-flour', 'Shrimp tacos'),
    [photoKey('tacos', 'Tacos Campechanos')]: g('order-of-tacos-2', 'Tacos campechanos'),
    /* Tacos Albañil photo removed (wrong huevos-con-chorizo image; replace later) */

    /* burritos */
    [photoKey('burritos', 'Burrito Meal')]: g('burrito-meal', 'Burrito meal'),
    /* Fajita Burrito / Choripollo Burrito photos removed (wrong images; replace later) */
    [photoKey('burritos', 'Burrito Campechano')]: g('burrito-meal', 'Burrito campechano'),
    [photoKey('burritos', 'California Burrito')]: g('califorina-burrito', 'California burrito'),
    [photoKey('burritos', 'Shrimp Burrito')]: g('burrito-meal', 'Shrimp burrito'),
    [photoKey('burritos', 'Veggie Burrito')]: g('burrito-meal', 'Veggie burrito'),
    /* Burrito Huevos a la Mexicana photo removed (wrong image; replace later) */

    /* chimichangas */
    [photoKey('chimichangas', 'Chimichanga Meal')]: g('chimichanga', 'Chimichanga'),
    [photoKey('chimichangas', 'Shrimp Chimichanga')]: g('chimi', 'Shrimp chimichanga'),
    [photoKey('chimichangas', 'Burrito Mummia')]: g('burrito-mommia', 'Burrito mummia'),

    /* quesadillas */
    [photoKey('quesadillas', 'Quesadilla Meal')]: g('quesadilla', 'Quesadilla meal'),
    [photoKey('quesadillas', 'Shrimp Quesadilla')]: g('quesadilla', 'Shrimp quesadilla'),
    [photoKey('quesadillas', 'Veggie Quesadilla')]: g('quesadilla-de-maiz', 'Veggie quesadilla'),
    /* Fajita Quesadilla photo removed (wrong fajita-mix image; replace later) */
    [photoKey('quesadillas', 'Quesadilla de Maíz')]: g('quesadilla-de-maiz', 'Quesadilla de maíz'),
    [photoKey('quesadillas', 'Quesadilla de Birria')]: g('quesabirria', 'Quesadilla de birria'),

    /* tortas */
    [photoKey('tortas', 'Torta')]: g('torta', 'Torta'),
    [photoKey('tortas', 'Torta Cubana')]: g('torta-2', 'Torta cubana'),
    [photoKey('tortas', 'Fried Steak Torta')]: g('torta', 'Fried steak torta'),
    [photoKey('tortas', 'Fried Chicken Torta')]: g('torta-2', 'Fried chicken torta'),

    /* fajitas — Campechanas / Mix photo removed (wrong fajita-mix image; replace later) */
    [photoKey('fajitas', 'Shrimp Fajitas')]: g('shrimp-fajitas', 'Shrimp fajitas'),
    /* Steak Fajitas / Chicken Fajitas photos removed (wrong images; replace later) */

    /* enchiladas — Enchiladas / Enchiladas Campechanas photo removed (wrong queso-enchiladas image; replace later) */
    [photoKey('enchiladas', 'Queso Enchiladas')]: g('quesoenchiladas', 'Queso enchiladas'),

    /* platters */
    /* ACP / Davey's Special photos removed (wrong images; replace later) */
    [photoKey('platters', 'Carne Asada')]: g('carne-asada', 'Carne asada'),
    [photoKey('platters', 'Oaxaqueño')]: g('platilla-oaxacaqueno', 'Oaxaqueño platter'),
    [photoKey('platters', 'Oaxaqueño de Pollo')]: g('platillo', 'Oaxaqueño de pollo'),
    [photoKey('platters', 'Mojarra Frita')]: g('mojara', 'Mojarra frita'),
    [photoKey('platters', 'Chile Relleno')]: g('chile-relleno', 'Chile relleno'),
    [photoKey('platters', 'Taco Salad')]: g('taco-bowl', 'Taco salad'),
    [photoKey('platters', 'Chilaquiles')]: g('chilaquiles', 'Chilaquiles'),
    [photoKey('platters', 'Mar y Tierra')]: g('carne-asada', 'Mar y tierra'),
    [photoKey('platters', 'Molcajete')]: g('molcajete', 'Molcajete'),
    /* Cazuelón photo removed (was wrong davey-special image; replace later) */
    [photoKey('platters', 'Tlayuda')]: g('tylayuda', 'Tlayuda'),
    /* Nachos / Fried Steak / Grilled or Fried Chicken photos removed (wrong images; replace later) */
    [photoKey('platters', 'Parrillada')]: g('parrilliada', 'Parrillada'),
    [photoKey('platters', 'Camarones Empanizados')]: g('fried-shrimp-platter', 'Breaded shrimp'),
    [photoKey('platters', 'Coctel de Camarones')]: g('coctel-de-camaron', 'Coctel de camarones'),
    [photoKey('platters', 'Chicken and Spaghetti')]: g('spaghetti', 'Chicken and spaghetti'),
    [photoKey('platters', 'Phil')]: g('phil', 'Philly steak plate'),
    [photoKey('platters', 'Huevos Enchilados')]: g('huevos-enchilados', 'Huevos enchilados'),

    /* kids */
    [photoKey('kids', 'Kids Quesadilla')]: g('quesadilla', 'Kids quesadilla'),
    [photoKey('kids', 'Kids Burrito')]: g('burrito-meal', 'Kids burrito'),
    /* kids ACP / Scrambled Eggs photos removed (wrong images; replace later) */

    /* broths */
    [photoKey('broths', 'Caldo de Res')]: g('caldo-de-res', 'Caldo de res'),
    [photoKey('broths', 'Caldo de Borrego')]: g('caldo-de-res', 'Caldo de borrego'),
    [photoKey('broths', 'Menudo')]: g('menudo', 'Menudo'),
    [photoKey('broths', 'Siete Mares')]: g('7-mares', 'Siete mares'),

    /* drinks */
    [photoKey('drinks', 'Aguas Frescas')]: g('fruit-cups', 'Aguas frescas'),
    [photoKey('drinks', 'Jarritos & Squirt')]: g('fruit-cups', 'Jarritos'),

    /* alcohol */
    [photoKey('alcohol', 'Margarita')]: g('mango-margarita', 'Margarita'),
    [photoKey('alcohol', 'Mojito')]: g('mojitos', 'Mojito'),
    [photoKey('alcohol', 'Michelada Cheladas')]: g('coco-azul', 'Michelada'),
    [photoKey('alcohol', 'Micheladas')]: g('coco-azul', 'Michelada'),
    [photoKey('alcohol', 'Piña Colada')]: g('pinaapple-habiscus-margarita', 'Piña colada'),
    [photoKey('alcohol', 'Paloma')]: g('mixed-drinks', 'Paloma'),
    [photoKey('alcohol', 'Tequila Sunrise')]: g('mixed-drinks', 'Tequila sunrise'),
    [photoKey('alcohol', 'Beer (12 oz)')]: g('mixed-drinks', 'Mexican beer'),
    [photoKey('alcohol', 'Beer (24 oz)')]: g('mixed-drinks', 'Mexican beer'),
    [photoKey('alcohol', 'Beer (32 oz)')]: g('mixed-drinks', 'Mexican beer'),
  };

  const sectionDefaultPhotos = {
    breakfast: g('breakfast-platters', 'Breakfast at El Mirasol'),
    'daily-lunch': g('multi-item', 'Daily lunch'),
    appetizers: g('empandas', 'Appetizers'),
    tacos: g('birria-tacos', 'Tacos'),
    burritos: g('burrito-meal', 'Burritos'),
    chimichangas: g('chimichanga', 'Chimichangas'),
    quesadillas: g('quesadilla', 'Quesadillas'),
    tortas: g('torta', 'Tortas'),
    fajitas: g('shrimp-fajitas', 'Fajitas'),
    enchiladas: g('chilaquiles', 'Enchiladas'),
    platters: g('carne-asada', 'Platters'),
    kids: g('quesadilla', 'Kids menu'),
    broths: g('menudo', 'Weekend broths'),
    drinks: g('fruit-cups', 'Drinks'),
    alcohol: g('mango-margarita', 'Bar drinks'),
  };

  const skuPhotos = {
    'taco-birria': g('birria-tacos', 'Birria tacos'),
    'plt-oaxaqueno': g('platilla-oaxacaqueno', 'Oaxaqueño'),
    'plt-molcajete': g('molcajete', 'Molcajete'),
    'broth-menudo': g('menudo', 'Menudo'),
    'drk-margarita': g('mango-margarita', 'Margarita'),
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

  function photoResult(photo, fallbackAlt) {
    if (!photo?.src) return null;
    const out = { src: photo.src, alt: photo.alt || fallbackAlt || '' };
    if (photo.crop) out.crop = photo.crop;
    return out;
  }

  function resolveItemPhoto(sectionId, item) {
    if (!item) return null;
    if (item.image) return photoResult({ src: item.image, alt: item.name }, item.name);

    if (item.sku && skuPhotos[item.sku]?.src) {
      return photoResult(skuPhotos[item.sku], item.name);
    }

    const mapped = itemPhotos[photoKey(sectionId, item.name)];
    if (mapped?.src) return photoResult(mapped, item.name);

    const featured = lookupFeaturedPhoto(sectionId, item.name);
    if (featured?.src) return photoResult(featured, item.name);

    const sectionPhoto = sectionDefaultPhotos[sectionId];
    if (sectionPhoto?.src) return photoResult(sectionPhoto, item.name || sectionPhoto.alt);

    return null;
  }

  window.SITE_PHOTOS.itemPhotos = itemPhotos;
  window.SITE_PHOTOS.resolveItemPhoto = resolveItemPhoto;
})();