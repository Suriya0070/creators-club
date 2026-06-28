import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, MessageCircle, CheckCircle } from 'lucide-react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'
import { CyanBadge } from '../ui/GlassCard'
import { useToast } from '../../hooks/useToast'

const CONTACT_INFO = [
  { Icon: Mail, label: 'Email Us', value: 'hello@creatorsclub.in', href: 'mailto:hello@creatorsclub.in' },
  { Icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { Icon: MapPin, label: 'Location', value: 'Bangalore, Karnataka', href: null },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }) }, 4000)
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-400/5 rounded-full filter blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <CyanBadge className="mb-5">Get In Touch</CyanBadge>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Ready to Start Your{' '}
            <span className="text-gradient">Journey?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Have questions? Our team is ready to help you pick the right course and start your creative career.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <AnimatedSection variant="fadeLeft">
            <div className="space-y-5 mb-8">
              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <div key={label} className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-white font-medium hover:text-cyan-400 transition-colors">{value}</a>
                    ) : (
                      <span className="text-white font-medium">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%20Creators%20Club!%20I%20want%20to%20know%20more%20about%20your%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-heading font-bold text-white bg-[#25D366]/20 border border-[#25D366]/30 hover:bg-[#25D366]/30 hover:border-[#25D366]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Map placeholder */}
            <div className="mt-5 glass rounded-2xl overflow-hidden h-36 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-cyan-400/40 mx-auto mb-2" />
                <p className="text-white/30 text-sm">Bangalore, Karnataka, India</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection variant="fadeRight">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="font-heading font-bold text-xl text-white mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+91 xxxxx xxxxx" type="tel" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Email *</label>
                  <input name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" type="email" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    className="input-field resize-none" rows={5}
                    placeholder="Tell us which course you're interested in, or ask us anything..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  className={`w-full py-3.5 rounded-xl font-heading font-bold flex items-center justify-center gap-2.5 transition-all duration-300 ${
                    sent ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                    : 'btn-primary'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {sent ? (
                    <><CheckCircle className="w-5 h-5" /> Message Sent!</>
                  ) : sending ? (
                    <><div className="w-4 h-4 border-2 border-navy-900/40 border-t-navy-900 rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

