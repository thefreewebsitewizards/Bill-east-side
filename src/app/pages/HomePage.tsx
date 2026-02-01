import { Link } from 'react-router-dom';
import { ArrowRight, Palmtree, Hammer, Palette } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/background.jpg"
            alt="Longboard hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: 'Merriweather, serif', fontWeight: 900 }}>
            Handmade on Kauai.
            <br />
            Built for the Joy of Pumping.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            7-layer Canadian Maple longboards crafted with Aloha spirit
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#D4A574] text-[#1A1A1A] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8956A] transition-all transform hover:scale-105"
          >
            Shop the Quiver
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
              Crafted in Paradise
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Made in the sweet little town of Kapaa, Kauai. Each board is a 7-layer Canadian Maple top mount 
              designed for your pumping pleasure. We hand-paint and hand-stain every deck with love, celebrating 
              the beautiful imperfections that make each board truly one-of-a-kind.
            </p>
            <p className="text-xl text-[#0C5A7D] font-semibold" style={{ fontFamily: 'Merriweather, serif' }}>
              Sharing the joy of pushing, pumping, and padding with the world.
            </p>
          </div>
        </div>
      </section>

      {/* USP Highlights */}
      <section className="py-20" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Made in USA */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0C5A7D] text-white mb-6">
                <Palmtree className="w-10 h-10" />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>Made in USA</h3>
              <p className="text-gray-600">
                Proudly crafted in Kapaa, Kauai, Hawaii. Every board embodies the Aloha spirit and American craftsmanship.
              </p>
            </div>

            {/* Hand Painted */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#2D5741] text-white mb-6">
                <Palette className="w-10 h-10" />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>Hand Painted</h3>
              <p className="text-gray-600">
                Each board is hand-stained with beautiful imperfections. No two boards are exactly alike - your ride is truly unique.
              </p>
            </div>

            {/* Custom Designs */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4A574] text-[#1A1A1A] mb-6">
                <Hammer className="w-10 h-10" />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>Custom Designs Available</h3>
              <p className="text-gray-600">
                Want something special? We create custom boards in any style or color. Your vision, our craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1688274165311-15de2165d686?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXBsZSUyMHdvb2QlMjBncmFpbiUyMHRleHR1cmV8ZW58MXx8fHwxNzY5OTgyNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Maple wood grain"
                className="w-full h-[400px] object-cover rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
                Premium Canadian Maple
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We use only the finest 7-layer Canadian Maple for superior strength and flexibility. 
                The natural wood grain shines through our hand-staining process, creating stunning visual appeal.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>Top-mount design for optimal control and responsiveness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>1 1/2 inch camber for energy-efficient pumping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>3/16 inch concave for secure foot placement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0C5A7D] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Ready to Start Pumping?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Explore our collection of handcrafted longboards and find your perfect ride.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#D4A574] text-[#1A1A1A] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8956A] transition-all"
            >
              Browse Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/custom"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#0C5A7D] transition-all"
            >
              Order Custom Board
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
