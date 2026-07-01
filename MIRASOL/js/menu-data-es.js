const MEAT_CHOICES_ES = 'Asada · Barbacoa · Lengua · Cachete · Carne Molida · Pollo · Chorizo · Al Pastor · Carnitas';

const FEATURED_ITEMS_ES = [
  {
    section: 'platters',
    name: 'Nachos',
    headline: 'Nachos Cargados',
    blurb: 'Totopos crujientes con pollo sazonado, queso derretido, pico, aguacate y toppings frescos.',
    image: 'assets/images/menu/groky/nachos.jpg?v=groky2',
    tag: 'popular',
  },
  {
    section: 'fajitas',
    name: 'Fajitas de Camarones',
    headline: 'Camarones a la Plancha',
    blurb: 'Camarones sazonados con arroz, frijoles, aguacate y todos los acompañamientos.',
    image: 'assets/images/menu/groky/shrimp-fajitas.jpg?v=groky2',
    tag: 'popular',
  },
  {
    section: 'broths',
    name: 'Menudo',
    headline: 'Menudo de Fin de Semana',
    blurb: 'Sopa tradicional — viernes, sábado y domingo. Favorito del condado.',
    image: 'assets/images/menu/groky/menudo.jpg?v=groky2',
    tag: 'weekend',
  },
  {
    section: 'alcohol',
    name: 'Margarita',
    headline: 'Margaritas Artesanales',
    blurb: 'Limón recién exprimido, frutas frescas y su elección de sal o Tajín.',
    image: 'assets/images/menu/groky/mango-margarita.jpg?v=groky2',
    tag: 'popular',
  },
];

const MENU_DATA_ES = [
  {
    id: 'breakfast',
    title: 'Desayuno',
    note: 'Por las ma\u00f1anas \u2014 huevos, burritos, panqueques y m\u00e1s.',
    items: [
      { name: 'Bacon y Huevos', price: '$12.99', desc: 'Huevos revueltos con tocino y papas hash browns.', breakfastPrefs: true },
      { name: 'Huevo con Jamón', price: '$14.99', desc: 'Huevos revueltos con jamón y papas hash browns.', breakfastPrefs: true },
      { name: 'Tacos de Pancake', price: '$13.99', desc: 'Pancakes con huevo, tocino o chorizo, queso y hash browns.', breakfastSide: true, breakfastPrefs: true },
      { name: 'Carne Asada con Huevo', price: '$15.99', desc: 'Asada y huevos fritos con arroz, frijoles y tortillas.', tortilla: true, breakfastPrefs: true },
      { name: 'Huevo con Chorizo', price: '$14.99', desc: 'Huevos revueltos con chorizo y hash browns.', tortilla: true, breakfastPrefs: true },
      { name: 'Panqueques de Fresa', price: '$14.99', desc: 'Con crema batida, jarabe de fresa y fresas frescas.', breakfastPrefs: true },
      { name: 'Huevos Ahogados', price: '$13.99', desc: 'Huevos en salsa verde con arroz, frijoles, queso y tortillas.', tortilla: true, breakfastPrefs: true },
      { name: 'Chilaquiles en Salsa Verde', price: '$16.99', desc: 'Totopos en salsa verde con asada, huevos fritos y queso. Chorizo +$4.25.', breakfastChorizo: true, breakfastPrefs: true },
      { name: 'Burrito de Papas con Chorizo', price: '$12.99', desc: 'Tortilla de harina con chorizo, papas y queso.', breakfastPrefs: true },
      { name: 'Burrito Huevo a la Mexicana', price: '$12.99', desc: 'Huevos revueltos, pico de gallo, queso y papas.', breakfastPrefs: true },
      { name: 'Burrito de Huevo con Jamón', price: '$12.99', desc: 'Huevos revueltos, jamón, papas y queso.', breakfastPrefs: true },
      { name: 'Burrito Huevo con Chorizo y Papas', price: '$13.99', desc: 'Huevos revueltos, chorizo, queso y papas.', breakfastPrefs: true },
      { name: 'Jugo de Naranja', price: '$3.99' },
      { name: 'Café de Olla', price: '$3.99' },
      { name: 'Aguas Frescas', price: '$3.50', desc: 'Jamaica, piña, horchata o pepino con limón.', aguaFlavor: true },
      { name: 'Papas Hash Browns', price: '$5.99' },
      { name: 'Huevos Fritos (lado)', price: '$5.99' },
      { name: 'Tocino', price: '$6.99' },
      { name: 'Panqueques', price: '$5.99' }
    ]
  },
  {
    id: 'daily-lunch',
    title: 'Almuerzo del Día',
    note: 'Menú de almuerzo diario — de 10 AM a 3 PM.',
    items: [
      { name: 'Tacos Crunchy', price: '$11.99', desc: 'Res molida o pollo con arroz y frijoles.', lunchProtein2: true },
      { name: 'Tacos', price: '$11.99', desc: 'Res molida o pollo con arroz y frijoles.', lunchProtein2: true },
      { name: 'Empanadas', price: '$13.50', desc: 'Pollo o queso con crema, queso, arroz y frijoles.', lunchProtein3: true },
      { name: 'Enchiladas', price: '$12.99', desc: 'Pollo, res molida o queso con aguacate, arroz y frijoles.', lunchProtein3: true },
      { name: 'Quesadilla', price: '$10.99', desc: 'Res molida o pollo con lechuga, pico y arroz.', lunchProtein2: true },
      { name: 'Torta Mediana', price: '$12.99', desc: 'Pollo o res molida con frijoles, lechuga, queso fresco y aguacate.', lunchProtein2: true },
      { name: 'Tamales', price: '$12.99', desc: 'Pollo con salsa verde y/o roja, arroz y frijoles.', salsaChoice: true },
      { name: 'Fajitas', price: '$13.99', desc: 'Pollo con pimientos y cebolla, arroz, frijoles y tortillas. Asada +$2.', lunchFajita: true },
      { name: 'Huevos Fritos', price: '$10.99', desc: 'Con arroz, frijoles y tortillas de harina.', tortilla: true },
      { name: 'ACP Pequeño', price: '$11.99', desc: 'Pollo a la plancha, arroz, queso y tortillas.', tortilla: true },
      { name: 'Especial Davey', price: '$13.99', desc: 'Pollo y chorizo con queso, arroz y tortillas.', tortilla: true },
      { name: 'Tacos de Birria', price: '$12.99', desc: 'Tortillas de maíz con birria de res, cebolla, cilantro, arroz y caldo.' }
    ]
  },
  {
    id: 'appetizers',
    title: 'Antojitos y Entradas',
    items: [
      { name: 'Queso', price: 'Chico $4 · Grande $7', desc: 'Dip de queso caliente.', sizeSmallLarge: true, sizePrices: { Small: 4, Large: 7 } },
      { name: 'Choriqueso', price: 'Chico $5 · Grande $9', desc: 'Queso con chorizo.', sizeSmallLarge: true, sizePrices: { Small: 5, Large: 9 } },
      { name: 'Frijoles con Queso', price: '$7.28', desc: 'Queso con frijoles refritos.' },
      { name: 'Guacamole', price: 'Chico $5 · Grande $8', desc: 'Guacamole fresco.', sizeSmallLarge: true, sizePrices: { Small: 5, Large: 8 } },
      { name: 'Esquite', price: '$6.00', desc: 'Elote en vaso con mayonesa, queso, chile en polvo y limón.' },
      { name: 'Elote', price: '$4.50', desc: 'Elote en la mazorca con mayonesa, queso y chile en polvo.' },
      { name: 'Sope', price: '$8.50', desc: 'Pollo, asada, camarones, cebolla y chile asados.', meats: true },
      { name: 'Huarache', price: '$14.99', desc: 'Asada con cebolla y chile asados.' },
      { name: 'Gorditas', price: '$15.99', desc: 'Asada y chorizo, queso mozzarella, arroz y frijoles.' },
      { name: 'Tamales', price: '$12.99', desc: 'Con arroz, frijoles y ensalada.' },
      { name: 'Tostada', price: '$5 c/u', desc: 'Una tostada con frijoles, su carne preferida, lechuga, crema, queso y pico de gallo. La foto muestra cuatro — $5 cada una.', meats: true },
      { name: 'Empanadas', price: '$16.50', desc: 'Tortillas de maíz fritas rellenas de pollo o queso.', lunchProtein3: true }
    ]
  },
  {
    id: 'tacos',
    title: 'Tacos',
    items: [
      { name: 'Taco', price: '$3.12 c/u', desc: 'Taco de maíz con cilantro, cebolla y limón.', meats: true },
      { name: 'Orden de Tacos', price: '$14.99', desc: 'Tacos de maíz con cilantro y cebolla. Con arroz y frijoles.', meats: true },
      { name: 'Tacos Crunchy', price: '$13.99', desc: 'Tortillas de maíz fritas con su carne, lechuga, crema y pico.', meats: true },
      { name: 'Tacos Dorados', price: '$13.99', desc: 'Tortillas enrolladas fritas con pollo deshebrado, crema, queso, lechuga, pico y arroz.' },
      { name: 'Tacos de Birria', price: '$16.99', desc: 'Tortillas de maíz con birria de res y mozzarella, caldo de birria, arroz y consomé.', tag: 'signature', sku: 'taco-birria' },
      { name: 'Tacos de Birria de Pollo', price: '$15.50', desc: 'Tortillas de maíz con birria de pollo y mozzarella, caldo de birria, arroz y consomé.' },
      { name: 'Tacos de Camarones', price: '$16.99', desc: 'Tortillas de maíz con camarones asados, cebolla y cilantro. Tortilla de harina +$0.50.', shrimpTortilla: true },
      { name: 'Tacos Campechanos', price: '$15.99', desc: 'Tortillas de maíz con asada y chorizo, cebolla y cilantro, arroz y frijoles.' },
      { name: 'Tacos Albañil', price: '$15.99', desc: 'Tortillas de maíz con huevo revuelto y chorizo, cebolla y cilantro, arroz y frijoles.' }
    ]
  },
  {
    id: 'burritos',
    title: 'Burritos',
    note: 'Servidos con arroz, frijoles, ensalada y pico de gallo.',
    items: [
      { name: 'Burrito Meal', price: '$13.51', desc: 'Tortilla de harina grande con carne, queso, frijoles y arroz.', meats: true },
      { name: 'Burrito Fajita', price: '$16.00', desc: 'Asada o pollo con cebolla y chile asados, mozzarella, arroz y frijoles.', fajitaProtein2: true },
      { name: 'Burrito Choripollo', price: '$15.80', desc: 'Pollo y chorizo, mozzarella, arroz y frijoles.' },
      { name: 'Burrito Campechano', price: '$15.80', desc: 'Asada y chorizo, mozzarella, arroz y frijoles.' },
      { name: 'Burrito California', price: '$16.00', desc: 'Tortilla de harina grande con carne, queso, frijoles y arroz.', meats: true },
      { name: 'Burrito de Camarones', price: '$17.75', desc: 'Camarones, mozzarella, arroz y frijoles. Cubierto con salsa de queso.' },
      { name: 'Burrito Vegetariano', price: '$14.05', desc: 'Chile, champiñones o nopales, mozzarella, arroz y frijoles.', veggieChoice: true },
      { name: 'Burrito Huevos a la Mexicana', price: '$14.00', desc: 'Huevos revueltos con tomates, cebollas, cilantro, arroz y frijoles.' }
    ]
  },
  {
    id: 'chimichangas',
    title: 'Chimichangas',
    note: 'Servidas con arroz, frijoles, ensalada y pico de gallo.',
    items: [
      { name: 'Chimichanga Meal', price: '$15.49', desc: 'Tortilla de harina frita con carne y mozzarella, cubierta con salsa de queso.', meats: true },
      { name: 'Chimichanga de Camarones', price: '$17.99', desc: 'Tortilla de harina frita con camarones y mozzarella, cubierta con salsa de queso.' },
      { name: 'Burrito Mummia', price: '$17.99', desc: 'Tortilla con asada y camarones, mozzarella y frijoles, envuelta en tocino, frita, con queso y chipotle, pico y aguacate. Sin acompañamientos.' }
    ]
  },
  {
    id: 'quesadillas',
    title: 'Quesadillas',
    note: 'Servidas con arroz, ensalada y pico de gallo.',
    items: [
      { name: 'Quesadilla Meal', price: '$13.99', desc: 'Tortilla de harina grande con carne y mozzarella.', meats: true },
      { name: 'Quesadilla de Camarones', price: '$15.50', desc: 'Tortilla de harina grande con camarones y mozzarella.' },
      { name: 'Quesadilla Vegetariana', price: '$13.51', desc: 'Cebollas, chiles, champiñones o nopales asados con mozzarella.', veggieChoice: true },
      { name: 'Quesadilla Fajita', price: '$16.99', desc: 'Asada o pollo con cebolla y chile asados y mozzarella.', fajitaProtein2: true },
      { name: 'Quesadilla de Maíz', price: '$14.55', desc: 'Tortilla de maíz con su proteína y mozzarella.', meats: true },
      { name: 'Quesadilla de Birria', price: '$15.99', desc: 'Birria de res y mozzarella, bañada en caldo de birria. Con caldo extra, arroz, cilantro, cebolla y limones.' }
    ]
  },
  {
    id: 'tortas',
    title: 'Tortas',
    items: [
      { name: 'Torta', price: '$15.99', desc: 'Sándwich grande con mozzarella, carne, lechuga, queso desmoronado, aguacate y mayonesa.', meats: true },
      { name: 'Torta Cubana', price: '$18.99', desc: 'Asada, jamón, chorizo, huevo frito, mozzarella, lechuga, queso, tomates, aguacate y mayonesa.' },
      { name: 'Torta de Res Frita', price: '$17.99', desc: 'Res frita, mozzarella, lechuga, queso, aguacate y mayonesa.' },
      { name: 'Torta de Pollo Frito', price: '$16.99', desc: 'Pollo frito, mozzarella, lechuga, queso, aguacate y mayonesa.' }
    ]
  },
  {
    id: 'fajitas',
    title: 'Fajitas',
    note: 'Servidas con arroz, frijoles, ensalada y pico.',
    items: [
      { name: 'Fajitas Campechanas', price: '$24.99', desc: 'Pollo, asada, camarones, chorizo, cebolla y chile asados.' },
      { name: 'Fajitas Mixtas', price: '$21.99', desc: 'Pollo, asada, camarones, cebolla y chile asados.' },
      { name: 'Fajitas de Camarones', price: '$20.99', desc: 'Camarones con cebolla y chile asados.' },
      { name: 'Fajitas de Res', price: '$17.99', desc: 'Asada con cebolla y chile asados.' },
      { name: 'Fajitas de Pollo', price: '$16.99', desc: 'Pollo con cebolla y chile asados.' }
    ]
  },
  {
    id: 'enchiladas',
    title: 'Enchiladas',
    note: 'Servidas con ensalada y pico de gallo.',
    items: [
      { name: 'Enchiladas', price: '$16.50', desc: 'Tortillas de maíz con su carne, salsa poblana, crema y queso desmoronado.', meats: true },
      { name: 'Enchiladas con Queso', price: '$17.50', desc: 'Enchiladas con salsa de queso, crema y queso desmoronado.', meats: true },
      { name: 'Enchiladas Campechanas', price: '$17.99', desc: 'Asada y chorizo con salsa poblana, crema y queso desmoronado.' }
    ]
  },
  {
    id: 'platters',
    title: 'Platos Fuertes',
    split: 13,
    items: [
      { name: 'ACP (Arroz Con Pollo)', price: '$13.99', desc: 'Pollo, arroz y salsa de queso. Tortillas de maíz o harina.', tortilla: true },
      { name: 'Especial de Davey', price: '$14.51', desc: 'Pollo, chorizo y salsa de queso. Tortillas de maíz o harina.', tortilla: true },
      { name: 'Carne Asada', price: '$19.99', desc: 'Asada a la parrilla con cebollas, arroz, frijoles, lechuga y pico. Tortillas de maíz o harina.', tortilla: true },
      { name: 'Oaxaqueño', price: '$24.99', desc: 'Asada, camarones, nopal, queso, cebollas, arroz, frijoles, lechuga y pico.', tag: 'signature', sku: 'plt-oaxaqueno', tortilla: true },
      { name: 'Oaxaqueño de Pollo', price: '$21.75', desc: 'Pollo, camarones, nopal, queso, cebollas, arroz, frijoles, lechuga y pico.', tortilla: true },
      { name: 'Mojarra Frita', price: '$27.99', desc: 'Tilapia frita con arroz, frijoles, lechuga y pico.', tortilla: true },
      { name: 'Chile Relleno', price: '$15.99', desc: 'Poblano asado relleno de carne molida y mozzarella, arroz y frijoles.', tortilla: true },
      { name: 'Taco Salad', price: '$13.51', desc: 'Tazón de tortilla frita con carne, frijoles, lechuga, crema, queso, pepino y limón.', meats: true },
      { name: 'Chilaquiles', price: '$19.99', desc: 'Totopos en salsa poblana con asada, huevos fritos, queso y aguacate.' },
      { name: 'Mar y Tierra', price: '$24.99', desc: 'Asada, camarones y pollo con arroz y frijoles.', tortilla: true },
      { name: 'Molcajete', price: '$27.99', desc: 'Asada, pollo, salchicha, nopal, queso, salsa verde, cebollas asadas, arroz y frijoles. Tortillas de maíz o harina.', tag: 'popular', sku: 'plt-molcajete', tortilla: true },
      { name: 'Cazuelón', price: '$22.99', desc: 'Asada, pollo, chorizo, cebollas asadas, arroz y frijoles con salsa de queso y pico de gallo.' },
      { name: 'Tlayuda', price: '$32.00', desc: 'Tostada grande con frijoles, asada, chorizo y queso Oaxaqueño.' },
      { name: 'Nachos', price: '$14.99', desc: 'Totopos de maíz con carne molida o pollo, lechuga, pico de gallo, aguacate, salsa de queso y queso fresco.', lunchProtein2: true },
      { name: 'Bistec Frito', price: '$17.99', desc: 'Bistec con cebollas, arroz, frijoles, lechuga y pico. Tortillas de maíz o harina.', tortilla: true },
      { name: 'Pollo Asado o Frito', price: '$16.67', desc: 'Pollo con cebollas, arroz, frijoles, lechuga y pico. Tortillas de maíz o harina.', grillFry: true, tortilla: true },
      { name: 'Parrillada', price: '$15.00', desc: 'Pollo, longaniza, asada, arroz, frijoles, pico y guacamole.' },
      { name: 'Camarones Empanizados', price: '$21.00', desc: 'Camarones empanizados con arroz, frijoles, lechuga y pico.', tortilla: true },
      { name: 'Coctel de Camarones', price: '$21.00', desc: 'Camarones, calamari, pico, aguacate y pepinos en salsa michelada de la casa.' },
      { name: 'Pollo con Espagueti', price: '$15.00', desc: 'Pechuga de pollo con espagueti en salsa chipotle, lechuga y pico.' },
      { name: 'Phil', price: '$13.51', desc: 'Mozzarella, bistec, pimientos y cebollas con papas fritas.' },
      { name: 'Huevos Enchilados', price: '$16.00', desc: 'Huevos revueltos en salsa picante con bistec, frijoles y queso.' }
    ]
  },
  {
    id: 'kids',
    title: 'Menú Infantil',
    items: [
      { name: 'Quesadilla Infantil', price: '$8.50', desc: 'Tortilla de harina con res o pollo asado y arroz.', kidsProtein: true },
      { name: 'Nuggets con Papas', price: '$10.00', desc: 'Nuggets de pollo con papas fritas.' },
      { name: 'Burrito Infantil', price: '$9.50', desc: 'Tortilla de harina con pollo o carne molida, arroz y frijoles.', kidsProtein: true },
      { name: 'ACP Infantil', price: '$8.50', desc: 'Pollo asado con salsa de queso y arroz. Tortillas a solicitud.', tortilla: true },
      { name: 'Huevos Revueltos', price: '$8.50', desc: 'Huevos revueltos con arroz o papas fritas.', kidsSide: true }
    ]
  },
  {
    id: 'broths',
    title: 'Caldos',
    note: 'Solo viernes, sábados y domingos.',
    items: [
      { name: 'Caldo de Res', price: '$17.67', desc: 'Sopa de res.' },
      { name: 'Caldo de Borrego', price: '$17.67', desc: 'Sopa de borrego.' },
      { name: 'Menudo', price: '$15.59', desc: 'Menudo tradicional.', tag: 'weekend', sku: 'broth-menudo' },
      { name: 'Siete Mares', price: '$19.75', desc: 'Caldo de mariscos.' }
    ]
  },
  {
    id: 'desserts',
    title: 'Postres',
    note: 'Próximamente.',
    items: [
    ]
  },
  {
    id: 'drinks',
    title: 'Bebidas',
    items: [
      { name: 'Aguas Frescas', price: '$3.50', desc: 'Horchata · Piña · Melón · Jamaica', aguaFlavor: true },
      { name: 'Refrescos', price: '$3.64', desc: 'Coca-Cola, Pepsi, Sprite, Mountain Dew, Fanta o Fresca.', softDrink: true },
      { name: 'Jarritos y Squirt', price: '$3.00', jarritosFlavor: true }
    ]
  },
  {
    id: 'alcohol',
    title: 'Cervezas y Bebidas Preparadas',
    items: [
      { name: 'Cerveza (12 oz)', price: '$4.16', desc: 'Corona · Modelo · Victoria · Dos XX · Modelo Negra · Tecate · Corona Familiar · Pacifico', beer12: true },
      { name: 'Cerveza (24 oz)', price: '$5.20', desc: 'Botella Corona Extra' },
      { name: 'Cerveza (32 oz)', price: '$6.24', desc: 'Corona Familiar · Modelo · Tecate · Carta Blanca · Victoria', beer32: true },
      { name: 'Michelada Cheladas', price: '$5.20', desc: 'Mango y Chile · Piña Picante · Especial · Sandia Picante · Limón y Sal', micheladaChelada: true },
      { name: 'Micheladas', price: '$11.43', desc: 'Chamoy, salsa picante, salsa inglesa, limón fresco y cerveza de 12 oz. Actualizar a 32 oz +$4.16.' },
      { name: 'Margarita', price: '$14.00', desc: 'Limón clásico, fresa, mango, durazno, granada, piña o piña con jalapeño. Con sal, azúcar o Tajín.', tag: 'popular', sku: 'drk-margarita' },
      { name: 'Tequila Sunrise', price: '$10.00' },
      { name: 'Mojito', price: '$11.00', desc: 'Fresa o arándano.' },
      { name: 'Irish Trash Can', price: '$14.00' },
      { name: 'Mary Jane', price: '$14.42' },
      { name: 'Piña Colada', price: '$12.43' },
      { name: 'Paloma', price: '$12.10', desc: 'Tequila, jugo de toronja fresco, Squirt y limón fresco.' },
      { name: 'Horchata con Licor', price: '$12.10', desc: 'Horchata, ron especiado y RumChata.' },
      { name: 'Ron con Coca', price: '$9.91' },
      { name: 'Jack con Coca', price: '$9.91' }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.MENU_DATA_ES = MENU_DATA_ES;
  window.MEAT_CHOICES_ES = MEAT_CHOICES_ES;
  window.FEATURED_ITEMS_ES = FEATURED_ITEMS_ES;
}