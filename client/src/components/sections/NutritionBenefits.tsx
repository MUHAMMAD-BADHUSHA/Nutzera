'use client'

import { ScrollAnimation } from '@/components/ScrollAnimation'

const benefits = [
  {
    title: 'Natural Energy',
    desc: 'Sustained energy from whole food ingredients, no crashes.',
    stat: '8hrs',
    unit: 'of sustained energy',
  },
  {
    title: 'Rich in Fiber',
    desc: 'Digestive health support with natural fiber from nuts and dates.',
    stat: '5g',
    unit: 'fiber per bar',
  },
  {
    title: 'Heart Healthy',
    desc: 'Omega-3 fatty acids and antioxidants for cardiovascular wellness.',
    stat: '30%',
    unit: 'less saturated fat',
  },
  {
    title: 'Antioxidant Rich',
    desc: 'Dark chocolate and nuts provide powerful antioxidant protection.',
    stat: '2x',
    unit: 'more antioxidants',
  },
  {
    title: 'Protein Source',
    desc: 'Plant-based protein for muscle maintenance and repair.',
    stat: '9g',
    unit: 'protein per bar',
  },
  {
    title: 'No Refined Sugar',
    desc: 'Sweetness comes naturally from dates, not refined sugars.',
    stat: '0g',
    unit: 'refined sugar',
  },
]

export function NutritionBenefits() {
  return (
    <section id="nutrition" className="relative overflow-hidden bg-dark text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(48,109,41,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-primary-light">
              Benefits
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Fuel Your{' '}
              <span className="text-gradient-gold">Best Self</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Every bite delivers powerful nutrition for your body and mind.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <ScrollAnimation key={benefit.title} delay={i * 0.08}>
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-primary/30 hover:bg-white/10">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white">{benefit.title}</h3>
                  <div className="text-right">
                    <span className="font-display text-2xl font-bold text-primary-light">{benefit.stat}</span>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{benefit.unit}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{benefit.desc}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
