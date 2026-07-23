import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

export default function Showreel() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="showreel" className="py-24 bg-[#FAF4E8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-10">
          <p className="badge-cyan mb-5">Selected Work</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E]">
            Watch Our Editing Showreel
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div
            className="relative overflow-hidden cursor-pointer rounded-3xl group"
            style={{ background: '#1C1A2E', aspectRatio: '16/9' }}
            onClick={() => !playing && setPlaying(true)}
          >
            {!playing ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1400&q=80"
                  alt="Visuals Infinite Showreel"
                  className="w-full h-full object-cover opacity-50 transition-opacity duration-500 group-hover:opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-20 h-20 rounded-full bg-[#F5A623] flex items-center justify-center shadow-2xl"
                  >
                    <Play className="w-8 h-8 text-[#1C1A2E] fill-current ml-1" />
                  </motion.div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Visuals Infinite — Showreel 2025</p>
                  <p className="text-white/45 text-xs mt-0.5">Reels · YouTube · Documentary · Motion Graphics</p>
                </div>
                <div className="absolute bottom-6 right-6">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-sm">0:57</span>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                  title="Visuals Infinite Showreel"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setPlaying(false) }}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="mt-10 pt-10 border-t border-[rgba(28,26,46,0.1)] grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: '40+', label: 'Videos Delivered' },
              { value: '15+', label: 'Motion Projects' },
              { value: '5+', label: 'Countries Served' },
              { value: '3–5d', label: 'Avg. Turnaround' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#1C1A2E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
                <div className="text-[#9896A8] text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
