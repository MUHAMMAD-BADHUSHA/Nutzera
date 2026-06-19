"use client"

import { useState } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { Providers } from "@/components/Providers"
import { Sidebar } from "@/components/admin/Sidebar"
import { Header } from "@/components/admin/Header"
import { AuthGuard } from "@/components/admin/AuthGuard"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (isLoginPage) {
    return <Providers>{children}</Providers>
  }

  return (
    <Providers>
      <AuthProvider>
        <AuthGuard>
          <div className="min-h-screen bg-gray-50">
            <Sidebar onCollapse={setSidebarCollapsed} />
            <div className={cn(
              "flex flex-col min-h-screen transition-all duration-300",
              sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-64",
            )}>
              <Header />
              <main className="flex-1 p-4 lg:p-6">
                {children}
              </main>
            </div>
          </div>
        </AuthGuard>
      </AuthProvider>
    </Providers>
  )
}
