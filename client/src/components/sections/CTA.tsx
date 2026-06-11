'use client'

import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-dark text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(48,109,41,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <ScrollAnimation>
          <h2 className="font-display text-4xl leading-tight md:text-6xl lg:text-7xl">
            Ready to Fuel Your Day{' '}
            <span className="text-gradient-gold">Naturally</span>
          </h2>
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <p className="mx-auto mt-6 max-w-lg text-lg text-gray-400">
            Join thousands of health-conscious individuals who have made the switch to natural, premium nutrition.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <motion.a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Soon
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#contact"
              className="group rounded-full border-2 border-white/20 px-10 py-4 text-base font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
