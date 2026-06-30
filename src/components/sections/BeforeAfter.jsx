import { useState, useRef, useCallback } from 'react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'

const EXAMPLES = [
  {
    label: 'Raw Interview → Polished Edit',
    before: { title: 'Raw Footage', points: ['Flat, ungraded colour', 'Background noise audible', 'No captions or graphics', 'Inconsistent pacing'], img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=70' },
    after: { title: 'PRMinds Edit', points: ['Cinematic colour grade', 'Clean, mastered audio', 'Animated captions & lower thirds', 'Hook-optimised pacing'], img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80' },
  },
  {
    label: 'Basic Cut → Motion Graphics',
    before: { title: 'Basic Cut', points: ['Static title cards', 'No transitions', 'Plain text overlays', 'Monotone delivery unbroken'], img: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=70' },
    after: { title: 'PRMinds Motion Design', points: ['2.5D parallax visuals', 'Kinetic typography', 'Animated infographics', 'Dynamic transitions'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  },
]

function CompareCard({ example }) {
  const [slider, setSlider] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setSlider(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  return (
    <div>
      <p className="text-[#9896A8] text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{example.label}</p>
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none cursor-ew-resize rounded-2xl"
        style={{ background: '#1C1A2E', aspectRatio: '16/9' }}
        onMouseMove={(e) => dragging.current && updateSlider(e.clientX)}
        onMouseDown={(e) => { dragging.current = true; updateSlider(e.clientX) }}
        onMouseUp={() => { dragging.current = false }}
        onMouseLeave={() => { dragging.current = false }}
        onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
      >
        <img src={example.after.img} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-3 right-3 bg-[#F5A623] px-2.5 py-1 rounded-full text-xs font-bold text-[#1C1A2E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>After</div>

        <div className="absolute inset-0 overflow-hidden" style={{ width: `${slider}%` }}>
          <img src={example.before.img} alt="Before" className="absolute inset-0 w-full h-full object-cover grayscale" style={{ width: `${100 / (slider / 100)}%`, maxWidth: 'none' }} />
          <div className="absolute bottom-3 left-3 bg-black/60 px-2.5 py-1 rounded-full text-xs font-medium text-white/80">Before</div>
        </div>

        {/* Slider handle */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${slider}%` }}>
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
          <p className="badge-cyan mb-5">The Transformation</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-xl">
            See the Difference Editing Makes
          </h2>
          <p className="text-[#6B6880] mt-4 max-w-md text-sm leading-relaxed">Drag the slider to compare raw footage with a PRMinds edit.</p>
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
