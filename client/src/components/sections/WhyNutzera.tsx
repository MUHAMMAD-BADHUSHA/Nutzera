'use client'

import { motion } from 'framer-motion'
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'
import { Leaf, Wheat, Vegan, Sparkles, Beef, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const reasons = [
  {
    title: '100% Natural',
    desc: 'No artificial ingredients, ever.',
    icon: Leaf,
    color: '#1F5E3B',
  },
  {
    title: 'No Added Sugar',
    desc: 'Sweetened naturally with dates.',
    icon: Wheat,
    color: '#A8C3A0',
  },
  {
    title: 'Plant Based',
    desc: '100% plant-based nutrition.',
    icon: Vegan,
    color: '#5A4636',
  },
  {
    title: 'Premium Ingredients',
    desc: 'Only the finest nuts and fruits.',
    icon: Sparkles,
    color: '#C8A75D',
  },
  {
    title: 'Protein Rich',
    desc: 'Natural protein for lasting energy.',
    icon: Beef,
    color: '#143D28',
  },
  {
    title: 'Healthy Snacking',
    desc: 'Guilt-free indulgence, anytime.',
    icon: Heart,
    color: '#1F5E3B',
  },
]

export function WhyNutzera() {
  return (
    <section id="why-nutzera" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,94,59,0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Why <span className="text-gradient">Nutzera</span>
            </h2>
            <p className="mt-4 text-lg text-dark/60">
              Every bar is a promise of quality.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <StaggerItem key={reason.title}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-dark/5 bg-cream/50 p-8 transition-colors hover:border-primary/20"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className={cn(
                      'absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                    )}
                    style={{
                      background: `radial-gradient(400px circle at 50% 0%, ${reason.color}08, transparent 50%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        backgroundColor: `${reason.color}15`,
                        boxShadow: `0 0 0px ${reason.color}20`,
                      }}
                    >
                      <Icon
                        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: reason.color }}
                      />
                    </div>

                    <h3 className="font-display text-xl font-bold text-dark">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm text-dark/50">{reason.desc}</p>
                  </div>

                  <motion.div
                    className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `0 0 30px ${reason.color}20`,
                    }}
                  />
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
