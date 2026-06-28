import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BookOpen, CheckCircle, Award, ArrowRight, ChevronDown, Play, Users, Zap } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../components/ui/AnimatedSection'
import { CyanBadge, StarRating } from '../components/ui/GlassCard'
import { COURSES } from '../data/courses'

function CourseCard({ course, featured = false }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className={`glass rounded-3xl overflow-hidden ${featured ? 'border-cyan-400/20 shadow-[0_0_40px_rgba(0,217,255,0.1)]' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {featured && (
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-center py-2 text-xs font-bold text-navy-900 uppercase tracking-widest">
          ⭐ Most Popular
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left */}
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent lg:to-[#0F172A] to-transparent lg:via-transparent via-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:hidden" />
          <div className="absolute bottom-4 left-4 lg:hidden">
            <span className="badge-cyan text-xs">{course.level}</span>
          </div>
        </div>

        {/* Right */}
        <div className="p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-cyan text-xs hidden lg:inline-flex">{course.level}</span>
            <StarRating rating={5} />
            <span className="text-white/40 text-xs">4.9 (200+ reviews)</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">{course.title}</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-5">{course.description}</p>

          {/* Meta */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="glass rounded-xl p-3 text-center">
              <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-white text-sm font-bold">{course.duration}</div>
              <div className="text-white/40 text-xs">Duration</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <BookOpen className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-white text-sm font-bold">{course.lessons}</div>
              <div className="text-white/40 text-xs">Lessons</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-white text-sm font-bold">{course.projects}</div>
              <div className="text-white/40 text-xs">Projects</div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="mb-5">
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">What you'll learn</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {course.outcomes.slice(0, 4).map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />{o}
                </li>
              ))}
            </ul>
          </div>

          {/* Mentor */}
          <div className="flex items-center gap-3 mb-5 p-3 glass rounded-xl">
            <img src={course.mentorAvatar} alt={course.mentor} className="w-9 h-9 rounded-full object-cover border border-cyan-400/20" />
            <div>
              <div className="text-sm font-semibold text-white">{course.mentor}</div>
              <div className="text-xs text-white/40">{course.mentorRole}</div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-3xl text-white">₹{course.price.toLocaleString('en-IN')}</span>
                <span className="text-white/30 text-base line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-green-400 text-xs font-semibold">{Math.round((1 - course.price / course.originalPrice) * 100)}% OFF — Limited time</span>
            </div>
            <Link to="/register" className="btn-primary text-sm px-6 py-3">
              Enroll Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Curriculum accordion */}
      <div className="border-t border-white/5 px-6 sm:px-8 py-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-sm font-semibold text-white/60 hover:text-white transition-colors"
        >
          <span>View Full Curriculum ({course.curriculum.length} weeks)</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                {course.curriculum.map((week) => (
                  <div key={week.week} className="glass rounded-xl p-3">
                    <div className="text-xs font-bold text-cyan-400 mb-1.5">Week {week.week}: {week.title}</div>
                    <ul className="space-y-1">
                      {week.topics.map((t, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-white/45">
                          <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tools */}
      <div className="border-t border-white/5 px-6 sm:px-8 py-4 flex items-center gap-3 flex-wrap">
        <span className="text-xs text-white/30 font-medium">Tools covered:</span>
        {course.tools.map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">{t}</span>
        ))}
        {course.certificate && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
            <Award className="w-3 h-3" /> Certificate Included
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#070B14] pt-24 pb-20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="noise-overlay" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full filter blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <CyanBadge className="mb-5">All Courses</CyanBadge>
          <h1 className="section-heading text-5xl sm:text-6xl lg:text-7xl text-white mb-5">
            Pick Your <span className="text-gradient">Path</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            From complete beginner to cinematic filmmaker. Choose the course that matches your level and goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyan-400" /> Lifetime Access</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-400" /> Certificate Included</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-purple-400" /> Community Access</span>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} featured={i === 1} />
          ))}
        </div>

        {/* Guarantee */}
        <AnimatedSection delay={0.3} className="mt-12 text-center glass rounded-2xl p-8">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="font-heading font-bold text-xl text-white mb-2">7-Day Money-Back Guarantee</h3>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Not satisfied within the first 7 days? We'll refund you 100%, no questions asked. Zero risk, maximum value.
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}
