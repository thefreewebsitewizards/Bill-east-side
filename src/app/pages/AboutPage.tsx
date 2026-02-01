import { Heart, Palmtree, Waves } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Made in Paradise
          </h1>
          <p className="text-2xl text-[#0C5A7D] max-w-3xl mx-auto" style={{ fontFamily: 'Merriweather, serif' }}>
            Sharing the joy of pushing, pumping, and padding with the world
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1634663355648-05be9f831176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXVhaSUyMGhhd2FpaSUyMHRyb3BpY2FsJTIwY29hc3R8ZW58MXx8fHwxNzY5OTgyNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Kauai coastline"
              className="w-full h-[500px] object-cover rounded-lg shadow-xl"
            />
          </div>

          <div>
            <h2 className="text-4xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
              From Kapaa, With Aloha
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                In the sweet little town of Kapaa, Kauai, surrounded by ocean mists and tropical breezes, 
                I craft longboards that embody the spirit of the islands.
              </p>
              <p>
                Each board starts with premium 7-layer Canadian Maple and transforms through careful 
                hand-painting and hand-staining into a unique piece of functional art. No two boards 
                are exactly alike - the beautiful imperfections are proof of the handmade process.
              </p>
              <p>
                My passion is creating boards designed for pumping pleasure - that perfect rhythm of 
                propelling yourself forward without ever putting a foot down. It's meditative, it's 
                exhilarating, and it's what these boards do best.
              </p>
              <p className="text-[#0C5A7D] font-semibold italic">
                Every board I make is an invitation to experience the joy I feel when riding through 
                the streets of Kauai.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0C5A7D] text-white mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
              Handcrafted
            </h3>
            <p className="text-gray-600">
              Every board is made by hand with attention to detail and genuine care. The imperfections 
              aren't flaws - they're signatures of authenticity.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2D5741] text-white mb-4">
              <Palmtree className="w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
              Aloha Spirit
            </h3>
            <p className="text-gray-600">
              Made in Hawaii with the values of aloha - love, respect, and compassion. Each board 
              carries the relaxed yet passionate spirit of the islands.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A574] text-[#1A1A1A] mb-4">
              <Waves className="w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
              Pumping Focused
            </h3>
            <p className="text-gray-600">
              Designed specifically for the art of pumping - the camber, concave, and wheelbase 
              all optimized for that smooth, rhythmic ride.
            </p>
          </div>
        </div>

        {/* Craftsmanship Section */}
        <div className="bg-white rounded-lg shadow-md p-12 mb-16">
          <h2 className="text-4xl mb-8 text-center" style={{ fontFamily: 'Merriweather, serif' }}>
            The Craft
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                Premium Materials
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>7-layer Canadian Maple construction for optimal flex and durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>Top-mount design for maximum leverage and control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>1 1/2 inch camber for energy return on every pump</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>3/16 inch concave for locked-in foot placement</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                Quality Components
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>Premium trucks for responsive turning and stability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>High-quality wheels sized perfectly for smooth pumping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>APEC 7 bearings for speed and longevity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0C5A7D] mt-1">✓</span>
                  <span>Hand-painted or hand-stained finishes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div id="shipping" className="bg-gray-50 rounded-lg p-12 mb-16">
          <h2 className="text-4xl mb-8 text-center" style={{ fontFamily: 'Merriweather, serif' }}>
            Shipping Information
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold mb-2">Made to Order</h3>
              <p>
                Each board is crafted specifically for you. Please allow 2-3 weeks for creation 
                and hand-finishing before shipping.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Shipping from Hawaii</h3>
              <p>
                All boards ship from Kapaa, Kauai. Shipping costs vary based on destination. 
                I'll provide exact shipping quotes during the ordering process.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Packaging</h3>
              <p>
                Your board will be carefully packaged to ensure it arrives in perfect condition, 
                ready to ride.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p>
                Questions about shipping or want to discuss your order? Reach out through the 
                custom order form or connect with me on social media.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#0C5A7D] text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            Ready to Ride?
          </h2>
          <p className="text-xl text-gray-200 mb-2">
            Made in USA. Hand-painted with love. Built for pumping.
          </p>
          <p className="text-3xl mt-6" style={{ fontFamily: 'Merriweather, serif', color: '#D4A574' }}>
            Get out there and Pump it!
          </p>
        </div>
      </div>
    </div>
  );
}
