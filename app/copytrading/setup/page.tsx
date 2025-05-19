"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import { MembershipRequired } from "@/components/membership-required"
import { CopytradingConfig } from "@/components/copytrading-config"

export default function CopytradingSetupPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Pequeno atraso para evitar flash de conteúdo durante a verificação de autenticação
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!isAuthenticated) {
        router.push("/")
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-gold-500">Carregando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Não renderiza nada enquanto redireciona
  }

  return (
    <>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <MembershipRequired>
            <CopytradingConfig />
          </MembershipRequired>
        </div>
      </main>
    </>
  )
}
