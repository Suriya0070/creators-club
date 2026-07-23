import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Plus } from 'lucide-react'

const FAQS = [
  { q: 'How long until my video is ready?', a: '3–5 business days for most projects. Rush delivery (24–48 hours) is available at an extra fee. For documentaries and complex motion graphics, we agree on the exact timeline before anything starts — so there\'s no surprise.' },
  { q: 'How do I get my footage to you?', a: 'Google Drive, WeTransfer, or Frame.io — whatever you already use. Drop your files in a shared folder with a quick brief and any reference videos. We take it from there.' },
  { q: 'What if I want changes?', a: 'Two revision rounds are included in every package. We use timestamped feedback via Frame.io — so "that moment at 1:23" is exact, not approximate. Extra rounds are ₹500 each.' },
  { q: 'Do you work with creators outside India?', a: 'Yes — we have clients in the UK, UAE, Nigeria, Singapore, and more. We work fully remotely, respond async, and schedule calls in your timezone.' },
  { q: 'What file formats do you deliver?', a: 'Platform-optimised MP4 as standard. 4K/1080p H.264 for YouTube. Vertical 9:16 for Instagram and TikTok. Source project files available on request.' },
  { q: 'Can I work with you every month?', a: 'Yes — retainer packages for 4, 8, or 12 videos per month. Priority turnaround, a dedicated Slack channel, and discounted per-video pricing. It\'s how most of our long-term clients work with us.' },
  { q: 'Do you help with scripts or ideas?', a: 'Post-production is where we live. We\'ll give honest feedback on your hook before you shoot, but script writing isn\'t our primary offer. We can refer you to writers we trust.' },
  { q: 'What if the first cut misses the mark?', a: 'We align on style, references, and tone before cutting a single frame. If the first cut still misses — we redo it at no charge. Your satisfaction isn\'t a courtesy. It\'s built into how we work.' },
]

export default function AgencyFAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">FAQ</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-xl">
            Everything you want to know before you start.
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
            Still not sure?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#1C1A2E] underline underline-offset-2 font-medium"
            >
              Talk to us
            </button>{' '}
            — we'll give you a straight answer within one business day.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
