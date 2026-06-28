import { Link } from 'react-router-dom'
import { Play, ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
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
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-3">Privacy Policy</h1>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-10 font-mono">Last updated: January 2025</p>
        <div className="space-y-8 text-white/60 leading-relaxed">
          {[
            { title: '1. Information We Collect', body: 'We collect information you provide directly, such as name, email address, phone number, and payment information when you register or purchase a course. We also collect usage data including pages visited, course progress, and device information.' },
            { title: '2. How We Use Your Information', body: 'We use your information to provide and improve our services, process payments, send course updates and receipts, communicate about new courses and promotions (with your consent), and ensure platform security.' },
            { title: '3. Data Security', body: 'We implement industry-standard security measures to protect your data. All payment information is processed through secure, PCI-compliant payment processors. We never store your full payment card details.' },
            { title: '4. Cookies', body: 'We use cookies to maintain your login session, remember your preferences, and analyze platform usage to improve your experience. You can disable cookies in your browser settings, though some features may not function correctly.' },
            { title: '5. Your Rights', body: 'You have the right to access, update, or delete your personal information. You can manage your data through your account settings or contact us at privacy@creatorsclub.in.' },
            { title: '6. Contact', body: 'For privacy-related inquiries, contact us at privacy@creatorsclub.in or +91 98765 43210.' },
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
