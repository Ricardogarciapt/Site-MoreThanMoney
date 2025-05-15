"use client"

export default function TradingViewWidget() {
  return (
    <div className="w-full h-[600px]">
      <iframe
        src="https://www.tradingview.com/chart/SP3yDryX/?symbol=OANDA:XAUUSD"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        style={{ border: "none" }}
        title="MTM Scanner - XAUUSD"
      />
    </div>
  )
}
