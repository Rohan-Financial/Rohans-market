import { useState, useEffect } from 'react';
import { products } from '@/data/products';

interface CategoryFilterProps {
  onFilter: (category: string) => void;
}

export default function CategoryFilter({ onFilter }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('All');

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    setCategories(['All', ...uniqueCategories]);
  }, []);

  const handleFilter = (category: string) => {
    setSelected(category);
    onFilter(category);
  };

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={category === selected ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
