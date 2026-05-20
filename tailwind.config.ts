import type { Config } from 'tailwindcss'

/**
 * clicsHQ design tokens, extracted from the Figma source of truth.
 * Everything app-facing should reference these — no ad-hoc colours.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/blocks/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // ─── App surface palette ──────────────────────────────────────────
        background: '#FFFFFF',
        foreground: '#0A0A0A',

        // Sidebar / dark surfaces (matches Figma left rail)
        sidebar: {
          DEFAULT: '#1A1A1A',
          hover:   '#262626',
          active:  '#2E2E2E',
          border:  '#2A2A2A',
          foreground: '#FFFFFF',
          muted:   '#A1A1AA',
        },

        // Neutral / gray scale
        ink:     '#0A0A0A',    // primary text + buttons
        muted:   '#6B7280',    // secondary text
        subtle:  '#9CA3AF',    // tertiary text / placeholders
        border:  '#E5E7EB',
        surface: {
          DEFAULT: '#FFFFFF',
          alt:     '#F9FAFB',
          hover:   '#F3F4F6',
          ring:    '#E5E7EB',
        },

        // ─── Status palette (badges, pills, banners) ─────────────────────
        success: { soft: '#D1FAE5', bg: '#ECFDF5', fg: '#059669', strong: '#047857' },
        warning: { soft: '#FEF3C7', bg: '#FFFBEB', fg: '#D97706', strong: '#B45309' },
        danger:  { soft: '#FEE2E2', bg: '#FEF2F2', fg: '#DC2626', strong: '#B91C1C' },
        info:    { soft: '#DBEAFE', bg: '#EFF6FF', fg: '#2563EB', strong: '#1D4ED8' },

        // ─── Kanban column accents (soft pastel cards) ────────────────────
        kanban: {
          todo:       '#F3F4F6',
          progress:   '#EDE9FE',
          progressFg: '#7C3AED',
          review:     '#FEF3C7',
          reviewFg:   '#B45309',
          done:       '#D1FAE5',
          doneFg:     '#047857',
        },

        // ─── AI accent (used in clics AI surfaces) ────────────────────────
        ai: {
          50:  '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
        },

        // Kept (existing CMS-driven marketing pages still reference these).
        primary: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
        },
        brand: {
          ink:    '#0A0A0A',
          lime:   '#A3E635',
          purple: '#7C3AED',
          pink:   '#EC4899',
        },
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Tight, app-grade typographic scale
        '2xs': ['11px', { lineHeight: '14px' }],
        xs:   ['12px', { lineHeight: '16px' }],
        sm:   ['13px', { lineHeight: '18px' }],
        base: ['14px', { lineHeight: '20px' }],
        md:   ['15px', { lineHeight: '22px' }],
        lg:   ['16px', { lineHeight: '24px' }],
        xl:   ['18px', { lineHeight: '26px' }],
        '2xl':['20px', { lineHeight: '28px' }],
        '3xl':['24px', { lineHeight: '32px' }],
        '4xl':['30px', { lineHeight: '36px' }],
        '5xl':['36px', { lineHeight: '40px' }],
        '6xl':['48px', { lineHeight: '52px' }],
        '7xl':['60px', { lineHeight: '64px' }],
      },

      borderRadius: {
        none: '0',
        sm:  '4px',
        DEFAULT: '6px',
        md:  '8px',
        lg:  '10px',
        xl:  '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },

      boxShadow: {
        xs:  '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        sm:  '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.04)',
        md:  '0 4px 8px -2px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        lg:  '0 10px 24px -4px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.04)',
        xl:  '0 20px 40px -8px rgb(0 0 0 / 0.12), 0 8px 16px -4px rgb(0 0 0 / 0.06)',
        '2xl': '0 32px 64px -16px rgb(0 0 0 / 0.18)',
        // Card shadow used on white app surfaces (Figma standard)
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)',
      },

      backgroundImage: {
        'ai-glow':       'radial-gradient(60% 60% at 50% 0%, rgba(168,85,247,0.18), transparent 70%)',
        'mountain-fade': 'linear-gradient(180deg, #F3F4F6 0%, #E5E7EB 60%, #D1D5DB 100%)',
      },

      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in':        { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-up':        { '0%': { opacity: '0', transform: 'translateY(6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-in':        'fade-in 0.2s ease-out',
        'fade-up':        'fade-up 0.25s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}

export default config
