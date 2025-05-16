"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { ShoppingBag, X, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

// Tipos
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  type: "membership" | "bootcamp" | "scanner" | "copytrading"
  details?: {
    tradingViewUsername?: string
    affiliateCode?: string
    duration?: string
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

// Contexto do carrinho
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hook para usar o carrinho
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider")
  }
  return context
}

// Provedor do carrinho
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Carregar itens do localStorage ao iniciar
  useEffect(() => {
    const savedItems = localStorage.getItem("cart")
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems))
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error)
      }
    }
  }, [])

  // Salvar itens no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Adicionar item ao carrinho
  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      // Verificar se o item já existe
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex >= 0) {
        // Atualizar quantidade se o item já existe
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        }
        return updatedItems
      } else {
        // Adicionar novo item
        return [...prevItems, item]
      }
    })

    // Abrir o carrinho automaticamente
    setIsOpen(true)
  }

  // Remover item do carrinho
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Atualizar item no carrinho
  const updateItem = (id: string, updates: Partial<CartItem>) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  // Limpar carrinho
  const clearCart = () => {
    setItems([])
  }

  // Calcular total de itens
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Calcular preço total
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Componente do carrinho
export const ShoppingCart = () => {
  const { items, removeItem, totalPrice, isOpen, setIsOpen, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
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

  // Reiniciar checkout
  const resetCheckout = () => {
    setCheckoutStep("cart")
    setIsComplete(false)
    setIsOpen(false)
  }

  // Verificar se há itens que precisam de nome de usuário do TradingView
  const needsTradingViewUsername = items.some((item) => item.type === "scanner")

  return (
    <>
      {/* Botão do carrinho */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:text-gold-500 transition-colors"
        aria-label="Abrir carrinho"
      >
        <ShoppingBag size={24} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Modal do carrinho */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">
                {checkoutStep === "cart" && "Carrinho de Compras"}
                {checkoutStep === "details" && "Detalhes da Compra"}
                {checkoutStep === "payment" && "Pagamento"}
                {checkoutStep === "confirmation" && "Confirmação"}
              </h2>
              <button
                onClick={() => {
                  if (checkoutStep === "confirmation") {
                    resetCheckout()
                  } else {
                    setIsOpen(false)
                  }
                }}
                className="text-gray-400 hover:text-white"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-4">
              {checkoutStep === "cart" && (
                <>
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag size={48} className="mx-auto text-gray-500 mb-4" />
                      <p className="text-gray-400">Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {items.map((item) => (
                        <li key={item.id} className="flex items-start gap-4 p-3 bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium text-white">{item.name}</h3>
                            <p className="text-sm text-gray-400">
                              {item.quantity} x €{item.price.toFixed(2)}
                            </p>
                            {item.details?.duration && (
                              <p className="text-sm text-gray-400">Duração: {item.details.duration}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">€{(item.price * item.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-400 hover:text-red-300 mt-1"
                            >
                              Remover
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {checkoutStep === "details" && (
                <div className="space-y-4">
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
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
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
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
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
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Necessário para conceder acesso ao Scanner</p>
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
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    />
                  </div>
                </div>
              )}

              {checkoutStep === "payment" && (
                <div className="space-y-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Resumo do Pedido</h3>
                    <ul className="space-y-2 mb-4">
                      {items.map((item) => (
                        <li key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-300">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-white">€{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-700 pt-2 flex justify-between font-medium">
                      <span className="text-gray-300">Total</span>
                      <span className="text-gold-500">€{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-3">Método de Pagamento</h3>
                    <div className="space-y-3">
                      <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-gray-700">
                        <input type="radio" id="card" name="paymentMethod" checked className="mr-3" readOnly />
                        <label htmlFor="card" className="flex items-center flex-1">
                          <CreditCard className="mr-2 text-gray-400" size={20} />
                          <span>Cartão de Crédito/Débito</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
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
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
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
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
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
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === "confirmation" && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pagamento Confirmado!</h3>
                  <p className="text-gray-400 mb-6">
                    Obrigado pela sua compra. Enviamos um email com os detalhes da sua compra.
                  </p>
                  <Button onClick={resetCheckout} className="bg-gold-500 hover:bg-gold-600 text-black">
                    Continuar Comprando
                  </Button>
                </div>
              )}
            </div>

            {/* Rodapé */}
            {checkoutStep !== "confirmation" && (
              <div className="p-4 border-t border-gray-800">
                {checkoutStep === "cart" && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-lg font-bold text-white">€{totalPrice.toFixed(2)}</p>
                    </div>
                    <Button
                      onClick={nextStep}
                      disabled={items.length === 0}
                      className="bg-gold-500 hover:bg-gold-600 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
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
      )}
    </>
  )
}
