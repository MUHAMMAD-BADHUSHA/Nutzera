'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { cn } from '@/lib/utils'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What ingredients are used in Nutzera bars?',
    answer: 'Our bars are made with 100% natural ingredients: premium nuts (walnuts, almonds, cashews, peanuts), dates, pumpkin seeds, and dark chocolate. No artificial preservatives, flavors, or sweeteners.',
  },
  {
    question: 'How should I store Nutzera bars?',
    answer: 'Store in a cool, dry place away from direct sunlight. For best freshness, keep them in their original packaging. They stay fresh for up to 6 months when stored properly.',
  },
  {
    question: 'Is there any added sugar in Nutzera bars?',
    answer: 'No, there is absolutely no added sugar. Our bars are naturally sweetened with dates, which provide natural sugars along with fiber, vitamins, and minerals.',
  },
  {
    question: 'How much protein is in each bar?',
    answer: 'Each Nutzera bar contains 8-10g of plant-based protein from nuts and seeds, making it an excellent post-workout snack or mid-day energy boost.',
  },
  {
    question: 'What is the shelf life of Nutzera bars?',
    answer: 'Our bars have a shelf life of 6 months from the production date. Each package includes a best-before date to ensure you enjoy them at peak freshness.',
  },
  {
    question: 'Are Nutzera bars suitable for vegans?',
    answer: 'Yes! All Nutzera bars are 100% plant-based and suitable for vegans and vegetarians.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,61,46,0.02),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <ScrollAnimation>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              FAQ
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Got{' '}
              <span className="text-gradient">Questions</span>
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Everything you need to know about Nutzera.
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <ScrollAnimation key={i} direction="up" delay={i * 0.05}>
              <div
                className={cn(
                  'overflow-hidden rounded-2xl border transition-all duration-500',
                  openIndex === i
                    ? 'border-primary/20 bg-primary/5 shadow-lg shadow-primary/5'
                    : 'border-dark/5 bg-cream/30 hover:border-dark/10'
                )}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="pr-4 text-base font-semibold text-dark">
                    {faq.question}
                  </span>
                  <motion.div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10"
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === i ? (
                      <Minus className="h-4 w-4 text-primary" />
                    ) : (
                      <Plus className="h-4 w-4 text-primary" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="border-t border-dark/5 px-6 py-5">
                        <p className="leading-relaxed text-text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
