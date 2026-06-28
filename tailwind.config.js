/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#FF2222',
          500: '#CC0000',
          600: '#990000',
        },
        navy: {
          900: '#0C0003',
          800: '#1A0005',
          700: '#2D0008',
        },
        dark: {
          900: '#070003',
          800: '#0F0005',
          700: '#180008',
          600: '#2A000A',
          500: '#400010',
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
        'cyan-gradient': 'linear-gradient(135deg, #FF2222 0%, #CC0000 50%, #990000 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0C0003 0%, #0F0005 50%, #180008 100%)',
        'glow-cyan': 'radial-gradient(ellipse at center, rgba(255,34,34,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(255,34,34,0.3)',
        'cyan-glow-lg': '0 0 60px rgba(255,34,34,0.2)',
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
