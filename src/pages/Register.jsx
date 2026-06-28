import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Play, ArrowRight, User, Mail, Lock, Phone, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../hooks/useToast'

const PERKS = ['Lifetime access to courses', 'Industry certificate', 'Private Discord community', '7-day money-back guarantee']

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const [agreed, setAgreed] = useState(false)
  const { register, loading } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Enter a valid 10-digit Indian number'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    if (!agreed) e.agreed = 'You must agree to the terms'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    try {
      await register({ name: form.name, email: form.email, password: form.password, phone: form.phone })
      toast.success('Account created! Welcome to Creators Club ðŸŽ¬')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5'
  const iconCls = 'absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30'

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#0C0003]">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full" style={{ background: 'rgba(255,34,34,0.18)', filter: 'blur(110px)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full" style={{ background: 'rgba(200,0,0,0.14)', filter: 'blur(90px)' }} />
      <div className="noise-overlay" />

      <div className="relative w-full max-w-lg px-4 py-20">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(255,34,34,0.35)]">
              <Play className="w-5 h-5 fill-current ml-0.5" style={{ color: '#071C2F' }} />
            </div>
            <span className="font-heading font-extrabold text-xl text-white">Creators<span className="text-gradient-pure">Club</span></span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-3xl p-8">
          <div className="text-center mb-6">
            <h1 className="font-heading font-extrabold text-2xl text-white mb-1">Create your account</h1>
            <p className="text-white/45 text-sm">Start your professional editing journey today</p>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {PERKS.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-white/50">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />{p}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className={labelCls}>Full Name *</label>
              <div className="relative">
                <User className={iconCls} />
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  className={`input-field pl-10 ${errors.name ? 'border-red-500/60' : ''}`}
                  placeholder="Aryan Sharma"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className={labelCls}>Email *</label>
              <div className="relative">
                <Mail className={iconCls} />
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  className={`input-field pl-10 ${errors.email ? 'border-red-500/60' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>Phone (optional)</label>
              <div className="relative">
                <Phone className={iconCls} />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  className={`input-field pl-10 ${errors.phone ? 'border-red-500/60' : ''}`}
                  placeholder="+91 98765 43210"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className={labelCls}>Password *</label>
              <div className="relative">
                <Lock className={iconCls} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500/60' : ''}`}
                  placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className={labelCls}>Confirm Password *</label>
              <div className="relative">
                <Lock className={iconCls} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={set('confirm')}
                  className={`input-field pl-10 ${errors.confirm ? 'border-red-500/60' : ''}`}
                  placeholder="Re-enter password"
                />
              </div>
              {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div
                  onClick={() => setAgreed(v => !v)}
                  className={`w-4 h-4 mt-0.5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${agreed ? 'bg-cyan-400 border-cyan-400' : 'border-white/30'}`}
                >
                  {agreed && <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#071C2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="text-xs text-white/45 leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-cyan-400 hover:underline">Terms & Conditions</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreed && <p className="text-red-400 text-xs mt-1">{errors.agreed}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 mt-1"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-[#071C2F]/40 border-t-[#071C2F] rounded-full animate-spin" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-white/40 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

