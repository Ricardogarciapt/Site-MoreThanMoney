"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Maximize2, TrendingUp, Zap, Search, Crown, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const scannerStudies: Record<string, string> = {
  MoreThanMoney: "script/WCjsFqLh-MoreThanMoney-Scanner-V3-4/",
  MTMGoldKiller: "script/DeXfIkiK-MTM-Gold-Killer-V2-1/",
  GoldenEra: "PUB;0b373fb0e6634a73bc8b838cf0690725",
  TrendWave: "PUB;38080827cf244587b5e7dbb9f272db0a",
  SmartScanner: "PUB;e378ef7473b14614a6b1fc5d4bba8061",
}

const scannerLabels: Record<string, string> = {
  MoreThanMoney: "MoreThanMoney",
  MTMGoldKiller: "GoldKiller",
  GoldenEra: "GoldenEra",
  TrendWave: "TrendWave",
  SmartScanner: "SmartScanner",
}

const scannerLogos: Record<string, { icon: any; color: string; bgColor: string }> = {
  MoreThanMoney: {
    icon: TrendingUp,
    color: "text-gold-400",
    bgColor: "bg-gradient-to-r from-gold-600 to-yellow-500",
  },
  MTMGoldKiller: {
    icon: Zap,
    color: "text-yellow-300",
    bgColor: "bg-gradient-to-r from-yellow-600 to-orange-500",
  },
  GoldenEra: {
    icon: Crown,
    color: "text-gold-300",
    bgColor: "bg-gradient-to-r from-gold-500 to-yellow-400",
  },
  TrendWave: {
    icon: Waves,
    color: "text-blue-300",
    bgColor: "bg-gradient-to-r from-blue-600 to-cyan-500",
  },
  SmartScanner: {
    icon: Search,
    color: "text-green-300",
    bgColor: "bg-gradient-to-r from-green-600 to-emerald-500",
  },
}

declare global {
  interface Window {
    TradingView?: any
  }
}

export default function TradingViewWidget({ scannerType = "MoreThanMoney" }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const widgetRef = useRef<any>(null)
  const isLoadingScanner = useRef(false)
  const { config } = useConfigStore()
  const [selectedStudies, setSelectedStudies] = useState<string[]>(() => {
    const last = localStorage.getItem("activeStudies")
    return last ? JSON.parse(last) : [scannerType]
  })

  useEffect(() => {
    localStorage.setItem("activeStudies", JSON.stringify(selectedStudies))
  }, [selectedStudies])

  const handleFullScreen = () => {
    const elem = containerRef.current
    if (elem?.requestFullscreen) elem.requestFullscreen()
    else if ((elem as any)?.webkitRequestFullscreen) (elem as any).webkitRequestFullscreen()
    else if ((elem as any)?.msRequestFullscreen) (elem as any).msRequestFullscreen()
  }

  const toggleStudy = (study: string) => {
    setSelectedStudies((prev) =>
      prev.includes(study) ? prev.filter((s) => s !== study) : [...prev, study]
    )
  }

  const loadTradingViewWidget = async () => {
    if (!window.TradingView) {
      setError("TradingView não está disponível. Tente recarregar a página.")
      return
    }

    if (isLoadingScanner.current) return
    isLoadingScanner.current = true

    try {
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div id="tradingview_widget" style="height: 100%; width: 100%;"></div>'
      }

      const studiesToApply = selectedStudies.map((key) => scannerStudies[key]).filter(Boolean)

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
        container_id: "tradingview_widget",
        studies: studiesToApply,
      }

      widgetRef.current = new window.TradingView.widget(widgetOptions)
      setWidgetLoaded(true)
      setError(null)
    } catch (err: any) {
      console.error("Erro ao inicializar widget:", err)
      setError(`Erro ao inicializar widget: ${err.message}`)
    } finally {
      isLoadingScanner.current = false
    }
  }

  useEffect(() => {
    const loadScript = () => {
      if (document.getElementById("tradingview-script")) {
        init()
        return
      }

      const script = document.createElement("script")
      script.id = "tradingview-script"
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = init
      script.onerror = () => setError("Falha ao carregar o script do TradingView")
      document.head.appendChild(script)
    }

    const init = () => {
      if (!window.TradingView) {
        setTimeout(init, 100)
        return
      }
      loadTradingViewWidget()
    }

    loadScript()

    return () => {
      if (widgetRef.current?.remove) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          console.error("Erro ao remover widget:", e)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (widgetRef.current?.remove) {
      try {
        widgetRef.current.remove()
      } catch (e) {}
    }
    loadTradingViewWidget()
  }, [selectedStudies])

  return (
    <div className="w-full h-[600px] relative bg-gray-900 border border-gold-500/30 rounded-lg overflow-hidden">
      {error && (
        <Alert className="absolute top-2 left-2 right-2 z-20 bg-red-500/20 border-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="absolute top-0 left-0 right-0 z-30 bg-gray-800/95 backdrop-blur-sm py-3 px-4 border-b border-gold-500/30">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {Object.keys(scannerStudies).map((key) => {
            const logo = scannerLogos[key]
            const Icon = logo.icon
            const isChecked = selectedStudies.includes(key)

            return (
              <Button
                key={key}
                onClick={() => toggleStudy(key)}
                variant="ghost"
                className={`transition-all duration-300 transform hover:scale-105 ${
                  isChecked
                    ? `${logo.bgColor} text-white shadow-lg shadow-black/50`
                    : "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                } border border-gray-600/50 hover:border-gray-500 px-4 py-2 rounded-lg flex items-center gap-2`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleStudy(key)}
                  className="border-white bg-white/10"
                />
                <Icon className={`w-4 h-4 ${isChecked ? "text-white" : logo.color}`} />
                <span>{scannerLabels[key]}</span>
              </Button>
            )
          })}

          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gold-500/50 to-transparent mx-2" />

          <button
            onClick={handleFullScreen}
            className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:from-gray-600 hover:to-gray-500 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 border border-gray-600/50 hover:border-gray-500"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="font-medium">Tela Cheia</span>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full pt-16"
        style={{ visibility: widgetLoaded ? "visible" : "hidden" }}
      />

      {!widgetLoaded && !error && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-400 font-medium">Carregando Scanners...</p>
          </div>
        </div>
      )}

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
