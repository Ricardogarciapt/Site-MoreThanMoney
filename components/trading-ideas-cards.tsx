"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useTelegramMessages } from "@/hooks/use-telegram-messages"
import Link from "next/link"
import { MessageSquare, TrendingUp, Lock, Clock, BarChart3, RefreshCw, AlertCircle } from "lucide-react"
import TelegramWidget from "./telegram-widget"

// Export for compatibility with other components
export const sampleIdeas = [
  {
    id: "1",
    title: "EUR/USD Analysis",
    description: "Technical analysis showing bullish momentum on EUR/USD pair with key resistance levels...",
    author: "Trading Expert",
    authorRole: "Specialist",
    dateCreated: new Date().toISOString(),
    category: "forex" as const,
    content: "EUR/USD showing strong bullish momentum. Key resistance at 1.0950. Target: 1.1000",
  },
  {
    id: "2",
    title: "Bitcoin Signal",
    description: "BTC breaking above key resistance level with strong volume confirmation...",
    author: "Crypto Analyst",
    authorRole: "Specialist",
    dateCreated: new Date().toISOString(),
    category: "crypto" as const,
    content: "BTC breaking above $45,000 resistance. Strong volume confirmation. Target: $48,000",
  },
]

export default function TradingIdeasCards() {
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")

  const { messages, loading, error, refresh, lastUpdated } = useTelegramMessages({
    type: activeTab === "all" ? undefined : activeTab,
    limit: 30,
    autoRefresh: true,
    refreshInterval: 2 * 60 * 1000, // 2 minutos
  })

  // Verificar se o usuário pode acessar o canal VIP
  const canAccessVIP =
    isAuthenticated &&
    user?.role &&
    [
      "Membro VIP",
      "Distribuidor",
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

  const getIdeaIcon = (type: string) => {
    switch (type) {
      case "signal":
        return "🚀"
      case "analysis":
        return "📊"
      case "market_update":
        return "📰"
      default:
        return "💡"
    }
  }

  const getIdeaTypeLabel = (type: string) => {
    switch (type) {
      case "signal":
        return "Sinal"
      case "analysis":
        return "Análise"
      case "market_update":
        return "Market Update"
      default:
        return "Ideia"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "forex":
        return "bg-blue-500/20 text-blue-400"
      case "crypto":
        return "bg-orange-500/20 text-orange-400"
      case "commodities":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getDirectionColor = (direction?: string) => {
    switch (direction) {
      case "buy":
        return "bg-green-500/20 text-green-400"
      case "sell":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gold-500">Ideias de Trading</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Acesse análises e sinais em tempo real diretamente do nosso canal VIP do Telegram.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Lock className="h-20 w-20 text-gold-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Acesso Restrito</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              As ideias de trading são compartilhadas exclusivamente no nosso canal VIP do Telegram. Faça login para
              acessar o conteúdo.
            </p>
            <Link href="/member-area">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black px-8 py-3">Fazer Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gold-500">Canal MoreThanMoney VIP</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
          Análises e sinais em tempo real diretamente do nosso canal exclusivo do Telegram.
        </p>
        <div className="flex items-center justify-center text-gold-400 mb-4">
          <Clock className="h-5 w-5 mr-2" />
          <span className="font-medium">Atualizado automaticamente</span>
        </div>
        {lastUpdated && (
          <p className="text-sm text-gray-500">Última atualização: {lastUpdated.toLocaleString("pt-PT")}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Widget do Telegram */}
        <div className="lg:col-span-2">
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-400" />
                Canal MoreThanMoney VIP Telegram
              </CardTitle>
              <CardDescription>
                Acompanhe em tempo real as análises e sinais compartilhados pelos nossos especialistas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TelegramWidget channelUrl="https://t.me/+2XMn1YEjfjYwYTE0" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-400">Atualizado em tempo real</div>
              <a href="https://t.me/+2XMn1YEjfjYwYTE0" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Abrir no Telegram
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        {/* Lista de ideias do Telegram */}
        <div>
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Ideias Recentes
                </CardTitle>
                <Button size="sm" variant="outline" onClick={refresh} disabled={loading} className="border-gold-500/30">
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gold-500/30">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-xs"
                  >
                    Todas
                  </TabsTrigger>
                  <TabsTrigger
                    value="signal"
                    className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-xs"
                  >
                    Sinais
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-xs"
                  >
                    Análises
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="flex items-center justify-center p-4 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {loading && messages.length === 0 ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-gold-500 mx-auto mb-2" />
                    <p className="text-gray-400">Carregando mensagens...</p>
                  </div>
                ) : messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className="p-4 border border-gray-700 rounded-lg hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center text-xs font-medium">
                            <span className="mr-1">{getIdeaIcon(message.type)}</span>
                            {getIdeaTypeLabel(message.type)}
                          </span>
                          <Badge className={getCategoryColor(message.category)}>{message.category.toUpperCase()}</Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleDateString("pt-PT")}
                        </span>
                      </div>

                      <div className="flex gap-2 mb-2">
                        {message.symbol && <Badge className="bg-blue-500/20 text-blue-400">{message.symbol}</Badge>}
                        {message.direction && (
                          <Badge className={getDirectionColor(message.direction)}>
                            {message.direction.toUpperCase()}
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-gray-300 mb-3 whitespace-pre-line">
                        {message.content.length > 200 ? message.content.substring(0, 200) + "..." : message.content}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gold-500">{message.author}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString("pt-PT", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    {error ? "Erro ao carregar mensagens" : "Nenhuma mensagem encontrada nesta categoria."}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-gold-500 mr-2" />
                  <span className="text-gold-400 font-medium">{messages.length} mensagens carregadas</span>
                </div>
                <p className="text-sm text-gray-400">Conteúdo atualizado automaticamente do canal VIP.</p>
              </div>
            </CardFooter>
          </Card>

          {/* Card de Benefícios */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mt-6">
            <CardHeader>
              <CardTitle>Benefícios do Canal VIP</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">1</span>
                  </div>
                  <div>
                    <span className="font-medium">Sinais de Trading</span>
                    <p className="text-sm text-gray-400">
                      Receba sinais de trading diariamente para Forex, Criptomoedas e outros mercados.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">2</span>
                  </div>
                  <div>
                    <span className="font-medium">Análises Técnicas</span>
                    <p className="text-sm text-gray-400">
                      Acesse análises detalhadas com gráficos, níveis de suporte e resistência, e alvo de lucro.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">3</span>
                  </div>
                  <div>
                    <span className="font-medium">Atualizações de Mercado</span>
                    <p className="text-sm text-gray-400">
                      Fique por dentro de notícias importantes e eventos que podem impactar o mercado.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">4</span>
                  </div>
                  <div>
                    <span className="font-medium">Dados em Tempo Real</span>
                    <p className="text-sm text-gray-400">
                      Integração direta com o canal do Telegram para dados sempre atualizados.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
