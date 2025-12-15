'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, MoveLeft, Terminal, Search } from 'lucide-react';

export default function NotFound() {
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 },
    },
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden font-sans selection:bg-blue-500/30 text-slate-50">
      
      {/* --- Background Elements --- */}
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Giant Background Number (Decorative) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[20rem] md:text-[40rem] font-bold text-slate-100 leading-none tracking-tighter"
        >
          404
        </motion.span>
      </div>

      {/* --- Main Content --- */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Animated Icon */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-md mb-8 shadow-xl shadow-blue-900/10"
        >
          <Terminal size={32} className="text-blue-500" />
        </motion.div>

        {/* Glitchy Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            System Error
          </span>
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants}
          className="text-xl md:text-2xl text-blue-400 font-medium mb-6 font-mono"
        >
          Error Code: 404_PAGE_NOT_FOUND
        </motion.h2>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-slate-400 text-lg mb-10 leading-relaxed"
        >
          It looks like the coordinates you are trying to access don&apos;t exist in our system. 
          The page might have been moved, deleted, or never existed in this dimension.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Go Home Button */}
          <Link href="/">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 w-full sm:w-auto">
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left" />
              <div className="flex items-center justify-center gap-2 relative">
                <Home size={18} />
                <span>Return to Base</span>
              </div>
            </button>
          </Link>

          {/* Go Back / Contact Button */}
          <button 
            onClick={() => window.history.back()}
            className="group px-8 py-4 bg-slate-900/50 border border-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all duration-300 w-full sm:w-auto"
          >
            <div className="flex items-center justify-center gap-2">
              <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </div>
          </button>
        </motion.div>

      </motion.div>
    </main>
  );
}