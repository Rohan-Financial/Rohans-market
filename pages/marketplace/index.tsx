import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { products } from '@/data/products';
import { synonyms } from '@/data/synonyms';

export default function Marketplace() {
  const router = useRouter();
  const searchTerm = (router.query.search as string || '').toLowerCase();
  const selectedCategory = (router.query.category as string) || 'All';

  const expandedTerms = searchTerm
    ? searchTerm
        .split(' ')
        .flatMap((word) => [word, ...(synonyms[word] || [])])
    : [];

  const filteredProducts = expandedTerms.length
    ? products.filter(
        (p) =>
          expandedTerms.some((term) =>
            p.name.toLowerCase().includes(term)
          ) &&
          (selectedCategory === 'All' || p.category === selectedCategory)
      )
    : products.filter(
        (p) =>
          selectedCategory === 'All' || p.category === selectedCategory
      );

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(router.query as any);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/marketplace?${params.toString()}`);
  };

  return (
    <>
      <Head>
        <title>Marketplace | Rohan’s Market</title>
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-2">Explore the Marketplace</h1>
        <p className="mb-6 text-gray-600">
          Browse products from verified vendors powered by Rohan Financial.
        </p>

        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {searchTerm
            ? `Search results for "${searchTerm}"`
            : selectedCategory !== 'All'
            ? `Showing ${selectedCategory} products`
            : 'Recommended for You'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/marketplace/${product.id}`}>
              <a className="block bg-white p-4 rounded shadow hover:shadow-md transition">
                <div className="h-32 bg-gray-200 mb-2" />
                <p className="text-sm font-medium">{product.name}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
