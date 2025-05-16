"use client"

import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/components/shopping-cart"
import { v4 as uuidv4 } from "uuid"

interface BuyButtonProps {
  productType: "membership" | "bootcamp" | "scanner" | "copytrading"
  productName: string
  productPrice: number
  duration?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function BuyButton({
  productType,
  productName,
  productPrice,
  duration,
  className,
  variant = "default",
}: BuyButtonProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const item: CartItem = {
      id: uuidv4(),
      name: productName,
      price: productPrice,
      quantity: 1,
      type: productType,
      details: duration ? { duration } : undefined,
    }

    addItem(item)
  }

  return (
    <Button onClick={handleAddToCart} className={className} variant={variant}>
      Comprar Agora
    </Button>
  )
}
