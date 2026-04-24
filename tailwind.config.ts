import type { Config } from 'tailwindcss'

// Figma token-derived Tailwind theme extension
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // typography/family/body + heading → Inter
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Brand: Polynesian Blue (primary)
        brand: {
          DEFAULT: '#004990',   // polynesianBlue/800
          50: '#EFF7FF',
          100: '#DEEDFF',
          200: '#B6DCFF',
          300: '#76C1FF',
          400: '#2DA3FF',
          500: '#0287F5',
          600: '#0069D2',
          700: '#0054AA',
          800: '#004990',
          900: '#073B73',
          950: '#04254D',
        },
        // Brand accent: Picton Blue (secondary)
        accent: {
          DEFAULT: '#1BA8DF',   // pictonBlue/500
          50: '#F1F9FE',
          100: '#E2F3FC',
          200: '#BEE7F9',
          300: '#84D3F5',
          400: '#43BEED',
          500: '#1BA8DF',
          600: '#0D85BC',
          700: '#0C6A98',
          800: '#0E5A7E',
          900: '#124B68',
        },
        // Semantic surface tokens (Light mode)
        surface: {
          primary: '#FFFFFF',        // neutral/white
          secondary: '#F9FAFB',      // neutral/50
          tertiary: '#F3F4F6',       // neutral/100
          brand: '#004990',          // polynesianBlue/800
          inverse: '#111827',        // neutral/900
          'warning-subtle': '#FEFCE8', // yellow/50
          'error-subtle': '#FEF2F2', // red/50
          'success-subtle': '#F0FDF4', // green/50
          'info-subtle': '#EFF6FF',  // blue/50
        },
        // Semantic text tokens
        fg: {
          primary: '#111827',   // neutral/900
          secondary: '#4B5563', // neutral/600
          tertiary: '#9CA3AF',  // neutral/400
          brand: '#004990',     // polynesianBlue/800
          'on-brand': '#FFFFFF',
          inverse: '#FFFFFF',
          disabled: '#9CA3AF',
          warning: '#A16207',   // yellow/700
          error: '#DC2626',     // red/600
          success: '#15803D',   // green/700
          info: '#1D4ED8',      // blue/700
        },
        // Semantic border tokens
        edge: {
          primary: '#D1D5DB',   // neutral/300
          secondary: '#E5E7EB', // neutral/200
          brand: '#004990',
          warning: '#EAB308',   // yellow/500
          error: '#EF4444',     // red/500
          success: '#16A34A',   // green/600
          info: '#3B82F6',      // blue/500
        },
        // Status surface fills
        status: {
          'warning-bg': '#FEFCE8',   // yellow/50
          'warning-border': '#EAB308', // yellow/500
          'warning-text': '#A16207', // yellow/700
          'error-bg': '#FEF2F2',
          'error-border': '#EF4444',
          'error-text': '#DC2626',
          'success-bg': '#F0FDF4',
          'success-border': '#16A34A',
          'success-text': '#15803D',
          'info-bg': '#EFF6FF',
          'info-border': '#3B82F6',
          'info-text': '#1D4ED8',
        },
      },
      borderRadius: {
        // Figma: border/radius/* tokens
        'token-sm': '4px',      // border/radius/sm
        'token-md': '6px',      // border/radius/md
        'token-default': '8px', // border/radius/default
        'token-lg': '12px',     // border/radius/lg
        'token-xl': '16px',     // border/radius/xl
      },
      boxShadow: {
        // Figma: shadow/xs — subtle depth for flat cards
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        // Figma: shadow/sm — scrolled navbar, divider elevation
        'sm-token': '0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)',
      },
      fontSize: {
        // Figma: typography/size/*
        'label-xs': ['11px', { lineHeight: '1.25' }],
        'label-sm': ['12px', { lineHeight: '1.25' }],
        'body-sm': ['12px', { lineHeight: '1.5' }],
        'body-base': ['14px', { lineHeight: '1.5' }],
        'body-md': ['16px', { lineHeight: '1.5' }],
        'heading-xs': ['16px', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-sm': ['18px', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-md': ['20px', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-lg': ['24px', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-xl': ['30px', { lineHeight: '1.25', fontWeight: '700' }],
        'display-sm': ['36px', { lineHeight: '1.25', fontWeight: '700' }],
        'display-lg': ['48px', { lineHeight: '1.25', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
}

export default config
