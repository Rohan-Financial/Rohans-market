import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Marketplace() {
  return (
    <main className="p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
