import { useEffect, useState } from 'react';
import { breakpoints } from '@/app/config/theme';

// Convert breakpoint string (e.g., '768px') to number
const breakpointToNumber = (breakpoint) => {
  return parseInt(breakpoint.replace('px', ''), 10);
};

// Check if viewport matches a breakpoint
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Create event listener
    const listener = (e) => setMatches(e.matches);
    
    // Use modern addEventListener instead of deprecated addListener
    media.addEventListener('change', listener);
    
    // Clean up with removeEventListener
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Hook to check if viewport is mobile
const useIsMobile = () => {
  return useMediaQuery(`(max-width: ${breakpoints.md})`);
};

// Hook to check if viewport is tablet
const useIsTablet = () => {
  return useMediaQuery(
    `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.lg})`
  );
};

// Hook to check if viewport is desktop
const useIsDesktop = () => {
  return useMediaQuery(`(min-width: ${breakpoints.lg})`);
};

// Get current breakpoint
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < breakpointToNumber(breakpoints.sm)) {
        setBreakpoint('xs');
      } else if (width < breakpointToNumber(breakpoints.md)) {
        setBreakpoint('sm');
      } else if (width < breakpointToNumber(breakpoints.lg)) {
        setBreakpoint('md');
      } else if (width < breakpointToNumber(breakpoints.xl)) {
        setBreakpoint('lg');
      } else if (width < breakpointToNumber(breakpoints['2xl'])) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };
    
    // Initial check
    updateBreakpoint();
    
    // Add event listener
    window.addEventListener('resize', updateBreakpoint);
    
    // Clean up
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};

// Get responsive value based on breakpoint
const useResponsiveValue = (values) => {
  const breakpoint = useBreakpoint();
  return values[breakpoint] || values.default || '';
};

export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useBreakpoint,
  useResponsiveValue,
};
