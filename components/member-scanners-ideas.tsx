"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, TrendingUp, BarChart3, LineChart, DollarSign } from "lucide-react"
import TradingViewWidget from "./trading-view-widget"
import { getRecentIdeas } from "@/lib/telegram-ideas"
import { portfolioData } from "@/lib/portfolio-service"

export function MemberScannersIdeas() {
  const [activeTab, setActiveTab] = useState("scanners")
  const recentIdeas = getRecentIdeas(3)

  return (
    <div className="space-y-6 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Scanners e Ideias</h2>
        <Link href="/scanners-and-ideas">
          <Button variant="ghost" className="text-gold-500 hover:text-gold-600 hover:bg-transparent p-0">
            Ver Todos <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="scanners" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gold-500/30 mb-8">
          <TabsTrigger value="scanners" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <LineChart className="h-4 w-4 mr-2" />
            Scanners
          </TabsTrigger>
          <TabsTrigger value="ideas" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <TrendingUp className="h-4 w-4 mr-2" />
            Ideias de Trading
          </TabsTrigger>
          <TabsTrigger value="portfolios" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <BarChart3 className="h-4 w-4 mr-2" />
            Portfólios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanners" className="mt-0">
          {/* Scanner principal */}
          <Card className="bg-black/30 border-gray-800 mb-8 relative z-0">
            <CardContent className="p-0">
              <div className="relative z-0">
                <div className="aspect-video h-[600px] w-full overflow-hidden rounded-md pointer-events-auto relative z-0">
                  <div className="w-full h-full overflow-auto relative z-0" style={{ pointerEvents: "auto" }}>
                    <TradingViewWidget />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-4 py-3 bg-black/50 flex justify-between relative z-10">
              <div>
                <h4 className="font-medium text-gold-500">Scanner MTM ao Vivo</h4>
                <p className="text-xs text-gray-400">Estruturas de mercado em tempo real</p>
              </div>
              <Link href="/scanner">
                <Button size="sm" className="bg-gold-600 hover:bg-gold-700 text-black">
                  Abrir Scanner
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Seção de Ideias de Trading abaixo do Scanner */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-gold-500" />
                Ideias de Trading Recentes
              </h3>
              <Link href="/trading-ideas">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gold-500 hover:text-gold-600 hover:bg-transparent p-0"
                >
                  Ver Todas <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentIdeas.map((idea) => (
                <Card key={idea.id} className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-1">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          idea.category === "forex"
                            ? "bg-blue-500/20 text-blue-400"
                            : idea.category === "crypto"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {idea.category === "forex" ? "Forex" : idea.category === "crypto" ? "Cripto" : "Commodities"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(idea.timestamp).toLocaleDateString("pt-PT")}
                      </span>
                    </div>
                    <CardTitle className="text-base">{idea.symbol || "Market Update"}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {idea.content.length > 100 ? idea.content.substring(0, 100) + "..." : idea.content}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="w-full flex justify-between items-center">
                      <div className="text-xs text-gold-500">{idea.author}</div>
                      <span className="text-xs text-gray-500">
                        {idea.type === "signal" ? "🚀 Sinal" : idea.type === "analysis" ? "📊 Análise" : "📰 News"}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Seção de Portfólios abaixo das Ideias */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-gold-500" />
                Portfólios Recomendados
              </h3>
              <Link href="/portfolios">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gold-500 hover:text-gold-600 hover:bg-transparent p-0"
                >
                  Ver Todos <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolioData.slice(0, 3).map((portfolio) => (
                <Card
                  key={portfolio.id}
                  className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-1">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          portfolio.type === "crypto"
                            ? "bg-purple-500/20 text-purple-400"
                            : portfolio.type === "stocks"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {portfolio.type === "crypto"
                          ? "Criptomoedas"
                          : portfolio.type === "stocks"
                            ? "Ações"
                            : "Balanceado"}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          portfolio.risk === "Alto"
                            ? "bg-red-500/20 text-red-400"
                            : portfolio.risk === "Médio"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        Risco {portfolio.risk}
                      </span>
                    </div>
                    <CardTitle className="text-base">{portfolio.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-1">
                      {portfolio.assets.slice(0, 3).map((asset) => (
                        <div
                          key={asset.symbol}
                          className="flex justify-between items-center p-1.5 rounded-md bg-black/30"
                        >
                          <div className="flex items-center">
                            <span className="font-medium text-xs">{asset.symbol}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-xs">{asset.allocation}%</span>
                            <span
                              className={`text-xs ${
                                asset.trend === "up"
                                  ? "text-green-500"
                                  : asset.trend === "down"
                                    ? "text-red-500"
                                    : "text-gray-400"
                              }`}
                            >
                              {asset.trend === "up" ? "↑" : asset.trend === "down" ? "↓" : "→"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href={`/portfolios?id=${portfolio.id}`} className="w-full">
                      <Button variant="ghost" className="w-full text-gold-400 hover:text-gold-500 hover:bg-gold-500/10">
                        Ver Portfólio <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentIdeas.map((idea) => (
              <Card key={idea.id} className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        idea.category === "forex"
                          ? "bg-blue-500/20 text-blue-400"
                          : idea.category === "crypto"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {idea.category === "forex" ? "Forex" : idea.category === "crypto" ? "Cripto" : "Commodities"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(idea.timestamp).toLocaleDateString("pt-PT")}
                    </span>
                  </div>
                  <CardTitle className="text-base">{idea.symbol || "Market Update"}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {idea.content.length > 150 ? idea.content.substring(0, 150) + "..." : idea.content}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-xs text-gold-500">{idea.author}</div>
                    <span className="text-xs text-gray-500">
                      {idea.type === "signal" ? "🚀 Sinal" : idea.type === "analysis" ? "📊 Análise" : "📰 News"}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/trading-ideas">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black">Ver Todas as Ideias</Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="portfolios" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.map((portfolio) => (
              <Card key={portfolio.id} className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        portfolio.type === "crypto"
                          ? "bg-purple-500/20 text-purple-400"
                          : portfolio.type === "stocks"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {portfolio.type === "crypto"
                        ? "Criptomoedas"
                        : portfolio.type === "stocks"
                          ? "Ações"
                          : "Balanceado"}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        portfolio.risk === "Alto"
                          ? "bg-red-500/20 text-red-400"
                          : portfolio.risk === "Médio"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      Risco {portfolio.risk}
                    </span>
                  </div>
                  <CardTitle className="text-base">{portfolio.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-1">
                    {portfolio.assets.slice(0, 3).map((asset) => (
                      <div
                        key={asset.symbol}
                        className="flex justify-between items-center p-1.5 rounded-md bg-black/30"
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-xs">{asset.symbol}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-xs">{asset.allocation}%</span>
                          <span
                            className={`text-xs ${
                              asset.trend === "up"
                                ? "text-green-500"
                                : asset.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-400"
                            }`}
                          >
                            {asset.trend === "up" ? "↑" : asset.trend === "down" ? "↓" : "→"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href={`/portfolios?id=${portfolio.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-gold-400 hover:text-gold-500 hover:bg-gold-500/10">
                      Ver Portfólio <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/portfolios">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black">Ver Todos os Portfólios</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
