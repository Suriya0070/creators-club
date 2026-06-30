import { ArrowUpRight } from 'lucide-react'

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#F5A623" />
      <rect x="9"  y="13" width="18" height="2.5" rx="1.25" fill="#1C1A2E" />
      <rect x="9"  y="17" width="13" height="2.5" rx="1.25" fill="#1C1A2E" />
      <rect x="9"  y="21" width="16" height="2.5" rx="1.25" fill="#1C1A2E" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}
function YoutubeIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

const LINKS = {
  'Services': [
    { label: 'Reel Editing',          href: '/#services' },
    { label: 'YouTube Documentaries', href: '/#services' },
    { label: '2.5D Motion Graphics',  href: '/#services' },
    { label: 'Brand Films',           href: '/#services' },
  ],
  'Company': [
    { label: 'Our Work',   href: '/#showreel' },
    { label: 'Process',    href: '/#process' },
    { label: 'About',      href: '/#about' },
    { label: 'Contact',    href: '/#contact' },
  ],
  'Legal': [
    { label: 'Privacy Policy',   href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
}

const scrollTo = (href) => {
  if (!href.startsWith('/#')) return
  document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer style={{ background: '#1C1A2E', color: '#FAF4E8' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 32px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(3, 1fr)', gap: 40, marginBottom: 56 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <LogoMark />
              <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: '0.95rem', color: '#FAF4E8', letterSpacing: '0.04em' }}>
                PRMINDS
              </span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(250,244,232,0.5)', lineHeight: 1.7, maxWidth: 240, marginBottom: 24 }}>
              Video editing & motion design studio for creators and brands who want results.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: YoutubeIcon,   href: 'https://youtube.com',   label: 'YouTube'   },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(250,244,232,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(250,244,232,0.5)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F5A623'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(250,244,232,0.5)'; e.currentTarget.style.borderColor = 'rgba(250,244,232,0.15)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,244,232,0.35)', marginBottom: 16 }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('/#') ? (
                      <button
                        onClick={() => scrollTo(href)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(250,244,232,0.55)', transition: 'color 0.2s', textAlign: 'left' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#FAF4E8'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,244,232,0.55)'}
                      >
                        {label}
                      </button>
                    ) : (
                      <a href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(250,244,232,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#FAF4E8'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,244,232,0.55)'}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(250,244,232,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'rgba(250,244,232,0.3)' }}>
            © 2025 PRMinds. All rights reserved.
          </p>
          <button
            onClick={() => scrollTo('/#contact')}
            style={{
              background: '#F5A623', color: '#1C1A2E',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '0.04em',
              padding: '9px 20px', borderRadius: 9999, border: 'none',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'all 0.22s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e8941a'}
            onMouseLeave={e => e.currentTarget.style.background = '#F5A623'}
          >
            START A PROJECT <ArrowUpRight style={{ width: 13, height: 13 }} />
          </button>
        </div>
      </div>
    </footer>
  )
}
