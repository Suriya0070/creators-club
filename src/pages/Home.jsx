import Hero from '../components/sections/Hero'
import WorkSection from '../components/sections/WorkSection'
import ServicesAgency from '../components/sections/ServicesAgency'
import BeforeAfter from '../components/sections/BeforeAfter'
import AgencyTestimonials from '../components/sections/AgencyTestimonials'
import AgencyContact from '../components/sections/AgencyContact'

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkSection />
      <ServicesAgency />
      <BeforeAfter />
      <AgencyTestimonials />
      <AgencyContact />
    </main>
  )
}
