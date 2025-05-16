"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { BuyButton } from "@/components/buy-button"

export default function ScannerPricing() {
  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Planos de Acesso ao Scanner MTM
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Escolha o plano que melhor se adapta às suas necessidades de trading e comece a identificar oportunidades de
            mercado com precisão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Anual */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center">Licença Anual</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">€200</span>
                <span className="text-gray-400 ml-2">/ano</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso ao Scanner MTM V3.4 por 12 meses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Atualizações gratuitas durante o período</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Suporte técnico prioritário</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso ao grupo exclusivo de traders</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Webinars mensais de estratégias</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <BuyButton
                productType="scanner"
                productName="Scanner MTM - Licença Anual"
                productPrice={200}
                duration="Anual"
                className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
              />
            </CardFooter>
          </Card>

          {/* Plano Vitalício */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold-500 text-black px-4 py-1 text-sm font-bold">RECOMENDADO</div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center">Licença Vitalícia</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">€1000</span>
                <span className="text-gray-400 ml-2">/único</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso vitalício ao Scanner MTM V3.4</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Todas as atualizações futuras incluídas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Suporte técnico VIP</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso ao grupo exclusivo de traders</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Webinars mensais de estratégias</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Consulta personalizada de trading (1 hora)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <BuyButton
                productType="scanner"
                productName="Scanner MTM - Licença Vitalícia"
                productPrice={1000}
                duration="Vitalícia"
                className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
