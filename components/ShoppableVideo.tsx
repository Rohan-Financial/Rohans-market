'use client';

import ProductCard from './ProductCard';
import { products } from '@/data/products';

export default function ShoppableVideo() {
  // For demo: filter products featured in the video
  const featured = products.filter((p) =>
    ['product-1', 'product-2', 'product-3'].includes(p.id)
  );

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">🎥 Shop the Look</h2>

      <div className="aspect-video mb-6">
        <iframe
          className="w-full h-full rounded shadow"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="Shoppable Product Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
