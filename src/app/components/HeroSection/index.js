'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { fadeIn } from '@/app/utils/animations';
import { useIsMobile } from '@/app/utils/responsive';
import { colors } from '@/app/config/theme';

// Dynamically import Three.js components to avoid SSR issues
const DynamicThreeScene = dynamic(
  () => import('./ThreeScene'),
  { ssr: false }
);

export default function HeroSection() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // Animate hero content
    const animations = [];
    
    // Heading animation
    if (headingRef.current) {
      animations.push(
        fadeIn(headingRef.current, 1, 0.2)
      );
    }
    
    // Subheading animation
    if (subheadingRef.current) {
      animations.push(
        fadeIn(subheadingRef.current, 0.8, 0.4)
      );
    }
    
    // CTA buttons animation
    if (ctaRef.current) {
      animations.push(
        fadeIn(ctaRef.current, 0.8, 0.6)
      );
    }
    
    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      animations.push(
        fadeIn(scrollIndicatorRef.current, 1, 1)
      );
      
      // Bounce animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut'
      });
    }
    
    // Clean up animations
    return () => {
      animations.forEach(anim => anim.kill?.());
      if (scrollIndicatorRef.current) {
        gsap.killTweensOf(scrollIndicatorRef.current);
      }
    };
  }, []);

  const isMobile = useIsMobile();
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.textSecondary,
      }}
    >
      {/* 3D Background - Only render on desktop for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <DynamicThreeScene />
        </div>
      )}
      
      {/* Content Overlay */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Engineering the{' '}
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.textTertiary} 100%)`,
              }}
            >
              Future
            </span>
          </motion.h1>
          
          <motion.p 
            ref={subheadingRef}
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Building tomorrow's technology today with cutting-edge solutions in AI, cloud, and automation.
          </motion.p>
          
          <motion.div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button 
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                color: 'white',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px -5px rgba(4, 102, 200, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Explore Our Work
            </button>
            <button 
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 border-2"
              style={{
                borderColor: colors.primary,
                color: colors.primary,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${colors.primary}1a`; // 10% opacity
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator - Only show on desktop */}
      {!isMobile && (
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={{ color: colors.textTertiary }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <div 
            className="w-px h-12"
            style={{
              background: `linear-gradient(to bottom, ${colors.primary}, transparent)`,
            }}
          ></div>
        </div>
      )}
    </section>
  );
}
