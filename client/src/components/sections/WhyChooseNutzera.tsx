'use client'

import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'
import { Check, X } from 'lucide-react'

const comparisonRows = [
  { label: 'Natural Ingredients', nutzera: true, typical: false },
  { label: 'No Preservatives', nutzera: true, typical: false },
  { label: 'Real Nuts', nutzera: true, typical: false },
  { label: 'Real Dates', nutzera: true, typical: false },
  { label: 'Better Nutrition', nutzera: true, typical: false },
  { label: 'Premium Quality', nutzera: true, typical: false },
  { label: 'No Added Sugar', nutzera: true, typical: false },
  { label: 'Plant-Based Protein', nutzera: true, typical: false },
]

const highlights = [
  { value: '100%', label: 'Natural', sub: 'Made from real ingredients' },
  { value: '0', label: 'Artificial', sub: 'No artificial additives' },
  { value: '9g', label: 'Protein', sub: 'Per serving' },
  { value: '5g', label: 'Fiber', sub: 'Per serving' },
]

export function WhyChooseNutzera() {
  return (
    <section id="why-nutzera" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Why <span className="text-gradient">Nutzera</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Every bar is a promise of quality.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ScrollAnimation>
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold text-dark">
                  <div />
                  <div className="text-center text-primary">Nutzera</div>
                  <div className="text-center text-gray-400">Typical Snacks</div>
                </div>

                {comparisonRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-3 border-b border-gray-100 px-6 py-3.5 text-sm last:border-0"
                  >
                    <span className="text-gray-700">{row.label}</span>
                    <div className="flex justify-center">
                      {row.nutzera ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {row.typical ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          <div className="lg:col-span-2">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((h) => (
                <StaggerItem key={h.label}>
                  <div className="rounded-2xl border border-primary/10 bg-gray-50 p-5 text-center">
                    <span className="font-display text-3xl font-bold text-primary">{h.value}</span>
                    <p className="mt-1 text-sm font-semibold text-dark">{h.label}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{h.sub}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollAnimation delay={0.2}>
              <div className="mt-4 rounded-2xl border border-primary/10 bg-gray-50 p-5 text-center">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-primary">100% Natural</span> — No artificial ingredients, ever.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
