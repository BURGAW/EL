/** Facebook homepage photos + iPhone menu photos */
(function () {
  const FB_V = '?v=drinks1';
  const MENU_V = '?v=drinks1';

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
      'daily-lunch': [
        { src: menu('IMG_0335'), alt: 'Enchiladas, tacos, and flautas' },
        { src: menu('IMG_0399'), alt: 'Mexican street corn' },
        { src: menu('IMG_0341'), alt: 'Lunch plate' },
        { src: menu('IMG_1902'), alt: 'Tacos and enchiladas' },
        { src: menu('IMG_2827'), alt: 'Lunch combo' },
        { src: menu('IMG_2920'), alt: 'Torta' },
      ],
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
      'daily-lunch': { src: menu('IMG_0335'), alt: 'Enchiladas verdes, tacos, and flautas' },
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
})();