// lib/promos.ts

export type Promo = {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  expiresAt?: string; // ISO date string
  usageLimit?: number;
  usedCount?: number;
  minOrderValue?: number;
};

const promos: Promo[] = [
  {
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    expiresAt: '2025-12-31',
    usageLimit: 100,
    usedCount: 0,
    minOrderValue: 50,
  },
  {
    code: 'FREESHIP',
    type: 'fixed',
    value: 5,
    expiresAt: '2025-08-01',
    usageLimit: 500,
    usedCount: 0,
  },
];

export function validatePromo(code: string, subtotal: number): Promo | null {
  const promo = promos.find((p) => p.code.toLowerCase() === code.toLowerCase());
  if (!promo) return null;

  const now = new Date();
  if (promo.expiresAt && new Date(promo.expiresAt) < now) return null;
  if (promo.usageLimit && promo.usedCount >= promo.usageLimit) return null;
  if (promo.minOrderValue && subtotal < promo.minOrderValue) return null;

  return promo;
}

export function incrementUsage(code: string) {
  const promo = promos.find((p) => p.code.toLowerCase() === code.toLowerCase());
  if (promo && promo.usageLimit) {
    promo.usedCount = (promo.usedCount || 0) + 1;
  }
}
