import dynamic from "next/dynamic"
import { Suspense } from "react"

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
const PaymentSettingsContent = dynamic(() => import("./payment-settings-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando configurações de pagamento...</p>
      </div>
    </div>
  ),
})

// Main page component
export default function PaymentSettingsPage() {
  return (
    <Suspense fallback={<PaymentSettingsLoading />}>
      <PaymentSettingsContent />
    </Suspense>
  )
}
