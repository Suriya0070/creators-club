import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ArrowUpRight, PlayCircle, BookOpen, Briefcase, Building2, Mic, Film } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'

// ── Who We Work With data ──────────────────────────────────────
const CLIENTS = [
  { icon: PlayCircle, label: 'YouTube Creators',     desc: 'Long-form content, vlogs, tutorials and series' },
  { icon: Film,       label: 'Documentary Channels', desc: 'Narrative storytelling and investigative pieces' },
  { icon: BookOpen,   label: 'Online Educators',     desc: 'Course content, explainers and lecture edits' },
  { icon: Mic,        label: 'Personal Brands',      desc: 'Reels, talking-heads and social media content' },
  { icon: Briefcase,  label: 'Marketing Agencies',   desc: 'Ad creatives, product promos and brand videos' },
  { icon: Building2,  label: 'Start-ups',            desc: 'Pitches, product demos and founder-led content' },
]

// ── Featured Work data ─────────────────────────────────────────
const FILTERS  = ['All', 'Short-Form', 'YouTube', 'Documentary', 'Motion Graphics']
const PROJECTS = [
  { title: 'Shell & Nigeria Documentary',      client: 'Documentary Channel', type: 'Documentary',     result: '280K+ organic views',     image: 'https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=800&q=80', large: true },
  { title: 'Fitness Brand Reels Series',       client: 'Personal Brand',      type: 'Short-Form',      result: '85% avg. watch-through',  image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&q=80' },
  { title: 'SaaS Explainer Animation',         client: 'Tech Start-up',       type: 'Motion Graphics', result: 'Seed round closed',        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { title: 'EdTech YouTube Course Series',     client: 'Online Educator',     type: 'YouTube',         result: '1,200 enrolments',        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80', large: true },
  { title: 'Travel Creator Long-Form Vlog',    client: 'YouTube Creator',     type: 'YouTube',         result: '120K views · 7 days',     image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80' },
  { title: 'Brand Documentary — Founder Story',client: 'Marketing Agency',    type: 'Documentary',     result: '500+ LinkedIn shares',    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80' },
]

const DIVIDER = { marginTop: 72, paddingTop: 72, borderTop: '1px solid rgba(28,26,46,0.08)' }

export default function WorkSection() {
  const [playing, setPlaying] = useState(false)
  const [active,  setActive]  = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === active)

  return (
    <section id="showreel" style={{ background: '#FAF4E8', paddingTop: 80, paddingBottom: 96 }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        {/* ── 1. Selected Work / Showreel ──────────────────────── */}
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
                  alt="PRMinds Showreel"
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
                  <p className="text-white font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>PRMinds — Showreel 2025</p>
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
                  title="PRMinds Showreel"
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

        {/* Stats */}
        <AnimatedSection delay={0.25}>
          <div className="mt-10 pt-10 border-t border-[rgba(28,26,46,0.1)] grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: '40+',  label: 'Videos Delivered' },
              { value: '15+',  label: 'Motion Projects'  },
              { value: '5+',   label: 'Countries Served' },
              { value: '3–5d', label: 'Avg. Turnaround'  },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#1C1A2E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
                <div className="text-[#9896A8] text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── 2. Who We Work With ──────────────────────────────── */}
        <div style={DIVIDER}>
          <AnimatedSection className="mb-10">
            <p className="badge-cyan mb-5">Who We Work With</p>
            <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-lg">
              Built for Every Creator
            </h2>
          </AnimatedSection>

          <AnimatedGroup className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CLIENTS.map(({ icon: Icon, label, desc }) => (
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

        {/* ── 3. Featured Work ─────────────────────────────────── */}
        <div style={DIVIDER}>
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
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
                  className="px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-full border transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background:   active === f ? '#1C1A2E' : 'transparent',
                    color:        active === f ? '#FAF4E8' : '#9896A8',
                    borderColor:  active === f ? '#1C1A2E' : 'rgba(28,26,46,0.2)',
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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-[#1C1A2E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-[#1C1A2E]" />
                    </div>
                  </div>
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

      </div>
    </section>
  )
}
