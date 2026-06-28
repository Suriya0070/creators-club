import { Link } from 'react-router-dom'
import { Play, ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
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
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink mb-4">Privacy Policy</h1>
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-10">Last updated: January 2025</p>
        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as your name, email address, and payment information when you create an account or make a purchase. We also collect usage data to improve our platform.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">2. How We Use Your Information</h2>
            <p>We use your information to provide and improve our services, process transactions, send you updates about new content, and communicate with you about your account. We do not sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest. We regularly review our security practices to ensure your data remains safe.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@creatorsclub.com.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
