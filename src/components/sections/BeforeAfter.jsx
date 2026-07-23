import { useState, useRef, useCallback, useEffect } from 'react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'

const EXAMPLES = [
  {
    label: 'Storytelling Concept',
    before: {
      title: 'Straight From Camera',
      points: ['Colour that fights the mood', 'Audio that pulls focus away', 'Viewers who scroll past in silence', 'Attention that drifts before the message lands'],
      video: '/videos/storytelling-concept-non-edit.mp4',
    },
    after: {
      title: 'Visuals Infinite Edit',
      points: ['Colour that sets the emotional tone', 'Sound that holds the listener in', 'Viewers who follow every word', 'Attention that stays all the way through'],
      video: '/videos/storytelling-concept.mp4',
    },
  },
  {
    label: "Editor's Reality",
    before: {
      title: 'Straight From Camera',
      points: ['Title cards that kill momentum', 'Silence where music should live', 'Text that interrupts instead of guides', 'Energy that flatlines mid-video'],
      video: '/videos/editing-reality-non-edit.mp4',
    },
    after: {
      title: 'Visuals Infinite Edit',
      points: ['Colour that builds the narrative', 'Transitions that feel inevitable', 'Typography that adds energy', 'Audio mix that makes every word land'],
      video: '/videos/editors-reality.mp4',
    },
  },
]

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function UnmuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function CompareCard({ example }) {
  const [slider, setSlider] = useState(50)
  const [muted, setMuted] = useState(true)
  const containerRef = useRef(null)
  const beforeRef = useRef(null)
  const afterRef = useRef(null)
  const dragging = useRef(false)

  const toggleMute = (e) => {
    e.stopPropagation()
    const next = !muted
    setMuted(next)
    if (afterRef.current) afterRef.current.muted = next
    // before video stays muted always
  }

  // Play videos only when card is in viewport
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          afterRef.current?.load()
          afterRef.current?.play().catch(() => {})
        } else {
          afterRef.current?.pause()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(container)
    return () => obs.disconnect()
  }, [])

  // Sync before/after video playback
  useEffect(() => {
    const before = beforeRef.current
    const after = afterRef.current
    if (!before || !after) return

    const syncAfter = () => {
      if (Math.abs(after.currentTime - before.currentTime) > 0.3) {
        after.currentTime = before.currentTime
      }
    }

    before.addEventListener('timeupdate', syncAfter)
    return () => before.removeEventListener('timeupdate', syncAfter)
  }, [])

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setSlider(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  // safe clip width — avoid division by zero at edges
  const clipWidth = slider > 0 ? `${100 / (slider / 100)}%` : '100%'

  return (
    <div>
      <p className="text-[#9896A8] text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {example.label}
      </p>

      <div
        ref={containerRef}
        className="relative overflow-hidden select-none cursor-ew-resize rounded-2xl"
        style={{ background: '#1C1A2E', aspectRatio: '16/9' }}
        onMouseMove={(e) => dragging.current && updateSlider(e.clientX)}
        onMouseDown={(e) => { dragging.current = true; updateSlider(e.clientX) }}
        onMouseUp={() => { dragging.current = false }}
        onMouseLeave={() => { dragging.current = false }}
        onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
        onTouchStart={(e) => updateSlider(e.touches[0].clientX)}
      >
        {/* After video — full width, base layer */}
        <video
          ref={afterRef}
          src={example.after.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-[#F5A623] px-2.5 py-1 rounded-full text-xs font-bold text-[#1C1A2E] z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          After
        </div>

        {/* Before video — clipped to slider% */}
        {slider > 0 && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${slider}%` }}>
            <video
              ref={beforeRef}
              src={example.before.video}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full object-cover"
              style={{ width: clipWidth, maxWidth: 'none' }}
            />
            <div className="absolute bottom-3 left-3 bg-black/60 px-2.5 py-1 rounded-full text-xs font-medium text-white/80 z-10">
              Before
            </div>
          </div>
        )}

        {/* Sound toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </button>

        {/* Slider handle */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none" style={{ left: `${slider}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center gap-0.5 shadow-xl">
            <div className="w-0.5 h-4 bg-[#1C1A2E] rounded-full" />
            <div className="w-0.5 h-4 bg-[#1C1A2E] rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {['before', 'after'].map((side) => (
          <div
            key={side}
            className="p-4 rounded-xl"
            style={{
              background: side === 'after' ? '#1C1A2E' : 'rgba(28,26,46,0.05)',
              border: side === 'after' ? '1.5px solid #F5A623' : '1.5px solid rgba(28,26,46,0.1)',
            }}
          >
            <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: side === 'after' ? '#F5A623' : '#9896A8', fontFamily: "'Space Grotesk', sans-serif" }}>
              {example[side].title}
            </p>
            <ul className="space-y-1">
              {example[side].points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-xs" style={{ color: side === 'after' ? 'rgba(250,244,232,0.7)' : '#6B6880' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: side === 'after' ? '#F5A623' : '#9896A8' }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  return (
    <section className="py-24 bg-[#FAF4E8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">Before & After</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-xl">
            This Is What We Mean by Transformation.
          </h2>
          <p className="text-[#6B6880] mt-4 max-w-md text-sm leading-relaxed">Drag the slider. The footage is the same. The story is completely different.</p>
        </AnimatedSection>

        <AnimatedGroup className="grid sm:grid-cols-2 gap-10">
          {EXAMPLES.map((ex) => (
            <AnimatedItem key={ex.label}>
              <CompareCard example={ex} />
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
