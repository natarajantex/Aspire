/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Features from './components/Features';
import About from './components/About';
import Courses from './components/Courses';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import VideoTestimonials from './components/VideoTestimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

function AdminBar() {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-[var(--color-primary)] text-white px-4 py-3 rounded-xl z-[60] flex flex-col gap-3 shadow-2xl border border-white/10 backdrop-blur-md bg-opacity-95">
      <div className="font-heading font-bold flex items-center gap-2 text-[var(--color-accent)]">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
        Admin Mode
      </div>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors font-semibold text-sm w-full justify-start"
        >
          <LayoutDashboard size={16} /> Dashboard
        </button>
        <button 
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 px-4 py-2 rounded-lg transition-colors font-semibold text-sm w-full justify-start"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-white font-body text-[var(--color-dark)]">
      <AdminBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <About />
        <Courses />
        <Gallery />
        <Testimonials />
        <VideoTestimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAdmin();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return <Navigate to="/admin" replace />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
        </Routes>
      </Router>
    </AdminProvider>
  );
}
