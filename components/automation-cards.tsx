"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, TrendingUp, BarChart2, Zap, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function AutomationCards() {
  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Soluções de Automatização
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Maximiza os resultados com as nossas soluções de trading automatizado e ferramentas de análise avançada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Cartão 1 - Copytrading */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-gold-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Copytrading MTM</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-6">
                Copia automaticamente as operações dos nossos traders profissionais diretamente na tua conta.
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Operações 24/7 sem intervenção manual ou Opção Tap2Trade</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Gestão de risco personalizada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Compatível com MT4 e MT5</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/copytrading" className="w-full">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">
                  Configurar Copytrading <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Cartão 2 - Scanner MTM */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-gold-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Scanner MTM V3.4</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-6">
                Identifica estruturas de mercado e pontos de entrada com alta probabilidade de sucesso.
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Análise em tempo real de múltiplos pares</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Identificação automática de padrões</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Alertas de oportunidades de entrada mediante sinais visuais</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/scanner" className="w-full">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">
                  Acessar Scanner <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Cartão 3 - Sinais de Trading */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-gold-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Sinais de Trading</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-6">
                Receba sinais de trading precisos diretamente no seu dispositivo com nossa tecnologia Tap to Trade ou
                mesmo a area VIP.
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Notificações em tempo real</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Execução com um toque (Tap to Trade)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Análise detalhada de cada sinal</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/trading-ideas" className="w-full">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">
                  Ver Ideias <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Segunda linha de cartões */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {/* Cartão 4 - Portfólios */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold-500"
                >
                  <path d="M21 6H3"></path>
                  <path d="M10 12H3"></path>
                  <path d="M10 18H3"></path>
                  <path d="M17 12h4"></path>
                  <path d="M17 18h4"></path>
                  <path d="M19 10v8"></path>
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Portfólios Inteligentes</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-6">
                Acessa a portfólios diversificados criados pela equipa para diferentes perfis de investidor.
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Portfólios de Criptomoedas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Portfólios de ETFs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Portfólios de CFDs</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/portfolios" className="w-full">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">
                  Apenas para Membros MoreThanMoney <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Cartão 5 - Ideias dos Educadores */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-gold-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Ideias dos Educadores</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-6">
                Acompanha as análises e ideias de trading dos nossos educadores e especialistas de mercado.
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Análises técnicas detalhadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Ideias de trading semanais</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span>Canal Telegram VIP MoreThanMoney</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/automation/ideas" className="w-full">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">
                  Ver Ideias <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
