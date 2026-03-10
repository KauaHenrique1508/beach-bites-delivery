import restaurant1 from '@/assets/restaurant-1.jpg';
import restaurant2 from '@/assets/restaurant-2.jpg';
import restaurant3 from '@/assets/restaurant-3.jpg';
import restaurant4 from '@/assets/restaurant-4.jpg';
import type { Restaurant, MenuItem } from '@/types';

export const restaurants: Restaurant[] = [
  { id: '1', name: 'Mar & Brasa', image: restaurant1, deliveryTime: '20-30 min', rating: 4.8, cuisine: 'Seafood' },
  { id: '2', name: 'Açaí Paradise', image: restaurant2, deliveryTime: '10-15 min', rating: 4.9, cuisine: 'Healthy' },
  { id: '3', name: 'Pizza Shore', image: restaurant3, deliveryTime: '25-35 min', rating: 4.6, cuisine: 'Pizza' },
  { id: '4', name: 'Coco Beach Bar', image: restaurant4, deliveryTime: '5-10 min', rating: 4.7, cuisine: 'Drinks' },
];

export const menuItems: MenuItem[] = [
  // Mar & Brasa
  { id: 'm1', restaurantId: '1', name: 'Grilled Fish Platter', description: 'Fresh catch of the day with lemon and herbs', price: 38.90, image: restaurant1, category: 'Main' },
  { id: 'm2', restaurantId: '1', name: 'Shrimp Skewers', description: 'Garlic butter grilled shrimp', price: 32.90, image: restaurant1, category: 'Main' },
  { id: 'm3', restaurantId: '1', name: 'Seafood Soup', description: 'Rich broth with mixed seafood', price: 28.90, image: restaurant1, category: 'Starter' },
  { id: 'm4', restaurantId: '1', name: 'Fish Tacos', description: 'Crispy fish with tropical salsa', price: 24.90, image: restaurant1, category: 'Starter' },
  // Açaí Paradise
  { id: 'm5', restaurantId: '2', name: 'Classic Açaí Bowl', description: 'Açaí blend with granola, banana, and honey', price: 22.90, image: restaurant2, category: 'Bowls' },
  { id: 'm6', restaurantId: '2', name: 'Tropical Bowl', description: 'Açaí with mango, coconut, and passion fruit', price: 26.90, image: restaurant2, category: 'Bowls' },
  { id: 'm7', restaurantId: '2', name: 'Green Smoothie', description: 'Spinach, banana, pineapple blend', price: 16.90, image: restaurant2, category: 'Drinks' },
  { id: 'm8', restaurantId: '2', name: 'Protein Bowl', description: 'Açaí with peanut butter and whey protein', price: 28.90, image: restaurant2, category: 'Bowls' },
  // Pizza Shore
  { id: 'm9', restaurantId: '3', name: 'Margherita', description: 'Classic tomato, mozzarella, basil', price: 34.90, image: restaurant3, category: 'Pizza' },
  { id: 'm10', restaurantId: '3', name: 'Tropical Pizza', description: 'Ham, pineapple, mozzarella', price: 36.90, image: restaurant3, category: 'Pizza' },
  { id: 'm11', restaurantId: '3', name: 'Pepperoni', description: 'Pepperoni with extra cheese', price: 38.90, image: restaurant3, category: 'Pizza' },
  { id: 'm12', restaurantId: '3', name: 'Garlic Bread', description: 'Crispy garlic bread with herbs', price: 14.90, image: restaurant3, category: 'Sides' },
  // Coco Beach Bar
  { id: 'm13', restaurantId: '4', name: 'Fresh Coconut Water', description: 'Straight from the coconut', price: 12.90, image: restaurant4, category: 'Drinks' },
  { id: 'm14', restaurantId: '4', name: 'Tropical Cocktail', description: 'Mango, passion fruit, and rum', price: 24.90, image: restaurant4, category: 'Cocktails' },
  { id: 'm15', restaurantId: '4', name: 'Piña Colada', description: 'Classic coconut and pineapple', price: 22.90, image: restaurant4, category: 'Cocktails' },
  { id: 'm16', restaurantId: '4', name: 'Fresh Juice Mix', description: 'Orange, pineapple, and mint', price: 14.90, image: restaurant4, category: 'Drinks' },
];
