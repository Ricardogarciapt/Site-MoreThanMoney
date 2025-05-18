"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { pineScriptScanner } from "@/lib/pinescript-scanner"

// Adicionando tipagem para o objeto global TradingView
declare global {
  interface Window {
    TradingView?: any // Usando 'any' para evitar problemas de tipagem com a API do TradingView
  }
}

export default function TradingViewWidgetWithFallback() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const { isAuthenticated } = useAuth()
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    let loadAttempts = 0
    const maxAttempts = 3

    const loadTradingViewScript = () => {
      if (!containerRef.current) return

      if (loadAttempts >= maxAttempts) {
        console.error("Falha ao carregar o TradingView após várias tentativas")
        return
      }

      // Verificar se o script já foi carregado
      if (document.querySelector('script[src="https://s3.tradingview.com/tv.js"]')) {
        console.log("Script do TradingView já carregado, inicializando widget...")
        initTradingView()
        return
      }

      try {
        const script = document.createElement("script")
        script.src = "https://s3.tradingview.com/tv.js"
        script.async = true
        script.onload = initTradingView
        script.onerror = () => {
          console.warn(`Tentativa ${loadAttempts + 1} falhou, tentando novamente...`)
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

    // Função para inicializar o widget quando o script estiver carregado
    const initTradingView = () => {
      if (!window.TradingView) {
        console.error("TradingView não foi carregado corretamente")
        return
      }

      try {
        // Limpar o container antes de inicializar um novo widget
        if (containerRef.current) {
          const container = document.getElementById("tradingview_widget")
          if (container) {
            container.innerHTML = ""
          }
        }

        // Criar o widget com configurações básicas
        const widgetOptions = {
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
        }

        // Adicionar callback para quando o gráfico estiver pronto
        if (isAuthenticated) {
          widgetOptions.loaded = function () {
            

            // Verificar se o widget tem o método chart
            if (typeof this.chart === "function") {
              try {
                // Criar um novo estudo com o PineScript
                this.chart().createStudy("Custom Script", false, false, {
                  text: pineScriptScanner,
                })
                console.log("PineScript MTM Scanner aplicado com sucesso")
              } catch (error) {
                console.error("Erro ao aplicar o PineScript:", error)
              }
            } else {
              console.error("Método chart não encontrado no widget")
            }
          }
        }

        // Inicializar o widget
        widgetRef.current = new window.TradingView.widget(widgetOptions)
        setWidgetLoaded(true)
        console.log("TradingView widget inicializado com sucesso")
      } catch (error) {
        console.error("Erro ao inicializar widget do TradingView:", error)
      }
    }

    loadTradingViewScript()

    return () => {
      // Cleanup logic - não remover o script para evitar problemas de carregamento
      if (widgetRef.current && typeof widgetRef.current.remove === "function") {
        try {
          widgetRef.current.remove()
        } catch (e) {
          console.error("Erro ao remover widget:", e)
        }
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
