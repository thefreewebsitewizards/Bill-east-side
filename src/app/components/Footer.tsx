import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center mb-4">
              <ImageWithFallback src="/eastside-logo.png" alt="Eastside Longboards" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-300 mb-4">
              Sharing the joy of pushing, pumping, and padding with the world.
            </p>
            <p className="text-gray-400 text-sm">
              Made in the sweet little town of Kapaa, Kauai, Hawaii
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-block bg-[#D4A574] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold">
                Made in USA
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-[#D4A574] transition-colors">
                  Shop The Quiver
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-gray-300 hover:text-[#D4A574] transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#D4A574] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#shipping" className="text-gray-300 hover:text-[#D4A574] transition-colors">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-[#D4A574] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4A574] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4A574] transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {new Date().getFullYear()} Eastside Longboards. Handcrafted with love in Kapaa, Kauai.
          </p>
          <p className="text-[#D4A574] font-semibold">
            Get out there and Pump it!
          </p>
        </div>
      </div>
    </footer>
  );
}
