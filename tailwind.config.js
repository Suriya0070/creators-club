/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#00D9FF',
          500: '#00AEEF',
          600: '#0090CC',
        },
        navy: {
          900: '#071C2F',
          800: '#0D2845',
          700: '#123460',
        },
        dark: {
          900: '#070B14',
          800: '#0F172A',
          700: '#111827',
          600: '#1E293B',
          500: '#334155',
        },
        glass: 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        heading: ['"Poppins"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'cyan-gradient': 'linear-gradient(135deg, #00D9FF 0%, #00AEEF 50%, #0090CC 100%)',
        'dark-gradient': 'linear-gradient(180deg, #071C2F 0%, #0F172A 50%, #111827 100%)',
        'glow-cyan': 'radial-gradient(ellipse at center, rgba(0,217,255,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(0,217,255,0.3)',
        'cyan-glow-lg': '0 0 60px rgba(0,217,255,0.2)',
        glass: '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
