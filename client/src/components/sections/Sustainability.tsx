'use client'

import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'

const items = [
  {
    title: 'Natural Ingredients',
    desc: 'We source only the finest natural ingredients, ensuring every bite is pure and wholesome.',
    emoji: '🌿',
  },
  {
    title: 'Eco-Friendly',
    desc: 'Our packaging is designed with sustainability in mind, minimizing environmental impact.',
    emoji: '♻️',
  },
  {
    title: 'Responsible Sourcing',
    desc: 'We partner with farms that share our commitment to ethical and sustainable practices.',
    emoji: '🤝',
  },
  {
    title: 'Quality Commitment',
    desc: 'Every bar undergoes rigorous testing to ensure it meets our premium quality standards.',
    emoji: '⭐',
  },
]

export function Sustainability() {
  return (
    <section id="sustainability" className="relative overflow-hidden bg-dark text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(48,109,41,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(196,164,74,0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-primary-light">
              Sustainability
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Good for You.{' '}
              <span className="text-gradient-gold">Good for the Planet.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              We believe that great nutrition shouldn&apos;t come at the cost of our planet.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-primary/30 hover:bg-white/10">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                  {item.emoji}
                </span>
                <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
