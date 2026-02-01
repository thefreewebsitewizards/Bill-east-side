import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#D4A574]/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ImageWithFallback src="/eastside-logo.png" alt="Eastside Longboards" className="h-14 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-[#0C5A7D] transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#0C5A7D] transition-colors">
              Shop
            </Link>
            <Link to="/custom" className="hover:text-[#0C5A7D] transition-colors">
              Custom Orders
            </Link>
            <Link to="/about" className="hover:text-[#0C5A7D] transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-[#D4A574]/30 bg-white px-3 py-2 text-[#0C5A7D] hover:bg-gray-50 transition-colors"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/shop"
              className="flex items-center gap-2 bg-[#0C5A7D] text-white px-4 py-2 rounded-lg hover:bg-[#0A4359] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Shop</span>
            </Link>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="md:hidden fixed inset-0 z-[999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-screen w-72 bg-white text-gray-900 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center" onClick={onClose}>
            <ImageWithFallback src="/eastside-logo.png" alt="Eastside Longboards" className="h-10 w-auto" />
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-lg">
          <Link to="/" className="hover:text-[#0C5A7D] transition-colors" onClick={onClose}>
            Home
          </Link>
          <Link to="/shop" className="hover:text-[#0C5A7D] transition-colors" onClick={onClose}>
            Shop
          </Link>
          <Link to="/custom" className="hover:text-[#0C5A7D] transition-colors" onClick={onClose}>
            Custom Orders
          </Link>
          <Link to="/about" className="hover:text-[#0C5A7D] transition-colors" onClick={onClose}>
            About
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
