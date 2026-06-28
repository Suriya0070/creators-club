import { motion } from 'framer-motion'
import { Video, Users, Award, Zap, Globe, Clock, MessageCircle, TrendingUp } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'
import { CyanBadge } from '../ui/GlassCard'

const FEATURES = [
  { Icon: Video, title: 'HD Video Lessons', desc: '260+ professional lessons in 4K resolution with downloadable project files.', color: '#00D9FF' },
  { Icon: Users, title: 'Live Mentorship', desc: 'Weekly live Q&A sessions with industry professionals actively working in the field.', color: '#A855F7' },
  { Icon: Award, title: 'Industry Certificate', desc: 'Recognized certificate upon completion, trusted by top brands and agencies.', color: '#F59E0B' },
  { Icon: Zap, title: 'Hands-on Projects', desc: 'Real-world projects with every module — build a portfolio as you learn.', color: '#22C55E' },
  { Icon: Globe, title: 'Lifetime Access', desc: 'Purchase once, access forever. Including all future updates and new lessons.', color: '#EF4444' },
  { Icon: Clock, title: 'Learn at Your Pace', desc: 'No deadlines, no pressure. Learn on your schedule, revisit any lesson anytime.', color: '#00D9FF' },
  { Icon: MessageCircle, title: 'Private Community', desc: 'Join 1,500+ creators in our exclusive Discord. Get feedback, find collaborators.', color: '#A855F7' },
  { Icon: TrendingUp, title: 'Career Support', desc: 'Resume review, portfolio critique, and job leads shared weekly in the community.', color: '#F59E0B' },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071C2F]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <CyanBadge className="mb-5">Why Creators Club</CyanBadge>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Everything You Need to{' '}
            <span className="text-gradient">Go Pro</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            We don't just teach editing software. We build complete professionals with the skills, portfolio, and confidence to earn.
          </p>
        </AnimatedSection>

        <AnimatedGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <AnimatedItem key={i}>
              <motion.div
                className="glass glass-hover rounded-2xl p-5 h-full group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
                >
                  <f.Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-heading font-semibold text-white text-base mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
