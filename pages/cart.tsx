'use client';

import { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, updateQuantity } from '@/lib/cart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setItems(getCartItems());
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
    setItems(getCartItems());
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="w-16 border rounded p-1"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
            <Link
              href="/checkout"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
