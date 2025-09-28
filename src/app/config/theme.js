// Color Palette
export const colors = {
  // Primary Colors
  primary: '#0466c8',
  primaryDark: '#0353a4',
  primaryDarker: '#023e7d',
  primaryDarkest: '#002855',
  
  // Background Colors
  background: '#001233',
  backgroundLight: '#001845',
  
  // Text Colors
  textPrimary: '#ffffff',
  textSecondary: '#979dac',
  textTertiary: '#7d8597',
  
  // Accent Colors
  accent: '#0466c8',
  success: '#2ecc71',
  warning: '#f39c12',
  error: '#e74c3c',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #0466c8 0%, #0353a4 100%)',
  gradientDark: 'linear-gradient(135deg, #001233 0%, #000814 100%)',
};

// Typography
export const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMono: '"Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  
  // Font Weights
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  
  // Font Sizes
  fontSizeXs: '0.75rem',    // 12px
  fontSizeSm: '0.875rem',   // 14px
  fontSizeBase: '1rem',     // 16px
  fontSizeLg: '1.125rem',   // 18px
  fontSizeXl: '1.25rem',    // 20px
  fontSize2xl: '1.5rem',    // 24px
  fontSize3xl: '1.875rem',  // 30px
  fontSize4xl: '2.25rem',   // 36px
  fontSize5xl: '3rem',      // 48px
  fontSize6xl: '4rem',      // 64px
};

// Spacing
export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
};

// Breakpoints
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px
  DEFAULT: '0.25rem',  // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

// Box Shadow
export const boxShadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  glow: '0 0 15px rgba(4, 102, 200, 0.5)',
};

// Transitions
export const transitions = {
  duration: {
    fastest: '100ms',
    faster: '150ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// Z-Index
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Export theme object
export const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  borderRadius,
  boxShadow,
  transitions,
  zIndex,
};

export default theme;
