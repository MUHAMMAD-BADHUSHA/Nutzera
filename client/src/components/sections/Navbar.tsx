'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

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

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-[9998] transition-all duration-500',
          scrolled
            ? 'bg-dark/90 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 4.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <motion.button
            className="flex shrink-0 items-center bg-transparent border-none cursor-pointer p-0"
            whileHover={{ scale: 1.02 }}
            onClick={() => {}}
            aria-label="Nutzera"
          >
            <div className="relative">
              <img
                src="/logo2.png"
                alt="Nutzera"
                className="h-28 w-auto md:h-40"
              />
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  scrolled ? 'text-white/80 hover:text-primary-accent' : 'text-white/80 hover:text-primary-accent'
                )}
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
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex w-screen h-dvh flex-col items-center justify-center gap-6 overflow-x-hidden overflow-y-auto bg-dark/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <button
              className="fixed right-4 top-5 z-[10000] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <div className="flex w-full max-w-full flex-col items-center gap-6 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="w-full max-w-full truncate text-center text-xl font-medium text-white/70 transition-colors hover:text-primary-accent md:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                className="mt-2 w-full max-w-full truncate rounded-full bg-primary-accent px-8 py-3 text-lg font-semibold text-dark shadow-lg shadow-primary-accent/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Soon
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
