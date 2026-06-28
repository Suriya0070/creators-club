import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'
import { StarRating, CyanBadge } from '../ui/GlassCard'
import { TESTIMONIALS } from '../../data/testimonials'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const featured = TESTIMONIALS[active]

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full filter blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <CyanBadge className="mb-5">Student Success</CyanBadge>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Real Results from{' '}
            <span className="text-gradient">Real Students</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Over 1,500 creators have transformed their careers with Creators Club.
          </p>
        </AnimatedSection>

        {/* Featured Testimonial */}
        <AnimatedSection className="max-w-4xl mx-auto mb-14">
          <div className="glass rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full filter blur-[60px]" />
            <Quote className="w-12 h-12 text-cyan-400/20 mb-6" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-white/80 text-xl sm:text-2xl leading-relaxed font-body mb-8 italic">
                  "{featured.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={featured.avatar} alt={featured.name} className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400/30" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white">{featured.name}</span>
                      {featured.verified && <BadgeCheck className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="text-white/50 text-sm">{featured.role} · {featured.location}</div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <StarRating rating={featured.rating} />
                      {featured.earnings && (
                        <span className="text-xs font-semibold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                          {featured.earnings}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="text-xs text-white/30 mb-0.5">Course</div>
                    <div className="text-sm font-medium text-cyan-400">{featured.course}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Nav */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={() => setActive((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-cyan-400/30 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5 flex-1">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'bg-cyan-400 w-8' : 'bg-white/20 w-4'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActive((active + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-cyan-400/30 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Grid of mini testimonials */}
        <AnimatedGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <AnimatedItem key={t.id}>
              <motion.div
                className="glass glass-hover rounded-2xl p-5 cursor-pointer"
                onClick={() => setActive(i)}
                whileHover={{ y: -3 }}
              >
                <StarRating rating={t.rating} />
                <p className="text-white/65 text-sm leading-relaxed mt-3 mb-4 line-clamp-3">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-white">{t.name}</span>
                      {t.verified && <BadgeCheck className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-xs text-white/40">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}

