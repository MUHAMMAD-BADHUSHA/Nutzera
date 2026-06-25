'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimation } from '@/components/ScrollAnimation'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ScrollAnimation>
              <Image src="/logo2.png" alt="Nutzera" width={120} height={40} className="h-8 w-auto brightness-0 invert" />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
                Premium dates, nuts and dark chocolate bars made for modern lifestyles.
                Nature&apos;s energy, crafted better.
              </p>
              <div className="mt-6 flex gap-3">
                {['X', 'FB', 'IG', 'YT'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs text-gray-400 transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          <div>
            <ScrollAnimation direction="left" delay={0.1}>
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Products
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/products" className="text-sm text-gray-400 transition-colors hover:text-primary">All Products</Link></li>
                <li><Link href="/products" className="text-sm text-gray-400 transition-colors hover:text-primary">Dates & Nuts Bar</Link></li>
                <li><Link href="/products" className="text-sm text-gray-400 transition-colors hover:text-primary">Dark Chocolate Bar</Link></li>
              </ul>
            </ScrollAnimation>
          </div>

          <div>
            <ScrollAnimation direction="left" delay={0.2}>
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="text-sm text-gray-400 transition-colors hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 transition-colors hover:text-primary">Contact</Link></li>
                <li><Link href="/products" className="text-sm text-gray-400 transition-colors hover:text-primary">Our Story</Link></li>
              </ul>
            </ScrollAnimation>
          </div>

          <div>
            <ScrollAnimation direction="left" delay={0.3}>
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/privacy-policy" className="text-sm text-gray-400 transition-colors hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="text-sm text-gray-400 transition-colors hover:text-primary">Terms & Conditions</Link></li>
              </ul>
            </ScrollAnimation>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Nutzera. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Made with nature</span>
            <span>hello@nutzera.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
