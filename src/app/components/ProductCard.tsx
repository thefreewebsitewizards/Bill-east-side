import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/product/${product.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#D4A574] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold">
          Made in USA
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.map((feature, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Complete</p>
              <p className="text-lg font-semibold text-[#0C5A7D]">
                ${product.completePrice.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Deck Only</p>
              <p className="text-lg font-semibold text-[#2D5741]">
                ${product.deckOnlyPrice.toFixed(2)}
              </p>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-3 italic">
            Hand-stained with beautiful imperfections
          </p>
        </div>
      </div>
    </Link>
  );
}
