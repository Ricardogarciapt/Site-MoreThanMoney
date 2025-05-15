"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function Scanners() {
  return (
    <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Scanner MTM ao Vivo
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Visualiza em tempo real as estruturas de mercado com base no nosso indicador exclusivo 'MoreThanMoney
            Scanner V3.4'. Ideal para iniciantes – sem complicações, só sinais claros.
          </p>
        </div>

        <div className="mt-8 rounded-lg overflow-hidden border border-gold-500/30" style={{ height: "600px" }}>
          <iframe
            src="https://www.tradingview.com/chart/SP3yDryX/?symbol=BYBIT%3ASOLUSDT"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            style={{ border: "none" }}
            title="Scanner MTM"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}
