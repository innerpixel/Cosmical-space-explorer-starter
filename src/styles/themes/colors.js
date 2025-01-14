export const colors = {
  primary: {
    main: '#2563EB', // Blue
    light: '#60A5FA',
    dark: '#1E40AF',
  },
  secondary: {
    main: '#10B981', // Green
    light: '#34D399',
    dark: '#059669',
  },
  accent: {
    main: '#8B5CF6', // Purple
    light: '#A78BFA',
    dark: '#6D28D9',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  background: {
    light: '#FFFFFF',
    dark: '#111827',
  },
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export default {
  colors,
  spacing,
  breakpoints,
};
