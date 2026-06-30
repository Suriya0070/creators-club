import Hero from '../components/sections/Hero'
import Showreel from '../components/sections/Showreel'
import ClientTypes from '../components/sections/ClientTypes'
import FeaturedWork from '../components/sections/FeaturedWork'
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
      <Showreel />
      <ClientTypes />
      <FeaturedWork />
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
