"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { DollarSign, CandlestickChart, TrendingUp, MessageSquare, ArrowRight, Lock } from "lucide-react"
import TelegramWidget from "./telegram-widget"

interface TradingIdea {
  id: string
  title: string
  description: string
  author: string
  authorRole: string
  dateCreated: string
  category: "forex" | "crypto"
  content: string
  imageUrl?: string
}

// Ideias de exemplo
const sampleIdeas: TradingIdea[] = [
  {
    id: "idea-1",
    title: "EUR/USD: Oportunidade de Compra na Zona de Suporte",
    description: "Análise técnica mostrando uma potencial reversão em zona de suporte importante",
    author: "Ricardo Garcia",
    authorRole: "Director",
    dateCreated: "2023-05-12T10:30:00Z",
    category: "forex",
    content: `
# Análise EUR/USD - Oportunidade de Compra

## Visão Geral do Mercado
O par EUR/USD encontra-se atualmente testando uma zona de suporte significativa que coincide com o nível de Fibonacci de 61,8% do último movimento de alta.

## Pontos-Chave
- **Nível de Suporte:** 1.0850
- **Alvo de Lucro 1:** 1.0920
- **Alvo de Lucro 2:** 1.0980
- **Stop Loss Sugerido:** 1.0810

## Indicadores Técnicos
- RSI mostrando condição de sobrevenda (32)
- Cruzamento da média móvel de 20 períodos com a de 50
- Formação de padrão de vela de reversão (martelo)

## Gatilho de Entrada
Entrada após confirmação de fechamento de vela acima de 1.0870, preferencialmente com aumento de volume.

## Considerações de Risco
Atenção aos dados econômicos dos EUA previstos para amanhã, que podem aumentar a volatilidade.
    `,
    imageUrl: "/placeholder.svg?key=34flq",
  },
  {
    id: "idea-2",
    title: "Bitcoin: Consolidação Antes de Nova Alta",
    description: "BTC/USD formando base para possível movimento de alta nos próximos dias",
    author: "Ana Silva",
    authorRole: "Educador",
    dateCreated: "2023-05-10T14:45:00Z",
    category: "crypto",
    content: `
# Análise Bitcoin (BTC/USD)

## Visão Geral do Mercado
Bitcoin está formando um padrão de consolidação após a recente queda, mostrando sinais de estabilização em níveis de suporte importantes.

## Pontos-Chave
- **Zona de Suporte:** $26,800 - $27,200
- **Resistência Imediata:** $28,500
- **Alvo de Lucro:** $30,000
- **Stop Loss Sugerido:** $26,500

## Indicadores Técnicos
- MACD começando a mostrar divergência positiva
- Volume aumentando nas últimas 24 horas
- OBV (On-Balance Volume) estável, indicando acumulação

## Análise On-Chain
- Endereços de grandes investidores (whales) mostram acumulação recente
- Diminuição de Bitcoin nas exchanges, indicando menos pressão de venda

## Cenário Alternativo
Se perder o suporte em $26,500, podemos ver uma queda para testar $25,000 antes de retomar a tendência de alta.
    `,
    imageUrl: "/placeholder.svg?key=jh7e1",
  },
  {
    id: "idea-3",
    title: "GBP/JPY: Setup de Venda em Resistência Chave",
    description: "Par atingiu zona de resistência forte e mostra sinais de reversão",
    author: "Ricardo Garcia",
    authorRole: "Director",
    dateCreated: "2023-05-09T09:15:00Z",
    category: "forex",
    content: `
# Análise GBP/JPY - Oportunidade de Venda

## Visão Geral
O par GBP/JPY encontra-se em zona de resistência histórica e está mostrando sinais de exaustão compradora.

## Pontos-Chave
- **Nível de Resistência:** 168.50
- **Alvo de Lucro 1:** 167.80
- **Alvo de Lucro 2:** 167.00
- **Stop Loss Sugerido:** 169.00

## Análise Técnica
- Formação de padrão de vela "evening star" em timeframe diário
- RSI mostrando divergência negativa
- Teste de resistência em canal de alta de longo prazo

## Contexto Fundamental
Divergência nas perspectivas econômicas entre Reino Unido e Japão, com recentes dados de inflação no Reino Unido abaixo das expectativas.

## Gatilho de Entrada
Venda após confirmação de fechamento abaixo de 168.30, preferencialmente com aumento de volume.
    `,
    imageUrl: "/placeholder.svg?key=9bxhy",
  },
  {
    id: "idea-4",
    title: "Ethereum: Preparando-se para o Próximo Upgrade",
    description: "ETH mostrando força antes do próximo upgrade de rede",
    author: "Ana Silva",
    authorRole: "Educador",
    dateCreated: "2023-05-08T16:20:00Z",
    category: "crypto",
    content: `
# Análise Ethereum (ETH/USD)

## Visão Geral do Mercado
Ethereum está mostrando força relativa em comparação com Bitcoin, à medida que se aproxima o próximo upgrade da rede.

## Pontos-Chave
- **Suporte Importante:** $1,850
- **Resistência Atual:** $2,000
- **Alvo de Lucro:** $2,200
- **Stop Loss Sugerido:** $1,820

## Catalisadores
- Próximo upgrade da rede previsto para as próximas semanas
- Aumento na atividade de desenvolvedores na rede Ethereum
- Crescimento nas aplicações DeFi e NFTs após período de queda

## Considerações Técnicas
- Formação de um triângulo ascendente no gráfico de 4 horas
- Volume crescente nas últimas sessões de alta
- RSI em tendência de alta, atualmente em 58

## Estratégia de Entrada
Compra na quebra confirmada acima de $2,000 ou em reteste do suporte em $1,900, dependendo do perfil de risco.
    `,
    imageUrl: "/placeholder.svg?key=yfyf5",
  },
]

export default function TradingIdeasCards() {
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedIdea, setSelectedIdea] = useState<TradingIdea | null>(null)
  const [ideas, setIdeas] = useState<TradingIdea[]>(sampleIdeas)

  // Carregar ideias do localStorage se disponível
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIdeas = localStorage.getItem("tradingIdeas")
      if (savedIdeas) {
        setIdeas(JSON.parse(savedIdeas))
      } else {
        // Se não houver ideias salvas, usar as de exemplo e salvá-las
        localStorage.setItem("tradingIdeas", JSON.stringify(sampleIdeas))
      }
    }
  }, [])

  const handleSelectIdea = (idea: TradingIdea) => {
    setSelectedIdea(idea)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Filtrar ideias baseado na aba ativa
  const filteredIdeas = ideas.filter((idea) => {
    if (activeTab === "all") return true
    if (activeTab === "forex") return idea.category === "forex"
    if (activeTab === "crypto") return idea.category === "crypto"
    return true
  })

  // Verificar se o usuário pode acessar ideias premium
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gold-500">Ideias de Trading</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Acesse análises e ideias de trading elaboradas pelos nossos educadores e especialistas de mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna de detalhes da ideia ou widget do Telegram */}
        <div className="lg:col-span-2">
          {selectedIdea ? (
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedIdea.title}</CardTitle>
                    <CardDescription className="mt-2">{selectedIdea.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-gold-500 font-medium">{selectedIdea.author}</div>
                    <div className="text-sm text-gray-400">{selectedIdea.authorRole}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(selectedIdea.dateCreated).toLocaleDateString("pt-PT")}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedIdea.imageUrl && (
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <img
                      src={selectedIdea.imageUrl || "/placeholder.svg"}
                      alt={selectedIdea.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-invert max-w-none">
                  {canAccessPremium ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedIdea.content
                          .split("\n")
                          .map((line) => {
                            if (line.startsWith("# ")) {
                              return `<h1 class="text-2xl font-bold mb-4 text-gold-500">${line.substring(2)}</h1>`
                            } else if (line.startsWith("## ")) {
                              return `<h2 class="text-xl font-bold mt-6 mb-3">${line.substring(3)}</h2>`
                            } else if (line.startsWith("- ")) {
                              return `<li class="ml-4 mb-1">${line.substring(2)}</li>`
                            } else if (line.startsWith("**")) {
                              const boldContent = line.match(/\*\*(.*?)\*\*/g)
                              if (boldContent) {
                                return boldContent.reduce((str, bold) => {
                                  const content = bold.substring(2, bold.length - 2)
                                  return str.replace(bold, `<strong class="text-gold-400">${content}</strong>`)
                                }, line)
                              }
                              return line
                            } else if (line.trim() === "") {
                              return "<br>"
                            } else {
                              return `<p class="mb-3">${line}</p>`
                            }
                          })
                          .join(""),
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-10 text-center bg-black/30 rounded-lg">
                      <Lock className="h-16 w-16 text-gold-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Conteúdo Premium</h3>
                      <p className="text-gray-400 mb-4">
                        Esta análise detalhada está disponível apenas para membros VIP ou superiores.
                      </p>
                      <Link href="/member-area">
                        <Button className="bg-gold-600 hover:bg-gold-700 text-black">Upgrade para VIP</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => setSelectedIdea(null)}
                  className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10"
                >
                  Voltar para Lista de Ideias
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2" />
                  Canal MoreThanMoney VIP Telegram
                </CardTitle>
                <CardDescription>
                  Acompanhe as análises em tempo real e sinais compartilhados no nosso canal VIP.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {canAccessPremium ? (
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
                {canAccessPremium && (
                  <a href="https://t.me/+2XMn1YEjfjYwYTE0" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Abrir no Telegram
                    </Button>
                  </a>
                )}
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Coluna de lista de ideias */}
        <div>
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gold-500/30">
                  <TabsTrigger value="all" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    Todas
                  </TabsTrigger>
                  <TabsTrigger value="forex" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Forex
                  </TabsTrigger>
                  <TabsTrigger
                    value="crypto"
                    className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
                  >
                    <CandlestickChart className="h-4 w-4 mr-1" />
                    Cripto
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredIdeas.length > 0 ? (
                  filteredIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-4 border border-gray-700 rounded-lg hover:border-gold-500/50 hover:bg-gold-500/5 cursor-pointer transition-colors"
                      onClick={() => handleSelectIdea(idea)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            idea.category === "forex"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {idea.category === "forex" ? "Forex" : "Cripto"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(idea.dateCreated).toLocaleDateString("pt-PT")}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">{idea.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{idea.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gold-500">{idea.author}</div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-gold-400 hover:text-gold-500 hover:bg-gold-500/10"
                        >
                          Ver Detalhes <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
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
                  <span className="text-gold-400 font-medium">Novas análises semanalmente</span>
                </div>
                <p className="text-sm text-gray-400">
                  Acesse as análises mais recentes dos nossos especialistas de mercado.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
