'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  isSponsored?: boolean;
  popularityScore?: number;
};

export default function FeaturedCarousel({ products }: { products: Product[] }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 15 },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 2, spacing: 15 } },
      '(min-width: 1024px)': { slides: { perView: 3, spacing: 20 } },
    },
  });

  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    const sponsored = products.filter((p) => p.isSponsored);
    const popular = products
      .filter((p) => !p.isSponsored)
      .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
      .slice(0, 6 - sponsored.length);

    setFeatured([...sponsored, ...popular]);
  }, [products]);

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div ref={sliderRef} className="keen-slider">
        {featured.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <Link href={`/product/${product.id}`} className="block bg-white rounded shadow p-4 hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              {product.isSponsored && (
                <span className="text-xs text-yellow-600 font-medium">Sponsored</span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
