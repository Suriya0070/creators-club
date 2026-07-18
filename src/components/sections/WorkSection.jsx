import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, BookOpen, Briefcase, Building2, Mic, Film } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

// ── Who We Work With data ──────────────────────────────────────
const CLIENTS = [
  { icon: PlayCircle, label: 'YouTube Creators',     desc: 'Long-form content that holds attention from the first second to the last — and brings viewers back.' },
  { icon: Film,       label: 'Documentary Channels', desc: 'Narrative-driven productions that feel cinematic, not like something a laptop made.' },
  { icon: BookOpen,   label: 'Online Educators',     desc: 'Course content that looks as premium as the knowledge inside it.' },
  { icon: Mic,        label: 'Personal Brands',      desc: 'Reels and talking-heads that make people follow you — not just watch once and scroll on.' },
  { icon: Briefcase,  label: 'Marketing Agencies',   desc: 'Ad creatives and brand films that convert, not just impress the client in a deck.' },
  { icon: Building2,  label: 'Start-ups',            desc: 'Pitches and product demos that make investors lean in and actually remember you.' },
]

// ── Featured Work data ─────────────────────────────────────────
const FILTERS = ['All', 'Short-Form', 'Documentary', 'Sound Design', 'AI+StoryTelling', 'StoryTelling+Animation', 'Motion-Graphics']
// Order matters for CSS grid auto-placement — do not rearrange
const PROJECTS = [
  // Row 1 col 1-2 (16:9 horizontal)
  {
    title: 'Super Car Feature',
    client: 'Automotive Brand',
    type: 'Sound Design',
    desc: 'Built to feel like a film trailer. Designed to stop a scroll.',
    video: '/videos/super-car.mp4',
    wide: true,
  },
  // Row 1-2 col 3 (9:16 vertical tall)
  {
    title: 'Animation Showreel',
    client: 'Motion Design Studio',
    type: 'StoryTelling+Animation',
    desc: 'Motion that doesn\'t just move — it pulls you in.',
    video: '/videos/editors-reality.mp4',
    large: true,
  },
  // Row 2 col 1 (normal)
  {
    title: 'Business Brand Reel',
    client: 'Marketing Agency',
    type: 'Short-Form',
    desc: 'The kind of reel that makes prospects reach out first.',
    video: '/videos/business-reel.mp4',
  },
  // Row 2 col 2 (normal)
  {
    title: "Editor's Reality",
    client: 'Documentary Channel',
    type: 'Documentary',
    desc: 'Raw cuts turned into a documentary people couldn\'t stop sharing.',
    video: '/videos/animation-edit.mp4',
  },
  // Row 3-4 col 1 (9:16 vertical tall)
  {
    title: 'Students Mentality',
    client: 'Personal Brand',
    type: 'Motion-Graphics',
    desc: 'A story about mindset that felt cinematic — because it was.',
    video: '/videos/students-mentality.mp4',
    large: true,
  },
  // Row 3-4 col 2-3 (16:9 wide + tall featured block)
  {
    title: 'Storytelling Concept',
    client: 'YouTube Creator',
    type: 'AI+StoryTelling',
    desc: 'Proof that the right edit can make any idea feel timeless.',
    video: '/videos/storytelling-concept.mp4',
    wide: true,
    large: true,
  },
]

const DIVIDER = { marginTop: 72, paddingTop: 72, borderTop: '1px solid rgba(28,26,46,0.08)' }

// ── Client marquee constants ───────────────────────────────────
const C_GAP        = 18    // px between cards
const C_CARD_W     = 320   // fixed card width px
const C_BASE_DRIFT = 0.4   // px/frame ambient drift (≈ 24 px/s at 60 fps)
const C_FRICTION   = 0.88  // velocity decay per frame
const C_DRAG_SPD   = 1.4   // cursor-px → velocity multiplier
const C_SCROLL_SPD = 0.35  // scroll-px → velocity multiplier
const C_BG         = '#FAF4E8'

// Duplicate each half: [A,B,C,A,B,C] for seamless infinite loop
const C_ROW1 = [...CLIENTS.slice(0, 3), ...CLIENTS.slice(0, 3)]
const C_ROW2 = [...CLIENTS.slice(3),    ...CLIENTS.slice(3)]

function ClientCard({ icon: Icon, label, desc }) {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-[rgba(28,26,46,0.06)] shrink-0"
      style={{ width: C_CARD_W, boxShadow: '0 2px 16px rgba(28,26,46,0.06)' }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#FFD166' }}>
        <Icon className="w-5 h-5 text-[#1C1A2E]" />
      </div>
      <div>
        <p className="font-bold text-[#1C1A2E] text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</p>
        <p className="text-[#9896A8] text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

// Shared offset drives both rows:
//   Row 1  translateX = offset - T  → moves RIGHT as offset grows
//   Row 2  translateX = -offset     → moves LEFT  as offset grows
//
// Drag sign:
//   Row 1 drag right (dx > 0) → offset++ → sign = +1
//   Row 2 drag right (dx > 0) → row moves right → offset-- → sign = -1
//
// Dragging in the opposite direction makes velocity go negative.
// Friction decays it; BASE_DRIFT eventually wins → rows spring back to default.
function ClientsMarquee() {
  const row1Ref  = useRef(null)  // inner flex div — transform + scrollWidth
  const row2Ref  = useRef(null)
  const wrap1Ref = useRef(null)  // outer overflow div — events + cursor
  const wrap2Ref = useRef(null)

  const stateRef = useRef({
    offset: 0,
    velocity: 0,
    trackWidth: 0,
    lastScrollY: 0,
    isDragging: false,
    dragRow: 0,
    lastDragX: 0,
  })

  useEffect(() => {
    const s = stateRef.current
    s.lastScrollY = window.scrollY
    let raf

    const calcTrack = () => {
      if (row1Ref.current) {
        s.trackWidth = (row1Ref.current.scrollWidth + C_GAP) / 2
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(calcTrack))
    window.addEventListener('resize', calcTrack)

    const onScroll = () => {
      const y = window.scrollY
      s.velocity   = (y - s.lastScrollY) * C_SCROLL_SPD
      s.lastScrollY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Named drag handlers — required for removeEventListener to match
    const onMouseDown1 = (e) => {
      s.isDragging = true
      s.dragRow    = 1
      s.lastDragX  = e.clientX
      if (wrap1Ref.current) wrap1Ref.current.style.cursor = 'grabbing'
      if (wrap2Ref.current) wrap2Ref.current.style.cursor = 'grabbing'
    }
    const onMouseDown2 = (e) => {
      s.isDragging = true
      s.dragRow    = 2
      s.lastDragX  = e.clientX
      if (wrap1Ref.current) wrap1Ref.current.style.cursor = 'grabbing'
      if (wrap2Ref.current) wrap2Ref.current.style.cursor = 'grabbing'
    }
    const onMouseMove = (e) => {
      if (!s.isDragging) return
      const dx    = e.clientX - s.lastDragX
      s.lastDragX = e.clientX
      s.velocity  = dx * (s.dragRow === 1 ? 1 : -1) * C_DRAG_SPD
    }
    const onMouseUp = () => {
      if (!s.isDragging) return
      s.isDragging = false
      if (wrap1Ref.current) wrap1Ref.current.style.cursor = 'grab'
      if (wrap2Ref.current) wrap2Ref.current.style.cursor = 'grab'
    }

    const onTouchStart1 = (e) => {
      s.isDragging = true
      s.dragRow    = 1
      s.lastDragX  = e.touches[0].clientX
    }
    const onTouchStart2 = (e) => {
      s.isDragging = true
      s.dragRow    = 2
      s.lastDragX  = e.touches[0].clientX
    }
    const onTouchMove = (e) => {
      if (!s.isDragging) return
      const dx    = e.touches[0].clientX - s.lastDragX
      s.lastDragX = e.touches[0].clientX
      s.velocity  = dx * (s.dragRow === 1 ? 1 : -1) * C_DRAG_SPD
    }
    const onTouchEnd = () => { s.isDragging = false }

    const w1 = wrap1Ref.current
    const w2 = wrap2Ref.current

    w1?.addEventListener('mousedown',  onMouseDown1)
    w2?.addEventListener('mousedown',  onMouseDown2)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    w1?.addEventListener('touchstart', onTouchStart1, { passive: true })
    w2?.addEventListener('touchstart', onTouchStart2, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend',  onTouchEnd)

    const tick = () => {
      s.velocity *= C_FRICTION
      s.offset   += s.velocity + C_BASE_DRIFT

      const T = s.trackWidth
      if (T > 0) {
        s.offset = ((s.offset % T) + T) % T
        if (row1Ref.current) row1Ref.current.style.transform = `translateX(${s.offset - T}px)`
        if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-s.offset}px)`
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', calcTrack)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend',  onTouchEnd)
      w1?.removeEventListener('mousedown',  onMouseDown1)
      w2?.removeEventListener('mousedown',  onMouseDown2)
      w1?.removeEventListener('touchstart', onTouchStart1)
      w2?.removeEventListener('touchstart', onTouchStart2)
      cancelAnimationFrame(raf)
    }
  }, [])

  const rowStyle = { display: 'flex', gap: C_GAP, width: 'max-content', willChange: 'transform' }

  return (
    <div style={{ position: 'relative' }}>

      {/* Row 1 — default direction RIGHT */}
      <div
        ref={wrap1Ref}
        className="overflow-hidden"
        style={{ marginBottom: C_GAP, cursor: 'grab', userSelect: 'none' }}
      >
        <div ref={row1Ref} style={rowStyle}>
          {C_ROW1.map((c, i) => <ClientCard key={i} icon={c.icon} label={c.label} desc={c.desc} />)}
        </div>
      </div>

      {/* Row 2 — default direction LEFT */}
      <div
        ref={wrap2Ref}
        className="overflow-hidden"
        style={{ cursor: 'grab', userSelect: 'none' }}
      >
        <div ref={row2Ref} style={rowStyle}>
          {C_ROW2.map((c, i) => <ClientCard key={i} icon={c.icon} label={c.label} desc={c.desc} />)}
        </div>
      </div>

      {/* Left edge fade */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 140,
        background: `linear-gradient(to right, ${C_BG} 10%, transparent)`,
        pointerEvents: 'none', zIndex: 10,
      }} />
      {/* Right edge fade */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 140,
        background: `linear-gradient(to left, ${C_BG} 10%, transparent)`,
        pointerEvents: 'none', zIndex: 10,
      }} />

    </div>
  )
}

// ── VideoProjectCard ───────────────────────────────────────────
function VideoProjectCard({ project, index }) {
  const videoRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [muted, setMuted] = useState(true)

  const handleMouseEnter = () => {
    setHovered(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const next = !muted
    setMuted(next)
    if (videoRef.current) videoRef.current.muted = next
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`relative group overflow-hidden rounded-3xl cursor-pointer bg-[#1C1A2E] ${project.large ? 'sm:row-span-2' : ''} ${project.wide ? 'sm:col-span-2' : ''}`}
      style={{
        minHeight: project.wide && project.large ? '770px'
          : project.large ? '770px'
          : project.wide  ? '500px'
          : '250px'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={project.video}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        style={{ opacity: hovered ? 0.9 : 0.65 }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute top-5 left-5">
        <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}>
          {project.type}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 py-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
        <p className="text-white/55 text-xs mb-1">{project.client}</p>
        <h3 className="text-white font-bold text-base leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
        <p
          className="text-white/70 text-xs mt-2 leading-relaxed transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)', maxHeight: hovered ? '60px' : '0', overflow: 'hidden' }}
        >
          {project.desc}
        </p>
      </div>

      {/* Sound toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-5 right-5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </motion.div>
  )
}

// ── WorkSection ────────────────────────────────────────────────
export default function WorkSection() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === active)

  return (
    <section id="work" style={{ background: '#FAF4E8', paddingTop: 80, paddingBottom: 96 }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        {/* ── 1. Who We Work With ──────────────────────────────── */}
        <AnimatedSection className="mb-10">
          <p className="badge-cyan mb-5">Who We Work With</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-lg">
            Built for Creators Who Mean Business.
          </h2>
        </AnimatedSection>

        {/* Negative margin bleeds the marquee to the viewport edges */}
        <div className="-mx-6 sm:-mx-10 mb-2">
          <ClientsMarquee />
        </div>

        {/* ── 2. Featured Work ─────────────────────────────────── */}
        <div style={DIVIDER}>
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="badge-cyan mb-5">Our Work</p>
              <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E]">
                Watch What Happens When Story Meets Craft.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-full border transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background:  active === f ? '#1C1A2E' : 'transparent',
                    color:       active === f ? '#FAF4E8' : '#9896A8',
                    borderColor: active === f ? '#1C1A2E' : 'rgba(28,26,46,0.2)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => (
                <VideoProjectCard key={project.title} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
