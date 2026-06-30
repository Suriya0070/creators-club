import { motion } from 'framer-motion'
import { PlayCircle, BookOpen, Briefcase, Building2, Mic, Film } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'

const CLIENTS = [
  { icon: PlayCircle, label: 'YouTube Creators', desc: 'Long-form content, vlogs, tutorials and series' },
  { icon: Film, label: 'Documentary Channels', desc: 'Narrative storytelling and investigative pieces' },
  { icon: BookOpen, label: 'Online Educators', desc: 'Course content, explainers and lecture edits' },
  { icon: Mic, label: 'Personal Brands', desc: 'Reels, talking-heads and social media content' },
  { icon: Briefcase, label: 'Marketing Agencies', desc: 'Ad creatives, product promos and brand videos' },
  { icon: Building2, label: 'Start-ups', desc: 'Pitches, product demos and founder-led content' },
]

export default function ClientTypes() {
  return (
    <section className="py-24 bg-[#FAF4E8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">Who We Work With</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-lg">
            Built for Every Creator
          </h2>
        </AnimatedSection>

        <AnimatedGroup className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CLIENTS.map(({ icon: Icon, label, desc }, i) => (
            <AnimatedItem key={label}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(28,26,46,0.1)' }}
                transition={{ duration: 0.22 }}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-[rgba(28,26,46,0.06)] cursor-default"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFD166' }}>
                  <Icon className="w-5 h-5 text-[#1C1A2E]" />
                </div>
                <div>
                  <p className="font-bold text-[#1C1A2E] text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</p>
                  <p className="text-[#9896A8] text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
