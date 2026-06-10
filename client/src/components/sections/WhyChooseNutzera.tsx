'use client'

import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const comparisons = [
  { feature: 'Natural Ingredients', nutzera: true, typical: false },
  { feature: 'No Preservatives', nutzera: true, typical: false },
  { feature: 'Real Nuts', nutzera: true, typical: false },
  { feature: 'Real Dates', nutzera: true, typical: false },
  { feature: 'Better Nutrition', nutzera: true, typical: false },
  { feature: 'Premium Quality', nutzera: true, typical: false },
  { feature: 'No Added Sugar', nutzera: true, typical: false },
  { feature: 'Plant-Based Protein', nutzera: true, typical: false },
]

const stats = [
  { value: '100%', label: 'Natural', description: 'Made from real ingredients' },
  { value: '0', label: 'Artificial', description: 'No artificial additives' },
  { value: '9g', label: 'Protein', description: 'Per serving' },
  { value: '5g', label: 'Fiber', description: 'Per serving' },
]

export function WhyChooseNutzera() {
  return (
    <section id="why-nutzera" className="relative overflow-hidden bg-dark py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(91,191,106,0.08),transparent_50%),radial-gradient(ellipse_at_right,rgba(212,160,23,0.05),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-primary-accent backdrop-blur-sm">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Why <span className="text-gradient-gold">Nutzera</span>
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Every bar is a promise of quality.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollAnimation direction="left">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
              <h3 className="mb-8 font-display text-2xl font-bold text-white">
                Nutzera vs Typical Snacks
              </h3>

              <div className="space-y-4">
                {comparisons.map((item, i) => (
                  <motion.div
                    key={item.feature}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <span className="text-sm font-medium text-white/80">{item.feature}</span>
                    <div className="flex gap-8">
                      <div className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full',
                        item.nutzera ? 'bg-primary-accent/20 text-primary-accent' : 'bg-red-500/20 text-red-400'
                      )}>
                        {item.nutzera ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                      <div className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full',
                        item.typical ? 'bg-primary-accent/20 text-primary-accent' : 'bg-red-500/20 text-red-400'
                      )}>
                        {item.typical ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-8 text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary-accent" />
                  Nutzera
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  Typical Snacks
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-accent/30 hover:bg-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="font-display text-4xl font-bold text-primary-accent md:text-5xl">
                    {stat.value}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-bold text-white">{stat.label}</h4>
                  <p className="mt-1 text-sm text-white/50">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-4 rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/10 to-transparent p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-center text-sm text-white/70">
                <span className="font-semibold text-gold">100% Natural</span> — No artificial ingredients, ever.
              </p>
            </motion.div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
