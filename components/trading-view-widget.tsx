"use client"

import { useEffect, useRef } from "react"
import { useConfigStore } from "@/lib/config-service"

// Adicionando tipagem para o objeto global TradingView
declare global {
  interface Window {
    TradingView?: any // Usando 'any' para evitar problemas de tipagem com a API do TradingView
  }
}

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { config } = useConfigStore()
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Limpar qualquer widget anterior
      containerRef.current.innerHTML = ""

      // Criar novo script
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = () => {
        if (window.TradingView && containerRef.current) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "240",
            timezone: "Europe/London",
            theme: "dark",
            style: "1",
            locale: "br",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: containerRef.current.id,
            studies: ["STD;ATR"],
            hide_side_toolbar: false,
            withdateranges: true,
            save_image: false,
            // Usar configurações do painel de administração, se disponíveis
            studies_overrides: config.tradingViewSettings?.studiesOverrides || {},
            overrides: config.tradingViewSettings?.overrides || {},
            disabled_features: config.tradingViewSettings?.disabledFeatures || [],
            enabled_features: config.tradingViewSettings?.enabledFeatures || [],
          })
        }
      }

      document.head.appendChild(script)
      scriptRef.current = script

      // Cleanup
      return () => {
        if (scriptRef.current) {
          document.head.removeChild(scriptRef.current)
        }
      }
    }
  }, [config.tradingViewSettings])

  return <div id="tradingview_widget" ref={containerRef} className="h-full w-full" />
}
