import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getWishlist } from '@/lib/wishlist';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const ids = getWishlist();
    setWishlist(ids);
    const filtered = products.filter((p) => ids.includes(p.id));
    setSavedProducts(filtered);
  }, []);

  return (
    <>
      <Head>
        <title>My Wishlist</title>
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

        {savedProducts.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty. Start adding some favorites!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
