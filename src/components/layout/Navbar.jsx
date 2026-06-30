import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Work',     href: '/#showreel' },
  { label: 'Services', href: '/#services' },
  { label: 'Process',  href: '/#process' },
  { label: 'About',    href: '/#about' },
  { label: 'Contact',  href: '/#contact' },
]

function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#F5A623" />
      <rect x="9"  y="13" width="18" height="2.5" rx="1.25" fill="#1C1A2E" />
      <rect x="9"  y="17" width="13" height="2.5" rx="1.25" fill="#1C1A2E" />
      <rect x="9"  y="21" width="16" height="2.5" rx="1.25" fill="#1C1A2E" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const handleNav = (href) => {
    setMobileOpen(false)
    if (!href.startsWith('/#')) return
    const id = href.slice(2)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? 'rgba(250,244,232,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(28,26,46,0.08)' : '1px solid transparent',
          transition: 'all 0.4s ease',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <LogoMark />
            <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: '1rem', color: '#1C1A2E', letterSpacing: '0.04em' }}>
              PRMINDS
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                style={{
                  padding: '8px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: 'rgba(28,26,46,0.65)',
                  borderRadius: 8,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#1C1A2E'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,26,46,0.65)'}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            className="hidden md:flex"
            onClick={() => handleNav('/#contact')}
            style={{
              background: '#1C1A2E',
              color: '#FAF4E8',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              padding: '10px 22px',
              borderRadius: 9999,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.color = '#1C1A2E' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1C1A2E'; e.currentTarget.style.color = '#FAF4E8' }}
          >
            BOOK A CALL <ArrowUpRight style={{ width: 14, height: 14 }} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1C1A2E', padding: 6 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 40,
              background: '#FAF4E8',
              borderBottom: '1px solid rgba(28,26,46,0.1)',
              padding: '16px 24px 24px',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '13px 0',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                  fontSize: '1rem', color: '#1C1A2E',
                  borderBottom: '1px solid rgba(28,26,46,0.07)',
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav('/#contact')}
              className="btn-primary"
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
            >
              BOOK A CALL <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
