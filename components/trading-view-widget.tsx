"use client"

import { useEffect, useRef, useState, useCallback } from "react" // Added useCallback
import { useAuth } from "@/contexts/auth-context"
// useConfigStore is not used in this snippet, remove if not used elsewhere in the full file
// import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertCircle,
  Maximize2,
  TrendingUp,
  Zap,
  Search,
  Crown,
  Waves,
  Brain,
  DollarSign,
  Crosshair,
  BarChart3,
  Shield,
  Skull,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const scannerStudies: Record<string, string[]> = {
  MoreThanMoney: ["script/WCjsFqLh-MoreThanMoney-Scanner-V3-4/"],
  MTMGoldKiller: ["script/DeXfIkiK-MTM-Gold-Killer-V2-1/"],
  GoldenZone: ["PUB;0b373fb0e6634a73bc8b838cf0690725"],
  Momentum: ["PUB;00ec48baf0ee43f0a43e1658bb54cdab", "PUB;38080827cf244587b5e7dbb9f272db0a"],
  Smartmonics: ["PUB;ec7a7c1c91c645519b35b9505b4169a9", "PUB;5bdd7bb857ba48d68bf573c3fe0a08c3"],
  MoneyFlow: ["PUB;cfb67dca49e94b5ca341ab4c1bcf4d37", "PUB;b7b3fe63710742cb9f7db5bfa9695e5a"],
  PriceTrap: ["PUB;ba1af294fd5047fbbf5cfd0f66697725"],
  SmartMoney: ["PUB;e378ef7473b14614a6b1fc5d4bba8061", "PUB;c4c0ec8c41b94497af0b385320c73964"],
  KillShot: ["PUB;e27eb354ed22477295be9c628e937a89"],
  PriceIndex: ["PUB;f69d6a362b144d35a921707e4492d5c5", "PUB;4c1f3d8d7f314e2e9dcd28b1f707752e"],
  SRMTM: ["PUB;NXS6SoOdr880Hrvh9vA36UcAjC14bOkc"],
}

const scannerLabels: Record<string, string> = {
  MoreThanMoney: "MoreThanMoney",
  MTMGoldKiller: "GoldKiller",
  GoldenZone: "Golden Zone",
  Momentum: "Momentum",
  Smartmonics: "Smartmonics",
  MoneyFlow: "MoneyFlow",
  PriceTrap: "Price Trap",
  SmartMoney: "SmartMoney",
  KillShot: "Kill Shot",
  PriceIndex: "Price Index",
  SRMTM: "SR MTM",
}

const scannerLogos: Record<string, { icon: any; color: string; bgColor: string }> = {
  MoreThanMoney: { icon: TrendingUp, color: "text-gold-400", bgColor: "bg-gradient-to-r from-gold-600 to-yellow-500" },
  MTMGoldKiller: { icon: Zap, color: "text-yellow-300", bgColor: "bg-gradient-to-r from-yellow-600 to-orange-500" },
  GoldenZone: { icon: Crown, color: "text-gold-300", bgColor: "bg-gradient-to-r from-gold-500 to-yellow-400" },
  Momentum: { icon: Waves, color: "text-blue-300", bgColor: "bg-gradient-to-r from-blue-600 to-cyan-500" },
  Smartmonics: { icon: Brain, color: "text-purple-300", bgColor: "bg-gradient-to-r from-purple-600 to-pink-500" },
  MoneyFlow: { icon: DollarSign, color: "text-green-300", bgColor: "bg-gradient-to-r from-green-600 to-emerald-500" },
  PriceTrap: { icon: Crosshair, color: "text-orange-300", bgColor: "bg-gradient-to-r from-orange-600 to-red-500" },
  SmartMoney: { icon: Search, color: "text-teal-300", bgColor: "bg-gradient-to-r from-teal-600 to-cyan-500" },
  KillShot: { icon: Skull, color: "text-gray-300", bgColor: "bg-gradient-to-r from-gray-600 to-slate-500" },
  PriceIndex: { icon: BarChart3, color: "text-indigo-300", bgColor: "bg-gradient-to-r from-indigo-600 to-purple-500" },
  SRMTM: { icon: Shield, color: "text-blue-300", bgColor: "bg-gradient-to-r from-blue-600 to-indigo-500" },
}

declare global {
  interface Window {
    TradingView?: any
  }
}

const WIDGET_INTERNAL_CONTAINER_ID = "tradingview_widget_internal_container"
const TRADINGVIEW_SCRIPT_ID = "tradingview-widget-script"

export default function TradingViewWidget({ scannerType = "MoreThanMoney" }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const widgetRef = useRef<any>(null)
  const isLoadingScanner = useRef(false)
  // const { config } = useConfigStore(); // Remove if not used

  const [selectedStudies, setSelectedStudies] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const last = localStorage.getItem("activeStudies")
      return last ? JSON.parse(last) : [scannerType]
    }
    return [scannerType] // Default for SSR or if localStorage is not available
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeStudies", JSON.stringify(selectedStudies))
    }
  }, [selectedStudies])

  const handleFullScreen = () => {
    const elem = containerRef.current?.querySelector(`#${WIDGET_INTERNAL_CONTAINER_ID}`) || containerRef.current
    if (elem?.requestFullscreen) elem.requestFullscreen()
    else if ((elem as any)?.webkitRequestFullscreen) (elem as any).webkitRequestFullscreen()
    else if ((elem as any)?.msRequestFullscreen) (elem as any).msRequestFullscreen()
  }

  const toggleStudy = (study: string) => {
    setSelectedStudies((prev) => (prev.includes(study) ? prev.filter((s) => s !== study) : [...prev, study]))
  }

  const destroyWidget = useCallback(() => {
    if (widgetRef.current && typeof widgetRef.current.remove === "function") {
      try {
        widgetRef.current.remove()
      } catch (e) {
        console.error("Error removing widget:", e)
      }
    }
    widgetRef.current = null
    // Clear the specific internal container
    if (containerRef.current) {
      const internalContainer = containerRef.current.querySelector(`#${WIDGET_INTERNAL_CONTAINER_ID}`)
      if (internalContainer) {
        internalContainer.innerHTML = ""
      }
    }
  }, [])

  const loadTradingViewWidget = useCallback(async () => {
    if (!isAuthenticated) {
      setWidgetLoaded(false)
      destroyWidget() // Ensure cleanup if user logs out
      return
    }
    if (!window.TradingView) {
      setError("TradingView library not available.")
      setWidgetLoaded(false)
      return
    }
    if (!containerRef.current) {
      setError("Widget container ref not available.")
      setWidgetLoaded(false)
      return
    }
    if (isLoadingScanner.current) return

    isLoadingScanner.current = true
    setWidgetLoaded(false)
    setError(null)

    // Ensure previous widget is fully destroyed before creating a new one
    destroyWidget()

    try {
      let targetDiv = containerRef.current.querySelector(`#${WIDGET_INTERNAL_CONTAINER_ID}`) as HTMLElement | null
      if (!targetDiv) {
        targetDiv = document.createElement("div")
        targetDiv.id = WIDGET_INTERNAL_CONTAINER_ID
        targetDiv.style.height = "100%"
        targetDiv.style.width = "100%"
        containerRef.current.appendChild(targetDiv)
      } else {
        targetDiv.innerHTML = "" // Clear if it exists
      }

      const studiesToApply = selectedStudies.flatMap((key) => scannerStudies[key] || [])
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
        container_id: WIDGET_INTERNAL_CONTAINER_ID,
        studies: studiesToApply,
        disabled_features: [
          "study_dialog_search_control",
          "study_templates",
          "study_template_dialog",
          "edit_buttons_in_legend",
          "context_menus",
          "left_toolbar",
          "header_settings",
          "header_chart_type",
          "header_compare",
          "header_screenshot",
          "header_widget_dom_node",
          "header_widget",
          "header_saveload",
          "header_undo_redo",
          "header_fullscreen_button",
          "use_localstorage_for_settings",
          "right_bar_stays_on_scroll",
          "border_around_the_chart",
          "remove_library_container_border",
        ],
        enabled_features: ["study_on_study"],
      }

      const newWidget = new window.TradingView.widget(widgetOptions)
      const currentWidgetInstance = newWidget // Capture instance for callbacks
      widgetRef.current = newWidget

      newWidget.onChartReady(() => {
        if (widgetRef.current === currentWidgetInstance) {
          setWidgetLoaded(true)
        }
        isLoadingScanner.current = false
      })

      newWidget.onError((_errorDetails: any) => {
        if (widgetRef.current === currentWidgetInstance) {
          console.error("TradingView Widget Error:", _errorDetails)
          setError(`Erro no widget TradingView.`)
          setWidgetLoaded(false)
        }
        isLoadingScanner.current = false
      })
    } catch (err: any) {
      console.error("Erro ao inicializar widget:", err)
      setError(`Erro ao inicializar widget: ${err.message}`)
      isLoadingScanner.current = false
      setWidgetLoaded(false)
    }
  }, [isAuthenticated, selectedStudies, destroyWidget]) // Added destroyWidget to dependencies

  useEffect(() => {
    const initAndLoad = () => {
      if (isAuthenticated) {
        if (window.TradingView && !widgetRef.current) {
          loadTradingViewWidget()
        } else if (!window.TradingView) {
          // Retry if script not loaded yet
          setTimeout(initAndLoad, 100)
        }
      } else {
        destroyWidget() // Cleanup if not authenticated
      }
    }

    if (isAuthenticated) {
      const scriptElement = document.getElementById(TRADINGVIEW_SCRIPT_ID)
      if (!scriptElement) {
        const script = document.createElement("script")
        script.id = TRADINGVIEW_SCRIPT_ID
        script.src = "https://s3.tradingview.com/tv.js"
        script.async = true
        script.onload = initAndLoad
        script.onerror = () => {
          setError("Falha ao carregar o script do TradingView.")
          setWidgetLoaded(false)
        }
        document.head.appendChild(script)
      } else {
        initAndLoad() // Script exists, just init
      }
    } else {
      destroyWidget() // Not authenticated, ensure cleanup
    }

    return () => {
      // Unmount cleanup
      destroyWidget()
      // Note: Script tag is usually not removed to avoid issues if other components use it
      // or if this component re-mounts quickly.
    }
  }, [isAuthenticated, loadTradingViewWidget, destroyWidget]) // Added destroyWidget

  // Effect for handling changes in selected studies, only if authenticated and widget was loaded
  useEffect(() => {
    if (isAuthenticated && window.TradingView && widgetRef.current) {
      // If studies change, and widget exists, reload it.
      // loadTradingViewWidget already handles destroying the old one.
      loadTradingViewWidget()
    }
  }, [selectedStudies, isAuthenticated, loadTradingViewWidget]) // Ensure all dependencies are covered

  return (
    <div className="w-full h-[800px] relative bg-gray-900 border border-gold-500/30 rounded-lg overflow-hidden mb-4">
      {error && (
        <Alert className="absolute top-2 left-2 right-2 z-20 bg-red-500/20 border-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-gray-800/98 via-gray-900/98 to-gray-800/98 backdrop-blur-md py-3 px-4 pb-6 border-b border-gold-500/40 shadow-lg shadow-black/20">
        <div className="flex flex-nowrap gap-3 overflow-x-auto pb-3 mb-2 scrollbar-thin scrollbar-thumb-gold-500/60 scrollbar-track-gray-700/30">
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
                    ? `${logo.bgColor} text-white shadow-xl shadow-black/60 ring-2 ring-gold-400/50`
                    : "bg-gray-700/90 text-gray-300 hover:bg-gray-600/90 hover:shadow-lg hover:shadow-black/40"
                } border border-gray-600/60 hover:border-gray-500/80 px-3 py-2 rounded-lg flex items-center gap-2 text-sm whitespace-nowrap flex-shrink-0 backdrop-blur-sm`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleStudy(key)} // Keep this for direct checkbox click
                  className="border-white bg-white/10 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-600" // Shadcn style for checked
                />
                <Icon className={`w-3 h-3 ${isChecked ? "text-white" : logo.color}`} />
                <span>{scannerLabels[key]}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* This outer div is for layout and fullscreen context */}
      <div
        ref={containerRef}
        className="w-full h-full pt-20" // pt-20 is important for layout
        style={{ visibility: widgetLoaded && isAuthenticated ? "visible" : "hidden" }}
      >
        {/* The TradingView widget will be appended inside this div by loadTradingViewWidget
          using WIDGET_INTERNAL_CONTAINER_ID */}
      </div>
      <button
        onClick={handleFullScreen}
        className="absolute top-2 right-2 z-40 bg-gray-800/90 hover:bg-gray-700/90 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-600/50 hover:border-gray-500"
        aria-label="Toggle fullscreen"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      {!widgetLoaded &&
        isAuthenticated &&
        !error && ( // Only show loader if authenticated and no error
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
              {/* TODO: Implement actual login/register navigation or modal */}
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
