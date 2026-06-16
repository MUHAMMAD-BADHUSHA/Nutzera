'use client'

import { usePathname } from 'next/navigation'
import { useLenis } from '@/hooks/useLenis'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  useLenis()

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </>
  )
}
