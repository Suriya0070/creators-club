import Hero from '../components/sections/Hero'
import BrandsStrip from '../components/sections/BrandsStrip'
import Stats from '../components/sections/Stats'
import Features from '../components/sections/Features'
import CoursesSection from '../components/sections/CoursesSection'
import Portfolio from '../components/sections/Portfolio'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '../components/ui/AnimatedSection'

function FAQ() {
  const items = [
    { q: 'Do I need any prior experience?', a: 'No! Our Beginner Editing Mastery course starts from absolute zero. If you can use a smartphone, you can start.' },
    { q: 'What software do I need?', a: 'We cover free tools like CapCut and VN for beginners, and professional tools like Premiere Pro and DaVinci Resolve in advanced courses. Free trials are available.' },
    { q: 'Is there a certificate?', a: 'Yes! Every course includes an industry-recognized digital certificate upon completion. You can share it on LinkedIn.' },
    { q: 'Can I get a refund?', a: 'We offer a 7-day money-back guarantee, no questions asked. If you\'re not happy, we\'ll refund you completely.' },
    { q: 'How long do I have access?', a: 'Lifetime access. Once you purchase, the course is yours forever — including all future updates and new lessons.' },
    { q: 'Will I get mentorship?', a: 'Yes! All students get access to our weekly live Q&A sessions and our private Discord community for ongoing mentorship and feedback.' },
  ]
  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <h2 className="section-heading text-4xl sm:text-5xl text-white mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
        </AnimatedSection>
        <div className="space-y-3">
          {items.map(({ q, a }, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <details className="glass glass-hover rounded-2xl group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-heading font-semibold text-white text-base list-none">
                  {q}
                  <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-open:rotate-45 transition-transform duration-200 shrink-0 ml-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-0 text-white/55 text-sm leading-relaxed border-t border-white/5">{a}</div>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#071C2F] via-[#0D3460] to-[#071C2F]" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-cyan-400/15 rounded-full filter blur-[80px]" />
      <AnimatedSection className="relative text-center max-w-3xl mx-auto">
        <h2 className="section-heading text-4xl sm:text-5xl text-white mb-5">
          Your Editing Career<br />Starts <span className="text-gradient">Today</span>
        </h2>
        <p className="text-white/55 text-lg mb-8 max-w-lg mx-auto">
          Join 1,500+ creators who chose to invest in their skills. The best time to start was yesterday. The second best time is now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/courses" className="btn-primary text-base px-8 py-4">
            Start Learning Today <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/register" className="btn-outline text-base px-8 py-4">
            Create Free Account
          </Link>
        </div>
        <p className="text-white/30 text-sm mt-6">No credit card required · 7-day money-back guarantee</p>
      </AnimatedSection>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsStrip />
      <Stats />
      <Features />
      <CoursesSection />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
    </main>
  )
}

