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
      { src: groky('menudo'), alt: 'Menudo with garnishes', caption: 'Menudo' },
      { src: groky('shrimp-fajitas'), alt: 'Shrimp fajitas sizzling', caption: 'Shrimp Fajitas' },
      { src: groky('molcajete'), alt: 'Molcajete platter', caption: 'Molcajete' },
      { src: groky('coctel-de-camaron'), alt: 'Shrimp cocktail', caption: 'Coctel de Camarones' },
      { src: groky('mango-margarita'), alt: 'Mango margarita', caption: 'Margaritas' },
      { src: groky('chilaquiles'), alt: 'Chilaquiles platter', caption: 'Chilaquiles' },
      { src: groky('torta'), alt: 'Mexican torta', caption: 'Torta' },
      { src: groky('chimichanga'), alt: 'Chimichanga', caption: 'Chimichanga' },
      { src: groky('mojara'), alt: 'Fried tilapia platter', caption: 'Mojarra Frita' },
      { src: groky('7-mares'), alt: 'Seven seas seafood soup', caption: 'Siete Mares' },
    ],

    followBand: [
      { src: groky('shrimp-fajitas'), alt: 'Fajitas' },
      { src: groky('menudo'), alt: 'Menudo' },
      { src: groky('mango-margarita'), alt: 'Margarita' },
      { src: groky('molcajete'), alt: 'Molcajete' },
    ],

    menuStrip: {
      breakfast: [
        { src: groky('omlete'), alt: 'Omelette' },
        { src: groky('chilaquiles-2'), alt: 'Chilaquiles' },
      ],
      'daily-lunch': [
        { src: groky('tacos-dorados'), alt: 'Tacos dorados' },
      ],
      dinner: [
        { src: groky('shrimp-fajitas'), alt: 'Fajitas' },
        { src: groky('molcajete'), alt: 'Molcajete' },
        { src: groky('coctel-de-camaron'), alt: 'Shrimp cocktail' },
        { src: groky('mango-margarita'), alt: 'Margarita' },
      ],
    },

    categorySpotlight: {
      breakfast: { src: groky('chilaquiles-2'), alt: 'Breakfast at El Mirasol' },
      'daily-lunch': { src: groky('multi-item'), alt: 'Daily lunch favorites' },
      appetizers: { src: groky('huarache'), alt: 'Sopes and antojitos' },
      tacos: { src: groky('tacos-dorados'), alt: 'Tacos' },
      burritos: { src: groky('califorina-burrito'), alt: 'Burrito plate' },
      chimichangas: { src: groky('chimichanga'), alt: 'Chimichanga' },
      quesadillas: { src: groky('quesabirria'), alt: 'Quesadilla' },
      tortas: { src: groky('torta'), alt: 'Torta' },
      fajitas: { src: groky('shrimp-fajitas'), alt: 'Sizzling fajitas' },
      enchiladas: { src: groky('chilaquiles'), alt: 'Queso enchiladas' },
      platters: { src: groky('molcajete'), alt: 'Combo platters' },
      kids: { src: groky('torta'), alt: 'Kids plate' },
      broths: { src: groky('menudo'), alt: 'Menudo' },
      desserts: { src: groky('mangonada'), alt: 'Fresh fruit cups' },
      drinks: { src: groky('mangonada'), alt: 'Aguas frescas' },
      /* alcohol section: no photos (beer & mixed drinks) */
    },

    desserts: [
      { src: groky('mango-margarita'), alt: 'Margarita' },
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

  /** Explicit blank — blocks section-default fallback (user-flagged wrong photos) */
  function blank() {
    return { src: null };
  }

  const itemPhotos = {
    /* breakfast */
    [photoKey('breakfast', 'Bacon & Eggs')]: blank(),
    [photoKey('breakfast', 'Bacon y Huevos')]: blank(),
    [photoKey('breakfast', 'Huevo con Jamón')]: blank(),
    [photoKey('breakfast', 'Pancake Tacos')]: blank(),
    [photoKey('breakfast', 'Tacos de Pancake')]: blank(),
    [photoKey('breakfast', 'Carne Asada con Huevo')]: blank(),
    [photoKey('breakfast', 'Huevo con Chorizo')]: blank(),
    [photoKey('breakfast', 'Strawberry Pancakes')]: blank(),
    [photoKey('breakfast', 'Panqueques de Fresa')]: blank(),
    [photoKey('breakfast', 'Huevos Ahogados')]: blank(),
    [photoKey('breakfast', 'Chilaquiles en Salsa Verde')]: g('chilaquiles-2', 'Chilaquiles en salsa verde'),
    [photoKey('breakfast', 'Burrito de Papas con Chorizo')]: blank(),
    [photoKey('breakfast', 'Burrito Huevo a la Mexicana')]: blank(),
    [photoKey('breakfast', 'Burrito de Huevo con Jamón')]: blank(),
    [photoKey('breakfast', 'Burrito Huevo con Chorizo y Papas')]: blank(),
    [photoKey('breakfast', 'Pancakes')]: blank(),
    [photoKey('breakfast', 'Panqueques')]: blank(),
    [photoKey('breakfast', 'Aguas Frescas')]: blank(),

    /* daily lunch */
    [photoKey('daily-lunch', 'Crunchy Tacos')]: blank(),
    [photoKey('daily-lunch', 'Tacos Crunchy')]: blank(),
    [photoKey('daily-lunch', 'Tacos')]: blank(),
    [photoKey('daily-lunch', 'Empanadas')]: blank(),
    [photoKey('daily-lunch', 'Enchiladas')]: blank(),
    [photoKey('daily-lunch', 'Quesadilla')]: blank(),
    [photoKey('daily-lunch', 'Half-Size Torta')]: g('torta', 'Half-size torta'),
    [photoKey('daily-lunch', 'Tamales')]: g('ls-tamles', 'Tamales'),
    [photoKey('daily-lunch', 'Fajitas')]: blank(),
    [photoKey('daily-lunch', 'Fried Eggs')]: blank(),
    [photoKey('daily-lunch', 'Small ACP')]: blank(),
    [photoKey('daily-lunch', "Davey's Special")]: blank(),
    [photoKey('daily-lunch', 'Birria Tacos')]: blank(),

    /* appetizers */
    [photoKey('appetizers', 'Sope')]: blank(),
    [photoKey('appetizers', 'Huarache')]: g('huarache', 'Huarache'),
    [photoKey('appetizers', 'Gorditas')]: blank(),
    [photoKey('appetizers', 'Tamales')]: g('ls-tamles', 'Tamales'),
    [photoKey('appetizers', 'Tostada')]: g('4-tostadas', 'Four tostadas shown — $5 each'),
    [photoKey('appetizers', 'Empanadas')]: blank(),
    [photoKey('appetizers', 'Esquite')]: blank(),
    [photoKey('appetizers', 'Street Corn')]: blank(),
    [photoKey('appetizers', 'Guacamole')]: blank(),

    /* tacos */
    [photoKey('tacos', 'Taco')]: g('tacos', 'Four tacos shown — $3.12 each'),
    [photoKey('tacos', 'Order of Tacos')]: blank(),
    [photoKey('tacos', 'Orden de Tacos')]: blank(),
    [photoKey('tacos', 'Crunchy Tacos')]: blank(),
    [photoKey('tacos', 'Tacos Crunchy')]: blank(),
    [photoKey('tacos', 'Tacos Dorados')]: g('tacos-dorados', 'Tacos dorados'),
    [photoKey('tacos', 'Birria Tacos')]: blank(),
    [photoKey('tacos', 'Tacos de Birria')]: blank(),
    [photoKey('tacos', 'Chicken Birria Tacos')]: blank(),
    [photoKey('tacos', 'Tacos de Birria de Pollo')]: blank(),
    [photoKey('tacos', 'Shrimp Tacos')]: g('shrimp-tacos-on-flour', 'Shrimp tacos'),
    [photoKey('tacos', 'Tacos Campechanos')]: g('order-of-tacos-2', 'Tacos campechanos'),
    [photoKey('tacos', 'Tacos Albañil')]: blank(),

    /* burritos */
    [photoKey('burritos', 'Burrito Meal')]: blank(),
    [photoKey('burritos', 'Fajita Burrito')]: blank(),
    [photoKey('burritos', 'Choripollo Burrito')]: blank(),
    [photoKey('burritos', 'Burrito Campechano')]: blank(),
    [photoKey('burritos', 'California Burrito')]: g('califorina-burrito', 'California burrito'),
    [photoKey('burritos', 'Shrimp Burrito')]: blank(),
    [photoKey('burritos', 'Veggie Burrito')]: blank(),
    [photoKey('burritos', 'Burrito Huevos a la Mexicana')]: blank(),

    /* chimichangas */
    [photoKey('chimichangas', 'Chimichanga Meal')]: g('chimichanga', 'Chimichanga'),
    [photoKey('chimichangas', 'Shrimp Chimichanga')]: g('chimi', 'Shrimp chimichanga'),
    [photoKey('chimichangas', 'Burrito Mummia')]: g('burrito-mommia', 'Burrito mummia'),

    /* quesadillas */
    [photoKey('quesadillas', 'Quesadilla Meal')]: blank(),
    [photoKey('quesadillas', 'Shrimp Quesadilla')]: blank(),
    [photoKey('quesadillas', 'Veggie Quesadilla')]: blank(),
    [photoKey('quesadillas', 'Quesadilla Vegetariana')]: blank(),
    [photoKey('quesadillas', 'Fajita Quesadilla')]: blank(),
    [photoKey('quesadillas', 'Quesadilla de Maíz')]: blank(),
    [photoKey('quesadillas', 'Quesadilla de Birria')]: g('quesabirria', 'Quesadilla de birria'),

    /* tortas */
    [photoKey('tortas', 'Torta')]: g('torta', 'Torta'),
    [photoKey('tortas', 'Torta Cubana')]: g('torta-2', 'Torta cubana'),
    [photoKey('tortas', 'Fried Steak Torta')]: g('torta', 'Fried steak torta'),
    [photoKey('tortas', 'Fried Chicken Torta')]: g('torta-2', 'Fried chicken torta'),

    /* fajitas */
    [photoKey('fajitas', 'Campechanas Fajitas')]: blank(),
    [photoKey('fajitas', 'Mix Fajitas')]: blank(),
    [photoKey('fajitas', 'Shrimp Fajitas')]: g('shrimp-fajitas', 'Shrimp fajitas'),
    [photoKey('fajitas', 'Steak Fajitas')]: blank(),
    [photoKey('fajitas', 'Chicken Fajitas')]: blank(),

    /* enchiladas */
    [photoKey('enchiladas', 'Enchiladas')]: blank(),
    [photoKey('enchiladas', 'Queso Enchiladas')]: g('quesoenchiladas', 'Queso enchiladas'),
    [photoKey('enchiladas', 'Enchiladas Campechanas')]: blank(),

    /* platters */
    [photoKey('platters', 'ACP (Arroz Con Pollo)')]: blank(),
    [photoKey('platters', "Davey's Special")]: blank(),
    [photoKey('platters', 'Carne Asada')]: blank(),
    [photoKey('platters', 'Oaxaqueño')]: g('platilla-oaxacaqueno', 'Oaxaqueño platter'),
    [photoKey('platters', 'Oaxaqueño de Pollo')]: g('platillo', 'Oaxaqueño de pollo'),
    [photoKey('platters', 'Mojarra Frita')]: g('mojara', 'Mojarra frita'),
    [photoKey('platters', 'Chile Relleno')]: g('chile-relleno', 'Chile relleno'),
    [photoKey('platters', 'Taco Salad')]: g('taco-bowl', 'Taco salad'),
    [photoKey('platters', 'Chilaquiles')]: g('chilaquiles', 'Chilaquiles'),
    [photoKey('platters', 'Mar y Tierra')]: blank(),
    [photoKey('platters', 'Molcajete')]: g('molcajete', 'Molcajete'),
    [photoKey('platters', 'Cazuelón')]: blank(),
    [photoKey('platters', 'Tlayuda')]: g('tylayuda', 'Tlayuda'),
    [photoKey('platters', 'Nachos')]: blank(),
    [photoKey('platters', 'Fried Steak')]: blank(),
    [photoKey('platters', 'Grilled or Fried Chicken')]: blank(),
    [photoKey('platters', 'Parrillada')]: g('parrilliada', 'Parrillada'),
    [photoKey('platters', 'Camarones Empanizados')]: g('fried-shrimp-platter', 'Breaded shrimp'),
    [photoKey('platters', 'Coctel de Camarones')]: g('coctel-de-camaron', 'Coctel de camarones'),
    [photoKey('platters', 'Chicken and Spaghetti')]: g('spaghetti', 'Chicken and spaghetti'),
    [photoKey('platters', 'Phil')]: g('phil', 'Philly steak plate'),
    [photoKey('platters', 'Huevos Enchilados')]: g('huevos-enchilados', 'Huevos enchilados'),

    /* kids */
    [photoKey('kids', 'Kids Quesadilla')]: blank(),
    [photoKey('kids', 'Kids Burrito')]: blank(),
    [photoKey('kids', 'Kids ACP')]: blank(),
    [photoKey('kids', 'Scrambled Eggs')]: blank(),

    /* broths */
    [photoKey('broths', 'Caldo de Res')]: blank(),
    [photoKey('broths', 'Caldo de Borrego')]: blank(),
    [photoKey('broths', 'Menudo')]: g('menudo', 'Menudo'),
    [photoKey('broths', 'Siete Mares')]: g('7-mares', 'Siete mares'),

    /* drinks */
    [photoKey('drinks', 'Aguas Frescas')]: blank(),
    [photoKey('drinks', 'Jarritos & Squirt')]: blank(),

    /* alcohol / Beer & Mixed Drinks — all blank (EN) */
    [photoKey('alcohol', 'Beer (12 oz)')]: blank(),
    [photoKey('alcohol', 'Beer (24 oz)')]: blank(),
    [photoKey('alcohol', 'Beer (32 oz)')]: blank(),
    [photoKey('alcohol', 'Michelada Cheladas')]: blank(),
    [photoKey('alcohol', 'Micheladas')]: blank(),
    [photoKey('alcohol', 'Margarita')]: blank(),
    [photoKey('alcohol', 'Tequila Sunrise')]: blank(),
    [photoKey('alcohol', 'Mojito')]: blank(),
    [photoKey('alcohol', 'Irish Trash Can')]: blank(),
    [photoKey('alcohol', 'Mary Jane')]: blank(),
    [photoKey('alcohol', 'Piña Colada')]: blank(),
    [photoKey('alcohol', 'Paloma')]: blank(),
    [photoKey('alcohol', 'Spiked Horchata')]: blank(),
    [photoKey('alcohol', 'Rum and Coke')]: blank(),
    [photoKey('alcohol', 'Jack and Coke')]: blank(),

    /* Spanish name keys for the same blank items (ES menu) */
    [photoKey('daily-lunch', 'Huevos Fritos')]: blank(),
    [photoKey('daily-lunch', 'ACP Pequeño')]: blank(),
    [photoKey('daily-lunch', 'Especial Davey')]: blank(),
    [photoKey('daily-lunch', 'Tacos de Birria')]: blank(),
    [photoKey('appetizers', 'Elote')]: blank(),
    [photoKey('burritos', 'Burrito Fajita')]: blank(),
    [photoKey('burritos', 'Burrito Choripollo')]: blank(),
    [photoKey('burritos', 'Burrito de Camarones')]: blank(),
    [photoKey('burritos', 'Burrito Vegetariano')]: blank(),
    [photoKey('quesadillas', 'Quesadilla de Camarones')]: blank(),
    [photoKey('quesadillas', 'Quesadilla Fajita')]: blank(),
    [photoKey('fajitas', 'Fajitas Campechanas')]: blank(),
    [photoKey('fajitas', 'Fajitas Mixtas')]: blank(),
    [photoKey('fajitas', 'Fajitas de Res')]: blank(),
    [photoKey('fajitas', 'Fajitas de Pollo')]: blank(),
    [photoKey('platters', 'Especial de Davey')]: blank(),
    [photoKey('platters', 'Bistec Frito')]: blank(),
    [photoKey('platters', 'Pollo Asado o Frito')]: blank(),
    [photoKey('kids', 'Quesadilla Infantil')]: blank(),
    [photoKey('kids', 'Burrito Infantil')]: blank(),
    [photoKey('kids', 'ACP Infantil')]: blank(),
    [photoKey('kids', 'Huevos Revueltos')]: blank(),
    [photoKey('drinks', 'Jarritos y Squirt')]: blank(),
    [photoKey('alcohol', 'Cerveza (12 oz)')]: blank(),
    [photoKey('alcohol', 'Cerveza (24 oz)')]: blank(),
    [photoKey('alcohol', 'Cerveza (32 oz)')]: blank(),
    [photoKey('alcohol', 'Horchata con Licor')]: blank(),
    [photoKey('alcohol', 'Ron con Coca')]: blank(),
    [photoKey('alcohol', 'Jack con Coca')]: blank(),
  };

  const sectionDefaultPhotos = {
    breakfast: g('chilaquiles-2', 'Breakfast at El Mirasol'),
    'daily-lunch': g('multi-item', 'Daily lunch'),
    appetizers: g('huarache', 'Appetizers'),
    tacos: g('tacos-dorados', 'Tacos'),
    burritos: g('califorina-burrito', 'Burritos'),
    chimichangas: g('chimichanga', 'Chimichangas'),
    quesadillas: g('quesabirria', 'Quesadillas'),
    tortas: g('torta', 'Tortas'),
    fajitas: g('shrimp-fajitas', 'Fajitas'),
    enchiladas: g('chilaquiles', 'Enchiladas'),
    platters: g('molcajete', 'Platters'),
    kids: g('torta', 'Kids menu'),
    broths: g('menudo', 'Weekend broths'),
    drinks: g('mangonada', 'Drinks'),
    /* alcohol: no section default photo */
  };

  const skuPhotos = {
    'taco-birria': blank(),
    'plt-oaxaqueno': g('platilla-oaxacaqueno', 'Oaxaqueño'),
    'plt-molcajete': g('molcajete', 'Molcajete'),
    'broth-menudo': g('menudo', 'Menudo'),
    'drk-margarita': blank(),
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

    // Explicit sku mapping (including blank) — do not fall through
    if (item.sku && Object.prototype.hasOwnProperty.call(skuPhotos, item.sku)) {
      return photoResult(skuPhotos[item.sku], item.name);
    }

    // Explicit item mapping (including blank) — blocks section-default fallback
    const key = photoKey(sectionId, item.name);
    if (Object.prototype.hasOwnProperty.call(itemPhotos, key)) {
      return photoResult(itemPhotos[key], item.name);
    }

    const featured = lookupFeaturedPhoto(sectionId, item.name);
    if (featured?.src) return photoResult(featured, item.name);

    const sectionPhoto = sectionDefaultPhotos[sectionId];
    if (sectionPhoto?.src) return photoResult(sectionPhoto, item.name || sectionPhoto.alt);

    return null;
  }

  window.SITE_PHOTOS.itemPhotos = itemPhotos;
  window.SITE_PHOTOS.resolveItemPhoto = resolveItemPhoto;
})();