import Head from 'next/head';
import { useRouter } from 'next/router';
import { products } from '@/data/products';
import { synonyms } from '@/data/synonyms';

export default function Marketplace() {
  const router = useRouter();
  const searchTerm = (router.query.search as string || '').toLowerCase();

  const expandedTerms = searchTerm
    ? searchTerm
        .split(' ')
        .flatMap((word) => [word, ...(synonyms[word] || [])])
    : [];

  const filteredProducts = expandedTerms.length
    ? products.filter((p) =>
        expandedTerms.some((term) =>
          p.name.toLowerCase().includes(term)
        )
      )
    : products;

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

        <h2 className="text-xl font-semibold mb-4">
          {searchTerm ? `Search results for "${searchTerm}"` : 'Recommended for You'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <div className="h-32 bg-gray-200 mb-2" />
              <p className="text-sm font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
