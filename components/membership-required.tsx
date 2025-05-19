"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, ChevronRight, BarChart2, Briefcase, TrendingUp } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import LoginModal from "@/components/login-modal"

// Portfólios da MoreThanMoney baseados no Notion
const portfolios = [
  {
    name: "Portfólio de Criptomoedas",
    type: "Cripto",
    allocation: [
      { asset: "Bitcoin (BTC)", percentage: 40, trend: "up" },
      { asset: "Ethereum (ETH)", percentage: 30, trend: "up" },
      { asset: "Solana (SOL)", percentage: 15, trend: "up" },
      { asset: "Chainlink (LINK)", percentage: 10, trend: "neutral" },
      { asset: "Cardano (ADA)", percentage: 5, trend: "down" },
    ],
    riskLevel: "Moderado-Alto",
    description:
      "Portfólio focado nas principais criptomoedas com maior capitalização de mercado e potencial de crescimento a longo prazo.",
    lastUpdated: "15 de Maio, 2023",
  },
  {
    name: "Portfólio de Ações",
    type: "Stocks",
    allocation: [
      { asset: "Apple (AAPL)", percentage: 25, trend: "up" },
      { asset: "Microsoft (MSFT)", percentage: 20, trend: "up" },
      { asset: "Amazon (AMZN)", percentage: 15, trend: "neutral" },
      { asset: "Tesla (TSLA)", percentage: 10, trend: "down" },
      { asset: "Nvidia (NVDA)", percentage: 30, trend: "up" },
    ],
    riskLevel: "Moderado",
    description:
      "Portfólio concentrado em empresas de tecnologia com forte posição de mercado e potencial de crescimento consistente.",
    lastUpdated: "15 de Maio, 2023",
  },
  {
    name: "Portfólio Balanceado",
    type: "Misto",
    allocation: [
      { asset: "Ações (Stocks)", percentage: 40, trend: "up" },
      { asset: "Criptomoedas", percentage: 30, trend: "up" },
      { asset: "ETFs", percentage: 20, trend: "neutral" },
      { asset: "Stablecoins", percentage: 10, trend: "neutral" },
    ],
    riskLevel: "Moderado",
    description:
      "Portfólio diversificado entre diferentes classes de ativos, oferecendo uma abordagem equilibrada de risco e retorno.",
    lastUpdated: "15 de Maio, 2023",
  },
]

export function MembershipRequired({ children }: { children?: React.ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  // Usar useEffect para garantir que estamos no lado do cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Não renderizar nada durante o carregamento inicial ou se estivermos no servidor
  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <div className="animate-pulse">
          <div className="h-24 w-24 rounded-full bg-amber-500/20 mb-6"></div>
          <div className="h-8 w-60 bg-amber-500/20 mb-4 rounded"></div>
          <div className="h-4 w-80 bg-amber-500/20 mb-2 rounded"></div>
          <div className="h-4 w-72 bg-amber-500/20 mb-6 rounded"></div>
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-amber-500/20 rounded"></div>
            <div className="h-10 w-32 bg-amber-500/20 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Se autenticado, renderizar o componente filho ou o conteúdo padrão de portfólios
  if (isAuthenticated) {
    if (children) {
      return <>{children}</>
    }

    return (
      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-amber-500">Portfólios de Investimento MoreThanMoney</h1>

          <div className="mb-8">
            <p className="text-lg mb-4">
              Nossos portfólios são cuidadosamente elaborados e atualizados semanalmente pelos especialistas da
              MoreThanMoney, com base em análises aprofundadas de mercado e tendências globais.
            </p>
            <p className="text-gray-300 mb-6">
              Escolha um dos nossos portfólios modelos abaixo ou use-os como referência para suas próprias estratégias
              de investimento. As alocações são atualizadas toda semana para refletir as condições atuais do mercado.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="inline-flex items-center text-sm px-3 py-1 rounded bg-amber-500/20 text-amber-500">
                <TrendingUp className="w-4 h-4 mr-1" /> Atualização Semanal
              </span>
              <span className="inline-flex items-center text-sm px-3 py-1 rounded bg-amber-500/20 text-amber-500">
                <Briefcase className="w-4 h-4 mr-1" /> Gerenciado por Profissionais
              </span>
              <span className="inline-flex items-center text-sm px-3 py-1 rounded bg-amber-500/20 text-amber-500">
                <BarChart2 className="w-4 h-4 mr-1" /> Desempenho Monitorado
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-amber-500/20 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all"
              >
                <div className="bg-gradient-to-r from-amber-900/50 to-black p-4">
                  <h3 className="text-xl font-bold text-amber-500 mb-1">{portfolio.name}</h3>
                  <span className="inline-block text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400">
                    {portfolio.type}
                  </span>
                  <span className="inline-block ml-2 text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-300">
                    Risco: {portfolio.riskLevel}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-4">{portfolio.description}</p>

                  <h4 className="text-sm font-semibold mb-3 text-amber-400">Alocação Atual:</h4>
                  <ul className="space-y-2 mb-4">
                    {portfolio.allocation.map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          {item.trend === "up" && <span className="text-green-500 mr-1">↑</span>}
                          {item.trend === "down" && <span className="text-red-500 mr-1">↓</span>}
                          {item.trend === "neutral" && <span className="text-gray-400 mr-1">→</span>}
                          {item.asset}
                        </span>
                        <span className="font-mono text-gray-400">{item.percentage}%</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-400 flex justify-between items-center">
                    <span>Última atualização: {portfolio.lastUpdated}</span>
                    <button className="text-amber-500 hover:text-amber-400 inline-flex items-center">
                      Detalhes <ChevronRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              <strong className="text-amber-500">Importante:</strong> Estes portfólios são apenas sugestões de
              investimento e não constituem aconselhamento financeiro personalizado. Invista de acordo com seu perfil de
              risco e objetivos financeiros.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Se não estiver autenticado, mostrar tela de login
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-amber-500">
          <Lock className="h-12 w-12 text-amber-500" />
        </div>
        <h1 className="mb-2 text-center text-3xl font-bold text-amber-500">Acesso Restrito</h1>
        <p className="mb-6 max-w-md text-center text-gray-300">
          Esta área é exclusiva para membros da plataforma MoreThanMoney. Faça login ou torne-se um membro para acessar
          os portfólios de investimento exclusivos.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowLoginModal(true)}
            className="rounded bg-amber-500 px-6 py-2 font-semibold text-black transition hover:bg-amber-600"
          >
            Fazer Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="rounded border border-amber-500 px-6 py-2 font-semibold text-amber-500 transition hover:bg-amber-500/10"
          >
            Registrar-se
          </button>
        </div>
      </div>

      {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}
    </div>
  )
}

// Mantendo a exportação padrão para compatibilidade com código existente
export default MembershipRequired
