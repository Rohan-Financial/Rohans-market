// lib/compare.ts

const COMPARE_KEY = 'compare';

export function getCompare(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
}

export function addToCompare(id: string) {
  const current = getCompare();
  if (!current.includes(id)) {
    localStorage.setItem(COMPARE_KEY, JSON.stringify([...current, id]));
  }
}

export function removeFromCompare(id: string) {
  const current = getCompare().filter((item) => item !== id);
  localStorage.setItem(COMPARE_KEY, JSON.stringify(current));
}

export function isCompared(id: string): boolean {
  return getCompare().includes(id);
}
