"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, ArrowLeft, ShoppingBag, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/shopping-cart"
import { useAuth } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs" // Corrigido: import default em vez de nomeado

export default function CartPage() {
  const { items, removeItem, updateItem, totalPrice, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details" | "payment" | "confirmation">("cart")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tradingViewUsername: "",
    affiliateCode: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Preencher dados do usuário se estiver autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [isAuthenticated, user])

  // Lidar com mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Avançar para o próximo passo
  const nextStep = () => {
    if (checkoutStep === "cart") setCheckoutStep("details")
    else if (checkoutStep === "details") setCheckoutStep("payment")
    else if (checkoutStep === "payment") {
      // Simular processamento de pagamento
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
        setCheckoutStep("confirmation")
        // Limpar carrinho após confirmação
        clearCart()
      }, 2000)
    }
  }

  // Voltar para o passo anterior
  const prevStep = () => {
    if (checkoutStep === "details") setCheckoutStep("cart")
    else if (checkoutStep === "payment") setCheckoutStep("details")
  }

  // Continuar comprando
  const continueShopping = () => {
    router.push("/")
  }

  // Verificar se há itens que precisam de nome de usuário do TradingView
  const needsTradingViewUsername = items.some((item) => item.type === "scanner")

  return (
    <div className="min-h-screen bg-black/90 py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Conteúdo principal */}
          <div className="flex-1">
            <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  {checkoutStep === "cart" && (
                    <>
                      <ShoppingBag className="mr-2" size={24} />
                      Carrinho de Compras
                    </>
                  )}
                  {checkoutStep === "details" && "Detalhes da Compra"}
                  {checkoutStep === "payment" && "Pagamento"}
                  {checkoutStep === "confirmation" && "Confirmação"}
                </h1>
                <Button variant="ghost" onClick={continueShopping} className="text-gray-400 hover:text-white">
                  <ArrowLeft size={20} className="mr-2" />
                  Continuar Comprando
                </Button>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                {checkoutStep === "cart" && (
                  <>
                    {items.length === 0 ? (
                      <div className="text-center py-16">
                        <ShoppingBag size={64} className="mx-auto text-gray-500 mb-4" />
                        <h2 className="text-xl font-medium text-white mb-2">Seu carrinho está vazio</h2>
                        <p className="text-gray-400 mb-6">Adicione produtos ao seu carrinho para continuar.</p>
                        <Button onClick={continueShopping} className="bg-gold-500 hover:bg-gold-600 text-black">
                          Ver Produtos
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="text-left pb-4 text-gray-400 font-medium">Produto</th>
                                <th className="text-center pb-4 text-gray-400 font-medium">Quantidade</th>
                                <th className="text-right pb-4 text-gray-400 font-medium">Preço</th>
                                <th className="text-right pb-4 text-gray-400 font-medium">Total</th>
                                <th className="pb-4"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((item) => (
                                <tr key={item.id} className="border-b border-gray-800">
                                  <td className="py-4">
                                    <div>
                                      <h3 className="font-medium text-white">{item.name}</h3>
                                      {item.details?.duration && (
                                        <p className="text-sm text-gray-400">Duração: {item.details.duration}</p>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-4 text-center">
                                    <div className="inline-flex items-center border border-gray-700 rounded-md">
                                      <button
                                        onClick={() =>
                                          updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })
                                        }
                                        className="px-3 py-1 text-gray-400 hover:text-white"
                                      >
                                        -
                                      </button>
                                      <span className="px-3 py-1 text-white">{item.quantity}</span>
                                      <button
                                        onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}
                                        className="px-3 py-1 text-gray-400 hover:text-white"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="py-4 text-right text-white">€{item.price.toFixed(2)}</td>
                                  <td className="py-4 text-right font-medium text-white">
                                    €{(item.price * item.quantity).toFixed(2)}
                                  </td>
                                  <td className="py-4 text-right">
                                    <button
                                      onClick={() => removeItem(item.id)}
                                      className="text-red-400 hover:text-red-300"
                                      aria-label="Remover item"
                                    >
                                      <X size={18} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === "details" && (
                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                          required
                        />
                      </div>
                      {needsTradingViewUsername && (
                        <div>
                          <label htmlFor="tradingViewUsername" className="block text-sm font-medium text-gray-300 mb-1">
                            Nome de Usuário do TradingView
                          </label>
                          <input
                            type="text"
                            id="tradingViewUsername"
                            name="tradingViewUsername"
                            value={formData.tradingViewUsername}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            required
                          />
                          <p className="text-sm text-gray-400 mt-1">Necessário para conceder acesso ao Scanner</p>
                        </div>
                      )}
                      <div>
                        <label htmlFor="affiliateCode" className="block text-sm font-medium text-gray-300 mb-1">
                          Código de Afiliado (opcional)
                        </label>
                        <input
                          type="text"
                          id="affiliateCode"
                          name="affiliateCode"
                          value={formData.affiliateCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === "payment" && (
                  <div className="max-w-2xl mx-auto space-y-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="font-medium text-white mb-4">Resumo do Pedido</h3>
                      <ul className="space-y-3 mb-4">
                        {items.map((item) => (
                          <li key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-300">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="text-white">€{(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-gray-700 pt-3 flex justify-between font-medium">
                        <span className="text-gray-300">Total</span>
                        <span className="text-gold-500">€{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-white mb-4">Método de Pagamento</h3>
                      <div className="space-y-4">
                        <div className="flex items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <input type="radio" id="card" name="paymentMethod" checked className="mr-3" readOnly />
                          <label htmlFor="card" className="flex items-center flex-1">
                            <CreditCard className="mr-2 text-gray-400" size={20} />
                            <span>Cartão de Crédito/Débito</span>
                          </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                              Número do Cartão
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-1">
                              Nome no Cartão
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              placeholder="NOME SOBRENOME"
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-1">
                              Validade
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              placeholder="MM/AA"
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === "confirmation" && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Pagamento Confirmado!</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Obrigado pela sua compra. Enviamos um email com os detalhes da sua compra e instruções para
                      acessar seus produtos.
                    </p>
                    <Button onClick={continueShopping} className="bg-gold-500 hover:bg-gold-600 text-black">
                      Continuar Comprando
                    </Button>
                  </div>
                )}
              </div>

              {/* Rodapé */}
              {checkoutStep !== "confirmation" && items.length > 0 && (
                <div className="p-6 border-t border-gray-800">
                  {checkoutStep === "cart" && (
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-400">Total</p>
                        <p className="text-2xl font-bold text-white">€{totalPrice.toFixed(2)}</p>
                      </div>
                      <Button onClick={nextStep} className="w-full md:w-auto bg-gold-500 hover:bg-gold-600 text-black">
                        Finalizar Compra
                      </Button>
                    </div>
                  )}

                  {(checkoutStep === "details" || checkoutStep === "payment") && (
                    <div className="flex justify-between">
                      <Button onClick={prevStep} variant="outline" className="border-gray-700 text-gray-300">
                        Voltar
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={isProcessing}
                        className="bg-gold-500 hover:bg-gold-600 text-black"
                      >
                        {isProcessing ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processando...
                          </span>
                        ) : checkoutStep === "details" ? (
                          "Continuar para Pagamento"
                        ) : (
                          "Finalizar Pagamento"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Resumo lateral (visível apenas nos passos cart e details) */}
          {(checkoutStep === "cart" || checkoutStep === "details") && items.length > 0 && (
            <div className="w-full lg:w-80">
              <Card className="bg-gray-900 border-gray-800 sticky top-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium text-white mb-4">Resumo do Pedido</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">€{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Impostos</span>
                      <span className="text-white">€0.00</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-white">Total</span>
                      <span className="font-bold text-gold-500">€{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  {checkoutStep === "cart" && (
                    <Button onClick={nextStep} className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                      Finalizar Compra
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
