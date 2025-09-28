'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../HeroSection/HeroSection';
import Navbar from '../Navbar/Navbar';
import AboutSection from '../AboutSection/AboutSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import ContactSection from '../ContactSection/ContactSection';
import Footer from '../Footer/Footer';

// Dynamically import ProjectsSection with SSR disabled
const ProjectsSection = dynamic(
  () => import('../ProjectsSection/ProjectsSection'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="animate-pulse text-slate-500">Loading projects...</div>
      </div>
    )
  }
);

// Dynamically import MatrixRain with SSR disabled
const MatrixRain = dynamic(() => import('../MatrixRain/MatrixRain'), {
  ssr: false,
  loading: () => null
});

// Loading fallback component
const LoadingFallback = () => (
  <div 
    className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center"
    style={{ zIndex: 9999 }}
  >
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
);

const HomeClient = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section with Matrix Background */}
      <div className="relative w-full min-h-screen">
        {/* Matrix Rain Background - Behind hero content */}
        <div className="absolute inset-0 z-0">
          <MatrixRain opacity={0.15} />
        </div>
        
        {/* Hero Content - On top of matrix rain */}
        <div className="relative z-10 w-full h-full">
          <HeroSection />
        </div>
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeClient;