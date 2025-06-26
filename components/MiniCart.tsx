'use client';

import { useCart } from '@/lib/CartContext';
import { useState } from 'react';

export default function MiniCart() {
  const { items, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  const totalItems = items.length;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        🛒 Cart ({totalItems})
      </button>

      {open && (
        <div className="mt-2 w-72 bg-white border rounded shadow-lg p-4 text-sm">
          <h2 className="text-lg font-semibold mb-2">Your Cart</h2>

          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className="flex justify-between items-center">
              <button
                onClick={clear}
                className="text-sm text-gray-500 hover:underline"
              >
                Clear All
              </button>
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                Checkout →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
