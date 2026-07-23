import { useEffect, useRef } from 'react'
import { Quote } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

const TESTIMONIALS = [
  { name: 'Aditya Sharma', role: 'YouTuber', company: '280K Subscribers', avatar: 'AS', quote: 'I used to send rough cuts and get rough cuts back. Visuals Infinite sends back something I\'m proud to post. Watch time went up 40% in the first month. I didn\'t change a thing except who was editing.', result: '+40% watch time' },
  { name: 'Priya Nair', role: 'Founder', company: 'GrowthStack (SaaS)', avatar: 'PN', quote: 'Ten days, a seed round on the line, and a 2.5D animated explainer that made our product actually make sense. Visuals Infinite didn\'t just hit the deadline — they made something I was proud to show.', result: 'Seed round closed' },
  { name: 'Mohammed Al-Rashid', role: 'Documentary Producer', company: 'Al Nour Media', avatar: 'MA', quote: 'The Shell Nigeria project had to look like a broadcast documentary. Visuals Infinite took complete ownership — structure, grade, sound design — and delivered without a single missed brief. That\'s rare.', result: '280K organic views' },
  { name: 'Sneha Kulkarni', role: 'Fitness Creator', company: '@snehalifts · 45K Followers', avatar: 'SK', quote: 'I was spending my weekends editing. Now I spend them filming. Visuals Infinite knows my style well enough that I barely write a brief anymore. Deadlines are a non-event.', result: '18K → 45K followers' },
  { name: 'Rajan Mehta', role: 'Marketing Lead', company: 'Elevate Digital Agency', avatar: 'RM', quote: 'We\'ve routed all client video work through Visuals Infinite for over a year. When you find a team that\'s reliable, consistent, and won\'t embarrass you in front of your clients — you don\'t let go.', result: '8 clients served together' },
  { name: 'Divya Krishnan', role: 'EdTech Founder', company: 'SkillDoor', avatar: 'DK', quote: 'Our course content looked homemade. After Visuals Infinite, students started commenting on how professional it felt. 1,200 enrolments followed. Production quality is not a vanity metric.', result: '1,200 enrolments' },
]

const GAP        = 20
const BASE_DRIFT = 0.35  // px/frame ambient drift
const FRICTION   = 0.90  // velocity decay per frame
const DRAG_SPD   = 1.4   // cursor-px → velocity multiplier
const SCROLL_SPD = 0.5   // scroll-px → velocity multiplier
const BG         = '#FAF4E8'

function TestimonialCard({ t }) {
  return (
    <div
      className="bg-white rounded-3xl p-7 flex flex-col shrink-0 border border-[rgba(28,26,46,0.06)]"
      style={{ width: 380, minHeight: 290, boxShadow: '0 4px 24px rgba(28,26,46,0.07)' }}
    >
      <Quote className="w-6 h-6 text-[#F5A623] mb-4 shrink-0" />
      <p className="text-[#6B6880] text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
      <span
        className="self-start px-3 py-1.5 rounded-full text-xs font-bold mb-5 shrink-0"
        style={{ background: '#FFD166', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {t.result}
      </span>
      <div className="flex items-center gap-3 pt-5 border-t border-[rgba(28,26,46,0.08)] shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#1C1A2E] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">{t.avatar}</span>
        </div>
        <div>
          <p className="text-[#1C1A2E] text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</p>
          <p className="text-[#9896A8] text-xs">{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  )
}

// Each row duplicated: [A,B,C,A,B,C] for seamless infinite loop.
// Shared offset in [0, trackWidth):
//   Row 1  translateX = offset - T  → moves RIGHT as offset grows
//   Row 2  translateX = -offset     → moves LEFT  as offset grows
//
// Drag sign:
//   Row 1 drag right (dx > 0) → offset++ → sign = +1
//   Row 2 drag right (dx > 0) → Row 2 goes right → offset-- → sign = -1
//
// Dragging opposite to default direction imparts negative velocity.
// Friction decays it; BASE_DRIFT eventually wins → rows spring back.
const ROW1 = [...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(0, 3)]
const ROW2 = [...TESTIMONIALS.slice(3),    ...TESTIMONIALS.slice(3)]

export default function AgencyTestimonials() {
  const row1Ref  = useRef(null)   // inner flex div — transform + scrollWidth
  const row2Ref  = useRef(null)
  const wrap1Ref = useRef(null)   // outer overflow div — events + cursor
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
        s.trackWidth = (row1Ref.current.scrollWidth + GAP) / 2
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(calcTrack))
    window.addEventListener('resize', calcTrack)

    const onScroll = () => {
      const y = window.scrollY
      s.velocity    = (y - s.lastScrollY) * SCROLL_SPD
      s.lastScrollY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Named drag handlers — required so removeEventListener matches
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
      s.velocity  = dx * (s.dragRow === 1 ? 1 : -1) * DRAG_SPD
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
      s.velocity  = dx * (s.dragRow === 1 ? 1 : -1) * DRAG_SPD
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
      s.velocity *= FRICTION
      s.offset   += s.velocity + BASE_DRIFT

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

  return (
    <section className="py-24 bg-[#FAF4E8]" style={{ overflow: 'hidden' }}>

      {/* Heading */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">From Our Clients</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-2xl">
            Don't take our word for it.
          </h2>
        </AnimatedSection>
      </div>

      {/* Rows + edge fades */}
      <div style={{ position: 'relative' }}>

        {/* Row 1 — default direction RIGHT */}
        <div
          ref={wrap1Ref}
          className="overflow-hidden"
          style={{ marginBottom: GAP, cursor: 'grab', userSelect: 'none' }}
        >
          <div
            ref={row1Ref}
            style={{ display: 'flex', gap: GAP, width: 'max-content', willChange: 'transform' }}
          >
            {ROW1.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — default direction LEFT */}
        <div
          ref={wrap2Ref}
          className="overflow-hidden"
          style={{ cursor: 'grab', userSelect: 'none' }}
        >
          <div
            ref={row2Ref}
            style={{ display: 'flex', gap: GAP, width: 'max-content', willChange: 'transform' }}
          >
            {ROW2.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>

        {/* Left edge fade */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 160,
            background: `linear-gradient(to right, ${BG} 10%, transparent 100%)`,
            pointerEvents: 'none', zIndex: 10,
          }}
        />

        {/* Right edge fade */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 160,
            background: `linear-gradient(to left, ${BG} 10%, transparent 100%)`,
            pointerEvents: 'none', zIndex: 10,
          }}
        />

      </div>
    </section>
  )
}
