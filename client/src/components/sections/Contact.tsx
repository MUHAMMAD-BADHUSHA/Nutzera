'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Mail, MapPin, Phone, Send } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(11,61,46,0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollAnimation direction="left">
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-2xl font-bold text-dark md:text-3xl">
                We&apos;d love to hear from you
              </h3>
              <p className="mt-4 text-text-muted">
                Have questions about our products? Want to partner with us?
                Or just want to say hello? We&apos;re here for you.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Email Us</p>
                    <p className="text-sm text-text-muted">hello@nutzera.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Call Us</p>
                    <p className="text-sm text-text-muted">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Visit Us</p>
                    <p className="text-sm text-text-muted">123 Health Street, Wellness City, WC 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-dark">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-dark/10 bg-white/50 px-4 py-3 text-sm text-dark placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-dark">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-dark/10 bg-white/50 px-4 py-3 text-sm text-dark placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-dark">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-dark/10 bg-white/50 px-4 py-3 text-sm text-dark placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="How can we help?"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-dark">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-dark/10 bg-white/50 px-4 py-3 text-sm text-dark placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us more..."
                />
              </div>

              <motion.button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-light"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="h-4 w-4" />
                Send Message
              </motion.button>
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
