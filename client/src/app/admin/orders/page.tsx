"use client"

import { useState } from "react"
import { Search, ChevronDown, Eye } from "lucide-react"
import { orders } from "@/lib/admin-data"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { Modal } from "@/components/admin/Modal"
import type { Order } from "@/types/admin"

export default function AdminOrders() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || o.orderStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage all orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]/20"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700">{order.product}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">${order.amount.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.paymentStatus} variant="payment" />
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.orderStatus} variant="order" />
                  </td>
                  <td className="px-5 py-4 text-gray-500">{order.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-400 hover:text-[#10B981] hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order ${selectedOrder?.id}`} size="xl">
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>
    </div>
  )
}

function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Customer</p>
          <p className="font-medium text-gray-900">{order.customer}</p>
          <p className="text-sm text-gray-500">{order.email}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Amount</p>
          <p className="text-2xl font-bold text-gray-900">${order.amount.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Payment Status</p>
          <StatusBadge status={order.paymentStatus} variant="payment" />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Order Status</p>
          <StatusBadge status={order.orderStatus} variant="order" />
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1.5">Shipping Address</p>
        <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700">
          <p>{order.shipping.address}</p>
          <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
          <p>{order.shipping.country}</p>
          <p className="text-gray-400 mt-0.5">Method: {order.shipping.method}</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1.5">Timeline</p>
        <div className="space-y-2">
          {["Order Placed", "Payment confirmed", "Processing", "Shipped", "Delivered"].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${i < 4 ? "bg-[#10B981]" : "bg-gray-300"}`} />
              <span className={`text-sm ${i < 4 ? "text-gray-900" : "text-gray-400"}`}>{step}</span>
              {i < 1 && <span className="text-xs text-gray-400 ml-auto">{order.date}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
