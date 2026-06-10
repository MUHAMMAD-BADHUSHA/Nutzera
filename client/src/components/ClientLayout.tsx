'use client'

import { useLenis } from '@/hooks/useLenis'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useLenis()

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
