"use client"

import { useEffect, useRef } from "react"

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = () => {
        if (typeof window.TradingView !== "undefined") {
          new window.TradingView.widget({
            autosize: true,
            symbol: "OANDA:XAUUSD",
            interval: "D",
            timezone: "Europe/London",
            theme: "dark",
            style: "1",
            locale: "br",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_widget",
          })
        }
      }
      containerRef.current.appendChild(script)

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [])

  return (
    <div className="w-full h-[600px]" ref={containerRef}>
      <div id="tradingview_widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  )
}
