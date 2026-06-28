import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { authService } from '../services/auth'
import { useToast } from '../hooks/useToast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter your email'); return }
    setLoading(true)
    try {
      await authService.sendPasswordReset(email)
      setSent(true)
      toast.success('Reset link sent to your email!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#070B14]">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-400/8 rounded-full filter blur-[120px]" />
      <div className="noise-overlay" />

      <div className="relative w-full max-w-md px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.4)]">
              <Play className="w-5 h-5 fill-current ml-0.5" style={{ color: '#071C2F' }} />
            </div>
            <span className="font-heading font-extrabold text-xl text-white">Creators<span className="text-gradient-pure">Club</span></span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-3xl p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="font-heading font-bold text-xl text-white mb-2">Check your email</h2>
              <p className="text-white/50 text-sm mb-6">We've sent a password reset link to <strong className="text-white">{email}</strong></p>
              <Link to="/login" className="btn-primary w-full justify-center py-3">Back to Login</Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="font-heading font-extrabold text-2xl text-white mb-1">Reset password</h1>
                <p className="text-white/45 text-sm">Enter your email and we'll send you a reset link</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-10" placeholder="you@example.com" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                  {loading ? <><div className="w-4 h-4 border-2 border-navy-900/40 border-t-navy-900 rounded-full animate-spin" /> Sending...</> : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
          <div className="mt-5 text-center">
            <Link to="/login" className="text-white/40 text-sm hover:text-white/70 flex items-center gap-1.5 justify-center transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
