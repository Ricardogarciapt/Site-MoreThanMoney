"use client"

import { useState, useEffect } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  type?: string
  image?: string
  description?: string
  details?: {
    duration?: string
    packageId?: string
    [key: string]: any
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

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

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    totalItems,
    totalPrice,
  }
}
