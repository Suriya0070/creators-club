import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, BookOpen, Star, ArrowRight, CheckCircle, Zap } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'
import { CyanBadge } from '../ui/GlassCard'
import { COURSES } from '../../data/courses'

const BADGE_STYLES = {
  cyan: 'bg-cyan-400/15 border-cyan-400/30 text-cyan-400',
  purple: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
  gold: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
}

export default function CoursesSection() {
  return (
    <section id="courses" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <CyanBadge className="mb-5">Our Courses</CyanBadge>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Choose Your{' '}
            <span className="text-gradient">Learning Path</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            From complete beginner to industry professional — we have a course built exactly for where you are right now.
          </p>
        </AnimatedSection>

        {/* Course Cards */}
        <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COURSES.map((course, i) => (
            <AnimatedItem key={course.id}>
              <motion.div
                className="glass rounded-2xl overflow-hidden group cursor-pointer relative h-full flex flex-col"
                whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `0 0 40px ${course.color}20, inset 0 0 40px ${course.color}05` }}
                />

                {/* Badge */}
                {course.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${BADGE_STYLES[course.badgeColor]}`}>
                      <Zap className="w-3 h-3" /> {course.badge}
                    </span>
                  </div>
                )}

                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}40` }}>
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-400">
                      <Star className="w-3 h-3 fill-current" /> 4.9
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-lg text-white mb-1">{course.title}</h3>
                  <p className="text-white/40 text-sm mb-4 line-clamp-2">{course.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-5">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} lessons</span>
                  </div>

                  {/* Key outcomes */}
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {course.outcomes.slice(0, 3).map((o, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-white/55">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        {o}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading font-extrabold text-2xl text-white">₹{course.price.toLocaleString('en-IN')}</span>
                        <span className="text-white/30 text-sm line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-green-400 text-xs font-medium">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <Link
                      to={`/courses`}
                      className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
                      style={{ background: `${course.color}15`, color: course.color, border: `1px solid ${course.color}30` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${course.color}25`
                        e.currentTarget.style.borderColor = `${course.color}60`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${course.color}15`
                        e.currentTarget.style.borderColor = `${course.color}30`
                      }}
                    >
                      Enroll <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedGroup>

        <AnimatedSection delay={0.3} className="text-center mt-10">
          <Link to="/courses" className="btn-outline text-sm px-8 py-3 inline-flex items-center gap-2">
            View All Course Details <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
