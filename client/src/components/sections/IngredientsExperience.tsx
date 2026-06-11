'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'

const ingredients = [
  { name: 'Walnut', benefit: 'Rich in omega-3 fatty acids for brain health', emoji: '🥜' },
  { name: 'Almond', benefit: 'Packed with vitamin E for glowing skin', emoji: '🥜' },
  { name: 'Cashew', benefit: 'Loaded with minerals for strong bones', emoji: '🥜' },
  { name: 'Peanut', benefit: 'High protein for muscle recovery', emoji: '🥜' },
  { name: 'Pumpkin Seeds', benefit: 'Magnesium rich for better sleep', emoji: '🎃' },
  { name: 'Dates', benefit: 'Natural sweetness with fiber', emoji: '🌴' },
  { name: 'Dark Chocolate', benefit: 'Antioxidants for heart health', emoji: '🍫' },
]

export function IngredientsExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="ingredients" ref={containerRef} className="relative bg-dark text-white">
      <div className="sticky top-0 min-h-screen">
        <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
          <ScrollAnimation>
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-primary-light">
                What&apos;s Inside
              </span>
              <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                Pure <span className="text-gradient-gold">Ingredients</span>
              </h2>
              <p className="mt-4 text-gray-400">Every ingredient chosen with purpose.</p>
            </div>
          </ScrollAnimation>

          <div className="relative w-full max-w-5xl px-6">
            <motion.div className="flex gap-6 px-4" style={{ x: useTransform(scrollYProgress, [0, 1], ['0%', '-60%']) }}>
              {[...ingredients, ...ingredients].map((item, i) => (
                <motion.div
                  key={`${item.name}-${i}`}
                  className="group flex h-72 w-64 shrink-0 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(48,109,41,0.5)' }}
                >
                  <motion.div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                    {item.emoji}
                  </motion.div>
                  <h3 className="font-display text-xl font-bold">{item.name}</h3>
                  <p className="mt-2 text-center text-sm text-gray-400">{item.benefit}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent" />
          </div>

          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-2 text-sm tracking-wider text-gray-500 uppercase">
              Scroll to explore ingredients
            </span>
          </div>
        </div>
      </div>

      <div className="h-[200vh]" />
    </section>
  )
}
