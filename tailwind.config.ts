import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/blocks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kept for the existing CMS-driven pages (about/contact/etc.).
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Brand accents from the Figma home page.
        brand: {
          ink: '#0A0A0A',          // headings / nav
          lime: '#A3E635',         // "connected."
          purple: '#7C3AED',       // "AI"
          pink: '#EC4899',         // "explore?"
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mountain-fade':
          'linear-gradient(180deg, #F3F4F6 0%, #E5E7EB 60%, #D1D5DB 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
