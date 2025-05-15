"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginModal } from "./login-modal"

const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "R$ 97/mês",
    description: "Ideal para iniciantes que desejam começar no copytrading",
    features: [
      "Copie até 2 traders profissionais",
      "Acesso a traders com rentabilidade de até 5% ao mês",
      "Suporte por email",
      "Relatórios mensais de desempenho",
    ],
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 197/mês",
    description: "Para traders que buscam resultados consistentes",
    features: [
      "Copie até 5 traders profissionais",
      "Acesso a traders com rentabilidade de até 10% ao mês",
      "Suporte prioritário",
      "Relatórios semanais de desempenho",
      "Webinars exclusivos mensais",
    ],
    recommended: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "R$ 497/mês",
    description: "Para traders experientes que buscam máxima rentabilidade",
    features: [
      "Copie até 10 traders profissionais",
      "Acesso a traders com rentabilidade acima de 15% ao mês",
      "Suporte VIP 24/7",
      "Relatórios diários de desempenho",
      "Webinars exclusivos semanais",
      "Consultoria individual mensal",
      "Acesso antecipado a novos traders",
    ],
    recommended: false,
  },
]

export function CopytradingPlans() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handlePlanSelection = (planId: string) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true)
      return
    }

    // Se autenticado, redireciona para a área de membro com a aba de copytrading selecionada
    router.push("/member-area?tab=copytrading&plan=" + planId)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`border ${
              plan.recommended
                ? "border-purple-500 bg-gradient-to-b from-gray-800 to-gray-900"
                : "border-gray-700 bg-gray-800"
            } text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300`}
          >
            {plan.recommended && (
              <div className="bg-purple-600 text-white text-center py-1 text-sm font-medium">RECOMENDADO</div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-gray-300">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">{plan.price}</div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <button
                onClick={() => handlePlanSelection(plan.id)}
                className={`w-full py-2 rounded-md font-medium transition-colors ${
                  plan.recommended
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                Selecionar Plano
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Como funciona o Copytrading?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-purple-500 text-4xl font-bold mb-4">01</div>
            <h3 className="text-xl font-semibold mb-2">Escolha seu plano</h3>
            <p className="text-gray-300">
              Selecione o plano que melhor se adapta às suas necessidades e objetivos financeiros.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-purple-500 text-4xl font-bold mb-4">02</div>
            <h3 className="text-xl font-semibold mb-2">Configure sua conta</h3>
            <p className="text-gray-300">
              Conecte sua conta de corretora e configure os parâmetros de risco de acordo com seu perfil.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-purple-500 text-4xl font-bold mb-4">03</div>
            <h3 className="text-xl font-semibold mb-2">Lucre automaticamente</h3>
            <p className="text-gray-300">
              Relaxe enquanto nossos traders profissionais operam e suas operações são copiadas automaticamente.
            </p>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
