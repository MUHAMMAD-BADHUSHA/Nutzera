'use client'

import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Leaf, Recycle, Globe, Heart } from 'lucide-react'

const values = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We source only the finest natural ingredients, ensuring every bite is pure and wholesome.',
    color: '#5BBF6A',
  },
  {
    icon: Recycle,
    title: 'Eco-Friendly',
    description: 'Our packaging is designed with sustainability in mind, minimizing environmental impact.',
    color: '#1F7A53',
  },
  {
    icon: Globe,
    title: 'Responsible Sourcing',
    description: 'We partner with farms that share our commitment to ethical and sustainable practices.',
    color: '#D4A017',
  },
  {
    icon: Heart,
    title: 'Quality Commitment',
    description: 'Every bar undergoes rigorous testing to ensure it meets our premium quality standards.',
    color: '#0B3D2E',
  },
]

export function Sustainability() {
  return (
    <section className="relative overflow-hidden bg-dark py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,191,106,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <ScrollAnimation>
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-primary-accent backdrop-blur-sm">
                Sustainability
              </span>
              <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                Good for You.{' '}
                <span className="text-gradient-gold">Good for the Planet.</span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                We believe that great nutrition shouldn&apos;t come at the cost of our planet.
                Every decision we make considers both your health and the environment.
              </p>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.3}>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-accent/20">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white">100%</p>
                    <p className="text-sm text-white/50">Recyclable Packaging</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <ScrollAnimation key={value.title} direction="up" delay={i * 0.1}>
                  <motion.div
                    className="group glass rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                    whileHover={{ y: -4 }}
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${value.color}20` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: value.color }} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{value.title}</h3>
                    <p className="mt-2 text-sm text-white/50">{value.description}</p>
                  </motion.div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
