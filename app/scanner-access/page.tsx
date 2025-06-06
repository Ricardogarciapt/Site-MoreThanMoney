import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import TradingViewWidget from "@/components/trading-view-widget"
import { MembershipRequired } from "@/components/membership-required"

export default function ScannerAccessPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-gold-500">Scanner MTM V3.4</h1>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <div className="bg-gray-900 rounded-lg border border-gold-500/30 p-4 mb-8">
                <h2 className="text-2xl font-semibold text-gold-500 mb-4">Scanners MoreThanMoney</h2>
                <MembershipRequired>
                  <TradingViewWidget scannerType="scanner1" />
                </MembershipRequired>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-900 rounded-lg border border-gold-500/30 p-6">
            <h2 className="text-2xl font-semibold text-gold-500 mb-6">Descrição Detalhada</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                Os Scanners MoreThanMoney são um conjunto avançado de algoritmos de análise de mercado por IA,
                primorando os scanners proprietários MTM Gold Killer e MTM Scanner, entre outros que implementam
                diversas estratégias de trading profissionais.
              </p>

              <h3 className="text-xl font-medium text-gold-400 mt-6 mb-3">Estratégias Implementadas:</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                  <strong className="text-gold-300">Key Level - Goldenzone:</strong> Identificação automática de zonas
                  douradas e níveis-chave críticos do mercado.
                </li>
                <li>
                  <strong className="text-gold-300">Suporte e Resistência - SR MTM:</strong> Algoritmo proprietário para
                  detecção precisa de níveis de suporte e resistência dinâmicos.
                </li>
                <li>
                  <strong className="text-gold-300">Momentum de Mercado:</strong> Análise avançada do momentum para
                  identificar mudanças de direção e força do movimento.
                </li>
                <li>
                  <strong className="text-gold-300">Price Trap:</strong> Estratégia que segue o preço num determinado
                  range, identificando armadilhas de preço e breakouts falsos.
                </li>
                <li>
                  <strong className="text-gold-300">Conceitos de Smart Money:</strong> Implementação de lógica
                  institucional para seguir o dinheiro inteligente do mercado.
                </li>
                <li>
                  <strong className="text-gold-300">Exaustão de Tendência - KillShot:</strong> Algoritmo especializado
                  em detectar pontos de exaustão e reversão de tendências.
                </li>
              </ul>

              <p className="mb-6">
                Estas estratégias são aplicadas através de várias metodologias de trading, proporcionando uma análise
                completa e multidimensional do mercado financeiro.
              </p>

              <h3 className="text-xl font-medium text-gold-400 mt-6 mb-3">Funcionalidades Avançadas:</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                  <strong className="text-gold-300">Estruturas de Mercado:</strong> Identifica automaticamente níveis de
                  suporte e resistência baseados no comportamento histórico do preço.
                </li>
                <li>
                  <strong className="text-gold-300">Análise de Volatilidade:</strong> Utiliza o ATR (Average True Range)
                  para ajustar os sinais de acordo com a volatilidade atual do mercado.
                </li>
                <li>
                  <strong className="text-gold-300">Filtros de Tendência:</strong> Incorpora filtros para evitar sinais
                  contra a tendência dominante, aumentando a taxa de acerto.
                </li>
                <li>
                  <strong className="text-gold-300">Múltiplos Timeframes:</strong> Funciona em diversos timeframes,
                  desde gráficos de 5 minutos até diários.
                </li>
                <li>
                  <strong className="text-gold-300">Alertas Personalizáveis:</strong> Configure alertas para ser
                  notificado quando surgir uma nova oportunidade de trading.
                </li>
              </ul>

              <h3 className="text-xl font-medium text-gold-400 mt-6 mb-3">Configurações Recomendadas:</h3>
              <p className="mb-4">
                Para resultados ideais, recomendamos utilizar o indicador nos timeframes de 15 minutos a 4 horas. As
                configurações padrão são otimizadas para a maioria dos ativos, mas podem ser ajustadas de acordo com seu
                estilo de trading e o ativo específico.
              </p>

              <h3 className="text-xl font-medium text-gold-400 mt-6 mb-3">Requisitos:</h3>
              <p className="mb-4">
                Para acessar todas as funcionalidades do Scanner MTM V3.4, é necessário ser membro da plataforma
                MoreThanMoney. Os membros têm acesso exclusivo a atualizações, suporte técnico e materiais educacionais
                relacionados ao uso do indicador.
              </p>
            </div>
          </div>
        </div>
      </main>
    </AuthProvider>
  )
}
