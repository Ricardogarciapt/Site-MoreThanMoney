"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Loading component for the dynamic import
function LoadingPaymentSettings() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando configurações de pagamento...</p>
      </div>
    </div>
  )
}

// Dynamically import the client component with SSR disabled
const PaymentSettingsContent = dynamic(() => import("./payment-settings-client"), {
  ssr: false,
  loading: () => <LoadingPaymentSettings />,
})

export default function ClientWrapper() {
  return (
    <Suspense fallback={<LoadingPaymentSettings />}>
      <PaymentSettingsContent />
    </Suspense>
  )
}
