"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Lock,
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
  Download,
  Upload,
  Palette,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeMembers: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
  })

  const [theme, setTheme] = useState({
    primaryColor: "#f9b208",
    secondaryColor: "#000000",
    accentColor: "#f9b208",
    cardBackground: "rgba(0,0,0,0.5)",
    borderColor: "rgba(249,178,8,0.3)",
  })

  const [presetThemes] = useState({
    dark: {
      primaryColor: "#f9b208",
      secondaryColor: "#000000",
      accentColor: "#f9b208",
      cardBackground: "rgba(0,0,0,0.5)",
      borderColor: "rgba(249,178,8,0.3)",
      name: "Dark Gold",
    },
    light: {
      primaryColor: "#1f2937",
      secondaryColor: "#ffffff",
      accentColor: "#3b82f6",
      cardBackground: "rgba(255,255,255,0.9)",
      borderColor: "rgba(59,130,246,0.3)",
      name: "Light Blue",
    },
    blue: {
      primaryColor: "#3b82f6",
      secondaryColor: "#1e293b",
      accentColor: "#60a5fa",
      cardBackground: "rgba(30,41,59,0.8)",
      borderColor: "rgba(96,165,250,0.3)",
      name: "Ocean Blue",
    },
    purple: {
      primaryColor: "#8b5cf6",
      secondaryColor: "#1f1b2e",
      accentColor: "#a78bfa",
      cardBackground: "rgba(31,27,46,0.8)",
      borderColor: "rgba(167,139,250,0.3)",
      name: "Royal Purple",
    },
  })

  const [showThemePanel, setShowThemePanel] = useState(false)
  const [previewTheme, setPreviewTheme] = useState(null)

  const [isCustomizing, setIsCustomizing] = useState(false)

  // Apply theme to CSS variables
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value)
    })
  }, [theme])

  const updateTheme = (key: string, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }))
  }

  const applyPresetTheme = (presetKey: string) => {
    const preset = presetThemes[presetKey]
    if (preset) {
      setTheme(preset)
      localStorage.setItem("adminTheme", JSON.stringify(preset))
    }
  }

  const exportTheme = () => {
    const themeData = {
      ...theme,
      exportDate: new Date().toISOString(),
      version: "1.0",
    }
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `morethanmoney-theme-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string)
          if (validateTheme(importedTheme)) {
            setTheme(importedTheme)
            localStorage.setItem("adminTheme", JSON.stringify(importedTheme))
            alert("Tema importado com sucesso!")
          } else {
            alert("Arquivo de tema inválido!")
          }
        } catch (error) {
          alert("Erro ao importar tema!")
        }
      }
      reader.readAsText(file)
    }
  }

  const validateTheme = (themeData: any) => {
    const requiredKeys = ["primaryColor", "secondaryColor", "accentColor", "cardBackground", "borderColor"]
    return requiredKeys.every((key) => themeData.hasOwnProperty(key))
  }

  const validateColorContrast = (color1: string, color2: string) => {
    // Simplified contrast check - in production, use a proper contrast ratio calculator
    const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color1)
    return isValidHex
  }

  const previewThemeChange = (key: string, value: string) => {
    if (validateColorContrast(value, theme.secondaryColor)) {
      setPreviewTheme({ ...theme, [key]: value })
      // Apply preview temporarily
      document.documentElement.style.setProperty(`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value)
    }
  }

  const applyPreview = () => {
    if (previewTheme) {
      setTheme(previewTheme)
      localStorage.setItem("adminTheme", JSON.stringify(previewTheme))
      setPreviewTheme(null)
    }
  }

  const cancelPreview = () => {
    if (previewTheme) {
      // Restore original theme
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value)
      })
      setPreviewTheme(null)
    }
  }

  // Redirecionar se não for autenticado ou admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin-login")
    } else if (!isAdmin) {
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, router])

  // Carregar estatísticas
  useEffect(() => {
    if (typeof window !== "undefined") {
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
  }, [])

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("adminTheme")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        if (validateTheme(parsedTheme)) {
          setTheme(parsedTheme)
        }
      } catch (error) {
        console.error("Error loading saved theme:", error)
      }
    }
  }, [])

  // Se não for admin, não mostrar conteúdo
  if (!isAuthenticated || !isAdmin) {
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
            <Link href="/admin-login">
              <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold">
                Fazer Login como Admin
              </Button>
            </Link>
          </CardContent>
        </Card>
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
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">Administrador</p>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm" className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10">
                  <Home className="h-4 w-4 mr-2" />
                  Ver Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowThemePanel(true)}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                <Palette className="h-4 w-4 mr-2" />
                Temas
              </Button>
              <Button
                onClick={logout}
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

      {/* Theme Customization Panel */}
      {showThemePanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl bg-black/90 border-gold-500/30 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-white">
                  <Palette className="h-5 w-5 mr-2 text-gold-400" />
                  Personalização de Temas
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowThemePanel(false)}
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preset Themes */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Temas Pré-definidos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(presetThemes).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => applyPresetTheme(key)}
                      className="p-4 rounded-lg border border-gray-600 hover:border-gold-500/50 transition-colors group"
                      style={{ backgroundColor: preset.cardBackground }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primaryColor }} />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                      </div>
                      <p className="text-sm font-medium text-white">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Cores Personalizadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(theme)
                    .filter(([key]) => key !== "name")
                    .map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="color"
                            value={typeof value === "string" && value.startsWith("#") ? value : "#f9b208"}
                            onChange={(e) => previewThemeChange(key, e.target.value)}
                            className="w-12 h-10 rounded border border-gray-600 bg-transparent"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => previewThemeChange(key, e.target.value)}
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                            placeholder="Cor ou valor CSS"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Preview Actions */}
              {previewTheme && (
                <div className="flex items-center justify-between p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                  <span className="text-gold-400 text-sm">Visualizando alterações...</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelPreview}
                      className="border-gray-600 text-gray-400 hover:bg-gray-800"
                    >
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={applyPreview} className="bg-gold-500 hover:bg-gold-600 text-black">
                      Aplicar
                    </Button>
                  </div>
                </div>
              )}

              {/* Import/Export */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportTheme}
                    className="border-gray-600 text-gray-400 hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Tema
                  </Button>
                  <label className="cursor-pointer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-400 hover:bg-gray-800"
                      asChild
                    >
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Importar Tema
                      </span>
                    </Button>
                    <input type="file" accept=".json" onChange={importTheme} className="hidden" />
                  </label>
                </div>
                <Button
                  onClick={() => {
                    setTheme(presetThemes.dark)
                    localStorage.removeItem("adminTheme")
                  }}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  Resetar para Padrão
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta, {user?.name?.split(" ")[0]}! 👋</h2>
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
            <Link key={index} href={module.href}>
              <Card className="group bg-black/50 border-gray-800/50 backdrop-blur-xl hover:border-gold-500/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${module.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">{module.stats}</span>
                  </div>
                  <CardTitle className="text-white group-hover:text-gold-400 transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-gold-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Acessar módulo
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 rounded-full bg-gray-800/50 hover:bg-gold-500/20 transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // Quick settings for this module
                          const newColor = prompt("Nova cor (hex):")
                          if (newColor) {
                            document.documentElement.style.setProperty("--module-color", newColor)
                          }
                        }}
                        title="Personalizar cor"
                      >
                        <svg
                          className="w-3 h-3 text-gray-400 hover:text-gold-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2V4a2 2 0 012-2h11a2 2 0 00-2-2H4z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M6 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V4zm2 0v8h8V4H8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <svg
                        className="ml-1 h-4 w-4 text-gold-400 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
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
