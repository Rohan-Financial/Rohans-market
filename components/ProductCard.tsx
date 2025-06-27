'use client';

import { useEffect, useState } from 'react';
import { HeartIcon, ScaleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import CountdownTimer from './CountdownTimer';
import {
  isWishlisted,
  addToWishlist,
  removeFromWishlist,
} from '@/lib/wishlist';
import {
  isCompared,
  addToCompare,
  removeFromCompare,
  getCompare,
} from '@/lib/compare';
import { addToCart } from '@/lib/cart';

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [compared, setCompared] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(product.id));
    setCompared(isCompared(product.id));
  }, [product.id]);

  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast.error('Removed from Wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to Wishlist');
    }
    setWishlisted(!wishlisted);
  };

  const toggleCompare = () => {
    const current = getCompare();
    if (!compared && current.length >= 3) {
      toast.error('Compare limit reached (3 max)');
      return;
    }

    if (compared) {
      removeFromCompare(product.id);
      toast('Removed from Compare', { icon: '⚖️' });
    } else {
      addToCompare(product.id);
      toast('Added to Compare', { icon: '⚖️' });
    }
    setCompared(!compared);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="relative rounded border p-4 shadow bg-white">
      {/* Icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={toggleWishlist} aria-label="Toggle Wishlist">
          <HeartIcon
            className={`h-6 w-6 transition ${
              wishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
            }`}
          />
        </button>
        <button onClick={toggleCompare} aria-label="Toggle Compare">
          <ScaleIcon
            className={`h-6 w-6 transition ${
              compared ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'
            }`}
          />
        </button>
      </div>

      {/* Product content */}
      <img src={product.image} alt={product.name} className="mb-4 rounded" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>

      {/* Low-stock alert */}
      {product.stock <= 5 && (
        <p className="text-sm text-red-600 font-medium mt-2">
          Only {product.stock} left in stock!
        </p>
      )}

      {/* Promo countdown */}
      {product.promoEnd && (
        <CountdownTimer endTime={product.promoEnd} />
      )}

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
