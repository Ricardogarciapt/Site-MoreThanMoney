"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus, RefreshCcw, Search, Trash2, Users, BarChart3, FileText, LinkIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Funções movidas para dentro do componente para evitar problemas de SSR
const affiliateEligibleRoles = [
  "Distribuidor",
  "Educador",
  "Liderança",
  "Rising Star",
  "Silver Manager",
  "Gold Manager",
  "Platinum Manager",
  "Elite",
  "Director",
  "Diamond",
  "Presidential",
]

function canBeAffiliate(userRole: string): boolean {
  return affiliateEligibleRoles.includes(userRole)
}

function generateAffiliateCode(username: string): string {
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${username.slice(0, 5).toUpperCase()}${randomPart}`
}

function getAffiliateCommissions(username: string): any[] {
  if (typeof window === "undefined") return []
  const history = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
  return history.filter((c: any) => c.affiliateUsername === username)
}

function updateCommissionStatus(commissionId: string, newStatus: string): boolean {
  if (typeof window === "undefined") return false
  const history = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
  const updatedHistory = history.map((commission: any) => {
    if (commission.id === commissionId) {
      return { ...commission, status: newStatus }
    }
    return commission
  })
  localStorage.setItem("commissionHistory", JSON.stringify(updatedHistory))
  return true
}

interface AffiliateUser {
  username: string
  name: string
  email: string
  role: string
  affiliateCode: string
  totalCommission: number
  pendingCommission: number
}

export default function AffiliateManagerPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [affiliates, setAffiliates] = useState<AffiliateUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [stats, setStats] = useState({
    totalAffiliates: 0,
    activeAffiliates: 0,
    totalCommissions: 0,
    pendingCommissions: 0,
  })

  // Efeito para buscar usuários do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
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

      // Calcular estatísticas
      const totalCommissions = mappedAffiliates.reduce((sum, aff) => sum + aff.totalCommission, 0)
      const pendingCommissions = mappedAffiliates.reduce((sum, aff) => sum + aff.pendingCommission, 0)
      const activeAffiliates = mappedAffiliates.filter((aff) => aff.affiliateCode).length

      setStats({
        totalAffiliates: mappedAffiliates.length,
        activeAffiliates,
        totalCommissions,
        pendingCommissions,
      })
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
  const generateCodeForUser = (username: string) => {
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
  const removeAffiliateCode = (username: string) => {
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

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestão de Afiliados</h1>
          <p className="text-gray-400">Gerencie os códigos de afiliado e comissões dos membros MoreThanMoney.</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-md flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-400">{successMessage}</span>
          </div>
        )}

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total de Afiliados</p>
                  <p className="text-2xl font-bold">{stats.totalAffiliates}</p>
                </div>
                <Users className="h-8 w-8 text-gold-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Afiliados Ativos</p>
                  <p className="text-2xl font-bold">{stats.activeAffiliates}</p>
                </div>
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Comissões Totais</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalCommissions)}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-gold-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Pendentes</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.pendingCommissions)}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu de Navegação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin-dashboard/affiliate-manager/reports">
            <Card className="bg-black/50 border-gold-500/30 hover:bg-gold-500/10 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Relatórios
                </CardTitle>
                <CardDescription>Visualize relatórios detalhados de performance</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin-dashboard/affiliate-manager/materials">
            <Card className="bg-black/50 border-gold-500/30 hover:bg-gold-500/10 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Materiais
                </CardTitle>
                <CardDescription>Gerencie materiais de marketing e links</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin-dashboard/affiliate-manager/commissions">
            <Card className="bg-black/50 border-gold-500/30 hover:bg-gold-500/10 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Comissões
                </CardTitle>
                <CardDescription>Gerencie pagamentos e comissões</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Gestão de Afiliados */}
        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Gerenciamento de Afiliados</CardTitle>
            <CardDescription>Gerencie os códigos de afiliado dos membros elegíveis.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar afiliados..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 text-left">Usuário</th>
                    <th className="py-2 px-4 text-left">Função</th>
                    <th className="py-2 px-4 text-left">Código de Afiliado</th>
                    <th className="py-2 px-4 text-right">Comissões Pendentes</th>
                    <th className="py-2 px-4 text-right">Total de Comissões</th>
                    <th className="py-2 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAffiliates.length > 0 ? (
                    filteredAffiliates.map((affiliate) => (
                      <tr key={affiliate.username} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="py-4 px-4">
                          <div className="font-medium">{affiliate.name}</div>
                          <div className="text-xs text-gray-400">{affiliate.username}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gold-500/20 text-gold-400">
                            {affiliate.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {affiliate.affiliateCode ? (
                            <div className="font-mono bg-black/50 px-3 py-1 rounded border border-gray-700 text-sm">
                              {affiliate.affiliateCode}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">Sem código</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className={affiliate.pendingCommission > 0 ? "text-green-400" : "text-gray-400"}>
                            {formatCurrency(affiliate.pendingCommission)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">{formatCurrency(affiliate.totalCommission)}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            {affiliate.affiliateCode ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => generateCodeForUser(affiliate.username)}
                                  className="h-8 px-2 border-gold-500 text-gold-400 hover:bg-gold-500/10"
                                >
                                  <RefreshCcw className="h-4 w-4 mr-1" />
                                  Regenerar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeAffiliateCode(affiliate.username)}
                                  className="h-8 px-2 border-red-500 text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remover
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => generateCodeForUser(affiliate.username)}
                                className="h-8 px-2 border-green-500 text-green-400 hover:bg-green-500/10"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Gerar Código
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        Nenhum afiliado encontrado com o termo de busca.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Link href="/admin-dashboard">
            <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
              Voltar para o Painel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
