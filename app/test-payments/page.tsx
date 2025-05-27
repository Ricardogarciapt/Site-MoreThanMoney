import StripeTest from "@/components/stripe-test"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPaymentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Teste de Pagamentos</h1>
          <p className="text-gray-600">Verifique se todas as integrações estão funcionando corretamente</p>
        </div>

        <div className="space-y-8">
          {/* Teste do Stripe */}
          <StripeTest />

          {/* Informações importantes */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>🔧 Configuração Atual</CardTitle>
              <CardDescription>Status das integrações configuradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-800">✅ Configurado</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Stripe (Modo Teste)</li>
                    <li>• Google Analytics (Estrutura)</li>
                    <li>• Telegram API</li>
                    <li>• YouTube API</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-orange-800">⚠️ Pendente</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Webhook do Stripe</li>
                    <li>• ID do Google Analytics</li>
                    <li>• PayPal (Opcional)</li>
                    <li>• Email de confirmação</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cartões de teste */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>💳 Cartões de Teste Stripe</CardTitle>
              <CardDescription>Use estes cartões para testar diferentes cenários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-800">✅ Sucesso</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <code>4242 4242 4242 4242</code> - Visa
                    </p>
                    <p>
                      <code>5555 5555 5555 4444</code> - Mastercard
                    </p>
                    <p>
                      <code>3782 822463 10005</code> - American Express
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-red-800">❌ Falha</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <code>4000 0000 0000 0002</code> - Cartão recusado
                    </p>
                    <p>
                      <code>4000 0000 0000 9995</code> - Fundos insuficientes
                    </p>
                    <p>
                      <code>4000 0000 0000 9987</code> - CVC incorreto
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Dica:</strong> Use qualquer data futura (ex: 12/25) e qualquer CVC de 3 dígitos (ex: 123)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
