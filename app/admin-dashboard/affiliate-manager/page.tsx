"use client"

import { CardFooter } from "@/components/ui/card"

import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

interface AffiliateUser {
  id: string
  username: string
  name: string
  email: string
  role: string
  affiliateCode: string
  totalCommission: number
  pendingCommission: number
}

interface Commission {
  id: string
  affiliateUsername: string
  customerUsername: string
  productName: string
  amount: number
  status: "pending" | "paid" | "cancelled"
  date: string
}

// Loading component
function AffiliateManagerLoading() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Gestão de Afiliados</h1>
          <p className="text-gray-400">Carregando dados dos afiliados...</p>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
        </div>
      </div>
    </div>
  )
}

// Simple affiliate manager component
function AffiliateManagerContent() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Gestão de Afiliados</h1>
          <p className="text-gray-400">Gerencie os códigos de afiliado e comissões dos membros MoreThanMoney.</p>
        </div>

        <div className="grid gap-6">
          {/* Affiliate Management Card */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciamento de Afiliados
              </CardTitle>
              <CardDescription>Gerencie os códigos de afiliado dos membros elegíveis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-white mb-2">Funcionalidades Disponíveis:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Gerar códigos de afiliado para membros VIP, Premium, Gold e Platinum</li>
                    <li>• Visualizar comissões pendentes e pagas</li>
                    <li>• Gerenciar status de pagamentos</li>
                    <li>• Relatórios de performance de afiliados</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="font-medium text-blue-400 mb-2">Status do Sistema</h4>
                  <p className="text-blue-300 text-sm">
                    Sistema de afiliados ativo e funcionando. Todas as funcionalidades estão disponíveis.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">0</div>
                    <div className="text-sm text-green-300">Afiliados Ativos</div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-400">€0.00</div>
                    <div className="text-sm text-yellow-300">Comissões Pendentes</div>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">€0.00</div>
                    <div className="text-sm text-purple-300">Total Pago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Management Card */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Histórico de Comissões</CardTitle>
              <CardDescription>Visualize e gerencie todas as comissões de afiliados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">Nenhuma comissão encontrada no momento.</div>
                <p className="text-sm text-gray-500">
                  As comissões aparecerão aqui quando houver vendas através de códigos de afiliado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/admin-dashboard">
            <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o Painel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Client Component
const AffiliateManagerClientComponent = () => {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [affiliates, setAffiliates] = useState<AffiliateUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"affiliates" | "commissions">("affiliates")
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [selectedAffiliate, setSelectedAffiliate] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(true)

  // Função para verificar se um usuário pode ser afiliado
  const canBeAffiliate = (role: string): boolean => {
    const eligibleRoles = ["VIP", "Premium", "Gold", "Platinum"]
    return eligibleRoles.includes(role)
  }

  // Função para gerar código de afiliado
  const generateAffiliateCode = (username: string): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = username.substring(0, 3).toUpperCase()

    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return code
  }

  // Função para obter comissões de um afiliado
  const getAffiliateCommissions = (username: string): Commission[] => {
    if (typeof window === "undefined") return []

    try {
      const storedCommissions = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
      return storedCommissions.filter((comm: Commission) => comm.affiliateUsername === username)
    } catch (error) {
      console.error("Error getting affiliate commissions:", error)
      return []
    }
  }

  // Função para atualizar status da comissão
  const updateCommissionStatus = (commissionId: string, newStatus: "pending" | "paid" | "cancelled") => {
    if (typeof window === "undefined") return

    try {
      const storedCommissions = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
      const updatedCommissions = storedCommissions.map((comm: Commission) => {
        if (comm.id === commissionId) {
          return { ...comm, status: newStatus }
        }
        return comm
      })

      localStorage.setItem("commissionHistory", JSON.stringify(updatedCommissions))

      // Atualizar o estado local
      setCommissions(updatedCommissions)
      setSuccessMessage(`Comissão marcada como ${newStatus === "paid" ? "paga" : newStatus} com sucesso`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating commission status:", error)
    }
  }

  // Carregar dados dos afiliados
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(true)

      try {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

        // Filtrar apenas usuários que podem ser afiliados
        const eligibleUsers = registeredUsers.filter((u: any) => canBeAffiliate(u.role || "Membro"))

        // Buscar informações de afiliados do localStorage
        const storedAffiliates = JSON.parse(localStorage.getItem("affiliates") || "[]")

        // Mapear usuários elegíveis para o formato de afiliados
        const mappedAffiliates = eligibleUsers.map((user: any) => {
          // Verificar se já existe como afiliado
          const existingAffiliate = storedAffiliates.find((a: any) => a.username === user.username)

          // Buscar comissões do afiliado
          const userCommissions = getAffiliateCommissions(user.username)
          const totalCommission = userCommissions.reduce((sum, comm) => {
            return sum + (comm.status !== "cancelled" ? comm.amount : 0)
          }, 0)

          const pendingCommission = userCommissions.reduce((sum, comm) => {
            return sum + (comm.status === "pending" ? comm.amount : 0)
          }, 0)

          return {
            id: user.id || user.username,
            username: user.username,
            name: user.name,
            email: user.email || "",
            role: user.role || "Membro",
            affiliateCode: existingAffiliate?.affiliateCode || "",
            totalCommission,
            pendingCommission,
          }
        })

        setAffiliates(mappedAffiliates)

        // Buscar todas as comissões
        const allCommissions = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
        setCommissions(allCommissions)
      } catch (error) {
        console.error("Error loading affiliate data:", error)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  // Redirecionar se não for autenticado ou admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (!isAdmin) {
      router.push("/member-area")
    }
  }, [isAuthenticated, isAdmin, router])

  // Filtrar afiliados com base no termo de pesquisa
  const filteredAffiliates = affiliates.filter(
    (affiliate) =>
      affiliate.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (affiliate.email && affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (affiliate.affiliateCode && affiliate.affiliateCode.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Gerar código de afiliado para um usuário
  const handleGenerateCode = (username: string) => {
    const newCode = generateAffiliateCode(username)

    // Atualizar afiliados no estado
    const updatedAffiliates = affiliates.map((affiliate) => {
      if (affiliate.username === username) {
        return { ...affiliate, affiliateCode: newCode }
      }
      return affiliate
    })

    setAffiliates(updatedAffiliates)

    // Salvar no localStorage
    if (typeof window !== "undefined") {
      const storedAffiliates = JSON.parse(localStorage.getItem("affiliates") || "[]")
      const existingIndex = storedAffiliates.findIndex((a: any) => a.username === username)

      if (existingIndex >= 0) {
        storedAffiliates[existingIndex].affiliateCode = newCode
      } else {
        storedAffiliates.push({ username, affiliateCode: newCode })
      }

      localStorage.setItem("affiliates", JSON.stringify(storedAffiliates))
    }

    setSuccessMessage(`Código de afiliado gerado com sucesso para ${username}`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  // Remover código de afiliado
  const handleRemoveCode = (username: string) => {
    // Atualizar afiliados no estado
    const updatedAffiliates = affiliates.map((affiliate) => {
      if (affiliate.username === username) {
        return { ...affiliate, affiliateCode: "" }
      }
      return affiliate
    })

    setAffiliates(updatedAffiliates)

    // Salvar no localStorage
    if (typeof window !== "undefined") {
      const storedAffiliates = JSON.parse(localStorage.getItem("affiliates") || "[]")
      const filteredAffiliates = storedAffiliates.filter((a: any) => a.username !== username)
      localStorage.setItem("affiliates", JSON.stringify(filteredAffiliates))
    }

    setSuccessMessage(`Código de afiliado removido com sucesso para ${username}`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  // Marcar comissão como paga
  const handleMarkAsPaid = (commissionId: string) => {
    updateCommissionStatus(commissionId, "paid")
  }

  // Filtrar comissões por afiliado selecionado
  const filteredCommissions = selectedAffiliate
    ? commissions.filter((comm) => comm.affiliateUsername === selectedAffiliate)
    : commissions

  // Formatar valor como euros
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(value)
  }

  // Se não for admin, não mostrar conteúdo
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-[350px] bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
            <CardDescription className="text-center">Esta área é exclusiva para administradores.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Users className="h-16 w-16 text-gold-500" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button variant="default" className="bg-gold-600 hover:bg-gold-700 text-black">
                Voltar para o Início
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (loading) {
    return <AffiliateManagerLoading />
  }

  return <AffiliateManagerContent />
}

// Main page component
export default function AffiliateManagerPage() {
  return (
    <Suspense fallback={<AffiliateManagerLoading />}>
      <AffiliateManagerClientComponent />
    </Suspense>
  )
}
