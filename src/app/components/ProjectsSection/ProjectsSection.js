'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Code } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "CareCore Health",
    description: "A comprehensive healthcare platform featuring eye and ear tests, a medical marketplace, real-time chat with doctors, and notification system. This professional-grade application includes secure user authentication and a seamless user experience for both patients and healthcare providers.",
    tags: ["React", "Firebase", "WebRTC", "Real-time"],
    image: "/assets/carecore.png",
    liveUrl: "https://carecore.vercel.app",
    sourceAvailable: false,
    sourceUrl: "",
    type: "Healthcare",
    date: "2025"
  },
  {
    id: 2,
    title: "Elevate Resume",
    description: "A sophisticated resume builder platform designed for professionals to create stunning, ATS-friendly resumes. Features advanced templates, real-time preview, export options in multiple formats, and professional design customization tools.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PDF Generation"],
    image: "/assets/elevate-resume.jpg",
    liveUrl: "https://elevate-resume.vercel.app",
    sourceAvailable: false,
    sourceUrl: "",
    type: "Productivity",
    date: "2025"
  },
  {
    id: 3,
    title: "StudySphere",
    description: "A full-stack learning and collaboration platform built with clean separation between frontend (Next.js PWA) and backend (Express + PostgreSQL + MongoDB). Features real-time messaging, notifications, PWA offline support, and modular architecture.",
    tags: ["Next.js", "Express", "PostgreSQL", "MongoDB", "Socket.IO", "PWA"],
    image: "/assets/studylanding.jpg",
    liveUrl: false,
    sourceAvailable: false,
    sourceUrl: "",
    type: "Education",
    date: "2025"
  },
  {
    id: 4,
    title: "Campus Sale",
    description: "A comprehensive campus marketplace platform for students in Ghana to buy and sell items securely. Features escrow payment system, real-time messaging, and location-based services. Built with modern full-stack technologies for reliable performance.",
    tags: ["Next.js", "Redis", "PostgreSQL", "MongoDB Atlas", "Escrow"],
    image: "/assets/campussale.png",
    liveUrl: false,
    sourceAvailable: false,
    sourceUrl: "",
    type: "Marketplace",
    date: "2025"
  }
];

const DiagonalProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative w-full rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl border border-neutral-800 group"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex flex-col md:flex-row h-full min-h-[450px]">

        {/* LEFT: IMAGE SECTION */}
        <motion.div
          variants={{
            rest: { clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" },
            hover: { clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 md:static w-full md:w-[60%] h-64 md:h-auto z-10 bg-neutral-800 overflow-hidden"
        >
          {/* Image Scaling Effect */}
          <motion.img
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.1 },
            }}
            transition={{ duration: 0.5 }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.target.src = '/assets/placeholder-project.jpg';
            }}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* RIGHT: CONTENT SECTION */}
        <div className="relative z-20 flex-1 flex flex-col justify-center p-8 md:pl-4 md:pr-10 mt-[220px] md:mt-0 bg-neutral-900 md:bg-transparent">

          {/* Header: Type & Date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-bold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
              {project.type}
            </span>
            <span className="text-neutral-500 text-xs font-medium">{project.date}</span>
          </div>

          {/* Title with hover arrow interaction */}
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-2">
            {project.title}
            <motion.span
              variants={{
                rest: { x: -10, opacity: 0 },
                hover: { x: 0, opacity: 1 },
              }}
            >
              <ArrowRight className="w-6 h-6 text-indigo-400" />
            </motion.span>
          </h3>

          {/* Description */}
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-neutral-300 bg-neutral-800 rounded border border-neutral-700 select-none hover:border-neutral-500 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {project.liveUrl && project.liveUrl !== false ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.45)]"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            ) : (
              <button className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-neutral-500 rounded-xl font-bold text-sm border border-neutral-700 cursor-not-allowed">
                <ExternalLink className="w-4 h-4" />
                Coming Soon
              </button>
            )}

            {project.sourceAvailable ? (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white rounded-xl font-bold text-sm border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 transition-all"
              >
                <Github className="w-4 h-4" />
                Source
              </a>
            ) : (
              <button className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-neutral-500 rounded-xl font-bold text-sm border border-neutral-700 cursor-not-allowed">
                <Code className="w-4 h-4" />
                Private
              </button>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative w-full py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 via-transparent to-purple-900/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">// OUR PROJECTS</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore our latest projects and innovative solutions that push the boundaries of technology.
          </p>
        </motion.div>

        {/* Projects Grid - Single column */}
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <DiagonalProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-400 mb-6">Want to see more of our work?</p>
          <motion.button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
