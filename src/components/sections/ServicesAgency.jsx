import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, PlayCircle, Film, Layers, Image, ArrowUpRight, Star, X, Check, MessageCircle, Phone } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

const SERVICES = [
  {
    icon: Smartphone,
    title: 'Short-Form Content',
    subtitle: 'Reels · Shorts · TikToks',
    desc: 'Hook-driven edits engineered for retention. Fast cuts, punchy captions, trending audio and platform-specific aspect ratios.',
    fullDesc: 'Your short-form content is the front door to your brand. We build every edit around a strong hook in the first 3 seconds, a retention loop that prevents drop-off, and a clear CTA at the end. Every Reel, Short or TikTok we deliver is platform-optimised for maximum reach.',
    deliverables: ['Vertical 9:16 edits', 'Custom animated captions/subtitles', 'Sound design & SFX layering', 'Trending audio sync', 'Thumbnail frame selection', 'Platform-ready export (MP4)'],
    price: '₹2,500', unit: '/video',
    flavor: 'amber',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    turnaround: '2–3 business days',
    ideal: 'Instagram creators, personal brands, coaches, lifestyle brands',
    waMsg: "Hi PRMinds! I'm interested in your Short-Form Content (Reels/Shorts) editing service. Can we discuss?",
  },
  {
    icon: PlayCircle,
    title: 'YouTube Videos',
    subtitle: 'Long-Form · Series · Vlogs',
    desc: 'Story-structured edits that keep viewers watching. B-roll, colour grade, music, chapter markers and end-screen sequencing.',
    fullDesc: 'YouTube success is about watch time — and watch time is won or lost in the edit. We structure your video around story beats that pull viewers forward: strong opening, clear narrative arc, b-roll that supports (not decorates), and a satisfying resolution. Every frame earns its place.',
    deliverables: ['Multi-camera sync & selection', 'Professional colour grading', 'Licensed background music', 'Custom animated intro/outro', 'Chapter markers & timestamps', 'Thumbnail design (optional add-on)'],
    price: '₹8,000', unit: '/video',
    flavor: 'dark',
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=600&q=80',
    turnaround: '4–5 business days',
    ideal: 'YouTubers, educators, tech reviewers, travel creators, vloggers',
    waMsg: "Hi PRMinds! I need help editing my YouTube videos. Can we have a chat?",
  },
  {
    icon: Film,
    title: 'Documentary & Explainer',
    subtitle: 'Brand Docs · Interviews · Narratives',
    desc: 'Narrative-first editing for long-form documentaries, brand stories and interview-led explainers.',
    fullDesc: 'Documentaries require a completely different skill set: structural thinking, emotional pacing and the ability to find the story inside hours of raw footage. We bring a narrative-first approach to every documentary project — building tension, empathy and resolution through the edit alone.',
    deliverables: ['Story structure consulting', 'Interview cross-cutting & sequencing', 'Archival & b-roll integration', 'Professional colour grade', 'Immersive sound design', 'Motion graphic titles & maps'],
    price: 'Custom', unit: 'quote',
    flavor: 'white',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
    turnaround: '7–14 business days',
    ideal: 'Documentary channels, brand filmmakers, journalists, NGOs',
    waMsg: "Hi PRMinds! I have a documentary/explainer project I'd like to discuss. Can we chat?",
  },
  {
    icon: Layers,
    title: 'Motion Graphics & 2.5D',
    subtitle: 'Animation · Parallax · Lower Thirds',
    desc: 'Motion design that elevates production value — from animated lower thirds to full 2.5D parallax sequences.',
    fullDesc: 'Motion graphics transform static content into something that feels alive. Whether you need animated infographics, a 2.5D parallax intro, kinetic typography or branded lower thirds — we design and animate in-house, so the motion is always coherent with your edit, not pasted on top.',
    deliverables: ['Kinetic typography sequences', '2.5D parallax animation', 'Animated infographics & charts', 'Lower thirds & title cards', 'Logo animation', 'Transition & effect design'],
    price: 'Custom', unit: 'quote',
    flavor: 'dark',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    turnaround: '5–10 business days',
    ideal: 'SaaS companies, educators, start-ups, brand agencies',
    waMsg: "Hi PRMinds! I need motion graphics / 2.5D animation work. Can we discuss my project?",
  },
  {
    icon: Image,
    title: 'Thumbnail Design',
    subtitle: 'YouTube · Channel Art',
    desc: 'Click-worthy thumbnail visuals designed with contrast, expressions, bold typography and split-tested layouts.',
    fullDesc: 'Your thumbnail is the most important frame in your video — it\'s what gets the click. We design thumbnails using the same principles top creators use: high contrast, clear subject, bold text, and curiosity-driven framing. We also offer A/B variant thumbnails so you can test what works.',
    deliverables: ['2 A/B variant designs per thumbnail', 'Custom background removal', 'Brand-consistent colour style', 'Photoshop source file included', 'YouTube-optimised export (PNG)', 'Channel art on request'],
    price: '₹800', unit: '/thumbnail',
    flavor: 'amber',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&q=80',
    turnaround: '1–2 business days',
    ideal: 'YouTubers, podcast creators, Udemy instructors',
    waMsg: "Hi PRMinds! I need YouTube thumbnail design. Can we discuss?",
  },
]

const cardStyle = {
  amber: { bg: '#FFD166', text: '#1C1A2E', muted: 'rgba(28,26,46,0.55)', tag: 'rgba(28,26,46,0.12)' },
  dark:  { bg: '#1C1A2E', text: '#FAF4E8', muted: 'rgba(250,244,232,0.5)',  tag: 'rgba(250,244,232,0.12)' },
  white: { bg: '#ffffff',  text: '#1C1A2E', muted: 'rgba(28,26,46,0.5)',  tag: 'rgba(28,26,46,0.08)', border: true },
}

function ServiceModal({ service, onClose }) {
  const scrollToContact = () => {
    onClose()
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }
  const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(service.waMsg)}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(28,26,46,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="modal-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          background: '#FAF4E8',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Header image */}
        <div className="relative" style={{ aspectRatio: '16/7', overflow: 'hidden', background: '#1C1A2E' }}>
          <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #FAF4E8 0%, transparent 60%)' }} />
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          {/* Price badge */}
          <div className="absolute bottom-4 left-5">
            <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}>
              {service.price} {service.unit}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <p className="text-[#9896A8] text-xs uppercase tracking-widest mb-1">{service.subtitle}</p>
          <h3 className="section-heading text-3xl text-[#1C1A2E] mb-4">{service.title}</h3>
          <p className="text-[#6B6880] text-sm leading-relaxed mb-6">{service.fullDesc}</p>

          {/* Deliverables */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1C1A2E] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What's Included</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.deliverables.map((d) => (
                <div key={d} className="flex items-start gap-2">
                  <div className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: '#F5A623' }}>
                    <Check className="w-2.5 h-2.5 text-[#1C1A2E]" />
                  </div>
                  <span className="text-[#6B6880] text-xs leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-4 mb-7 p-4 rounded-2xl" style={{ background: 'rgba(28,26,46,0.05)' }}>
            <div>
              <p className="text-[#9896A8] text-xs uppercase tracking-wider mb-1">Turnaround</p>
              <p className="text-[#1C1A2E] text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{service.turnaround}</p>
            </div>
            <div>
              <p className="text-[#9896A8] text-xs uppercase tracking-wider mb-1">Ideal For</p>
              <p className="text-[#1C1A2E] text-xs leading-relaxed">{service.ideal}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={scrollToContact}
              className="btn-primary flex-1 justify-center"
            >
              <Phone className="w-4 h-4" /> Book a Discovery Call
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 px-5 font-bold text-sm transition-all duration-200 hover:opacity-90"
              style={{
                background: '#25D366',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                textDecoration: 'none',
              }}
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
          <p className="text-[#9896A8] text-xs text-center mt-3">No commitment · We respond within 1 business day</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServicesAgency() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <section id="services" className="py-24 bg-[#FAF4E8]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <AnimatedSection className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="badge-cyan mb-5">What We Do</p>
              <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-lg">
                Services Built for Maximum Impact
              </h2>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary self-start sm:self-auto shrink-0"
            >
              Get a Quote <ArrowUpRight className="w-4 h-4" />
            </button>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ icon: Icon, title, subtitle, desc, deliverables, price, unit, flavor, image }, i) => {
              const style = cardStyle[flavor]
              return (
                <AnimatedSection key={title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl overflow-hidden flex flex-col h-full cursor-pointer relative group"
                    style={{
                      background: style.bg,
                      border: style.border ? '1px solid rgba(28,26,46,0.1)' : 'none',
                    }}
                    onClick={() => setSelected(SERVICES.find(s => s.title === title))}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ opacity: flavor === 'dark' ? 0.55 : 0.75 }}
                      />
                      <Star className="absolute top-4 right-4 w-5 h-5 opacity-60" style={{ color: style.text, fill: style.text }} />
                      <span
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{ background: style.bg, color: style.text, fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {price}{unit.startsWith('/') ? '' : ' '}{unit}
                      </span>
                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: 'rgba(28,26,46,0.35)' }}
                      >
                        <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}>
                          View Details ↗
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4" style={{ color: style.muted }} />
                        <p className="text-xs uppercase tracking-widest" style={{ color: style.muted }}>{subtitle}</p>
                      </div>
                      <h3 className="section-heading text-xl mb-3" style={{ color: style.text }}>{title}</h3>
                      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: style.muted }}>{desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {deliverables.slice(0, 3).map((d) => (
                          <span key={d} className="px-2.5 py-1 text-xs rounded-full" style={{ background: style.tag, color: style.text }}>{d}</span>
                        ))}
                        {deliverables.length > 3 && (
                          <span className="px-2.5 py-1 text-xs rounded-full" style={{ background: style.tag, color: style.text }}>+{deliverables.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>

          <AnimatedSection delay={0.4} className="mt-10 pt-10 border-t border-[rgba(28,26,46,0.1)]">
            <p className="text-[#9896A8] text-sm">
              Not sure which service fits?{' '}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#1C1A2E] underline underline-offset-2 font-medium"
              >
                Book a free discovery call
              </button>{' '}
              and we'll recommend the right approach.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
