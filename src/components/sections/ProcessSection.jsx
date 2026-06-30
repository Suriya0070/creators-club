import { motion } from 'framer-motion'
import { MessageSquare, FileCheck, Clapperboard, RotateCcw, Send, ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

const STEPS = [
  { icon: MessageSquare, step: '01', title: 'Discovery', desc: 'A 30-minute call to understand your brand, audience, goals and the kind of content you want to produce.' },
  { icon: FileCheck, step: '02', title: 'Onboarding', desc: 'Share footage, reference links, brand kit and script. We confirm timelines, scope and deliverables in writing.' },
  { icon: Clapperboard, step: '03', title: 'Production', desc: 'We edit the first cut — pacing, colour, audio, graphics and captions — applying our storytelling framework.' },
  { icon: RotateCcw, step: '04', title: 'Review', desc: 'Watch and leave timestamped feedback via a shared link. Two revision rounds included at no extra charge.' },
  { icon: Send, step: '05', title: 'Delivery', desc: 'Final files exported in platform-optimised formats (MP4/MOV). Source files and archives available on request.' },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[#1C1A2E]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

          {/* Left — heading + CTA */}
          <AnimatedSection className="lg:sticky lg:top-32">
            <p className="badge-cyan mb-5" style={{ color: '#F5A623' }}>How It Works</p>
            <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.0]">
              Our 5-Step Process
            </h2>
            <p className="text-white/45 mt-6 max-w-xs text-sm leading-relaxed">
              Clear, predictable and fully async — so you can focus on creating while we handle editing.
            </p>
            <div className="mt-10 space-y-4">
              <div>
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Typical turnaround: 3–5 business days</p>
                <p className="text-white/35 text-xs mt-1">Rush delivery available for time-sensitive projects.</p>
              </div>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5A623] text-[#1C1A2E] text-sm font-bold hover:bg-[#E09010] transition-all duration-200 mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Start Your Project <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </AnimatedSection>

          {/* Right — vertical dashed timeline */}
          <AnimatedSection delay={0.15}>
            <div className="relative">
              {/* Dashed vertical line */}
              <div
                className="absolute left-[22px] top-3 bottom-3 w-px"
                style={{
                  background: 'repeating-linear-gradient(to bottom, rgba(245,166,35,0.4) 0px, rgba(245,166,35,0.4) 6px, transparent 6px, transparent 12px)',
                }}
              />

              <div className="space-y-0">
                {STEPS.map(({ icon: Icon, step, title, desc }, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative flex gap-6 pb-10 last:pb-0"
                  >
                    {/* Circle icon */}
                    <div className="relative shrink-0 z-10">
                      <div className="w-11 h-11 rounded-full bg-[#2D2B45] border-2 border-[#F5A623] flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-[#F5A623]" style={{ width: 18, height: 18 }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1 pb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#F5A623] text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Step {step}
                        </span>
                      </div>
                      <h3 className="section-heading text-xl text-white mb-2">{title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-sm">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
