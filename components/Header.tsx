'use client';

import Link from 'next/link';
import MiniCart from './MiniCart';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Rohan’s Market
        </Link>

        <nav className="space-x-4 text-sm">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </nav>

        <MiniCart />
      </div>
    </header>
  );
}
