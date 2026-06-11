'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Fitness Enthusiast',
    text: 'Finally, a snack that tastes amazing and actually keeps me going through my workouts. The Dark Chocolate bar is my absolute favorite.',
    initials: 'SM',
  },
  {
    name: 'James C.',
    role: 'Marathon Runner',
    text: 'I fuel my long runs with Nutzera. The date-based energy hits differently — sustained, clean, and no sugar crashes.',
    initials: 'JC',
  },
  {
    name: 'Emma W.',
    role: 'Yoga Instructor',
    text: 'These bars are my go-to post-practice snack. Clean ingredients, amazing texture, and that dark chocolate version is pure bliss.',
    initials: 'EW',
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const t = testimonials[current]

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Testimonials
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              What{' '}
              <span className="text-gradient-gold">People Say</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-dark">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-primary/30 hover:text-primary"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-8 bg-primary' : 'w-2 bg-gray-200'
                  }`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-primary/30 hover:text-primary"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
