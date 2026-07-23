import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const COL1 = [
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80',
  'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=300&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&q=80',
  'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=300&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&q=80',
  'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=300&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80',
  'https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=300&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80',
  'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=300&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80',
]
const COL2 = [
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&q=80',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=80',
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&q=80',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80',
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&q=80',
  'https://images.unsplash.com/photo-1552581234-26160f608093?w=300&q=80',
  'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=300&q=80',
  'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=300&q=80',
  'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=300&q=80',
]
const COL3 = [
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&q=80',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&q=80',
  'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=300&q=80',
  'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=300&q=80',
  'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80',
  'https://images.unsplash.com/photo-1615458318132-c3c6e8c0ce4a?w=300&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=300&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&q=80',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=300&q=80',
]

const COLS = [
  { images: COL1, direction: 'up',   duration: 45 },
  { images: COL2, direction: 'down', duration: 55 },
  { images: COL3, direction: 'up',   duration: 38 },
]

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

function ScrollRow({ images, duration, direction = 'left' }) {
  const doubled = [...images, ...images]
  return (
    <div style={{ overflow: 'hidden', flex: 1 }}>
      <div style={{
        display: 'flex', gap: '8px', height: '100%',
        animation: `scroll-${direction} ${duration}s linear infinite`,
        willChange: 'transform',
      }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ height: '100%', aspectRatio: '1/1', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
            <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ScrollColumn({ images, direction, duration }) {
  const doubled = [...images, ...images]
  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '10px',
        animation: `scroll-${direction} ${duration}s linear infinite`,
        willChange: 'transform',
      }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ width: '100%', aspectRatio: '1/1', borderRadius: '14px', overflow: 'hidden', flexShrink: 0 }}>
            <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero-section">

      {/* ── Left column ── */}
      <motion.div
        className="hero-left"
        style={{ position: 'relative', overflow: 'hidden' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Warm background bloom */}
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-20%',
          width: '95%', height: '75%',
          background: 'radial-gradient(ellipse at 35% 60%, rgba(255,210,55,0.22) 0%, rgba(255,195,45,0.09) 45%, transparent 72%)',
          filter: 'blur(38px)', pointerEvents: 'none', zIndex: 0,
        }} />

        <p className="badge-cyan" style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
          Premium Video Editing Agency
        </p>

        <h1 style={{
          position: 'relative', zIndex: 1,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3.4rem)',
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: '#1C1A2E',
          marginBottom: '18px',
        }}>
          The Edit Is Where<br />
          Creators Become<br />
          <span style={{ color: '#F5A623' }}>Brands.</span>
        </h1>

        <p style={{
          position: 'relative', zIndex: 1,
          color: '#6B6880', fontSize: '0.88rem', lineHeight: 1.65,
          maxWidth: '390px', fontFamily: "'DM Sans', sans-serif",
          marginBottom: '28px',
        }}>
          Most creators post videos. We help you build audiences. Premium editing, motion design, and storytelling for the people who are serious about growing — not just posting.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', position: 'relative', zIndex: 1 }}>
          <button onClick={() => scrollTo('work')} className="btn-primary">
            See the Results <ArrowUpRight style={{ width: 16, height: 16 }} />
          </button>
          <button onClick={() => scrollTo('contact')} className="btn-outline">
            Talk to Us — It's Free
          </button>
        </div>
      </motion.div>

      {/* ── Right column — 3-column scrolling image grid ── */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.25 }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 85% 75% at 52% 48%, rgba(255,210,55,0.16) 0%, rgba(255,195,45,0.06) 52%, transparent 74%)',
          pointerEvents: 'none', zIndex: 9,
        }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 10, background: 'linear-gradient(to right, #FAF4E8 30%, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, zIndex: 10, background: 'linear-gradient(to bottom, #FAF4E8, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 10, background: 'linear-gradient(to top, #FAF4E8, transparent)', pointerEvents: 'none' }} />

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', height: '100%' }}>
            <ScrollRow images={COL1} duration={30} direction="left" />
            <ScrollRow images={COL2} duration={42} direction="right" />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', padding: '10px 10px 10px 16px', height: '100%' }}>
            {COLS.map((col, i) => <ScrollColumn key={i} {...col} />)}
          </div>
        )}
      </motion.div>

    </section>
  )
}
