"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Users as UsersIcon, Shield, MoreHorizontal, Activity } from "lucide-react"
import { customers, adminUsers } from "@/lib/admin-data"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { Modal } from "@/components/admin/Modal"
import type { User } from "@/types/admin"

export default function AdminUsers() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <UsersContent />
    </Suspense>
  )
}

function UsersContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "customers"
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null)

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">Manage customers and administrators</p>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <a
          href="/admin/users"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            tab === "customers" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <UsersIcon size={16} />
          Customers
        </a>
        <a
          href="/admin/users?tab=admins"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            tab === "admins" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Shield size={16} />
          Admin Users
        </a>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${tab === "customers" ? "customers" : "admin users"}...`}
          className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all"
        />
      </div>

      {tab === "customers" ? (
        <CustomersTable customers={filteredCustomers} onSelect={setSelectedCustomer} />
      ) : (
        <AdminUsersTable />
      )}

      <Modal open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} title="Customer Details" size="lg">
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </Modal>
    </div>
  )
}

function CustomersTable({ customers, onSelect }: { customers: User[]; onSelect: (c: User) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Orders</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Total Spent</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center text-sm font-medium text-[#10B981]">
                      {customer.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-400">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-700">{customer.role}</td>
                <td className="px-5 py-4"><StatusBadge status={customer.status} variant="user" /></td>
                <td className="px-5 py-4 text-gray-500">{customer.joined}</td>
                <td className="px-5 py-4 text-right font-medium">{customer.orders}</td>
                <td className="px-5 py-4 text-right font-medium">${customer.totalSpent.toFixed(2)}</td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => onSelect(customer)} className="p-2 text-gray-400 hover:text-[#10B981] hover:bg-emerald-50 rounded-lg transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminUsersTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Last Active</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Permissions</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {adminUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center text-sm font-medium text-[#10B981]">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#065F46] capitalize">
                    <Shield size={12} />
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4"><StatusBadge status={user.status} variant="user" /></td>
                <td className="px-5 py-4 text-gray-500">{user.lastActive}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {user.permissions.map((perm) => (
                      <span key={perm} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {perm === "all" ? "Full Access" : perm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CustomerDetails({ customer }: { customer: User }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white text-lg font-bold">
          {customer.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{customer.name}</h4>
          <p className="text-sm text-gray-500">{customer.email}</p>
          <p className="text-xs text-gray-400">Member since {customer.joined}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white border border-gray-100 rounded-xl">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="text-xl font-bold text-gray-900">{customer.orders}</p>
        </div>
        <div className="p-3 bg-white border border-gray-100 rounded-xl">
          <p className="text-xs text-gray-500">Total Spent</p>
          <p className="text-xl font-bold text-gray-900">${customer.totalSpent.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">Activity Log</p>
        <div className="space-y-2">
          {[
            { action: "Placed order ORD-008", time: "2 hours ago" },
            { action: "Updated profile", time: "1 day ago" },
            { action: "Added review", time: "3 days ago" },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <Activity size={14} className="text-gray-300" />
              <span className="text-gray-700">{log.action}</span>
              <span className="text-xs text-gray-400 ml-auto">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
