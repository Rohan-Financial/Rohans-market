import Head from 'next/head';
import { useEffect, useState } from 'react';
import { products } from '@/data/products';
import { getRecentlyViewed } from '@/lib/recentlyViewed';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import ShoppableVideo from '@/components/ShoppableVideo';

export default function Home() {
  const [recent, setRecent] = useState([]);
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    setRecent(getRecentlyViewed());
  }, []);

  const handleFilter = (category: string) => {
    if (category === 'All') {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === category));
    }
  };

  return (
    <>
      <Head>
        <title>Rohan’s Market</title>
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Rohan’s Market</h1>

        {recent.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">Recently Viewed</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <CategoryFilter onFilter={handleFilter} />

        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-3">All Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <ShoppableVideo />
      </main>
    </>
  );
}
