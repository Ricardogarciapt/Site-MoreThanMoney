import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import { TapToTradePreview } from "@/components/tap-to-trade-preview"

export default function TapToTradePage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2 text-gold-500">TAP2TRADE MTM (Preview)</h1>
          <p className="text-gray-300 mb-8">
            Experimente nossa nova funcionalidade de sinais de trading com um clique. Esta é uma versão de demonstração.
          </p>

          <TapToTradePreview />

          <div className="mt-12 bg-black/50 border border-gold-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gold-500">Sobre o TAP2TRADE</h2>
            <p className="text-gray-300 mb-4">
              O TAP2TRADE é uma funcionalidade exclusiva que permite receber sinais de trading em tempo real e
              executá-los com apenas um clique. Esta versão de demonstração mostra como os sinais serão apresentados e
              como você poderá interagir com eles.
            </p>
            <p className="text-gray-300 mb-4">Na versão completa, disponível para membros, você poderá:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Receber sinais em tempo real baseados em nossa análise algorítmica</li>
              <li>Configurar seus parâmetros de risco e tamanho de posição</li>
              <li>Conectar diretamente com sua corretora para execução automática</li>
              <li>Acompanhar o histórico de desempenho de cada sinal</li>
              <li>Personalizar alertas e notificações</li>
            </ul>
            <p className="text-gray-300">
              Para acessar a versão completa e configurar sua conta, adquira um de nossos planos de Copytrading.
            </p>
          </div>
        </div>
      </main>
    </AuthProvider>
  )
}
