'use client';

import { useState, useEffect, useRef } from 'react';
import { products } from '@/data/products';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
    setActiveIndex(-1);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      const selected = suggestions[activeIndex];
      if (selected) {
        window.location.href = `/marketplace/${selected.id}`;
      }
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring"
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow">
          {suggestions.map((product, index) => (
            <li
              key={product.id}
              className={`px-4 py-2 cursor-pointer ${
                index === activeIndex ? 'bg-blue-100' : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => (window.location.href = `/marketplace/${product.id}`)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
