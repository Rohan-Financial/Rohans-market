'use client';

import { useEffect, useState } from 'react';
import { getCartItems, clearCart } from '@/lib/cart';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const router = useRouter();

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      toast.error('Please fill out all fields');
      return;
    }

    clearCart();
    toast.success('Order placed successfully!');
    router.push('/');
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
}
