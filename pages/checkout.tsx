'use client';

import { useEffect, useState } from 'react';
import { getCartItems, clearCart } from '@/lib/cart';
import { validatePromo } from '@/lib/promos';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePromoApply = () => {
    const promo = validatePromo(promoCode);
    if (promo) {
      setAppliedPromo(promo);
      toast.success(`Promo "${promo.code}" applied!`);
    } else {
      setAppliedPromo(null);
      toast.error('Invalid promo code');
    }
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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount =
    appliedPromo?.type === 'percent'
      ? (subtotal * appliedPromo.value) / 100
      : appliedPromo?.value || 0;
  const total = subtotal - discount;

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

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={handlePromoApply}
            className="bg-gray-200 px-4 rounded hover:bg-gray-300"
          >
            Apply
          </button>
        </div>

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
            <li className="flex justify-between border-t pt-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </li>
            {appliedPromo && (
              <li className="flex justify-between text-green-600">
                <span>Promo ({appliedPromo.code})</span>
                <span>- ${discount.toFixed(2)}</span>
              </li>
            )}
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
