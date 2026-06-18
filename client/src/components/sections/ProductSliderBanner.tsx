'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { AmbientParticles } from '@/components/three/AmbientParticles'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  cta: string
  bg: string
  accent: string
  image: string
  bannerImage?: string
}

const slides: Slide[] = [
  {
    id: 0,
    title: 'New Collection',
    subtitle: 'Premium Dark Chocolate Bars',
    description: 'Handcrafted with premium cacao and carefully selected nuts for the perfect indulgence.',
    cta: 'Shop Now',
    bg: 'from-primary-dark via-primary to-primary-light',
    accent: 'bg-gold',
    image: '/banner.png',
    bannerImage: "/banner.png"
    
  },
  {
    id: 1,
    title: 'New Collection',
    subtitle: 'Premium Dark Chocolate Bars',
    description: 'Handcrafted with premium cacao and carefully selected nuts for the perfect indulgence.',
    cta: 'Shop Now',
    bg: 'from-primary-dark via-primary to-primary-light',
    accent: 'bg-gold',
    image: '/chocobar.png',
  },
  {
    id: 2,
    title: 'Nature\'s Energy',
    subtitle: 'Dates & Nut Bars',
    description: 'Packed with natural energy from premium Medjool dates and crunchy almonds.',
    cta: 'Explore',
    bg: 'from-amber-900 via-amber-700 to-amber-500',
    accent: 'bg-cream',
    image: '/datebar.png',
  },
  {
    id: 3,
    title: 'Seasonal Offer',
    subtitle: 'Buy 3 Get 1 Free',
    description: 'Stock up on your favorite Nutzera bars and save big this season.',
    cta: 'Get Offer',
    bg: 'from-emerald-900 via-emerald-700 to-emerald-500',
    accent: 'bg-gold-light',
    image: '/chocobar.png',
  },
]

export function ProductSliderBanner() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden pt-20">
      <div className="relative h-[200px] sm:h-[240px] md:h-[300px] lg:h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className={`absolute inset-0 bg-linear-to-br ${slides[current].bg}`}
          >
            {slides[current].bannerImage ? (
              <div className="absolute inset-0 flex items-center justify-center bg-dark">
                <Image
                  src={slides[current].bannerImage}
                  alt={slides[current].subtitle}
                  width={1200}
                  height={400}
                  priority
                  className="h-auto w-full max-h-full object-contain"
                  style={{ objectPosition: 'center' }}
                />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <AmbientParticles count={60} color="#ffffff" speed={0.5} className="absolute inset-0 pointer-events-none z-[1]" />

                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10 lg:px-16">
                  <div className="grid w-full items-center gap-8 md:grid-cols-2">
                    <div className="max-w-xl">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`mb-4 inline-block rounded-full ${slides[current].accent} px-4 py-1.5 text-xs font-semibold tracking-wider text-dark uppercase`}
                      >
                        {slides[current].title}
                      </motion.span>
                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-display text-2xl leading-tight text-white md:text-3xl lg:text-4xl"
                      >
                        {slides[current].subtitle}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="mt-2 max-w-md text-xs leading-relaxed text-white/70 md:text-sm"
                      >
                        {slides[current].description}
                      </motion.p>
                      <motion.a
                        href="#product-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-6 group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-dark shadow-lg transition-all hover:bg-opacity-90"
                      >
                        {slides[current].cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.a>
                    </div>
                    <div className="hidden items-center justify-center md:flex">
                      <motion.div
                        key={slides[current].image}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                        transition={{ opacity: { duration: 0.6, delay: 0.15 }, x: { duration: 0.6, delay: 0.15 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                        className="flex items-center justify-center"
                      >
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-white/5 blur-3xl" />
                        <Image
                          src={slides[current].image}
                          alt={slides[current].subtitle}
                          width={200}
                          height={260}
                          priority
                          className="relative h-auto max-h-[180px] w-auto max-w-[130px] object-contain drop-shadow-xl md:max-h-[240px] md:max-w-[180px] lg:max-h-[280px] lg:max-w-[220px]"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
