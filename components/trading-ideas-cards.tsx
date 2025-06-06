"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { MessageSquare, TrendingUp, Lock, Clock, BarChart3 } from "lucide-react"
import TelegramWidget from "./telegram-widget"
import { getIdeasByType, telegramIdeas, type TelegramIdea } from "@/lib/telegram-ideas"

// Exportação temporária para compatibilidade com outros arquivos
export const sampleIdeas = telegramIdeas.map((idea) => ({
  id: idea.id,
  title: idea.symbol || "Market Update",
  description: idea.content.substring(0, 100) + "...",
  author: idea.author,
  authorRole: "Specialist",
  dateCreated: idea.timestamp,
  category: idea.category === "forex" ? ("forex" as const) : ("crypto" as const),
  content: idea.content,
}))

export default function TradingIdeasCards() {
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [ideas, setIdeas] = useState<TelegramIdea[]>([])

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

  // Carregar ideias do Telegram
  useEffect(() => {
    if (isAuthenticated) {
      setIdeas(getIdeasByType(activeTab))
    }
  }, [isAuthenticated, activeTab])

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
        <div className="flex items-center justify-center text-gold-400">
          <Clock className="h-5 w-5 mr-2" />
          <span className="font-medium">Novas análises diariamente</span>
        </div>
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
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Ideias Recentes
              </CardTitle>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-gold-500/30">
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
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {ideas.length > 0 ? (
                  ideas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-4 border border-gray-700 rounded-lg hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="flex items-center text-xs font-medium">
                          <span className="mr-1">{getIdeaIcon(idea.type)}</span>
                          {getIdeaTypeLabel(idea.type)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(idea.timestamp).toLocaleDateString("pt-PT")}
                        </span>
                      </div>

                      {idea.symbol && (
                        <div className="mb-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
                            {idea.symbol}
                          </span>
                        </div>
                      )}

                      <div className="text-sm text-gray-300 mb-3 whitespace-pre-line">
                        {idea.content.length > 150 ? idea.content.substring(0, 150) + "..." : idea.content}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gold-500">{idea.author}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(idea.timestamp).toLocaleTimeString("pt-PT", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">Nenhuma ideia encontrada nesta categoria.</div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-gold-500 mr-2" />
                  <span className="text-gold-400 font-medium">Novas análises diariamente</span>
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
                    <span className="font-medium">Webinars Exclusivos</span>
                    <p className="text-sm text-gray-400">
                      Participe de sessões ao vivo e webinars conduzidos por nossos especialistas.
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
