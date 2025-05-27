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
  packageId?: string
}

export function BuyButton({
  productType,
  productName,
  productPrice,
  duration,
  className,
  variant = "default",
  packageId,
}: BuyButtonProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const item: CartItem = {
      id: packageId || uuidv4(),
      name: productName,
      price: productPrice,
      quantity: 1,
      type: productType,
      details: duration ? { duration, packageId } : { packageId },
    }

    addItem(item)
  }

  return (
    <Button onClick={handleAddToCart} className={className} variant={variant}>
      {productPrice === 0 ? "Verificar Acesso JIFU" : "Comprar Agora"}
    </Button>
  )
}
