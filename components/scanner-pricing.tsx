"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/shopping-cart"
import { toast } from "sonner"

type ScannerPricingProps = {}

const ScannerPricing: React.FC<ScannerPricingProps> = () => {
  const { addItem } = useCart()

  const handleAddToCart = (productId: string, name: string, price: number, type: string) => {
    addItem({
      id: productId,
      name: name,
      price: price,
      quantity: 1,
      type: type,
      details: {
        duration: type.includes("annual") ? "12 meses" : type.includes("monthly") ? "1 mês" : "Vitalício",
        packageId: productId,
      },
    })
    toast.success(`${name} adicionado ao carrinho!`)
  }

  const scannerPlans = [
    {
      id: "scanner-basic",
      name: "Scanner Básico",
      price: 35,
      period: "mês",
      popular: false,
      description: "Ideal para iniciantes que querem começar com análise técnica",
      features: [
        "Algoritmos básicos de IA",
        "Acesso via convite",
        "Alertas por email",
        "Suporte por email",
        "1 mercado (Forex)",
        "Análise de tendência básica",
      ],
      gradient: "from-blue-600 to-blue-800",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "scanner-pro",
      name: "Scanner Pro",
      price: 200,
      period: "ano",
      popular: true,
      description: "A escolha mais popular para traders experientes",
      features: [
        "Algoritmos avançados de IA",
        "Momentum de mercado",
        "Price trap detection",
        "Conceitos Smart Money",
        "Alertas em tempo real",
        "Suporte prioritário",
        "Múltiplos mercados",
        "Backtesting avançado",
      ],
      gradient: "from-gold-600 to-gold-800",
      buttonColor: "bg-gold-600 hover:bg-gold-700",
      lifetimeOption: {
        id: "scanner-pro-lifetime",
        price: 1000,
        name: "Scanner Pro - Vitalício",
      },
    },
    {
      id: "scanner-elite",
      name: "Scanner Elite",
      price: 1299,
      period: "único",
      popular: false,
      description: "Solução completa para traders profissionais",
      features: [
        "Acesso a todas as estratégias",
        "IA de última geração",
        "Análise multi-timeframe",
        "Coaching 1:1 incluído",
        "20 aulas anuais (após 1º ano)",
        "Evento trimestral presencial",
        "Suporte VIP 24/7",
        "Renovação: €200/ano (após 1º ano)",
      ],
      gradient: "from-purple-600 to-purple-800",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      renewalInfo: "Renovação de aprendizagem: €200/ano após primeiro ano",
    },
  ]

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Licenças dos Scanners MoreThanMoney</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Escolha o plano ideal para suas necessidades de trading. Nossos scanners utilizam algoritmos proprietários
            de IA para análise de mercado avançada, incluindo estratégias como Goldenzone, SR MTM, Smart Money e
            KillShot.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {scannerPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-black/50 border-gray-800/50 backdrop-blur-xl hover:border-gold-500/50 transition-all duration-300 hover:scale-105 ${
                plan.popular ? "ring-2 ring-gold-500/50" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gold-600 text-black px-4 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}
                >
                  <span className="text-2xl font-bold text-white">{plan.name.charAt(0)}</span>
                </div>
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <p className="text-gray-400 mt-2">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gold-500">€{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                {plan.renewalInfo && <p className="text-sm text-gray-400 mt-2">{plan.renewalInfo}</p>}
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => handleAddToCart(plan.id, plan.name, plan.price, plan.period)}
                    className={`w-full ${plan.buttonColor} text-white font-semibold py-3 flex items-center justify-center gap-2`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Adquirir {plan.name}
                  </Button>

                  {plan.lifetimeOption && (
                    <Button
                      onClick={() =>
                        handleAddToCart(
                          plan.lifetimeOption.id,
                          plan.lifetimeOption.name,
                          plan.lifetimeOption.price,
                          "lifetime",
                        )
                      }
                      variant="outline"
                      className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10 py-3 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Opção Vitalícia - €{plan.lifetimeOption.price}
                    </Button>
                  )}
                </div>

                <div className="text-center pt-4">
                  <p className="text-xs text-gray-500">
                    ✅ 30 dias de garantia • ✅ Suporte incluído • ✅ Atualizações gratuitas
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Tecnologia Proprietária MoreThanMoney</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/30 p-6 rounded-lg border border-gray-800/50">
              <h4 className="text-gold-500 font-semibold mb-2">Algoritmos de IA</h4>
              <p className="text-gray-400 text-sm">
                Machine Learning avançado para análise de padrões e predição de movimentos
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-gray-800/50">
              <h4 className="text-gold-500 font-semibold mb-2">Estratégias Proprietárias</h4>
              <p className="text-gray-400 text-sm">
                Goldenzone, SR MTM, Smart Money, KillShot e outras estratégias exclusivas
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-gray-800/50">
              <h4 className="text-gold-500 font-semibold mb-2">Alertas Inteligentes</h4>
              <p className="text-gray-400 text-sm">
                Notificações em tempo real via email, SMS e Telegram com alta precisão
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-gray-800/50">
              <h4 className="text-gold-500 font-semibold mb-2">Suporte Dedicado</h4>
              <p className="text-gray-400 text-sm">Equipe especializada para ajudar você a maximizar seus resultados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScannerPricing
