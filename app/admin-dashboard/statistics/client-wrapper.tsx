"use client"

import dynamic from "next/dynamic"

const StatisticsClient = dynamic(() => import("./statistics-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <StatisticsClient />
}
