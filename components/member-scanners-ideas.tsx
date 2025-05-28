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
    <div className="space-y-6">
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
          {/* Control Panel */}
          <Card className="bg-black/30 border-gray-800 mb-4">
            <CardContent className="px-4 py-3 bg-black/50 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gold-500">Scanner MTM ao Vivo</h4>
                <p className="text-xs text-gray-400">Estruturas de mercado em tempo real</p>
              </div>
              <Link href="/scanner">
                <Button size="sm" className="bg-gold-600 hover:bg-gold-700 text-black">
                  Abrir Scanner
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* TradingView Widget Panel */}
          <Card className="bg-black/30 border-gray-800 mb-8">
            <CardContent className="p-0">
              <div className="aspect-video h-[500px] w-full overflow-hidden rounded-md pointer-events-auto">
                <div className="w-full h-full overflow-auto p-4" style={{ pointerEvents: "auto" }}>
                  <TradingViewWidget />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rest of the component remains the same... */}
        </TabsContent>

        <TabsContent value="ideas" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentIdeas.map((idea, index) => (
              <Card key={index} className="bg-black/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gold-500">{idea.title}</CardTitle>
                  <CardTitle className="text-white">{idea.ticker}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{idea.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">{idea.date}</p>
                  <Link href={idea.link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      Ver Análise <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolios" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.map((portfolio, index) => (
              <Card key={index} className="bg-black/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gold-500">{portfolio.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{portfolio.description}</p>
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-300">Ativos:</h5>
                    <ul className="list-disc pl-4 text-xs text-gray-400">
                      {portfolio.assets.map((asset, assetIndex) => (
                        <li key={assetIndex}>{asset}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">Criado em: {portfolio.createdAt}</p>
                  <Button size="sm" variant="outline">
                    <DollarSign className="mr-1 h-4 w-4" />
                    Investir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
