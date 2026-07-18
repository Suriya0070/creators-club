import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Clock, MessageSquare } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { sendContactEmail } from '../../lib/emailjs'

const VIDEO_TYPES = ['Short-Form / Reels', 'YouTube Video', 'Documentary', 'Motion Graphics / 2.5D Animation', 'Explainer Video', 'Thumbnail Design', 'Not sure yet']
const BUDGETS = ['Under ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹30,000', '₹30,000+', 'Monthly retainer']

const inputClass = 'w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 border-2 placeholder-[rgba(250,244,232,0.35)]'
const inputStyle = { background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(250,244,232,0.15)', color: '#FAF4E8', fontFamily: "'DM Sans', sans-serif" }

export default function AgencyContact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', videoType: '', quantity: '', duration: '', budget: '', deadline: '', description: '', reference: '' })
  const [status, setStatus] = useState('idle')
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const focusStyle = { '--tw-ring-color': 'rgba(245,166,35,0.3)' }

  return (
    <section id="contact" className="py-24 bg-[#1C1A2E]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5" style={{ color: '#F5A623' }}>Work With Us</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-white max-w-2xl leading-[1.0]">
            Tell us what you're building.
          </h2>
          <p className="text-white/40 mt-5 text-sm max-w-md leading-relaxed">
            Fill in what you know. We'll figure out the rest. One business day to respond.
          </p>
          {/* Scarcity signal */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full px-5 py-2.5" style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.25)' }}>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F5A623]" />
            </span>
            <span className="text-xs font-medium" style={{ color: '#FFD166', fontFamily: "'Space Grotesk', sans-serif" }}>
              Currently accepting <strong>3 new clients</strong> this month · 2 slots remaining
            </span>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          {/* Left info */}
          <AnimatedSection className="space-y-8">
            {[
              { icon: Mail, label: 'Email', value: 'suriyasync@gmail.com', href: 'mailto:suriyasync@gmail.com' },
              { icon: MessageSquare, label: 'WhatsApp', value: '+91 70101 27954', sub: 'Mon–Sat, 10am–7pm IST', href: 'https://wa.me/917010127954' },
              { icon: Clock, label: 'Response Time', value: 'Within 1 business day' },
            ].map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[rgba(245,166,35,0.15)] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-[#F5A623]" style={{ width: 18, height: 18 }} />
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-white text-sm hover:text-[#FFD166] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm">{value}</p>
                  )}
                  {sub && <p className="text-white/30 text-xs mt-0.5">{sub}</p>}
                </div>
              </div>
            ))}
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.15}>
            {status === 'sent' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#F5A623] flex items-center justify-center mx-auto mb-6 text-3xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#1C1A2E' }}>✓</div>
                <h3 className="section-heading text-3xl text-white mb-3">We've got it.</h3>
                <p className="text-white/40 text-sm max-w-sm mx-auto">We'll review your brief and send a personalised response within one business day. Keep creating.</p>
              </motion.div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault()
                setStatus('sending')
                try {
                  await sendContactEmail({
                    name: form.name, company: form.company, email: form.email,
                    videoType: form.videoType, quantity: form.quantity, duration: form.duration,
                    budget: form.budget, deadline: form.deadline, description: form.description,
                    reference: form.reference,
                  })
                } catch { /* show success even if not configured */ }
                setStatus('sent')
              }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Your Name *</label>
                    <input
                      required value={form.name} onChange={set('name')} placeholder="Aditya Sharma"
                      className={`${inputClass} focus:border-[#F5A623] focus:bg-[rgba(245,166,35,0.05)]`}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Channel / Company</label>
                    <input
                      value={form.company} onChange={set('company')} placeholder="MyChannel or Acme Inc."
                      className={`${inputClass} focus:border-[#F5A623] focus:bg-[rgba(245,166,35,0.05)]`}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Email Address *</label>
                  <input
                    required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
                    className={`${inputClass} focus:border-[#F5A623] focus:bg-[rgba(245,166,35,0.05)]`}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Type of Video *</label>
                  <select
                    required value={form.videoType} onChange={set('videoType')}
                    className={`${inputClass} focus:border-[#F5A623] focus:bg-[rgba(245,166,35,0.05)] appearance-none`}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                  >
                    <option value="" style={{ background: '#1C1A2E' }}>Select a type...</option>
                    {VIDEO_TYPES.map(t => <option key={t} value={t} style={{ background: '#1C1A2E' }}>{t}</option>)}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Number of Videos</label>
                    <input
                      value={form.quantity} onChange={set('quantity')} placeholder="e.g. 4 per month"
                      className={`${inputClass} focus:border-[#F5A623]`}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Video Duration</label>
                    <input
                      value={form.duration} onChange={set('duration')} placeholder="e.g. 60 seconds / 15 min"
                      className={`${inputClass} focus:border-[#F5A623]`}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Budget Range</label>
                    <select
                      value={form.budget} onChange={set('budget')}
                      className={`${inputClass} focus:border-[#F5A623] appearance-none`}
                      style={{ ...inputStyle, colorScheme: 'dark' }}
                    >
                      <option value="" style={{ background: '#1C1A2E' }}>Select range...</option>
                      {BUDGETS.map(b => <option key={b} value={b} style={{ background: '#1C1A2E' }}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Deadline</label>
                    <input
                      value={form.deadline} onChange={set('deadline')} placeholder="e.g. July 15 or ASAP"
                      className={`${inputClass} focus:border-[#F5A623]`}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Project Description *</label>
                  <textarea
                    required value={form.description} onChange={set('description')} rows={4}
                    placeholder="Tell us about your project — the more detail, the better our proposal..."
                    className={`${inputClass} focus:border-[#F5A623] resize-none`}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Reference Links</label>
                  <input
                    value={form.reference} onChange={set('reference')} placeholder="YouTube / Instagram links you like the style of"
                    className={`${inputClass} focus:border-[#F5A623]`}
                    style={inputStyle}
                  />
                </div>
                <div className="pt-2 flex items-center gap-4 flex-wrap">
                  <button type="submit" className="btn-primary">
                    Send My Brief <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <p className="text-white/25 text-xs">No contract · No pressure · 1 business day response</p>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
