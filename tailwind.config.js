/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Space Theme Colors
        space: {
          black: '#0A0A0F',
          darker: '#12121F',
          dark: '#1A1A2E',
          DEFAULT: '#2A2A4E',
          light: '#3A3A6E',
          accent: {
            cyan: {
              light: '#06B6D4',  // Bright cyan
              DEFAULT: '#0891B2', // Medium cyan
              dark: '#0E7490',   // Dark cyan
              glow: 'rgba(6, 182, 212, 0.5)' // Glow effect
            },
            purple: {
              light: '#A78BFA',  // Bright purple
              DEFAULT: '#7C3AED', // Medium purple
              dark: '#5B21B6',   // Dark purple
              glow: 'rgba(167, 139, 250, 0.5)' // Glow effect
            },
            blue: {
              light: '#60A5FA',  // Bright blue
              DEFAULT: '#3B82F6', // Medium blue
              dark: '#1D4ED8',   // Dark blue
              glow: 'rgba(96, 165, 250, 0.5)' // Glow effect
            }
          }
        },
        // Interface Elements
        interface: {
          border: {
            DEFAULT: 'rgba(6, 182, 212, 0.3)',
            hover: 'rgba(6, 182, 212, 0.5)'
          },
          text: {
            primary: '#06B6D4',   // Bright cyan
            secondary: '#0891B2', // Medium cyan
            muted: 'rgba(6, 182, 212, 0.7)'
          },
          button: {
            primary: '#06B6D4',
            hover: '#0891B2',
            active: '#0E7490'
          }
        }
      },
      boxShadow: {
        'glow': '0 0 10px rgba(6, 182, 212, 0.15)',
        'glow-hover': '0 0 15px rgba(6, 182, 212, 0.2)',
        'glow-lg': '0 0 20px rgba(6, 182, 212, 0.25)',
        'button': '0 0 10px rgba(6, 182, 212, 0.1)',
        'button-hover': '0 0 15px rgba(6, 182, 212, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scan-lines': 'scan-lines 8s linear infinite'
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            'text-shadow': '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
            'box-shadow': '0 0 15px rgba(6, 182, 212, 0.4)'
          },
          '50%': {
            'text-shadow': '0 0 20px rgba(6, 182, 212, 0.7), 0 0 30px rgba(6, 182, 212, 0.5)',
            'box-shadow': '0 0 25px rgba(6, 182, 212, 0.6)'
          }
        },
        'scan-lines': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '0 100%' }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(6, 182, 212, 0.7)',
            h1: {
              color: '#06B6D4',
            },
            h2: {
              color: '#06B6D4',
            },
            h3: {
              color: '#06B6D4',
            },
            h4: {
              color: '#06B6D4',
            },
            strong: {
              color: '#06B6D4',
            },
            a: {
              color: '#06B6D4',
              '&:hover': {
                color: '#0891B2',
              },
            },
            code: {
              color: '#06B6D4',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              padding: '0.25rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
