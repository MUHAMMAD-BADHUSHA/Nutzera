'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'

const timelineEvents = [
  { year: '2020', title: 'The Vision', description: 'Born from a belief that healthy snacking should never compromise on taste.' },
  { year: '2021', title: 'The Journey', description: 'Months of research to find the perfect balance of nature\'s finest ingredients.' },
  { year: '2022', title: 'The Craft', description: 'Small-batch production with handpicked dates, premium nuts, and pure dark chocolate.' },
  { year: '2023', title: 'The Launch', description: 'Nutzera enters the market with a mission to revolutionize healthy snacking.' },
]

export function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="story" ref={containerRef} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <ScrollAnimation>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                Our Story
              </span>
              <h2 className="font-display text-3xl leading-tight text-dark md:text-5xl lg:text-6xl">
                A Simple Belief:{' '}
                <span className="text-gradient">Real Food Should Taste Incredible</span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                Nutzera was born from a simple observation: why should choosing healthy mean
                sacrificing taste? We set out to create snacks that nourish your body while
                delighting your taste buds.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6">
                  <span className="font-display text-4xl font-bold text-primary">100%</span>
                  <p className="mt-1 text-sm text-gray-500">Natural Ingredients</p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6">
                  <span className="font-display text-4xl font-bold text-dark">0</span>
                  <p className="mt-1 text-sm text-gray-500">Artificial Additives</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-200">
              <motion.div
                className="h-full w-full bg-primary"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="relative space-y-12 pl-12">
              {timelineEvents.map((event, i) => (
                <ScrollAnimation key={event.year} direction="left" delay={i * 0.15}>
                  <div className="relative">
                    <div className="absolute -left-[2.65rem] top-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-primary text-[10px] font-bold text-white shadow">
                      {event.year.slice(2)}
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                      <span className="text-xs font-semibold tracking-wider text-primary uppercase">{event.year}</span>
                      <h3 className="mt-1 font-display text-lg font-bold text-dark">{event.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{event.description}</p>
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
