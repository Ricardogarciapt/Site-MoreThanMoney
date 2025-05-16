"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"
import { BuyButton } from "@/components/buy-button"

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
    name: "Membro Básico",
    price: 29.9,
    period: "mensal",
    features: ["Acesso aos cursos básicos", "Acesso ao fórum da comunidade", "Atualizações mensais"],
  },
  {
    id: "standard",
    name: "Membro Standard",
    price: 49.9,
    period: "mensal",
    features: [
      "Todos os benefícios do plano Básico",
      "Acesso ao scanner básico",
      "Suporte prioritário",
      "Webinars mensais exclusivos",
    ],
    recommended: true,
  },
  {
    id: "premium",
    name: "Membro Premium",
    price: 99.9,
    period: "mensal",
    features: [
      "Todos os benefícios do plano Standard",
      "Acesso completo ao scanner avançado",
      "Acesso ao canal VIP de sinais",
      "Mentoria mensal individual",
      "Acesso antecipado a novos recursos",
    ],
  },
]

export default function MembershipPackages() {
  const { user, updateUserPackage } = useAuth()
  const [isProcessing, setIsProcessing] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handlePackageChange = async (packageId: string) => {
    if (user?.package === packageId) return

    setIsProcessing(packageId)
    setSuccessMessage(null)

    try {
      // Simulação de processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const success = await updateUserPackage(packageId)

      if (success) {
        setSuccessMessage(
          `Seu pacote foi atualizado com sucesso para ${packages.find((p) => p.id === packageId)?.name}!`,
        )
      }
    } catch (error) {
      console.error("Erro ao atualizar pacote:", error)
    } finally {
      setIsProcessing(null)
    }
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

      {successMessage && (
        <div className="bg-green-900/30 border border-green-500 text-green-300 p-4 rounded-lg flex items-center mb-6">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{successMessage}</p>
        </div>
      )}

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
                  <span className="text-3xl font-bold text-white">R${pkg.price.toFixed(2)}</span>
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

              <CardFooter>
                {pkg.id === "basic" ? (
                  <BuyButton
                    productType="membership"
                    productName="Pacote Básico MoreThanMoney"
                    productPrice={50}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
                  />
                ) : (
                  <Button
                    onClick={() => handlePackageChange(pkg.id)}
                    disabled={isProcessing !== null || isCurrentPackage}
                    className={`w-full ${
                      isCurrentPackage ? "bg-green-600 hover:bg-green-700" : "bg-gold-600 hover:bg-gold-700"
                    } text-black`}
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
                    ) : currentPackage &&
                      packages.findIndex((p) => p.id === currentPackage) >
                        packages.findIndex((p) => p.id === pkg.id) ? (
                      "Fazer Downgrade"
                    ) : (
                      "Fazer Upgrade"
                    )}
                  </Button>
                )}
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

      <BuyButton
        productType="bootcamp"
        productName="Bootcamp MoreThanMoney"
        productPrice={50}
        className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold"
      />
    </div>
  )
}
