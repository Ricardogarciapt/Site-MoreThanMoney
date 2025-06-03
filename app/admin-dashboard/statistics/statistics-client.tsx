"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, DollarSign, TrendingUp, Activity, RefreshCw } from "lucide-react"

export default function StatisticsClient() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeMembers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    newSignups: 0,
    conversionRate: 0,
  })
  const [loading, setLoading] = useState(true)

  const loadStatistics = () => {
    setLoading(true)
    try {
      if (typeof window !== "undefined") {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
        const commissions = JSON.parse(localStorage.getItem("commissionHistory") || "[]")

        const totalRevenue = commissions.reduce((sum: number, c: any) => sum + (c.status === "paid" ? c.amount : 0), 0)
        const monthlyRevenue = commissions
          .filter((c: any) => {
            const date = new Date(c.date || Date.now())
            const now = new Date()
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          })
          .reduce((sum: number, c: any) => sum + (c.status === "paid" ? c.amount : 0), 0)

        setStats({
          totalUsers: registeredUsers.length,
          activeMembers: registeredUsers.filter((u: any) => u.role !== "Membro").length,
          totalRevenue,
          monthlyRevenue,
          newSignups: registeredUsers.filter((u: any) => {
            const date = new Date(u.createdAt || Date.now())
            const now = new Date()
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          }).length,
          conversionRate:
            registeredUsers.length > 0
              ? (registeredUsers.filter((u: any) => u.role !== "Membro").length / registeredUsers.length) * 100
              : 0,
        })
      }
    } catch (error) {
      console.error("Error loading statistics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStatistics()
  }, [])

  const statisticsCards = [
    {
      title: "Total de Usuários",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      description: "Usuários registrados na plataforma",
    },
    {
      title: "Membros Ativos",
      value: stats.activeMembers,
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-500/20",
      description: "Usuários com assinaturas ativas",
    },
    {
      title: "Receita Total",
      value: `€${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-gold-400",
      bg: "bg-gold-500/20",
      description: "Receita total acumulada",
    },
    {
      title: "Receita Mensal",
      value: `€${stats.monthlyRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      description: "Receita do mês atual",
    },
    {
      title: "Novos Registros",
      value: stats.newSignups,
      icon: Users,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      description: "Registros neste mês",
    },
    {
      title: "Taxa de Conversão",
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      description: "Conversão de visitantes para membros",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <BarChart className="mr-3 text-gold-400" />
              Estatísticas da Plataforma
            </h1>
            <p className="text-gray-400">Métricas e análises detalhadas do desempenho</p>
          </div>
          <Button
            onClick={loadStatistics}
            disabled={loading}
            variant="outline"
            className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Atualizar
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statisticsCards.map((stat, index) => (
            <Card
              key={index}
              className="bg-black/50 border-gray-800/50 backdrop-blur-xl hover:border-gold-500/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{stat.title}</h3>
                  <p className="text-sm text-gray-400">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gráfico de Crescimento */}
        <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Crescimento da Plataforma</CardTitle>
            <CardDescription className="text-gray-400">Evolução dos principais indicadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Gráfico de crescimento será implementado em breve</p>
                <p className="text-sm mt-2">Integração com biblioteca de gráficos em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
