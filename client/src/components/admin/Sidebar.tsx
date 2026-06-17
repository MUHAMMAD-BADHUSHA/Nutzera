"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard,
  ShoppingBag,
  Tags,
  Package,
  Users,
  UserCog,
  Boxes,
  Star,
  TicketPercent,
  BarChart3,
  FileText,
  CreditCard,
  Truck,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: ShoppingBag, label: "Products", href: "/admin/products" },
  { icon: Tags, label: "Categories", href: "/admin/categories" },
  { icon: Package, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/users" },
  { icon: UserCog, label: "Users", href: "/admin/users?tab=admins" },
  { icon: Boxes, label: "Inventory", href: "/admin/inventory" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: TicketPercent, label: "Coupons", href: "/admin/coupons" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: FileText, label: "Reports", href: "/admin/reports" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: Truck, label: "Shipping", href: "/admin/shipping" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export function Sidebar({ onCollapse }: { onCollapse?: (collapsed: boolean) => void }) {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapse = () => {
    const next = !collapsed
    setCollapsed(next)
    onCollapse?.(next)
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#032c20] text-white p-2.5 rounded-xl shadow-lg"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen flex flex-col bg-[#032c20] transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between h-16 border-b border-white/10">
         <div className="flex flex-1 justify-center items-center">
           <Link href="/admin" className="flex items-center gap-3 min-w-0">
            {collapsed ? <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">
                <Image src="/logo.jpeg" alt="Nutzera" width={100} height={100} className="rounded-lg"/>
              </span>
            </div>
              : <></>}
            {!collapsed && (
              // <span className="text-white font-semibold text-lg truncate">Nutzera</span>
              <div className="flex items-center justify-center ">
                <Image
                  src="/logo2.png"
                  alt="Nutzera"
                  width={150}
                  height={150}
          
                />
              </div>
            )}
          </Link>
         </div>
          <button
            onClick={() => { toggleCollapse(); if (mobileOpen) setMobileOpen(false) }}
            className="text-white/60 hover:text-white transition-colors hidden lg:block"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/60 hover:text-white transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
          {menuItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  active
                    ? "bg-[#10B981]/15 text-white shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                    : "text-[#D1FAE5]/70 hover:bg-[#047857]/40 hover:text-white",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#10B981] rounded-r-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                )}
                <item.icon
                  size={20}
                  className={cn(
                    "flex-shrink-0 transition-transform duration-200",
                    active ? "text-[#10B981]" : "group-hover:scale-110",
                  )}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl",
            collapsed && "justify-center"
          )}>
            {!collapsed && user && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-[#D1FAE5]/60 text-xs truncate capitalize">{user.role.replace("_", " ")}</p>
              </div>
            )}
            <button
              onClick={logout}
              className="text-[#D1FAE5]/60 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
