'use client';

import { useEffect, useRef, useState } from 'react';

const MatrixRain = ({ className = '', opacity = 0.1 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure complete hydration
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - more variety for better visual effect
    const chars = '01010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.min(Math.floor(canvas.width / fontSize), 150); // Increased columns for more density
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height; // Start above screen
    }

    const draw = () => {
      // Dark background with gradient for hero section
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
      gradient.addColorStop(1, 'rgba(30, 41, 59, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Semi-transparent overlay for trailing effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i];

        ctx.fillText(text, x, y);

        // Reset drop to top when it goes off screen - more frequent resets for denser effect
        if (y > canvas.height + 20) {
          drops[i] = Math.random() * -150 - 20;
        }

        // Move drop down
        drops[i] += 1;
      }
    };

    let lastTime = 0;
    const targetFPS = 30; // Reduce FPS for better performance
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime) => {
      if (currentTime - lastTime >= frameTime) {
        draw();
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, opacity]);

  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    />
  );
};

export default MatrixRain;
