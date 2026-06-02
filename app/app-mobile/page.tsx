"use client"

import { useRouter } from "next/navigation"
import { MessageSquare, BarChart2, TrendingUp, Bell, ArrowRight, Activity } from "lucide-react"

const quickLinks = [
  {
    label: "Trade Ideas",
    desc: "Mensagens do canal MTM",
    icon: MessageSquare,
    href: "/app-mobile/chat",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    label: "Scanners",
    desc: "Análise de mercado",
    icon: BarChart2,
    href: "/app-mobile/scanners",
    color: "from-green-500/20 to-green-600/10 border-green-500/30",
    iconColor: "text-green-400",
  },
  {
    label: "Copytrading",
    desc: "Portfólios ativos",
    icon: TrendingUp,
    href: "/app-mobile/copytrading",
    color: "from-gold-500/20 to-gold-600/10 border-gold-500/30",
    iconColor: "text-gold-400",
  },
]

export default function AppMobileHome() {
  const router = useRouter()

  return (
    <div className="px-4 py-5 space-y-6">
      {/* Welcome */}
      <div>
        <p className="text-gray-400 text-sm">Bem-vindo de volta</p>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
        <Activity size={16} className="text-green-400" />
        <span className="text-green-400 text-sm font-medium">Mercados abertos</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Acesso rápido</h2>
        <div className="space-y-3">
          {quickLinks.map(({ label, desc, icon: Icon, href, color, iconColor }) => (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`w-full flex items-center gap-4 bg-gradient-to-r ${color} border rounded-xl px-4 py-3.5 text-left transition-all active:scale-98`}
            >
              <div className={`${iconColor} flex-none`}>
                <Icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-500 flex-none" />
            </button>
          ))}
        </div>
      </div>

      {/* Notifications CTA */}
      <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Bell size={20} className="text-gold-400 flex-none mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">Notificações do bot</p>
            <p className="text-xs text-gray-400 mt-1">
              O bot @MoreThanMoney_aibot publica sinais e ideias nos chats em tempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
