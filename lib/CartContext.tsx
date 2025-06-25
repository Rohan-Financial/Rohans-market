'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, getCart, addToCart, removeFromCart, clearCart } from './cart';

type CartContextType = {
  cart: CartItem[];
  add: (item: { id: number; name: string }) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const add = (item: { id: number; name: string }) => {
    addToCart(item);
    setCart(getCart());
  };

  const remove = (id: number) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const clear = () => {
    clearCart();
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
