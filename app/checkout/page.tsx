"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, CreditCard, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { CartItem } from "@/components/shopping-cart" // Import CartItem from shopping-cart.tsx
import { useAuth } from "@/contexts/auth-context" // Import useAuth

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth() // Get user from AuthContext
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Load cart items from localStorage
    const itemsJson = localStorage.getItem("cartItems")
    if (itemsJson) {
      try {
        const items = JSON.parse(itemsJson)
        setCartItems(items)
        const totalAmount = items.reduce((sum: number, item: CartItem) => sum + item.price, 0)
        setTotal(totalAmount)
      } catch (e) {
        console.error("Failed to parse cart items from localStorage", e)
        localStorage.removeItem("cartItems") // Clear corrupted data
      }
    }
  }, [])

  const handleStripeCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/payments/stripe/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item: CartItem) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            type: item.type || "one_time", // Ensure type is 'one_time' or 'subscription'
            description: item.description,
            // id: item.id, // Stripe uses price IDs or ad-hoc price data, not your internal item ID directly for line items
          })),
          customerEmail: user?.email, // Pass customer email if available
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancelled`,
          metadata: {
            cartId: Date.now().toString(), // Example cart identifier
            userId: user ? user.id : undefined, // Pass userId if available
          },
        }),
      })

      const sessionData = await response.json()

      if (sessionData.url) {
        window.location.href = sessionData.url
      } else {
        console.error("Failed to create Stripe checkout session:", sessionData.error || "Unknown error")
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      // Optionally, display an error message to the user
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && !loading) {
    // Avoid showing empty cart during initial load
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="w-[400px] bg-black/50 border-gold-500/30">
          <CardHeader className="text-center">
            <ShoppingCart className="h-16 w-16 text-gold-500 mx-auto mb-4" />
            <CardTitle className="text-white">Carrinho Vazio</CardTitle>
            <CardDescription>Não há itens no seu carrinho de compras.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black">Continuar Comprando</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-gold-400 hover:text-gold-300 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Carrinho
          </Link>
          <h1 className="text-3xl font-bold text-white">Finalizar Compra</h1>
          <p className="text-gray-400">Revise seus itens e complete o pagamento.</p>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="bg-black/50 border-gold-500/30">
            <CardHeader>
              <CardTitle className="text-white">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-white">{item.name}</h3>
                      {item.description && <p className="text-sm text-gray-400">{item.description}</p>}
                    </div>
                    <div className="text-gold-400 font-medium">€{item.price.toFixed(2)}</div>
                  </div>
                ))}

                <Separator className="bg-gray-700" />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-gold-400">€{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-black/50 border-gold-500/30">
            <CardHeader>
              <CardTitle className="text-white">Método de Pagamento</CardTitle>
              <CardDescription>Escolha como deseja pagar pelos seus itens.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={handleStripeCheckout}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {loading ? "Processando..." : "Pagar com Cartão"}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  Pagamento seguro processado pelo Stripe. Aceitamos Visa, Mastercard e outras bandeiras.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
