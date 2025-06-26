import { useRouter } from 'next/router';
import { products } from '@/data/products';
import Head from 'next/head';
import { useCart } from '@/lib/CartContext';
import { useEffect } from 'react';
import { addRecentlyViewed } from '@/lib/recentlyViewed';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { add } = useCart();

  const product = products.find((p) => p.id.toString() === id);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Loading product...</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Rohan’s Market</title>
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <div className="h-64 bg-gray-200 mb-4" />
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-sm text-gray-500 mb-6">
            This is a placeholder for product details. You can add pricing, descriptions,
            vendor info, and more here.
          </p>

          <button
            onClick={() => add({ id: product.id, name: product.name })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
            {product.reviews?.length ? (
              <ul className="space-y-4">
                {product.reviews.map((review, index) => (
                  <li key={index} className="border-t pt-2">
                    <p className="text-sm text-gray-800">
                      <strong>{review.user}</strong> —{' '}
                      {Array(review.rating).fill('⭐').join('')}
                    </p>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
