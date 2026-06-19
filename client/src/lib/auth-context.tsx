"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { api } from "./api"

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user")
    const storedToken = localStorage.getItem("admin_token")
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post<{ user: AuthUser; token: string }>("/auth/login", {
        email,
        password,
      })

      const { user: userData, token: tokenData } = response

      const userObj: AuthUser = {
        id: userData.id,
        name: userData.email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        email: userData.email,
        role: userData.role,
      }

      localStorage.setItem("admin_user", JSON.stringify(userObj))
      localStorage.setItem("admin_token", tokenData)
      setUser(userObj)
      setToken(tokenData)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("admin_user")
    localStorage.removeItem("admin_token")
    setUser(null)
    setToken(null)
    router.push("/admin/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: !!user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}