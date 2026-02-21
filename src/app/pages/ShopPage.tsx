import { useProducts } from '@/app/hooks/useProducts';
import { ProductCard } from '@/app/components/ProductCard';

export default function ShopPage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            The Quiver
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Handcrafted longboards made with love in Kapaa, Kauai. 
            Each board is a unique piece of art designed for your pumping pleasure.
          </p>
          
          {/* Pricing Info */}
          <div className="inline-block bg-white rounded-lg shadow-md p-6 border-2 border-[#D4A574]">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completes</p>
                <p className="text-3xl font-semibold text-[#0C5A7D]" style={{ fontFamily: 'Merriweather, serif' }}>
                  $275.00
                </p>
                <p className="text-sm text-gray-500">+ shipping</p>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-gray-300" />
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Decks Only</p>
                <p className="text-3xl font-semibold text-[#2D5741]" style={{ fontFamily: 'Merriweather, serif' }}>
                  $175.00
                </p>
                <p className="text-sm text-gray-500">+ shipping</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading && (
          <div className="text-center text-gray-500 mb-12">Loading products...</div>
        )}
        {error && (
          <div className="text-center text-red-600 mb-12">{error}</div>
        )}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-500 mb-12">No products available yet.</div>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-[#0C5A7D] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            Each Board is One-of-a-Kind
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Because we hand-paint and hand-stain every deck, each board has its own unique character 
            and beautiful imperfections. These variations are not flaws - they're proof of the handmade 
            process and part of what makes your board special.
          </p>
        </div>
      </div>
    </div>
  );
}
