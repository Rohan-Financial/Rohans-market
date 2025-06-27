'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Review = {
  name: string;
  rating: number;
  comment: string;
};

export default function ReviewSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<Review>({ name: '', rating: 0, comment: '' });

  useEffect(() => {
    const stored = localStorage.getItem(`reviews-${productId}`);
    if (stored) setReviews(JSON.parse(stored));
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.comment) {
      toast.error('Please fill out all fields');
      return;
    }

    const updated = [...reviews, form];
    setReviews(updated);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updated));
    setForm({ name: '', rating: 0, comment: '' });
    toast.success('Review submitted!');
  };

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
      <p className="mb-4 text-yellow-500">
        {'★'.repeat(Math.round(average))}{'☆'.repeat(5 - Math.round(average))} ({average.toFixed(1)} / 5)
      </p>

      <ul className="space-y-4 mb-6">
        {reviews.map((r, i) => (
          <li key={i} className="border p-3 rounded bg-white shadow">
            <p className="font-medium">{r.name}</p>
            <p className="text-yellow-500">
              {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
            </p>
            <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        >
          <option value={0}>Rate this product</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 && 's'}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write your review..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
