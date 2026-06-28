import { AnimatedSection } from '../ui/AnimatedSection'

const BRANDS = ['Adobe Premiere', 'DaVinci Resolve', 'After Effects', 'CapCut', 'Final Cut Pro', 'Audition', 'Fusion', 'VN Editor', 'Adobe Premiere', 'DaVinci Resolve', 'After Effects', 'CapCut', 'Final Cut Pro', 'Audition', 'Fusion', 'VN Editor']

export default function BrandsStrip() {
  return (
    <section className="py-14 relative border-y border-white/5">
      <AnimatedSection className="text-center mb-8">
        <p className="text-white/30 text-sm uppercase tracking-widest font-mono">Tools you'll master</p>
      </AnimatedSection>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {BRANDS.map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-5 py-2 glass rounded-full text-sm font-medium text-white/50 shrink-0 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

