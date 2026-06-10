'use client'

import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-dark py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,94,59,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(200,167,93,0.05),transparent_50%)]" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <ScrollAnimation>
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur-sm">
            Get Started
          </span>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="font-display text-4xl leading-tight md:text-6xl lg:text-7xl">
            Ready to Fuel Your Day{' '}
            <span className="text-gradient-gold">Naturally</span>
          </h2>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/50">
            Join thousands of health-conscious individuals who have made the
            switch to natural, premium nutrition.
          </p>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <motion.button
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-dark px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Shop Soon
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.button>

            <motion.button
              className="group rounded-full border-2 border-white/20 px-10 py-4 text-base font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
