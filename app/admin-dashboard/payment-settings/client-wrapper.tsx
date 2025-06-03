"use client"

import dynamic from "next/dynamic"

const PaymentSettingsClient = dynamic(() => import("./payment-settings-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <PaymentSettingsClient />
}
