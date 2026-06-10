'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Fitness Enthusiast',
    content: 'Finally, a snack that tastes amazing and actually keeps me going through my workouts. The Dark Chocolate bar is my absolute favorite.',
    avatar: 'SM',
    rating: 5,
  },
  {
    name: 'James K.',
    role: 'Nutrition Coach',
    content: 'I recommend Nutzera to all my clients. Clean ingredients, great macros, and the taste is incredible. A game-changer for healthy snacking.',
    avatar: 'JK',
    rating: 5,
  },
  {
    name: 'Priya R.',
    role: 'Busy Professional',
    content: 'Perfect for my on-the-go lifestyle. The Dates & Nuts bar is my go-to when I need a quick, healthy boost between meetings.',
    avatar: 'PR',
    rating: 5,
  },
  {
    name: 'Mike D.',
    role: 'Marathon Runner',
    content: 'Natural energy that lasts. I take these on all my long runs. The dates provide the perfect natural sweetness I need.',
    avatar: 'MD',
    rating: 5,
  },
  {
    name: 'Emma L.',
    role: 'Health Blogger',
    content: 'Nutzera has completely changed my perspective on snack bars. Real ingredients, real flavor, real nutrition. Absolutely love it.',
    avatar: 'EL',
    rating: 5,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,160,23,0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <ScrollAnimation>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Testimonials
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              What People{' '}
              <span className="text-gradient">Say</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative mx-auto max-w-2xl">
          <div className="relative h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="glass mb-8 rounded-3xl p-8 md:p-10">
                  <div className="mb-4 flex justify-center gap-1">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-dark/70 md:text-xl">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-bold text-white">
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-dark">{testimonials[current].name}</p>
                    <p className="text-sm text-text-muted">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={cn(
                  'h-2 rounded-full transition-all duration-500',
                  i === current ? 'w-10 bg-primary' : 'w-2 bg-dark/15 hover:bg-dark/25'
                )}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
