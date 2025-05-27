"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { paymentService, type PaymentData } from "@/lib/payment-service"
import { trackBeginCheckout } from "@/lib/analytics"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handlePayment = async (method: "stripe" | "paypal") => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para continuar com o pagamento.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Rastrear início do checkout
      trackBeginCheckout(items, totalPrice)

      const paymentData: PaymentData = {
        items: items,
        customerInfo: {
          name: user.name,
          email: user.email || "",
          phone: user.phone,
        },
        totalAmount: totalPrice,
        currency: "EUR",
        successUrl: "/payment/success",
        cancelUrl: "/payment/cancelled",
        metadata: {
          userId: user.username,
          orderDate: new Date().toISOString(),
        },
      }

      let result
      if (method === "stripe") {
        result = await paymentService.processStripePayment(paymentData)
      } else {
        result = await paymentService.processPayPalPayment(paymentData)
      }

      if (!result.success) {
        throw new Error(result.error || "Erro no pagamento")
      }

      // Se chegou aqui, o pagamento foi iniciado com sucesso
      toast({
        title: "Redirecionando...",
        description: "Você será redirecionado para completar o pagamento.",
      })
    } catch (error) {
      console.error("Erro no pagamento:", error)
      toast({
        title: "Erro no pagamento",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!user) {
    return <p>Redirecionando para login...</p>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Resumo do Pedido</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b">
              <span>
                {item.name} ({item.quantity})
              </span>
              <span>€{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2 font-semibold">
            <span>Total</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Informações de Pagamento</h2>
          <Card>
            <CardHeader>
              <CardTitle>Escolha o método de pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" defaultValue={user.name} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" defaultValue={user.phone} disabled />
                </div>
              </div>
              <Separator className="my-4" />
              <Button
                onClick={() => handlePayment("stripe")}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? "Processando..." : "Pagar com Cartão (Stripe)"}
              </Button>

              <Button
                onClick={() => handlePayment("paypal")}
                disabled={isProcessing}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isProcessing ? "Processando..." : "Pagar com PayPal"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
