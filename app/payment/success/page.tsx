"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, ArrowRight } from "lucide-react"
import { trackPurchase, trackConversion } from "@/lib/analytics"
import { useAuth } from "@/contexts/auth-context"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  const sessionId = searchParams.get("session_id")
  const orderId = searchParams.get("order_id")

  useEffect(() => {
    // Verificar detalhes do pagamento
    const verifyPayment = async () => {
      try {
        if (sessionId) {
          // Pagamento Stripe
          const response = await fetch(`/api/payments/stripe/verify/${sessionId}`)
          const data = await response.json()
          setPaymentDetails(data)

          // Rastrear compra no Analytics
          if (data.items) {
            trackPurchase(sessionId, data.items, data.totalAmount)
            trackConversion("purchase", data.totalAmount)
          }
        } else if (orderId) {
          // Pagamento PayPal
          const response = await fetch(`/api/payments/paypal/verify/${orderId}`)
          const data = await response.json()
          setPaymentDetails(data)

          if (data.items) {
            trackPurchase(orderId, data.items, data.totalAmount)
            trackConversion("purchase", data.totalAmount)
          }
        }
      } catch (error) {
        console.error("Erro ao verificar pagamento:", error)
      } finally {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [sessionId, orderId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-white">Verificando pagamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Pagamento Confirmado!</CardTitle>
            <p className="text-gray-400">Obrigado pela sua compra, {user?.name}!</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {paymentDetails && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Detalhes da Compra</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ID do Pagamento:</span>
                    <span className="text-white font-mono">{sessionId || orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Pago:</span>
                    <span className="text-green-400 font-semibold">€{paymentDetails.totalAmount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data:</span>
                    <span className="text-white">{new Date().toLocaleDateString("pt-PT")}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Próximos Passos</h3>
              <ul className="space-y-2 text-sm text-blue-300">
                <li>• Seu acesso foi ativado automaticamente</li>
                <li>• Verifique seu email para instruções detalhadas</li>
                <li>• Acesse sua área de membro para começar</li>
                <li>• Entre no canal VIP do Telegram</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/member-area")}
                className="flex-1 bg-gold-600 hover:bg-gold-700 text-black"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Acessar Área de Membro
              </Button>

              <Button
                onClick={() => router.push("/profile")}
                variant="outline"
                className="flex-1 border-gray-600 text-white hover:bg-gray-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Ver Perfil
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Precisa de ajuda? Entre em contato conosco em{" "}
                <a href="mailto:suporte@morethanmoney.pt" className="text-gold-400 hover:underline">
                  suporte@morethanmoney.pt
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
