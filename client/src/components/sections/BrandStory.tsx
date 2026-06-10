'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'

const timelineEvents = [
  {
    year: '2020',
    title: 'The Vision',
    description: 'Born from a belief that healthy snacking should never compromise on taste.',
  },
  {
    year: '2021',
    title: 'The Journey',
    description: 'Months of research to find the perfect balance of nature\'s finest ingredients.',
  },
  {
    year: '2022',
    title: 'The Craft',
    description: 'Small-batch production with handpicked dates, premium nuts, and pure dark chocolate.',
  },
  {
    year: '2023',
    title: 'The Launch',
    description: 'Nutzera enters the market with a mission to revolutionize healthy snacking.',
  },
]

export function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="story" ref={containerRef} className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,61,46,0.03),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(212,160,23,0.02),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <ScrollAnimation>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                Our Story
              </span>
              <h2 className="font-display text-4xl leading-tight text-dark md:text-5xl lg:text-6xl">
                A Simple Belief:{' '}
                <span className="text-gradient">Real Food Should Taste Incredible</span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">
                Nutzera was born from a simple observation: why should choosing healthy mean
                sacrificing taste? We set out to create snacks that nourish your body while
                delighting your taste buds.
              </p>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.3}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-primary/10 bg-white/50 p-6 backdrop-blur-sm">
                  <span className="font-display text-3xl font-bold text-primary">100%</span>
                  <p className="mt-1 text-sm text-text-muted">Natural Ingredients</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-white/50 p-6 backdrop-blur-sm">
                  <span className="font-display text-3xl font-bold text-gold">0</span>
                  <p className="mt-1 text-sm text-text-muted">Artificial Additives</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 md:left-1/2 md:-translate-x-px">
              <motion.div
                className="absolute left-0 top-0 w-full bg-gradient-to-b from-primary-accent to-primary"
                style={{ height: timelineHeight }}
              />
            </div>

            <div className="relative space-y-12">
              {timelineEvents.map((event, i) => (
                <ScrollAnimation key={event.year} direction={i % 2 === 0 ? 'right' : 'left'} delay={i * 0.15}>
                  <div className={`flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-cream bg-primary shadow-lg shadow-primary/20">
                      <span className="text-xs font-bold text-white">{event.year.slice(2)}</span>
                    </div>

                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      <div className="inline-block rounded-2xl border border-dark/5 bg-white p-6 shadow-lg shadow-black/5">
                        <span className="text-xs font-semibold tracking-wider text-primary-accent uppercase">
                          {event.year}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-bold text-dark">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-muted">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
