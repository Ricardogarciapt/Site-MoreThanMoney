"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  )
}

function AdminContent() {
  const { isAdmin } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "ricardogarciapt" && password === "Superacao2022#") {
      // Redirecionar para o dashboard de admin
      router.push("/admin-dashboard")
    } else {
      setError("Credenciais inválidas. Tente novamente.")
    }
  }

  // Se não for admin, mostrar formulário de login
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="outline" className="mr-4 border-gold-500 text-gold-500 hover:bg-gold-500/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-black/50 border border-gold-500/30 p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <Lock className="h-12 w-12 text-gold-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gold-500">Acesso Restrito</h2>
                <p className="text-gray-400">Esta área é exclusiva para administradores.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input
                      id="username"
                      className="bg-black/70 border-gray-700"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      className="bg-black/70 border-gray-700"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" className="w-full bg-gold-600 hover:bg-gold-700 text-black font-medium">
                    Entrar
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <Link href="/">
                  <Button variant="link" className="text-gold-400 hover:text-gold-500">
                    Voltar para o Início
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Se já estiver autenticado como admin, redirecionar para o dashboard
  router.push("/admin-dashboard")
  return null
}
