import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

// Loading component
function PaymentSettingsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Configurações de Pagamento</h1>
          <p className="text-gray-400">Carregando configurações...</p>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
        </div>
      </div>
    </div>
  )
}

// Payment settings content
function PaymentSettingsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Configurações de Pagamento</h1>
          <p className="text-gray-400">Configure as chaves do Stripe para processar pagamentos.</p>
        </div>

        <div className="grid gap-6">
          {/* Stripe Configuration Card */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Configuração do Stripe
              </CardTitle>
              <Car\
