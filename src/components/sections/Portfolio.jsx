import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Play } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { CyanBadge } from '../ui/GlassCard'
import { PORTFOLIO_ITEMS } from '../../data/testimonials'

const CATEGORIES = ['All', 'Reels', 'Wedding', 'Commercial', 'Travel', 'YouTube', 'Corporate']

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === active)

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection className="text-center mb-12">
          <CyanBadge className="mb-5">Student Work</CyanBadge>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            See What Our Students{' '}
            <span className="text-gradient">Create</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every project below was made by a student within months of joining.
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15} className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-cyan-400 text-navy-900 font-bold shadow-[0_0_20px_rgba(0,217,255,0.4)]'
                  : 'glass text-white/60 hover:text-white hover:border-cyan-400/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-cyan-400/20 backdrop-blur-sm rounded-full border border-cyan-400/40 flex items-center justify-center">
                    <Play className="w-5 h-5 text-cyan-400 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="badge-cyan text-[0.65rem] mb-1 inline-flex">{item.category}</div>
                  <div className="text-white font-semibold text-sm leading-tight">{item.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Eye className="w-3 h-3 text-cyan-400" />
                    <span className="text-white/60 text-xs">{item.views}</span>
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">{item.creator}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
