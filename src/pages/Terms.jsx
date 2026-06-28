import { Link } from 'react-router-dom'
import { Play, ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink font-body">
      <nav className="fixed top-4 left-6 z-50">
        <Link to="/" className="inline-flex items-center gap-2 bg-surface border border-divider text-ink px-4 py-2 rounded-full text-sm font-medium hover:border-primary/40 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center gap-3 mb-12">
          <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <Play className="h-4 w-4 text-deep ml-0.5" fill="currentColor" strokeWidth={0} />
          </span>
          <span className="font-display font-bold text-xl">Creators Club</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink mb-4">Terms & Conditions</h1>
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-10">Last updated: January 2025</p>
        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Creators Club, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our platform.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">2. Subscription & Payments</h2>
            <p>Creators Club offers monthly and yearly subscription plans. All payments are processed securely. Subscriptions automatically renew unless cancelled before the renewal date. We offer a 14-day money-back guarantee for new members.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">3. Content Usage</h2>
            <p>All content provided through Creators Club is for personal educational use only. You may not redistribute, resell, or share course content with non-members. Downloaded project files are for personal use within your own creative projects.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">4. Cancellation</h2>
            <p>You may cancel your subscription at any time through your account settings. Upon cancellation, you will retain access until the end of your current billing period. No partial refunds are provided for unused portions of a subscription period.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">5. Contact</h2>
            <p>For questions regarding these terms, please contact us at support@creatorsclub.com.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
