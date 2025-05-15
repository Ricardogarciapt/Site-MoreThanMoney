"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  username: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
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
    // Credenciais de teste: username: "demo", password: "password"
    if (username === "demo" && password === "password") {
      const userData = { username, name: "Usuário Demo" }
      setUser(userData)

      // Salvar no localStorage para persistência
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
