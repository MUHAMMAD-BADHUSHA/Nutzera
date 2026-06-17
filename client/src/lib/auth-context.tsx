"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_CREDENTIALS = {
  email: "admin@nutzera.com",
  password: "admin123",
}

const DEMO_USER: AuthUser = {
  id: "1",
  name: "Nutzera Admin",
  email: "admin@nutzera.com",
  role: "super_admin",
  avatar: "",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_user")
      return stored ? JSON.parse(stored) : null
    }
    return null
  })
  const [loading] = useState(false)
  const router = useRouter()

  const login = useCallback(async (email: string, password: string) => {
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      localStorage.setItem("admin_user", JSON.stringify(DEMO_USER))
      setUser(DEMO_USER)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("admin_user")
    setUser(null)
    router.push("/admin/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
