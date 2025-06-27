// lib/cart.ts

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const STORAGE_KEY = 'cart';

function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function updateQuantity(id: string, quantity: number) {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartItems(): CartItem[] {
  return getCart();
}
