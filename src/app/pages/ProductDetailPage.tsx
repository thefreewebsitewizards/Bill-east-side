import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-[#0C5A7D] hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0C5A7D] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <div className="sticky top-24">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute top-6 right-6 bg-[#D4A574] text-[#1A1A1A] px-4 py-2 rounded-full font-semibold">
                  Made in USA
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-5xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-[#D4A574]">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Complete Board</p>
                  <p className="text-4xl font-semibold text-[#0C5A7D]" style={{ fontFamily: 'Merriweather, serif' }}>
                    ${product.completePrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">+ shipping</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Deck Only</p>
                  <p className="text-4xl font-semibold text-[#2D5741]" style={{ fontFamily: 'Merriweather, serif' }}>
                    ${product.deckOnlyPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">+ shipping</p>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                Technical Specifications
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-700">Camber</span>
                  <span className="text-gray-900">{product.specs.camber}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-700">Concave</span>
                  <span className="text-gray-900">{product.specs.concave}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Wheelbase</span>
                  <span className="text-gray-900">{product.specs.wheelbase}</span>
                </div>
              </div>
            </div>

            {/* Component Details */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                Components
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                {product.components.trucks && (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0C5A7D] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-700">Trucks</p>
                      <p className="text-gray-600">{product.components.trucks}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0C5A7D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Wheels</p>
                    <p className="text-gray-600">{product.components.wheels}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0C5A7D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Bearings</p>
                    <p className="text-gray-600">{product.components.bearings}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                Features
              </h2>
              <div className="flex flex-wrap gap-3">
                {product.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="bg-[#0C5A7D] text-white px-4 py-2 rounded-full font-semibold"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Handmade Note */}
            <div className="bg-[#D4A574]/10 border-2 border-[#D4A574] rounded-lg p-6 mb-8">
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                Handcrafted with Love
              </h3>
              <p className="text-gray-700">
                Each board is hand-painted/stained with love. Imperfections are proof of the handmade 
                process and make your board truly unique. No two boards are exactly alike.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/custom"
                className="flex-1 bg-[#0C5A7D] text-white text-center px-8 py-4 rounded-lg font-semibold hover:bg-[#0A4359] transition-all"
              >
                Order This Board
              </Link>
              <Link
                to="/custom"
                className="flex-1 bg-white border-2 border-[#0C5A7D] text-[#0C5A7D] text-center px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Custom Order
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Merriweather, serif' }}>
            More From The Quiver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl group-hover:text-[#0C5A7D] transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600">${relatedProduct.completePrice.toFixed(2)}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
