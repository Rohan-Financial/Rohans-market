// lib/promos.ts

type Promo = {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
};

const promos: Promo[] = [
  { code: 'WELCOME10', type: 'percent', value: 10 },
  { code: 'FREESHIP', type: 'fixed', value: 5 },
];

export function validatePromo(code: string): Promo | null {
  const promo = promos.find((p) => p.code.toLowerCase() === code.toLowerCase());
  return promo || null;
}
