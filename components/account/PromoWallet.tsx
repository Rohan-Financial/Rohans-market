'use client';

import { useState } from 'react';

type Promo = {
  code: string;
  discount: string;
  expires: string;
  used: boolean;
};

export default function PromoWallet() {
  const [promos] = useState<Promo[]>([
    { code: 'WELCOME10', discount: '10% off', expires: '2025-07-01', used: false },
    { code: 'FREESHIP', discount: 'Free Shipping', expires: '2025-08-15', used: true },
    { code: 'SUMMER25', discount: '25% off', expires: '2025-07-31', used: false },
  ]);

  return (
    <ul className="space-y-3">
      {promos.map((promo) => (
        <li
          key={promo.code}
          className={`border p-4 rounded shadow-sm ${
            promo.used ? 'opacity-60' : ''
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{promo.code}</p>
              <p className="text-sm text-gray-600">{promo.discount}</p>
              <p className="text-xs text-gray-500">Expires: {promo.expires}</p>
            </div>
            <span
              className={`text-sm font-medium ${
                promo.used ? 'text-gray-500' : 'text-green-600'
              }`}
            >
              {promo.used ? 'Used' : 'Available'}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
