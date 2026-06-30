import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Plus } from 'lucide-react'

const FAQS = [
  { q: 'What is your typical turnaround time?', a: '3–5 business days for most projects. Rush delivery (24–48 hours) is available for an additional fee. Complex documentaries or motion graphics projects may take 7–10 days — we agree on timelines upfront during onboarding.' },
  { q: 'How do I share footage with you?', a: 'We use Google Drive, WeTransfer or Frame.io — whichever you\'re already using. You upload your raw files to a shared folder, along with a brief and any reference videos. We take it from there.' },
  { q: 'How many revision rounds are included?', a: 'Two rounds of revisions are included in all packages. We use timestamped feedback via Frame.io so changes are precise and efficient. Additional revision rounds are available at ₹500 per round.' },
  { q: 'Do you work with international clients?', a: 'Yes. We\'re India-based and work fully remotely with clients across the UK, UAE, Nigeria, Singapore and more. Communication is async-first, with scheduled calls available in your timezone.' },
  { q: 'What formats do you deliver in?', a: 'We deliver platform-optimised MP4 files as standard. For YouTube: 4K/1080p H.264 or H.265. For Instagram/TikTok: vertical 9:16 MP4. Source project files are available on request.' },
  { q: 'Can I hire you on a monthly retainer?', a: 'Yes — retainer packages are available for creators who need consistent output (4, 8 or 12 videos per month). Retainers include priority turnaround, a dedicated Slack channel and discounted per-video pricing.' },
  { q: 'Do you also write scripts or create content strategies?', a: 'We focus on post-production. We can review and give hook feedback on your script before you shoot, but we don\'t write scripts as a primary service. We partner with scriptwriters and can refer you if needed.' },
  { q: 'What if I\'m not happy with the first cut?', a: 'We start every project with a detailed brief and reference review to align on style before cutting a frame. If the first cut misses the mark, we\'ll redo it at no extra charge — your satisfaction is built into the process.' },
]

export default function AgencyFAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">FAQ</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-xl">
            Common Questions
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl">
          {FAQS.map(({ q, a }, i) => (
            <AnimatedSection key={i} delay={i * 0.04}>
              <div className="border-b border-[rgba(28,26,46,0.1)]">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group gap-6"
                >
                  <span className="font-semibold text-[#1C1A2E] text-sm leading-relaxed flex-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{q}</span>
                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-7 h-7 rounded-full border border-[rgba(28,26,46,0.2)] flex items-center justify-center"
                    style={{ background: open === i ? '#F5A623' : 'transparent', borderColor: open === i ? '#F5A623' : undefined }}
                  >
                    <Plus className="w-3.5 h-3.5" style={{ color: open === i ? '#1C1A2E' : '#9896A8' }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#6B6880] text-sm leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="mt-12">
          <p className="text-[#9896A8] text-sm">
            Still have questions?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#1C1A2E] underline underline-offset-2 font-medium"
            >
              Get in touch
            </button>{' '}
            — we respond within one business day.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
