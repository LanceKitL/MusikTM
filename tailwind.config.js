import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#3b82f6',
          'primary-content': '#ffffff',
          secondary: '#8b5cf6',
          'secondary-content': '#ffffff',
          accent: '#06b6d4',
          'accent-content': '#ffffff',
          neutral: '#1e293b',
          'neutral-content': '#f1f5f9',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
          'base-content': '#f8fafc',
          info: '#3b82f6',
          success: '#22c55e',
          warning: '#eab308',
          error: '#ef4444'
        }
      }
    ]
  }
} satisfies Config;
