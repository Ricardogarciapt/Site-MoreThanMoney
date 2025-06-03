import { Suspense } from "react"
import ClientWrapper from "./client-wrapper"

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

// Main page component
export default function PaymentSettingsPage() {
  return (
    <Suspense fallback={<PaymentSettingsLoading />}>
      <ClientWrapper />
    </Suspense>
  )
}
