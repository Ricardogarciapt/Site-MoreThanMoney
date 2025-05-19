"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Adicionando tipagem para o objeto global TradingView
declare global {
  interface Window {
    TradingView?: any
  }
}

export default function TradingViewWidget({ scannerType = "default" }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const widgetRef = useRef<any>(null)
  const { config } = useConfigStore()
  const [currentScanner, setCurrentScanner] = useState(scannerType)

  // URLs dos scanners - usando embed direto para maior compatibilidade
  const scannerUrls = {
    default: "https://www.tradingview.com/chart/?symbol=OANDA:XAUUSD",
    scanner1: "https://www.tradingview.com/chart/?symbol=OANDA:XAUUSD",
    scanner2: "https://www.tradingview.com/chart/?symbol=OANDA:XAUUSD",
  }

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

  const switchScanner = (scannerKey: string) => {
    setCurrentScanner(scannerKey)

    // Ao mudar o scanner, precisamos recarregar o widget
    if (containerRef.current) {
      const container = containerRef.current
      container.innerHTML = ""

      // Recria o widget com o novo scanner
      loadTradingViewWidget(scannerKey)
    }
  }

  const loadTradingViewWidget = (scannerKey: string) => {
    if (!window.TradingView) {
      console.error("TradingView não está disponível")
      setError("TradingView não está disponível. Tente recarregar a página.")
      return
    }

    try {
      // Limpa o container
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div id="tradingview_widget" style="height: 100%; width: 100%;"></div>'
      }

      // Configurações base do widget
      const widgetOptions: any = {
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
        container_id: "tradingview_widget",
      }

      // Adiciona o script específico baseado no scanner selecionado
      if (scannerKey === "scanner1") {
        widgetOptions.studies = ["Script;BtIDtpBs-MoreThanMoney-Scanner-V3-4-Market-structures-and-ATR"]
      } else if (scannerKey === "scanner2") {
        widgetOptions.studies = ["Script;fhpIupC5-MTM-Gold-Killer-V2-1"]
      }

      // Cria o widget
      widgetRef.current = new window.TradingView.widget(widgetOptions)
      setWidgetLoaded(true)
      setError(null)
    } catch (error) {
      console.error("Erro ao inicializar widget:", error)
      setError(`Erro ao inicializar widget: ${error.message}`)
    }
  }

  useEffect(() => {
    // Carrega o script do TradingView
    const loadTradingViewScript = () => {
      if (document.getElementById("tradingview-script")) {
        // Script já carregado
        initTradingView()
        return
      }

      const script = document.createElement("script")
      script.id = "tradingview-script"
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = initTradingView
      script.onerror = () => {
        setError("Falha ao carregar o script do TradingView")
      }
      document.head.appendChild(script)
    }

    const initTradingView = () => {
      // Verifica se o TradingView está disponível
      if (!window.TradingView) {
        setTimeout(initTradingView, 100) // Tenta novamente em 100ms
        return
      }

      loadTradingViewWidget(currentScanner)
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
  }, [])

  return (
    <div className="w-full h-[600px] relative bg-gray-900 border border-gold-500/30 rounded-lg overflow-hidden">
      {/* Erro */}
      {error && (
        <Alert className="absolute top-2 left-2 right-2 z-20 bg-red-500/20 border-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Controles do Scanner */}
      <div className="absolute top-2 left-2 z-30 flex gap-2">
        <Button
          onClick={() => switchScanner("scanner1")}
          variant={currentScanner === "scanner1" ? "default" : "outline"}
          className="bg-gray-800 text-white hover:bg-gray-700"
          size="sm"
        >
          Scanner MTM V3.4
        </Button>
        <Button
          onClick={() => switchScanner("scanner2")}
          variant={currentScanner === "scanner2" ? "default" : "outline"}
          className="bg-gray-800 text-white hover:bg-gray-700"
          size="sm"
        >
          MTM Gold Killer
        </Button>
      </div>

      {/* Botão de Tela Cheia */}
      <button
        onClick={handleFullScreen}
        className="absolute top-2 right-2 z-30 bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center gap-1"
      >
        <Maximize2 className="w-4 h-4" />
        Tela cheia
      </button>

      {/* Container do Widget */}
      <div ref={containerRef} className="w-full h-full" style={{ visibility: widgetLoaded ? "visible" : "hidden" }}>
        <div id="tradingview_widget" style={{ height: "100%", width: "100%" }}></div>
      </div>

      {/* Fallback para quando o widget não está carregado */}
      {!widgetLoaded && !error && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-400 font-medium">Carregando Scanner MTM...</p>
          </div>
        </div>
      )}

      {/* Overlay para usuários não autenticados */}
      {!isAuthenticated && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-20">
          <div className="text-center max-w-md p-6 bg-gray-900 rounded-lg border border-gold-500/30">
            <h3 className="text-xl font-bold text-gold-500 mb-4">Acesso Restrito</h3>
            <p className="text-white mb-6">
              Para acessar os scanners MTM, é necessário ser um membro registrado. Faça login ou registre-se para
              continuar.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black">Entrar</Button>
              <Button variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-500/10">
                Registrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
