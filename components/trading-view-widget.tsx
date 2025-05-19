"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { pineScriptScanner } from "@/lib/pinescript-scanner"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Maximize2 } from "lucide-react"

// Adicionando tipagem para o objeto global TradingView
declare global {
  interface Window {
    TradingView?: any
  }
}

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const widgetRef = useRef<any>(null)
  const { config } = useConfigStore()

  const handleFullScreen = () => {
    const elem = containerRef.current
    if (elem?.requestFullscreen) {
      elem.requestFullscreen()
    } else if ((elem as any)?.webkitRequestFullscreen) {
      ;(elem as any).webkitRequestFullscreen()
    } else if ((elem as any)?.msRequestFullscreen) {
      ;(elem as any).msRequestFullscreen()
    }
  }

  useEffect(() => {
    let loadAttempts = 0
    const maxAttempts = 3

    const loadTradingViewScript = () => {
      if (!containerRef.current) return

      if (loadAttempts >= maxAttempts) {
        setError("Falha ao carregar o TradingView após várias tentativas")
        return
      }

      if (document.querySelector('script[src="https://s3.tradingview.com/tv.js"]')) {
        initTradingView()
        return
      }

      try {
        const script = document.createElement("script")
        script.src = "https://s3.tradingview.com/tv.js"
        script.async = true
        script.onload = initTradingView
        script.onerror = () => {
          loadAttempts++
          setTimeout(loadTradingViewScript, 1000)
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("Erro ao carregar script do TradingView:", error)
        loadAttempts++
        setTimeout(loadTradingViewScript, 1000)
      }
    }

    const initTradingView = () => {
      if (!window.TradingView) {
        setError("TradingView não foi carregado corretamente")
        return
      }

      try {
        if (containerRef.current) {
          const container = document.getElementById("tradingview_widget")
          if (container) {
            container.innerHTML = ""
          }
        }

        if (config.tradingViewCustomCode) {
          try {
            const customWidgetCreator = new Function(
              "container",
              "isAuthenticated",
              "pineScriptScanner",
              config.tradingViewCustomCode,
            )
            customWidgetCreator(containerRef.current, isAuthenticated, pineScriptScanner)
            setWidgetLoaded(true)
            return
          } catch (customError) {
            console.error("Erro no código personalizado:", customError)
            setError(`Erro no código personalizado: ${customError.message}`)
          }
        }

        const widgetOptions = {
          autosize: true,
          symbol: config.tradingViewSettings?.defaultSymbol || "OANDA:XAUUSD",
          interval: config.tradingViewSettings?.defaultInterval || "60",
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
          studies_overrides: config.tradingViewSettings?.studiesOverrides || {},
          overrides: config.tradingViewSettings?.overrides || {},
          disabled_features: config.tradingViewSettings?.disabledFeatures || [],
          enabled_features: config.tradingViewSettings?.enabledFeatures || [],
        }

        if (isAuthenticated) {
          widgetOptions.loaded = function () {
            if (typeof this.chart === "function") {
              try {
                this.chart().createStudy("Custom Script", false, false, {
                  text: pineScriptScanner,
                })
              } catch (error) {
                console.error("Erro ao aplicar o PineScript:", error)
                setError("Erro ao aplicar o PineScript. Verifique o console.")
              }
            } else {
              setError("Método chart não encontrado.")
            }
          }
        }

        widgetRef.current = new window.TradingView.widget(widgetOptions)
        setWidgetLoaded(true)
        setError(null)
      } catch (error) {
        console.error("Erro ao inicializar widget:", error)
        setError(`Erro ao inicializar widget: ${error.message}`)
      }
    }

    loadTradingViewScript()

    return () => {
      if (widgetRef.current && typeof widgetRef.current.remove === "function") {
        try {
          widgetRef.current.remove()
        } catch (e) {
          console.error("Erro ao remover widget:", e)
        }
      }
    }
  }, [isAuthenticated, config.tradingViewSettings, config.tradingViewCustomCode])

  return (
    <div className="w-full h-[600px] relative">
      {/* Erro */}
      {error && (
        <Alert className="absolute top-2 left-2 right-2 z-20 bg-red-500/20 border-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Botão de Tela Cheia */}
      <button
        onClick={handleFullScreen}
        className="absolute top-2 right-2 z-30 bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center gap-1"
      >
        <Maximize2 className="w-4 h-4" />
        Tela cheia
      </button>

      {/* Widget (JS) */}
      <div ref={containerRef} className={`w-full h-full ${widgetLoaded ? "block" : "hidden"}`}>
        <div id="tradingview_widget" style={{ height: "100%", width: "100%" }}></div>
      </div>

      {/* Fallback (iframe) */}
      {!widgetLoaded && !error && (
        <iframe
          src="https://www.tradingview.com/chart/SP3yDryX/?symbol=OANDA:XAUUSD"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
        />
      )}

      {/* Overlay de status */}
      {isAuthenticated && !widgetLoaded && !error && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-400 font-medium">Carregando Scanner MTM...</p>
          </div>
        </div>
      )}
    </div>
  )
}
