'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/products';

export default function CategoryFilter({ onFilter }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('All');

  useEffect(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    setCategories(['All', ...unique]);
  }, []);

  const handleChange = (category: string) => {
    setSelected(category);
    onFilter(category);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleChange(cat)}
          className={`px-4 py-2 rounded border ${
            selected === cat
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
