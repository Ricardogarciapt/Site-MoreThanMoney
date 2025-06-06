"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Filter,
  FileText,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Dados simulados para os relatórios
const mockReportsData = {
  overview: {
    totalAffiliates: 45,
    activeAffiliates: 32,
    totalCommissions: 15420,
    paidCommissions: 12350,
    pendingCommissions: 3070,
    conversionRate: 3.2,
    averageCommissionPerAffiliate: 342.67,
    topPerformingAffiliate: "Ricardo Silva",
  },
  monthlyData: [
    { month: "Jan", affiliates: 15, commissions: 2500, conversions: 45 },
    { month: "Fev", affiliates: 22, commissions: 3200, conversions: 62 },
    { month: "Mar", affiliates: 28, commissions: 4100, conversions: 78 },
    { month: "Abr", affiliates: 35, commissions: 5200, conversions: 95 },
    { month: "Mai", affiliates: 42, commissions: 6800, conversions: 112 },
    { month: "Jun", affiliates: 45, commissions: 7500, conversions: 128 },
  ],
  productPerformance: [
    { product: "Scanner MTM", commissions: 4500, affiliates: 25, color: "#FFD700" },
    { product: "Copytrading", commissions: 3200, affiliates: 18, color: "#FF6B6B" },
    { product: "Bootcamp", commissions: 2800, affiliates: 15, color: "#4ECDC4" },
    { product: "JIFU Membership", commissions: 2100, affiliates: 12, color: "#45B7D1" },
    { product: "Gold Killer", commissions: 1800, affiliates: 8, color: "#96CEB4" },
  ],
  topAffiliates: [
    { name: "Ricardo Silva", commissions: 1250, referrals: 15, conversionRate: 4.2 },
    { name: "Maria Santos", commissions: 980, referrals: 12, conversionRate: 3.8 },
    { name: "João Oliveira", commissions: 850, referrals: 10, conversionRate: 3.5 },
    { name: "Ana Costa", commissions: 720, referrals: 8, conversionRate: 3.1 },
    { name: "Pedro Ferreira", commissions: 650, referrals: 7, conversionRate: 2.9 },
  ],
  weeklyTrends: [
    { week: "Sem 1", clicks: 450, signups: 15, commissions: 380 },
    { week: "Sem 2", clicks: 520, signups: 18, commissions: 450 },
    { week: "Sem 3", clicks: 480, signups: 16, commissions: 420 },
    { week: "Sem 4", clicks: 610, signups: 22, commissions: 580 },
  ],
}

export default function AffiliateReportsPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [dateRange, setDateRange] = useState("30")
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [reportType, setReportType] = useState("overview")

  // Redirecionar se não for autenticado ou admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (!isAdmin) {
      router.push("/member-area")
    }
  }, [isAuthenticated, isAdmin, router])

  // Função para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(value)
  }

  // Função para exportar relatório
  const exportReport = (format: string) => {
    // Simular exportação
    const data = {
      date: new Date().toISOString(),
      period: `${dateRange} dias`,
      product: selectedProduct === "all" ? "Todos os produtos" : selectedProduct,
      ...mockReportsData.overview,
    }

    if (format === "csv") {
      const csvContent = Object.entries(data)
        .map(([key, value]) => `${key},${value}`)
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `relatorio-afiliados-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
    } else if (format === "pdf") {
      // Simular geração de PDF
      alert("Relatório PDF será gerado e enviado por email em alguns minutos.")
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin-dashboard/affiliate-manager">
              <Button variant="outline" size="sm" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Relatórios de Afiliados</h1>
              <p className="text-gray-400">Análise detalhada do desempenho do programa de afiliados</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => exportReport("csv")}
              className="border-green-500 text-green-400 hover:bg-green-500/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => exportReport("pdf")}
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
            >
              <FileText className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-6 bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros de Relatório
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date-range">Período</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 90 dias</SelectItem>
                    <SelectItem value="365">Último ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product">Produto</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os produtos</SelectItem>
                    <SelectItem value="scanner">Scanner MTM</SelectItem>
                    <SelectItem value="copytrading">Copytrading</SelectItem>
                    <SelectItem value="bootcamp">Bootcamp</SelectItem>
                    <SelectItem value="jifu">JIFU Membership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="report-type">Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Visão Geral</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="commissions">Comissões</SelectItem>
                    <SelectItem value="trends">Tendências</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total de Afiliados</p>
                  <p className="text-2xl font-bold">{mockReportsData.overview.totalAffiliates}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% vs mês anterior
                  </p>
                </div>
                <Users className="h-8 w-8 text-gold-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Comissões Totais</p>
                  <p className="text-2xl font-bold">{formatCurrency(mockReportsData.overview.totalCommissions)}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% vs mês anterior
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-gold-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Taxa de Conversão</p>
                  <p className="text-2xl font-bold">{mockReportsData.overview.conversionRate}%</p>
                  <p className="text-xs text-red-400 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -0.3% vs mês anterior
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-gold-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Comissão Média</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(mockReportsData.overview.averageCommissionPerAffiliate)}
                  </p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% vs mês anterior
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-gold-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos e Análises */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance Mensal</TabsTrigger>
            <TabsTrigger value="products">Por Produto</TabsTrigger>
            <TabsTrigger value="affiliates">Top Afiliados</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Performance Mensal</CardTitle>
                <CardDescription>Evolução de afiliados, comissões e conversões ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockReportsData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="commissions"
                        stackId="1"
                        stroke="#FFD700"
                        fill="#FFD700"
                        fillOpacity={0.3}
                        name="Comissões (€)"
                      />
                      <Area
                        type="monotone"
                        dataKey="conversions"
                        stackId="2"
                        stroke="#4ECDC4"
                        fill="#4ECDC4"
                        fillOpacity={0.3}
                        name="Conversões"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/50 border-gold-500/30">
                <CardHeader>
                  <CardTitle>Comissões por Produto</CardTitle>
                  <CardDescription>Distribuição de comissões entre os produtos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockReportsData.productPerformance}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="commissions"
                          label={({ product, percent }) => `${product} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockReportsData.productPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-gold-500/30">
                <CardHeader>
                  <CardTitle>Performance Detalhada</CardTitle>
                  <CardDescription>Métricas por produto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReportsData.productPerformance.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: product.color }} />
                          <div>
                            <p className="font-medium">{product.product}</p>
                            <p className="text-sm text-gray-400">{product.affiliates} afiliados</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(product.commissions)}</p>
                          <p className="text-sm text-gray-400">
                            {formatCurrency(product.commissions / product.affiliates)} / afiliado
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="affiliates">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Top Afiliados</CardTitle>
                <CardDescription>Ranking dos afiliados com melhor performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Posição</th>
                        <th className="text-left py-3 px-4">Afiliado</th>
                        <th className="text-right py-3 px-4">Comissões</th>
                        <th className="text-right py-3 px-4">Indicações</th>
                        <th className="text-right py-3 px-4">Taxa de Conversão</th>
                        <th className="text-right py-3 px-4">Comissão Média</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReportsData.topAffiliates.map((affiliate, index) => (
                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  index === 0
                                    ? "bg-yellow-500 text-black"
                                    : index === 1
                                      ? "bg-gray-400 text-black"
                                      : index === 2
                                        ? "bg-orange-500 text-black"
                                        : "bg-gray-600 text-white"
                                }`}
                              >
                                {index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{affiliate.name}</td>
                          <td className="py-3 px-4 text-right font-bold text-green-400">
                            {formatCurrency(affiliate.commissions)}
                          </td>
                          <td className="py-3 px-4 text-right">{affiliate.referrals}</td>
                          <td className="py-3 px-4 text-right">{affiliate.conversionRate}%</td>
                          <td className="py-3 px-4 text-right">
                            {formatCurrency(affiliate.commissions / affiliate.referrals)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Tendências Semanais</CardTitle>
                <CardDescription>Análise de tendências de cliques, cadastros e comissões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockReportsData.weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="week" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="clicks" stroke="#FFD700" strokeWidth={2} name="Cliques" />
                      <Line type="monotone" dataKey="signups" stroke="#4ECDC4" strokeWidth={2} name="Cadastros" />
                      <Line
                        type="monotone"
                        dataKey="commissions"
                        stroke="#FF6B6B"
                        strokeWidth={2}
                        name="Comissões (€)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
