"use client"

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  variant?: "order" | "payment" | "product" | "user" | "category"
}

const variants: Record<string, Record<string, string>> = {
  order: {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    shipped: "bg-purple-50 text-purple-700 border-purple-200",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  },
  payment: {
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    refunded: "bg-gray-50 text-gray-700 border-gray-200",
  },
  product: {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-gray-50 text-gray-700 border-gray-200",
    archived: "bg-red-50 text-red-700 border-red-200",
  },
  user: {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive: "bg-gray-50 text-gray-700 border-gray-200",
    blocked: "bg-red-50 text-red-700 border-red-200",
  },
  category: {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive: "bg-gray-50 text-gray-700 border-gray-200",
  },
}

export function StatusBadge({ status, variant = "order" }: StatusBadgeProps) {
  const colorClasses = variants[variant]?.[status] || variants.order.pending

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border capitalize",
        colorClasses,
      )}
    >
      {status}
    </span>
  )
}
