"use client"

import dynamic from "next/dynamic"

const TelegramTestClient = dynamic(() => import("./telegram-test-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <TelegramTestClient />
}
