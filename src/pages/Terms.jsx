import { Link } from 'react-router-dom'
import { Play, ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#04121C] text-white">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <nav className="fixed top-4 left-6 z-50">
        <Link to="/" className="inline-flex items-center gap-2 glass text-white/70 px-4 py-2 rounded-full text-sm font-medium hover:text-white hover:border-cyan-400/30 transition-all">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24 relative">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.3)]">
            <Play className="w-4 h-4 fill-current ml-0.5" style={{ color: '#071C2F' }} />
          </div>
          <span className="font-heading font-extrabold text-lg text-white">Creators<span className="text-gradient-pure">Club</span></span>
        </div>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-3">Terms & Conditions</h1>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-10 font-mono">Last updated: January 2025</p>
        <div className="space-y-8 text-white/60 leading-relaxed">
          {[
            { title: '1. Acceptance of Terms', body: 'By accessing and using Creators Club, you accept and agree to be bound by these terms. If you do not agree, please do not use our platform.' },
            { title: '2. Course Access & Purchases', body: 'All courses are available for a one-time purchase price in Indian Rupees (INR). Upon successful payment, you receive lifetime access to the purchased course, including all future updates. Access is non-transferable and for personal use only.' },
            { title: '3. Refund Policy', body: 'We offer a 7-day money-back guarantee for all course purchases. If you are not satisfied within 7 days of purchase and have not completed more than 20% of the course, you may request a full refund by emailing refunds@creatorsclub.in.' },
            { title: '4. Intellectual Property', body: 'All course content, including videos, PDFs, project files, and other materials, is the intellectual property of Creators Club. You may not reproduce, distribute, or create derivative works without written permission.' },
            { title: '5. Content Usage', body: 'Course content is for personal educational use only. You may not resell, share login credentials, or distribute course materials. Violation of this policy will result in immediate account termination without refund.' },
            { title: '6. Certificates', body: 'Certificates are awarded upon successful completion of 100% of the course content. Creators Club certificates are for educational reference and do not guarantee employment or professional licensing.' },
            { title: '7. Governing Law', body: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.' },
            { title: '8. Contact', body: 'For questions regarding these terms, contact us at legal@creatorsclub.in.' },
          ].map(({ title, body }) => (
            <section key={title}>
              <h2 className="font-heading font-bold text-xl text-white mb-3">{title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

