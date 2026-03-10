export interface Restaurant {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  rating: number;
  cuisine: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface BeachLocation {
  type: 'gps' | 'text' | 'marker';
  coordinates?: { lat: number; lng: number };
  description?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'delivering' | 'delivered';

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  location: BeachLocation;
  status: OrderStatus;
  createdAt: Date;
  customerName: string;
}
