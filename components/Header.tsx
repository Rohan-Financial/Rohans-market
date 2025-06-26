'use client';

import Link from 'next/link';
import MiniCart from './MiniCart';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Rohan’s Market
          </Link>
        </div>

        <SearchBar />

        <div className="flex items-center justify-end w-full sm:w-auto">
          <MiniCart />
        </div>
      </div>
    </header>
  );
}
