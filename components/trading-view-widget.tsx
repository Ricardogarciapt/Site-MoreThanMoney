"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { pineScriptScanner } from "@/lib/pinescript-scanner"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Adicionando tipagem para o objeto global TradingView
declare global {
  interface Window {
    TradingView?: any // Usando 'any' para evitar problemas de tipagem com a API do TradingView
  }
}

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const widgetRef = useRef<any>(null)
  const { config } = useConfigStore()

  useEffect(() => {
    let loadAttempts = 0
    const maxAttempts = 3

    const loadTradingViewScript = () => {
      if (!containerRef.current) return

      if (loadAttempts >= maxAttempts) {
        setError("Falha ao carregar o TradingView após várias tentativas")
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
        setError("TradingView não foi carregado corretamente")
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

        // Verificar se há código personalizado nas configurações
        if (config.tradingViewCustomCode) {
          try {
            // Tentar executar o código personalizado
            const customWidgetCreator = new Function(
              "container",
              "isAuthenticated",
              "pineScriptScanner",
              config.tradingViewCustomCode,
            )
            customWidgetCreator(containerRef.current, isAuthenticated, pineScriptScanner)
            setWidgetLoaded(true)
            console.log("TradingView widget inicializado com código personalizado")
            return
          } catch (customError) {
            console.error("Erro ao executar código personalizado do TradingView:", customError)
            setError(`Erro no código personalizado: ${customError.message}. Usando configuração padrão.`)
            // Continuar com a configuração padrão em caso de erro
          }
        }

        // Criar o widget com configurações básicas (fallback)
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
          // Usar configurações do painel de administração, se disponíveis
          studies_overrides: config.tradingViewSettings?.studiesOverrides || {},
          overrides: config.tradingViewSettings?.overrides || {},
          disabled_features: config.tradingViewSettings?.disabledFeatures || [],
          enabled_features: config.tradingViewSettings?.enabledFeatures || [],
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
                setError("Erro ao aplicar o PineScript. Verifique o console para mais detalhes.")
              }
            } else {
              console.error("Método chart não encontrado no widget")
              setError("Erro ao inicializar o gráfico. Método chart não encontrado.")
            }
          }
        }

        // Inicializar o widget
        widgetRef.current = new window.TradingView.widget(widgetOptions)
        setWidgetLoaded(true)
        setError(null)
        console.log("TradingView widget inicializado com sucesso")
      } catch (error) {
        console.error("Erro ao inicializar widget do TradingView:", error)
        setError(`Erro ao inicializar widget: ${error.message}`)
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
  }, [isAuthenticated, config.tradingViewSettings, config.tradingViewCustomCode])

  return (
    <div className="w-full h-[600px] relative">
      {/* Mensagem de erro */}
      {error && (
        <Alert className="absolute top-2 left-2 right-2 z-20 bg-red-500/20 border-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
            <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gold-400 font-medium">Carregando Scanner MTM...</p>
          </div>
        </div>
      )}
    </div>
  )
}
