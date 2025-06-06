"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/shopping-cart"
import { toast } from "sonner"

interface BuyButtonProps {
  productId: string
  productName: string
  price: number
  originalPrice?: number
  className?: string
  children?: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  type?: string
}

export function BuyButton({
  productId,
  productName,
  price,
  originalPrice,
  className,
  children,
  variant = "default",
  size = "default",
  type = "product",
}: BuyButtonProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: productName,
      price: price,
      quantity: 1,
      type: type,
      details: {
        originalPrice: originalPrice,
        packageId: productId,
      },
    })
    toast.success(`${productName} adicionado ao carrinho!`)
  }

  return (
    <Button onClick={handleAddToCart} variant={variant} size={size} className={`flex items-center gap-2 ${className}`}>
      <ShoppingCart className="h-4 w-4" />
      {children || `Comprar - €${price}`}
    </Button>
  )
}
