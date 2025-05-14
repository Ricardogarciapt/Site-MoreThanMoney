import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Check, ExternalLink, Zap } from "lucide-react"

export default function ScannerSection() {
  return (
    <section id="scanner" className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-gold-500/20 text-gold-400 hover:bg-gold-500/20 border-gold-500/50">
            Scanner IA
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Scanner MoreThanMoney
          </h2>
          <p className="text-gray-300 text-lg">
            Analisa o mercado 24/7 e envia sinais com lógica algorítmica. Integração completa com TradingView.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-gold-500" />
              </div>

              <h3 className="text-2xl font-bold mb-4">Licença Anual</h3>
              <div className="text-4xl font-bold text-gold-400 mb-6">€200</div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Análise de mercado 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Integração com TradingView</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Aulas de configuração</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Comunidade de suporte</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Atualizações durante 1 ano</span>
                </li>
              </ul>

              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                  Comprar Licença Anual <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-gold-500" />
              </div>

              <h3 className="text-2xl font-bold mb-4">Licença Vitalícia</h3>
              <div className="text-4xl font-bold text-gold-400 mb-6">€1000</div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Análise de mercado 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Integração com TradingView</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Aulas de configuração avançada</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suporte prioritário</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Atualizações vitalícias</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Acesso a recursos exclusivos</span>
                </li>
              </ul>

              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                  Comprar Licença Vitalícia <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-12 bg-black/50 border border-gold-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
              <Brain className="h-5 w-5 text-gold-500" />
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Sobre o Scanner MTM</h4>
              <p className="text-gray-300 mb-4">
                O Scanner MTM é uma ferramenta exclusiva desenvolvida pela MoreThanMoney que utiliza inteligência
                artificial para analisar o mercado 24/7 e identificar oportunidades de trading com alta probabilidade de
                sucesso.
              </p>
              <p className="text-gray-300">
                Com o Scanner MTM, você terá acesso a sinais precisos, análises detalhadas e alertas em tempo real, tudo
                integrado diretamente ao TradingView para facilitar sua operação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
