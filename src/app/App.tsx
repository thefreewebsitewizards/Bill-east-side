import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import HomePage from '@/app/pages/HomePage';
import ShopPage from '@/app/pages/ShopPage';
import ProductDetailPage from '@/app/pages/ProductDetailPage';
import CustomOrderPage from '@/app/pages/CustomOrderPage';
import AboutPage from '@/app/pages/AboutPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/custom" element={<CustomOrderPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
