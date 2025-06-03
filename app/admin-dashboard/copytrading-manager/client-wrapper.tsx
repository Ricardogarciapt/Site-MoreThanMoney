"use client"

import dynamic from "next/dynamic"

const CopytradingManagerClient = dynamic(() => import("./client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <CopytradingManagerClient />
}
