"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { db } from "@/lib/database-service"

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
  updateUserRole: (username: string, newRole: string) => Promise<boolean>
  updateUserPackage: (packageId: string) => Promise<boolean>
  isLoading: boolean
}

// Lista de administradores com suas credenciais
const ADMIN_USERS = [
  { username: "admin", password: "Superacao2022#", name: "Administrador" },
  { username: "ricardogarciapt", password: "Superacao2022#", name: "Ricardo Garcia" },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      if (typeof window !== "undefined") {
        try {
          const savedUser = localStorage.getItem("user")
          if (savedUser) {
            const userData = JSON.parse(savedUser)
            setUser(userData)
          }
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("user")
        }
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const isAuthenticated = !!user
  const isAdmin = !!user?.is_admin

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Check if it's an admin user first
      const adminUser = ADMIN_USERS.find((admin) => admin.username === username && admin.password === password)

      if (adminUser) {
        const adminUserData: AuthUser = {
          id: `admin-${adminUser.username}`,
          username: adminUser.username,
          name: adminUser.name,
          is_admin: true,
          role: "Admin",
        }
        setUser(adminUserData)
        localStorage.setItem("user", JSON.stringify(adminUserData))
        return true
      }

      // For regular users, try API authentication
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
          return true
        }
      } catch (apiError) {
        console.error("API login error:", apiError)
      }

      // Fallback to demo credentials
      if (username === "demo" && password === "password") {
        const userData: AuthUser = {
          id: "demo-user",
          username,
          name: "Usuário Demo",
          is_admin: false,
          role: "Membro",
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
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
      // Check if it's trying to register an admin username
      if (ADMIN_USERS.some((admin) => admin.username === userData.username)) {
        return false
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const newUser = await response.json()
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
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
    localStorage.removeItem("user")
  }

  const updateUserRole = async (username: string, newRole: string): Promise<boolean> => {
    try {
      const success = await db.updateUserRole(username, newRole)

      if (success && user && user.username === username) {
        const updatedUser = { ...user, role: newRole }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      return success
    } catch (error) {
      console.error("Error updating user role:", error)
      return false
    }
  }

  const updateUserPackage = async (packageId: string): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = await db.updateUser(user.id, { package: packageId })

      if (updatedUser) {
        const authUser: AuthUser = {
          ...user,
          package: updatedUser.package || undefined,
        }
        setUser(authUser)
        localStorage.setItem("user", JSON.stringify(authUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Error updating user package:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateUserRole,
        updateUserPackage,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
