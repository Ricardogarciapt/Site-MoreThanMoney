"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { BuyButton } from "@/components/buy-button"

export default function CopytradingPlans() {
  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Planos de Copytrading MTM
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Escolha o plano que melhor se adapta às suas necessidades e comece a copiar nossas operações
            automaticamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plano Básico */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center">Plano Básico</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">5%</span>
                <span className="text-gray-400 ml-2">/mensal</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-center text-gray-300 mb-4">Ideal para quem está começando no mundo do copytrading</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Copytrading automático 24/7</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso ao sistema Tap to Trade</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Suporte técnico básico</span>
                </li>
                <li className="flex items-start font-semibold text-gold-400">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Depósito mínimo: 500€</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <BuyButton
                productType="copytrading"
                productName="Copytrading - Plano Básico"
                productPrice={100}
                duration="Mensal"
                className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
              />
            </CardFooter>
          </Card>

          {/* Plano Premium */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold-500 text-black px-4 py-1 text-sm font-bold">POPULAR</div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center">Plano Premium</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">30%</span>
                <span className="text-gray-400 ml-2">/mensal</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-center text-gray-300 mb-4">Nossa opção mais popular com o melhor custo-benefício</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Todas as vantagens do plano básico</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Gestão de risco personalizada</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso a estratégias avançadas</span>
                </li>
                <li className="flex items-start font-semibold text-gold-400">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Depósito mínimo: 350€</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <BuyButton
                productType="copytrading"
                productName="Copytrading - Plano Avançado"
                productPrice={200}
                duration="Mensal"
                className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
              />
            </CardFooter>
          </Card>

          {/* Plano VIP */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center">Plano VIP</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">VIP</span>
                <span className="text-gray-400 ml-2">/customizado</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-center text-gray-300 mb-4">Experiência exclusiva com atendimento VIP personalizado</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Todas as vantagens dos outros planos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Mentoria individual mensal</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Estratégias exclusivas de alto retorno</span>
                </li>
                <li className="flex items-start font-semibold text-gold-400">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Depósito mínimo: 1000€</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <BuyButton
                productType="copytrading"
                productName="Copytrading - Plano Profissional"
                productPrice={500}
                duration="Mensal"
                className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
