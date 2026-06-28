import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Play,
  Users,
  Trophy,
  FileVideo,
  MessageSquare,
  Video,
  Star,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Zap,
  BookOpen,
} from 'lucide-react'

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#050508" />
    </svg>
  )
}

function TikTokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z" />
    </svg>
  )
}

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'Community', href: '#community' },
  { label: 'Pricing', href: '#pricing' },
]

const SERVICES = [
  {
    icon: BookOpen,
    title: '260+ Tutorials',
    text: 'Master Premiere Pro and After Effects, from beginner to pro level. Create outstanding Shortform Content that drives real growth.',
  },
  {
    icon: Trophy,
    title: 'Win BIG',
    text: 'Unleash your creativity, get noticed by top brands and compete for incredible prizes with our epic contests.',
  },
  {
    icon: FileVideo,
    title: 'RAW+ Project Files',
    text: 'We provide you with the video files and project files to many of our in-depth Tutorials.',
  },
  {
    icon: Users,
    title: 'Community of 1,500+',
    text: 'Join a thriving community of creators who support and uplift each other worldwide.',
  },
  {
    icon: Video,
    title: 'Live Calls',
    text: 'Join monthly live calls with Keanu & Kaden, get your questions answered, and access recordings anytime.',
  },
  {
    icon: MessageSquare,
    title: 'Feedback by Keanu',
    text: 'Keanu personally answers your questions, providing detailed feedback in the feed and private DMs.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Dmytro',
    since: 'August 2024',
    quote: 'From leveling up my skills to landing brands like Lenovo and Emirates — Creators Club changed everything.',
    full: "Creators Club was the perfect kickstart to develop my own style. Since joining, my life changed completely. I'm now a full-time content creator, working with brands like Lenovo, Emirates, and Oppo.",
    brands: ['Lenovo', 'Emirates', 'Oppo'],
  },
  {
    name: 'Harry',
    since: 'April 2025',
    quote: 'Creators Club gave me the skills, the push, and the network to finally break through.',
    full: "When I joined in April 2025, everything changed. My Instagram started growing again, I landed my dream collab with Lenovo, and I finally mastered 3D tracking. Now with 9K+ followers.",
    brands: ['Lenovo'],
  },
  {
    name: 'Dave',
    since: 'August 2024',
    quote: 'I went from 300 to 30,000 followers in a year — while working with brands like DJI and Adobe.',
    full: "In just one year, I grew from 300 to 30,000 followers and started working with brands like DJI, Adobe, Hohem, and Hollyland — all while traveling the world.",
    brands: ['DJI', 'Adobe', 'Hohem'],
  },
  {
    name: 'Pascal',
    since: 'August 2024',
    quote: 'From zero editing experience to full-time video editor working with Mercedes and Adobe.',
    full: "I joined with zero editing experience. I've already worked with brands like Mercedes and Adobe, became a full-time video editor, and doubled my income. The best part? I can work from anywhere.",
    brands: ['Mercedes', 'Adobe'],
  },
]

const GRID_TESTIMONIALS = [
  { name: 'Dave C.', text: 'Joining Creators Club has been a game-changer for me. The advanced techniques I learned helped me gain over 5 million views in three months and to land a deal with DJI.' },
  { name: 'Roy T.', text: "I've been fortunate to be part of the beta testers team. The level of detail they provide is impressive — some of the best insights into social media video production I've ever seen." },
  { name: 'Jonathan Baker', text: 'Creators Club is insane! 10/10 would recommend. The level of detail this course goes into is second to none, and the techniques Keanu teaches are mind-blowing.' },
  { name: 'Odin Cache', text: "This is the perfect place to learn if you're looking to level up your video skills. Perfect long form tutorials along with an excellent community, all for a great price." },
  { name: 'Milos Stefanovic', text: 'A place where you will surely improve your editing skills and awaken your creativity! All recommendations from me.' },
  { name: 'Michel Boeck', text: "This course has completely transformed my editing skills. I've already learned a lot in After Effects, elevating content for some of my clients to help them stand out." },
]

const FAQ_ITEMS = [
  { q: "What's included in Premiere Pro?", a: "Our Premiere Pro curriculum covers everything from the basics of timeline editing to advanced color grading, audio mixing, and creating viral short-form content. You'll learn the exact workflows used by top creators." },
  { q: "What's included in After Effects?", a: 'After Effects lessons cover motion graphics, 3D tracking, augmented reality editing, talking head animations, and the signature car edit techniques that go viral on social media.' },
  { q: 'Do you need any previous experience?', a: "No experience needed! We have dedicated beginner paths that take you from zero to creating professional content step by step. Advanced creators also find plenty of new techniques to master." },
  { q: 'Where can I view the course?', a: 'All content is available on our platform, accessible from any device — desktop, tablet, or mobile. Stream lessons anytime, anywhere.' },
  { q: 'What programs do you use in your tutorials?', a: 'Our tutorials primarily use Adobe Premiere Pro and Adobe After Effects. We also cover AI tools and other modern creative software to keep you ahead of the curve.' },
  { q: 'When do I get access?', a: 'You get immediate access to all content the moment you join. No waiting — start your first lesson within minutes of signing up.' },
  { q: 'Are your courses for beginner or experienced editors?', a: 'Both! We have structured paths for all skill levels. Beginners get clear step-by-step foundations, while intermediate and advanced creators get high-level techniques and brand-building strategies.' },
  { q: 'Which language are the courses in?', a: 'All courses are in English, making them accessible to creators worldwide.' },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Play className="h-4 w-4 text-deep ml-0.5" fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/60 transition" />
            </span>
            <span className="font-display font-bold tracking-tight text-lg text-white">Creators Club</span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium tracking-tight lift-on-hover text-white/70 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#pricing" className="text-sm font-medium text-white/60 hover:text-white transition px-4 py-2">Login</a>
            <a href="#pricing" className="magnetic-btn inline-flex items-center gap-1.5 bg-primary text-deep px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30">
              Join now <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </a>
          </div>

          <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-full text-white" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div className={`absolute top-0 left-0 right-0 bg-surface rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${open ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">Creators Club</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40"><X className="h-5 w-5 text-ink" /></button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider">{link.label}</a>
            ))}
          </div>
          <a href="#pricing" onClick={() => setOpen(false)} className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-deep px-6 py-4 rounded-full font-semibold w-full">
            Join now <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { y: -20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 })
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-sub', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.85, stagger: 0.12 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=2400&q=80"
          alt="Video editing setup"
          className="w-full h-full object-cover brightness-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep/90 via-deep/60 to-primary/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/10 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '25%', right: '12%', size: 'h-2 w-2', color: 'bg-primary/70', delay: '0s' },
          { top: '45%', right: '7%', size: 'h-1.5 w-1.5', color: 'bg-accent/50', delay: '1.5s' },
          { top: '35%', right: '22%', size: 'h-1 w-1', color: 'bg-primary-light/60', delay: '3s' },
          { top: '60%', right: '18%', size: 'h-2 w-2', color: 'bg-accent/25', delay: '2s' },
          { top: '20%', right: '30%', size: 'h-1 w-1', color: 'bg-white/20', delay: '4s' },
        ].map((p, i) => (
          <div key={i} className={`absolute ${p.size} rounded-full ${p.color} animate-float`} style={{ top: p.top, right: p.right, animationDelay: p.delay }} />
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="hero-badge inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary rounded-full px-4 py-2 text-sm font-mono mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            We're open again! Join Creators Club with 50% off
          </div>

          <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-4xl sm:text-6xl md:text-7xl lg:text-8xl">Master editing.</span>
            <span className="hero-line-2 block font-serif italic font-medium text-primary text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] mt-2" style={{ lineHeight: '0.92' }}>
              Grow an audience.
            </span>
          </h1>

          <p className="hero-sub mx-auto max-w-2xl text-white/65 text-base sm:text-lg mt-8 leading-relaxed">
            Creators Club is the next gen E-Learning platform for everyone who wants to take their editing skills to the next level and connect with like-minded individuals. Unlock your full creative potential.
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#pricing" className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-deep font-bold px-8 py-4 rounded-full shadow-2xl shadow-primary/40 text-base">
              Join now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#courses" className="lift-on-hover inline-flex items-center justify-center gap-2 glass-light text-white border border-white/10 font-medium px-8 py-4 rounded-full text-base">
              <Play className="h-4 w-4 text-primary" fill="currentColor" strokeWidth={0} />
              See courses
            </a>
          </div>

          <div className="hero-meta mt-10 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {['D', 'H', 'P', 'R', 'M'].map((l, i) => (
                <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-deep text-xs font-bold text-deep" style={{ background: `hsl(${i * 60 + 160}, 60%, 55%)` }}>{l}</span>
              ))}
            </div>
            <span className="text-white/50 text-sm font-medium ml-2">+ 1,500 Members</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/25">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Brands Marquee
---------------------------------------------------------------- */
function BrandsMarquee() {
  const brands = ['Adobe', 'DJI', 'Lenovo', 'Emirates', 'Mercedes', 'Hohem', 'Hollyland', 'Oppo', 'Adobe', 'DJI', 'Lenovo', 'Emirates', 'Mercedes', 'Hohem', 'Hollyland', 'Oppo']
  return (
    <section className="py-14 border-y border-divider overflow-hidden">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-8">Brands our creators work with</p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {brands.map((brand, i) => (
            <div key={i} className="mx-10 flex items-center whitespace-nowrap font-display font-bold text-xl text-white/15 hover:text-white/40 transition-colors cursor-default select-none">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Tutorial Shuffler
---------------------------------------------------------------- */
function TutorialShuffler() {
  const items = [
    { tag: 'After Effects', label: 'Augmented Reality Editing', level: 'Advanced' },
    { tag: 'Premiere Pro', label: 'Viral Shortform Blueprints', level: 'All Levels' },
    { tag: 'AI Editing', label: 'AI-Powered Workflow Hacks', level: 'Intermediate' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => { const next = [...prev]; next.unshift(next.pop()); return next })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => (
        <div
          key={item.tag}
          style={{
            transform: `translate(${i * 12}px, ${i * 12}px) scale(${1 - i * 0.05})`,
            zIndex: stack.length - i,
            opacity: 1 - i * 0.25,
            transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.6s ease',
          }}
          className="absolute inset-0 bg-surface border border-divider rounded-3xl p-5 shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">{item.tag}</span>
            <span className="font-mono text-xs text-muted">{item.level}</span>
          </div>
          <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">{item.label}</div>
          <div className="mt-3 flex items-center gap-1.5">
            {Array.from({ length: 24 }).map((_, idx) => (
              <span key={idx} className="h-1 w-1 rounded-full" style={{ background: idx < 24 - i * 6 ? '#00BFA6' : '#1A1A2E' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Film Frame Signature Animation
---------------------------------------------------------------- */
function FilmFrameAnim() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(260)

  const statuses = [
    { text: 'New lesson dropped · After Effects', label: 'Live', tone: 'primary' },
    { text: '3D Tracking masterclass · Module 7', label: 'Featured', tone: 'accent' },
    { text: 'Community challenge live · Enter now', label: 'Contest', tone: 'accent' },
    { text: 'All systems go · Platform online', label: 'Active', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => { const next = (idx + 1) % statuses.length; if (next === 0) setCount((c) => c + 1); return next })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  const drops = [
    { left: '14%', delay: '0.0s', dur: '2.8s' },
    { left: '27%', delay: '1.2s', dur: '3.1s' },
    { left: '40%', delay: '0.7s', dur: '2.6s' },
    { left: '53%', delay: '1.9s', dur: '2.9s' },
    { left: '66%', delay: '0.4s', dur: '3.2s' },
    { left: '79%', delay: '1.5s', dur: '2.7s' },
    { left: '90%', delay: '0.9s', dur: '3.0s' },
  ]

  const ripples = [
    { left: '22%', delay: '0.3s' },
    { left: '50%', delay: '1.1s' },
    { left: '78%', delay: '1.9s' },
  ]

  const status = statuses[statusIdx]
  const toneText = status.tone === 'emerald' ? 'text-emerald-400' : status.tone === 'accent' ? 'text-accent' : 'text-primary'
  const toneDot = status.tone === 'emerald' ? 'bg-emerald-400' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary'

  return (
    <div className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15" style={{ background: 'linear-gradient(180deg, #0A1A18 0%, #061212 70%, #040E0D 100%)' }}>
      <div className="absolute -top-6 -left-4 h-16 w-28 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute top-2 right-8 h-10 w-20 rounded-full bg-primary/10 blur-xl" />

      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Play className="h-3.5 w-3.5 text-primary" fill="currentColor" strokeWidth={0} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Creators Club</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-ink tabular-nums">{count}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">lessons</span>
        </div>
      </div>

      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <rect x="0" y="4" width="400" height="12" rx="3" fill="#00BFA6" fillOpacity="0.15" />
        <rect x="0" y="5" width="400" height="2" fill="#00BFA6" fillOpacity="0.3" />
        {[40, 120, 200, 280, 360].map((x) => (
          <g key={x}>
            <rect x={x - 8} y="1" width="6" height="4" rx="1" fill="#00BFA6" fillOpacity="0.5" />
            <rect x={x - 8} y="15" width="6" height="4" rx="1" fill="#00BFA6" fillOpacity="0.5" />
            <rect x={x - 5} y="7" width="10" height="6" rx="1.5" fill="#33CCBA" fillOpacity="0.25" />
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {drops.map((d, i) => (
          <div key={i} className="absolute top-0" style={{ left: d.left, transform: 'translateX(-50%)', animation: `film-fall ${d.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${d.delay} infinite` }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="#00BFA6" fillOpacity="0.8" />
              <path d="M10 8L16 12L10 16V8Z" fill="#050508" />
            </svg>
          </div>
        ))}
      </div>

      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path d="M 0,6 Q 25,2 50,6 T 100,6 T 150,6 T 200,6" fill="none" stroke="#00BFA6" strokeOpacity="0.4" strokeWidth="1.2" />
      </svg>

      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span key={i} className="absolute top-0 -translate-x-1/2 rounded-full border border-primary/40" style={{ left: r.left, width: '4px', height: '4px', animation: `film-ripple 2.4s ease-out ${r.delay} infinite` }} />
        ))}
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone !== 'emerald' && <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />}
          </span>
          <span key={status.text} className={`font-mono text-[10px] truncate ${toneText}`} style={{ animation: 'film-fadein 0.35s ease-out' }}>{status.text}</span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>{status.label}</span>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Skill Tracker
---------------------------------------------------------------- */
function SkillTracker() {
  const skills = ['Premiere Pro', 'After Effects', 'AI Tools', 'Branding']
  const [step, setStep] = useState(0)
  const activeSkill = 1

  useEffect(() => {
    const interval = setInterval(() => setStep((prev) => (prev + 1) % 5), 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0: return { x: 8, y: 110, opacity: 0 }
      case 1: return { x: 40, y: 55, opacity: 1 }
      case 2: return { x: 40 + activeSkill * 68, y: 55, opacity: 1 }
      case 3: return { x: 40 + activeSkill * 68, y: 55, opacity: 1 }
      case 4: return { x: 120, y: 120, opacity: 1 }
      default: return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-surface border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Skill Progress</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">Week 4</span>
      </div>
      <div className="space-y-2 mb-3">
        {skills.map((skill, idx) => {
          const progress = step >= 3 && idx === activeSkill ? 85 : idx === 0 ? 100 : idx === 2 ? 42 : idx === 3 ? 28 : 65
          return (
            <div key={idx} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-muted w-20 shrink-0 truncate">{skill}</span>
              <div className="flex-1 h-1.5 bg-divider rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${progress}%`,
                  background: step >= 3 && idx === activeSkill ? '#00BFA6' : '#1A1A2E',
                  boxShadow: step >= 3 && idx === activeSkill ? '0 0 8px #00BFA6' : 'none',
                  transition: 'width 0.7s ease, background 0.4s ease',
                }} />
              </div>
              <span className="font-mono text-[9px] text-muted w-7 text-right">{progress}%</span>
            </div>
          )
        })}
      </div>
      <button className={`w-full py-2 rounded-2xl font-medium text-xs transition-all duration-300 ${step === 4 ? 'bg-primary text-deep scale-[1.02] shadow-md shadow-primary/30' : 'bg-divider/40 text-muted'}`}>
        {step >= 3 ? '✓ Lesson complete — keep going!' : 'Continue learning'}
      </button>
      <div className="absolute pointer-events-none transition-all duration-500 ease-out" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, opacity: cursorPos.opacity, transform: step === 3 ? 'scale(0.85)' : 'scale(1)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#F0F0FC" stroke="#00BFA6" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Learn',
      heading: 'Master high-value skills',
      sub: 'After Effects, AI and more',
      text: 'Learn proven editing blueprints and the Skill Stack Method to create content that grabs attention and grows your audience fast.',
      Component: TutorialShuffler,
    },
    {
      eyebrow: '02 / Grow',
      heading: 'Track your progress',
      sub: '260+ lessons and counting',
      text: 'Build a standout creator brand. Skip guesswork and use systems that showcase your unique style and attract dream clients.',
      Component: FilmFrameAnim,
    },
    {
      eyebrow: '03 / Earn',
      heading: 'Turn creativity into income',
      sub: 'Battle-tested roadmap',
      text: 'Follow a proven roadmap to land high-paying collaborations, grow faster than competitors and build a profitable creator career.',
      Component: SkillTracker,
    },
  ]

  return (
    <section id="courses" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Learning high-value skills was never easier</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Master editing.
            <span className="block font-serif italic font-medium text-primary mt-1">Build your future.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article key={idx} className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/30 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight className="h-5 w-5 text-ink/20 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.8} />
              </div>
              <card.Component />
              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-primary text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const startTime = performance.now()
          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(target * eased))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(target)
          }
          requestAnimationFrame(animate)
        }
      })
    }, { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    { n: '01', title: 'Lessons', target: 260, suffix: '+', label: 'in-depth tutorials', desc: 'Master Premiere Pro and After Effects from beginner to pro. Create outstanding Shortform Content that drives real growth.' },
    { n: '02', title: 'Community', target: 1500, suffix: '+', label: 'active members', desc: 'Join a thriving global community of creators who support each other, share knowledge, and celebrate every win together.' },
    { n: '03', title: 'Content', target: 70, suffix: '+', label: 'hours of content', desc: 'Packed with workflow hacks, AI shortcuts, and community challenges — everything to help you leap ahead in weeks, not years.' },
  ]

  return (
    <section ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary mb-5">╱ Everything in one place</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              Numbers that
              <span className="block font-serif italic font-medium text-primary">speak for themselves.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Access 260+ in-depth editing lessons. Get personal feedback, download raw project files, and connect with a thriving global community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article key={i} style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{p.n} / {p.title}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>
              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[5rem] sm:text-[7rem] md:text-[8rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-4xl sm:text-5xl text-primary mb-2 sm:mb-3">{p.suffix}</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>
              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Skill Level Sticky Stack
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=100', endTrigger: cards[cards.length - 1], end: 'top top+=120', scrub: 1 },
          scale: 0.92, filter: 'blur(6px) saturate(0.7)', opacity: 0.5, ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01', title: 'For Beginners', tagline: 'Start with confidence.',
      text: "You'll get a clear, step-by-step guide that breaks down the overwhelming world of editing into manageable, actionable steps. Build confidence and master essential skills without ever feeling lost or intimidated.",
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Beginner creator learning to edit', meta: 'Step 1 / Foundations',
    },
    {
      num: '02', title: 'For Intermediates', tagline: 'Level up your craft.',
      text: "Learn advanced workflows that simplify even the most complex editing tasks, refine your unique style to truly stand out, and build a Creator Brand to position yourself as a top-notch creator ready to attract high-paying opportunities.",
      image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Intermediate video editor', meta: 'Step 2 / Advanced Skills',
    },
    {
      num: '03', title: 'For Advanced Creators', tagline: 'Push your limits.',
      text: "Push your limits with modern techniques like Augmented Reality Editing, highly requested Car edits and Talking Head Animation Edits. Master cutting-edge techniques and stay ahead of the curve with AI-powered workflows.",
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Advanced creator editing', meta: 'Step 3 / Elite Level',
    },
  ]

  return (
    <section id="community" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ No matter where you are</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          The Club meets you there
          <span className="block font-serif italic font-medium text-primary">and helps you rise higher.</span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article key={idx} className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-surface border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5">
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{step.meta}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">Creators Club</span>
                </div>
                <div className="my-12">
                  <span className="font-display font-extrabold text-[6rem] sm:text-[9rem] leading-none text-primary/8 -mb-4 block">{step.num}</span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl text-ink leading-[1.02] tracking-tight">{step.title}</h3>
                  <p className="font-serif italic text-primary text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                </div>
                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>
              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img src={step.image} alt={step.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-deep/20" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-deep/80 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 border border-primary/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Level {step.num}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Services Grid
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Everything you need to grow</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              All in one place,
              <span className="block font-serif italic font-medium text-primary">built for creators.</span>
            </h2>
          </div>
          <p className="text-white/45 max-w-md text-base leading-relaxed">
            Access in-depth editing lessons from Keanu and other top creators. Get personal feedback, raw project files, and connect with a global community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-4xl overflow-hidden">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div key={i} className="svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-colors duration-500 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <a href="#pricing" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-bold px-8 py-4 rounded-full shadow-xl shadow-primary/30">
            Join now <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-white/25 text-sm mt-4 font-mono">+ 1,500 Members</p>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Testimonials
---------------------------------------------------------------- */
function Testimonials() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/6 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Creator results</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Let's see the amazing results
            <span className="block font-serif italic font-medium text-primary">of our creators.</span>
          </h2>
        </div>

        <div className="testimonial-card grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {TESTIMONIALS.map((t, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-4xl border transition-all duration-300 ${active === i ? 'border-primary/40 bg-primary/5 shadow-lg shadow-primary/10' : 'border-divider bg-surface hover:border-primary/20'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-deep" style={{ background: `hsl(${i * 70 + 160}, 60%, 55%)` }}>{t.name[0]}</span>
                  <div>
                    <p className="font-display font-semibold text-ink">{t.name}</p>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Member since {t.since}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="h-3 w-3 text-primary fill-primary" />)}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 bg-surface border border-divider rounded-5xl p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex gap-0.5 mb-8">
                {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="h-5 w-5 text-primary fill-primary" />)}
              </div>
              <p className="font-serif italic text-2xl sm:text-3xl text-ink leading-relaxed mb-8">"{TESTIMONIALS[active].full}"</p>
              <blockquote className="font-display font-semibold text-lg text-primary">"{TESTIMONIALS[active].quote}"</blockquote>
            </div>
            <div className="mt-10 pt-8 border-t border-divider flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="h-12 w-12 rounded-full flex items-center justify-center font-bold text-deep text-lg" style={{ background: `hsl(${active * 70 + 160}, 60%, 55%)` }}>{TESTIMONIALS[active].name[0]}</span>
                <div>
                  <p className="font-display font-semibold text-ink">{TESTIMONIALS[active].name}</p>
                  <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Member since {TESTIMONIALS[active].since}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {TESTIMONIALS[active].brands.map((b) => (
                  <span key={b} className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-full uppercase tracking-widest">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Pricing
---------------------------------------------------------------- */
function Pricing() {
  const [yearly, setYearly] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.price-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const plans = [
    {
      name: 'Creators Club Basic',
      monthly: 9.99,
      original: 19.99,
      features: ['All Basic Courses & Live Call recordings', 'Downloadable Project Files & Footage', 'Join a Global Creative Community', 'Explore the Creator Map worldwide', 'Limited Access to Feed', '14 Days Money-Back Guarantee'],
      cta: 'Join now',
      highlight: false,
    },
    {
      name: 'Creators Club Pro',
      monthly: 49.99,
      original: 99.99,
      features: ['Everything in Basic, and', 'Over 340 episodes and counting', 'Live Calls with Keanu and Experts + Q&A', 'Full access to all Feed features', 'Unlimited Direct & Group Messages', 'Exclusive Pro Member Badge', 'And more features rolling out over time'],
      cta: 'Join now',
      highlight: true,
    },
  ]

  return (
    <section id="pricing" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-2 text-sm font-mono mb-6">
            <Zap className="h-3.5 w-3.5" />
            Limited time — 50% off to celebrate the new platform
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            Simple, transparent
            <span className="block font-serif italic font-medium text-primary">pricing.</span>
          </h2>
          <div className="mt-8 inline-flex items-center gap-1 bg-surface border border-divider rounded-full p-1">
            <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!yearly ? 'bg-primary text-deep shadow' : 'text-muted'}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${yearly ? 'bg-primary text-deep shadow' : 'text-muted'}`}>Yearly <span className="text-xs opacity-70 ml-1">Save 20%</span></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className={`price-card relative rounded-5xl p-8 sm:p-10 border transition-all duration-300 ${plan.highlight ? 'border-primary/40 bg-surface shadow-2xl shadow-primary/15' : 'border-divider bg-surface/50'}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-deep text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>
              )}
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4">{plan.name}</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-display font-extrabold text-5xl sm:text-6xl text-ink">${yearly ? (plan.monthly * 0.8).toFixed(2) : plan.monthly}</span>
                <span className="text-muted mb-2">/ month</span>
              </div>
              <p className="font-mono text-sm text-muted line-through mb-8">Was ${plan.original}/month</p>
              <ul className="space-y-3 mb-10">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href="#" className={`magnetic-btn flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold transition-all ${plan.highlight ? 'bg-primary text-deep shadow-lg shadow-primary/30' : 'bg-surface border border-divider text-ink hover:border-primary/40'}`}>
                {plan.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-muted text-sm mt-8 font-mono">14-day money-back guarantee · Cancel anytime</p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Personal Message
---------------------------------------------------------------- */
function PersonalMessage() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.msg-content > *', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-28 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative max-w-4xl mx-auto msg-content">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ A note from Keanu</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
          Wow, we came
          <span className="block font-serif italic font-medium text-primary">a long way...</span>
        </h2>

        <div className="mt-12 bg-surface/40 border border-divider rounded-5xl p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-14 w-14 rounded-full bg-primary flex items-center justify-center font-display font-bold text-deep text-xl">K</span>
            <div>
              <p className="font-display font-bold text-ink text-lg">Keanu</p>
              <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Founder, Creators Club</p>
            </div>
          </div>
          <div className="space-y-5 text-white/60 text-base sm:text-lg leading-relaxed">
            <p>Hey everyone,</p>
            <p>Just a quick note from my side. I'm so thankful to do what I love every day. You all have helped me so much on my journey, and I want to support you as much as I can.</p>
            <p>I hope through Creators Club you can achieve your goals step by step and show the world your creativity. You'll surely have an amazing time learning the most fun and incredible skill (in my opinion haha) and sharing it with the community.</p>
            <p>Together, we can shape the future of content creation and have a big impact on what's coming next.</p>
            <p className="text-white font-medium">Thank you for being part of this journey.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-divider">
            <a href="#pricing" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-bold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30">
              Join now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Grid Testimonials
---------------------------------------------------------------- */
function GridTestimonials() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gtestimonial', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ What our members say</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-4 leading-tight tracking-tight">Real results, real creators.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GRID_TESTIMONIALS.map((t, i) => (
            <div key={i} className="gtestimonial bg-surface border border-divider rounded-4xl p-6 hover:border-primary/30 transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="h-3.5 w-3.5 text-primary fill-primary" />)}
              </div>
              <p className="text-muted text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-divider">
                <span className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-deep text-sm" style={{ background: `hsl(${i * 50 + 140}, 55%, 55%)` }}>{t.name[0]}</span>
                <span className="font-display font-semibold text-ink text-sm">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <a href="#pricing" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-bold px-8 py-4 rounded-full shadow-xl shadow-primary/30">
            Join now <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-muted text-sm mt-4 font-mono">+ 1,500 Members</p>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   FAQ
---------------------------------------------------------------- */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ FAQ</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-ink mt-4 leading-tight tracking-tight">Everything you want to know.</h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`faq-item border rounded-3xl overflow-hidden transition-all duration-300 ${openIdx === i ? 'border-primary/30 bg-primary/5' : 'border-divider bg-surface/30 hover:border-primary/20'}`}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-display font-semibold text-ink pr-4">{item.q}</span>
                <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-64' : 'max-h-0'}`}>
                <p className="px-6 pb-6 text-muted leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Save Years CTA
---------------------------------------------------------------- */
function SaveYears() {
  return (
    <section className="relative py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
      <div className="relative max-w-4xl mx-auto text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Save yourself years of effort</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-ink mt-6 leading-[1.02] tracking-tight">
          Why spend years stuck
          <span className="block font-serif italic font-medium text-primary">in trial and error?</span>
        </h2>
        <p className="text-muted text-lg sm:text-xl mt-8 leading-relaxed max-w-2xl mx-auto">
          With the Creators Club Method, you'll learn proven shortcuts for viral editing, finding high-paying clients, and building your brand — without burnout or confusion.
        </p>
        <p className="text-ink font-medium text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Ready to take control, earn more, and grow as a creator faster? Join now and go from posting in the dark to becoming the creator everyone notices.
        </p>
        <div className="mt-12">
          <a href="#pricing" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-bold px-10 py-5 rounded-full shadow-2xl shadow-primary/40 text-lg">
            Join now <ArrowRight className="h-5 w-5" />
          </a>
        </div>
        <p className="text-muted text-sm mt-6 font-mono">+ 1,500 Members · 14-Day Money-Back Guarantee</p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[32rem] rounded-full bg-primary/12 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-14 mb-14">
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[0.92] tracking-tight">
            Start your
            <span className="font-serif italic font-medium text-primary block">creator journey.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/35 max-w-md">Creators Club — the next gen E-Learning platform for video editors and content creators worldwide.</p>
            <a href="#pricing" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-bold px-7 py-3.5 rounded-full self-start sm:self-auto">
              Join now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <Play className="h-4 w-4 text-deep ml-0.5" fill="currentColor" strokeWidth={0} />
              </span>
              <span className="font-display font-bold text-lg">Creators Club</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">Master editing. Grow an audience. Work with your dream clients.</p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition">
                <InstagramIcon className="h-4 w-4 text-white/50" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition">
                <TikTokIcon className="h-4 w-4 text-white/50" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition">
                <YoutubeIcon className="h-4 w-4 text-white/50" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Platform</p>
            <ul className="space-y-2.5">
              {['Courses', 'Community', 'Live Calls', 'Project Files'].map((l) => (
                <li key={l}><a href="#courses" className="text-white/45 hover:text-primary transition text-sm">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Company</p>
            <ul className="space-y-2.5">
              {['About', 'Pricing', 'Results', 'FAQ'].map((l) => (
                <li key={l}><a href="#" className="text-white/45 hover:text-primary transition text-sm">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Legal</p>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-white/45 hover:text-primary transition text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/45 hover:text-primary transition text-sm">Terms & Conditions</Link></li>
              <li><a href="#" className="text-white/45 hover:text-primary transition text-sm">Refund Policy</a></li>
              <li><a href="#" className="text-white/45 hover:text-primary transition text-sm">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Platform Online · Ready to join</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/25 text-xs font-mono">
            <span>Site Notice</span>
            <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms & Conditions</Link>
            <span>© 2025 Creators Club GmbH</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App Root
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <BrandsMarquee />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <Testimonials />
        <Pricing />
        <PersonalMessage />
        <GridTestimonials />
        <FAQ />
        <SaveYears />
      </main>
      <Footer />
    </div>
  )
}
