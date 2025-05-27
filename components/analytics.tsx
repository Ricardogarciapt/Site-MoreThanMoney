"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { initGA, trackPageView, isAnalyticsEnabled } from "@/lib/analytics"

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Inicializar Google Analytics apenas no cliente
    if (typeof window !== "undefined" && isAnalyticsEnabled) {
      initGA()
    }
  }, [])

  useEffect(() => {
    // Rastrear mudanças de página
    if (isAnalyticsEnabled && pathname) {
      trackPageView(window.location.href)
    }
  }, [pathname])

  // Não renderizar nada visível
  return null
}
