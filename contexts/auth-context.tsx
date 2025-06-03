"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthUser {
  id: string
  username: string
  name: string
  email?: string
  phone?: string
  social_link?: string
  jifu_id?: string
  package?: string
  is_admin: boolean
  role?: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (userData: Omit<AuthUser, "id" | "is_admin"> & { password: string }) => Promise<boolean>
  logout: () => void
  updateUserRole: (username: string, newRole: string) => Promise<boolean> // username might be better as userId
  updateUserPackage: (packageId: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const ADMIN_USERS = [
  { username: "admin", password: "Superacao2022#", name: "Administrador" },
  { username: "ricardogarciapt", password: "Superacao2022#", name: "Ricardo Garcia" },
]

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = () => {
      try {
        if (typeof window !== "undefined") {
          const savedUser = localStorage.getItem("user")
          if (savedUser) {
            const userData = JSON.parse(savedUser)
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Error loading user:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("user")
        }
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const adminUser = ADMIN_USERS.find((admin) => admin.username === username && admin.password === password)
      if (adminUser) {
        const adminUserData: AuthUser = {
          id: `admin-${adminUser.username}`, // Consider a more robust ID generation
          username: adminUser.username,
          name: adminUser.name,
          is_admin: true,
          role: "Admin",
        }
        setUser(adminUserData)
        if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(adminUserData))
        return true
      }

      if (username === "demo" && password === "password") {
        const demoUser: AuthUser = {
          id: "demo-user",
          username: "demo",
          name: "Usuário Demo",
          is_admin: false,
          role: "Membro",
        }
        setUser(demoUser)
        if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(demoUser))
        return true
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (userData: Omit<AuthUser, "id" | "is_admin"> & { password: string }): Promise<boolean> => {
    try {
      if (ADMIN_USERS.some((admin) => admin.username === userData.username)) return false

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const newUser = await response.json()
        setUser(newUser)
        if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(newUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") localStorage.removeItem("user")
  }

  const updateUserRole = async (username: string, newRole: string): Promise<boolean> => {
    if (!user || user.username !== username) {
      // Basic check, ideally use userId
      console.warn("User not authenticated or username mismatch for role update.")
      return false
    }
    try {
      const response = await fetch("/api/user/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, newRole }), // Send userId
      })

      if (response.ok) {
        const updatedUserData = await response.json()
        setUser(updatedUserData) // Update local state with response from API
        if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(updatedUserData))
        return true
      }
      console.error("Failed to update user role via API:", await response.text())
      return false
    } catch (error) {
      console.error("Error updating user role:", error)
      return false
    }
  }

  const updateUserPackage = async (packageId: string): Promise<boolean> => {
    if (!user) return false
    try {
      const response = await fetch("/api/user/update-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, packageId }),
      })

      if (response.ok) {
        const updatedUserData = await response.json()
        setUser(updatedUserData) // Update local state with response from API
        if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(updatedUserData))
        return true
      }
      console.error("Failed to update user package via API:", await response.text())
      return false
    } catch (error) {
      console.error("Error updating user package:", error)
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: !!user?.is_admin,
    login,
    register,
    logout,
    updateUserRole,
    updateUserPackage,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
export type { AuthUser, AuthContextType }
