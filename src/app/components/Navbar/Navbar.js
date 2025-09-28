'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Code, 
  Zap,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting and scroll effect
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Social links
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const getNavIcon = (name) => {
    switch (name) {
      case 'Home': return <Home size={18} />;
      case 'About': return <User size={18} />;
      case 'Services': return <Briefcase size={18} />;
      case 'Projects': return <Code size={18} />;
      case 'Contact': return <Mail size={18} />;
      default: return <Zap size={18} />;
    }
  };

  if (!isMounted) return null;

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <motion.a 
          href="#home" 
          className={styles.logo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/assets/Logo.jpg"
            alt="Velvron Labs Logo"
            width={40}
            height={40}
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>Velvron Labs</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <a 
                  href={link.href}
                  className={`${styles.navLink} ${link.name === 'Contact' ? styles.ctaButton : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.name !== 'Contact' && <span className={styles.navIcon}>{getNavIcon(link.name)}</span>}
                  <span>{link.name === 'Contact' ? 'Contact Us' : link.name}</span>
                  {link.name === 'Contact' && <Mail size={16} />}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className={styles.mobileNav}>
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${styles.mobileNavLink} ${link.name === 'Contact' ? styles.ctaButton : ''}`}
                  >
                    {getNavIcon(link.name)}
                    <span>{link.name === 'Contact' ? 'Contact Us' : link.name}</span>
                  </motion.a>
                ))}
              </div>

              <div className={styles.mobileSocialSection}>
                <p className={styles.mobileSocialTitle}>Connect with us</p>
                <div className={styles.mobileSocialLinks}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.name}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
