"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  LogOut,
  Users,
  Settings,
  BarChart,
  UserCheck,
  TrendingUp,
  Globe,
  Shield,
  Activity,
  DollarSign,
  BookOpen,
  Zap,
  MessageSquare,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboardClient() {
  const router = useRouter()
  const [adminUser, setAdminUser] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeMembers: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
  })
  const [loading, setLoading] = useState(true)

  // Carregar dados do admin e estatísticas
  useEffect(() => {
    const loadData = () => {
      try {
        if (typeof window !== "undefined") {
          // Carregar usuário admin
          const storedAdminUser = localStorage.getItem("adminUser")
          setAdminUser(storedAdminUser)

          // Carregar estatísticas
          const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
          const affiliates = JSON.parse(localStorage.getItem("affiliates") || "[]")
          const commissions = JSON.parse(localStorage.getItem("commissionHistory") || "[]")

          setStats({
            totalUsers: registeredUsers.length,
            activeMembers: registeredUsers.filter((u: any) => u.role !== "Membro").length,
            totalRevenue: commissions.reduce((sum: number, c: any) => sum + (c.status === "paid" ? c.amount : 0), 0),
            pendingApprovals: commissions.filter((c: any) => c.status === "pending").length,
          })
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    router.push("/admin-login")
  }

  // Função para navegar para módulos
  const navigateToModule = (href: string) => {
    console.log("Navegando para:", href)
    router.push(href)
  }

  // Função para voltar para a home
  const navigateToHome = () => {
    router.push("/")
  }

  // Mostrar loading enquanto carrega dados
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold-400 font-medium">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  const adminModules = [
    {
      title: "Gerenciar Funções",
      description: "Atribua funções aos membros da plataforma",
      icon: Users,
      href: "/admin-dashboard/user-roles",
      color: "from-blue-500 to-blue-600",
      stats: `${stats.totalUsers} usuários`,
    },
    {
      title: "Configurações do Site",
      description: "Personalize cores, navegação e widgets",
      icon: Settings,
      href: "/admin-dashboard/site-settings",
      color: "from-purple-500 to-purple-600",
      stats: "Sistema ativo",
    },
    {
      title: "Estatísticas",
      description: "Visualize métricas da plataforma",
      icon: BarChart,
      href: "/admin-dashboard/statistics",
      color: "from-green-500 to-green-600",
      stats: `${stats.activeMembers} membros ativos`,
    },
    {
      title: "Gestão de Afiliados",
      description: "Gerencie códigos e comissões",
      icon: UserCheck,
      href: "/admin-dashboard/affiliate-manager",
      color: "from-orange-500 to-orange-600",
      stats: `€${stats.totalRevenue.toFixed(2)} em comissões`,
    },
    {
      title: "API MetaTrader",
      description: "Configure copytrading e sincronização",
      icon: TrendingUp,
      href: "/admin-dashboard/metatrader-api",
      color: "from-red-500 to-red-600",
      stats: "Integração MT5",
    },
    {
      title: "Gerenciar Cursos",
      description: "Configure playlists e conteúdo educativo",
      icon: BookOpen,
      href: "/admin-dashboard/courses-manager",
      color: "from-indigo-500 to-indigo-600",
      stats: "Bootcamp + JIFU",
    },
    {
      title: "Bot Telegram",
      description: "Configure bot e leitura de tópicos",
      icon: MessageSquare,
      href: "/admin-dashboard/telegram-test",
      color: "from-blue-400 to-blue-500",
      stats: "Bot ativo",
    },
    {
      title: "Configurações de Pagamento",
      description: "Configure Stripe e outros gateways",
      icon: DollarSign,
      href: "/admin-dashboard/payment-settings",
      color: "from-green-500 to-green-600",
      stats: "Stripe ativo",
    },
    {
      title: "Copytrading Manager",
      description: "Gerencie estratégias de copytrading",
      icon: TrendingUp,
      href: "/admin-dashboard/copytrading-manager",
      color: "from-yellow-500 to-yellow-600",
      stats: "MT5 conectado",
    },
  ]

  const quickStats = [
    {
      title: "Total de Usuários",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
    },
    {
      title: "Membros Ativos",
      value: stats.activeMembers,
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-500/20",
    },
    {
      title: "Receita Total",
      value: `€${stats.totalRevenue.toFixed(0)}`,
      icon: DollarSign,
      color: "text-gold-400",
      bg: "bg-gold-500/20",
    },
    {
      title: "Pendentes",
      value: stats.pendingApprovals,
      icon: Zap,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gold-500/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
                <p className="text-sm text-gray-400">MoreThanMoney</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right mr-3">
                <p className="text-sm font-medium text-white">{adminUser || "Administrador"}</p>
                <p className="text-xs text-gray-400">Administrador</p>
              </div>
              <Button
                onClick={navigateToHome}
                variant="outline"
                size="sm"
                className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
              >
                <Home className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta, {adminUser || "Administrador"}! 👋</h2>
          <p className="text-gray-400">Gerencie sua plataforma MoreThanMoney com facilidade e eficiência.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-black/50 border-gray-800/50 backdrop-blur-xl hover:border-gold-500/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <Card
              key={index}
              onClick={() => navigateToModule(module.href)}
              className="group bg-black/50 border-gray-800/50 backdrop-blur-xl hover:border-gold-500/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${module.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">{module.stats}</span>
                </div>
                <CardTitle className="text-white group-hover:text-gold-400 transition-colors">{module.title}</CardTitle>
                <CardDescription className="text-gray-400 text-sm">{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-gold-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Acessar módulo
                  </span>
                  <svg
                    className="ml-1 h-4 w-4 text-gold-400 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Status */}
        <Card className="mt-8 bg-black/50 border-gray-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Globe className="h-5 w-5 mr-2 text-green-400" />
              Status do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Plataforma Online</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">API Funcionando</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Backup Atualizado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
