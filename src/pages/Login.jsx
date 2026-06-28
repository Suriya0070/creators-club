import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Play, ArrowRight, Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../hooks/useToast'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const { login, loading } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    try {
      await login(form)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#070B14]">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-400/8 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full filter blur-[100px]" />
      <div className="noise-overlay" />

      <div className="relative w-full max-w-md px-4 py-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-10"
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.4)]">
              <Play className="w-5 h-5 text-navy-900 fill-current ml-0.5" />
            </div>
            <span className="font-heading font-extrabold text-xl text-white">
              Creators<span className="text-gradient-pure">Club</span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-3xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        >
          <div className="text-center mb-8">
            <h1 className="font-heading font-extrabold text-2xl text-white mb-1">Welcome back</h1>
            <p className="text-white/45 text-sm">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className={`input-field pl-10 ${errors.email ? 'border-red-500/60' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500/60' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 mt-2"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-navy-900/40 border-t-navy-900 rounded-full animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>

        <p className="text-center text-white/20 text-xs mt-8">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="hover:text-white/40 transition-colors">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
