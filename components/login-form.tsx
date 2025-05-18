"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!username.trim()) {
      setError("Nome de usuário é obrigatório")
      return
    }

    if (!password.trim()) {
      setError("Senha é obrigatória")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        onSuccess?.()
        router.push("/member-area")
      } else {
        setError("Credenciais inválidas. Verifique seu nome de usuário e senha.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente mais tarde.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black/50 border-gold-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gold-gradient">Acesso à Área de Membro</CardTitle>
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
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-sm text-gray-400 text-center mt-4">
            <p>
              Não tem uma conta?{" "}
              <a href="/register" className="text-gold-400 hover:underline">
                Registre-se aqui
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
