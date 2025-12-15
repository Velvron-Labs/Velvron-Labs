'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home, Terminal, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Error({ error, reset }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
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
    <main className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden font-sans p-4 text-slate-50">
      
      {/* --- Background Effects --- */}
      {/* Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Error Glow (Red/Orange to signify alert) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- Main Card --- */}
      <motion.div 
        className="relative z-10 w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-slate-900/50 border-b border-slate-800 p-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-3 text-xs font-mono text-slate-500 uppercase tracking-widest">System Failure</span>
          </div>

          <div className="p-8 md:p-10 text-center">
            
            {/* Animated Icon */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6 shadow-lg shadow-red-900/20"
            >
              <AlertTriangle size={40} className="text-red-500" />
            </motion.div>

            {/* Headings */}
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-3 text-slate-100"
            >
              Something went wrong!
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base"
            >
              An unexpected error occurred while processing your request. 
              Our engineers have been notified (mentally).
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => reset()}
                className="group flex items-center justify-center gap-2 bg-slate-100 hover:bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-slate-500/20 active:scale-95"
              >
                <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                <span>Try Again</span>
              </button>

              <Link href="/">
                <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full sm:w-auto">
                  <Home size={18} />
                  <span>Go Home</span>
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Dev Mode Details Section (Only shows in Dev) */}
          {process.env.NODE_ENV === 'development' && error && (
            <motion.div 
              variants={itemVariants}
              className="border-t border-slate-800 bg-black/40"
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 text-xs font-mono text-red-400 hover:bg-slate-900/50 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <Terminal size={14} />
                  DEV_ERROR_LOG
                </span>
                <ChevronRight 
                  size={14} 
                  className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>
              
              {isExpanded && (
                <div className="p-4 pt-0 overflow-x-auto">
                  <pre className="text-xs text-red-300 font-mono bg-red-950/20 border border-red-900/30 rounded p-4 whitespace-pre-wrap break-words">
                    <code>
                      {error.message || "Unknown Error"}
                      {error.stack && `\n\n${error.stack}`}
                    </code>
                  </pre>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </motion.div>
    </main>
  );
}