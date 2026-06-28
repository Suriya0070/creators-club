import { useEffect, useRef, useState } from 'react'
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '../ui/AnimatedSection'
import { STATS } from '../../data/testimonials'

function CountUp({ target, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const start = performance.now()
        const animate = (now) => {
          const elapsed = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - elapsed, 3)
          setCount(+(target * ease).toFixed(decimals))
          if (elapsed < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, decimals])

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071C2F]/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <AnimatedGroup className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <AnimatedItem key={i}>
              <div className="glass glass-hover rounded-2xl p-6 text-center group">
                <div className="section-heading text-4xl sm:text-5xl text-gradient-pure mb-1">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                </div>
                <div className="font-heading font-semibold text-white text-sm mb-1">{stat.label}</div>
                <div className="text-white/40 text-xs">{stat.description}</div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
