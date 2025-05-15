"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  username: string
  name: string
  email?: string
  phone?: string
  socialLink?: string
  package?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "package"> & { password: string; package: string }) => Promise<boolean>
  logout: () => void
}

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

  const login = async (username: string, password: string) => {
    // Simulação de autenticação - em produção, isso seria uma chamada API
    // Verificar se o usuário existe no localStorage
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
          package: foundUser.package,
        }
        setUser(userData)

        // Salvar no localStorage para persistência
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }

      // Credenciais de teste para demonstração
      if (username === "demo" && password === "password") {
        const userData = { username, name: "Usuário Demo" }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
    }
    return false
  }

  const register = async (userData: Omit<User, "package"> & { password: string; package: string }) => {
    try {
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
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))

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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
