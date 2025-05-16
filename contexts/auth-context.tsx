"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  username: string
  name: string
  email?: string
  phone?: string
  socialLink?: string
  jifuId?: string
  package?: string
  isAdmin?: boolean
  role?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "isAdmin"> & { password: string }) => Promise<boolean>
  logout: () => void
  updateUserRole: (username: string, newRole: string) => boolean
}

// Lista de administradores com suas credenciais
const ADMIN_USERS = [
  { username: "admin", password: "Superacao2022#", name: "Administrador" },
  { username: "ricardogarciapt", password: "Superacao2022#", name: "Ricardo Garcia" },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Verificar se há um usuário salvo no localStorage (apenas no cliente)
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user")
      return savedUser ? JSON.parse(savedUser) : null
    }
    return null
  })

  const isAuthenticated = !!user
  const isAdmin = !!user?.isAdmin

  const login = async (username: string, password: string) => {
    // Verificar se é um login de administrador
    const adminUser = ADMIN_USERS.find((admin) => admin.username === username && admin.password === password)

    if (adminUser) {
      const adminUserData = {
        username: adminUser.username,
        name: adminUser.name,
        isAdmin: true,
      }
      setUser(adminUserData)
      localStorage.setItem("user", JSON.stringify(adminUserData))
      return true
    }

    // Simulação de autenticação para usuários normais
    if (typeof window !== "undefined") {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const foundUser = registeredUsers.find((u: any) => u.username === username && u.password === password)

      if (foundUser) {
        const userData = {
          username: foundUser.username,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          socialLink: foundUser.socialLink,
          jifuId: foundUser.jifuId,
          package: foundUser.package,
          role: foundUser.role || "Membro",
          isAdmin: false,
        }
        setUser(userData)

        // Salvar no localStorage para persistência
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }

      // Credenciais de teste para demonstração
      if (username === "demo" && password === "password") {
        const userData = { username, name: "Usuário Demo", isAdmin: false }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
    }
    return false
  }

  const register = async (userData: Omit<User, "isAdmin"> & { password: string }) => {
    try {
      // Verificar se está tentando registrar um nome de usuário de administrador
      if (ADMIN_USERS.some((admin) => admin.username === userData.username)) {
        return false // Não permitir registro com nomes de usuário reservados para admins
      }

      // Em produção, isso seria uma chamada API
      // Simulação de registro
      if (typeof window !== "undefined") {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

        // Verificar se o usuário já existe
        if (registeredUsers.some((u: any) => u.username === userData.username)) {
          return false
        }

        // Adicionar novo usuário
        registeredUsers.push(userData)
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))

        // Fazer login automático após o registro
        const { password, ...userWithoutPassword } = userData
        const userWithAdmin = { ...userWithoutPassword, isAdmin: false, role: userData.role || "Membro" }
        setUser(userWithAdmin)
        localStorage.setItem("user", JSON.stringify(userWithAdmin))

        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao registrar:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUserRole = (username: string, newRole: string) => {
    if (typeof window !== "undefined") {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

      // Atualiza o role do usuário no array de usuários registrados
      const updatedUsers = registeredUsers.map((u: any) => {
        if (u.username === username) {
          return { ...u, role: newRole }
        }
        return u
      })

      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

      // Se o usuário atual for o que está sendo atualizado, atualiza também o estado
      if (user && user.username === username) {
        const updatedUser = { ...user, role: newRole }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout, updateUserRole }}>
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
