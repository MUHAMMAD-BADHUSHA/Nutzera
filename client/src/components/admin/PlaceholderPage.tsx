"use client"

import { LucideIcon, Construction } from "lucide-react"

interface PlaceholderPageProps {
  title: string
  description: string
  icon?: LucideIcon
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  const IconComponent = Icon || Construction

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center mb-6">
        <IconComponent size={36} className="text-[#10B981]" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 max-w-md">{description}</p>
    </div>
  )
}
