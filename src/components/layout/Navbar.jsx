import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Check } from 'lucide-react'

const NAV_LINKS = [
  { id: 'results',  label: 'Results',   href: '/#work' },
  { id: 'packages', label: 'Packages',  href: '/#services' },
  { id: 'process',  label: 'Process',   href: '/#process' },
  { id: 'story',    label: 'Our Story', href: '/#about' },
  { id: 'start',    label: 'Start',     href: '/#contact' },
]

const WORK_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=480&q=80', label: 'Automotive Brand', cat: 'Short-Form' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=480&q=80', label: 'Marketing Agency', cat: 'Motion Graphics' },
  { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=480&q=80', label: 'Documentary Channel', cat: 'Documentary' },
  { src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=480&q=80', label: 'YouTube Creator', cat: 'Storytelling' },
  { src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=480&q=80', label: 'Motion Design Studio', cat: 'AI+Story' },
  { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=480&q=80', label: 'Personal Brand', cat: 'Sound Design' },
]

const REEL_PACKAGES = [
  {
    name: 'Basic Reel Edit',
    price: '₹499',
    per: '/reel',
    duration: 'Up to 45 seconds',
    delivery: '1–2 days',
    features: ['Basic cuts & pacing', 'Captions included', 'Music sync', 'Platform-ready export'],
    tag: null,
    video: '/videos/Reel1.mp4',
  },
  {
    name: 'Creator Reel Edit',
    price: '₹1,499',
    per: '/reel',
    duration: 'Up to 60 seconds',
    delivery: '2–3 days',
    features: ['Clean cuts + B-roll', 'Better captions', 'SFX & music', 'Hook-first structure', '2 revisions'],
    tag: 'Most Popular',
    video: '/videos/Reel2.mp4',
  },
  {
    name: 'Premium Motion Reel',
    price: '₹1,999',
    per: '/reel',
    duration: 'Up to 75 seconds',
    delivery: '3–4 days',
    features: ['Hook improvement', 'Motion graphics', 'Sound design', 'Brand typography', 'Unlimited revisions'],
    tag: null,
    video: '/videos/Reel3.mp4',
  },
]

const YOUTUBE_PACKAGES = [
  { name: 'Clean YouTube Edit', price: '₹2,000', duration: 'Up to 6 min', delivery: '3–4 days', features: ['Basic cuts + zoom', 'Title text', 'Chapter markers'] },
  { name: 'Creator YouTube Edit', price: '₹5,000', duration: 'Up to 8 min', delivery: '4–5 days', features: ['B-roll + captions', 'Motion graphics', 'Music & SFX'] },
  { name: 'Story Motion Edit', price: '₹8,000', duration: 'Up to 10 min', delivery: '5–7 days', features: ['Story-based editing', 'Typography animation', 'Full sound design'] },
]

const PROCESS_STEPS = [
  { n: '01', title: 'We Listen First', desc: 'A 30-min call to understand your goals, audience, and the story you want to tell.' },
  { n: '02', title: 'You Hand It Over', desc: 'Share footage, references, and your brand kit. We take it from there.' },
  { n: '03', title: 'We Build the Story', desc: 'We edit from scratch using a narrative framework — not just cuts.' },
  { n: '04', title: 'Feedback → Execute', desc: 'Two rounds of revisions included. We move fast and communicate clearly.' },
  { n: '05', title: 'Ready to Publish', desc: 'Platform-optimised files delivered. Ready for YouTube, Reels, TikTok.' },
]

function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#F5A623" />
      <rect x="9"  y="13" width="18" height="2.5" rx="1.25" fill="#1C1A2E" />
      <rect x="9"  y="17" width="13" height="2.5" rx="1.25" fill="#1C1A2E" />
      <rect x="9"  y="21" width="16" height="2.5" rx="1.25" fill="#1C1A2E" />
    </svg>
  )
}

// ── Shared styles ──────────────────────────────────────────────────────────
const cat    = { fontSize: '0.55rem', fontWeight: 700, color: '#F5A623', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: "'Space Grotesk', sans-serif" }
const cream  = (op = 1) => `rgba(250,244,232,${op})`
const divide = { width: '100%', height: 1, background: 'rgba(250,244,232,0.08)', margin: '20px 0' }

// ── RESULTS mega panel ─────────────────────────────────────────────────────
function ResultsPanel({ onNav }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 260px', gap: 0, minHeight: '72vh' }}>

      {/* Left — stats sidebar */}
      <div style={{ borderRight: '1px solid rgba(250,244,232,0.07)', padding: '48px 40px 48px 0' }}>
        <p style={cat}>Our Work</p>
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 'clamp(3.5rem,5.5vw,5rem)', fontWeight: 900, color: cream(), fontFamily: "'Space Grotesk',sans-serif", lineHeight: 0.9 }}>40+</div>
          <div style={{ fontSize: '0.95rem', color: cream(0.45), fontFamily: "'DM Sans',sans-serif", marginTop: 10, marginBottom: 36 }}>Stories Crafted</div>
        </div>
        {[{ v: '15+', l: 'Brands Elevated' }, { v: '5+', l: 'Countries Reached' }, { v: '3+', l: 'Years of Craft' }].map(s => (
          <div key={s.l} style={{ marginBottom: 22 }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F5A623', fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: '0.72rem', color: cream(0.4), fontFamily: "'DM Sans',sans-serif", marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
        <div style={divide} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Short-Form', 'Documentary', 'Motion', 'AI+Story', 'Sound'].map(t => (
            <span key={t} style={{ padding: '3px 9px', borderRadius: 20, background: 'rgba(245,166,35,0.12)', fontSize: '0.6rem', fontWeight: 600, color: '#F5A623', fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Center — image gallery */}
      <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ ...cat, marginBottom: 4 }}>Featured Work</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, flex: 1 }}>
          {WORK_IMAGES.map((img, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', aspectRatio: '16/10' }}
              onMouseEnter={e => e.currentTarget.querySelector('.overlay').style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.querySelector('.overlay').style.opacity = '0'}
            >
              <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.75)' }} />
              <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(28,26,46,0.7)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px 14px' }}>
                <div style={{ fontSize: '0.6rem', color: '#F5A623', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{img.cat}</div>
                <div style={{ fontSize: '0.78rem', color: cream(), fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>{img.label}</div>
              </div>
              <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                <div style={{ fontSize: '0.6rem', color: cream(0.7), fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, background: 'rgba(28,26,46,0.6)', padding: '2px 7px', borderRadius: 8 }}>{img.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — CTA */}
      <div style={{ borderLeft: '1px solid rgba(250,244,232,0.07)', padding: '48px 0 48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={cat}>Who we edit for</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['YouTube Creators', 'Documentary Channels', 'Online Educators', 'Personal Brands', 'Marketing Agencies', 'Start-ups'].map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F5A623', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: cream(0.6), fontFamily: "'DM Sans',sans-serif" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => onNav('/#work')}
          style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '0.82rem', padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
        >
          See All Work <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ── PACKAGES mega panel ────────────────────────────────────────────────────
function PackagesPanel({ onNav }) {
  const videoRefs = useRef([])

  useEffect(() => {
    // Give the DOM time to paint before playing
    const timer = setTimeout(() => {
      videoRefs.current.forEach(v => {
        if (v) v.play().catch(() => {})
      })
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ padding: '40px 0 48px' }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <p style={cat}>Pricing</p>
          <h2 style={{ fontSize: 'clamp(1.3rem,2vw,1.75rem)', fontWeight: 800, color: cream(), fontFamily: "'Space Grotesk',sans-serif", marginTop: 6, lineHeight: 1.15 }}>
            Pick the Edit That Fits<br />Your Ambition.
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNav('/#services')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '0.78rem', padding: '10px 18px', borderRadius: 9, border: 'none', cursor: 'pointer' }}>
            All Packages <ArrowUpRight size={14} />
          </button>
          <button onClick={() => onNav('/#contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent', color: cream(0.55), fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.78rem', padding: '10px 18px', borderRadius: 9, border: '1px solid rgba(250,244,232,0.12)', cursor: 'pointer' }}>
            Custom Quote
          </button>
        </div>
      </div>

      {/* 3 video reel cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {REEL_PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            onClick={() => onNav('/#services')}
            style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: pkg.tag ? '1.5px solid rgba(245,166,35,0.5)' : '1px solid rgba(250,244,232,0.07)', background: '#0a0a0f' }}
          >
            {pkg.tag && (
              <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, background: '#F5A623', color: '#1C1A2E', fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 20, fontFamily: "'Space Grotesk',sans-serif" }}>
                {pkg.tag}
              </div>
            )}

            {/* Auto-playing video */}
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
              <video
                ref={el => { videoRefs.current[REEL_PACKAGES.indexOf(pkg)] = el }}
                src={pkg.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* gradient bottom overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.2) 55%, transparent 100%)' }} />
              {/* price badge bottom-left */}
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFD166', fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1 }}>{pkg.price}</span>
                  <span style={{ fontSize: '0.7rem', color: cream(0.5), fontFamily: "'DM Sans',sans-serif" }}>{pkg.per}</span>
                </span>
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: '16px 18px 18px' }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: '0.62rem', color: cream(0.35), fontFamily: "'DM Sans',sans-serif", marginBottom: 4 }}>{pkg.duration} · {pkg.delivery} delivery</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: cream(), fontFamily: "'Space Grotesk',sans-serif" }}>{pkg.name}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {pkg.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Check size={11} style={{ color: '#F5A623', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.7rem', color: cream(0.5), fontFamily: "'DM Sans',sans-serif" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* YouTube packages — compact strip */}
      <div style={{ borderTop: '1px solid rgba(250,244,232,0.07)', paddingTop: 18 }}>
        <p style={{ ...cat, marginBottom: 12 }}>YouTube Packages</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {YOUTUBE_PACKAGES.map((pkg) => (
            <div key={pkg.name} onClick={() => onNav('/#services')} style={{ background: 'rgba(250,244,232,0.04)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(250,244,232,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: cream(0.7), fontFamily: "'Space Grotesk',sans-serif" }}>{pkg.name}</div>
                <div style={{ fontSize: '0.58rem', color: cream(0.3), fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{pkg.duration} · {pkg.delivery}</div>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFD166', fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0 }}>{pkg.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── PROCESS mega panel ─────────────────────────────────────────────────────
function ProcessPanel({ onNav }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ padding: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
        <div>
          <p style={cat}>How It Works</p>
          <h2 style={{ fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 800, color: cream(), fontFamily: "'Space Grotesk',sans-serif", marginTop: 8 }}>From Footage to Finished.</h2>
        </div>
        <div style={{ fontSize: '0.75rem', color: cream(0.35), fontFamily: "'DM Sans',sans-serif", textAlign: 'right' }}>
          Typical turnaround<br /><span style={{ color: '#F5A623', fontWeight: 700 }}>3–5 business days</span>
        </div>
      </div>

      {/* 5-step horizontal timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, position: 'relative' }}>
        {/* Connecting line */}
        <div style={{ position: 'absolute', top: 28, left: '10%', right: '10%', height: 1, background: 'linear-gradient(to right, transparent, rgba(245,166,35,0.4) 20%, rgba(245,166,35,0.4) 80%, transparent)', zIndex: 0 }} />

        {PROCESS_STEPS.map((step, i) => (
          <div
            key={i}
            style={{ position: 'relative', zIndex: 1, padding: '0 16px', cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Step number circle */}
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: hovered === i ? '#F5A623' : 'rgba(245,166,35,0.15)', border: `2px solid ${hovered === i ? '#F5A623' : 'rgba(245,166,35,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, transition: 'all 0.2s ease' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: hovered === i ? '#1C1A2E' : '#F5A623', fontFamily: "'Space Grotesk',sans-serif" }}>{step.n}</span>
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: hovered === i ? cream() : cream(0.7), fontFamily: "'Space Grotesk',sans-serif", marginBottom: 10, lineHeight: 1.25, transition: 'color 0.2s' }}>{step.title}</h3>
            <p style={{ fontSize: '0.75rem', color: cream(0.4), fontFamily: "'DM Sans',sans-serif", lineHeight: 1.65 }}>{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom banner */}
      <div style={{ marginTop: 48, padding: '20px 28px', background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 40 }}>
          {[['3–5 days', 'Standard Turnaround'], ['Rush', 'Available on request'], ['2 rounds', 'Revisions included'], ['6 platforms', 'Optimised output']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#F5A623', fontFamily: "'Space Grotesk',sans-serif" }}>{v}</div>
              <div style={{ fontSize: '0.62rem', color: cream(0.35), fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={() => onNav('/#contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '0.82rem', padding: '12px 22px', borderRadius: 10, border: 'none', cursor: 'pointer', flexShrink: 0 }}>
          Start Your Project <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ── OUR STORY mega panel ───────────────────────────────────────────────────
function StoryPanel({ onNav }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 0, minHeight: '70vh', padding: '48px 0' }}>

      {/* Left — quote */}
      <div style={{ paddingRight: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={cat}>Why PRMinds</p>
          <blockquote style={{ margin: '28px 0 0', borderLeft: '3px solid #F5A623', paddingLeft: 24 }}>
            <p style={{ fontSize: 'clamp(1.2rem,2vw,1.6rem)', fontWeight: 700, color: cream(0.85), fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.4, fontStyle: 'italic' }}>
              "The gap between a forgettable video and a remarkable one isn't budget. It's <span style={{ color: '#F5A623' }}>intention</span>."
            </p>
            <footer style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F5A623', fontFamily: "'Space Grotesk',sans-serif" }}>P</span>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: cream(0.7), fontFamily: "'Space Grotesk',sans-serif" }}>Pravin</div>
                <div style={{ fontSize: '0.62rem', color: cream(0.35), fontFamily: "'DM Sans',sans-serif" }}>Founder & Creative Director</div>
              </div>
            </footer>
          </blockquote>
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: cream(0.4), fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7, marginBottom: 24 }}>
            Every project is personally reviewed by Pravin. We're not a factory — we're a focused studio that treats every edit as if it's our own channel on the line.
          </p>
          <button onClick={() => onNav('/#about')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#F5A623', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '0.82rem', padding: '10px 0', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(245,166,35,0.4)' }}>
            Our full story <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ background: 'rgba(250,244,232,0.07)' }} />

      {/* Right — stats */}
      <div style={{ paddingLeft: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={cat}>By The Numbers</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 28, flex: 1 }}>
          {[
            { v: '3×', l: 'Average watch time increase', icon: '📈' },
            { v: '100%', l: 'In-house production', icon: '🏠' },
            { v: '0', l: 'Coordination handoffs', icon: '🎯' },
            { v: '24h', l: 'Max response time', icon: '⚡' },
            { v: '6', l: 'Platforms we optimise for', icon: '📱' },
            { v: '3+', l: 'Years of focused craft', icon: '✨' },
          ].map(s => (
            <div key={s.l} style={{ padding: '20px 0', borderBottom: '1px solid rgba(250,244,232,0.06)' }}>
              <div style={{ fontSize: 'clamp(1.6rem,2.5vw,2rem)', fontWeight: 900, color: '#FFD166', fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: '0.68rem', color: cream(0.38), fontFamily: "'DM Sans',sans-serif", marginTop: 5, lineHeight: 1.4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Storytelling-First', 'Motion In-House', 'Zero Handoffs', 'Built for Algorithm'].map(t => (
            <span key={t} style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(250,244,232,0.06)', fontSize: '0.62rem', fontWeight: 600, color: cream(0.5), fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── START mega panel ───────────────────────────────────────────────────────
function StartPanel({ onNav }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 0, minHeight: '70vh', padding: '48px 0' }}>

      {/* Left — headline + CTA */}
      <div style={{ paddingRight: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={cat}>Get Started</p>
          <h2 style={{ fontSize: 'clamp(2.4rem,4vw,3.6rem)', fontWeight: 900, color: cream(), fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.02, marginTop: 16 }}>
            Let's Make<br />
            Something<br />
            <span style={{ color: '#F5A623' }}>Worth Watching.</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: cream(0.45), fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7, marginTop: 20, maxWidth: 340 }}>
            A free 30-minute call with Pravin. No contract, no pressure — just an honest conversation about your content and what it could become.
          </p>
        </div>
        <div>
          <button
            onClick={() => onNav('/#contact')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: '0.92rem', padding: '16px 28px', borderRadius: 12, border: 'none', cursor: 'pointer', letterSpacing: '0.02em', marginBottom: 16 }}
          >
            Book a Free Call <ArrowUpRight size={17} />
          </button>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['No Contract', 'Free 30 Min', 'Zero Obligation'].map(t => (
              <span key={t} style={{ padding: '4px 11px', borderRadius: 20, background: 'rgba(245,166,35,0.12)', fontSize: '0.62rem', fontWeight: 700, color: '#F5A623', fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Center — what to expect */}
      <div style={{ borderLeft: '1px solid rgba(250,244,232,0.07)', paddingLeft: 48, paddingRight: 32 }}>
        <p style={cat}>What to Expect</p>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            ['Understand your goals', 'We ask about your channel, audience, and what growth looks like to you.'],
            ['Audit your content', 'We review what you\'ve published and identify gaps and opportunities.'],
            ['Show our approach', 'We walk you through exactly how we\'d approach your next video.'],
            ['Zero pressure', 'You decide afterwards. No hard sell. No follow-up spam.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <Check size={10} style={{ color: '#F5A623' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: cream(0.7), fontFamily: "'Space Grotesk',sans-serif", marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: '0.7rem', color: cream(0.35), fontFamily: "'DM Sans',sans-serif", lineHeight: 1.55 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — contact options */}
      <div style={{ borderLeft: '1px solid rgba(250,244,232,0.07)', paddingLeft: 48 }}>
        <p style={cat}>Reach Us</p>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: '💬', label: 'WhatsApp', sub: 'Quickest response' },
            { icon: '📧', label: 'Email', sub: 'suriyasittharth4@gmail.com' },
            { icon: '📅', label: 'Book a Slot', sub: 'Pick a time that suits you' },
          ].map(c => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'rgba(250,244,232,0.04)', borderRadius: 10, border: '1px solid rgba(250,244,232,0.06)', cursor: 'pointer' }}>
              <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: cream(0.75), fontFamily: "'Space Grotesk',sans-serif" }}>{c.label}</div>
                <div style={{ fontSize: '0.62rem', color: cream(0.3), fontFamily: "'DM Sans',sans-serif" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...divide, marginTop: 28 }} />
        <p style={{ fontSize: '0.7rem', color: cream(0.25), fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>
          Or scroll down to fill the contact form below — we read every message personally.
        </p>
      </div>
    </div>
  )
}

// ── Mega menu content switcher ─────────────────────────────────────────────
function MegaMenuContent({ id, onNav }) {
  if (id === 'results')  return <ResultsPanel onNav={onNav} />
  if (id === 'packages') return <PackagesPanel onNav={onNav} />
  if (id === 'process')  return <ProcessPanel onNav={onNav} />
  if (id === 'story')    return <StoryPanel onNav={onNav} />
  if (id === 'start')    return <StartPanel onNav={onNav} />
  return null
}

// ── Navbar ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeNav, setActiveNav] = useState(null)
  const closeTimer = useRef(null)
  const location  = useLocation()
  const navigate  = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false); setActiveNav(null) }, [location.pathname])

  const openMenu = (id) => { clearTimeout(closeTimer.current); setActiveNav(id) }
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setActiveNav(null), 120) }
  const cancelClose = () => clearTimeout(closeTimer.current)

  const handleNav = (href) => {
    setMobileOpen(false)
    setActiveNav(null)
    if (!href.startsWith('/#')) return
    const id = href.slice(2)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navH = scrolled ? 60 : 76

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onMouseLeave={scheduleClose}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
          background: activeNav ? '#1C1A2E' : (scrolled ? 'rgba(250,244,232,0.92)' : 'transparent'),
          backdropFilter: scrolled && !activeNav ? 'blur(16px)' : 'none',
          borderBottom: activeNav ? 'none' : (scrolled ? '1px solid rgba(28,26,46,0.08)' : '1px solid transparent'),
          transition: 'all 0.3s ease',
          padding: scrolled ? '14px 0' : '22px 0',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" onClick={() => setActiveNav(null)} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <LogoMark />
            <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: '1rem', color: activeNav ? '#FAF4E8' : '#1C1A2E', letterSpacing: '0.04em', transition: 'color 0.3s' }}>
              PRMINDS
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 2 }}>
            {NAV_LINKS.map(({ id, label, href }) => (
              <button
                key={href}
                onMouseEnter={() => openMenu(id)}
                onClick={() => handleNav(href)}
                style={{
                  padding: '8px 18px',
                  background: activeNav === id ? 'rgba(245,166,35,0.12)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: activeNav === id ? 700 : 500,
                  fontSize: '0.88rem',
                  color: activeNav ? (activeNav === id ? '#F5A623' : 'rgba(250,244,232,0.45)') : (activeNav === id ? '#1C1A2E' : 'rgba(28,26,46,0.65)'),
                  borderRadius: 8,
                  transition: 'all 0.15s ease',
                  letterSpacing: activeNav === id ? '0.01em' : 0,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            className="hidden md:flex"
            onClick={() => handleNav('/#contact')}
            style={{
              background: activeNav ? '#F5A623' : '#1C1A2E',
              color: activeNav ? '#1C1A2E' : '#FAF4E8',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em',
              padding: '10px 22px', borderRadius: 9999, border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.color = '#1C1A2E' }}
            onMouseLeave={e => { e.currentTarget.style.background = activeNav ? '#F5A623' : '#1C1A2E'; e.currentTarget.style.color = activeNav ? '#1C1A2E' : '#FAF4E8' }}
          >
            START A PROJECT <ArrowUpRight style={{ width: 14, height: 14 }} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeNav ? '#FAF4E8' : '#1C1A2E', padding: 6 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Full-width curtain mega menu ── */}
      <AnimatePresence>
        {activeNav && (
          <motion.div
            key={activeNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{
              position: 'fixed',
              top: navH,
              left: 0, right: 0,
              background: '#1C1A2E',
              zIndex: 55,
              overflow: 'hidden',
              borderBottom: '1px solid rgba(245,166,35,0.15)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
                <MegaMenuContent id={activeNav} onNav={handleNav} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 40, background: '#FAF4E8', borderBottom: '1px solid rgba(28,26,46,0.1)', padding: '16px 24px 24px' }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button key={href} onClick={() => handleNav(href)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '13px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: '1rem', color: '#1C1A2E', borderBottom: '1px solid rgba(28,26,46,0.07)' }}>
                {label}
              </button>
            ))}
            <button onClick={() => handleNav('/#contact')} className="btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
              START A PROJECT <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
