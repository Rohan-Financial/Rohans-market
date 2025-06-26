import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getCompare } from '@/lib/compare';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ComparePage() {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [comparedProducts, setComparedProducts] = useState([]);

  useEffect(() => {
    const ids = getCompare();
    setCompareList(ids);
    const filtered = products.filter((p) => ids.includes(p.id));
    setComparedProducts(filtered);
  }, []);

  return (
    <>
      <Head>
        <title>Compare Products</title>
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-6">Compare Products</h1>

        {comparedProducts.length === 0 ? (
          <p className="text-gray-600">No products selected for comparison yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comparedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
