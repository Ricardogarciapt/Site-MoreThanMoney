"use client"

import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, ShoppingCart } from "lucide-react"
import Link from "next/link"
import ScannerPricing from "@/components/scanner-pricing"
import { useCart } from "@/components/shopping-cart"
import { toast } from "sonner"

export default function ScannerPage() {
  const { addItem } = useCart()

  const handleAddToCart = (productId: string, name: string, price: number, type: string) => {
    addItem({
      id: productId,
      name: name,
      price: price,
      quantity: 1,
      type: type,
      details: {
        duration: type.includes("annual") ? "12 meses" : "Vitalício",
        packageId: productId,
      },
    })
    toast.success(`${name} adicionado ao carrinho!`)
  }

  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Scanner MoreThanMoneyTM – Acesso Exclusivo</h1>

          {/* Prévia do Scanner - MTM Gold Killer V2.1 */}
          <div className="mb-12 bg-black/50 p-6 rounded-lg border border-gold-500/30">
            <h2 className="text-2xl font-semibold text-gold-500 mb-4">Adquirir Scanner MTM Gold Killer - V2.1</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <img
                  src="https://www.tradingview.com/x/X7SREOsm/"
                  alt="Scanner MTM Gold Killer Preview"
                  className="w-full h-auto rounded-lg border border-gold-500/30 shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-medium text-gold-400 mb-3">
                  MTM Gold Killer V2.1 - Análise Técnica Avançada
                </h3>
                <p className="text-gray-300 mb-4">
                  Um indicador avançado que combina técnicas estatísticas robustas, filtros de suavização personalizados
                  e lógica de tendência baseada em SuperTrend para mapear oportunidades de trade com níveis de risco e
                  recompensa claramente definidos.
                </p>

                <h4 className="text-lg font-medium text-gold-400 mb-2">
                  <span className="mr-2">🧠</span> Principais Funcionalidades
                </h4>
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
                  <li>Fonte de preço personalizável (médias comuns ou versão suavizada)</li>
                  <li>Detecção de tendência com SuperTrend baseada em ATR</li>
                  <li>Alvo estatístico dinâmico com cálculos percentuais</li>
                  <li>Visualização multi-nível (até 5 níveis de alvo/drawdown)</li>
                  <li>Personalização avançada de parâmetros</li>
                </ul>

                <h4 className="text-lg font-medium text-gold-400 mb-2">
                  <span className="mr-2">📊</span> Visualização Gráfica
                </h4>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
                  <li>Linhas de alvo (verde) para projeções de ganhos</li>
                  <li>Linhas de drawdown (vermelho) para projeções de perdas</li>
                  <li>Linha central (cinza) para ponto de entrada</li>
                  <li>Análise estatística com média e desvio padrão</li>
                  <li>Preenchimento com cores suaves para visualização de distâncias</li>
                </ul>

                <div className="text-xs text-gray-400 italic mb-4">
                  <span className="mr-2">🔒</span> Este script faz parte da propriedade intelectual de RicardoGarciaPT e
                  da empresa MoreThanMoney, estando protegido por direitos autorais.
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <a
                    href="https://www.tradingview.com/script/fhpIupC5-MTM-Gold-Killer-V2-1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-500 hover:text-gold-400 underline inline-flex items-center"
                  >
                    Ver no TradingView
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() =>
                        handleAddToCart("mtm-gold-killer-annual", "MTM Gold Killer V2.1 - Anual", 150, "scanner-annual")
                      }
                      className="bg-gold-600 hover:bg-gold-700 text-black text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Adquirir Scanner - €150/ano
                    </Button>
                    <Button
                      onClick={() =>
                        handleAddToCart(
                          "mtm-gold-killer-lifetime",
                          "MTM Gold Killer V2.1 - Vitalício",
                          750,
                          "scanner-lifetime",
                        )
                      }
                      variant="outline"
                      className="border-gold-500 text-gold-400 hover:bg-gold-500/10 text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Vitalício - €750
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prévia do Scanner MTM V3.4 */}
          <div className="mb-12 bg-black/50 p-6 rounded-lg border border-gold-500/30">
            <h2 className="text-2xl font-semibold text-gold-500 mb-4">Adquirir Scanner MTM V3.4</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <img
                  src="https://www.tradingview.com/x/ZPM47fOg/"
                  alt="Scanner MTM Preview"
                  className="w-full h-auto rounded-lg border border-gold-500/30 shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-medium text-gold-400 mb-3">
                  MoreThanMoney Scanner V3.4 - Market structures and ATR
                </h3>
                <p className="text-gray-300 mb-4">
                  O Scanner MTM é uma ferramenta avançada que identifica estruturas de mercado e utiliza o ATR (Average
                  True Range) para fornecer sinais precisos de trading. Desenvolvido exclusivamente para membros
                  MoreThanMoney.
                </p>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Identificação de estruturas de mercado</li>
                  <li>Cálculo de ATR para gerenciamento de risco</li>
                  <li>Sinais de entrada e saída otimizados</li>
                  <li>Compatível com múltiplos timeframes</li>
                  <li>Atualizações regulares e suporte dedicado</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <a
                    href="https://www.tradingview.com/script/BtIDtpBs-MoreThanMoney-Scanner-V3-4-Market-structures-and-ATR/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-500 hover:text-gold-400 underline inline-flex items-center"
                  >
                    Ver no TradingView
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() =>
                        handleAddToCart("mtm-scanner-annual", "Scanner MTM V3.4 - Anual", 150, "scanner-annual")
                      }
                      className="bg-gold-600 hover:bg-gold-700 text-black text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Adquirir Scanner - €150/ano
                    </Button>
                    <Button
                      onClick={() =>
                        handleAddToCart("mtm-scanner-lifetime", "Scanner MTM V3.4 - Vitalício", 750, "scanner-lifetime")
                      }
                      variant="outline"
                      className="border-gold-500 text-gold-400 hover:bg-gold-500/10 text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Vitalício - €750
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Preços */}
          <ScannerPricing />

          {/* Seção de acesso restrito */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mt-12">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Lock className="h-16 w-16 text-gold-500" />
              </div>
              <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
              <CardDescription className="text-lg">
                Para acessar os scanners completos e ferramentas avançadas, você precisa ser um membro MoreThanMoney.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="max-w-lg mx-auto">
                <p className="text-gray-300 mb-6">
                  Faça login na área de membros para acessar o Scanner MTM V3.4 completo, análises em tempo real, ideias
                  de trading e muito mais.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/member-area">
                  <Button className="bg-gold-600 hover:bg-gold-700 text-black px-8 py-3">Abrir Scanner</Button>
                </Link>
                <Link href="/scanner-access">
                  <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10 px-8 py-3">
                    Saber Mais Sobre o Acesso
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthProvider>
  )
}
