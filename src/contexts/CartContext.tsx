import React, { createContext, useContext, useState, useCallback } from 'react';
import type { CartItem, MenuItem, Order, BeachLocation } from '@/types';

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  placeOrder: (location: BeachLocation, customerName: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addItem = useCallback((menuItem: MenuItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map(i => i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.menuItem.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.menuItem.id !== itemId));
    } else {
      setItems(prev => prev.map(i => i.menuItem.id === itemId ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const placeOrder = useCallback((location: BeachLocation, customerName: string): Order => {
    const restaurantId = items[0]?.menuItem.restaurantId || '';
    const order: Order = {
      id: Date.now().toString(),
      restaurantId,
      restaurantName: items[0]?.menuItem.restaurantId === '1' ? 'Mar & Brasa' :
        items[0]?.menuItem.restaurantId === '2' ? 'Açaí Paradise' :
        items[0]?.menuItem.restaurantId === '3' ? 'Pizza Shore' : 'Coco Beach Bar',
      items: [...items],
      total,
      location,
      status: 'pending',
      createdAt: new Date(),
      customerName,
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  }, [items, total, clearCart]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }, []);

  return (
    <CartContext.Provider value={{ items, orders, addItem, removeItem, updateQuantity, clearCart, total, itemCount, placeOrder, updateOrderStatus }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
