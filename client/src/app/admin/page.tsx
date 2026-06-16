"use client"

import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"
import { StatCard } from "@/components/admin/StatCard"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { dashboardStats, revenueData, salesData, monthlyPerformance, orders } from "@/lib/admin-data"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)

interface TooltipPayloadEntry {
  color?: string
  name?: string
  value?: number
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadEntry[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="text-gray-500 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }} className="font-medium">
            {entry.name}: {entry.name === "Revenue" || entry.name === "Target" ? formatCurrency(entry.value ?? 0) : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  const statCards = [
    { label: "Total Revenue", value: formatCurrency(dashboardStats.totalRevenue), change: dashboardStats.revenueChange, icon: <DollarSign size={20} />, prefix: "" },
    { label: "Total Orders", value: dashboardStats.totalOrders.toLocaleString(), change: dashboardStats.ordersChange, icon: <ShoppingCart size={20} /> },
    { label: "Total Products", value: dashboardStats.totalProducts.toLocaleString(), change: dashboardStats.productsChange, icon: <Package size={20} /> },
    { label: "Total Customers", value: dashboardStats.totalCustomers.toLocaleString(), change: dashboardStats.customersChange, icon: <Users size={20} /> },
  ]

  const recentOrders = orders.slice(0, 5)

  const orderStatusData = [
    { status: "Delivered", count: orders.filter((o) => o.orderStatus === "delivered").length, color: "#10B981" },
    { status: "Processing", count: orders.filter((o) => o.orderStatus === "processing").length, color: "#3B82F6" },
    { status: "Shipped", count: orders.filter((o) => o.orderStatus === "shipped").length, color: "#8B5CF6" },
    { status: "Pending", count: orders.filter((o) => o.orderStatus === "pending").length, color: "#F59E0B" },
    { status: "Cancelled", count: orders.filter((o) => o.orderStatus === "cancelled").length, color: "#EF4444" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your eCommerce overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly revenue vs targets</p>
            </div>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#064E3B" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#064E3B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#revenueGrad)" name="Revenue" />
                <Area type="monotone" dataKey="target" stroke="#064E3B" strokeWidth={2} strokeDasharray="5 5" fill="url(#targetGrad)" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">Orders Status</h3>
            <p className="text-xs text-gray-500 mt-0.5">Current order distribution</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {orderStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {orderStatusData.map((item) => (
              <div key={item.status} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.status}</span>
                </div>
                <span className="font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Weekly Sales Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Sales and orders by day</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="sales" fill="#10B981" radius={[4, 4, 0, 0]} name="Sales ($)" />
                <Bar dataKey="orders" fill="#064E3B" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Monthly Performance</h3>
              <p className="text-xs text-gray-500 mt-0.5">Revenue, profit & expenses</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="revenue" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="profit" stackId="a" fill="#047857" radius={[4, 4, 0, 0]} name="Profit" />
                <Bar dataKey="expenses" stackId="a" fill="#D1FAE5" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-xs text-gray-500 mt-0.5">Latest 5 orders</p>
          </div>
          <button className="text-sm text-[#10B981] hover:text-[#047857] font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-3.5 text-gray-700">{order.customer}</td>
                  <td className="px-5 py-3.5 text-gray-700">{order.product}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">${order.amount.toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.paymentStatus} variant="payment" />
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.orderStatus} variant="order" />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
