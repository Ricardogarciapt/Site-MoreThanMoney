"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus, RefreshCcw, Search, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { generateAffiliateCode, removeAffiliateCode, updateCommissionStatus } from "./actions"

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

export default function AffiliateManagerClient() {
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
  const handleGenerateCode = async (username: string) => {
    try {
      const newCode = await generateAffiliateCode(username)

      // Atualizar afiliados no estado
      const updatedAffiliates = affiliates.map((affiliate) => {
        if (affiliate.username === username) {
          return { ...affiliate, affiliateCode: newCode }
        }
        return affiliate
      })

      setAffiliates(updatedAffiliates)
      setSuccessMessage(`Código de afiliado gerado com sucesso para ${username}`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error generating affiliate code:", error)
    }
  }

  // Remover código de afiliado
  const handleRemoveCode = async (username: string) => {
    try {
      await removeAffiliateCode(username)

      // Atualizar afiliados no estado
      const updatedAffiliates = affiliates.map((affiliate) => {
        if (affiliate.username === username) {
          return { ...affiliate, affiliateCode: "" }
        }
        return affiliate
      })

      setAffiliates(updatedAffiliates)
      setSuccessMessage(`Código de afiliado removido com sucesso para ${username}`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error removing affiliate code:", error)
    }
  }

  // Marcar comissão como paga
  const handleMarkAsPaid = async (commissionId: string) => {
    try {
      await updateCommissionStatus(commissionId, "paid")

      // Atualizar o estado local
      const updatedCommissions = commissions.map((comm) => {
        if (comm.id === commissionId) {
          return { ...comm, status: "paid" as const }
        }
        return comm
      })

      setCommissions(updatedCommissions)
      setSuccessMessage(`Comissão marcada como paga com sucesso`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating commission status:", error)
    }
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
      <Card className="w-[350px] bg-black/50 border-gold-500/30 mx-auto">
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
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500 mx-auto"></div>
        <p className="text-gold-400 mt-4">Carregando dados dos afiliados...</p>
      </div>
    )
  }

  return (
    <>
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
    </>
  )
}
