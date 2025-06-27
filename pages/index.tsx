'use client';

import Head from 'next/head';
import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import { useFilteredProducts } from '@/lib/useFilteredProducts';

const allCategories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filtered = useFilteredProducts(products, search, selectedCategories, priceRange);

  return (
    <>
      <Head>
        <title>Shop All Products</title>
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-6">Shop All Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <aside className="md:col-span-1 space-y-6">
            <SearchBar value={search} onChange={setSearch} />
            <Filters
              categories={allCategories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </aside>

          {/* Product Grid */}
          <section className="md:col-span-3">
            {filtered.length === 0 ? (
              <p className="text-gray-600">No products match your filters.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
