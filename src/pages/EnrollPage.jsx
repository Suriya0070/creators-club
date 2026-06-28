import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowLeft, CheckCircle, Clock, BookOpen, Award, CreditCard, Smartphone, Globe, TrendingUp, Lock, ChevronDown, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../hooks/useToast'
import { getCourseBySlug } from '../data/courses'

const PAYMENT_TABS = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: Globe },
  { id: 'emi', label: 'EMI', icon: TrendingUp },
]

const BANKS = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank']

const EMI_PLANS = (price) => [
  { months: 3, label: '3 months', monthly: Math.ceil(price / 3), extra: 0 },
  { months: 6, label: '6 months', monthly: Math.ceil((price * 1.05) / 6), extra: 5 },
  { months: 9, label: '9 months', monthly: Math.ceil((price * 1.1) / 9), extra: 10 },
  { months: 12, label: '12 months', monthly: Math.ceil((price * 1.15) / 12), extra: 15 },
]

function UPIForm({ onPay, loading }) {
  const [upiId, setUpiId] = useState('')
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={e => setUpiId(e.target.value)}
          className="input-field"
          placeholder="yourname@upi"
        />
        <p className="text-white/30 text-xs mt-1">e.g. 9876543210@paytm, name@okaxis</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
          <button key={app} onClick={() => setUpiId(`${app.toLowerCase()}@upi`)} className="text-xs px-3 py-1.5 rounded-lg glass border border-white/10 text-white/50 hover:text-white hover:border-cyan-400/30 transition-all">
            {app}
          </button>
        ))}
      </div>
      <button onClick={() => onPay(upiId)} disabled={!upiId || loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
        {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying...</> : <>Pay via UPI <ArrowRight className="w-4 h-4" /></>}
      </button>
    </div>
  )
}

function CardForm({ onPay, loading }) {
  const [form, setForm] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const formatCard = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = v => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Card Number</label>
        <input type="text" value={form.number} onChange={e => setForm(p => ({ ...p, number: formatCard(e.target.value) }))} className="input-field font-mono tracking-widest" placeholder="1234 5678 9012 3456" maxLength={19} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Name on Card</label>
        <input type="text" value={form.name} onChange={set('name')} className="input-field" placeholder="ARYAN SHARMA" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Expiry</label>
          <input type="text" value={form.expiry} onChange={e => setForm(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} className="input-field" placeholder="MM/YY" maxLength={5} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">CVV</label>
          <input type="password" value={form.cvv} onChange={set('cvv')} className="input-field" placeholder="•••" maxLength={4} />
        </div>
      </div>
      <button onClick={() => onPay(form)} disabled={!form.number || !form.name || !form.expiry || !form.cvv || loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
        {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</> : <>Pay Securely <Lock className="w-4 h-4" /></>}
      </button>
    </div>
  )
}

function NetBankingForm({ onPay, loading }) {
  const [bank, setBank] = useState('')
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Select Your Bank</label>
        <div className="relative">
          <select value={bank} onChange={e => setBank(e.target.value)} className="input-field appearance-none pr-10 cursor-pointer">
            <option value="">— Choose a bank —</option>
            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {BANKS.slice(0, 4).map(b => (
          <button key={b} onClick={() => setBank(b)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${bank === b ? 'border-cyan-400/40 text-cyan-400 bg-cyan-400/10' : 'glass border-white/10 text-white/50 hover:text-white'}`}>
            {b}
          </button>
        ))}
      </div>
      <button onClick={() => onPay(bank)} disabled={!bank || loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
        {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Redirecting...</> : <>Continue to {bank || 'Bank'} <ArrowRight className="w-4 h-4" /></>}
      </button>
    </div>
  )
}

function EMIForm({ price, onPay, loading }) {
  const plans = EMI_PLANS(price)
  const [selected, setSelected] = useState(0)
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {plans.map((plan, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${selected === i ? 'border-cyan-400/50 bg-cyan-400/8' : 'glass border-white/10 hover:border-white/20'}`}
          >
            <div>
              <div className="font-semibold text-white text-sm">{plan.label}</div>
              <div className="text-white/40 text-xs mt-0.5">₹{plan.monthly.toLocaleString('en-IN')}/month{plan.extra ? ` · ${plan.extra}% convenience fee` : ' · No extra cost'}</div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === i ? 'border-cyan-400' : 'border-white/30'}`}>
              {selected === i && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
            </div>
          </button>
        ))}
      </div>
      <p className="text-white/30 text-xs">EMI will be auto-deducted from your registered card/bank account.</p>
      <button onClick={() => onPay(plans[selected])} disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
        {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</> : <>Start EMI — ₹{plans[selected].monthly.toLocaleString('en-IN')}/mo <ArrowRight className="w-4 h-4" /></>}
      </button>
    </div>
  )
}

function SuccessScreen({ course, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
      style={{ background: '#0C0003' }}
    >
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(255,34,34,0.1) 0%, transparent 70%)' }} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8 relative"
        style={{ background: 'linear-gradient(135deg, #FF2222, #CC0000)', boxShadow: '0 0 60px rgba(255,34,34,0.4)' }}
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-4">Enrollment Confirmed!</h1>
        <p className="text-white/60 text-lg mb-2">You're now enrolled in</p>
        <p className="text-gradient-pure font-heading font-bold text-2xl mb-8">{course.title}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/40 mb-10">
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Lifetime Access</span>
          <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-400" /> Certificate Included</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan-400" /> {course.duration}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="btn-primary px-8 py-3.5">
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          <Link to="/" className="btn-outline px-8 py-3.5">Back to Home</Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EnrollPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { enrollCourse } = useAuth()
  const toast = useToast()
  const course = getCourseBySlug(slug)
  const [activeTab, setActiveTab] = useState('upi')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#0C0003' }}>
        <p className="text-white/50 text-lg">Course not found.</p>
        <Link to="/courses" className="btn-primary px-6 py-3">Browse Courses</Link>
      </div>
    )
  }

  if (success) return <SuccessScreen course={course} navigate={navigate} />

  const handlePay = async (paymentData) => {
    if (!paymentData) return
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 1200))
      await enrollCourse(course.id)
      setSuccess(true)
      toast.success(`Enrolled in ${course.title}!`)
    } catch {
      toast.error('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const discount = Math.round((1 - course.price / course.originalPrice) * 100)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0C0003' }}>
      <div className="absolute inset-0 grid-bg opacity-20" style={{ position: 'fixed' }} />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(255,34,34,0.07) 0%, transparent 70%)' }} />
      <div className="noise-overlay" />

      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current text-white" />
            </div>
            <span className="font-heading font-extrabold text-base text-white">Creators<span className="text-gradient-pure">Club</span></span>
          </Link>
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </header>

      <div className="relative flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left — Course Summary */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-1">Complete your enrollment</h1>
              <p className="text-white/40 text-sm">You're one step away from transforming your skills.</p>
            </div>

            {/* Course card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl overflow-hidden">
              <div className="relative h-44 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}40` }}>
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-heading font-bold text-xl text-white mb-1">{course.title}</h2>
                <p className="text-white/45 text-sm mb-4 leading-relaxed">{course.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center glass rounded-xl p-2.5">
                    <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                    <div className="text-white text-xs font-bold">{course.duration}</div>
                    <div className="text-white/30 text-[10px]">Duration</div>
                  </div>
                  <div className="text-center glass rounded-xl p-2.5">
                    <BookOpen className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                    <div className="text-white text-xs font-bold">{course.lessons}</div>
                    <div className="text-white/30 text-[10px]">Lessons</div>
                  </div>
                  <div className="text-center glass rounded-xl p-2.5">
                    <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <div className="text-white text-xs font-bold">Certificate</div>
                    <div className="text-white/30 text-[10px]">Included</div>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {course.outcomes.slice(0, 4).map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />{o}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Mentor */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 flex items-center gap-4">
              <img src={course.mentorAvatar} alt={course.mentor} className="w-12 h-12 rounded-full object-cover border border-cyan-400/20 shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm">{course.mentor}</div>
                <div className="text-white/40 text-xs">{course.mentorRole}</div>
              </div>
            </motion.div>

            {/* Guarantees */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-green-400" /> Secure payment</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> 7-day money-back</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-amber-400" /> Industry certificate</span>
            </motion.div>
          </div>

          {/* Right — Payment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 lg:sticky lg:top-24"
          >
            <div className="glass rounded-2xl overflow-hidden">
              {/* Price summary */}
              <div className="p-5 border-b border-white/5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-heading font-extrabold text-3xl text-white">₹{course.price.toLocaleString('en-IN')}</span>
                  <span className="text-white/30 text-base line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-sm font-semibold">{discount}% OFF</span>
                  <span className="text-white/30 text-xs">· Limited time offer</span>
                </div>
              </div>

              {/* Payment tabs */}
              <div className="p-5">
                <div className="grid grid-cols-4 gap-1 mb-5 glass rounded-xl p-1">
                  {PAYMENT_TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-cyan-400 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'upi' && <UPIForm onPay={handlePay} loading={loading} />}
                    {activeTab === 'card' && <CardForm onPay={handlePay} loading={loading} />}
                    {activeTab === 'netbanking' && <NetBankingForm onPay={handlePay} loading={loading} />}
                    {activeTab === 'emi' && <EMIForm price={course.price} onPay={handlePay} loading={loading} />}
                  </motion.div>
                </AnimatePresence>

                <p className="text-center text-white/25 text-xs mt-4 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" /> 256-bit SSL encrypted · RBI approved
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
