import type {
  AdminUser,
  DashboardStats,
  Order,
  Product,
  Category,
  User,
  RevenuePoint,
  SalesPoint,
  MonthlyPerformance,
} from "@/types/admin"

export const adminUsers: AdminUser[] = [
  { id: "1", name: "Nutzera Admin", email: "admin@nutzera.com", avatar: "", role: "super_admin", status: "active", lastActive: "2 min ago", permissions: ["all"] },
  { id: "2", name: "Sarah Chen", email: "sarah@nutzera.com", avatar: "", role: "admin", status: "active", lastActive: "15 min ago", permissions: ["products", "orders", "users"] },
  { id: "3", name: "Mike Johnson", email: "mike@nutzera.com", avatar: "", role: "manager", status: "active", lastActive: "1 hour ago", permissions: ["products", "orders"] },
  { id: "4", name: "Emily Davis", email: "emily@nutzera.com", avatar: "", role: "support", status: "active", lastActive: "3 hours ago", permissions: ["orders", "customers"] },
  { id: "5", name: "James Wilson", email: "james@nutzera.com", avatar: "", role: "inventory", status: "inactive", lastActive: "2 days ago", permissions: ["inventory"] },
]

export const dashboardStats: DashboardStats = {
  totalRevenue: 284500,
  revenueChange: 12.5,
  totalOrders: 3847,
  ordersChange: 8.2,
  totalProducts: 156,
  productsChange: -3.1,
  totalCustomers: 12489,
  customersChange: 18.7,
}

export const revenueData: RevenuePoint[] = [
  { month: "Jan", revenue: 18500, target: 16000 },
  { month: "Feb", revenue: 22300, target: 20000 },
  { month: "Mar", revenue: 28100, target: 24000 },
  { month: "Apr", revenue: 25600, target: 26000 },
  { month: "May", revenue: 31200, target: 28000 },
  { month: "Jun", revenue: 34800, target: 30000 },
  { month: "Jul", revenue: 37200, target: 32000 },
  { month: "Aug", revenue: 38900, target: 35000 },
  { month: "Sep", revenue: 35200, target: 34000 },
  { month: "Oct", revenue: 39500, target: 36000 },
  { month: "Nov", revenue: 42800, target: 38000 },
  { month: "Dec", revenue: 46500, target: 40000 },
]

export const salesData: SalesPoint[] = [
  { day: "Mon", sales: 4200, orders: 145 },
  { day: "Tue", sales: 3800, orders: 132 },
  { day: "Wed", sales: 5100, orders: 178 },
  { day: "Thu", sales: 4600, orders: 156 },
  { day: "Fri", sales: 5900, orders: 201 },
  { day: "Sat", sales: 5300, orders: 189 },
  { day: "Sun", sales: 4800, orders: 167 },
]

export const monthlyPerformance: MonthlyPerformance[] = [
  { month: "Jan", revenue: 18500, profit: 7400, expenses: 11100 },
  { month: "Feb", revenue: 22300, profit: 8900, expenses: 13400 },
  { month: "Mar", revenue: 28100, profit: 11200, expenses: 16900 },
  { month: "Apr", revenue: 25600, profit: 10200, expenses: 15400 },
  { month: "May", revenue: 31200, profit: 12500, expenses: 18700 },
  { month: "Jun", revenue: 34800, profit: 13900, expenses: 20900 },
]

export const products: Product[] = [
  { id: "PRD-001", name: "Almond Date Bar", sku: "NDB-001", category: "Nut Bars", price: 4.99, stock: 245, status: "active", image: "", description: "Premium almond and date energy bar", createdAt: "2025-01-15" },
  { id: "PRD-002", name: "Dark Chocolate Cashew", sku: "NDB-002", category: "Chocolate Bars", price: 5.99, stock: 180, status: "active", image: "", description: "Dark chocolate with roasted cashews", createdAt: "2025-01-20" },
  { id: "PRD-003", name: "Coconut Mango Bites", sku: "NDB-003", category: "Fruit Bites", price: 3.99, stock: 0, status: "archived", image: "", description: "Tropical coconut and mango bite-sized snacks", createdAt: "2025-02-01" },
  { id: "PRD-004", name: "Peanut Protein Bar", sku: "NDB-004", category: "Protein Bars", price: 6.99, stock: 320, status: "active", image: "", description: "High-protein peanut butter bar", createdAt: "2025-02-10" },
  { id: "PRD-005", name: "Mixed Berry Blend", sku: "NDB-005", category: "Fruit Bites", price: 4.49, stock: 15, status: "active", image: "", description: "Mixed berry and nut blend", createdAt: "2025-03-05" },
  { id: "PRD-006", name: "Matcha Green Tea Bar", sku: "NDB-006", category: "Nut Bars", price: 5.49, stock: 0, status: "draft", image: "", description: "Matcha-infused nut and seed bar", createdAt: "2025-03-15" },
  { id: "PRD-007", name: "Honey Roasted Mix", sku: "NDB-007", category: "Nut Bars", price: 5.29, stock: 190, status: "active", image: "", description: "Honey roasted nuts and seeds", createdAt: "2025-04-01" },
  { id: "PRD-008", name: "Dark Chocolate Almond", sku: "NDB-008", category: "Chocolate Bars", price: 6.49, stock: 210, status: "active", image: "", description: "Dark chocolate with whole almonds", createdAt: "2025-04-15" },
]

export const orders: Order[] = [
  { id: "ORD-001", customer: "John Smith", email: "john@example.com", product: "Almond Date Bar", amount: 49.90, paymentStatus: "paid", orderStatus: "delivered", date: "2025-06-14", items: 10, shipping: { address: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "US", method: "Standard" } },
  { id: "ORD-002", customer: "Emma Wilson", email: "emma@example.com", product: "Dark Chocolate Cashew", amount: 29.95, paymentStatus: "paid", orderStatus: "shipped", date: "2025-06-13", items: 5, shipping: { address: "456 Oak Ave", city: "Los Angeles", state: "CA", zip: "90001", country: "US", method: "Express" } },
  { id: "ORD-003", customer: "Michael Brown", email: "michael@example.com", product: "Peanut Protein Bar", amount: 69.90, paymentStatus: "pending", orderStatus: "processing", date: "2025-06-12", items: 10, shipping: { address: "789 Pine Rd", city: "Chicago", state: "IL", zip: "60601", country: "US", method: "Standard" } },
  { id: "ORD-004", customer: "Sophia Garcia", email: "sophia@example.com", product: "Mixed Berry Blend", amount: 13.47, paymentStatus: "paid", orderStatus: "delivered", date: "2025-06-11", items: 3, shipping: { address: "321 Elm St", city: "Houston", state: "TX", zip: "77001", country: "US", method: "Standard" } },
  { id: "ORD-005", customer: "William Lee", email: "william@example.com", product: "Honey Roasted Mix", amount: 52.90, paymentStatus: "failed", orderStatus: "cancelled", date: "2025-06-10", items: 10, shipping: { address: "654 Maple Dr", city: "Phoenix", state: "AZ", zip: "85001", country: "US", method: "Express" } },
  { id: "ORD-006", customer: "Olivia Martinez", email: "olivia@example.com", product: "Dark Chocolate Almond", amount: 32.45, paymentStatus: "paid", orderStatus: "processing", date: "2025-06-09", items: 5, shipping: { address: "987 Cedar Ln", city: "San Francisco", state: "CA", zip: "94101", country: "US", method: "Standard" } },
  { id: "ORD-007", customer: "James Taylor", email: "james@example.com", product: "Almond Date Bar", amount: 24.95, paymentStatus: "pending", orderStatus: "pending", date: "2025-06-08", items: 5, shipping: { address: "147 Birch St", city: "Seattle", state: "WA", zip: "98101", country: "US", method: "Standard" } },
  { id: "ORD-008", customer: "Ava Anderson", email: "ava@example.com", product: "Peanut Protein Bar", amount: 83.88, paymentStatus: "paid", orderStatus: "delivered", date: "2025-06-07", items: 12, shipping: { address: "258 Walnut Ave", city: "Miami", state: "FL", zip: "33101", country: "US", method: "Express" } },
]

export const categories: Category[] = [
  { id: "CAT-001", name: "Nut Bars", slug: "nut-bars", products: 24, status: "active", createdAt: "2025-01-10" },
  { id: "CAT-002", name: "Chocolate Bars", slug: "chocolate-bars", products: 18, status: "active", createdAt: "2025-01-10" },
  { id: "CAT-003", name: "Fruit Bites", slug: "fruit-bites", products: 15, status: "active", createdAt: "2025-01-15" },
  { id: "CAT-004", name: "Protein Bars", slug: "protein-bars", products: 22, status: "active", createdAt: "2025-02-01" },
  { id: "CAT-005", name: "Seed Mixes", slug: "seed-mixes", products: 8, status: "inactive", createdAt: "2025-02-15" },
  { id: "CAT-006", name: "Dried Fruits", slug: "dried-fruits", products: 12, status: "active", createdAt: "2025-03-01" },
  { id: "CAT-007", name: "Gift Boxes", slug: "gift-boxes", products: 6, status: "active", createdAt: "2025-04-01" },
]

export const customers: User[] = [
  { id: "USR-001", name: "John Smith", email: "john@example.com", avatar: "", role: "Customer", status: "active", joined: "2024-11-15", orders: 24, totalSpent: 489.50 },
  { id: "USR-002", name: "Emma Wilson", email: "emma@example.com", avatar: "", role: "Customer", status: "active", joined: "2025-01-20", orders: 12, totalSpent: 215.80 },
  { id: "USR-003", name: "Michael Brown", email: "michael@example.com", avatar: "", role: "Customer", status: "active", joined: "2025-03-10", orders: 8, totalSpent: 156.70 },
  { id: "USR-004", name: "Sophia Garcia", email: "sophia@example.com", avatar: "", role: "Customer", status: "blocked", joined: "2024-09-05", orders: 3, totalSpent: 45.85 },
  { id: "USR-005", name: "William Lee", email: "william@example.com", avatar: "", role: "Customer", status: "active", joined: "2025-04-22", orders: 18, totalSpent: 342.60 },
  { id: "USR-006", name: "Olivia Martinez", email: "olivia@example.com", avatar: "", role: "Customer", status: "active", joined: "2025-02-14", orders: 6, totalSpent: 98.40 },
  { id: "USR-007", name: "James Taylor", email: "james@example.com", avatar: "", role: "Customer", status: "active", joined: "2024-12-01", orders: 15, totalSpent: 267.30 },
  { id: "USR-008", name: "Ava Anderson", email: "ava@example.com", avatar: "", role: "Customer", status: "inactive", joined: "2025-05-08", orders: 1, totalSpent: 24.95 },
]
