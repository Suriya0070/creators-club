import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Play, LogOut, User, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../hooks/useToast'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const toast = useToast()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    setUserMenuOpen(false)
    navigate('/')
  }

  const handleHashLink = (href) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.getElementById(href.slice(2))
          el?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        const el = document.getElementById(href.slice(2))
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,217,255,0.6)] transition-all duration-300">
              <Play className="w-4 h-4 text-navy-900 fill-current ml-0.5" />
            </div>
            <span className="font-heading font-extrabold text-lg text-white">
              Creators<span className="text-gradient-pure">Club</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.href}
                  onClick={() => handleHashLink(link.href)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.href
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 glass rounded-full px-3 py-1.5 hover:border-cyan-400/30 transition-all duration-200"
                >
                  <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-sm font-medium text-white/90">{user?.name?.split(' ')[0]}</span>
                  <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 glass-strong rounded-xl shadow-xl overflow-hidden"
                    >
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-cyan-400" /> Dashboard
                      </Link>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                        <User className="w-4 h-4 text-cyan-400" /> Profile
                      </Link>
                      <div className="border-t border-white/5" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors">
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm py-2 px-5">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden glass p-2 rounded-xl text-white/80 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass-strong border-t border-white/5 overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {NAV_LINKS.map((link) => (
                link.href.startsWith('/#') ? (
                  <button
                    key={link.href}
                    onClick={() => { handleHashLink(link.href); setMobileOpen(false) }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="pt-3 space-y-2 border-t border-white/5">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="btn-outline w-full justify-center text-sm py-2.5">Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-sm text-red-400 hover:text-red-300 py-2">Log Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-outline w-full justify-center text-sm py-2.5">Login</Link>
                    <Link to="/register" className="btn-primary w-full justify-center text-sm py-2.5">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

