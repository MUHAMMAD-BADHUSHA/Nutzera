'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Why Nutzera', href: '#why-nutzera' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 4.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
  {/* Logo */}
  <motion.a
    href="#"
    className="flex items-center"
    whileHover={{ scale: 1.02 }}
  >
    <div className="relative">
  <Image
    src="/logo2.png"
    alt="Nutzera"
    width={290}
    height={250}
    className="object-contain"
  />
</div>
  </motion.a>

  {/* Desktop Navigation */}
  <div className="hidden items-center gap-8 md:flex">
    {navLinks.map((link) => (
      <motion.a
        key={link.label}
        href={link.href}
        className="text-sm font-medium text-white/70 transition-colors hover:text-primary-accent"
        whileHover={{ y: -1 }}
      >
        {link.label}
      </motion.a>
    ))}

    <motion.button
      className="rounded-full bg-primary-accent px-6 py-2.5 text-sm font-semibold text-dark shadow-lg shadow-primary-accent/25 transition-colors hover:bg-primary-light"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Shop Soon
    </motion.button>
  </div>

  {/* Mobile Menu Button */}
  <button
    className="relative z-50 md:hidden"
    onClick={() => setMobileOpen(!mobileOpen)}
    aria-label="Toggle menu"
  >
    {mobileOpen ? (
      <X className="h-6 w-6 text-white" />
    ) : (
      <Menu className="h-6 w-6 text-white" />
    )}
  </button>
</nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-2xl font-medium text-white/70 transition-colors hover:text-primary-accent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              className="mt-4 rounded-full bg-primary-accent px-8 py-3 text-lg font-semibold text-dark shadow-lg shadow-primary-accent/25"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Soon
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
