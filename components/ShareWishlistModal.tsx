'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ShareWishlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleShare = () => {
    if (!email && !phone) {
      toast.error('Please enter an email or phone number');
      return;
    }

    // Simulate sending
    toast.success('Wishlist shared successfully!');
    setEmail('');
    setPhone('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Share Your Wishlist</h2>
        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone number"
          className="w-full mb-4 p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleShare} className="px-4 py-2 bg-blue-600 text-white rounded">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
