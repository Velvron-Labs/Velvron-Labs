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
    <header 
      className={`fixed top-0 left-0 right-0 z-[1000] h-16 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-[20px] ${
        scrolled 
          ? 'bg-slate-900/95 border-b border-slate-400/10 shadow-[0_4px_20px_rgba(0,0,0,0.1)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-12 w-full h-full flex items-center justify-between">
        {/* Logo */}
        <motion.a 
          href="#home" 
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/assets/Logo.jpg"
            alt="Velvron Labs Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="text-xl font-bold text-white leading-none">Velvron Labs</span>
        </motion.a>

        {/* Desktop Navigation - Hidden below 917px, Flex above 917px */}
        <nav className="hidden min-[917px]:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <a 
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 py-2 relative group ${
                    link.name === 'Contact' 
                      ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white !px-6 !py-3 rounded-lg hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:-translate-y-[1px]'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.name !== 'Contact' && (
                    <span className="w-4 h-4 text-slate-500 transition-colors duration-200 group-hover:text-blue-500">
                      {getNavIcon(link.name)}
                    </span>
                  )}
                  <span>{link.name === 'Contact' ? 'Contact Us' : link.name}</span>
                  {link.name === 'Contact' && <Mail size={16} />}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button - Flex below 917px, Hidden above 917px */}
        <motion.button
          className="flex min-[917px]:hidden items-center justify-center w-10 h-10 text-white bg-white/10 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/20 border-none"
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
              className="fixed top-16 right-0 w-full md:w-[400px] bg-slate-900/98 backdrop-blur-[20px] border-l border-b border-slate-400/10 overflow-hidden z-[999]"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-4 mb-6">
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
                      className={`flex items-center gap-3 font-medium py-3 transition-colors duration-200 ${
                        link.name === 'Contact'
                          ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white px-6 rounded-lg hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className={`w-5 h-5 ${link.name !== 'Contact' ? 'text-blue-500' : ''}`}>
                        {getNavIcon(link.name)}
                      </span>
                      <span>{link.name === 'Contact' ? 'Contact Us' : link.name}</span>
                    </motion.a>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-400/10">
                  <p className="text-sm text-slate-500 mb-3">Connect with us</p>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 p-2 rounded-lg transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/10 hover:-translate-y-[1px]"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;