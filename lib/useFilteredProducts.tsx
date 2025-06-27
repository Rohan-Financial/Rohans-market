'use client';

import { useMemo } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  category?: string;
};

export function useFilteredProducts(
  products: Product[],
  search: string,
  selectedCategories: string[],
  priceRange: [number, number]
) {
  return useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category || '');
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, selectedCategories, priceRange]);
}
