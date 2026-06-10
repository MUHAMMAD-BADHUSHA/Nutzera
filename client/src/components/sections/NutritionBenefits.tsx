'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Zap, Wheat, Heart, Shield, Dumbbell, Ban } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Natural Energy',
    description: 'Sustained energy from whole food ingredients, no crashes.',
    stat: '8hrs',
    statLabel: 'of sustained energy',
    color: '#D4A017',
  },
  {
    icon: Wheat,
    title: 'Rich in Fiber',
    description: 'Digestive health support with natural fiber from nuts and dates.',
    stat: '5g',
    statLabel: 'fiber per bar',
    color: '#1F7A53',
  },
  {
    icon: Heart,
    title: 'Heart Healthy',
    description: 'Omega-3 fatty acids and antioxidants for cardiovascular wellness.',
    stat: '30%',
    statLabel: 'less saturated fat',
    color: '#5BBF6A',
  },
  {
    icon: Shield,
    title: 'Antioxidant Rich',
    description: 'Dark chocolate and nuts provide powerful antioxidant protection.',
    stat: '2x',
    statLabel: 'more antioxidants',
    color: '#0B3D2E',
  },
  {
    icon: Dumbbell,
    title: 'Protein Source',
    description: 'Plant-based protein for muscle maintenance and repair.',
    stat: '9g',
    statLabel: 'protein per bar',
    color: '#1F7A53',
  },
  {
    icon: Ban,
    title: 'No Refined Sugar',
    description: 'Sweetness comes naturally from dates, not refined sugars.',
    stat: '0g',
    statLabel: 'refined sugar',
    color: '#D4A017',
  },
]

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const Icon = benefit.icon

  return (
    <motion.div
      className="group relative w-[300px] shrink-0 md:w-[350px]"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="glass relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative z-10">
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${benefit.color}15` }}
          >
            <Icon className="h-7 w-7" style={{ color: benefit.color }} />
          </div>

          <h3 className="font-display text-xl font-bold text-dark">{benefit.title}</h3>
          <p className="mt-3 text-sm text-text-muted">{benefit.description}</p>

          <div className="mt-6 border-t border-dark/5 pt-6">
            <span
              className="font-display text-4xl font-bold"
              style={{ color: benefit.color }}
            >
              {benefit.stat}
            </span>
            <p className="mt-1 text-xs text-text-muted">{benefit.statLabel}</p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-5 transition-opacity duration-500 group-hover:opacity-10"
          style={{ backgroundColor: benefit.color }}
        />
      </div>
    </motion.div>
  )
}

export function NutritionBenefits() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,61,46,0.02),transparent_50%)]" />

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollAnimation>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                Benefits
              </span>
              <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                Fuel Your{' '}
                <span className="text-gradient">Best Self</span>
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Every bite delivers powerful nutrition for your body and mind.
              </p>
            </div>
          </ScrollAnimation>
        </div>

        <div ref={scrollRef} className="mt-16 overflow-hidden">
          <motion.div
            className="flex gap-6 px-6 pb-4"
            style={{ x }}
          >
            {benefits.map((benefit, i) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-6">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
              <span className="h-1 w-8 rounded-full bg-primary/30" />
              Scroll to explore benefits
              <span className="h-1 w-8 rounded-full bg-primary/30" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
