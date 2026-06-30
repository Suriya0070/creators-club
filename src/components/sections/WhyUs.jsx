import { motion } from 'framer-motion'
import { BookOpen, Layers, Package, MessageCircle, Monitor } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'

const REASONS = [
  { icon: BookOpen, title: 'Storytelling-First', desc: 'We don\'t just cut clips — we build narrative arcs. Every edit is structured around hooks, retention loops and emotional beats that keep audiences watching.' },
  { icon: Layers, title: 'In-House Motion Design', desc: 'Most editing teams outsource animation. We produce motion graphics, 2.5D parallax sequences and kinetic typography in-house — faster and more coherently.' },
  { icon: Package, title: 'Complete Post-Production', desc: 'Editing, colour grading, sound design, captions and thumbnails in one place. No handoffs, no miscommunication, no chasing multiple vendors.' },
  { icon: MessageCircle, title: 'Consistent Communication', desc: 'You get a dedicated point of contact, shared project dashboards and timestamped feedback loops — never wondering where your video stands.' },
  { icon: Monitor, title: 'Platform-Specific Delivery', desc: 'Different platforms need different edits. We deliver in the right format, aspect ratio, bitrate and caption style for YouTube, Instagram, LinkedIn and more.' },
]

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-[#FAF4E8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">Why PRMinds</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-xl">
            What Sets Us Apart
          </h2>
        </AnimatedSection>

        {/* Large yellow card wrapping the reasons */}
        <AnimatedSection delay={0.1}>
          <div className="rounded-4xl p-8 sm:p-12" style={{ background: '#FFD166' }}>
            <AnimatedGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REASONS.map(({ icon: Icon, title, desc }, i) => (
                <AnimatedItem key={title}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl p-6 flex flex-col gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF4E8] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1C1A2E]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1C1A2E] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
                      <p className="text-[#6B6880] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedGroup>
          </div>
        </AnimatedSection>

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
              I started PRMinds after spending years editing for creators and brands across India and internationally.
              My goal was simple: bring the level of production quality usually reserved for big budgets to every creator.
              Every project is personally overseen — you work with the person who actually cares about your story.
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
