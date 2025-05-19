"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useAuth } from "@/contexts/auth-context"
import { MembershipRequired } from "@/components/membership-required"

// Dados de exemplo para os gráficos
const monthlyData = [
  { name: "Jan", profit: 4000, trades: 24 },
  { name: "Fev", profit: 3000, trades: 18 },
  { name: "Mar", profit: 5000, trades: 29 },
  { name: "Abr", profit: 2780, trades: 15 },
  { name: "Mai", profit: 1890, trades: 12 },
  { name: "Jun", profit: 2390, trades: 14 },
  { name: "Jul", profit: 3490, trades: 21 },
]

const weeklyData = [
  { name: "Seg", profit: 1200, trades: 7 },
  { name: "Ter", profit: 940, trades: 5 },
  { name: "Qua", profit: 1100, trades: 6 },
  { name: "Qui", profit: 1700, trades: 9 },
  { name: "Sex", profit: 1600, trades: 8 },
]

const dailyData = [
  { name: "09:00", profit: 240, trades: 2 },
  { name: "11:00", profit: 300, trades: 1 },
  { name: "13:00", profit: -150, trades: 1 },
  { name: "15:00", profit: 410, trades: 2 },
  { name: "17:00", profit: 380, trades: 1 },
]

export default function CopytradingResults() {
  const { isAuthenticated, user } = useAuth()
  const [timeframe, setTimeframe] = useState("monthly")

  if (!isAuthenticated) {
    return <MembershipRequired />
  }

  const data = timeframe === "monthly" ? monthlyData : timeframe === "weekly" ? weeklyData : dailyData

  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0)
  const totalTrades = data.reduce((sum, item) => sum + item.trades, 0)
  const winRate = 68 // Exemplo fixo para demonstração

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-400 to-gold-600 text-transparent bg-clip-text">
        Resultados do Copytrading
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black/50 border border-gold-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-500">Lucro Total</CardTitle>
            <CardDescription>Período selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {totalProfit > 0 ? "+" : ""}
              {totalProfit}$
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border border-gold-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-500">Operações</CardTitle>
            <CardDescription>Período selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalTrades}</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border border-gold-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-500">Taxa de Acerto</CardTitle>
            <CardDescription>Período selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{winRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/50 border border-gold-500/30">
        <CardHeader>
          <CardTitle className="text-gold-500">Desempenho do Copytrading</CardTitle>
          <CardDescription>Visualize os resultados ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" onValueChange={setTimeframe}>
            <TabsList className="mb-4">
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="daily">Diário</TabsTrigger>
            </TabsList>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #444" }}
                    labelStyle={{ color: "#ddd" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    name="Lucro ($)"
                    stroke="#FFD700"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="text-sm text-gray-400">
          Os resultados passados não garantem resultados futuros. O trading envolve riscos.
        </CardFooter>
      </Card>

      <div className="mt-12 bg-black/50 border border-gold-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gold-500">Histórico de Operações</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Par</th>
                <th className="py-3 px-4 text-left">Tipo</th>
                <th className="py-3 px-4 text-left">Entrada</th>
                <th className="py-3 px-4 text-left">Saída</th>
                <th className="py-3 px-4 text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-black/30">
                <td className="py-3 px-4">15/05/2023 14:30</td>
                <td className="py-3 px-4">BTCUSDT</td>
                <td className="py-3 px-4">Compra</td>
                <td className="py-3 px-4">27,450$</td>
                <td className="py-3 px-4">28,120$</td>
                <td className="py-3 px-4 text-green-500">+670$</td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-black/30">
                <td className="py-3 px-4">14/05/2023 10:15</td>
                <td className="py-3 px-4">ETHUSDT</td>
                <td className="py-3 px-4">Venda</td>
                <td className="py-3 px-4">1,890$</td>
                <td className="py-3 px-4">1,840$</td>
                <td className="py-3 px-4 text-green-500">+50$</td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-black/30">
                <td className="py-3 px-4">13/05/2023 16:45</td>
                <td className="py-3 px-4">SOLUSDT</td>
                <td className="py-3 px-4">Compra</td>
                <td className="py-3 px-4">42.30$</td>
                <td className="py-3 px-4">40.80$</td>
                <td className="py-3 px-4 text-red-500">-150$</td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-black/30">
                <td className="py-3 px-4">12/05/2023 09:20</td>
                <td className="py-3 px-4">ADAUSDT</td>
                <td className="py-3 px-4">Compra</td>
                <td className="py-3 px-4">0.38$</td>
                <td className="py-3 px-4">0.41$</td>
                <td className="py-3 px-4 text-green-500">+300$</td>
              </tr>
              <tr className="hover:bg-black/30">
                <td className="py-3 px-4">11/05/2023 13:10</td>
                <td className="py-3 px-4">BNBUSDT</td>
                <td className="py-3 px-4">Venda</td>
                <td className="py-3 px-4">320$</td>
                <td className="py-3 px-4">310$</td>
                <td className="py-3 px-4 text-green-500">+200$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
