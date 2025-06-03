"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticação
    const adminAuth = localStorage.getItem("adminAuth")
    setIsAuthenticated(adminAuth === "true")

    if (adminAuth !== "true") {
      router.push("/admin-login")
    }
  }, [router])

  // Mostrar loading enquanto verifica
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold-400 font-medium">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se não estiver autenticado, mostrar mensagem
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <Card className="w-[400px] bg-black/50 border-gold-500/30 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-gold-500/20 rounded-full w-fit">
              <Lock className="h-8 w-8 text-gold-500" />
            </div>
            <CardTitle className="text-2xl text-white">Acesso Restrito</CardTitle>
            <CardDescription className="text-gray-400">Esta área é exclusiva para administradores.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => router.push("/admin-login")}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
            >
              Fazer Login como Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Se estiver autenticado, mostrar conteúdo
  return <>{children}</>
}
