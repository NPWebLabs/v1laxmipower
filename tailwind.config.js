/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)', surface: 'rgb(var(--surface) / <alpha-value>)', fg: 'rgb(var(--fg) / <alpha-value>)', muted: 'rgb(var(--muted) / <alpha-value>)', line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)', 'ink-2': 'rgb(var(--ink-2) / <alpha-value>)', gold: 'rgb(var(--gold) / <alpha-value>)', 'gold-text': 'rgb(var(--gold-text) / <alpha-value>)', 'on-ink': 'rgb(var(--on-ink) / <alpha-value>)', 'on-ink-muted': 'rgb(var(--on-ink-muted) / <alpha-value>)', danger: 'rgb(var(--danger) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        deva: ['"Tiro Devanagari Marathi"', '"Noto Sans Devanagari"', 'serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(calc(-100% - var(--gap)))' } },
        'shimmer-slide': { to: { transform: 'translate(calc(100cqw - 100%), 0)' } },
        'spin-around': { '0%': { transform: 'translateZ(0) rotate(0)' }, '15%, 35%': { transform: 'translateZ(0) rotate(90deg)' }, '65%, 85%': { transform: 'translateZ(0) rotate(270deg)' }, '100%': { transform: 'translateZ(0) rotate(360deg)' } },
        shiny: { '0%, 90%, 100%': { 'background-position': 'calc(-100% - var(--shiny-width)) 0' }, '30%, 60%': { 'background-position': 'calc(100% + var(--shiny-width)) 0' } },
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
        shiny: 'shiny 8s infinite',
      },
    },
  },
  plugins: [],
}
