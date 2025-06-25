import Head from 'next/head';

export default function Marketplace() {
  return (
    <>
      <Head>
        <title>Marketplace | Rohan</title>
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900">
        {/* 🔍 Search Bar */}
        <section className="p-4 border-b bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search for products, brands, or categories"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </section>

        {/* 🧠 Smart Recommendations */}
        <section className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder cards */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <div className="h-32 bg-gray-200 mb-2" />
                <p className="text-sm font-medium">Product {i + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🗂️ Category Drill-Down */}
        <section className="p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <div className="flex flex-wrap gap-4">
            {['Electronics', 'Fashion', 'Home', 'Books'].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ⚡ Deals of the Day */}
        <section className="p-6">
          <h2 className="text-xl font-semibold mb-4">Deals of the Day</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-yellow-100 p-4 rounded shadow">
                <div className="h-32 bg-yellow-200 mb-2" />
                <p className="text-sm font-medium">Deal {i + 1}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
