"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { ArrowRight, CandlestickChart, DollarSign, TrendingUp, Lock } from "lucide-react"
import TradingViewWidget from "./trading-view-widget"

// Importar dados de portfólios e ideias de trading
import { sampleIdeas } from "./trading-ideas-cards"
import { portfolioData } from "@/lib/portfolio-service"

export default function ScannersAndIdeas() {
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState("scanner")

  // Verificar se o usuário pode acessar conteúdo premium
  const canAccessPremium =
    isAuthenticated &&
    user?.role &&
    [
      "Membro VIP",
      "Distribuidor",
      "Educador",
      "Liderança",
      "Rising Star",
      "Silver Manager",
      "Gold Manager",
      "Platinum Manager",
      "Elite",
      "Director",
      "Diamond",
      "Presidential",
    ].includes(user.role)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gold-500">Scanners e Ideias</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Acesse nossos scanners exclusivos e ideias de trading elaboradas pelos especialistas da MoreThanMoney.
        </p>
      </div>

      <Tabs defaultValue="scanner" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gold-500/30 mb-8">
          <TabsTrigger value="scanner" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <CandlestickChart className="h-4 w-4 mr-2" />
            Scanner MTM
          </TabsTrigger>
          <TabsTrigger value="ideas" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <TrendingUp className="h-4 w-4 mr-2" />
            Ideias de Trading
          </TabsTrigger>
          <TabsTrigger value="portfolios" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <DollarSign className="h-4 w-4 mr-2" />
            Portfólios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="mt-0">
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
                  Scanner MTM ao Vivo
                </h3>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Visualize em tempo real as estruturas de mercado com base no nosso indicador exclusivo 'MoreThanMoney
                  Scanner V3.4'. Ideal para iniciantes – sem complicações, só sinais claros.
                </p>
              </div>

              <div className="mt-8 rounded-lg overflow-hidden border border-gold-500/30">
                {isAuthenticated ? (
                  <TradingViewWidget />
                ) : (
                  <div className="aspect-video min-h-[400px] w-full bg-black/90 flex flex-col items-center justify-center p-6 text-center">
                    <Lock className="h-16 w-16 text-gold-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Acesso Restrito</h2>
                    <p className="text-gray-300 mb-6 max-w-lg">
                      Para acessar o Scanner MTM, faça login na sua conta ou torne-se um membro.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/member-area">
                        <Button className="bg-gold-600 hover:bg-gold-700 text-black min-w-[180px]">Fazer Login</Button>
                      </Link>
                      <Link href="/scanner-access">
                        <Button
                          variant="outline"
                          className="border-gold-500 text-gold-400 hover:bg-gold-500/10 min-w-[180px]"
                        >
                          Saber Mais
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ideas" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleIdeas.slice(0, 6).map((idea) => (
              <Card
                key={idea.id}
                className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/50 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        idea.category === "forex" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {idea.category === "forex" ? "Forex" : "Cripto"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(idea.dateCreated).toLocaleDateString("pt-PT")}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{idea.title}</CardTitle>
                  <CardDescription>{idea.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {idea.imageUrl && (
                    <div className="mb-4 overflow-hidden rounded-lg h-40">
                      <img
                        src={idea.imageUrl || "/placeholder.svg"}
                        alt={idea.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="text-xs text-gold-500">
                    {idea.author} • {idea.authorRole}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/trading-ideas?id=${idea.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-gold-400 hover:text-gold-500 hover:bg-gold-500/10">
                      Ver Análise Completa <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/trading-ideas">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black">
                Ver Todas as Ideias <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="portfolios" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.map((portfolio) => (
              <Card
                key={portfolio.id}
                className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/50 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
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
                  <CardTitle className="text-lg">{portfolio.name}</CardTitle>
                  <CardDescription>{portfolio.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {portfolio.assets.slice(0, 3).map((asset) => (
                      <div key={asset.symbol} className="flex justify-between items-center p-2 rounded-md bg-black/30">
                        <div className="flex items-center">
                          <span className="font-medium">{asset.symbol}</span>
                          <span className="ml-2 text-xs text-gray-400">{asset.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">{asset.allocation}%</span>
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
                    {portfolio.assets.length > 3 && (
                      <div className="text-center text-sm text-gray-400 mt-2">
                        +{portfolio.assets.length - 3} mais ativos
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/portfolios?id=${portfolio.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-gold-400 hover:text-gold-500 hover:bg-gold-500/10">
                      Ver Portfólio Completo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/portfolios">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black">
                Ver Todos os Portfólios <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
