"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"

export default function CopytradingSetupPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Pequeno atraso para evitar flash de conteúdo durante a verificação de autenticação
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!isAuthenticated) {
        router.push("/")
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-gold-500">Carregando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Não renderiza nada enquanto redireciona
  }

  return (
    <>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border border-gold-500/30 rounded-lg p-6">
            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black border border-gold-500/30">
                <TabsTrigger value="plans" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                  Planos
                </TabsTrigger>
                <TabsTrigger value="config" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                  Configuração
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
                >
                  Portfólios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="plans" className="mt-6">
                <h2 className="text-4xl font-bold mb-6">Selecione seu plano</h2>
                <p className="text-xl mb-10">
                  Escolha o plano de copytrading que melhor se adapta às suas necessidades.
                </p>

                <div className="space-y-6">
                  {/* Plano Básico */}
                  <div
                    className={`border ${selectedPlan === "basic" ? "border-gold-500" : "border-gold-500/30"} 
                    rounded-lg p-6 cursor-pointer hover:border-gold-500 transition-all`}
                    onClick={() => setSelectedPlan("basic")}
                  >
                    <h3 className="text-2xl font-bold">Plano Básico</h3>
                    <p className="text-xl text-gray-400">5% mensal</p>
                    <p className="text-xl text-gold-500 font-semibold mt-2">Depósito: 500€</p>
                  </div>

                  {/* Plano Premium */}
                  <div
                    className={`border ${selectedPlan === "premium" ? "border-gold-500" : "border-gold-500/30"} 
                    rounded-lg p-6 cursor-pointer hover:border-gold-500 transition-all`}
                    onClick={() => setSelectedPlan("premium")}
                  >
                    <h3 className="text-2xl font-bold">Plano Premium</h3>
                    <p className="text-xl text-gray-400">30% mensal</p>
                    <p className="text-xl text-gold-500 font-semibold mt-2">Depósito: 350€</p>
                  </div>

                  {/* Plano VIP */}
                  <div
                    className={`border ${selectedPlan === "vip" ? "border-gold-500" : "border-gold-500/30"} 
                    rounded-lg p-6 cursor-pointer hover:border-gold-500 transition-all`}
                    onClick={() => setSelectedPlan("vip")}
                  >
                    <h3 className="text-2xl font-bold">Plano VIP</h3>
                    <p className="text-xl text-gray-400">Customizado</p>
                    <p className="text-xl text-gold-500 font-semibold mt-2">Depósito: 1000€+</p>
                  </div>
                </div>

                <button
                  className={`mt-8 w-full py-4 text-xl font-bold rounded-lg transition-all ${
                    selectedPlan
                      ? "bg-gold-500 text-black hover:bg-gold-600"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!selectedPlan}
                  onClick={() => document.querySelector('[data-value="config"]')?.click()}
                >
                  Continuar para Configuração →
                </button>
              </TabsContent>

              <TabsContent value="config" className="mt-6">
                <h2 className="text-4xl font-bold mb-6">Configuração</h2>
                <p className="text-xl mb-10">Configure os detalhes do seu plano de copytrading.</p>

                {/* Conteúdo de configuração - será implementado posteriormente */}
                <div className="border border-gold-500/30 rounded-lg p-6">
                  <p className="text-center text-xl">Configurações avançadas estarão disponíveis em breve.</p>
                  <p className="text-center text-gray-400 mt-4">
                    Nossa equipe entrará em contato para ajudar na configuração do seu plano.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <h2 className="text-4xl font-bold mb-6">Portfólios</h2>
                <p className="text-xl mb-10">Visualize e gerencie seus portfólios de copytrading.</p>

                {/* Conteúdo de portfólios - será implementado posteriormente */}
                <div className="border border-gold-500/30 rounded-lg p-6">
                  <p className="text-center text-xl">Seus portfólios aparecerão aqui após a ativação do seu plano.</p>
                  <p className="text-center text-gray-400 mt-4">
                    Você poderá acompanhar o desempenho de suas operações em tempo real.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  )
}
