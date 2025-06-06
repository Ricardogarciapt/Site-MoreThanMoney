"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertCircle,
  TrendingUp,
  Zap,
  Search,
  Crown,
  Waves,
  Brain,
  Crosshair,
  BarChart3,
  Shield,
  Skull,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"

const scannerStudies: Record<string, string[]> = {
  MoreThanMoney: ["script/WCjsFqLh-MoreThanMoney-Scanner-V3-4/"],
  MTMGoldKiller: ["script/DeXfIkiK-MTM-Gold-Killer-V2-1/"],
  GoldenZone: ["PUB;0b373fb0e6634a73bc8b838cf0690725"],
  Momentum: ["PUB;00ec48baf0ee43f0a43e1658bb54cdab", "PUB;38080827cf244587b5e7dbb9f272db0a"],
  Smartmonics: ["PUB;ec7a7c1c91c645519b35b9505b4169a9", "PUB;5bdd7bb857ba48d68bf573c3fe0a08c3"],
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
  PriceTrap: "Price Trap",
  SmartMoney: "SmartMoney",
  KillShot: "Kill Shot",
  PriceIndex: "Price Index",
  SRMTM: "SR MTM",
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
  GoldenZone: {
    icon: Crown,
    color: "text-gold-300",
    bgColor: "bg-gradient-to-r from-gold-500 to-yellow-400",
  },
  Momentum: {
    icon: Waves,
    color: "text-blue-300",
    bgColor: "bg-gradient-to-r from-blue-600 to-cyan-500",
  },
  Smartmonics: {
    icon: Brain,
    color: "text-purple-300",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-500",
  },
  PriceTrap: {
    icon: Crosshair,
    color: "text-orange-300",
    bgColor: "bg-gradient-to-r from-orange-600 to-red-500",
  },
  SmartMoney: {
    icon: Search,
    color: "text-teal-300",
    bgColor: "bg-gradient-to-r from-teal-600 to-cyan-500",
  },
  KillShot: {
    icon: Skull,
    color: "text-gray-300",
    bgColor: "bg-gradient-to-r from-gray-600 to-slate-500",
  },
  PriceIndex: {
    icon: BarChart3,
    color: "text-indigo-300",
    bgColor: "bg-gradient-to-r from-indigo-600 to-purple-500",
  },
  SRMTM: {
    icon: Shield,
    color: "text-blue-300",
    bgColor: "bg-gradient-to-r from-blue-600 to-indigo-500",
  },
}

// Ativos organizados por categoria
const assetCategories = {
  forex: [
    { value: "OANDA:EURUSD", label: "EURUSD" },
    { value: "OANDA:USDJPY", label: "USDJPY" },
    { value: "OANDA:GBPUSD", label: "GBPUSD" },
    { value: "OANDA:AUDUSD", label: "AUDUSD" },
    { value: "OANDA:USDCAD", label: "USDCAD" },
    { value: "OANDA:USDCHF", label: "USDCHF" },
    { value: "OANDA:NZDUSD", label: "NZDUSD" },
    { value: "OANDA:EURGBP", label: "EURGBP" },
    { value: "OANDA:EURJPY", label: "EURJPY" },
    { value: "OANDA:GBPJPY", label: "GBPJPY" },
    { value: "OANDA:AUDJPY", label: "AUDJPY" },
    { value: "OANDA:CHFJPY", label: "CHFJPY" },
    { value: "OANDA:USDSGD", label: "USDSGD" },
    { value: "OANDA:EURAUD", label: "EURAUD" },
    { value: "OANDA:NZDJPY", label: "NZDJPY" },
    { value: "OANDA:GBPCAD", label: "GBPCAD" },
    { value: "OANDA:AUDCAD", label: "AUDCAD" },
    { value: "OANDA:EURCHF", label: "EURCHF" },
    { value: "OANDA:EURCAD", label: "EURCAD" },
    { value: "OANDA:GBPNZD", label: "GBPNZD" },
    { value: "OANDA:AUDNZD", label: "AUDNZD" },
  ],
  crypto: [
    { value: "BINANCE:BTCUSDT", label: "BTCUSD" },
    { value: "BINANCE:ETHUSDT", label: "ETHUSD" },
    { value: "BINANCE:BNBUSDT", label: "BNBUSD" },
    { value: "BINANCE:XRPUSDT", label: "XRPUSD" },
    { value: "BINANCE:ADAUSDT", label: "ADAUSD" },
    { value: "BINANCE:SOLUSDT", label: "SOLUSD" },
    { value: "BINANCE:DOGEUSDT", label: "DOGEUSD" },
    { value: "BINANCE:DOTUSDT", label: "DOTUSD" },
    { value: "BINANCE:AVAXUSDT", label: "AVAXUSD" },
    { value: "BINANCE:LTCUSDT", label: "LTCUSD" },
    { value: "BINANCE:LINKUSDT", label: "LINKUSD" },
    { value: "BINANCE:UNIUSDT", label: "UNIUSD" },
    { value: "BINANCE:SHIBUSDT", label: "SHIBUSD" },
    { value: "BINANCE:XLMUSDT", label: "XLMUSD" },
    { value: "BINANCE:VETUSDT", label: "VETUSD" },
    { value: "BINANCE:TRXUSDT", label: "TRXUSD" },
    { value: "BINANCE:FILUSDT", label: "FILUSD" },
    { value: "BINANCE:ATOMUSDT", label: "ATOMUSD" },
    { value: "BINANCE:MATICUSDT", label: "MATICUSD" },
    { value: "BINANCE:AAVEUSDT", label: "AAVEUSD" },
  ],
  commodities: [
    { value: "OANDA:XAUUSD", label: "Ouro (XAUUSD)" },
    { value: "OANDA:XAGUSD", label: "Prata (XAGUSD)" },
    { value: "TVC:UKOIL", label: "Petróleo Brent" },
    { value: "NYMEX:CL1!", label: "Petróleo WTI" },
    { value: "NYMEX:NG1!", label: "Gás Natural" },
    { value: "COMEX:HG1!", label: "Cobre" },
    { value: "CBOT:ZC1!", label: "Milho" },
  ],
  indices: [
    { value: "SP:SPX", label: "S&P 500" },
    { value: "DJ:DJI", label: "Dow Jones" },
    { value: "NASDAQ:NDX", label: "Nasdaq 100" },
    { value: "XETR:DAX", label: "DAX (Alemanha)" },
    { value: "LSE:UKX", label: "FTSE 100" },
    { value: "TSE:N225", label: "Nikkei 225" },
    { value: "EURONEXT:PX1", label: "CAC 40" },
  ],
}

// Ferramentas de desenho disponíveis
const drawingTools = [
  { id: "trend_line", name: "Linha de Tendência" },
  { id: "horizontal_line", name: "Linha Horizontal" },
  { id: "vertical_line", name: "Linha Vertical" },
  { id: "fib_retracement", name: "Fibonacci" },
  { id: "rectangle", name: "Retângulo" },
  { id: "ellipse", name: "Elipse" },
  { id: "pitchfork", name: "Pitchfork" },
  { id: "text", name: "Texto" },
]

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
  const [selectedSymbol, setSelectedSymbol] = useState("OANDA:XAUUSD")

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDrawingTools, setShowDrawingTools] = useState(false)
  const [favoriteTools, setFavoriteTools] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteDrawingTools")
    return saved ? JSON.parse(saved) : ["trend_line", "horizontal_line", "fib_retracement"]
  })

  useEffect(() => {
    localStorage.setItem("activeStudies", JSON.stringify(selectedStudies))
  }, [selectedStudies])

  useEffect(() => {
    localStorage.setItem("favoriteDrawingTools", JSON.stringify(favoriteTools))
  }, [favoriteTools])

  const toggleStudy = (study: string) => {
    setSelectedStudies((prev) => (prev.includes(study) ? prev.filter((s) => s !== study) : [...prev, study]))
  }

  const toggleFavoriteTool = (toolId: string) => {
    setFavoriteTools((prev) => (prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]))
  }

  const handleTradingViewLogin = () => {
    // Abrir popup de login do TradingView
    const loginWindow = window.open(
      "https://www.tradingview.com/accounts/signin/",
      "tradingview_login",
      "width=500,height=600,scrollbars=yes,resizable=yes",
    )

    // Simular login bem-sucedido após 3 segundos (em produção, usar postMessage)
    setTimeout(() => {
      setIsLoggedIn(true)
      loginWindow?.close()
    }, 3000)
  }

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol)
    console.log("Ativo selecionado:", symbol)
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

      const studiesToApply = selectedStudies.flatMap((key) => scannerStudies[key] || [])

      const widgetOptions = {
        autosize: true,
        symbol: selectedSymbol,
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "br",
        toolbar_bg: "#1E1E1E",
        enable_publishing: true,
        allow_symbol_change: true,
        hide_side_toolbar: false,
        withdateranges: true,
        save_image: true,
        container_id: "tradingview_widget",
        studies: studiesToApply,
        studies_overrides: {
          "volume.volume.visible": false, // Hide volume indicator
          "volume.volume ma.visible": false, // Hide volume moving average
          "volume.show ma": false, // Hide volume MA option
        },
        disabled_features: [
          "study_dialog_search_control",
          "study_templates",
          "study_template_dialog",
          "edit_buttons_in_legend",
          "left_toolbar",
          "header_settings",
          "header_chart_type",
          "header_compare",
          "header_widget_dom_node",
          "header_widget",
          "header_saveload",
          "header_undo_redo",
          "border_around_the_chart",
          "remove_library_container_border",
          // Remover "header_fullscreen_button" para habilitar o botão de fullscreen nativo
          "volume_force_overlay",
          "create_volume_indicator_by_default",
        ],
        enabled_features: [
          "study_on_study",
          "save_chart_properties_to_local_storage",
          "create_volume_indicator_by_default_off",
          "use_localstorage_for_settings",
          "header_screenshot",
          "show_chart_property_page",
          "property_pages",
          "right_bar_stays_on_scroll",
          "context_menus", // Habilitar menu de contexto
          "create_alerts_on_drawings",
          "alert_on_bar",
          "paper_trading",
          "trading_notifications",
          "watchlist_context_menu",
          "drawing_templates", // Habilitar templates de desenho
          "caption_buttons_text_if_possible", // Mostrar texto nos botões quando possível
          "chart_property_page_trading", // Página de propriedades de trading
          "chart_property_page_style", // Página de propriedades de estilo
          "show_favorite_drawings_toolbar", // Mostrar barra de ferramentas de desenhos favoritos
          "chart_property_page_scales", // Página de propriedades de escalas
          "header_fullscreen_button", // Adicionar explicitamente o botão de fullscreen
          "header_symbol_search", // Adicionar busca de símbolos
          "header_resolutions", // Adicionar seleção de timeframes
          "header_indicators", // Adicionar botão de indicadores
          "header_screenshot", // Adicionar botão de screenshot
          "header_settings", // Adicionar botão de configurações
          "header_chart_type", // Adicionar seleção de tipo de gráfico
          "header_compare", // Adicionar comparação de símbolos
          "show_login_dialog", // Mostrar diálogo de login
          "sharing_native", // Habilitar compartilhamento nativo
          "mouse_wheel_scale", // Enable mouse wheel scaling/scrolling
          "scroll_time_scale", // Enable time scale scrolling
          "zoom_widget", // Enable zoom functionality
        ],
        charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        loading_screen: { backgroundColor: "#1E1E1E", foregroundColor: "#f9b208" },
        overrides: {
          "mainSeriesProperties.showCountdown": true,
          "scalesProperties.showSeriesLastValue": true,
          "scalesProperties.showStudyLastValue": true,
          "mainSeriesProperties.priceAxisProperties.autoScale": true,
        },
        time_frames: [
          { text: "5m", resolution: "5" },
          { text: "15m", resolution: "15" },
          { text: "1h", resolution: "60" },
          { text: "4h", resolution: "240" },
          { text: "1d", resolution: "D" },
        ],
        drawings_access: {
          type: "all",
          tools: favoriteTools.map((toolId) => ({ name: toolId })),
        },
        favorites: {
          intervals: ["5", "15", "60", "240", "D"],
          chartTypes: ["candle", "line"],
          drawings: favoriteTools,
        },
        watchlist: {
          symbols: [
            {
              name: "OANDA:XAUUSD",
              description: "Gold",
            },
            {
              name: "OANDA:EURUSD",
              description: "Euro / US Dollar",
            },
            {
              name: "BINANCE:BTCUSDT",
              description: "Bitcoin",
            },
            {
              name: "BINANCE:ETHUSDT",
              description: "Ethereum",
            },
          ],
          showSymbolLogo: true,
          isTransparent: false,
          displayMode: "regular",
          width: "250",
          height: "500",
          verticalEnabled: true,
          dateFormat: "dd MMM 'yy",
        },
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
  }, [selectedStudies, favoriteTools, selectedSymbol])

  return (
    <div className="w-full h-[900px] relative bg-gray-900 border border-gold-500/30 rounded-lg overflow-hidden flex flex-col">
      {error && (
        <Alert className="absolute top-2 left-2 right-2 z-20 bg-red-500/20 border-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="z-30 bg-gray-800/95 backdrop-blur-sm py-1 px-2 pb-4 border-b border-gold-500/30">
        {/* Barra superior com controles */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <Button
              onClick={handleTradingViewLogin}
              variant="ghost"
              size="sm"
              className={`${isLoggedIn ? "bg-green-600/20 text-green-400" : "bg-gray-700/80 text-gray-300"} border border-gray-600/50 hover:border-gray-500`}
            >
              <LogIn className="w-3 h-3 mr-1" />
              {isLoggedIn ? "Conectado" : "Login TV"}
            </Button>
          </div>

          {/* Dropdown de Ativos */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300 font-medium">Ativo:</span>
            <Select value={selectedSymbol} onValueChange={handleSymbolChange}>
              <SelectTrigger className="w-[280px] bg-gray-700/80 border-gray-600/50 text-white">
                <SelectValue placeholder="Selecione um ativo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600 text-white max-h-[400px]">
                <SelectGroup>
                  <SelectLabel className="text-gold-400 font-semibold">Forex - Principais Pares</SelectLabel>
                  {assetCategories.forex.map((asset) => (
                    <SelectItem key={asset.value} value={asset.value} className="hover:bg-gray-700">
                      {asset.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-gold-400 font-semibold">Criptomoedas - Top 20</SelectLabel>
                  {assetCategories.crypto.map((asset) => (
                    <SelectItem key={asset.value} value={asset.value} className="hover:bg-gray-700">
                      {asset.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-gold-400 font-semibold">Commodities - Principais</SelectLabel>
                  {assetCategories.commodities.map((asset) => (
                    <SelectItem key={asset.value} value={asset.value} className="hover:bg-gray-700">
                      {asset.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-gold-400 font-semibold">Índices - Principais</SelectLabel>
                  {assetCategories.indices.map((asset) => (
                    <SelectItem key={asset.value} value={asset.value} className="hover:bg-gray-700">
                      {asset.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Scanners existentes */}
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gold-500/50">
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
                } border border-gray-600/50 hover:border-gray-500 px-1 py-1 rounded-md flex items-center gap-1 text-xs whitespace-nowrap flex-shrink-0`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleStudy(key)}
                  className="border-white bg-white/10"
                />
                <Icon className={`w-3 h-3 ${isChecked ? "text-white" : logo.color}`} />
                <span>{scannerLabels[key]}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Add margin to create separation */}
      <div className="flex-grow relative flex">
        <div
          ref={containerRef}
          className="w-full h-full transition-all duration-300"
          style={{ visibility: widgetLoaded ? "visible" : "hidden" }}
        />
      </div>

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
