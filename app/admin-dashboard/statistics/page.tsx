"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dados simulados
const visitData = [
  { name: "Jan", value: 1200 },
  { name: "Fev", value: 1900 },
  { name: "Mar", value: 2400 },
  { name: "Abr", value: 1800 },
  { name: "Mai", value: 2800 },
  { name: "Jun", value: 3200 },
  { name: "Jul", value: 3800 },
]

const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Fev", value: 6000 },
  { name: "Mar", value: 8000 },
  { name: "Abr", value: 7000 },
  { name: "Mai", value: 9000 },
  { name: "Jun", value: 11000 },
  { name: "Jul", value: 12000 },
]

const productSalesData = [
  { name: "Scanner", value: 45 },
  { name: "Copytrading", value: 30 },
  { name: "Membership", value: 15 },
  { name: "Bootcamp", value: 10 },
]

const COLORS = ["#f9b208", "#e67e22", "#3498db", "#9b59b6"]

const userGrowthData = [
  { name: "Jan", novos: 65, ativos: 120 },
  { name: "Fev", novos: 78, ativos: 150 },
  { name: "Mar", novos: 90, ativos: 180 },
  { name: "Abr", novos: 81, ativos: 200 },
  { name: "Mai", novos: 95, ativos: 220 },
  { name: "Jun", novos: 110, ativos: 250 },
  { name: "Jul", novos: 120, ativos: 280 },
]

export default function StatisticsPage() {
  const [dateRange, setDateRange] = useState("7d")

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Estatísticas da Plataforma</h1>
          <p className="text-gray-400 mt-1">Acompanhe o desempenho e métricas importantes do seu negócio</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="year">Este ano</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-black/50 border-gold-500/30">
          <CardHeader className="pb-2">
            <CardDescription>Visitantes</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">12,543</CardTitle>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitData}>
                  <Line type="monotone" dataKey="value" stroke="#f9b208" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-gold-500/30">
          <CardHeader className="pb-2">
            <CardDescription>Vendas</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">€12,800</CardTitle>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>18%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="value" stroke="#f9b208" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-gold-500/30">
          <CardHeader className="pb-2">
            <CardDescription>Novos Usuários</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">120</CardTitle>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>9%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <Line type="monotone" dataKey="novos" stroke="#f9b208" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-gold-500/30">
          <CardHeader className="pb-2">
            <CardDescription>Taxa de Conversão</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">3.2%</CardTitle>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>0.5%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: "Jan", value: 2.8 },
                    { name: "Fev", value: 3.1 },
                    { name: "Mar", value: 3.5 },
                    { name: "Abr", value: 3.2 },
                    { name: "Mai", value: 3.4 },
                    { name: "Jun", value: 3.3 },
                    { name: "Jul", value: 3.2 },
                  ]}
                >
                  <Line type="monotone" dataKey="value" stroke="#f9b208" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Visitas ao Site</CardTitle>
                <CardDescription>Número de visitas ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Visitas",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Distribuição de Vendas por Produto</CardTitle>
                <CardDescription>Percentual de vendas por tipo de produto</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productSalesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {productSalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card className="bg-black/50 border-gold-500/30">
            <CardHeader>
              <CardTitle>Crescimento de Usuários</CardTitle>
              <CardDescription>Novos usuários vs. usuários ativos</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    novos: {
                      label: "Novos Usuários",
                      color: "hsl(var(--chart-1))",
                    },
                    ativos: {
                      label: "Usuários Ativos",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="novos" fill="var(--color-novos)" />
                      <Bar dataKey="ativos" fill="var(--color-ativos)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <Card className="bg-black/50 border-gold-500/30">
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>Receita total por mês</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Receita (€)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
