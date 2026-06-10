'use client'

import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Mail, MapPin } from 'lucide-react'

const footerLinks = {
  products: [
    { label: 'Dates & Nuts Bar', href: '#products' },
    { label: 'Dark Chocolate Bar', href: '#products' },
    { label: 'All Products', href: '#products' },
  ],
  company: [
    { label: 'Our Story', href: '#story' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'Sustainability', href: '#sustainability' },
  ],
  support: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
    { label: 'Shipping Info', href: '#' },
  ],
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: YoutubeIcon, href: '#', label: 'Youtube' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,191,106,0.05),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ScrollAnimation>
              <a href="#" className="inline-block text-3xl font-bold tracking-tight">
                <span className="text-primary-accent">NUT</span>
                <span className="text-gold">ZERA</span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
                Premium dates, nuts and dark chocolate bars made for modern lifestyles.
                Nature&apos;s energy, crafted better.
              </p>
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-all hover:border-primary-accent/50 hover:text-primary-accent"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          <div>
            <ScrollAnimation direction="left">
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
                Products
              </h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-primary-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>
          </div>

          <div>
            <ScrollAnimation direction="left" delay={0.1}>
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-primary-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>
          </div>

          <div>
            <ScrollAnimation direction="left" delay={0.2}>
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-primary-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Nutzera. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-white/30">
              <MapPin className="h-3 w-3" />
              <span>Made with nature</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <Mail className="h-3 w-3" />
              <span>hello@nutzera.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
