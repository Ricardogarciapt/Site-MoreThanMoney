"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react"

export default function PaymentCancelledPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Pagamento Cancelado</CardTitle>
            <p className="text-gray-400">Seu pagamento foi cancelado. Nenhuma cobrança foi feita.</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">O que aconteceu?</h3>
              <ul className="space-y-1 text-sm text-yellow-300">
                <li>• O pagamento foi cancelado antes da conclusão</li>
                <li>• Seus itens ainda estão no carrinho</li>
                <li>• Você pode tentar novamente a qualquer momento</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/checkout")}
                className="flex-1 bg-gold-600 hover:bg-gold-700 text-black"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>

              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="flex-1 border-gray-600 text-white hover:bg-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Problemas com o pagamento? Entre em contato:{" "}
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
