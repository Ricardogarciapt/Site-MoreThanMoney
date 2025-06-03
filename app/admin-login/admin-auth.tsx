"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Credenciais de admin hardcoded para simplificar
const ADMIN_CREDENTIALS = [
  { username: "admin", password: "Superacao2022#" },
  { username: "ricardogarciapt", password: "Superacao2022#" },
]

export default function AdminAuth() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Verificar se já está logado
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      router.push("/admin-dashboard")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simular delay para feedback visual
    setTimeout(() => {
      const isValidAdmin = ADMIN_CREDENTIALS.some((admin) => admin.username === username && admin.password === password)

      if (isValidAdmin) {
        // Armazenar autenticação
        localStorage.setItem("adminAuth", "true")
        localStorage.setItem("adminUser", username)

        // Redirecionar para o dashboard
        router.push("/admin-dashboard")
      } else {
        setError("Credenciais inválidas. Tente novamente.")
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <Card className="w-full max-w-md bg-black/50 border-gold-500/30 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gold-500/20 rounded-full w-fit">
            <Lock className="h-8 w-8 text-gold-500" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <CardDescription className="text-gray-400">Entre com suas credenciais de administrador</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">
                Usuário
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/50 border-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-gray-700 text-white"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
