'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Sprout, Search, Cog, Package, Truck } from 'lucide-react'

const stages = [
  {
    icon: Sprout,
    title: 'Farm',
    description: 'Sourced from premium farms known for exceptional quality dates and nuts.',
    color: '#5BBF6A',
  },
  {
    icon: Search,
    title: 'Selection',
    description: 'Handpicked ingredients undergo rigorous quality testing for purity.',
    color: '#1F7A53',
  },
  {
    icon: Cog,
    title: 'Processing',
    description: 'Small-batch crafting preserves natural flavors and nutritional value.',
    color: '#D4A017',
  },
  {
    icon: Package,
    title: 'Packaging',
    description: 'Eco-friendly packaging locks in freshness while protecting our planet.',
    color: '#0B3D2E',
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'Direct to your doorstep, maintaining peak freshness and quality.',
    color: '#1F7A53',
  },
]

export function ProductJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,61,46,0.02),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <ScrollAnimation>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Our Process
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              From Farm to <span className="text-gradient">Bar</span>
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Every step is crafted with care to deliver the best nutrition.
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-[2px] bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-primary-accent to-primary"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="relative space-y-16 md:space-y-24">
            {stages.map((stage, i) => {
              const Icon = stage.icon
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={stage.title}
                  className="relative flex flex-col md:flex-row md:items-center"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <div className="glass inline-block rounded-2xl p-6 md:p-8">
                      <div className={`flex items-center gap-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${stage.color}15` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: stage.color }} />
                        </div>
                        <div className={isLeft ? 'md:text-right' : ''}>
                          <h3 className="font-display text-xl font-bold text-dark">{stage.title}</h3>
                          <p className="mt-2 text-sm text-text-muted">{stage.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-cream shadow-lg"
                      style={{ backgroundColor: stage.color, boxShadow: `0 8px 24px ${stage.color}30` }}
                    >
                      <span className="text-lg font-bold text-white">{i + 1}</span>
                    </div>
                  </div>

                  <div className={`hidden flex-1 md:block ${isLeft ? 'md:order-2 md:pl-12' : 'md:pr-12'}`} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
