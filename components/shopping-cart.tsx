"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

// Tipos
export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  type?: string
  details?: {
    duration?: string
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

  const handleClickOutside = (e: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
      // Apenas feche se o clique for fora da área do carrinho
      setIsOpen(false)
    }
  }

  const handleRemoveItem = (itemId: string) => {
    if (confirm("Tem certeza que deseja remover este item do carrinho?")) {
      // Lógica para remover o item
      removeItem(itemId)
    }
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Carregar carrinho do localStorage ao inicializar
    const savedCart = localStorage.getItem("shoppingCart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Salvar carrinho no localStorage quando mudar
    if (cartItems.length > 0) {
      localStorage.setItem("shoppingCart", JSON.stringify(cartItems))
    }
  }, [cartItems])

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
