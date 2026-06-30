import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'

const TESTIMONIALS = [
  { name: 'Aditya Sharma', role: 'YouTuber', company: '280K Subscribers', avatar: 'AS', quote: 'Pravin took my raw travel vlogs and turned them into cinematic experiences. My watch time jumped 40% in the first month. I literally can\'t imagine editing without PRMinds now.', result: '+40% watch time' },
  { name: 'Priya Nair', role: 'Founder', company: 'GrowthStack (SaaS)', avatar: 'PN', quote: 'We needed an explainer video for our investor pitch and had 10 days. PRMinds delivered a 2.5D animated video that was genuinely impressive. We closed our seed round.', result: 'Seed round closed' },
  { name: 'Mohammed Al-Rashid', role: 'Documentary Producer', company: 'Al Nour Media', avatar: 'MA', quote: 'The Shell Nigeria documentary was our most complex project. PRMinds handled the entire post-production — structure, grade, sound — with zero hand-holding. Professional at every step.', result: '280K organic views' },
  { name: 'Sneha Kulkarni', role: 'Fitness Creator', company: '@snehalifts · 45K Followers', avatar: 'SK', quote: 'Before PRMinds I was spending every Sunday editing. Now I just film and send. They understand my style, they\'re consistent, and they never miss a deadline.', result: '18K → 45K followers' },
  { name: 'Rajan Mehta', role: 'Marketing Lead', company: 'Elevate Digital Agency', avatar: 'RM', quote: 'We use PRMinds for all our client video work. The turnaround is reliable, the quality is consistent, and the motion design work is genuinely premium. A real agency partner.', result: '8 clients served together' },
  { name: 'Divya Krishnan', role: 'EdTech Founder', company: 'SkillDoor', avatar: 'DK', quote: 'Our YouTube course series went from looking amateur to looking like a premium product. Students actually commented on the production quality. It drove 1,200 enrolments.', result: '1,200 enrolments' },
]

export default function AgencyTestimonials() {
  return (
    <section className="py-24 bg-[#FAF4E8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">Client Testimonials</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-2xl">
            Creators and Brands Love Working With Us
          </h2>
        </AnimatedSection>

        <AnimatedGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedItem key={t.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22 }}
                className="bg-white rounded-3xl p-7 flex flex-col h-full shadow-[0_4px_20px_rgba(28,26,46,0.06)] border border-[rgba(28,26,46,0.06)]"
              >
                {/* Quote mark */}
                <Quote className="w-6 h-6 text-[#F5A623] mb-4" />

                <p className="text-[#6B6880] text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>

                {/* Result chip */}
                <span
                  className="self-start px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                  style={{ background: '#FFD166', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {t.result}
                </span>

                <div className="flex items-center gap-3 pt-5 border-t border-[rgba(28,26,46,0.08)]">
                  <div className="w-10 h-10 rounded-full bg-[#1C1A2E] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-[#1C1A2E] text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</p>
                    <p className="text-[#9896A8] text-xs">{t.role} · {t.company}</p>
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
