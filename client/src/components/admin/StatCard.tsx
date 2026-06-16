"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  change: number
  icon: React.ReactNode
  prefix?: string
}

export function StatCard({ label, value, change, icon, prefix = "" }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#10B981]/10 to-[#064E3B]/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center text-[#10B981]">
            {icon}
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700",
            )}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(change)}%
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">
          {prefix}{value}
        </p>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
        <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent" />
      </div>
    </div>
  )
}
