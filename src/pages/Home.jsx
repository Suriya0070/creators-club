import Hero from '../components/sections/Hero'
import WorkSection from '../components/sections/WorkSection'
import ServicesAgency from '../components/sections/ServicesAgency'
import BeforeAfter from '../components/sections/BeforeAfter'
import AgencyTestimonials from '../components/sections/AgencyTestimonials'
import AgencyContact from '../components/sections/AgencyContact'

const STATS = [
  { value: '50+', label: 'Creators Edited' },
  { value: '2M+', label: 'Views Generated' },
  { value: '3 days', label: 'Avg. Delivery' },
  { value: '4.9★', label: 'Client Rating' },
]

function StatsBanner() {
  return (
    <div style={{ background: '#FAF4E8', borderTop: '1px solid rgba(28,26,46,0.07)', borderBottom: '1px solid rgba(28,26,46,0.07)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-6">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '0 24px', borderRight: i < STATS.length - 1 ? '1px solid rgba(28,26,46,0.1)' : 'none' }}>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: '#9896A8', fontFamily: "'DM Sans', sans-serif", marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBanner />
      <WorkSection />
      <ServicesAgency />
      <BeforeAfter />
      <AgencyTestimonials />
      <AgencyContact />
    </main>
  )
}
