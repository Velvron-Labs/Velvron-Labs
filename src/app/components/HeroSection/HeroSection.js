'use client';

import { useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Rocket } from 'lucide-react';
import styles from './HeroSection.module.css';
import { TerminalWindow } from '../Terminal/Terminal';

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" });

  // Optimize animations with useCallback
  const handleAnimationStart = useCallback(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    handleAnimationStart();
  }, [handleAnimationStart]);

  // Memoize animation variants to prevent recreation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }), []);

  const terminalVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }), []);

  // Optimized terminal content - reduced for better performance
  const terminalContent = useMemo(() => [
    "$ whoami",
    "velvron@developer",
    "",
    "$ ls -la projects/",
    "total 42",
    "drwxr-xr-x  8 velvron  staff   256 Sep 27 12:00 .",
    "drwxr-xr-x  6 velvron  staff   192 Sep 26 15:30 ..",
    "-rw-r--r--  1 velvron  staff  1.2K Sep 27 10:45 package.json",
    "drwxr-xr-x  5 velvron  staff   160 Sep 27 11:30 src/",
    "drwxr-xr-x  3 velvron  staff    96 Sep 27 09:15 public/",
    "",
    "$ git status",
    "On branch main",
    "Your branch is up to date with 'origin/main'.",
    "",
    "$ npm run build",
    "> Building for production...",
    "✓ Compiled successfully"
  ], []);

  // Optimized button handlers with proper navigation
  const handleGetStarted = useCallback(() => {
    // Navigate to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleLearnMore = useCallback(() => {
    // Navigate to about/services section
    const aboutSection = document.querySelector('[id*="about"], [id*="service"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll down one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className={styles.hero} ref={ref} id="home">
      <div className={styles.heroContent}>
        <motion.div 
          className={styles.heroGrid}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Left Column - Content */}
          <div className={styles.heroText}>
            <motion.div 
              className={styles.badge}
              variants={itemVariants}
            >
              <span><Rocket size={16} className={styles.rocketIcon} /> Ready to Launch</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className={styles.title}>
              <span className={styles.companyName}>Velvron Labs</span>
              <br />
              Engineering the Future of{' '}
              <span className={styles.highlight}>Technology</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className={styles.subtitle}>
              We help startups and enterprises build scalable, secure, and 
              user-centric applications with cutting-edge technology.
            </motion.p>
            
            <motion.div variants={itemVariants} className={styles.ctaContainer}>
              <button 
                className={styles.primaryButton}
                onClick={handleGetStarted}
                type="button"
                aria-label="Get started with our services"
              >
                Get Started
                <span className={styles.buttonIcon} aria-hidden="true">→</span>
              </button>
              <button 
                className={styles.secondaryButton}
                onClick={handleLearnMore}
                type="button"
                aria-label="Learn more about our services"
              >
                Learn More
              </button>
            </motion.div>
            
            <motion.div variants={itemVariants} className={styles.statsContainer}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Projects</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Clients</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>5+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Terminal */}
          <motion.div 
            className={styles.terminalWrapper}
            variants={terminalVariants}
          >
            <TerminalWindow 
              content={terminalContent}
              typing={true}
              animate={isInView}
              className={styles.terminal}
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className={styles.backgroundElements} aria-hidden="true">
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
    </section>
  );
};

export default HeroSection;
