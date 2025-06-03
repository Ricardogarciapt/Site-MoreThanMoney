"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, UserCheck, Search, Plus, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Affiliate {
  id: string
  name: string
  email: string
  code: string
  commission: number
  status: "active" | "pending" | "suspended"
  totalEarnings: number
  referrals: number
  joinDate: string
}

export default function AffiliateManagerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [affiliates, setAffiliates] = useState<Affiliate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Carregar afiliados do localStorage
    const loadAffiliates = () => {
      try {
        const storedAffiliates = localStorage.getItem("affiliates")
        if (storedAffiliates) {
          setAffiliates(JSON.parse(storedAffiliates))
        } else {
          // Dados simulados
          const mockAffiliates: Affiliate[] = [
            {
              id: "1",
              name: "João Silva",
              email: "joao@email.com",
              code: "JOAO2024",
              commission: 30,
              status: "active",
              totalEarnings: 1250.5,
              referrals: 15,
              joinDate: "2024-01-15",
            },
            {
              id: "2",
              name: "Maria Santos",
              email: "maria@email.com",
              code: "MARIA2024",
              commission: 25,
              status: "active",
              totalEarnings: 890.25,
              referrals: 8,
              joinDate: "2024-02-10",
            },
            {
              id: "3",
              name: "Pedro Costa",
              email: "pedro@email.com",
              code: "PEDRO2024",
              commission: 20,
              status: "pending",
              totalEarnings: 0,
              referrals: 0,
              joinDate: "2024-03-05",
            },
          ]
          setAffiliates(mockAffiliates)
          localStorage.setItem("affiliates", JSON.stringify(mockAffiliates))
        }
      } catch (error) {
        console.error("Erro ao carregar afiliados:", error)
      }
    }

    loadAffiliates()
  }, [])

  const filteredAffiliates = affiliates.filter(
    (affiliate) =>
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const updateAffiliateStatus = (id: string, status: "active" | "pending" | "suspended") => {
    const updatedAffiliates = affiliates.map((affiliate) =>
      affiliate.id === id ? { ...affiliate, status } : affiliate,
    )
    setAffiliates(updatedAffiliates)
    localStorage.setItem("affiliates", JSON.stringify(updatedAffiliates))

    toast({
      title: "Status atualizado",
      description: "O status do afiliado foi atualizado com sucesso.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "suspended":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      case "suspended":
        return "Suspenso"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <Card className="max-w-7xl mx-auto bg-black/50 border-gray-800/50 backdrop-blur-xl">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserCheck className="h-6 w-6 text-gold-500" />
              <div>
                <CardTitle className="text-xl text-white">Gestão de Afiliados</CardTitle>
                <CardDescription className="text-gray-400">Gerencie códigos de afiliados e comissões</CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
              onClick={() => router.push("/admin-dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{affiliates.length}</p>
                  <p className="text-sm text-gray-400">Total de Afiliados</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {affiliates.filter((a) => a.status === "active").length}
                  </p>
                  <p className="text-sm text-gray-400">Ativos</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gold-400">
                    €{affiliates.reduce((sum, a) => sum + a.totalEarnings, 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">Total Pago</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">
                    {affiliates.reduce((sum, a) => sum + a.referrals, 0)}
                  </p>
                  <p className="text-sm text-gray-400">Total Referências</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barra de Pesquisa e Ações */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar afiliados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Novo Afiliado
            </Button>
          </div>

          {/* Lista de Afiliados */}
          <div className="space-y-4">
            {filteredAffiliates.map((affiliate) => (
              <Card key={affiliate.id} className="bg-gray-800/30 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-white font-medium">{affiliate.name}</h3>
                          <p className="text-gray-400 text-sm">{affiliate.email}</p>
                        </div>
                        <Badge className={getStatusColor(affiliate.status)}>{getStatusText(affiliate.status)}</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Código</p>
                          <p className="text-white font-mono">{affiliate.code}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Comissão</p>
                          <p className="text-white">{affiliate.commission}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Ganhos</p>
                          <p className="text-green-400">€{affiliate.totalEarnings.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Referências</p>
                          <p className="text-blue-400">{affiliate.referrals}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {affiliate.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => updateAffiliateStatus(affiliate.id, "active")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Aprovar
                        </Button>
                      )}
                      {affiliate.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAffiliateStatus(affiliate.id, "suspended")}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          Suspender
                        </Button>
                      )}
                      {affiliate.status === "suspended" && (
                        <Button
                          size="sm"
                          onClick={() => updateAffiliateStatus(affiliate.id, "active")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Reativar
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAffiliates.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum afiliado encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
