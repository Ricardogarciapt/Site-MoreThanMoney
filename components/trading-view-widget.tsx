"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { pineScriptScanner } from "@/lib/pinescript-scanner"

export default function TradingViewWidgetWithFallback() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (typeof window.TradingView !== "undefined") {
        const widget = new window.TradingView.widget({
          autosize: true,
          symbol: "OANDA:XAUUSD",
          interval: "60",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "br",
          toolbar_bg: "#1E1E1E",
          enable_publishing: false,
          allow_symbol_change: true,
          hide_side_toolbar: false,
          withdateranges: true,
          save_image: false,
          studies: ["STD;MACD", "STD;RSI"],
          container_id: "tradingview_widget",
        })

        // Aplicar o PineScript personalizado quando o widget estiver carregado
        if (isAuthenticated) {
          widget.onChartReady(() => {
            try {
              // Criar um novo estudo com o PineScript
              widget.chart().createStudy("Custom Script", false, false, {
                text: pineScriptScanner,
              })
              console.log("PineScript MTM Scanner aplicado com sucesso")
            } catch (error) {
              console.error("Erro ao aplicar o PineScript:", error)
            }
          })
        }

        setWidgetLoaded(true)
      }
    }

    containerRef.current.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [isAuthenticated])

  return (
    <div className="w-full h-[600px] relative">
      {/* Widget (JS) */}
      <div ref={containerRef} className={`w-full h-full ${widgetLoaded ? "block" : "hidden"}`}>
        <div id="tradingview_widget" style={{ height: "100%", width: "100%" }}></div>
      </div>

      {/* Fallback (iframe) */}
      {!widgetLoaded && (
        <iframe
          src="https://www.tradingview.com/chart/SP3yDryX/?symbol=OANDA:XAUUSD"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
        />
      )}

      {/* Overlay de status */}
      {isAuthenticated && !widgetLoaded && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gold-400 font-medium">Carregando Scanner MTM...</p>
          </div>
        </div>
      )}
    </div>
  )
}
