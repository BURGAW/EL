/**
 * Modifier groups for item detail modal (EN / ES).
 */
(function () {
  const DEFS = {
    en: {
      meat: {
        id: 'meat',
        label: 'Meat',
        type: 'radio',
        default: 'Asada',
        options: [
          { id: 'Asada', label: 'Asada (Steak)', price: 0 },
          { id: 'Pollo', label: 'Pollo (Chicken)', price: 0 },
          { id: 'Barbacoa', label: 'Barbacoa', price: 0 },
          { id: 'Al Pastor', label: 'Al Pastor', price: 0 },
          { id: 'Carnitas', label: 'Carnitas', price: 0 },
          { id: 'Carne Molida', label: 'Ground Beef', price: 0 },
          { id: 'Chorizo', label: 'Chorizo (+$4.25)', price: 4.25 },
          { id: 'Lengua', label: 'Lengua (+$2.50)', price: 2.5 },
          { id: 'Camarones', label: 'Shrimp (+$1.75)', price: 1.75 },
        ],
      },
      tortilla: {
        id: 'tortilla',
        label: 'Tortilla',
        type: 'radio',
        default: 'Maiz',
        options: [
          { id: 'Maiz', label: 'Corn tortilla', price: 0 },
          { id: 'Harina', label: 'Flour tortilla (+$0.75)', price: 0.75 },
        ],
      },
      shrimpTortilla: {
        id: 'shrimp-tortilla',
        label: 'Tortilla',
        type: 'radio',
        default: 'Maiz',
        options: [
          { id: 'Maiz', label: 'Corn tortilla', price: 0 },
          { id: 'Harina', label: 'Flour tortilla (+$0.50)', price: 0.5 },
        ],
      },
      veggies: {
        id: 'veggies',
        label: 'Preferences',
        type: 'toggle',
        options: [
          { id: 'no-onion', label: 'No onions', price: 0 },
          { id: 'no-cilantro', label: 'No cilantro', price: 0 },
        ],
      },
      addons: {
        id: 'addons',
        label: 'Add-ons',
        type: 'checkbox',
        options: [
          { id: 'pico', label: 'Extra pico de gallo', price: 0 },
          { id: 'avocado', label: 'Add avocado (+$0.52)', price: 0.52 },
          { id: 'queso-fresco', label: 'Add queso fresco', price: 0 },
          { id: 'crema', label: 'Add crema', price: 0 },
          { id: 'extra-cheese', label: 'Extra cheese (+$1.50)', price: 1.5 },
          { id: 'extra-tortilla', label: 'Extra tortilla (+$2.08)', price: 2.08 },
          { id: 'two-eggs', label: 'Add 2 eggs (+$5.20)', price: 5.2 },
        ],
      },
      margaritaRim: {
        id: 'rim',
        label: 'Rim',
        type: 'radio',
        default: 'Salt',
        options: [
          { id: 'Salt', label: 'Salt', price: 0 },
          { id: 'Sugar', label: 'Sugar', price: 0 },
          { id: 'Tajin', label: 'Tajín', price: 0 },
        ],
      },
      margaritaFlavor: {
        id: 'flavor',
        label: 'Flavor',
        type: 'radio',
        default: 'Lime',
        options: [
          { id: 'Lime', label: 'Classic lime', price: 0 },
          { id: 'Strawberry', label: 'Strawberry (+$2)', price: 2 },
          { id: 'Mango', label: 'Mango (+$2)', price: 2 },
          { id: 'Pineapple', label: 'Pineapple jalapeño (+$2)', price: 2 },
          { id: 'Watermelon', label: 'Watermelon (+$2)', price: 2 },
        ],
      },
      mojitoFlavor: {
        id: 'mojito-flavor',
        label: 'Flavor',
        type: 'radio',
        default: 'Strawberry',
        options: [
          { id: 'Strawberry', label: 'Strawberry', price: 0 },
          { id: 'Blueberry', label: 'Blueberry', price: 0 },
        ],
      },
      kidsProtein: {
        id: 'kids-protein',
        label: 'Protein',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Chicken', price: 0 },
          { id: 'Res', label: 'Ground beef', price: 0 },
        ],
      },
      kidsSide: {
        id: 'kids-side',
        label: 'Side',
        type: 'radio',
        default: 'Rice',
        options: [
          { id: 'Rice', label: 'Rice', price: 0 },
          { id: 'Fries', label: 'Fries', price: 0 },
        ],
      },
      lunchProtein2: {
        id: 'lunch-protein',
        label: 'Protein',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Chicken', price: 0 },
          { id: 'Carne Molida', label: 'Ground beef', price: 0 },
        ],
      },
      lunchProtein3: {
        id: 'lunch-protein',
        label: 'Protein',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Chicken', price: 0 },
          { id: 'Carne Molida', label: 'Ground beef', price: 0 },
          { id: 'Queso', label: 'Cheese', price: 0 },
        ],
      },
      lunchFajita: {
        id: 'lunch-fajita',
        label: 'Protein',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Chicken', price: 0 },
          { id: 'Asada', label: 'Steak (+$2)', price: 2 },
        ],
      },
      fajitaProtein2: {
        id: 'fajita-protein',
        label: 'Protein',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Chicken', price: 0 },
          { id: 'Asada', label: 'Steak', price: 0 },
        ],
      },
      grillFry: {
        id: 'grill-fry',
        label: 'Style',
        type: 'radio',
        default: 'Grilled',
        options: [
          { id: 'Grilled', label: 'Grilled', price: 0 },
          { id: 'Fried', label: 'Fried', price: 0 },
        ],
      },
      breakfastSide: {
        id: 'bf-side',
        label: 'Choice',
        type: 'radio',
        default: 'Bacon',
        options: [
          { id: 'Bacon', label: 'Bacon', price: 0 },
          { id: 'Chorizo', label: 'Mexican sausage', price: 0 },
        ],
      },
      breakfastChorizo: {
        id: 'bf-chorizo',
        label: 'Add-ons',
        type: 'toggle',
        options: [{ id: 'add-chorizo', label: 'Add chorizo (+$4.25)', price: 4.25 }],
      },
      breakfastPrefs: {
        id: 'bf-prefs',
        label: 'Preferences',
        type: 'toggle',
        options: [
          { id: 'no-onion', label: 'No onions', price: 0 },
          { id: 'extra-hash', label: 'Extra hash browns (+$2)', price: 2 },
        ],
      },
      aguaFlavor: {
        id: 'agua-flavor',
        label: 'Flavor',
        type: 'radio',
        default: 'Horchata',
        options: [
          { id: 'Horchata', label: 'Horchata', price: 0 },
          { id: 'Jamaica', label: 'Jamaica', price: 0 },
          { id: 'Pina', label: 'Piña', price: 0 },
          { id: 'Melon', label: 'Melón', price: 0 },
          { id: 'Pepino', label: 'Pepino con limón', price: 0 },
        ],
      },
      sizeSmallLarge: {
        id: 'size',
        label: 'Size',
        type: 'radio',
        default: 'Small',
        options: [
          { id: 'Small', label: 'Small', price: 0 },
          { id: 'Large', label: 'Large', price: 0 },
        ],
      },
      veggieChoice: {
        id: 'veggie',
        label: 'Veggie',
        type: 'radio',
        default: 'Peppers',
        options: [
          { id: 'Peppers', label: 'Bell peppers', price: 0 },
          { id: 'Mushrooms', label: 'Mushrooms', price: 0 },
          { id: 'Cactus', label: 'Cactus (nopales)', price: 0 },
        ],
      },
      salsaChoice: {
        id: 'salsa',
        label: 'Salsa',
        type: 'radio',
        default: 'Both',
        options: [
          { id: 'Verde', label: 'Green salsa', price: 0 },
          { id: 'Roja', label: 'Red salsa', price: 0 },
          { id: 'Both', label: 'Green & red', price: 0 },
        ],
      },
      softDrink: {
        id: 'soft-drink',
        label: 'Drink',
        type: 'radio',
        default: 'Coke',
        options: [
          { id: 'Coke', label: 'Coke', price: 0 },
          { id: 'Pepsi', label: 'Pepsi', price: 0 },
          { id: 'Sprite', label: 'Sprite', price: 0 },
          { id: 'Mountain Dew', label: 'Mountain Dew', price: 0 },
          { id: 'Fanta', label: 'Fanta', price: 0 },
          { id: 'Fresca', label: 'Fresca', price: 0 },
        ],
      },
      jarritosFlavor: {
        id: 'jarritos',
        label: 'Flavor',
        type: 'radio',
        default: 'Tamarind',
        options: [
          { id: 'Tamarind', label: 'Tamarind', price: 0 },
          { id: 'Mandarin', label: 'Mandarin', price: 0 },
          { id: 'Grapefruit', label: 'Grapefruit', price: 0 },
          { id: 'Lime', label: 'Lime', price: 0 },
          { id: 'Squirt', label: 'Squirt', price: 0 },
        ],
      },
      beer12: {
        id: 'beer-12',
        label: 'Beer',
        type: 'radio',
        default: 'Corona',
        options: [
          { id: 'Corona', label: 'Corona', price: 0 },
          { id: 'Modelo', label: 'Modelo', price: 0 },
          { id: 'Victoria', label: 'Victoria', price: 0 },
          { id: 'Dos XX', label: 'Dos XX', price: 0 },
          { id: 'Modelo Negra', label: 'Modelo Negra', price: 0 },
          { id: 'Tecate', label: 'Tecate', price: 0 },
          { id: 'Pacifico', label: 'Pacifico', price: 0 },
        ],
      },
      beer32: {
        id: 'beer-32',
        label: 'Beer',
        type: 'radio',
        default: 'Corona Familiar',
        options: [
          { id: 'Corona Familiar', label: 'Corona Familiar', price: 0 },
          { id: 'Modelo', label: 'Modelo', price: 0 },
          { id: 'Tecate', label: 'Tecate', price: 0 },
          { id: 'Carta Blanca', label: 'Carta Blanca', price: 0 },
          { id: 'Victoria', label: 'Victoria', price: 0 },
        ],
      },
      micheladaChelada: {
        id: 'chelada',
        label: 'Flavor',
        type: 'radio',
        default: 'Especial',
        options: [
          { id: 'Mango y Chile', label: 'Mango y Chile', price: 0 },
          { id: 'Pina Picante', label: 'Piña Picante', price: 0 },
          { id: 'Especial', label: 'Especial', price: 0 },
          { id: 'Sandia Picante', label: 'Sandía Picante', price: 0 },
          { id: 'Limon y Sal', label: 'Limón y Sal', price: 0 },
        ],
      },
    },
    es: {
      meat: {
        id: 'meat',
        label: 'Carne',
        type: 'radio',
        default: 'Asada',
        options: [
          { id: 'Asada', label: 'Asada', price: 0 },
          { id: 'Pollo', label: 'Pollo', price: 0 },
          { id: 'Barbacoa', label: 'Barbacoa', price: 0 },
          { id: 'Al Pastor', label: 'Al Pastor', price: 0 },
          { id: 'Carnitas', label: 'Carnitas', price: 0 },
          { id: 'Carne Molida', label: 'Res molida', price: 0 },
          { id: 'Chorizo', label: 'Chorizo (+$4.25)', price: 4.25 },
          { id: 'Lengua', label: 'Lengua (+$2.50)', price: 2.5 },
          { id: 'Camarones', label: 'Camarones (+$1.75)', price: 1.75 },
        ],
      },
      tortilla: {
        id: 'tortilla',
        label: 'Tortilla',
        type: 'radio',
        default: 'Maiz',
        options: [
          { id: 'Maiz', label: 'Tortilla de maíz', price: 0 },
          { id: 'Harina', label: 'Tortilla de harina (+$0.75)', price: 0.75 },
        ],
      },
      shrimpTortilla: {
        id: 'shrimp-tortilla',
        label: 'Tortilla',
        type: 'radio',
        default: 'Maiz',
        options: [
          { id: 'Maiz', label: 'Tortilla de maíz', price: 0 },
          { id: 'Harina', label: 'Tortilla de harina (+$0.50)', price: 0.5 },
        ],
      },
      veggies: {
        id: 'veggies',
        label: 'Preferencias',
        type: 'toggle',
        options: [
          { id: 'no-onion', label: 'Sin cebolla', price: 0 },
          { id: 'no-cilantro', label: 'Sin cilantro', price: 0 },
        ],
      },
      addons: {
        id: 'addons',
        label: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'pico', label: 'Pico de gallo extra', price: 0 },
          { id: 'avocado', label: 'Aguacate (+$0.52)', price: 0.52 },
          { id: 'queso-fresco', label: 'Queso fresco', price: 0 },
          { id: 'crema', label: 'Crema', price: 0 },
          { id: 'extra-cheese', label: 'Queso extra (+$1.50)', price: 1.5 },
          { id: 'extra-tortilla', label: 'Tortilla extra (+$2.08)', price: 2.08 },
          { id: 'two-eggs', label: '2 huevos (+$5.20)', price: 5.2 },
        ],
      },
      margaritaRim: {
        id: 'rim',
        label: 'Rim',
        type: 'radio',
        default: 'Salt',
        options: [
          { id: 'Salt', label: 'Sal', price: 0 },
          { id: 'Sugar', label: 'Azúcar', price: 0 },
          { id: 'Tajin', label: 'Tajín', price: 0 },
        ],
      },
      margaritaFlavor: {
        id: 'flavor',
        label: 'Sabor',
        type: 'radio',
        default: 'Lime',
        options: [
          { id: 'Lime', label: 'Limón clásico', price: 0 },
          { id: 'Strawberry', label: 'Fresa (+$2)', price: 2 },
          { id: 'Mango', label: 'Mango (+$2)', price: 2 },
          { id: 'Pineapple', label: 'Piña jalapeño (+$2)', price: 2 },
          { id: 'Watermelon', label: 'Sandía (+$2)', price: 2 },
        ],
      },
      mojitoFlavor: {
        id: 'mojito-flavor',
        label: 'Sabor',
        type: 'radio',
        default: 'Strawberry',
        options: [
          { id: 'Strawberry', label: 'Fresa', price: 0 },
          { id: 'Blueberry', label: 'Arándano', price: 0 },
        ],
      },
      kidsProtein: {
        id: 'kids-protein',
        label: 'Proteína',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Pollo', price: 0 },
          { id: 'Res', label: 'Res molida', price: 0 },
        ],
      },
      kidsSide: {
        id: 'kids-side',
        label: 'Acompañamiento',
        type: 'radio',
        default: 'Rice',
        options: [
          { id: 'Rice', label: 'Arroz', price: 0 },
          { id: 'Fries', label: 'Papas fritas', price: 0 },
        ],
      },
      lunchProtein2: {
        id: 'lunch-protein',
        label: 'Proteína',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Pollo', price: 0 },
          { id: 'Carne Molida', label: 'Res molida', price: 0 },
        ],
      },
      lunchProtein3: {
        id: 'lunch-protein',
        label: 'Proteína',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Pollo', price: 0 },
          { id: 'Carne Molida', label: 'Res molida', price: 0 },
          { id: 'Queso', label: 'Queso', price: 0 },
        ],
      },
      lunchFajita: {
        id: 'lunch-fajita',
        label: 'Proteína',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Pollo', price: 0 },
          { id: 'Asada', label: 'Asada (+$2)', price: 2 },
        ],
      },
      fajitaProtein2: {
        id: 'fajita-protein',
        label: 'Proteína',
        type: 'radio',
        default: 'Pollo',
        options: [
          { id: 'Pollo', label: 'Pollo', price: 0 },
          { id: 'Asada', label: 'Asada', price: 0 },
        ],
      },
      grillFry: {
        id: 'grill-fry',
        label: 'Estilo',
        type: 'radio',
        default: 'Grilled',
        options: [
          { id: 'Grilled', label: 'Asado', price: 0 },
          { id: 'Fried', label: 'Frito', price: 0 },
        ],
      },
      breakfastSide: {
        id: 'bf-side',
        label: 'Opción',
        type: 'radio',
        default: 'Bacon',
        options: [
          { id: 'Bacon', label: 'Tocino', price: 0 },
          { id: 'Chorizo', label: 'Chorizo', price: 0 },
        ],
      },
      breakfastChorizo: {
        id: 'bf-chorizo',
        label: 'Extras',
        type: 'toggle',
        options: [{ id: 'add-chorizo', label: 'Agregar chorizo (+$4.25)', price: 4.25 }],
      },
      breakfastPrefs: {
        id: 'bf-prefs',
        label: 'Preferencias',
        type: 'toggle',
        options: [
          { id: 'no-onion', label: 'Sin cebolla', price: 0 },
          { id: 'extra-hash', label: 'Papas hash browns extra (+$2)', price: 2 },
        ],
      },
      aguaFlavor: {
        id: 'agua-flavor',
        label: 'Sabor',
        type: 'radio',
        default: 'Horchata',
        options: [
          { id: 'Horchata', label: 'Horchata', price: 0 },
          { id: 'Jamaica', label: 'Jamaica', price: 0 },
          { id: 'Pina', label: 'Piña', price: 0 },
          { id: 'Melon', label: 'Melón', price: 0 },
          { id: 'Pepino', label: 'Pepino con limón', price: 0 },
        ],
      },
      sizeSmallLarge: {
        id: 'size',
        label: 'Tamaño',
        type: 'radio',
        default: 'Small',
        options: [
          { id: 'Small', label: 'Chico', price: 0 },
          { id: 'Large', label: 'Grande', price: 0 },
        ],
      },
      veggieChoice: {
        id: 'veggie',
        label: 'Vegetal',
        type: 'radio',
        default: 'Peppers',
        options: [
          { id: 'Peppers', label: 'Chile', price: 0 },
          { id: 'Mushrooms', label: 'Champiñones', price: 0 },
          { id: 'Cactus', label: 'Nopales', price: 0 },
        ],
      },
      salsaChoice: {
        id: 'salsa',
        label: 'Salsa',
        type: 'radio',
        default: 'Both',
        options: [
          { id: 'Verde', label: 'Salsa verde', price: 0 },
          { id: 'Roja', label: 'Salsa roja', price: 0 },
          { id: 'Both', label: 'Verde y roja', price: 0 },
        ],
      },
      softDrink: {
        id: 'soft-drink',
        label: 'Refresco',
        type: 'radio',
        default: 'Coke',
        options: [
          { id: 'Coke', label: 'Coca-Cola', price: 0 },
          { id: 'Pepsi', label: 'Pepsi', price: 0 },
          { id: 'Sprite', label: 'Sprite', price: 0 },
          { id: 'Mountain Dew', label: 'Mountain Dew', price: 0 },
          { id: 'Fanta', label: 'Fanta', price: 0 },
          { id: 'Fresca', label: 'Fresca', price: 0 },
        ],
      },
      jarritosFlavor: {
        id: 'jarritos',
        label: 'Sabor',
        type: 'radio',
        default: 'Tamarind',
        options: [
          { id: 'Tamarind', label: 'Tamarindo', price: 0 },
          { id: 'Mandarin', label: 'Mandarina', price: 0 },
          { id: 'Grapefruit', label: 'Toronja', price: 0 },
          { id: 'Lime', label: 'Limón', price: 0 },
          { id: 'Squirt', label: 'Squirt', price: 0 },
        ],
      },
      beer12: {
        id: 'beer-12',
        label: 'Cerveza',
        type: 'radio',
        default: 'Corona',
        options: [
          { id: 'Corona', label: 'Corona', price: 0 },
          { id: 'Modelo', label: 'Modelo', price: 0 },
          { id: 'Victoria', label: 'Victoria', price: 0 },
          { id: 'Dos XX', label: 'Dos XX', price: 0 },
          { id: 'Modelo Negra', label: 'Modelo Negra', price: 0 },
          { id: 'Tecate', label: 'Tecate', price: 0 },
          { id: 'Pacifico', label: 'Pacifico', price: 0 },
        ],
      },
      beer32: {
        id: 'beer-32',
        label: 'Cerveza',
        type: 'radio',
        default: 'Corona Familiar',
        options: [
          { id: 'Corona Familiar', label: 'Corona Familiar', price: 0 },
          { id: 'Modelo', label: 'Modelo', price: 0 },
          { id: 'Tecate', label: 'Tecate', price: 0 },
          { id: 'Carta Blanca', label: 'Carta Blanca', price: 0 },
          { id: 'Victoria', label: 'Victoria', price: 0 },
        ],
      },
      micheladaChelada: {
        id: 'chelada',
        label: 'Sabor',
        type: 'radio',
        default: 'Especial',
        options: [
          { id: 'Mango y Chile', label: 'Mango y Chile', price: 0 },
          { id: 'Pina Picante', label: 'Piña Picante', price: 0 },
          { id: 'Especial', label: 'Especial', price: 0 },
          { id: 'Sandia Picante', label: 'Sandía Picante', price: 0 },
          { id: 'Limon y Sal', label: 'Limón y Sal', price: 0 },
        ],
      },
    },
  };

  const CUSTOM_SECTIONS = new Set([
    'tacos',
    'burritos',
    'chimichangas',
    'quesadillas',
    'tortas',
    'enchiladas',
    'appetizers',
  ]);

  const FIXED_PROTEIN_RE =
    /birria|shrimp|camarones|campechano|albañil|albanil|dorados|cubana|mummia|molcajete|oaxaqueño|oaxaqueno|mar y tierra|menudo|caldo|siete mares|mojarra|tlayuda|parrillada|coctel|spaghetti|phil\b|huevos enchilados|chilaquiles|gorditas|huarache|nuggets|davey|acp|birria/i;

  function getModifierDefs(lang) {
    return DEFS[lang === 'es' ? 'es' : 'en'];
  }

  function hasGroup(groups, id) {
    return groups.some((g) => g.id === id);
  }

  function hasProteinGroup(groups) {
    return groups.some((g) =>
      ['meat', 'lunch-protein', 'lunch-fajita', 'fajita-protein', 'kids-protein'].includes(g.id)
    );
  }

  function isLunchTacoItem(item) {
    const nameLower = (item.name || '').toLowerCase();
    return nameLower.includes('taco') && !nameLower.includes('birria');
  }

  function isStandardMeatTaco(sectionId, item) {
    if (sectionId !== 'tacos') return false;
    const n = (item.name || '').toLowerCase();
    return (
      item.meats ||
      n === 'taco' ||
      n.includes('order of tacos') ||
      n.includes('crunchy tacos') ||
      n.includes('orden de tacos') ||
      n.includes('tacos crunchy')
    );
  }

  function addMeatCombo(defs, groups, sectionId) {
    if (hasProteinGroup(groups)) return;
    groups.push(defs.meat);
    if (CUSTOM_SECTIONS.has(sectionId)) {
      if (!hasGroup(groups, 'tortilla')) groups.push(defs.tortilla);
      if (sectionId === 'tacos' || sectionId === 'burritos') {
        if (!hasGroup(groups, 'veggies')) groups.push(defs.veggies);
        if (!hasGroup(groups, 'addons')) groups.push(defs.addons);
      }
    }
  }

  function formatMoney(amount) {
    return '$' + Number(amount).toFixed(2);
  }

  function hasDualSize(item) {
    return Boolean(item?.sizeSmallLarge && item?.sizePrices);
  }

  function buildSizeGroup(defs, item, lang) {
    const base = defs.sizeSmallLarge;
    const prices = item.sizePrices;
    if (!prices) return base;

    const smallPrice = prices.Small ?? prices.small ?? 0;
    const largePrice = prices.Large ?? prices.large ?? smallPrice;
    const smallLabel = lang === 'es' ? 'Chico' : 'Small';
    const largeLabel = lang === 'es' ? 'Grande' : 'Large';
    const bothLabel = lang === 'es' ? 'Ambos' : 'Both';

    return {
      id: 'size',
      label: base.label,
      type: 'radio',
      default: 'Small',
      options: [
        { id: 'Small', label: `${smallLabel} (${formatMoney(smallPrice)})`, price: 0 },
        { id: 'Large', label: `${largeLabel} (${formatMoney(largePrice)})`, price: Math.max(0, largePrice - smallPrice) },
        {
          id: 'Both',
          label: `${bothLabel} (${formatMoney(smallPrice)} + ${formatMoney(largePrice)})`,
          price: largePrice,
        },
      ],
    };
  }

  function applyExplicitFlags(sectionId, item, defs, groups, lang) {
    if (item.lunchProtein3) groups.push(defs.lunchProtein3);
    else if (item.lunchFajita) groups.push(defs.lunchFajita);
    else if (item.lunchProtein2) groups.push(defs.lunchProtein2);
    else if (item.fajitaProtein2) groups.push(defs.fajitaProtein2);
    else if (item.meats) addMeatCombo(defs, groups, sectionId);

    if (item.grillFry && !hasGroup(groups, 'grill-fry')) groups.push(defs.grillFry);
    if (item.tortilla && !hasGroup(groups, 'tortilla')) groups.push(defs.tortilla);
    if (item.shrimpTortilla && !hasGroup(groups, 'shrimp-tortilla')) groups.push(defs.shrimpTortilla);
    if (item.breakfastSide && !hasGroup(groups, 'bf-side')) groups.push(defs.breakfastSide);
    if (item.breakfastChorizo && !hasGroup(groups, 'bf-chorizo')) groups.push(defs.breakfastChorizo);
    if (item.breakfastPrefs && !hasGroup(groups, 'bf-prefs')) groups.push(defs.breakfastPrefs);
    if (item.aguaFlavor && !hasGroup(groups, 'agua-flavor')) groups.push(defs.aguaFlavor);
    if (item.sizeSmallLarge && !hasGroup(groups, 'size')) {
      groups.push(buildSizeGroup(defs, item, lang));
    }
    if (item.veggieChoice && !hasGroup(groups, 'veggie')) groups.push(defs.veggieChoice);
    if (item.salsaChoice && !hasGroup(groups, 'salsa')) groups.push(defs.salsaChoice);
    if (item.softDrink && !hasGroup(groups, 'soft-drink')) groups.push(defs.softDrink);
    if (item.jarritosFlavor && !hasGroup(groups, 'jarritos')) groups.push(defs.jarritosFlavor);
    if (item.beer12 && !hasGroup(groups, 'beer-12')) groups.push(defs.beer12);
    if (item.beer32 && !hasGroup(groups, 'beer-32')) groups.push(defs.beer32);
    if (item.micheladaChelada && !hasGroup(groups, 'chelada')) groups.push(defs.micheladaChelada);

    if (sectionId === 'daily-lunch' && isLunchTacoItem(item)) {
      if (!hasGroup(groups, 'tortilla')) groups.push(defs.tortilla);
      if (!hasGroup(groups, 'veggies')) groups.push(defs.veggies);
    }

    if (isStandardMeatTaco(sectionId, item)) {
      if (!hasProteinGroup(groups)) addMeatCombo(defs, groups, sectionId);
      if (!hasGroup(groups, 'veggies')) groups.push(defs.veggies);
      if (!hasGroup(groups, 'addons')) groups.push(defs.addons);
    }

    if (sectionId === 'kids') {
      if (item.kidsProtein && !hasGroup(groups, 'kids-protein')) groups.push(defs.kidsProtein);
      if (item.kidsSide && !hasGroup(groups, 'kids-side')) groups.push(defs.kidsSide);
    }

    if (sectionId === 'fajitas' && !hasGroup(groups, 'tortilla')) {
      groups.push(defs.tortilla);
    }

    const nameLower = (item.name || '').toLowerCase();
    if (sectionId === 'alcohol') {
      if (nameLower.includes('margarita')) {
        if (!hasGroup(groups, 'rim')) groups.push(defs.margaritaRim);
        if (!hasGroup(groups, 'flavor')) groups.push(defs.margaritaFlavor);
      }
      if (nameLower.includes('mojito') && !hasGroup(groups, 'mojito-flavor')) {
        groups.push(defs.mojitoFlavor);
      }
    }
  }

  function applyInferredFlags(sectionId, item, defs, groups, lang) {
    const text = `${item.name || ''} ${item.desc || ''}`.toLowerCase();
    const nameLower = (item.name || '').toLowerCase();

    if (FIXED_PROTEIN_RE.test(text) && !item.meats && !item.lunchProtein2 && !item.lunchProtein3) {
      // skip auto meat on fixed-protein dishes
    } else if (!hasProteinGroup(groups)) {
      if (/chicken, ground beef, or cheese|chicken or cheese|pollo, res molida o queso|pollo o queso/.test(text)) {
        groups.push(defs.lunchProtein3);
      } else if (/sub steak|asada \+\$2|steak \(\+\$2\)/.test(text)) {
        groups.push(defs.lunchFajita);
      } else if (/ground beef or chicken|chicken or ground beef|res molida o pollo|carne molida o pollo/.test(text)) {
        groups.push(defs.lunchProtein2);
      } else if (/steak or chicken|asada o pollo/.test(text)) {
        groups.push(defs.fajitaProtein2);
      } else if (
        /choice of meat|your choice of meat|su carne|filled with meat|with meat,|with meat and|choice of protein|su proteína/.test(
          text
        )
      ) {
        addMeatCombo(defs, groups, sectionId);
      }
    }

    if (/corn or flour tortilla|tortillas de maíz o harina|\(4\) corn or \(3\) flour|maíz o harina/.test(text)) {
      if (!hasGroup(groups, 'tortilla')) groups.push(defs.tortilla);
    }

    if (/grilled or fried|asado o frito/.test(text) && !hasGroup(groups, 'grill-fry')) {
      groups.push(defs.grillFry);
    }

    if (/bacon or|tocino o chorizo|choice of bacon/.test(text) && !hasGroup(groups, 'bf-side')) {
      groups.push(defs.breakfastSide);
    }

    if (/add chorizo|chorizo \+\$4|agregar chorizo/.test(text) && !hasGroup(groups, 'bf-chorizo')) {
      groups.push(defs.breakfastChorizo);
    }

    if (nameLower.includes('aguas frescas') && !hasGroup(groups, 'agua-flavor')) {
      groups.push(defs.aguaFlavor);
    }

    if (/small \$.*large|chico \$.*grande/.test(text) && !hasGroup(groups, 'size')) {
      groups.push(buildSizeGroup(defs, item, lang));
    }

    if (/mushrooms or cactus|champiñones o nopal|bell peppers, mushrooms/.test(text) && !hasGroup(groups, 'veggie')) {
      groups.push(defs.veggieChoice);
    }

    if (/green and\/or red salsa|salsa verde y\/o roja|verde y\/o roja/.test(text) && !hasGroup(groups, 'salsa')) {
      groups.push(defs.salsaChoice);
    }

    if (/flour tortilla \+\$0\.50|harina \+\$0\.50/.test(text) && !hasGroup(groups, 'shrimp-tortilla')) {
      groups.push(defs.shrimpTortilla);
    }

    if (sectionId === 'breakfast' && !hasGroup(groups, 'bf-prefs')) {
      const isSide =
        /orange juice|jugo|café|coffee|hash brown|pancake|bacon'|^bacon$|2 fried eggs \(side\)|2 huevos fritos \(lado\)|2 pancakes|2 panqueques|^bacon$|^tocino$/.test(
          nameLower
        ) || nameLower === 'bacon';
      if (!isSide && !nameLower.includes('aguas frescas')) {
        groups.push(defs.breakfastPrefs);
      }
    }

    if (sectionId === 'kids' && !hasGroup(groups, 'kids-protein')) {
      if (/kids quesadilla|quesadilla infantil|kids burrito|burrito infantil/.test(text)) {
        groups.push(defs.kidsProtein);
      }
    }

    if (sectionId === 'kids' && /rice or fries|arroz o papas/.test(text) && !hasGroup(groups, 'kids-side')) {
      groups.push(defs.kidsSide);
    }

    if (sectionId === 'drinks') {
      if (/coke, pepsi|coca-cola, pepsi|refrescos/.test(text) && !hasGroup(groups, 'soft-drink')) {
        groups.push(defs.softDrink);
      }
      if (/jarritos|squirt/.test(nameLower) && !hasGroup(groups, 'jarritos')) {
        groups.push(defs.jarritosFlavor);
      }
    }

    if (sectionId === 'alcohol') {
      if (nameLower.includes('beer (12') && !hasGroup(groups, 'beer-12')) groups.push(defs.beer12);
      if (nameLower.includes('beer (32') && !hasGroup(groups, 'beer-32')) groups.push(defs.beer32);
      if (nameLower.includes('michelada chelada') && !hasGroup(groups, 'chelada')) groups.push(defs.micheladaChelada);
    }
  }

  function getModifiersForItem(sectionId, item) {
    const lang = window.MENU_LANG === 'es' ? 'es' : 'en';
    const defs = getModifierDefs(lang);
    const groups = [];

    applyExplicitFlags(sectionId, item, defs, groups, lang);
    applyInferredFlags(sectionId, item, defs, groups, lang);

    if (item.sizePrices && hasGroup(groups, 'size')) {
      const idx = groups.findIndex((g) => g.id === 'size');
      groups[idx] = buildSizeGroup(defs, item, lang);
    }

    return groups;
  }

  window.MenuModifiers = {
    getModifierDefs,
    getModifiersForItem,
    hasDualSize,
  };
})();