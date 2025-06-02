"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus, RefreshCcw, Search, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

export default function AffiliateManagerPage() {
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500 mx-auto"></div>
          <p className="text-gold-400 mt-4">Carregando dados dos afiliados...</p>
        </div>
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

        <div className="flex mb-6 bg-black/30 rounded-md p-1 border border-gold-500/30 w-fit">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "affiliates" ? "bg-gold-500 text-black" : "text-gray-300 hover:bg-gold-500/10"
            }`}
            onClick={() => setActiveTab("affiliates")}
          >
            Afiliados
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "commissions" ? "bg-gold-500 text-black" : "text-gray-300 hover:bg-gold-500/10"
            }`}
            onClick={() => setActiveTab("commissions")}
          >
            Comissões
          </button>
        </div>

        {activeTab === "affiliates" ? (
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
                                    onClick={() => handleGenerateCode(affiliate.username)}
                                    className="h-8 px-2 border-gold-500 text-gold-400 hover:bg-gold-500/10"
                                  >
                                    <RefreshCcw className="h-4 w-4 mr-1" />
                                    Regenerar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRemoveCode(affiliate.username)}
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
                                  onClick={() => handleGenerateCode(affiliate.username)}
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
        ) : (
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Histórico de Comissões</CardTitle>
              <CardDescription>Visualize e gerencie todas as comissões de afiliados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar comissões..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <select
                    className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-md text-white"
                    value={selectedAffiliate || ""}
                    onChange={(e) => setSelectedAffiliate(e.target.value || null)}
                  >
                    <option value="">Todos os afiliados</option>
                    {affiliates.map((aff) => (
                      <option key={aff.username} value={aff.username}>
                        {aff.name} ({aff.username})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4 text-left">Data</th>
                      <th className="py-2 px-4 text-left">Afiliado</th>
                      <th className="py-2 px-4 text-left">Cliente</th>
                      <th className="py-2 px-4 text-left">Produto</th>
                      <th className="py-2 px-4 text-right">Valor</th>
                      <th className="py-2 px-4 text-center">Status</th>
                      <th className="py-2 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommissions.length > 0 ? (
                      filteredCommissions.map((commission) => {
                        // Encontrar o afiliado
                        const affiliate = affiliates.find((a) => a.username === commission.affiliateUsername)

                        return (
                          <tr key={commission.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                            <td className="py-3 px-4">{new Date(commission.date).toLocaleDateString("pt-PT")}</td>
                            <td className="py-3 px-4">
                              <div className="font-medium">{affiliate?.name || commission.affiliateUsername}</div>
                              <div className="text-xs text-gray-400">{commission.affiliateUsername}</div>
                            </td>
                            <td className="py-3 px-4">{commission.customerUsername}</td>
                            <td className="py-3 px-4">{commission.productName}</td>
                            <td className="py-3 px-4 text-right font-medium">{formatCurrency(commission.amount)}</td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  commission.status === "paid"
                                    ? "bg-green-500/20 text-green-400"
                                    : commission.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {commission.status === "paid"
                                  ? "Pago"
                                  : commission.status === "pending"
                                    ? "Pendente"
                                    : "Cancelado"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              {commission.status === "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkAsPaid(commission.id)}
                                  className="h-8 px-2 border-green-500 text-green-400 hover:bg-green-500/10"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Marcar Pago
                                </Button>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-400">
                          Nenhuma comissão encontrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

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
