import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ToolDirectoryPage } from './pages/ToolDirectoryPage.tsx';
import { ToolDetailPage } from './pages/ToolDetailPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { FavoritesPage, HistoryPage } from './pages/DashboardSubPages.tsx';
import { AuthPage } from './pages/AuthPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { AboutPage, ContactPage, PrivacyPage, TermsPage, DisclaimerPage } from './pages/LegalPages.tsx';
import { GuestSyncToast } from './components/common/GuestSyncToast.tsx';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolDirectoryPage />} />
              <Route path="/category/:categorySlug" element={<ToolDirectoryPage />} />
              <Route path="/tools/:slug" element={<ToolDetailPage />} />
              
              {/* Dashboard and user routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/favorites" element={<FavoritesPage />} />
              <Route path="/dashboard/history" element={<HistoryPage />} />
              <Route path="/dashboard/projects" element={<DashboardPage />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<AuthPage defaultMode="login" />} />
              <Route path="/signup" element={<AuthPage defaultMode="signup" />} />
              
              {/* Admin route */}
              <Route path="/admin" element={<AdminPage />} />

              {/* Informational & Legal routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              
              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <GuestSyncToast />
          <Footer />
          <Analytics />
        </div>
      </Router>
    </AuthProvider>
  );
}

