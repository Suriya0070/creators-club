import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Layers, Package, MessageCircle, Monitor } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

// Counts 0 → value with ease-out-cubic when element enters viewport
function AnimatedNumber({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (t) => {
            const p = Math.min((t - t0) / 1200, 1)
            setCount(Math.round((1 - (1 - p) ** 3) * value))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

const CARDS = [
  {
    id: 'storytelling',
    icon: BookOpen,
    stat: 3, suffix: '×',
    statLabel: 'avg. watch time increase',
    title: 'Storytelling-First',
    desc: "We don't ship edited footage. We engineer stories. Every cut, beat, and caption is designed to do one job: keep your audience watching until the end.",
    wide: true,   // col-span-2
    theme: 'yellow',
  },
  {
    id: 'motion',
    icon: Layers,
    stat: 100, suffix: '%',
    statLabel: 'in-house production',
    title: 'Motion Design In-House',
    desc: 'Animation, kinetic text, 2.5D visuals — all built by the same hands that edited your video. No third parties. No gaps.',
    theme: 'white',
  },
  {
    id: 'handoffs',
    icon: Package,
    stat: 0, suffix: '',
    statLabel: 'coordination handoffs',
    title: 'One Team. Zero Handoffs.',
    desc: 'You brief once, we deliver everything. No chasing vendors. No version confusion.',
    theme: 'dark',
  },
  {
    id: 'transparency',
    icon: MessageCircle,
    stat: 24, suffix: 'h',
    statLabel: 'max response time',
    title: 'Radical Transparency',
    desc: 'Shared dashboards, timestamped feedback, and one contact who actually responds.',
    theme: 'white',
  },
  {
    id: 'algorithm',
    icon: Monitor,
    stat: 6, suffix: '',
    statLabel: 'platforms we optimise for',
    title: 'Built for the Algorithm',
    desc: 'YouTube, Instagram, TikTok, LinkedIn — each format graded and captioned natively, not repurposed.',
    theme: 'white',
  },
]

// Per-theme colour tokens
const T = {
  yellow: {
    bg: '#FFD166',
    border: 'transparent',
    numColor: '#1C1A2E',
    labelColor: 'rgba(28,26,46,0.5)',
    titleColor: '#1C1A2E',
    descColor: 'rgba(28,26,46,0.6)',
    iconBg: 'rgba(28,26,46,0.1)',
    iconColor: '#1C1A2E',
    divider: 'rgba(28,26,46,0.12)',
  },
  dark: {
    bg: '#1C1A2E',
    border: 'transparent',
    numColor: '#F5A623',
    labelColor: 'rgba(250,244,232,0.4)',
    titleColor: '#FAF4E8',
    descColor: 'rgba(250,244,232,0.5)',
    iconBg: 'rgba(245,166,35,0.15)',
    iconColor: '#F5A623',
    divider: 'rgba(250,244,232,0.1)',
  },
  white: {
    bg: '#FFFFFF',
    border: 'rgba(28,26,46,0.07)',
    numColor: '#1C1A2E',
    labelColor: '#9896A8',
    titleColor: '#1C1A2E',
    descColor: '#6B6880',
    iconBg: '#FAF4E8',
    iconColor: '#1C1A2E',
    divider: 'rgba(28,26,46,0.08)',
  },
}

function BentoCard({ card, index }) {
  const th = T[card.theme]
  const Icon = card.icon
  const isYellow = card.theme === 'yellow'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className={card.wide ? 'lg:col-span-2' : ''}
      style={{
        background: th.bg,
        border: `1px solid ${th.border}`,
        borderRadius: 24,
        padding: isYellow ? '2.5rem' : '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        boxShadow: card.theme === 'white' ? '0 2px 20px rgba(28,26,46,0.06)' : 'none',
        // Subtle dot pattern on yellow card
        ...(isYellow && {
          backgroundImage: `radial-gradient(circle, rgba(28,26,46,0.1) 1px, transparent 1px), linear-gradient(${th.bg}, ${th.bg})`,
          backgroundSize: '22px 22px, 100% 100%',
        }),
        cursor: 'default',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40, height: 40,
          borderRadius: 12,
          background: th.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
          flexShrink: 0,
        }}
      >
        <Icon style={{ width: 18, height: 18, color: th.iconColor }} />
      </div>

      {/* Stat */}
      <div style={{ marginBottom: 6, lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: isYellow ? 'clamp(4rem, 7vw, 5.5rem)' : 'clamp(3rem, 5vw, 4rem)',
            color: th.numColor,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          <AnimatedNumber value={card.stat} suffix={card.suffix} />
        </span>
      </div>

      {/* Stat label */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.78rem',
          color: th.labelColor,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: 28,
        }}
      >
        {card.statLabel}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: th.divider, marginBottom: 20 }} />

      {/* Title + desc */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '0.95rem',
          color: th.titleColor,
          marginBottom: 8,
        }}
      >
        {card.title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.875rem',
          color: th.descColor,
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {card.desc}
      </p>
    </motion.div>
  )
}

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-[#FAF4E8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">Why Visuals Infinite</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-xl">
            We're not an editing service.<br />We're your creative partner.
          </h2>
        </AnimatedSection>

        {/* Bento grid — 1 col → 2 col (sm) → 3 col (lg) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CARDS.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Founder */}
        <AnimatedSection delay={0.3} className="mt-16 grid sm:grid-cols-[auto_1fr] gap-8 items-start">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 text-3xl font-bold shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FFD166, #F5A623)',
              color: '#1C1A2E',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            P
          </div>
          <div>
            <p className="text-[#9896A8] text-xs uppercase tracking-widest mb-1">Founder & Creative Director</p>
            <h3 className="section-heading text-3xl text-[#1C1A2E] mb-4">Pravin</h3>
            <p className="text-[#6B6880] text-sm leading-relaxed max-w-2xl">
              Years ago, I realised something: the gap between a forgettable video and a remarkable one isn't budget. It's intention.
              Most editors copy what they're given. I wanted to build something that understood the creator's goal before touching the timeline.
              Every project at Visuals Infinite still comes through me. Not because we're small — because I don't believe in quality I'm not personally responsible for.
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
