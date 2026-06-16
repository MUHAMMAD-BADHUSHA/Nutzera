"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Bell, MessageSquare, Search, Moon, Sun } from "lucide-react"

export function Header() {
  const { user } = useAuth()
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, products, customers..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
            <MessageSquare size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full ring-2 ring-white" />
          </button>

          <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
              3
            </span>
          </button>

          <div className="h-8 w-px bg-gray-200 mx-1" />

          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.replace("_", " ")}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              {user?.name?.split(" ").map((n) => n[0]).join("")}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
