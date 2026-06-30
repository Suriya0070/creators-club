import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

const FILTERS = ['All', 'Short-Form', 'YouTube', 'Documentary', 'Motion Graphics']

const PROJECTS = [
  { title: 'Shell & Nigeria Documentary', client: 'Documentary Channel', type: 'Documentary', result: '280K+ organic views', image: 'https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=800&q=80', large: true },
  { title: 'Fitness Brand Reels Series', client: 'Personal Brand', type: 'Short-Form', result: '85% avg. watch-through', image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&q=80' },
  { title: 'SaaS Explainer Animation', client: 'Tech Start-up', type: 'Motion Graphics', result: 'Seed round closed', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { title: 'EdTech YouTube Course Series', client: 'Online Educator', type: 'YouTube', result: '1,200 enrolments', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80', large: true },
  { title: 'Travel Creator Long-Form Vlog', client: 'YouTube Creator', type: 'YouTube', result: '120K views · 7 days', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80' },
  { title: 'Brand Documentary — Founder Story', client: 'Marketing Agency', type: 'Documentary', result: '500+ LinkedIn shares', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80' },
]

export default function FeaturedWork() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === active)

  return (
    <section id="portfolio" className="py-24 bg-[#FAF4E8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="badge-cyan mb-5">Featured Work</p>
            <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E]">
              Projects That Delivered Results
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-full border transition-all duration-200`}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: active === f ? '#1C1A2E' : 'transparent',
                  color: active === f ? '#FAF4E8' : '#9896A8',
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
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`relative group overflow-hidden rounded-3xl cursor-pointer bg-[#1C1A2E] ${project.large ? 'sm:row-span-2' : ''}`}
                style={{ minHeight: project.large ? '480px' : '280px' }}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#1C1A2E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-5 left-5">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.type}
                  </span>
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-[#1C1A2E]" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white/55 text-xs mb-1">{project.client}</p>
                  <h3 className="text-white font-bold text-base leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
                  <p className="text-[#FFD166] text-xs font-semibold mt-2">{project.result}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
