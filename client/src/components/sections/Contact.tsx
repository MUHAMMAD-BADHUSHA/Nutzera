'use client'

import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <ScrollAnimation>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                Get in Touch
              </span>
              <h2 className="font-display text-3xl leading-tight text-dark md:text-5xl lg:text-6xl">
                Let&apos;s{' '}
                <span className="text-gradient">Connect</span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation delay={0.1}>
              <p className="mt-4 text-lg text-gray-500">
                We&apos;d love to hear from you. Have questions about our products? Want to partner with us?
                Or just want to say hello? We&apos;re here for you.
              </p>
            </ScrollAnimation>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Email Us</p>
                  <p className="font-medium text-dark">hello@nutzera.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Call Us</p>
                  <p className="font-medium text-dark">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Visit Us</p>
                  <p className="font-medium text-dark">123 Health Street, Wellness City, WC 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ScrollAnimation direction="up" delay={0.15}>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-10">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-dark">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-dark placeholder:text-gray-400 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-dark">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-dark placeholder:text-gray-400 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-dark">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-dark placeholder:text-gray-400 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-dark">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-dark placeholder:text-gray-400 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
                  >
                    Send Message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
