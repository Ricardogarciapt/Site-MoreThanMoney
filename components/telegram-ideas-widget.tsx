"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useTelegramMessages } from "@/hooks/use-telegram-messages"
import Link from "next/link"
import { Lock, MessageSquare, ExternalLink, Clock, RefreshCw, AlertCircle } from "lucide-react"
import TelegramWidget from "./telegram-widget"

export default function TelegramIdeasWidget() {
  const { user, isAuthenticated } = useAuth()

  const { messages, loading, error, refresh, lastUpdated } = useTelegramMessages({
    limit: 5,
    autoRefresh: true,
    refreshInterval: 3 * 60 * 1000, // 3 minutos
  })

  // Verificar se o usuário pode acessar ideias premium
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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gold-500">Canal MoreThanMoney VIP</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Acesse em tempo real as análises, sinais e ideias de trading compartilhadas no nosso canal exclusivo do
            Telegram.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Lock className="h-20 w-20 text-gold-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Login Necessário</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              O acesso ao canal VIP do Telegram é exclusivo para membros registrados. Faça login para acessar o
              conteúdo.
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
          Acesse em tempo real as análises, sinais e ideias de trading compartilhadas no nosso canal exclusivo do
          Telegram.
        </p>
        <div className="flex items-center justify-center text-gold-400 mb-2">
          <Clock className="h-5 w-5 mr-2" />
          <span className="font-medium">Dados em tempo real</span>
        </div>
        {lastUpdated && (
          <p className="text-sm text-gray-500">Última atualização: {lastUpdated.toLocaleString("pt-PT")}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-400" />
                Canal MoreThanMoney VIP Telegram
              </CardTitle>
              <CardDescription>
                Acompanhe as análises em tempo real e sinais compartilhados diariamente pelos nossos especialistas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {canAccessVIP ? (
                <TelegramWidget channelUrl="https://t.me/+2XMn1YEjfjYwYTE0" />
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center bg-black/30 rounded-lg">
                  <Lock className="h-16 w-16 text-gold-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Canal VIP Exclusivo</h3>
                  <p className="text-gray-400 mb-4">
                    O acesso ao canal do Telegram é exclusivo para membros VIP ou superiores.
                  </p>
                  <Link href="/member-area">
                    <Button className="bg-gold-600 hover:bg-gold-700 text-black">Upgrade para VIP</Button>
                  </Link>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-400">Atualizado em tempo real</div>
              {canAccessVIP && (
                <a href="https://t.me/+2XMn1YEjfjYwYTE0" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir no Telegram
                  </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          {/* Preview das mensagens recentes */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mensagens Recentes</CardTitle>
                <Button size="sm" variant="outline" onClick={refresh} disabled={loading} className="border-gold-500/30">
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="flex items-center p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {loading && messages.length === 0 ? (
                  <div className="text-center py-6">
                    <RefreshCw className="h-6 w-6 animate-spin text-gold-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Carregando...</p>
                  </div>
                ) : messages.length > 0 ? (
                  messages.slice(0, 5).map((message) => (
                    <div
                      key={message.id}
                      className="p-3 border border-gray-700 rounded-lg hover:border-gold-500/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {message.type === "signal"
                              ? "🚀 Sinal"
                              : message.type === "analysis"
                                ? "📊 Análise"
                                : "📰 News"}
                          </Badge>
                          {message.symbol && (
                            <Badge className="bg-blue-500/20 text-blue-400 text-xs">{message.symbol}</Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString("pt-PT", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="text-sm text-gray-300 mb-2">
                        {message.content.length > 100 ? message.content.substring(0, 100) + "..." : message.content}
                      </div>

                      <div className="text-xs text-gold-500">{message.author}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400 text-sm">Nenhuma mensagem disponível</div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/trading-ideas" className="w-full">
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">Ver Todas as Ideias</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-6">
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
                    <span className="font-medium">Dados em Tempo Real</span>
                    <p className="text-sm text-gray-400">
                      Integração direta com o canal do Telegram para informações sempre atualizadas.
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

          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quem Pode Acessar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">O acesso ao canal VIP do Telegram está disponível para:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Membros VIP</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Distribuidores</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Lideranças</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Membros Elite</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Diretores</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {!canAccessVIP && (
                <Link href="/member-area" className="w-full">
                  <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">Upgrade para Acesso VIP</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
