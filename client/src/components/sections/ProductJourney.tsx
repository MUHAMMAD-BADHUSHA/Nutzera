'use client'

import { ScrollAnimation } from '@/components/ScrollAnimation'

const steps = [
  { step: '1', title: 'Farm', desc: 'Sourced from premium farms known for exceptional quality dates and nuts.' },
  { step: '2', title: 'Selection', desc: 'Handpicked ingredients undergo rigorous quality testing for purity.' },
  { step: '3', title: 'Processing', desc: 'Small-batch crafting preserves natural flavors and nutritional value.' },
  { step: '4', title: 'Packaging', desc: 'Eco-friendly packaging locks in freshness while protecting our planet.' },
  { step: '5', title: 'Delivery', desc: 'Direct to your doorstep, maintaining peak freshness and quality.' },
]

export function ProductJourney() {
  return (
    <section id="journey" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Our Process
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              From <span className="text-gradient-gold">Farm to Bar</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Every step is crafted with care to deliver the best nutrition.
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gray-200 md:block lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <ScrollAnimation key={step.title} direction={isEven ? 'right' : 'left'} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
                      <div className="rounded-2xl border border-gray-200 bg-white p-8">
                        <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                          {step.step}
                        </span>
                        <h3 className="font-display text-xl font-bold text-dark">{step.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">{step.desc}</p>
                      </div>
                    </div>

                    <div className="flex md:hidden flex-1">
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                          {step.step}
                        </span>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 flex-1">
                          <h3 className="font-display text-lg font-bold text-dark">{step.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{step.desc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex md:w-1/2" />
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
