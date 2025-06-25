import { useRouter } from 'next/router';
import { products } from '@/data/products';
import Head from 'next/head';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id.toString() === id);

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
          <p className="text-sm text-gray-500">
            This is a placeholder for product details. You can add pricing, descriptions,
            vendor info, and more here.
          </p>
        </div>
      </main>
    </>
  );
}
