import { useEffect, useRef, useState } from "react"
import { Maximize2, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import { scannerLogos, scannerStudies, scannerLabels } from "@/data/scanners"

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedStudies, setSelectedStudies] = useState<string[]>([])
  const [symbol, setSymbol] = useState("BTCUSDT")
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true

    script.onload = () => {
      if ((window as any).TradingView) {
        try {
          new (window as any).TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: "15",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "br",
            container_id: containerRef.current?.id,
            studies: selectedStudies,
            withdateranges: true,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: true,
            studies_overrides: {},
            overrides: {},
          })
          setWidgetLoaded(true)
        } catch (e) {
          setError("Erro ao carregar o widget TradingView")
        }
      } else {
        setError("TradingView não disponível")
      }
    }

    script.onerror = () => {
      setError("Erro ao carregar o script do TradingView")
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [selectedStudies, symbol])

  const toggleStudy = (study: string) => {
    setSelectedStudies((prevStudies) =>
      prevStudies.includes(study)
        ? prevStudies.filter((s) => s !== study)
        : [...prevStudies, study]
    )
  }

  const handleFullScreen = () => {
    const elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen()
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen()
    }
  }

  return (
    <div className="w-full h-[800px] relative bg-gray-900 border border-gold-500/30 rounded-lg overflow-hidden flex">
      {/* Painel lateral de símbolos */}
      <div className="w-24 bg-gray-800/90 border-r border-gold-500/30 z-40 flex flex-col items-center py-4 space-y-4">
        {["XAUUSD", "BTCUSDT", "EURUSD", "AAPL", "ETHUSDT"].map((s) => (
          <button
            key={s}
            className="text-xs text-white hover:text-gold-500 hover:scale-105 transition-transform"
            onClick={() => setSymbol(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 relative">
        {error && (
          <Alert className="absolute top-2 left-2 right-2 z-20 bg-red-500/20 border-red-500">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Barra superior de scanners */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gray-800/95 backdrop-blur-sm py-1 px-2 pb-4 border-b border-gold-500/30">
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin scrollbar-thumb-gold-500/50">
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

        {/* Widget TradingView */}
        <div
          id="tradingview_widget"
          ref={containerRef}
          className="w-full h-full pt-16"
          style={{ visibility: widgetLoaded ? "visible" : "hidden" }}
        />

        {/* Botão tela cheia */}
        <button
          onClick={handleFullScreen}
          className="absolute top-2 right-2 z-40 bg-gray-800/90 hover:bg-gray-700/90 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-600/50 hover:border-gray-500"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

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
                Para acessar os scanners MTM, é necessário ser um membro registrado. Faça login ou registre-se para continuar.
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
    </div>
  )
}
