import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade in animation
export const fadeIn = (element, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

// Staggered fade in for multiple elements
export const staggerFadeIn = (elements, stagger = 0.1, duration = 0.8) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
    }
  );
};

// Text reveal animation
export const textReveal = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

// Scroll-triggered animation
export const scrollTriggerAnimation = (target, options) => {
  const defaults = {
    trigger: target,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    ...options,
  };

  return ScrollTrigger.create(defaults);
};

// Parallax effect
export const parallaxEffect = (element, speed = 1) => {
  gsap.to(element, {
    y: (1 - speed) * 100,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Hover animation for interactive elements
export const hoverAnimation = (element, scale = 1.05) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

// Animate counter
export const animateCounter = (element, target, duration = 2) => {
  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toLocaleString();
    },
  });
};
