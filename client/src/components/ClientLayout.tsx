'use client'

import { usePathname } from 'next/navigation'
import { useLenis } from '@/hooks/useLenis'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { Providers } from '@/components/Providers'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  useLenis()

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <Providers>
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </Providers>
  )
}
