"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/shopping-cart"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { paymentService, type PaymentData } from "@/lib/payment-service"
import { trackBeginCheckout } from "@/lib/analytics"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart, removeItem, updateItem } = useCart()
  const { user } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (user) {
      setCustomerInfo({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      })
    }
  }, [user])

  useEffect(() => {
    if (items.length === 0) {
      router.push("/")
    }
  }, [items, router])

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      toast.error("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    setIsProcessing(true)

    try {
      // Rastrear início do checkout
      trackBeginCheckout(items, totalPrice)

      const paymentData: PaymentData = {
        items: items,
        customerInfo: customerInfo,
        totalAmount: totalPrice,
        currency: "EUR",
        successUrl: "/payment/success",
        cancelUrl: "/payment/cancelled",
        metadata: {
          userId: user?.username || "guest",
          orderDate: new Date().toISOString(),
          itemCount: items.length.toString(),
        },
      }

      const result = await paymentService.processStripePayment(paymentData)

      if (!result.success) {
        throw new Error(result.error || "Erro no pagamento")
      }

      // Se chegou aqui, o pagamento foi iniciado com sucesso
      toast.success("Redirecionando para pagamento...")
    } catch (error) {
      console.error("Erro no pagamento:", error)
      toast.error(error instanceof Error ? error.message : "Erro no pagamento. Tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Carrinho Vazio</h1>
        <p className="text-gray-600 mb-6">Adicione produtos ao seu carrinho para continuar.</p>
        <Button onClick={() => router.push("/")} className="bg-gold-600 hover:bg-gold-700 text-black">
          Continuar Comprando
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-800">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      {item.details?.duration && (
                        <p className="text-sm text-gray-400">Duração: {item.details.duration}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="ml-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Separator className="bg-gray-800" />

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-gold-500">€{totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informações de Pagamento */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Informações de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <Separator className="bg-gray-800" />

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !customerInfo.name || !customerInfo.email}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold py-3"
                >
                  {isProcessing ? "Processando..." : `Pagar €${totalPrice.toFixed(2)}`}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  Pagamento seguro processado pelo Stripe. Seus dados estão protegidos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
