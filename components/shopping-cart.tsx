"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, ShoppingCartIcon as CartIcon, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Tipos
export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  type?: string
  details?: {
    duration?: string
    packageId?: string
    [key: string]: any
  }
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

// Contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const cartRef = useRef<HTMLDivElement>(null)

  // Carregar itens do localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("cart-items")
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems))
      } catch (error) {
        console.error("Erro ao carregar itens do carrinho:", error)
      }
    }
  }, [])

  // Salvar itens no localStorage
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(items))
  }, [items])

  // Adicionar item
  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i))
      }

      return [...prevItems, { ...item, quantity: item.quantity || 1 }]
    })
  }

  // Remover item
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Atualizar item
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

  // Abrir carrinho
  const openCart = () => {
    setIsOpen(true)
  }

  // Fechar carrinho
  const closeCart = () => {
    setIsOpen(false)
  }

  // Fechar carrinho ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        closeCart()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Ir para o checkout
  const goToCheckout = async () => {
    if (items.length === 0) return

    try {
      // Preparar dados do pagamento
      const paymentItems = items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            description: item.details?.duration || "Produto MoreThanMoney",
          },
          unit_amount: Math.round(item.price * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      }))

      // Criar sessão do Stripe
      const response = await fetch("/api/payments/stripe/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: paymentItems,
          success_url: `${window.location.origin}/payment/success`,
          cancel_url: `${window.location.origin}/payment/cancelled`,
          metadata: {
            cartId: Date.now().toString(),
            source: "shopping-cart",
          },
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirecionar para o Stripe
      window.location.href = url
    } catch (error) {
      console.error("Erro no checkout:", error)
      alert("Erro ao processar pagamento. Tente novamente.")
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}

      {/* Botão do carrinho */}
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 z-50 bg-gold-600 text-black p-3 rounded-full shadow-lg hover:bg-gold-700 transition-colors"
        aria-label="Abrir carrinho"
      >
        <CartIcon className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Carrinho lateral */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div
            ref={cartRef}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl transition-transform animate-in slide-in-from-right"
          >
            <div className="flex h-full flex-col">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <CartIcon className="mr-2 h-5 w-5" />
                  Carrinho
                  <span className="ml-2 text-sm text-gray-400">
                    ({totalItems} {totalItems === 1 ? "item" : "itens"})
                  </span>
                </h2>
                <button onClick={closeCart} className="text-gray-400 hover:text-white" aria-label="Fechar carrinho">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 overflow-auto py-4 px-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <CartIcon className="h-16 w-16 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Seu carrinho está vazio</h3>
                    <p className="text-gray-400 mb-6">Adicione produtos ao seu carrinho para continuar.</p>
                    <Button onClick={closeCart} className="bg-gold-600 hover:bg-gold-700 text-black">
                      Continuar Comprando
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-start border-b border-gray-800 pb-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{item.name}</h4>
                          {item.details?.duration && (
                            <p className="text-sm text-gray-400">Duração: {item.details.duration}</p>
                          )}
                          <div className="mt-1 flex items-center">
                            <button
                              onClick={() => updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                              className="h-6 w-6 rounded border border-gray-700 text-gray-400 hover:text-white"
                              aria-label="Diminuir quantidade"
                            >
                              -
                            </button>
                            <span className="mx-2 w-8 text-center text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}
                              className="h-6 w-6 rounded border border-gray-700 text-gray-400 hover:text-white"
                              aria-label="Aumentar quantidade"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col items-end">
                          <span className="text-white">€{(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 text-sm text-red-400 hover:text-red-300"
                            aria-label="Remover item"
                          >
                            Remover
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Rodapé */}
              {items.length > 0 && (
                <div className="border-t border-gray-800 px-6 py-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mb-6 flex items-center justify-between font-medium">
                    <span className="text-white">Total</span>
                    <span className="text-xl text-gold-500">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={goToCheckout}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold py-2"
                  >
                    Finalizar Compra
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  )
}

// Hook para usar o carrinho
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider")
  }
  return context
}

export const ShoppingCart = () => null
