export interface AdminUser {
  id: string
  name: string
  email: string
  avatar: string
  role: "super_admin" | "admin" | "manager" | "support" | "inventory"
  status: "active" | "inactive"
  lastActive: string
  permissions: string[]
}

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalProducts: number
  productsChange: number
  totalCustomers: number
  customersChange: number
}

export interface Order {
  id: string
  customer: string
  email: string
  product: string
  amount: number
  paymentStatus: "paid" | "pending" | "failed" | "refunded"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  items: number
  shipping: {
    address: string
    city: string
    state: string
    zip: string
    country: string
    method: string
  }
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: "active" | "draft" | "archived"
  image: string
  description: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  products: number
  status: "active" | "inactive"
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  status: "active" | "inactive" | "blocked"
  joined: string
  orders: number
  totalSpent: number
}

export interface RevenuePoint {
  month: string
  revenue: number
  target: number
}

export interface SalesPoint {
  day: string
  sales: number
  orders: number
}

export interface OrderStatusPoint {
  status: string
  count: number
  color: string
}

export interface MonthlyPerformance {
  month: string
  revenue: number
  profit: number
  expenses: number
}
