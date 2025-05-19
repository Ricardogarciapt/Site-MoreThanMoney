"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import ScannerInfo from "@/components/scanner-info"
import TradingViewWidget from "@/components/trading-view-widget"
import { TapToTradeWidget } from "@/components/tap-to-trade-widget"
import {
  ArrowRight,
  ChevronDown,
  DollarSign,
  Lock,
  Unlock,
  Zap,
  CandlestickChart,
  MessageSquare,
  Timer,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { MembershipRequired } from "@/components/membership-required"
import Image from "next/image"

export default function ScannerView() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("scanner")
  const [showDetails, setShowDetails] = useState(false)
  const [showAcceptedMessage, setShowAcceptedMessage] = useState(false)

  const handleAccessClick = () => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }

  const handleTradeAccept = () => {
    setShowAcceptedMessage(true)
    setTimeout(() => {
      setShowAcceptedMessage(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Scanner MoreThanMoneyTM – Acesso Exclusivo</h1>

      {/* Prévia do Scanner */}
      <div className="mb-12 bg-black/50 p-6 rounded-lg border border-gold-500/30">
        <h2 className="text-2xl font-semibold text-gold-500 mb-4">Prévia do Scanner MTM</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <Image
              src="/scanner-preview.png"
              alt="Scanner MTM Preview"
              width={600}
              height={400}
              className="rounded-lg border border-gold-500/30 shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-medium text-gold-400 mb-3">
              MoreThanMoney Scanner V3.4 - Market structures and ATR
            </h3>
            <p className="text-gray-300 mb-4">
              O Scanner MTM é uma ferramenta avançada que identifica estruturas de mercado e utiliza o ATR (Average True
              Range) para fornecer sinais precisos de trading. Desenvolvido exclusivamente para membros MoreThanMoney.
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Identificação de estruturas de mercado</li>
              <li>Cálculo de ATR para gerenciamento de risco</li>
              <li>Sinais de entrada e saída otimizados</li>
              <li>Compatível com múltiplos timeframes</li>
              <li>Atualizações regulares e suporte dedicado</li>
            </ul>
            <a
              href="https://www.tradingview.com/script/BtIDtpBs-MoreThanMoney-Scanner-V3-4-Market-structures-and-ATR/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-400 underline inline-flex items-center"
            >
              Ver no TradingView
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {isAuthenticated ? (
        <MembershipRequired>
          <div className="bg-black/80 p-6 rounded-lg border border-gold-500/30">
            {/* Conteúdo existente do scanner */}
            <h2 className="text-2xl font-bold mb-4">Scanner de Mercado</h2>
            <p className="mb-6">
              Utilize nosso scanner exclusivo para identificar oportunidades de mercado em tempo real.
            </p>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8 bg-black/50 border border-gold-500/30">
                <TabsTrigger value="scanner" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                  Scanner
                </TabsTrigger>
                <TabsTrigger value="forex" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                  Ideias Forex
                </TabsTrigger>
                <TabsTrigger value="crypto" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                  Ideias Cripto
                </TabsTrigger>
                <TabsTrigger
                  value="taptotrade"
                  className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
                >
                  TAPTOTRADE
                </TabsTrigger>
              </TabsList>

              <TabsContent value="scanner">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full">
                      <CardHeader>
                        <CardTitle>Scanner Ao Vivo</CardTitle>
                        <CardDescription>
                          Visualize e analise os mercados em tempo real com nosso scanner especializado.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        {isAuthenticated ? (
                          <div className="aspect-video min-h-[400px] w-full">
                            <TradingViewWidget />
                          </div>
                        ) : (
                          <div className="aspect-video min-h-[400px] w-full bg-black/90 flex flex-col items-center justify-center p-6 text-center">
                            <Lock className="h-16 w-16 text-gold-500 mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Acesso Restrito</h2>
                            <p className="text-gray-300 mb-6 max-w-lg">
                              Faça login para acessar o Scanner MTM V3.4 e descobrir oportunidades de mercado em tempo
                              real.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button
                                onClick={() => router.push("/member-area")}
                                className="bg-gold-600 hover:bg-gold-700 text-black"
                              >
                                Fazer Login
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => router.push("/scanner-access")}
                                className="border-gold-500 text-gold-400 hover:bg-gold-500/10"
                              >
                                Saber Mais
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <button
                          onClick={() => setShowDetails(!showDetails)}
                          className="flex items-center text-gold-400 hover:text-gold-500 transition-colors"
                        >
                          <span className="mr-1">Informações do Scanner</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
                        </button>
                        {isAuthenticated && (
                          <div className="flex items-center">
                            <Unlock className="h-4 w-4 mr-1 text-green-500" />
                            <span className="text-green-500 text-sm">Acesso Ativo</span>
                          </div>
                        )}
                      </CardFooter>
                    </Card>

                    {showDetails && (
                      <div className="mt-6">
                        <ScannerInfo />
                      </div>
                    )}
                  </div>

                  <div>
                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Zap className="h-5 w-5 text-gold-500 mr-2" />
                          Benefícios do Scanner
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-gold-500 text-sm">1</span>
                            </div>
                            <div>
                              <span className="font-medium">Identificação de Padrões</span>
                              <p className="text-sm text-gray-400">
                                Reconhecimento automático de estruturas de mercado e padrões de alta probabilidade.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-gold-500 text-sm">2</span>
                            </div>
                            <div>
                              <span className="font-medium">Múltiplos Mercados</span>
                              <p className="text-sm text-gray-400">
                                Análise simultânea de diversos pares de moedas, criptomoedas e outros ativos
                                financeiros.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-gold-500 text-sm">3</span>
                            </div>
                            <div>
                              <span className="font-medium">Alertas em Tempo Real</span>
                              <p className="text-sm text-gray-400">
                                Notificações instantâneas sobre oportunidades de entrada e saída de acordo com sua
                                estratégia.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-gold-500 text-sm">4</span>
                            </div>
                            <div>
                              <span className="font-medium">Gestão de Risco</span>
                              <p className="text-sm text-gray-400">
                                Sugestões de stop loss e take profit baseadas em níveis importantes do mercado.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        {!isAuthenticated && (
                          <Button
                            onClick={() => router.push("/scanner-access")}
                            className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                          >
                            Obter Acesso ao Scanner
                          </Button>
                        )}
                      </CardFooter>
                    </Card>

                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <MessageSquare className="h-5 w-5 text-gold-500 mr-2" />
                          Ideias de Trading
                        </CardTitle>
                        <CardDescription>Acesse análises e ideias de trading dos nossos especialistas.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-md hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                <DollarSign className="h-4 w-4 text-blue-400" />
                              </div>
                              <span>Ideias Forex</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setActiveTab("forex")}
                              className="h-8 px-2 text-gold-400 hover:text-gold-500 hover:bg-gold-500/10"
                            >
                              Ver <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-md hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                <CandlestickChart className="h-4 w-4 text-purple-400" />
                              </div>
                              <span>Ideias Cripto</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setActiveTab("crypto")}
                              className="h-8 px-2 text-gold-400 hover:text-gold-500 hover:bg-gold-500/10"
                            >
                              Ver <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-md hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                                <Timer className="h-4 w-4 text-green-400" />
                              </div>
                              <span>TAPTOTRADE</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setActiveTab("taptotrade")}
                              className="h-8 px-2 text-gold-400 hover:text-gold-500 hover:bg-gold-500/10"
                            >
                              Ver <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-md hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                                <MessageSquare className="h-4 w-4 text-teal-400" />
                              </div>
                              <span>Canal VIP Telegram</span>
                            </div>
                            <Link href="/trading-ideas">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2 text-gold-400 hover:text-gold-500 hover:bg-gold-500/10"
                              >
                                Ver <ArrowRight className="h-3.5 w-3.5 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href="/trading-ideas" className="w-full">
                          <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                            Ver Todas as Ideias de Trading
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="forex">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">EUR/USD: Zona de Suporte</CardTitle>
                        <div className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400 font-medium">
                          Premium
                        </div>
                      </div>
                      <CardDescription>
                        Análise técnica mostrando uma potencial reversão em zona de suporte importante
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full bg-gray-900 mb-4 rounded-md overflow-hidden">
                        <img
                          src="/placeholder.svg?key=79ymk"
                          alt="EUR/USD Chart Analysis"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Suporte:</span>
                          <span className="font-medium">1.0850</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Resistência:</span>
                          <span className="font-medium">1.0980</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Direção:</span>
                          <span className="text-green-500 font-medium">Compra</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/trading-ideas" className="w-full">
                        <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                          Ver Análise Completa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">GBP/JPY: Venda em Resistência</CardTitle>
                        <div className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400 font-medium">
                          Premium
                        </div>
                      </div>
                      <CardDescription>
                        Par atingiu zona de resistência forte e mostra sinais de reversão
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full bg-gray-900 mb-4 rounded-md overflow-hidden">
                        <img
                          src="/placeholder.svg?key=iris0"
                          alt="GBP/JPY Chart Analysis"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Resistência:</span>
                          <span className="font-medium">168.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Suporte:</span>
                          <span className="font-medium">167.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Direção:</span>
                          <span className="text-red-500 font-medium">Venda</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/trading-ideas" className="w-full">
                        <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                          Ver Análise Completa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">USD/CAD: Range Semanal</CardTitle>
                        <div className="px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400 font-medium">
                          Gratuito
                        </div>
                      </div>
                      <CardDescription>Análise do range semanal e potenciais pontos de entrada</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full bg-gray-900 mb-4 rounded-md overflow-hidden">
                        <img
                          src="/placeholder.svg?key=dh1nl"
                          alt="USD/CAD Chart Analysis"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Topo do Range:</span>
                          <span className="font-medium">1.3650</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Base do Range:</span>
                          <span className="font-medium">1.3450</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Estratégia:</span>
                          <span className="text-gray-300 font-medium">Range Trading</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/trading-ideas" className="w-full">
                        <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                          Ver Análise Completa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <div className="md:col-span-2 lg:col-span-3">
                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Canal MoreThanMoney VIP Telegram</CardTitle>
                        <CardDescription>
                          Acesse nosso canal VIP no Telegram para receber sinais e análises em tempo real.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/2">
                          <img
                            src="/placeholder-n3ehu.png"
                            alt="Telegram Channel Preview"
                            className="w-full h-auto rounded-lg border border-gray-700"
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                          <h3 className="text-xl font-bold">Benefícios do Canal VIP</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Sinais de trading diários para Forex e Criptomoedas</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Análises técnicas detalhadas com gráficos</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Atualizações em tempo real sobre o mercado</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Acesso a webinars exclusivos e sessões ao vivo</span>
                            </li>
                          </ul>
                          <div className="pt-4">
                            <Link href="https://t.me/+2XMn1YEjfjYwYTE0" target="_blank" rel="noopener noreferrer">
                              <Button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Juntar-se ao Canal VIP
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crypto">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">Bitcoin: Consolidação</CardTitle>
                        <div className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400 font-medium">
                          Premium
                        </div>
                      </div>
                      <CardDescription>
                        BTC/USD formando base para possível movimento de alta nos próximos dias
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full bg-gray-900 mb-4 rounded-md overflow-hidden">
                        <img
                          src="/bitcoin-chart-analysis.png"
                          alt="Bitcoin Chart Analysis"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Suporte:</span>
                          <span className="font-medium">$26,800</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Resistência:</span>
                          <span className="font-medium">$28,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Direção:</span>
                          <span className="text-green-500 font-medium">Compra</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/trading-ideas" className="w-full">
                        <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                          Ver Análise Completa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">Ethereum: Próximo Upgrade</CardTitle>
                        <div className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400 font-medium">
                          Premium
                        </div>
                      </div>
                      <CardDescription>ETH mostrando força antes do próximo upgrade de rede</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full bg-gray-900 mb-4 rounded-md overflow-hidden">
                        <img
                          src="/placeholder-st2bf.png"
                          alt="Ethereum Chart Analysis"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Suporte:</span>
                          <span className="font-medium">$1,850</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Resistência:</span>
                          <span className="font-medium">$2,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Potencial:</span>
                          <span className="text-green-500 font-medium">+15-20%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/trading-ideas" className="w-full">
                        <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                          Ver Análise Completa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">Solana: Recuperação</CardTitle>
                        <div className="px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400 font-medium">
                          Gratuito
                        </div>
                      </div>
                      <CardDescription>SOL mostrando sinais de recuperação após queda recente</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full bg-gray-900 mb-4 rounded-md overflow-hidden">
                        <img
                          src="/placeholder-5nvcu.png"
                          alt="Solana Chart Analysis"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Suporte:</span>
                          <span className="font-medium">$20.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Resistência:</span>
                          <span className="font-medium">$24.80</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Potencial:</span>
                          <span className="text-green-500 font-medium">+15-20%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/trading-ideas" className="w-full">
                        <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                          Ver Análise Completa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <div className="md:col-span-2 lg:col-span-3">
                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Canal MoreThanMoney VIP Telegram</CardTitle>
                        <CardDescription>
                          Acesse nosso canal VIP no Telegram para receber sinais e análises em tempo real.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/2">
                          <img
                            src="/placeholder-qkacd.png"
                            alt="Telegram Channel Preview"
                            className="w-full h-auto rounded-lg border border-gray-700"
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                          <h3 className="text-xl font-bold">Benefícios do Canal VIP</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Sinais de trading diários para Forex e Criptomoedas</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Análises técnicas detalhadas com gráficos</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Atualizações em tempo real sobre o mercado</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-gold-500 text-xs">✓</span>
                              </div>
                              <span>Acesso a webinars exclusivos e sessões ao vivo</span>
                            </li>
                          </ul>
                          <div className="pt-4">
                            <Link href="https://t.me/+2XMn1YEjfjYwYTE0" target="_blank" rel="noopener noreferrer">
                              <Button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Juntar-se ao Canal VIP
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="taptotrade">
                <div className="space-y-6">
                  <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
                      TAPTOTRADE - Sinais em 2 Minutos
                    </h2>
                    <p className="text-lg text-gray-300 mt-2">
                      Aceite sinais de trading específicos em apenas 2 minutos e maximize suas oportunidades de mercado.
                    </p>
                    <div className="flex items-center justify-center mt-4">
                      <Timer className="h-5 w-5 text-gold-500 mr-2" />
                      <span className="text-gold-500 text-sm font-medium">Sinais disponíveis por tempo limitado</span>
                    </div>
                  </div>

                  {showAcceptedMessage && (
                    <div className="fixed top-4 right-4 z-50 bg-green-600 text-white p-4 rounded-md shadow-lg flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Sinal aceito com sucesso! A ordem foi enviada para seu MetaTrader.
                    </div>
                  )}

                  <TapToTradeWidget onAccept={handleTradeAccept} />

                  <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Como Funciona o TAPTOTRADE?</CardTitle>
                      <CardDescription>
                        Aceite sinais de trading profissionais com apenas um clique e execute-os diretamente na sua
                        conta.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-1/2">
                        <img
                          src="/placeholder-jugwm.png"
                          alt="TAPTOTRADE Workflow"
                          className="w-full h-auto rounded-lg border border-gray-700"
                        />
                      </div>
                      <div className="w-full md:w-1/2 space-y-6">
                        <h3 className="text-xl font-bold">Três Passos Simples</h3>
                        <ol className="space-y-4">
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gold-500 flex items-center justify-center mr-3 mt-0.5 text-black font-bold">
                              1
                            </div>
                            <div>
                              <span className="font-medium">Receba o Sinal</span>
                              <p className="text-sm text-gray-400">
                                Nossa equipe de analistas profissionais identifica oportunidades de alta probabilidade e
                                envia alertas em tempo real.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gold-500 flex items-center justify-center mr-3 mt-0.5 text-black font-bold">
                              2
                            </div>
                            <div>
                              <span className="font-medium">Aceite em 2 Minutos</span>
                              <p className="text-sm text-gray-400">
                                Você tem apenas 2 minutos para aceitar o sinal. Isso garante que você entre no mercado
                                no momento ideal.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gold-500 flex items-center justify-center mr-3 mt-0.5 text-black font-bold">
                              3
                            </div>
                            <div>
                              <span className="font-medium">Execução Automática</span>
                              <p className="text-sm text-gray-400">
                                O sinal é executado automaticamente na sua conta de trading via nossa integração com
                                MetaTrader.
                              </p>
                            </div>
                          </li>
                        </ol>
                        <div className="pt-4">
                          <Button
                            className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                            onClick={() => router.push("/scanner-access")}
                          >
                            Ativar TAPTOTRADE na Minha Conta
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-gold-500 mr-2" />
                          Taxa de Sucesso
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-5xl font-bold text-gold-500 mb-2">72%</div>
                        <p className="text-gray-400">
                          Taxa média de sucesso dos sinais TAPTOTRADE nos últimos 3 meses.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CandlestickChart className="h-5 w-5 text-gold-500 mr-2" />
                          Sinais por Semana
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-5xl font-bold text-gold-500 mb-2">15-20</div>
                        <p className="text-gray-400">
                          Média de sinais TAPTOTRADE enviados semanalmente para nossas contas VIP.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <DollarSign className="h-5 w-5 text-gold-500 mr-2" />
                          Retorno Médio
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-5xl font-bold text-gold-500 mb-2">+8.5%</div>
                        <p className="text-gray-400">
                          Retorno médio mensal baseado em tamanho de posição padrão de 2%.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </MembershipRequired>
      ) : (
        <div className="text-center p-8 bg-black/50 rounded-lg border border-gold-500/30">
          <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
          <p className="mb-6">
            Para acessar o Scanner MTM completo, você precisa estar logado e ter uma assinatura ativa.
          </p>
          <Button onClick={handleAccessClick} className="bg-gold-600 hover:bg-gold-700 text-black font-medium">
            Obter Acesso
          </Button>
        </div>
      )}
    </div>
  )
}
