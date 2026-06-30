import Hero from '../components/sections/Hero'
import WorkSection from '../components/sections/WorkSection'
import ServicesAgency from '../components/sections/ServicesAgency'
import BeforeAfter from '../components/sections/BeforeAfter'
import WhyUs from '../components/sections/WhyUs'
import ProcessSection from '../components/sections/ProcessSection'
import AgencyTestimonials from '../components/sections/AgencyTestimonials'
import AgencyFAQ from '../components/sections/AgencyFAQ'
import AgencyContact from '../components/sections/AgencyContact'

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkSection />
      <ServicesAgency />
      <BeforeAfter />
      <WhyUs />
      <ProcessSection />
      <AgencyTestimonials />
      <AgencyFAQ />
      <AgencyContact />
    </main>
  )
}
