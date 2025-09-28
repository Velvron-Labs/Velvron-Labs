'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Code, Cpu, Database, Server, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './AboutSection.module.css';

const techStack = [
  { name: 'AI/ML', icon: <Cpu size={24} />, color: '#3b82f6' },
  { name: 'Cloud', icon: <Server size={24} />, color: '#8b5cf6' },
  { name: 'Web3', icon: <Zap size={24} />, color: '#ec4899' },
  { name: 'Blockchain', icon: <Database size={24} />, color: '#10b981' },
  { name: 'Cybersecurity', icon: <Shield size={24} />, color: '#f59e0b' },
  { name: 'DevOps', icon: <Code size={24} />, color: '#6366f1' },
];

const AboutSection = () => {
  const [activeCube, setActiveCube] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [rotation, setRotation] = useState({ x: -10, y: 15 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const rotationTimeout = useRef(null);

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Auto-rotate on desktop
  useEffect(() => {
    if (isMobile || touchStart) return;
    
    let animationFrameId;
    let lastTime = 0;
    const rotationSpeed = 0.5; // Slower rotation speed
    
    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      
      setRotation(prev => ({
        ...prev,
        y: (prev.y + rotationSpeed) % 360
      }));
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start auto-rotation after a delay
    const startDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 2000);
    
    return () => {
      clearTimeout(startDelay);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (rotationTimeout.current) clearTimeout(rotationTimeout.current);
    };
  }, [isMobile, touchStart]);

  // Get active face based on rotation
  const getActiveFace = (rot) => {
    // Normalize rotation to 0-360 degrees
    const y = ((rot.y % 360) + 360) % 360;
    const x = rot.x || 0;
    
    // Check top/bottom first
    if (x > 45) return 4; // Top
    if (x < -45) return 5; // Bottom
    
    // Then check side rotations
    if (y >= 45 && y < 135) return 2; // Right
    if (y >= 135 && y < 225) return 1; // Back
    if (y >= 225 && y < 315) return 3; // Left
    
    return 0; // Front
  };

  // Handle mouse move for desktop rotation
  const handleMouseMove = (e) => {
    if (isMobile || !cubeRef.current) return;
    
    const rect = cubeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 15; // Reduced for more subtle effect
    const rotateY = ((x - centerX) / centerX) * 15; // Reduced for more subtle effect
    
    setMousePosition({ x: rotateY, y: rotateX });
    
    // Update active tech based on rotation
    const newActiveTech = getActiveFace({ x: rotateX, y: rotateY });
    setActiveCube(newActiveTech);
  };

  // Handle mouse leave for desktop
  const handleMouseLeave = () => {
    if (isMobile) return;
    setMousePosition({ x: 0, y: 0 });
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !touchStart) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setTouchStart(null);
  };

  // Add touch event listeners
  useEffect(() => {
    if (!isMobile || !cubeRef.current) return;
    
    const cube = cubeRef.current;
    cube.addEventListener('touchstart', handleTouchStart, { passive: false });
    cube.addEventListener('touchmove', handleTouchMove, { passive: false });
    cube.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      cube.removeEventListener('touchstart', handleTouchStart);
      cube.removeEventListener('touchmove', handleTouchMove);
      cube.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  // Rotate cube to specific face
  const rotateCube = (direction) => {
    if (rotationTimeout.current) clearTimeout(rotationTimeout.current);
    
    let newRotation = { ...rotation };
    
    if (direction === 'left') {
      newRotation.y = ((newRotation.y + 90) % 360 + 360) % 360;
    } else if (direction === 'right') {
      newRotation.y = ((newRotation.y - 90) % 360 + 360) % 360;
    }
    
    setRotation(newRotation);
    
    // Update active tech based on rotation
    const newActiveTech = getActiveFace(newRotation);
    setActiveCube(newActiveTech);
  };

  return (
    <section 
      id="about" 
      className={styles.aboutSection} 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background elements */}
      <div className={styles.gridOverlay} />
      <div className={styles.circleGlow} style={{
        left: `${50 + mousePosition.x * 0.5}%`,
        top: `${50 + mousePosition.y * 0.5}%`
      }} />
      
      <div className={styles.container}>
        {/* Left side - 3D Cube */}
        <div className={styles.cubeContainer}>
          <div 
            ref={cubeRef}
            className={styles.cube}
            style={{
              transform: `rotateX(${isMobile ? rotation.x + 'deg' : mousePosition.y + 'deg'}) 
                         rotateY(${isMobile ? rotation.y + 'deg' : mousePosition.x + 'deg'})`,
              touchAction: isMobile ? 'pan-y' : 'none',
              transition: isMobile ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.1s ease-out',
              willChange: 'transform'
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((_, i) => (
              <div 
                key={i} 
                className={`${styles.cubeFace} ${styles[`face${i + 1}`]}`}
                style={{
                  background: `linear-gradient(135deg, ${techStack[i].color}22, ${techStack[i].color}44)`,
                  border: `1px solid ${techStack[i].color}55`,
                  boxShadow: `0 0 20px ${techStack[i].color}33`
                }}
                onMouseEnter={() => setActiveCube(i)}
              >
                <div className={styles.techIcon} style={{ color: techStack[i].color }}>
                  {techStack[i].icon}
                </div>
                <span className={styles.techName} style={{ color: techStack[i].color }}>
                  {techStack[i].name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation */}
          <div className={styles.cubeNav}>
            <button 
              className={styles.cubeNavButton}
              onClick={() => rotateCube('left')}
              aria-label="Rotate left"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className={styles.cubeNavButton}
              onClick={() => rotateCube('right')}
              aria-label="Rotate right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right side - Content */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>// ABOUT US</span>
            <h2 className={styles.sectionTitle}>Engineering the <span className={styles.highlight}>Future</span></h2>
          </div>
          
          <p className={styles.description}>
            At Velvron Labs, we're not just building technology - we're crafting the digital future. 
            Our team of elite engineers and visionaries work at the intersection of innovation and 
            practicality, creating solutions that push boundaries.
          </p>
          
          <div className={styles.activeTech}>
            <span className={styles.activeTechLabel}>Specializing in:</span>
            <span className={styles.activeTechName} style={{ color: techStack[activeCube].color }}>
              {techStack[activeCube].name}
            </span>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Experts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Passion</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
