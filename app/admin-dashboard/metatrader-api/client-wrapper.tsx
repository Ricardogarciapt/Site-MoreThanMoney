"use client"

import dynamic from "next/dynamic"

const MetatraderApiClient = dynamic(() => import("./metatrader-api-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <MetatraderApiClient />
}
