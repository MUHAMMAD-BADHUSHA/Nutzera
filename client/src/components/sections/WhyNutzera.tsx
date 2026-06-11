'use client'

import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'

const reasons = [
  { title: '100% Natural', desc: 'No artificial ingredients, ever.', emoji: '🌿' },
  { title: 'No Added Sugar', desc: 'Sweetened naturally with dates.', emoji: '🍯' },
  { title: 'Plant Based', desc: '100% plant-based nutrition.', emoji: '🌱' },
  { title: 'Premium Ingredients', desc: 'Only the finest nuts and fruits.', emoji: '⭐' },
  { title: 'Protein Rich', desc: 'Natural protein for lasting energy.', emoji: '💪' },
  { title: 'Healthy Snacking', desc: 'Guilt-free indulgence, anytime.', emoji: '❤️' },
]

export function WhyNutzera() {
  return (
    <section id="why-nutzera" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Why <span className="text-gradient">Nutzera</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500">Every bar is a promise of quality.</p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                  {reason.emoji}
                </span>
                <h3 className="font-display text-xl font-bold text-dark">{reason.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{reason.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
