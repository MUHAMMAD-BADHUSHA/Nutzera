"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Activity, Users } from "lucide-react"
import { customers } from "@/lib/admin-data"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { Modal } from "@/components/admin/Modal"
import { PermissionGuard } from "@/components/admin/PermissionGuard"
import type { User } from "@/types/admin"

export default function CustomersPage() {
  return (
    <PermissionGuard permission="user.view">
      <CustomersContent />
    </PermissionGuard>
  )
}

function CustomersContent() {
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null)

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage your customer accounts</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all bg-white"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length },
          { label: "Active", value: customers.filter((c) => c.status === "active").length },
          { label: "Total Orders", value: customers.reduce((s, c) => s + c.orders, 0) },
          {
            label: "Total Revenue",
            value: `$${customers.reduce((s, c) => s + c.totalSpent, 0).toLocaleString()}`,
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Users size={48} className="mx-auto text-gray-300 mb-4 stroke-[1.5]" />
          <h3 className="font-semibold text-gray-900 mb-1">No customers found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center text-sm font-semibold text-[#10B981] flex-shrink-0">
                          {customer.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-400">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-sm">{customer.role}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={customer.status} variant="user" />
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-sm">{customer.joined}</td>
                    <td className="px-5 py-4 text-right font-semibold text-gray-900">{customer.orders}</td>
                    <td className="px-5 py-4 text-right font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 text-gray-400 hover:text-[#10B981] hover:bg-emerald-50 rounded-lg transition-all"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30">
            <p className="text-xs text-gray-400">
              Showing {filtered.length} of {customers.length} customers
            </p>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      <Modal open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} title="Customer Details" size="lg">
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </Modal>
    </div>
  )
}

function CustomerDetails({ customer }: { customer: User }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#10B981]/5 to-[#064E3B]/5 rounded-2xl border border-emerald-100/50">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {customer.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{customer.name}</h4>
          <p className="text-sm text-gray-500">{customer.email}</p>
          <p className="text-xs text-gray-400 mt-0.5">Member since {customer.joined}</p>
        </div>
        <StatusBadge status={customer.status} variant="user" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{customer.orders}</p>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900">${customer.totalSpent.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Activity</p>
        <div className="space-y-2.5">
          {[
            { action: "Placed order ORD-008", time: "2 hours ago" },
            { action: "Updated profile information", time: "1 day ago" },
            { action: "Left a product review", time: "3 days ago" },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl text-sm">
              <Activity size={14} className="text-[#10B981] flex-shrink-0" />
              <span className="text-gray-700 flex-1">{log.action}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
