'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, X } from 'lucide-react';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics Platform",
    description: "A comprehensive analytics dashboard with real-time data visualization and predictive insights using machine learning models.",
    tags: ["React", "Node.js", "D3.js", "MongoDB", "TensorFlow.js"],
    image: "/assets/placeholder-project.jpg",
    liveUrl: "#",
    sourceAvailable: true,
    sourceUrl: "https://github.com/yourusername/analytics-platform"
  },
  {
    id: 2,
    title: "E-commerce Solution",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind", "Redux"],
    image: "/assets/placeholder-project.jpg",
    liveUrl: "#",
    sourceAvailable: false,
    sourceUrl: ""
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    description: "A secure and transparent voting system built on Ethereum blockchain with smart contracts and IPFS for decentralized storage.",
    tags: ["Solidity", "Web3.js", "IPFS", "React", "Hardhat"],
    image: "/assets/placeholder-project.jpg",
    liveUrl: "#",
    sourceAvailable: true,
    sourceUrl: "https://github.com/yourusername/blockchain-voting"
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "An AI-powered content generation tool that creates high-quality articles, blog posts, and marketing copy using GPT-4.",
    tags: ["Python", "FastAPI", "OpenAI API", "React", "MongoDB"],
    image: "/assets/placeholder-project.jpg",
    liveUrl: "#",
    sourceAvailable: true,
    sourceUrl: "https://github.com/yourusername/ai-content-generator"
  },
  {
    id: 5,
    title: "Smart Home IoT Hub",
    description: "A centralized IoT hub for controlling and monitoring smart home devices with real-time data analytics.",
    tags: ["Raspberry Pi", "Node-RED", "MQTT", "React Native", "InfluxDB"],
    image: "/assets/placeholder-project.jpg",
    liveUrl: "#",
    sourceAvailable: true,
    sourceUrl: "https://github.com/yourusername/smart-home-hub"
  },
  {
    id: 6,
    title: "AR Shopping Assistant",
    description: "An augmented reality mobile app that helps users visualize furniture in their home before purchasing.",
    tags: ["Unity", "ARKit", "ARCore", "Firebase", "Swift"],
    image: "/assets/placeholder-project.jpg",
    liveUrl: "#",
    sourceAvailable: false,
    sourceUrl: ""
  },
  // Add more projects as needed
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, message: '', x: 0, y: 0 });
  const projectRefs = useRef([]);
  
  // Initialize particles for each project card
  useEffect(() => {
    if (typeof window !== 'undefined') {
      projectRefs.current = projectRefs.current.slice(0, projects.length);
      
      const handleMouseMove = (e) => {
        if (hoveredProject !== null) {
          const rect = projectRefs.current[hoveredProject]?.getBoundingClientRect();
          if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const particles = document.querySelectorAll(`.project-${hoveredProject} .particle`);
            
            particles.forEach((particle, i) => {
              const angle = (i / particles.length) * Math.PI * 2;
              const distance = 50;
              const offsetX = Math.cos(angle + Date.now() * 0.001) * distance;
              const offsetY = Math.sin(angle + Date.now() * 0.001) * distance;
              
              particle.style.transform = `translate(${x + offsetX}px, ${y + offsetY}px)`;
            });
          }
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [hoveredProject]);

  const showTooltip = (e, message) => {
    setTooltip({
      show: true,
      message,
      x: e.clientX,
      y: e.clientY - 40
    });
  };

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our <span className={styles.highlight}>Projects</span></h2>
          <p className={styles.sectionSubtitle}>Explore our latest work and innovative solutions</p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className={`${styles.projectCard} project-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Particle Background */}
              <div className={styles.particlesContainer}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`${styles.particle} particle`}
                    style={{
                      backgroundImage: 'url(/assets/particle.svg)',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      width: '24px',
                      height: '24px',
                      position: 'absolute',
                      opacity: 0.7,
                      transition: 'transform 0.3s ease-out, opacity 0.3s ease',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />
                ))}
              </div>
              
              <div className={styles.projectImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  onError={(e) => {
                    e.target.src = '/assets/placeholder-project.jpg';
                  }}
                />
              </div>
              
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                
                <div className={styles.projectLinks}>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`${styles.projectLink} ${styles.liveLink}`}
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  
                  {project.sourceAvailable ? (
                    <a 
                      href={project.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`${styles.projectLink} ${styles.sourceLink}`}
                      aria-label="View Source Code"
                    >
                      <Github size={18} />
                      <span>Source</span>
                    </a>
                  ) : (
                    <button 
                      className={`${styles.projectLink} ${styles.disabledLink}`}
                      onMouseEnter={(e) => showTooltip(e, 'Source code not available for this project')}
                      onMouseLeave={hideTooltip}
                      onClick={(e) => {
                        e.preventDefault();
                        setTooltip({
                          show: true,
                          message: 'Source code not available for this project',
                          x: e.clientX,
                          y: e.clientY - 40
                        });
                        setTimeout(() => setTooltip(prev => ({ ...prev, show: false })), 2000);
                      }}
                      aria-label="Source code not available"
                    >
                      <Code size={18} />
                      <span>Source</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Tooltip */}
      {tooltip.show && (
        <div 
          className={styles.tooltip}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltip.message}
          <span className={styles.tooltipArrow}></span>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
