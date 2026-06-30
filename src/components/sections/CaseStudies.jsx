import { motion } from 'framer-motion'
import { AnimatedSection } from '../ui/AnimatedSection'

const CASES = [
  {
    client: 'Documentary Channel', project: 'Shell & Nigeria Documentary', type: 'Documentary · 18 min',
    image: 'https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=800&q=80',
    challenge: 'The client had 6 hours of raw interview footage, archival material and field b-roll but no clear narrative structure. Previous editor had quit mid-project.',
    solution: 'We built a 3-act narrative arc, layered archival footage with field sequences, added motion-graphic maps and delivered a professional colour grade with immersive sound design.',
    result: '280K+ organic views, featured by the parent network, and re-broadcast on a regional TV channel — all without paid promotion.',
    metrics: [{ label: 'Organic Views', value: '280K+' }, { label: 'Completion Rate', value: '64%' }, { label: 'Delivery', value: '8 days' }],
  },
  {
    client: 'Fitness Personal Brand', project: '12-Reel Monthly Retainer', type: 'Short-Form · Instagram & YouTube',
    image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&q=80',
    challenge: 'Creator was spending 12+ hours per week editing their own content, leading to burnout and inconsistent posting. Engagement was declining.',
    solution: 'We took over all editing — hook scripting review, fast-cut edits, branded captions, trending audio sync and thumbnail design for each reel.',
    result: 'Avg. 85% watch-through rate. Creator freed 50+ hours/month and grew from 18K to 45K followers in 4 months.',
    metrics: [{ label: 'Watch-Through', value: '85%' }, { label: 'Follower Growth', value: '18K→45K' }, { label: 'Hrs Saved/Mo', value: '50+' }],
  },
  {
    client: 'Tech Start-up', project: 'SaaS Product Explainer', type: 'Motion Graphics · 2.5D Animation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    challenge: 'Start-up needed a 90-second explainer that communicated a complex AI workflow to non-technical investors. Previous attempts felt robotic and corporate.',
    solution: '2.5D parallax scenes, kinetic typography and a character-led narrative brought the product to life. We scripted, storyboarded and animated in 10 working days.',
    result: 'Used in seed funding pitch deck. Investors cited the video as one of the reasons they found the product immediately understandable. Round closed.',
    metrics: [{ label: 'Pitch Success', value: 'Funded' }, { label: 'Production', value: '10 days' }, { label: 'Investor Shares', value: '3×' }],
  },
]

export default function CaseStudies() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <AnimatedSection className="mb-14">
          <p className="badge-cyan mb-5">Case Studies</p>
          <h2 className="section-heading text-[clamp(2.5rem,5vw,4rem)] text-[#1C1A2E] max-w-xl">
            Real Projects, Real Results
          </h2>
        </AnimatedSection>

        <div className="divide-y divide-[rgba(28,26,46,0.1)]">
          {CASES.map((c, i) => (
            <AnimatedSection key={c.project} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="py-12 grid sm:grid-cols-[1fr_2fr] gap-10 group"
              >
                {/* Left */}
                <div>
                  <div className="relative overflow-hidden rounded-2xl mb-4" style={{ aspectRatio: '4/3' }}>
                    <img src={c.image} alt={c.project} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: '#F5A623', color: '#1C1A2E', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {c.type.split(' · ')[0]}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#9896A8] text-xs uppercase tracking-widest mb-1">{c.type}</p>
                  <p className="text-[#1C1A2E] text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.client}</p>
                </div>

                {/* Right */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="section-heading text-2xl text-[#1C1A2E] mb-8">{c.project}</h3>
                    <div className="space-y-5">
                      {[{ label: 'Challenge', text: c.challenge }, { label: 'Solution', text: c.solution }, { label: 'Result', text: c.result }].map(({ label, text }) => (
                        <div key={label} className="grid grid-cols-[80px_1fr] gap-4">
                          <span className="text-[#9896A8] text-xs uppercase tracking-widest pt-0.5">{label}</span>
                          <p className="text-[#6B6880] text-sm leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-8 mt-8 pt-8 border-t border-[rgba(28,26,46,0.1)]">
                    {c.metrics.map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-2xl font-bold text-[#1C1A2E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
                        <div className="text-[#9896A8] text-xs uppercase tracking-widest mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
