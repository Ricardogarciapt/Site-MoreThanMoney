"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart, Users, DollarSign, TrendingUp, Activity } from "lucide-react"

export default function StatisticsPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
    avgSessionTime: 0,
  })

  useEffect(() => {
    // Carregar estatísticas do localStorage
    const loadStats = () => {
      try {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
        const commissions = JSON.parse(localStorage.getItem("commissionHistory") || "[]")

        const totalRevenue = commissions.reduce((sum: number, c: any) => sum + (c.status === "paid" ? c.amount : 0), 0)
        const currentMonth = new Date().getMonth()
        const monthlyRevenue = commissions
          .filter((c: any) => new Date(c.date).getMonth() === currentMonth && c.status === "paid")
          .reduce((sum: number, c: any) => sum + c.amount, 0)

        setStats({
          totalUsers: registeredUsers.length,
          activeUsers: registeredUsers.filter((u: any) => u.role !== "Membro").length,
          totalRevenue,
          monthlyRevenue,
          conversionRate:
            registeredUsers.length > 0
              ? (registeredUsers.filter((u: any) => u.role !== "Membro").length / registeredUsers.length) * 100
              : 0,
          avgSessionTime: 12.5, // Simulado
        })
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error)
      }
    }

    loadStats()
  }, [])

  const statCards = [
    {
      title: "Total de Usuários",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Usuários Ativos",
      value: stats.activeUsers,
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-500/20",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Receita Total",
      value: `€${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-gold-400",
      bg: "bg-gold-500/20",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Receita Mensal",
      value: `€${stats.monthlyRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "Taxa de Conversão",
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: BarChart,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Tempo Médio de Sessão",
      value: `${stats.avgSessionTime}min`,
      icon: Activity,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      change: "+2%",
      changeType: "positive",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <Card className="max-w-7xl mx-auto bg-black/50 border-gray-800/50 backdrop-blur-xl">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart className="h-6 w-6 text-gold-500" />
              <div>
                <CardTitle className="text-xl text-white">Estatísticas da Plataforma</CardTitle>
                <CardDescription className="text-gray-400">
                  Visualize métricas e performance da plataforma
                </CardDescription>
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
          {/* Estatísticas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card key={index} className="bg-gray-800/30 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className={`text-sm ${stat.changeType === "positive" ? "text-green-400" : "text-red-400"}`}>
                        {stat.change} vs mês anterior
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gráficos Simulados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Crescimento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Gráfico de crescimento de usuários</p>
                    <p className="text-sm">(Implementação futura)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Receita por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Gráfico de receita mensal</p>
                    <p className="text-sm">(Implementação futura)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Atividade Recente */}
          <Card className="mt-6 bg-gray-800/30 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Novo usuário registrado</span>
                  </div>
                  <span className="text-gray-400 text-sm">Há 2 minutos</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">Pagamento processado</span>
                  </div>
                  <span className="text-gray-400 text-sm">Há 15 minutos</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white">Novo afiliado aprovado</span>
                  </div>
                  <span className="text-gray-400 text-sm">Há 1 hora</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
