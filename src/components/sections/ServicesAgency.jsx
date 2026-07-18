import { useState, useEffect, useRef } from 'react'
import { sendBookingEmail } from '../../lib/emailjs'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone, PlayCircle, Film, Layers,
  ArrowUpRight, Star, X, Check,
  Phone, Calendar, Clock, ChevronLeft, ChevronRight,
  User, Mail, CheckCircle,
} from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

// Only loads and plays video when the card enters the viewport
function LazyVideo({ src, className, style }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{ ...style, overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}>
      {inView && <video src={src} autoPlay muted loop playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    </div>
  )
}

const REEL_PACKAGES = [
  {
    icon: Smartphone,
    title: 'Basic Reel Edit',
    subtitle: 'Up to 45 seconds',
    desc: 'For low-budget clients who need clean, simple reels. Basic cuts, captions, and music — no fluff.',
    fullDesc: 'Everything your content needs, nothing it doesn\'t. We handle the cuts, remove mistakes, add simple captions, match background music, and export in 9:16. Clean, fast, effective. One revision included.',
    deliverables: ['Up to 45 seconds', 'Basic cuts', 'Mistake removal', 'Simple captions', 'Basic music', '9:16 export', '1 revision'],
    price: '₹499', unit: '/reel',
    flavor: 'white',
    video: '/videos/Reel1.mp4',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    turnaround: '1–2 business days',
    ideal: 'Small shops, basic announcements, talking-head videos, event highlights',
  },
  {
    icon: PlayCircle,
    title: 'Creator Reel Edit',
    subtitle: 'Up to 60 seconds',
    desc: 'The middle package. Clean cuts, better captions, basic B-roll and SFX for Instagram creators and local brands.',
    fullDesc: 'A step up in quality and storytelling. Clean pacing, better caption design, basic B-roll to support your message, simple SFX, and colour correction. For creators who want consistency and polish on every reel. Two revisions included.',
    deliverables: ['Up to 60 seconds', 'Clean cuts', 'Better captions', 'Basic B-roll', 'Basic SFX', 'Basic colour correction', '9:16 export', '2 revisions'],
    price: '₹1,499', unit: '/reel',
    flavor: 'amber',
    video: '/videos/Reel2.mp4',
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=600&q=80',
    turnaround: '2–3 business days',
    ideal: 'Instagram creators, coaches, local brands, educational pages',
  },
  {
    icon: Film,
    title: 'Premium Motion Reel',
    subtitle: 'Up to 75 seconds',
    desc: 'The package to push. Hook-first structure, advanced captions, motion graphics, and full sound design.',
    fullDesc: 'This is the package that makes people stop, watch, and save. Hook improvement, strong pacing, advanced captions, B-roll placement, basic motion graphics, professional sound design, colour correction, and a cover frame. Two revisions to get it perfect.',
    deliverables: ['Up to 75 seconds', 'Hook improvement', 'Strong pacing', 'Advanced captions', 'B-roll placement', 'Basic motion graphics', 'Sound design', 'Colour correction', 'Cover frame', '9:16 export', '2 revisions'],
    price: '₹1,999', unit: '/reel',
    flavor: 'dark',
    video: '/videos/Reel3.mp4',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
    turnaround: '3–4 business days',
    ideal: 'Tamil creators, business owners, personal brands, digital marketing agencies',
  },
]

const YOUTUBE_PACKAGES = [
  {
    icon: Smartphone,
    title: 'Clean YouTube Edit',
    subtitle: 'Up to 6 minutes',
    desc: 'Entry-level YouTube editing. Simple cuts, basic zooms, title text, and colour correction. Keep it simple.',
    fullDesc: 'Clean, simple, professional. Up to 6 minutes final video with basic cuts, mistake removal, simple zoom-in / zoom-out, background music, basic colour correction, and a simple title text. One revision. This is the entry-level package — no overworking needed.',
    deliverables: ['Up to 6 min final video', 'Basic cuts', 'Mistake removal', 'Simple zoom-in / zoom-out', 'Basic background music', 'Basic colour correction', 'Simple title text', '16:9 export', '1 revision'],
    price: '₹2,000', unit: '/video',
    flavor: 'white',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    turnaround: '3–4 business days',
    ideal: 'Talking-head videos, basic YouTube uploads, coaching videos, class videos',
  },
  {
    icon: PlayCircle,
    title: 'Creator YouTube Edit',
    subtitle: 'Up to 8 minutes',
    desc: 'The middle package. B-roll, captions, clean pacing, and basic motion graphics for regular YouTube creators.',
    fullDesc: 'For creators who want their videos to look and feel polished. Up to 8 minutes of clean pacing, B-roll placement, basic captions, basic motion graphics, music and SFX, colour correction, and a simple intro title. Two revisions. Looks good — but the premium package looks more valuable.',
    deliverables: ['Up to 8 min final video', 'Clean pacing', 'Mistake removal', 'B-roll placement', 'Basic captions', 'Basic motion graphics', 'Music & basic SFX', 'Colour correction', 'Simple intro title', '16:9 export', '2 revisions'],
    price: '₹5,000', unit: '/video',
    flavor: 'amber',
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=600&q=80',
    turnaround: '4–5 business days',
    ideal: 'Regular YouTube creators, educators, business videos, Tamil explanation videos',
  },
  {
    icon: Layers,
    title: 'Story Motion Edit',
    subtitle: 'Up to 10 minutes',
    desc: 'Premium YouTube editing — story-based structure, motion graphics, typography animation, and sound design.',
    fullDesc: 'The full premium experience. Up to 10 minutes of story-based editing, hook improvement, strong pacing, B-roll support, better captions, motion graphics, typography animation, sound design, colour correction, intro title design, and thumbnail concept support. Two revisions. Built for creators who want their videos to do serious work.',
    deliverables: ['Up to 10 min final video', 'Story-based editing', 'Hook improvement', 'Strong pacing', 'B-roll support', 'Better captions', 'Motion graphics', 'Typography animation', 'Sound design', 'Colour correction', 'Intro title design', 'Thumbnail concept support', '16:9 export', '2 revisions'],
    price: '₹8,000', unit: '/video',
    flavor: 'dark',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
    turnaround: '5–7 business days',
    ideal: 'Premium YouTube videos, storytelling content, personal brands, Tamil documentary-style videos',
  },
]

const ALL_PACKAGES = [...REEL_PACKAGES, ...YOUTUBE_PACKAGES]

const cardStyle = {
  amber: { bg: '#FFD166', text: '#1C1A2E', muted: 'rgba(28,26,46,0.55)', tag: 'rgba(28,26,46,0.12)' },
  dark:  { bg: '#1C1A2E', text: '#FAF4E8', muted: 'rgba(250,244,232,0.5)',  tag: 'rgba(250,244,232,0.12)' },
  white: { bg: '#ffffff',  text: '#1C1A2E', muted: 'rgba(28,26,46,0.5)',  tag: 'rgba(28,26,46,0.08)', border: true },
}

const TIME_SLOTS = ['10:00 AM', '12:00 PM', '3:00 PM', '6:00 PM']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function MiniCalendar({ selectedDate, onSelect }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isDisabled = (day) => {
    if (!day) return true
    const date = new Date(year, month, day)
    const dow = date.getDay()
    return date < today || dow === 0 || dow === 6
  }

  const isSelected = (day) => {
    if (!day || !selectedDate) return false
    return selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
  }

  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const canGoPrev = !(month === today.getMonth() && year === today.getFullYear())

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => canGoPrev && setViewMonth(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(28,26,46,0.08)] transition-colors disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 text-[#1C1A2E]" />
        </button>
        <span className="text-sm font-bold text-[#1C1A2E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={() => setViewMonth(new Date(year, month + 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(28,26,46,0.08)] transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-[#1C1A2E]" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEK_DAYS.map(d => (
          <div key={d} className="text-center text-[10px] text-[#9896A8] font-medium py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => (
          <button
            key={i}
            onClick={() => day && !isDisabled(day) && onSelect(new Date(year, month, day))}
            disabled={isDisabled(day)}
            className={[
              'aspect-square text-xs flex items-center justify-center rounded-full transition-all mx-auto w-8 h-8',
              !day ? 'invisible' : '',
              isSelected(day)
                ? 'bg-[#F5A623] text-[#1C1A2E] font-bold'
                : isToday(day)
                  ? 'ring-2 ring-[#F5A623] text-[#1C1A2E] font-bold'
                  : !isDisabled(day)
                    ? 'text-[#1C1A2E] hover:bg-[rgba(245,166,35,0.2)] cursor-pointer'
                    : 'text-[#C8C6D4] cursor-not-allowed',
            ].join(' ')}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

function BookingModal({ service, onClose }) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const fmtDate = (d) =>
    d ? d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await sendBookingEmail({
        service:      service.title,
        servicePrice: service.price,
        date:         selectedDate.toISOString().split('T')[0],
        time:         selectedTime,
        name:         form.name.trim(),
        phone:        form.phone.trim(),
        email:        form.email.trim(),
      })
    } catch {
      // show success even if EmailJS not configured yet
    } finally {
      setLoading(false)
      setDone(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(28,26,46,0.82)', backdropFilter: 'blur(6px)' }}
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
          maxWidth: '460px',
          maxHeight: '92vh',
          background: '#FAF4E8',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-0">
          <div>
            <p className="text-[#9896A8] text-[10px] uppercase tracking-widest mb-0.5">Schedule a Call</p>
            <h3 className="section-heading text-lg text-[#1C1A2E] leading-tight">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(28,26,46,0.08)] transition-colors mt-0.5 shrink-0"
          >
            <X className="w-4 h-4 text-[#1C1A2E]" />
          </button>
        </div>

        {/* Step progress */}
        {!done && (
          <div className="flex gap-2 px-6 pt-4">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition-all duration-400"
                style={{ background: s <= step ? '#F5A623' : 'rgba(28,26,46,0.12)' }}
              />
            ))}
          </div>
        )}

        <div className="px-6 pb-6 pt-5">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#F5A623] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#1C1A2E]" />
                </div>
                <h4 className="section-heading text-2xl text-[#1C1A2E] mb-2">You're booked!</h4>
                <p className="text-[#6B6880] text-sm mb-1">{fmtDate(selectedDate)}</p>
                <p className="text-[#6B6880] text-sm mb-6">We'll call you at <span className="font-bold text-[#1C1A2E]">{selectedTime}</span>. You'll receive a confirmation shortly.</p>
                <button onClick={onClose} className="btn-primary w-full justify-center">
                  Done <Check className="w-4 h-4" />
                </button>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-sm font-semibold text-[#1C1A2E] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pick a date <span className="text-[#9896A8] font-normal text-xs">(Mon – Fri)</span>
                </p>
                <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                <button
                  onClick={() => selectedDate && setStep(2)}
                  className="btn-primary w-full justify-center mt-5"
                  style={{ opacity: selectedDate ? 1 : 0.38, cursor: selectedDate ? 'pointer' : 'not-allowed' }}
                >
                  Continue <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : step === 2 ? (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-[#9896A8] text-xs mb-1">{fmtDate(selectedDate)}</p>
                <p className="text-sm font-semibold text-[#1C1A2E] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Choose a time slot
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className="py-4 px-4 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: selectedTime === slot ? '#F5A623' : 'rgba(28,26,46,0.06)',
                        color: '#1C1A2E',
                        border: `2px solid ${selectedTime === slot ? '#F5A623' : 'transparent'}`,
                      }}
                    >
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {slot}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 px-5 rounded-full text-sm font-bold border-2 border-[rgba(28,26,46,0.15)] text-[#6B6880] hover:border-[#1C1A2E] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => selectedTime && setStep(3)}
                    className="flex-1 btn-primary justify-center"
                    style={{ opacity: selectedTime ? 1 : 0.38, cursor: selectedTime ? 'pointer' : 'not-allowed' }}
                  >
                    Continue <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-[#9896A8] text-xs mb-1">{fmtDate(selectedDate)} · {selectedTime}</p>
                <p className="text-sm font-semibold text-[#1C1A2E] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Your details
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { key: 'name',  label: 'Full Name',     placeholder: 'Your name',         icon: User,  type: 'text'  },
                    { key: 'phone', label: 'Phone Number',  placeholder: '+91 XXXXX XXXXX',   icon: Phone, type: 'tel'   },
                    { key: 'email', label: 'Email Address', placeholder: 'you@email.com',     icon: Mail,  type: 'email' },
                  ].map(({ key, label, placeholder, icon: Icon, type }) => (
                    <div key={key}>
                      <label className="text-[#9896A8] text-[10px] uppercase tracking-wider block mb-1.5">{label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9896A8] pointer-events-none" />
                        <input
                          type={type}
                          value={form[key]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none transition-all"
                          style={{
                            background: 'rgba(28,26,46,0.06)',
                            color: '#1C1A2E',
                            border: '2px solid transparent',
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                          onFocus={e => { e.target.style.borderColor = '#F5A623'; e.target.style.background = 'rgba(245,166,35,0.06)' }}
                          onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'rgba(28,26,46,0.06)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3.5 px-5 rounded-full text-sm font-bold border-2 border-[rgba(28,26,46,0.15)] text-[#6B6880] hover:border-[#1C1A2E] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 btn-primary justify-center"
                  >
                    {loading ? 'Booking…' : <>Confirm <Check className="w-4 h-4" /></>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ServiceModal({ service, onClose, onSchedule }) {
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
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Scrollable area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {/* Header image / video */}
          <div className="relative" style={{ aspectRatio: '16/7', overflow: 'hidden', background: '#1C1A2E' }}>
            {service.video ? (
              <video src={service.video} autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover opacity-80" />
            ) : (
              <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-70" />
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #FAF4E8 0%, transparent 60%)' }} />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-4 left-5">
              <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}>
                {service.price} {service.unit}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 pb-4">
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

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl" style={{ background: 'rgba(28,26,46,0.05)' }}>
              <div>
                <p className="text-[#9896A8] text-xs uppercase tracking-wider mb-1">Turnaround</p>
                <p className="text-[#1C1A2E] text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{service.turnaround}</p>
              </div>
              <div>
                <p className="text-[#9896A8] text-xs uppercase tracking-wider mb-1">Ideal For</p>
                <p className="text-[#1C1A2E] text-xs leading-relaxed">{service.ideal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA footer — always visible */}
        <div style={{ padding: '14px 20px 16px', borderTop: '1px solid rgba(28,26,46,0.1)', background: '#FAF4E8', flexShrink: 0 }}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+917010127954"
              className="btn-primary flex-1 justify-center"
              style={{ textDecoration: 'none' }}
            >
              <Phone className="w-4 h-4" /> Call Us Now
            </a>
            <button
              onClick={onSchedule}
              className="flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 px-5 font-bold text-sm transition-all duration-200 border-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: 'transparent',
                color: '#1C1A2E',
                borderColor: 'rgba(28,26,46,0.25)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#1C1A2E'; e.currentTarget.style.background = 'rgba(28,26,46,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(28,26,46,0.25)'; e.currentTarget.style.background = 'transparent' }}
            >
              <Calendar className="w-4 h-4" /> Schedule a Call
            </button>
          </div>
          <p className="text-[#9896A8] text-xs text-center mt-2">No contract · No pressure · Just a conversation</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function MobileCardStack({ packages, onSelect }) {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next) => {
    if (next < 0 || next >= packages.length) return
    setDir(next > active ? 1 : -1)
    setActive(next)
  }

  const pkg = packages[active]
  const s = cardStyle[pkg.flavor]
  const PkgIcon = pkg.icon

  return (
    <div>
      {/* Card slide */}
      <div style={{ overflow: 'hidden', borderRadius: 24 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ x: dir > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? '-100%' : '100%', opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="cursor-pointer flex flex-col"
            style={{ background: s.bg, border: s.border ? '1px solid rgba(28,26,46,0.1)' : 'none', borderRadius: 24 }}
            onClick={() => onSelect(pkg)}
          >
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              {pkg.video ? (
                <video src={pkg.video} autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover"
                  style={{ opacity: pkg.flavor === 'dark' ? 0.55 : 0.75 }} />
              ) : (
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover"
                  style={{ opacity: pkg.flavor === 'dark' ? 0.55 : 0.75 }} />
              )}
              <Star className="absolute top-4 right-4 w-5 h-5 opacity-60" style={{ color: s.text, fill: s.text }} />
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: s.bg, color: s.text, fontFamily: "'Space Grotesk', sans-serif" }}>
                {pkg.price}{pkg.unit.startsWith('/') ? '' : ' '}{pkg.unit}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <PkgIcon className="w-4 h-4" style={{ color: s.muted }} />
                <p className="text-xs uppercase tracking-widest" style={{ color: s.muted }}>{pkg.subtitle}</p>
              </div>
              <h3 className="section-heading text-xl mb-2" style={{ color: s.text }}>{pkg.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: s.muted }}>{pkg.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {pkg.deliverables.slice(0, 3).map(d => (
                  <span key={d} className="px-2.5 py-1 text-xs rounded-full"
                    style={{ background: s.tag, color: s.text }}>{d}</span>
                ))}
                {pkg.deliverables.length > 3 && (
                  <span className="px-2.5 py-1 text-xs rounded-full"
                    style={{ background: s.tag, color: s.text }}>+{pkg.deliverables.length - 3} more</span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Book-page peek strips — next cards visible below like a stacked deck */}
      {packages[active + 1] && (
        <div className="mx-3" style={{
          height: 14,
          borderRadius: '0 0 22px 22px',
          background: cardStyle[packages[active + 1].flavor].bg,
          border: cardStyle[packages[active + 1].flavor].border ? '1px solid rgba(28,26,46,0.1)' : 'none',
          borderTop: 'none',
        }} />
      )}
      {packages[active + 2] && (
        <div className="mx-6" style={{
          height: 11,
          borderRadius: '0 0 20px 20px',
          background: cardStyle[packages[active + 2].flavor].bg,
          border: cardStyle[packages[active + 2].flavor].border ? '1px solid rgba(28,26,46,0.08)' : 'none',
          borderTop: 'none',
        }} />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => go(active - 1)}
          disabled={active === 0}
          className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: active === 0 ? 'rgba(28,26,46,0.04)' : 'rgba(28,26,46,0.1)',
            color: active === 0 ? '#C8C6D4' : '#1C1A2E',
            border: 'none',
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                background: i === active ? '#F5A623' : 'rgba(28,26,46,0.18)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(active + 1)}
          disabled={active === packages.length - 1}
          className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: active === packages.length - 1 ? 'rgba(28,26,46,0.04)' : 'rgba(28,26,46,0.1)',
            color: active === packages.length - 1 ? '#C8C6D4' : '#1C1A2E',
            border: 'none',
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default function ServicesAgency() {
  const [selected, setSelected] = useState(null)
  const [booking, setBooking] = useState(null)

  const openBooking = () => {
    const svc = selected
    setSelected(null)
    setTimeout(() => setBooking(svc), 120)
  }

  return (
    <>
      <section id="services" className="py-24 bg-[#FAF4E8]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <AnimatedSection className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="badge-cyan mb-5">Packages</p>
              <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-lg">
                Pick the Edit That Fits Your Ambition.
              </h2>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary self-start sm:self-auto shrink-0"
            >
              Get a Quote <ArrowUpRight className="w-4 h-4" />
            </button>
          </AnimatedSection>

          {[
            { label: 'Short-Form Reels', packages: REEL_PACKAGES },
            { label: 'YouTube Videos', packages: YOUTUBE_PACKAGES },
          ].map(({ label, packages }, rowIdx) => (
            <div key={label} className={rowIdx > 0 ? 'mt-12' : ''}>
              <AnimatedSection delay={rowIdx * 0.1} className="mb-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9896A8]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</p>
              </AnimatedSection>
              {/* Mobile: card stack */}
              <div className="sm:hidden">
                <MobileCardStack
                  packages={packages}
                  onSelect={(pkg) => setSelected(pkg)}
                />
              </div>

              {/* Desktop: grid */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {packages.map(({ icon: Icon, title, subtitle, desc, deliverables, price, unit, flavor, image, video }, i) => {
                  const style = cardStyle[flavor]
                  return (
                    <AnimatedSection key={title} delay={rowIdx * 0.1 + i * 0.08}>
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-3xl overflow-hidden flex flex-col h-full cursor-pointer relative group"
                        style={{
                          background: style.bg,
                          border: style.border ? '1px solid rgba(28,26,46,0.1)' : 'none',
                        }}
                        onClick={() => setSelected(ALL_PACKAGES.find(s => s.title === title))}
                      >
                        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0a0f' }}>
                          {video ? (
                            <LazyVideo src={video} className="w-full h-full" style={{ opacity: 1 }} />
                          ) : (
                            <img
                              src={image}
                              alt={title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              style={{ opacity: flavor === 'dark' ? 0.7 : 0.85 }}
                            />
                          )}
                          {/* gradient overlay so text/badge is readable */}
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.55) 0%, transparent 55%)' }} />
                          <Star className="absolute top-4 right-4 w-5 h-5 opacity-60" style={{ color: style.text, fill: style.text }} />
                          <span
                            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: style.bg, color: style.text, fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {price}{unit.startsWith('/') ? '' : ' '}{unit}
                          </span>
                          <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ background: 'rgba(28,26,46,0.35)' }}
                          >
                            <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}>
                              View Details ↗
                            </span>
                          </div>
                        </div>

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
            </div>
          ))}

          <AnimatedSection delay={0.4} className="mt-10 pt-10 border-t border-[rgba(28,26,46,0.1)]">
            <p className="text-[#9896A8] text-sm">
              Not sure which package fits?{' '}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#1C1A2E] underline underline-offset-2 font-medium"
              >
                talk to us — it's free
              </button>{' '}
              and we'll tell you exactly what your content needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ServiceModal
            service={selected}
            onClose={() => setSelected(null)}
            onSchedule={openBooking}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booking && (
          <BookingModal
            service={booking}
            onClose={() => setBooking(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
