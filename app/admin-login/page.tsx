"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertCircle, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  // Redirecionar se já estiver autenticado como admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.push("/admin-dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        // Verificar se o login foi bem-sucedido e se o usuário é admin
        if (isAdmin) {
          router.push("/admin-dashboard")
        } else {
          setError("Esta conta não tem privilégios de administrador.")
        }
      } else {
        setError("Credenciais inválidas. Tente novamente.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 p-4">
      <Card className="w-full max-w-md bg-black/50 border-gold-500/30 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-gold-400 hover:text-gold-300 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
            </Link>
            <Lock className="h-6 w-6 text-gold-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gold-gradient mt-4">
            Acesso Administrativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 text-red-200 p-3 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-gray-800/50 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800/50 border-white/10 text-white"
              />
            </div>

            <Button type="submit" className="w-full bg-gold-600 hover:bg-gold-700 text-black" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar como Administrador"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-400">
          <p className="w-full">Acesso restrito apenas para administradores do sistema.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
