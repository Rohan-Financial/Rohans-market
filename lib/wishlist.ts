// lib/wishlist.ts

const WISHLIST_KEY = 'wishlist';

export function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
}

export function addToWishlist(id: string) {
  const current = getWishlist();
  if (!current.includes(id)) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([...current, id]));
  }
}

export function removeFromWishlist(id: string) {
  const current = getWishlist().filter((item) => item !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(current));
}

export function isWishlisted(id: string): boolean {
  return getWishlist().includes(id);
}
