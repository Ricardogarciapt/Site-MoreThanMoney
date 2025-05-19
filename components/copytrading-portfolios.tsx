"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, BarChart3, PieChart, Users, Clock, Award } from "lucide-react"

interface Portfolio {
  id: string
  name: string
  description: string
  trader: string
  traderRating: number
  monthlyReturn: number
  yearlyReturn: number
  drawdown: number
  subscribers: number
  risk: "low" | "medium" | "high"
  instruments: string[]
  timeframe: string
  active: boolean
}

export function CopytradingPortfolios() {
  const [portfolios] = useState<Portfolio[]>([
    {
      id: "1",
      name: "Conservative Forex",
      description: "Estratégia de baixo risco focada em pares de moedas principais",
      trader: "João Silva",
      traderRating: 4.8,
      monthlyReturn: 3.2,
      yearlyReturn: 28.5,
      drawdown: 5.2,
      subscribers: 342,
      risk: "low",
      instruments: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF"],
      timeframe: "4h-1d",
      active: true,
    },
    {
      id: "2",
      name: "Crypto Momentum",
      description: "Estratégia agressiva focada em criptomoedas de alta capitalização",
      trader: "Ana Pereira",
      traderRating: 4.6,
      monthlyReturn: 8.7,
      yearlyReturn: 67.3,
      drawdown: 18.5,
      subscribers: 215,
      risk: "high",
      instruments: ["BTC/USD", "ETH/USD", "BNB/USD", "SOL/USD"],
      timeframe: "15m-1h",
      active: true,
    },
    {
      id: "3",
      name: "Swing Trade Stocks",
      description: "Estratégia de médio prazo focada em ações americanas",
      trader: "Carlos Mendes",
      traderRating: 4.5,
      monthlyReturn: 4.8,
      yearlyReturn: 42.1,
      drawdown: 12.3,
      subscribers: 187,
      risk: "medium",
      instruments: ["AAPL", "MSFT", "AMZN", "GOOGL"],
      timeframe: "1d",
      active: true,
    },
    {
      id: "4",
      name: "Commodities Trend",
      description: "Estratégia baseada em tendências de commodities",
      trader: "Mariana Costa",
      traderRating: 4.3,
      monthlyReturn: 5.1,
      yearlyReturn: 38.7,
      drawdown: 14.2,
      subscribers: 156,
      risk: "medium",
      instruments: ["GOLD", "SILVER", "OIL", "COPPER"],
      timeframe: "4h-1d",
      active: true,
    },
    {
      id: "5",
      name: "Scalping FX",
      description: "Estratégia de curto prazo com múltiplas operações diárias",
      trader: "Pedro Santos",
      traderRating: 4.7,
      monthlyReturn: 6.3,
      yearlyReturn: 52.8,
      drawdown: 9.7,
      subscribers: 278,
      risk: "high",
      instruments: ["EUR/USD", "GBP/USD", "AUD/USD", "USD/CAD"],
      timeframe: "1m-5m",
      active: true,
    },
  ])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500/20 text-green-500"
      case "medium":
        return "bg-gold-500/20 text-gold-500"
      case "high":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "low":
        return "Baixo"
      case "medium":
        return "Médio"
      case "high":
        return "Alto"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gold-500">Portfólios de Copytrading</h1>
      <p className="text-gray-300 mb-8">
        Escolha entre nossos portfólios gerenciados por traders profissionais e copie automaticamente suas operações.
      </p>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="stocks">Ações</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </TabsContent>

        <TabsContent value="forex" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolios
            .filter((p) => p.instruments.some((i) => i.includes("/")))
            .map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
        </TabsContent>

        <TabsContent value="crypto" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolios
            .filter((p) => p.instruments.some((i) => i.includes("BTC") || i.includes("ETH")))
            .map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
        </TabsContent>

        <TabsContent value="stocks" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolios
            .filter((p) => p.instruments.some((i) => !i.includes("/") && !i.includes("GOLD")))
            .map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )

  function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
    return (
      <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{portfolio.name}</CardTitle>
            <Badge className={getRiskColor(portfolio.risk)}>Risco {getRiskLabel(portfolio.risk)}</Badge>
          </div>
          <CardDescription>{portfolio.description}</CardDescription>
        </CardHeader>

        <CardContent className="py-3">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center">
                <BarChart3 className="h-3 w-3 mr-1" /> Retorno Mensal
              </p>
              <p className={`font-medium ${portfolio.monthlyReturn > 0 ? "text-green-500" : "text-red-500"}`}>
                {portfolio.monthlyReturn > 0 ? "+" : ""}
                {portfolio.monthlyReturn.toFixed(1)}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center">
                <PieChart className="h-3 w-3 mr-1" /> Retorno Anual
              </p>
              <p className={`font-medium ${portfolio.yearlyReturn > 0 ? "text-green-500" : "text-red-500"}`}>
                {portfolio.yearlyReturn > 0 ? "+" : ""}
                {portfolio.yearlyReturn.toFixed(1)}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" /> Drawdown Máx.
              </p>
              <p className="font-medium text-red-500">-{portfolio.drawdown.toFixed(1)}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center">
                <Users className="h-3 w-3 mr-1" /> Assinantes
              </p>
              <p className="font-medium">{portfolio.subscribers}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <p className="text-xs text-gray-400 mr-2">Trader:</p>
              <p className="font-medium flex items-center">
                {portfolio.trader}
                <span className="ml-2 flex items-center text-gold-500">
                  <Award className="h-3 w-3 mr-1" />
                  {portfolio.traderRating}
                </span>
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-xs text-gray-400 mr-2">Instrumentos:</p>
              <p className="font-medium text-sm">{portfolio.instruments.join(", ")}</p>
            </div>
            <div className="flex items-center">
              <p className="text-xs text-gray-400 mr-2">Timeframe:</p>
              <p className="font-medium flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {portfolio.timeframe}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">Assinar Portfólio</Button>
        </CardFooter>
      </Card>
    )
  }
}
