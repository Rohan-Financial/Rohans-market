'use client';

import { useState } from 'react';

type FiltersProps = {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
};

export default function Filters({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: FiltersProps) {
  const [min, max] = priceRange;

  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(updated);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    onPriceChange(type === 'min' ? [value, max] : [min, value]);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((cat) => (
          <label key={cat} className="block">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={min}
            onChange={(e) => handlePriceChange(e, 'min')}
            className="w-20 p-1 border rounded"
          />
          <span>to</span>
          <input
            type="number"
            value={max}
            onChange={(e) => handlePriceChange(e, 'max')}
            className="w-20 p-1 border rounded"
          />
        </div>
      </div>
    </div>
  );
}
