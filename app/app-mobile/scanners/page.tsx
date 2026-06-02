"use client"

import { useState } from "react"
import { BarChart2, LineChart, TrendingUp, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const SCANNERS = [
  {
    id: "gold-killer",
    name: "MTM Gold Killer",
    symbol: "XAUUSD",
    desc: "Scanner especializado em ouro",
    badge: "PRO",
    badgeColor: "bg-gold-500 text-black",
  },
  {
    id: "forex-scanner",
    name: "Forex Scanner",
    symbol: "EUR/USD, GBP/USD...",
    desc: "Análise multi-par de forex",
    badge: "LIVE",
    badgeColor: "bg-green-500 text-black",
  },
  {
    id: "crypto-scanner",
    name: "Crypto Scanner",
    symbol: "BTC, ETH, ALTs",
    desc: "Mercado cripto em tempo real",
    badge: "BETA",
    badgeColor: "bg-blue-500 text-white",
  },
]

export default function ScannersPage() {
  const [active, setActive] = useState("gold-killer")

  return (
    <div className="px-4 py-5 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Scanners</h1>
        <p className="text-gray-400 text-xs mt-1">Ferramentas de análise de mercado</p>
      </div>

      {/* Scanner selector */}
      <div className="space-y-2">
        {SCANNERS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all",
              active === s.id
                ? "bg-gold-500/10 border-gold-500/50"
                : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-none",
              active === s.id ? "bg-gold-500/20" : "bg-gray-800"
            )}>
              <BarChart2 size={18} className={active === s.id ? "text-gold-400" : "text-gray-500"} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-white">{s.name}</span>
                <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full", s.badgeColor)}>
                  {s.badge}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
            </div>
            {active === s.id && (
              <div className="w-2 h-2 rounded-full bg-gold-400 flex-none" />
            )}
          </button>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LineChart size={14} className="text-gold-400" />
            <span className="text-sm font-semibold text-white">
              {SCANNERS.find(s => s.id === active)?.symbol}
            </span>
          </div>
          <button className="text-gray-500 hover:text-gray-300">
            <ExternalLink size={14} />
          </button>
        </div>
        <div className="h-52 flex items-center justify-center text-gray-600 gap-2">
          <TrendingUp size={20} className="opacity-40" />
          <span className="text-sm">Gráfico TradingView</span>
        </div>
      </div>

      <p className="text-[10px] text-gray-600 text-center">
        Acede ao scanner completo no painel web
      </p>
    </div>
  )
}
