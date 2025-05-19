"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/components/shopping-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, ShoppingCart } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface PackageOption {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  recommended?: boolean
}

const packages: PackageOption[] = [
  {
    id: "basic",
    name: "Membro MoreThanMoney",
    price: 50.0,
    period: "mensal",
    features: [
      "Acesso aos BootCamp MoreThanMoney",
      "Acesso ao fórum da comunidade",
      "Acesso aos Scanners na Plataforma",
    ],
  },
  {
    id: "standard",
    name: "Membro Standard",
    price: 169.99,
    period: "mensal",
    features: [
      "Todos os benefícios do plano Básico",
      "Acesso aos Produtos JIFU",
      "Suporte prioritário",
      "Webinars mensais exclusivos",
      "Eventos Regionais Exclusivos",
    ],
    recommended: true,
  },
  {
    id: "premium",
    name: "Membro Premium",
    price: 1000.0,
    period: "Unico",
    features: [
      "Todos os benefícios do plano Standard",
      "Acesso Vitalicio aos scanners avançado",
      "Acesso ao canal VIP de sinais",
      "Mentoria mensal individual",
      "Acesso antecipado a novos recursos",
    ],
  },
]

export default function MembershipPackages() {
  const { user } = useAuth()
  const { addItem, openCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  const handleAddToCart = (pkg: PackageOption) => {
    setIsProcessing(pkg.id)

    // Adicionar ao carrinho
    addItem({
      id: `membership-${pkg.id}`,
      name: pkg.name,
      price: pkg.price,
      quantity: 1,
      type: "membership",
      details: {
        duration: pkg.period,
        packageId: pkg.id,
      },
    })

    // Mostrar notificação
    toast({
      title: "Adicionado ao carrinho",
      description: `${pkg.name} foi adicionado ao seu carrinho.`,
      duration: 3000,
    })

    // Abrir o carrinho
    setTimeout(() => {
      openCart()
      setIsProcessing(null)
    }, 500)
  }

  const handleCheckout = (pkg: PackageOption) => {
    setIsProcessing(pkg.id)

    // Adicionar ao carrinho
    addItem({
      id: `membership-${pkg.id}`,
      name: pkg.name,
      price: pkg.price,
      quantity: 1,
      type: "membership",
      details: {
        duration: pkg.period,
        packageId: pkg.id,
      },
    })

    // Redirecionar para o checkout
    setTimeout(() => {
      router.push("/checkout")
      setIsProcessing(null)
    }, 500)
  }

  const currentPackage = user?.package || "basic"

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          Gerencie Sua Assinatura
        </h2>
        <p className="text-gray-300">Escolha o pacote que melhor atende às suas necessidades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isCurrentPackage = currentPackage === pkg.id

          return (
            <Card
              key={pkg.id}
              className={`border ${
                pkg.recommended ? "border-gold-500 bg-black/60" : "border-gray-700 bg-black/40"
              } relative overflow-hidden`}
            >
              {pkg.recommended && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-gold-500 text-black font-medium m-2">Recomendado</Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-400">{isCurrentPackage && "Seu pacote atual"}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">€{pkg.price.toFixed(2)}</span>
                  <span className="text-gray-400">/{pkg.period}</span>
                </div>

                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gold-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Button
                  onClick={() => handleCheckout(pkg)}
                  disabled={isProcessing !== null || isCurrentPackage}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
                >
                  {isProcessing === pkg.id ? (
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
                  ) : isCurrentPackage ? (
                    "Pacote Atual"
                  ) : (
                    "Comprar Agora"
                  )}
                </Button>

                <Button
                  onClick={() => handleAddToCart(pkg)}
                  disabled={isProcessing !== null || isCurrentPackage}
                  variant="outline"
                  className="w-full border-gold-500/50 text-gold-500 hover:bg-gold-500/10"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 bg-black/30 border border-gray-700 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-gold-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <p className="font-medium mb-1">Informações importantes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>As alterações de pacote entram em vigor imediatamente</li>
              <li>Ao fazer upgrade, você será cobrado apenas pela diferença proporcional ao período restante</li>
              <li>Ao fazer downgrade, você receberá crédito proporcional ao período restante</li>
              <li>Para cancelar sua assinatura, entre em contato com nosso suporte</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
