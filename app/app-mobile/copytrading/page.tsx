"use client"

import { TrendingUp, BarChart2, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

const PORTFOLIOS = [
  {
    name: "Conservative",
    gain: "+12.4%",
    positive: true,
    drawdown: "-2.1%",
    traders: 3,
    desc: "Baixo risco · Médio prazo",
  },
  {
    name: "Balanced",
    gain: "+28.7%",
    positive: true,
    drawdown: "-5.8%",
    traders: 5,
    desc: "Risco moderado · Multi-par",
  },
  {
    name: "Aggressive",
    gain: "+54.2%",
    positive: true,
    drawdown: "-12.3%",
    traders: 7,
    desc: "Alto risco · Curto prazo",
  },
]

export default function CopytradingPage() {
  return (
    <div className="px-4 py-5 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Copytrading</h1>
        <p className="text-gray-400 text-xs mt-1">Portfólios disponíveis</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Portfólios", value: "3", icon: BarChart2 },
          { label: "Traders", value: "15+", icon: Users },
          { label: "Avg Gain", value: "+31%", icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-gray-900/50 border border-gray-800 rounded-xl px-3 py-3 text-center">
            <Icon size={14} className="text-gold-400 mx-auto mb-1" />
            <p className="text-base font-bold text-white">{value}</p>
            <p className="text-[10px] text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Portfolios */}
      <div className="space-y-3">
        {PORTFOLIOS.map((p) => (
          <div
            key={p.name}
            className="bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">{p.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <ArrowUpRight size={14} className="text-green-400" />
                  <span className="text-green-400 font-bold text-sm">{p.gain}</span>
                </div>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <ArrowDownRight size={14} className="text-red-400" />
                  <span className="text-red-400 text-xs">{p.drawdown}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-500">
                <Users size={12} />
                <span className="text-xs">{p.traders} traders</span>
              </div>
              <button className="text-xs bg-gold-500/10 border border-gold-500/30 text-gold-400 px-3 py-1 rounded-full font-semibold hover:bg-gold-500/20 transition-colors">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
