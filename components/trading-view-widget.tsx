"use client"

import { useEffect, useRef, useState } from "react"

export default function TradingViewWidgetWithFallback() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
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
        })
        setWidgetLoaded(true)
      }
    }

    containerRef.current.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="w-full h-[600px] relative">
      {/* Widget (JS) */}
      <div
        ref={containerRef}
        className={`w-full h-full ${widgetLoaded ? "block" : "hidden"}`}
      >
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
    </div>
  )
}
