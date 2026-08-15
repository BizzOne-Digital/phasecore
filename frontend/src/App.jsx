import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import { initScrollReveal } from './utils/scrollReveal';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import ContactsAdmin from './admin/pages/ContactsAdmin';
import PortfolioAdmin from './admin/pages/PortfolioAdmin';
import FAQAdmin from './admin/pages/FAQAdmin';
import ServicesAdmin from './admin/pages/ServicesAdmin';

function PublicLayout({ children }) {
  return (<><Navbar />{children}<Footer /></>);
}

export default function App() {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><ContactsAdmin /></ProtectedRoute>} />
          <Route path="/admin/portfolio" element={<ProtectedRoute><PortfolioAdmin /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><ServicesAdmin /></ProtectedRoute>} />
          <Route path="/admin/faqs" element={<ProtectedRoute><FAQAdmin /></ProtectedRoute>} />

          <Route path="*" element={
            <PublicLayout>
              <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 80, fontWeight: 700, color: '#C9962C' }}>404</div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#0D1B2A', margin: '16px 0 12px' }}>Page Not Found</h2>
                  <p style={{ color: '#6B7280', marginBottom: 28 }}>The page you're looking for doesn't exist.</p>
                  <a href="/" style={{ background: '#C9962C', color: '#0D1B2A', padding: '12px 28px', borderRadius: 6, fontWeight: 600, textDecoration: 'none' }}>Back to Home</a>
                </div>
              </div>
            </PublicLayout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
