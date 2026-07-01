const MEAT_CHOICES = 'Asada (Steak) · Barbacoa · Lengua · Cachete · Carne Molida · Pollo (Chicken) · Chorizo · Al Pastor · Carnitas';

/** Signature dishes — marketing hero cards (section id + item name must match MENU_DATA) */
const FEATURED_ITEMS = [
  {
    section: 'platters',
    name: 'Nachos',
    headline: 'Loaded Nachos',
    blurb: 'Crispy chips piled with seasoned chicken, melted queso, pico, avocado, and fresh toppings.',
    image: 'assets/images/menu/groky/nachos.jpg?v=groky2',
    tag: 'popular',
  },
  {
    section: 'fajitas',
    name: 'Shrimp Fajitas',
    headline: 'Grilled Shrimp',
    blurb: 'Seasoned shrimp with rice, beans, avocado, and all the fixings — sizzling and fresh.',
    image: 'assets/images/menu/groky/shrimp-fajitas.jpg?v=groky2',
    tag: 'popular',
  },
  {
    section: 'broths',
    name: 'Menudo',
    headline: 'Weekend Menudo',
    blurb: 'Traditional tripe soup — Fri, Sat & Sun only. A Pender County favorite.',
    image: 'assets/images/menu/groky/menudo.jpg?v=groky2',
    tag: 'weekend',
  },
  {
    section: 'alcohol',
    name: 'Margarita',
    headline: 'Craft Margaritas',
    blurb: 'Fresh-squeezed lime, fruit flavors, and your choice of salt or Tajín rim.',
    image: 'assets/images/menu/groky/mango-margarita.jpg?v=groky2',
    tag: 'popular',
  },
];

const MENU_DATA = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    note: 'Served mornings — eggs, burritos, pancakes & more.',
    items: [
      { name: 'Bacon & Eggs', price: '$12.99', desc: 'Scrambled eggs and bacon with crispy shredded hash browns.', breakfastPrefs: true },
      { name: 'Huevo con Jamón', price: '$14.99', desc: 'Scrambled eggs with ham and crispy shredded hash browns.', breakfastPrefs: true },
      { name: 'Pancake Tacos', price: '$13.99', desc: 'Pancake tacos with scrambled eggs, choice of bacon or Mexican sausage, melted cheese, and hash browns.', breakfastSide: true, breakfastPrefs: true },
      { name: 'Carne Asada con Huevo', price: '$15.99', desc: 'Steak and fried eggs with rice, beans, and cheese. Corn or flour tortillas.', tortilla: true, breakfastPrefs: true },
      { name: 'Huevo con Chorizo', price: '$14.99', desc: 'Scrambled eggs with chorizo and hash browns. Corn or flour tortillas.', tortilla: true, breakfastPrefs: true },
      { name: 'Strawberry Pancakes', price: '$14.99', desc: 'Pancakes with whipped cream, strawberry syrup, and fresh strawberries.', breakfastPrefs: true },
      { name: 'Huevos Ahogados', price: '$13.99', desc: 'Eggs in green salsa with rice, beans, crumbled cheese, and tortillas.', tortilla: true, breakfastPrefs: true },
      { name: 'Chilaquiles en Salsa Verde', price: '$16.99', desc: 'Tortilla chips in green salsa topped with steak, fried eggs, and crumbled cheese. Add chorizo +$4.25.', breakfastChorizo: true, breakfastPrefs: true },
      { name: 'Burrito de Papas con Chorizo', price: '$12.99', desc: 'Flour tortilla with chorizo, hash browns, and melted cheese. Side of hash browns.', breakfastPrefs: true },
      { name: 'Burrito Huevo a la Mexicana', price: '$12.99', desc: 'Scrambled eggs, pico de gallo, melted cheese, and hash browns in a flour tortilla.', breakfastPrefs: true },
      { name: 'Burrito de Huevo con Jamón', price: '$12.99', desc: 'Scrambled eggs, ham, hash browns, and melted cheese.', breakfastPrefs: true },
      { name: 'Burrito Huevo con Chorizo y Papas', price: '$13.99', desc: 'Scrambled eggs, chorizo, melted cheese, and hash browns.', breakfastPrefs: true },
      { name: 'Orange Juice', price: '$3.99' },
      { name: 'Café de Olla', price: '$3.99' },
      { name: 'Aguas Frescas', price: '$3.50', desc: 'Jamaica, piña, horchata, or pepino con limón.', aguaFlavor: true },
      { name: 'Hash Browns', price: '$5.99' },
      { name: 'Fried Eggs (side)', price: '$5.99' },
      { name: 'Bacon', price: '$6.99' },
      { name: 'Pancakes', price: '$5.99' }
    ]
  },
  {
    id: 'daily-lunch',
    title: 'Daily Lunch',
    note: 'Our daily lunch menu — served 10 AM – 3 PM.',
    items: [
      { name: 'Crunchy Tacos', price: '$11.99', desc: 'Ground beef or chicken with rice and beans.', lunchProtein2: true },
      { name: 'Tacos', price: '$11.99', desc: 'Ground beef or chicken with rice and beans.', lunchProtein2: true },
      { name: 'Empanadas', price: '$13.50', desc: 'Chicken or cheese, sour cream and cheese, with rice and beans.', lunchProtein3: true },
      { name: 'Enchiladas', price: '$12.99', desc: 'Chicken, ground beef, or cheese with cheese and avocado, rice and beans.', lunchProtein3: true },
      { name: 'Quesadilla', price: '$10.99', desc: 'Ground beef or chicken with lettuce, pico, and rice.', lunchProtein2: true },
      { name: 'Half-Size Torta', price: '$12.99', desc: 'Chicken or ground beef with beans, lettuce, queso fresco, and avocado.', lunchProtein2: true },
      { name: 'Tamales', price: '$12.99', desc: 'Chicken with green and/or red salsa, rice and beans.', salsaChoice: true },
      { name: 'Fajitas', price: '$13.99', desc: 'Chicken with grilled peppers and onions, rice, beans, and flour tortillas. Sub steak +$2.', lunchFajita: true },
      { name: 'Fried Eggs', price: '$10.99', desc: 'Fried eggs with rice, beans, and flour tortillas.', tortilla: true },
      { name: 'Small ACP', price: '$11.99', desc: 'Grilled chicken, rice, queso sauce, and tortillas.', tortilla: true },
      { name: "Davey's Special", price: '$13.99', desc: 'Grilled chicken and chorizo with queso sauce, rice, and tortillas.', tortilla: true },
      { name: 'Birria Tacos', price: '$12.99', desc: 'Handmade corn tortillas with birria beef, onion, cilantro, rice, and birria broth.' }
    ]
  },
  {
    id: 'appetizers',
    title: 'Appetizers & Antojitos',
    items: [
      { name: 'Queso', price: 'Small $4 · Large $7', desc: 'Warm cheese dip.', sizeSmallLarge: true, sizePrices: { Small: 4, Large: 7 } },
      { name: 'Choriqueso', price: 'Small $5 · Large $9', desc: 'Queso with chorizo.', sizeSmallLarge: true, sizePrices: { Small: 5, Large: 9 } },
      { name: 'Bean Dip', price: '$7.28', desc: 'Queso with refried beans.' },
      { name: 'Guacamole', price: 'Small $5 · Large $8', desc: 'Fresh guacamole dip.', sizeSmallLarge: true, sizePrices: { Small: 5, Large: 8 } },
      { name: 'Esquite', price: '$6.00', desc: 'Sweet corn with mayo, cheese, chili powder, and lime — served in a cup.' },
      { name: 'Street Corn', price: '$4.50 each', desc: 'One ear of corn on the cob with mayo, cheese, and chili powder. Each $4.50.', },
      { name: 'Sope', price: '$8.50 each', desc: 'One sope with chicken, steak, or shrimp, grilled onions and peppers. Photo shows two — each $8.50.', meats: true },
      { name: 'Huarache', price: '$14.99', desc: 'Steak with grilled onions and peppers.' },
      { name: 'Gorditas', price: '$15.99', desc: 'Steak and chorizo, mozzarella, rice and beans.' },
      { name: 'Tamales', price: '$12.99', desc: 'With rice, beans, and salad.' },
      { name: 'Tostada', price: '$5 each', desc: 'One tostada with beans, your choice of meat, lettuce, sour cream, cheese and pico de gallo. Photo shows four — each $5.', meats: true },
      { name: 'Empanadas', price: '$16.50', desc: 'Deep fried corn tortillas filled with chicken or cheese.', lunchProtein3: true }
    ]
  },
  {
    id: 'tacos',
    title: 'Tacos',
    items: [
      { name: 'Taco', price: '$3.12 each', desc: 'One soft corn taco with cilantro, onions, and a lime. Photo shows four — each $3.12.', meats: true },
      { name: 'Order of Tacos', price: '$14.99', desc: 'Soft corn tacos topped with cilantro and onions. Served with rice and beans.', meats: true },
      { name: 'Crunchy Tacos', price: '$13.99', desc: 'Deep-fried corn tortillas with choice of meat, lettuce, sour cream, and pico.', meats: true },
      { name: 'Tacos Dorados', price: '$13.99', desc: 'Rolled fried corn tortillas with shredded chicken, sour cream and cheese, lettuce, pico and rice.' },
      { name: 'Birria Tacos', price: '$16.99', desc: 'Corn tortillas with birria beef and mozzarella, topped with birria broth, rice and consommé.', tag: 'signature', sku: 'taco-birria' },
      { name: 'Chicken Birria Tacos', price: '$15.50', desc: 'Corn tortillas with birria chicken and mozzarella, topped with birria broth, rice and consommé.' },
      { name: 'Shrimp Tacos', price: '$16.99', desc: 'Soft corn tortillas with grilled shrimp, onion and cilantro. Flour tortilla +$0.50 each.', shrimpTortilla: true },
      { name: 'Tacos Campechanos', price: '$15.99', desc: 'Soft corn tortillas with steak and chorizo, onion and cilantro, rice and beans.' },
      { name: 'Tacos Albañil', price: '$15.99', desc: 'Soft corn tortillas with scrambled eggs and chorizo, onion and cilantro, rice and beans.' }
    ]
  },
  {
    id: 'burritos',
    title: 'Burritos',
    note: 'Served with rice, beans, salad, and pico.',
    items: [
      { name: 'Burrito Meal', price: '$13.51', desc: 'Large flour tortilla filled with meat, cheese, beans and rice.', meats: true },
      { name: 'Fajita Burrito', price: '$16.00', desc: 'Steak or chicken with grilled onions and peppers, mozzarella, rice and beans.', fajitaProtein2: true },
      { name: 'Choripollo Burrito', price: '$15.80', desc: 'Chicken and chorizo, mozzarella, rice and beans.' },
      { name: 'Burrito Campechano', price: '$15.80', desc: 'Steak and chorizo, mozzarella, rice and beans.' },
      { name: 'California Burrito', price: '$16.00', desc: 'Large flour tortilla with meat, cheese, beans and rice.', meats: true },
      { name: 'Shrimp Burrito', price: '$17.75', desc: 'Shrimp, mozzarella, rice and beans. Covered in queso sauce.' },
      { name: 'Veggie Burrito', price: '$14.05', desc: 'Bell peppers, mushrooms or cactus, mozzarella, rice and beans.', veggieChoice: true },
      { name: 'Burrito Huevos a la Mexicana', price: '$14.00', desc: 'Scrambled eggs with tomatoes, onions, cilantro, rice and beans.' }
    ]
  },
  {
    id: 'chimichangas',
    title: 'Chimichangas',
    note: 'Served with rice, beans, salad, and pico.',
    items: [
      { name: 'Chimichanga Meal', price: '$15.49', desc: 'Fried flour tortilla with meat, mozzarella, covered in queso sauce.', meats: true },
      { name: 'Shrimp Chimichanga', price: '$17.99', desc: 'Fried flour tortilla with shrimp, mozzarella, covered in queso sauce.' },
      { name: 'Burrito Mummia', price: '$17.99', desc: 'Flour tortilla with steak and shrimp, mozzarella and beans, wrapped in bacon, deep fried, covered in queso and chipotle sauce, pico and avocado. No sides.' }
    ]
  },
  {
    id: 'quesadillas',
    title: 'Quesadillas',
    note: 'Served with rice, salad, and pico.',
    items: [
      { name: 'Quesadilla Meal', price: '$13.99', desc: 'Large flour tortilla with meat and mozzarella.', meats: true },
      { name: 'Shrimp Quesadilla', price: '$15.50', desc: 'Large flour tortilla with shrimp and mozzarella.' },
      { name: 'Veggie Quesadilla', price: '$13.51', desc: 'Grilled onions, peppers, mushrooms or cactus with mozzarella.', veggieChoice: true },
      { name: 'Fajita Quesadilla', price: '$16.99', desc: 'Steak or chicken with grilled onions, peppers and mozzarella.', fajitaProtein2: true },
      { name: 'Quesadilla de Maíz', price: '$14.55', desc: 'Corn tortilla with choice of protein and mozzarella.', meats: true },
      { name: 'Quesadilla de Birria', price: '$15.99', desc: 'Birria beef and mozzarella, dipped in birria broth. Served with extra broth, rice, cilantro, onions and limes.' }
    ]
  },
  {
    id: 'tortas',
    title: 'Tortas',
    items: [
      { name: 'Torta', price: '$15.99', desc: 'Large sandwich with mozzarella, meat, lettuce, crumbled cheese, avocado and mayo.', meats: true },
      { name: 'Torta Cubana', price: '$18.99', desc: 'Steak, ham, chorizo, fried egg, mozzarella, lettuce, crumbled cheese, tomatoes, avocado and mayo.' },
      { name: 'Fried Steak Torta', price: '$17.99', desc: 'Fried steak, mozzarella, lettuce, crumbled cheese, avocado and mayo.' },
      { name: 'Fried Chicken Torta', price: '$16.99', desc: 'Fried chicken, mozzarella, lettuce, crumbled cheese, avocado and mayo.' }
    ]
  },
  {
    id: 'fajitas',
    title: 'Fajitas',
    note: 'Served with rice, beans, salad, and pico.',
    items: [
      { name: 'Campechanas Fajitas', price: '$24.99', desc: 'Chicken, steak, shrimp, chorizo, grilled onions and peppers.' },
      { name: 'Mix Fajitas', price: '$21.99', desc: 'Chicken, steak, shrimp, grilled onions and peppers.' },
      { name: 'Shrimp Fajitas', price: '$20.99', desc: 'Shrimp with grilled onions and peppers.' },
      { name: 'Steak Fajitas', price: '$17.99', desc: 'Steak with grilled onions and peppers.' },
      { name: 'Chicken Fajitas', price: '$16.99', desc: 'Chicken with grilled onions and peppers.' }
    ]
  },
  {
    id: 'enchiladas',
    title: 'Enchiladas',
    note: 'Served with salad and pico.',
    items: [
      { name: 'Enchiladas', price: '$16.50', desc: 'Corn tortillas with choice of meat, poblano salsa, sour cream and crumbled cheese.', meats: true },
      { name: 'Queso Enchiladas', price: '$17.50', desc: 'Enchiladas with queso sauce, sour cream and crumbled cheese.', meats: true },
      { name: 'Enchiladas Campechanas', price: '$17.99', desc: 'Steak and chorizo with poblano salsa, sour cream and crumbled cheese.' }
    ]
  },
  {
    id: 'platters',
    title: 'Platters',
    split: 13,
    items: [
      { name: 'ACP (Arroz Con Pollo)', price: '$13.99', desc: 'Chicken, rice and queso sauce. Corn or flour tortillas.', tortilla: true },
      { name: "Davey's Special", price: '$14.51', desc: 'Chicken, chorizo and queso sauce. Corn or flour tortillas.', tortilla: true },
      { name: 'Carne Asada', price: '$19.99', desc: 'Grilled steak and onions with rice, beans, lettuce and pico. Corn or flour tortillas.', tortilla: true },
      { name: 'Oaxaqueño', price: '$24.99', desc: 'Steak, shrimp, cactus, cheese, onions, rice, beans, lettuce and pico.', tag: 'signature', sku: 'plt-oaxaqueno', tortilla: true },
      { name: 'Oaxaqueño de Pollo', price: '$21.75', desc: 'Chicken, shrimp, cactus, cheese, onions, rice, beans, lettuce and pico.', tortilla: true },
      { name: 'Mojarra Frita', price: '$27.99', desc: 'Deep-fried tilapia with rice, beans, lettuce and pico.', tortilla: true },
      { name: 'Chile Relleno', price: '$15.99', desc: 'Grilled poblano filled with ground beef and melted mozzarella, rice and beans.', tortilla: true },
      { name: 'Taco Salad', price: '$13.51', desc: 'Deep-fried tortilla bowl with meat, beans, lettuce, sour cream, cheese, cucumber and lime.', meats: true },
      { name: 'Chilaquiles', price: '$19.99', desc: 'Tortilla chips in poblano salsa with steak, fried eggs, cheese and avocado.' },
      { name: 'Mar y Tierra', price: '$24.99', desc: 'Steak, shrimp and chicken with rice and beans.', tortilla: true },
      { name: 'Molcajete', price: '$27.99', desc: 'Steak, chicken, sausage, cactus, cheese, green salsa, grilled onions, rice and beans. Corn or flour tortillas.', tag: 'popular', sku: 'plt-molcajete', tortilla: true },
      { name: 'Cazuelón', price: '$22.99', desc: 'Steak, chicken, chorizo, grilled onions, rice and beans covered with queso sauce and topped with pico de gallo.' },
      { name: 'Tlayuda', price: '$32.00', desc: 'Large tostada with beans, steak, chorizo and queso Oaxaqueño.' },
      { name: 'Nachos', price: '$14.99', desc: 'Corn tortilla chips with ground beef or chicken, lettuce, pico de gallo, avocado, queso sauce and crumbled cheese.', lunchProtein2: true },
      { name: 'Fried Steak', price: '$17.99', desc: 'Steak with onions, rice, beans, lettuce and pico. Corn or flour tortillas.', tortilla: true },
      { name: 'Grilled or Fried Chicken', price: '$16.67', desc: 'Chicken with onions, rice, beans, lettuce and pico. Corn or flour tortillas.', grillFry: true, tortilla: true },
      { name: 'Parrillada', price: '$15.00', desc: 'Pollo, longaniza, asada, rice, beans, pico and guacamole.' },
      { name: 'Camarones Empanizados', price: '$21.00', desc: 'Breaded shrimp with rice, beans, lettuce and pico.', tortilla: true },
      { name: 'Coctel de Camarones', price: '$21.00', desc: 'Shrimp, calamari, pico, avocado and cucumbers served in house-made michelada salsa.' },
      { name: 'Chicken and Spaghetti', price: '$15.00', desc: 'Chicken breast with spaghetti in chipotle salsa, lettuce and pico.' },
      { name: 'Phil', price: '$13.51', desc: 'Mozzarella, steak, bell peppers and onions served with fries.' },
      { name: 'Huevos Enchilados', price: '$16.00', desc: 'Scrambled eggs in spicy salsa with steak, beans and cheese.' }
    ]
  },
  {
    id: 'kids',
    title: 'Kids Menu',
    items: [
      { name: 'Kids Quesadilla', price: '$8.50', desc: 'Flour tortilla with grilled beef or chicken and a side of rice.', kidsProtein: true },
      { name: 'Nuggets Meal', price: '$10.00', desc: 'Chicken nuggets with fries.' },
      { name: 'Kids Burrito', price: '$9.50', desc: 'Flour tortilla with chicken or ground beef, rice and beans.', kidsProtein: true },
      { name: 'Kids ACP', price: '$8.50', desc: 'Grilled chicken with queso sauce and rice. Tortillas included upon request.', tortilla: true },
      { name: 'Scrambled Eggs', price: '$8.50', desc: 'Scrambled eggs with rice or fries.', kidsSide: true }
    ]
  },
  {
    id: 'broths',
    title: 'Broths',
    note: 'Served Fridays, Saturdays, and Sundays only.',
    items: [
      { name: 'Caldo de Res', price: '$17.67', desc: 'Beef soup.' },
      { name: 'Caldo de Borrego', price: '$17.67', desc: 'Lamb soup.' },
      { name: 'Menudo', price: '$15.59', desc: 'Traditional menudo.', tag: 'weekend', sku: 'broth-menudo' },
      { name: 'Siete Mares', price: '$19.75', desc: 'Seven seas seafood soup.' }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    note: 'Coming soon.',
    items: [
    ]
  },
  {
    id: 'drinks',
    title: 'Drinks',
    items: [
      { name: 'Aguas Frescas', price: '$3.50', desc: 'Horchata · Piña · Melón · Jamaica', aguaFlavor: true },
      { name: 'Soft Drinks', price: '$3.64', desc: 'Coke, Pepsi, Sprite, Mountain Dew, Fanta or Fresca.', softDrink: true },
      { name: 'Jarritos & Squirt', price: '$3.00', jarritosFlavor: true }
    ]
  },
  {
    id: 'alcohol',
    title: 'Beer & Mixed Drinks',
    items: [
      { name: 'Beer (12 oz)', price: '$4.16', desc: 'Corona · Modelo · Victoria · Dos XX · Modelo Negra · Tecate · Corona Familiar · Pacifico', beer12: true },
      { name: 'Beer (24 oz)', price: '$5.20', desc: 'Corona Extra bottle' },
      { name: 'Beer (32 oz)', price: '$6.24', desc: 'Corona Familiar · Modelo · Tecate · Carta Blanca · Victoria', beer32: true },
      { name: 'Michelada Cheladas', price: '$5.20', desc: 'Mango y Chile · Piña Picante · Especial · Sandia Picante · Limón y Sal', micheladaChelada: true },
      { name: 'Micheladas', price: '$11.43', desc: 'Chamoy, hot sauce, Worcestershire, fresh lime juice and your choice of 12 oz beer. Upgrade to 32 oz +$4.16.' },
      { name: 'Margarita', price: '$14.00', desc: 'Classic lime, strawberry, mango, peach, pomegranate, pineapple, or pineapple jalapeño. Salt, sugar, or Tajín rim.', tag: 'popular', sku: 'drk-margarita' },
      { name: 'Tequila Sunrise', price: '$10.00' },
      { name: 'Mojito', price: '$11.00', desc: 'Strawberry or blueberry.' },
      { name: 'Irish Trash Can', price: '$14.00' },
      { name: 'Mary Jane', price: '$14.42' },
      { name: 'Piña Colada', price: '$12.43' },
      { name: 'Paloma', price: '$12.10', desc: 'Tequila, fresh grapefruit juice, Squirt soda and fresh lime juice.' },
      { name: 'Spiked Horchata', price: '$12.10', desc: 'Horchata, spiced rum and RumChata.' },
      { name: 'Rum and Coke', price: '$9.91' },
      { name: 'Jack and Coke', price: '$9.91' }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.MENU_DATA = MENU_DATA;
  window.MEAT_CHOICES = MEAT_CHOICES;
  window.FEATURED_ITEMS = FEATURED_ITEMS;
}