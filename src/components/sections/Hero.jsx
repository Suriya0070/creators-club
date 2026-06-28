import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, ArrowRight, Star, Users, Award } from 'lucide-react'

const WORDS = ['Reels', 'YouTube', 'Commercials', 'Weddings', 'Travel Films']

function AnimatedWords() {
  const words = [...WORDS, ...WORDS]
  return (
    <span className="inline-flex overflow-hidden h-[1.2em] align-bottom relative">
      <motion.span
        className="flex flex-col"
        animate={{ y: ['0%', `-${(100 / words.length) * WORDS.length}%`] }}
        transition={{ duration: WORDS.length * 2, ease: 'linear', repeat: Infinity }}
      >
        {words.map((w, i) => (
          <span key={i} className="text-gradient block leading-[1.2]">{w}</span>
        ))}
      </motion.span>
    </span>
  )
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 2,
}))

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep teal-cyan background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #061C28 0%, #041830 40%, #051220 70%, #04121C 100%)' }} />
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.7 }} />

      {/* Large visible cyan blobs — MUCH more opaque now */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full animate-blob"
        style={{ background: 'rgba(138, 255, 255, 0.18)', filter: 'blur(100px)' }}
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full animate-blob animation-delay-2000"
        style={{ background: 'rgba(0, 180, 230, 0.15)', filter: 'blur(110px)' }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full animate-blob animation-delay-4000"
        style={{ background: 'rgba(138, 255, 255, 0.12)', filter: 'blur(90px)' }}
      />
      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(138,255,255,0.08) 0%, transparent 70%)' }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: '#8AFFFF', opacity: 0.4 }}
          animate={{ y: [-10, 10, -10], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="noise-overlay" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 badge-cyan mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          India's #1 Video Editing Academy — 1,500+ Students
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="section-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-6"
        >
          Become a{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">Professional</span>
          <br />
          Video Editor.
        </motion.h1>

        {/* Animated subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-3 font-body"
        >
          Master{' '}
          <span className="text-white font-medium">
            <AnimatedWords />
          </span>{' '}
          from Industry Experts.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-white/40 text-base mb-10"
        >
          Courses from ₹2,999 · Certificate of Completion · Lifetime Access
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link to="/courses" className="btn-primary text-base px-8 py-4" style={{ boxShadow: '0 0 50px rgba(138,255,255,0.45)' }}>
            Explore Courses <ArrowRight className="w-5 h-5" />
          </Link>
          <motion.a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base px-8 py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-4 h-4 fill-current" /> Watch Demo Reel
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80','https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&q=80','https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80'].map((src, i) => (
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 object-cover" style={{ borderColor: '#04121C' }} />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />)}
                <span className="text-white font-semibold text-sm ml-1">4.9</span>
              </div>
              <p className="text-white/40 text-xs">1,500+ happy students</p>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Award className="w-4 h-4 text-cyan-400" />
            Industry-recognized certificate
          </div>

          <div className="h-8 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Users className="w-4 h-4 text-cyan-400" />
            92% placement rate
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-cyan-400 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
