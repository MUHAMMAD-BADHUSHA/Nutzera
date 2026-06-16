"use client"

import { useState } from "react"
import { Save, Store, CreditCard, Truck, Mail, Shield, Percent, ChevronRight } from "lucide-react"

const settingsSections = [
  { id: "general", label: "General", icon: Store },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "email", label: "Email", icon: Mail },
  { id: "tax", label: "Tax", icon: Percent },
  { id: "security", label: "Security", icon: Shield },
]

const sectionContent: Record<string, React.ReactNode> = {
  general: (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
          <input type="text" defaultValue="Nutzera" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          <input type="text" defaultValue="Premium Healthy Nutrition" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
          <textarea rows={3} defaultValue="Premium dates, nuts and dark chocolate bars made for modern lifestyles." className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" defaultValue="hello@nutzera.com" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input type="text" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select defaultValue="USD" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
          <select defaultValue="EST" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20">
            <option value="EST">Eastern Time (EST)</option>
            <option value="PST">Pacific Time (PST)</option>
            <option value="GMT">GMT</option>
          </select>
        </div>
      </div>
    </div>
  ),
  payment: (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Gateway</label>
          <select defaultValue="stripe" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm">
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="square">Square</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key (Live)</label>
          <input type="password" value="sk_live_••••••••••••••••" readOnly className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key (Test)</label>
          <input type="password" value="sk_test_••••••••••••••••" readOnly className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50" />
        </div>
        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl sm:col-span-2">
          <div className="w-2 h-2 bg-[#10B981] rounded-full" />
          <span className="text-sm text-emerald-700">Payments are currently active and processing</span>
        </div>
      </div>
    </div>
  ),
  shipping: (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping ($)</label>
          <input type="number" defaultValue="4.99" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Express Shipping ($)</label>
          <input type="number" defaultValue="12.99" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Over ($)</label>
          <input type="number" defaultValue="50" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Processing Time (days)</label>
          <input type="number" defaultValue="2" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm" />
        </div>
      </div>
    </div>
  ),
  email: (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Order Confirmation Email</label>
        <textarea rows={4} defaultValue="Hi {{customer_name}},\n\nThank you for your order! Your order #{{order_id}} has been confirmed." className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Notification</label>
        <textarea rows={4} defaultValue="Hi {{customer_name}},\n\nYour order #{{order_id}} has been shipped!" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Settings</label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <input type="text" placeholder="SMTP Host" defaultValue="smtp.nutzera.com" className="px-3 py-2 border border-gray-200 rounded-xl text-sm" />
          <input type="number" placeholder="Port" defaultValue="587" className="px-3 py-2 border border-gray-200 rounded-xl text-sm" />
          <input type="text" placeholder="Username" defaultValue="notifications@nutzera.com" className="px-3 py-2 border border-gray-200 rounded-xl text-sm" />
          <input type="password" placeholder="Password" defaultValue="••••••••" className="px-3 py-2 border border-gray-200 rounded-xl text-sm" />
        </div>
      </div>
    </div>
  ),
  tax: (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
          <input type="number" defaultValue="8.5" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Region</label>
          <select defaultValue="US" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm">
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="EU">European Union</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#10B981] rounded" />
            <span className="text-sm text-gray-700">Include tax in product prices (tax inclusive pricing)</span>
          </label>
        </div>
      </div>
    </div>
  ),
  security: (
    <div className="space-y-4">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <Shield size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Security Recommendations</p>
          <p className="text-xs text-amber-700 mt-1">Enable two-factor authentication and regular security audits to protect your store.</p>
        </div>
      </div>
      <div className="space-y-3">
        {[
          { label: "Two-Factor Authentication", enabled: true },
          { label: "Login Notifications", enabled: true },
          { label: "IP Whitelisting for Admin", enabled: false },
          { label: "Auto-logout after inactivity", enabled: true },
          { label: "Audit Logging", enabled: true },
        ].map((item) => (
          <label key={item.label} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">{item.label}</span>
            <input type="checkbox" defaultChecked={item.enabled} className="w-4 h-4 text-[#10B981] rounded" />
          </label>
        ))}
      </div>
    </div>
  ),
}

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState("general")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all text-sm font-medium shadow-sm"
        >
          <Save size={18} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 bg-white rounded-2xl border border-gray-100 p-2 shadow-sm overflow-x-auto lg:overflow-visible">
            {settingsSections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? "bg-[#10B981]/10 text-[#065F46]"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} />
                  {section.label}
                  <ChevronRight size={14} className="ml-auto hidden lg:block text-gray-300" />
                </button>
              )
            })}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{activeSection} Settings</h2>
          {sectionContent[activeSection]}
        </div>
      </div>
    </div>
  )
}
