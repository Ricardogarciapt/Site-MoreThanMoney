"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Construction } from "lucide-react"

export default function ModuleFallback() {
  const router = useRouter()
  const pathname = usePathname()
  const [moduleName, setModuleName] = useState("Módulo")

  useEffect(() => {
    // Extrair o nome do módulo da URL
    if (pathname) {
      const parts = pathname.split("/")
      const lastPart = parts[parts.length - 1]
      const formattedName = lastPart
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      setModuleName(formattedName)
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <Card className="max-w-4xl mx-auto bg-black/50 border-gray-800/50 backdrop-blur-xl">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center">
              <Construction className="h-5 w-5 mr-2 text-yellow-500" />
              {moduleName}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
              onClick={() => router.push("/admin-dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
            <Construction className="h-8 w-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Módulo em Desenvolvimento</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Este módulo está atualmente em desenvolvimento e estará disponível em breve. Nossa equipe está trabalhando
            para implementar todas as funcionalidades necessárias.
          </p>
          <Button
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black"
            onClick={() => router.push("/admin-dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
