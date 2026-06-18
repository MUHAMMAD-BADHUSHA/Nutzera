'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Products', href: '/products' },
  { label: 'Ingredients', href: '/#ingredients' },
  { label: 'Why Nutzera', href: '/#why-nutzera' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Contact', href: '/#contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'
  const isNavbarActive = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)

    window.history.pushState(null, '', href)
    const target = document.querySelector(href)
    if (target) {
      // Small delay lets the mobile menu finish collapsing before scrolling
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isNavbarActive ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <a href="/" className="relative z-10">
          <Image
            src="/logo2.png"
            alt="Nutzera"
            width={180}
            height={90}
            className="h-12 w-auto"
            priority
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isNavbarActive ? 'text-gray-700 hover:text-primary' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#products"
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              isNavbarActive
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-white text-dark hover:bg-gray-100'
            }`}
          >
            Shop Soon
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 md:hidden ${
            isNavbarActive ? 'text-dark' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white shadow-lg md:hidden"
          >
            <div className="space-y-1 px-6 pb-6 pt-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileLinkClick(e, link.href)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#products"
                onClick={(e) => handleMobileLinkClick(e, '#products')}
                className="mt-2 flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
              >
                Shop Soon
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
