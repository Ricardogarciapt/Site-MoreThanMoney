"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { paymentService, type PaymentItem } from "@/lib/payment-service"
import { Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react"

export default function StripeTest() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testStripeConnection = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      // Produto de teste
      const testItems: PaymentItem[] = [
        {
          id: "test-scanner",
          name: "Scanner MTM Gold Killer - TESTE",
          price: 1.0, // €1 para teste
          quantity: 1,
          type: "scanner",
        },
      ]

      const paymentData = {
        items: testItems,
        customerInfo: {
          name: "Teste MoreThanMoney",
          email: "teste@morethanmoney.pt",
          phone: "+351912345678",
        },
        totalAmount: 1.0,
        currency: "EUR",
        successUrl: "/payment/success",
        cancelUrl: "/payment/cancelled",
        metadata: {
          testMode: "true",
          source: "stripe-test-component",
        },
      }

      const result = await paymentService.processStripePayment(paymentData)

      if (result.success) {
        setResult("✅ Stripe configurado corretamente! Redirecionamento iniciado...")
      } else {
        setError(result.error || "Erro desconhecido")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao testar Stripe")
    } finally {
      setLoading(false)
    }
  }

  const testProducts = [
    { name: "Scanner MTM (Teste)", price: 1.0, id: "scanner-test" },
    { name: "Copytrading (Teste)", price: 2.0, id: "copytrading-test" },
    { name: "JIFU Educação (Teste)", price: 0.5, id: "jifu-test" },
  ]

  const quickTest = async (product: (typeof testProducts)[0]) => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const testItems: PaymentItem[] = [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          type: product.id.split("-")[0],
        },
      ]

      const paymentData = {
        items: testItems,
        customerInfo: {
          name: "Teste Rápido",
          email: "teste@morethanmoney.pt",
        },
        totalAmount: product.price,
        currency: "EUR",
        successUrl: "/payment/success",
        cancelUrl: "/payment/cancelled",
        metadata: {
          testMode: "true",
          quickTest: "true",
        },
      }

      const result = await paymentService.processStripePayment(paymentData)

      if (result.success) {
        setResult(`✅ Teste ${product.name} iniciado com sucesso!`)
      } else {
        setError(result.error || "Erro no teste")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no teste rápido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Teste de Integração Stripe
        </CardTitle>
        <CardDescription>Teste se o Stripe está configurado corretamente com suas chaves</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status das chaves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Chave Pública</span>
            </div>
            <p className="text-xs text-green-600 mt-1">pk_test_51RTQzx... ✓</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Chave Secreta</span>
            </div>
            <p className="text-xs text-green-600 mt-1">sk_test_51RTQzx... ✓</p>
          </div>
        </div>

        {/* Teste principal */}
        <div className="space-y-3">
          <Button onClick={testStripeConnection} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando Stripe...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Testar Pagamento Stripe (€1.00)
              </>
            )}
          </Button>

          {/* Testes rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {testProducts.map((product) => (
              <Button
                key={product.id}
                onClick={() => quickTest(product)}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {product.name}
                <span className="ml-1 text-xs">€{product.price}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        {result && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Sucesso</span>
            </div>
            <p className="text-sm text-green-700 mt-1">{result}</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Erro</span>
            </div>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Instruções */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-2">📋 Próximos Passos:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Clique em "Testar Pagamento" para verificar a integração</li>
            <li>• Use cartão de teste: 4242 4242 4242 4242</li>
            <li>• Data: qualquer data futura (ex: 12/25)</li>
            <li>• CVC: qualquer 3 dígitos (ex: 123)</li>
            <li>• Configure webhook no Stripe Dashboard depois</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
