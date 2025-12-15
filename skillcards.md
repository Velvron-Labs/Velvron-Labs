import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { 
  Server, Database, Globe, Cpu,
  Layers, Box, Code2, Hash, Zap
} from "lucide-react";

// ==================================================================================
// 1. THE INFINITE DECK
// Concept: A stack of cards representing depth of knowledge. Fans out on hover.
// ==================================================================================
export const CardDeckSkill = () => {
  return (
    <div className="group relative h-64 w-60 [perspective:1000px]">
      {/* Back Card (Tool 3) */}
      <div className="absolute inset-0 rounded-2xl bg-neutral-800 border border-neutral-700 shadow-xl transition-all duration-500 ease-out group-hover:translate-x-12 group-hover:-translate-y-4 group-hover:rotate-12 flex items-center justify-center">
         <Box className="w-10 h-10 text-neutral-600" />
      </div>

      {/* Middle Card (Tool 2) */}
      <div className="absolute inset-0 rounded-2xl bg-neutral-800 border border-neutral-600 shadow-xl transition-all duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-8 group-hover:rotate-6 flex items-center justify-center">
         <Database className="w-10 h-10 text-neutral-500" />
      </div>

      {/* Front Card (Main Skill) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl transition-all duration-500 group-hover:-translate-y-12">
        <div className="p-4 bg-indigo-500/10 rounded-full mb-4">
            <Server className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Backend</h3>
        <p className="text-xs text-neutral-400 mt-2">Architecture & Scale</p>

        {/* Hidden List revealed on hover */}
        <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="flex justify-center gap-2">
                {['Node', 'Go', 'SQL'].map(t => (
                    <span key={t} className="text-[10px] uppercase font-bold bg-neutral-800 px-2 py-1 rounded text-neutral-300 border border-neutral-700">{t}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// ==================================================================================
// 2. THE COMMAND LINE
// Concept: Retro terminal look. Text types out. Best for DevOps/Backend.
// ==================================================================================
export const TerminalSkill = () => {
  return (
    <div className="group w-80 bg-black rounded-lg overflow-hidden border border-neutral-800 font-mono text-sm relative shadow-lg">
      
      {/* Terminal Header */}
      <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-2 text-neutral-500 text-xs">devops.sh</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-48 flex flex-col justify-between">
        <div className="space-y-2 text-neutral-400">
          <div className="flex gap-2">
            <span className="text-green-500">➜</span>
            <span className="text-neutral-300">init infrastructure</span>
          </div>
          
          <div className="group-hover:block hidden">
            <div className="flex gap-2 text-yellow-500/80">
              <span>⚠</span>
              <span>Loading modules...</span>
            </div>
            <div className="pl-4 pt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-neutral-300">
                <span>[✓] Docker</span>
                <span>[✓] K8s</span>
                <span>[✓] AWS</span>
                <span>[✓] Terraform</span>
            </div>
          </div>
          
          {/* Blinking Cursor */}
          <div className="group-hover:hidden flex gap-2">
             <span className="text-green-500">➜</span>
             <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-green-500 block" 
             />
          </div>
        </div>

        <div className="text-xs text-neutral-600 border-t border-neutral-900 pt-2 flex justify-between items-center">
            <span>Uptime: 99.99%</span>
            <Zap className="w-3 h-3 text-yellow-600" />
        </div>
      </div>
    </div>
  );
};

// ==================================================================================
// 3. THE ORBITAL NODE
// Concept: Physics-based. Tools orbit the main skill.
// ==================================================================================
export const OrbitalSkill = () => {
    return (
        <div className="group relative w-64 h-64 flex items-center justify-center">
            
            {/* Orbits Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-neutral-800/50 group-hover:border-neutral-700/50 transition-colors duration-700 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-dashed border-neutral-800/50 group-hover:border-neutral-700/50 transition-colors duration-700 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Central Core */}
            <div className="relative z-10 w-20 h-20 bg-neutral-900 rounded-full border border-neutral-800 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-shadow">
                <Globe className="w-8 h-8 text-blue-500" />
            </div>

            {/* Orbiting Planets (Static position for layout, animated reveal) */}
            
            {/* Planet 1: Top */}
            <motion.div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 p-2 bg-neutral-900 border border-neutral-700 rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-75"
            >
                <Code2 className="w-4 h-4 text-blue-300" />
            </motion.div>

             {/* Planet 2: Bottom Right */}
             <motion.div 
                className="absolute bottom-4 right-4 p-2 bg-neutral-900 border border-neutral-700 rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-150"
            >
                <Layers className="w-4 h-4 text-purple-300" />
            </motion.div>

             {/* Planet 3: Bottom Left */}
             <motion.div 
                className="absolute bottom-4 left-4 p-2 bg-neutral-900 border border-neutral-700 rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-200"
            >
                <Hash className="w-4 h-4 text-green-300" />
            </motion.div>

            <span className="absolute bottom-0 translate-y-8 text-sm font-bold text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">Frontend</span>
        </div>
    )
}

// ==================================================================================
// 4. THE MAGNETIC BENTO
// Concept: Clean, Apple-style grid. Mouse spotlight effect.
// ==================================================================================
export const MagneticBentoSkill = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="group relative w-72 bg-neutral-900 rounded-2xl border border-white/5 p-6 overflow-hidden"
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.1),
                            transparent 80%
                        )
                    `
                }}
            />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-neutral-800 rounded-xl border border-white/10">
                        <Cpu className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">System Arch</h3>
                        <p className="text-xs text-neutral-500">Low-level logic</p>
                    </div>
                </div>

                {/* Grid of Tools */}
                <div className="grid grid-cols-2 gap-3">
                    {["Rust", "C++", "WASM", "Linux"].map((item) => (
                        <div key={item} className="bg-neutral-800/50 border border-white/5 p-2 rounded-lg text-center hover:bg-white/10 transition-colors cursor-default">
                            <span className="text-xs font-medium text-neutral-300">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ==================================================================================
// 5. THE SLIDING CARTRIDGE
// Concept: Industrial. Hovering slides the "ammo" (tools) out.
// ==================================================================================
export const SlidingCartridgeSkill = () => {
    return (
        <div className="flex items-center">
            {/* The Cartridge Body (Moves Left) */}
            <div className="group relative z-20 w-48 h-24 bg-neutral-200 text-neutral-900 rounded-l-xl rounded-r-sm flex flex-col justify-center px-6 transition-transform duration-300 hover:-translate-x-12">
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-neutral-400" />
                
                <h3 className="text-lg font-black uppercase tracking-tighter">Mobile</h3>
                <div className="h-1 w-8 bg-neutral-900 mt-1 mb-2" />
                <p className="text-[10px] font-bold text-neutral-600">IOS / ANDROID</p>
            </div>

            {/* The Magazine (Slides Out Right) */}
            <div className="relative z-10 h-20 bg-neutral-900 border border-neutral-800 rounded-r-xl -ml-2 flex items-center pr-4 pl-6 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                <div className="flex gap-3">
                     <div className="flex flex-col items-center gap-1">
                        <SmartphoneIcon className="w-4 h-4 text-white" />
                        <span className="text-[9px] text-neutral-400">RN</span>
                     </div>
                     <div className="w-[1px] h-8 bg-neutral-800" />
                     <div className="flex flex-col items-center gap-1">
                        <Code2 className="w-4 h-4 text-white" />
                        <span className="text-[9px] text-neutral-400">Dart</span>
                     </div>
                </div>
            </div>
        </div>
    )
}

// Helper Icon for Cartridge
const SmartphoneIcon = ({className}: {className?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
)

// ==================================================================================
// DEMO SHOWCASE
// ==================================================================================

const SkillShowcase = () => {
  return (
    <div className="min-h-screen bg-neutral-950 p-12 font-sans text-white">
      <div className="max-w-6xl mx-auto space-y-24">
        
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Core Competencies</h1>
            <p className="text-neutral-500">Highlighting technical skills with distinct interactive metaphors.</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 place-items-center">
            
            {/* 1. Deck */}
            <div className="flex flex-col items-center gap-6">
                <span className="text-neutral-600 text-xs font-mono uppercase tracking-widest">01. The Infinite Deck</span>
                <CardDeckSkill />
            </div>

            {/* 2. Terminal */}
            <div className="flex flex-col items-center gap-6">
                <span className="text-neutral-600 text-xs font-mono uppercase tracking-widest">02. The Command Line</span>
                <TerminalSkill />
            </div>

            {/* 3. Orbit */}
            <div className="flex flex-col items-center gap-6">
                <span className="text-neutral-600 text-xs font-mono uppercase tracking-widest">03. The Orbital Node</span>
                <OrbitalSkill />
            </div>

            {/* 4. Bento */}
            <div className="flex flex-col items-center gap-6">
                <span className="text-neutral-600 text-xs font-mono uppercase tracking-widest">04. The Magnetic Bento</span>
                <MagneticBentoSkill />
            </div>

            {/* 5. Cartridge */}
            <div className="flex flex-col items-center gap-6 lg:col-span-2">
                <span className="text-neutral-600 text-xs font-mono uppercase tracking-widest">05. The Sliding Cartridge</span>
                <SlidingCartridgeSkill />
            </div>

        </div>
      </div>
    </div>
  );
};

export default SkillShowcase;