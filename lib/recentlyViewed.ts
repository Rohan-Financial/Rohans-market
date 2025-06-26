// lib/recentlyViewed.ts

import { Product } from '@/types';

const STORAGE_KEY = 'recently_viewed';
const MAX_ITEMS = 6;

export function getRecentlyViewed(): Product[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addRecentlyViewed(product: Product) {
  if (typeof window === 'undefined') return;

  const viewed = getRecentlyViewed().filter((p) => p.id !== product.id);
  viewed.unshift(product);

  const limited = viewed.slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
}
