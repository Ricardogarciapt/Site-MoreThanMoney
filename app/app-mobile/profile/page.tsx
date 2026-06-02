"use client"

import { User, Shield, Bell, CreditCard, LogOut, ChevronRight, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

const MENU_ITEMS = [
  { icon: Shield, label: "Subscrição", sub: "Gerir plano ativo", href: "#" },
  { icon: Bell, label: "Notificações", sub: "Alertas e sinais", href: "#" },
  { icon: CreditCard, label: "Pagamentos", sub: "Histórico de pagamentos", href: "#" },
]

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/app-mobile")
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 gap-5">
        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
          <User size={28} className="text-gray-500" />
        </div>
        <div className="text-center">
          <p className="font-bold text-white text-lg">Não autenticado</p>
          <p className="text-gray-400 text-sm mt-1">Faz login para aceder ao perfil</p>
        </div>
        <button
          onClick={() => router.push("/app-mobile")}
          className="bg-gold-500 text-black font-bold px-6 py-3 rounded-xl w-full"
        >
          Fazer Login
        </button>
      </div>
    )
  }

  const roleLabel = (user as any)?.role === "member_app"
    ? "Member APP"
    : (user as any)?.role === "member_iqonic"
    ? "Member IQonic"
    : (user as any)?.role === "member_skool"
    ? "Skool Member"
    : "Membro"

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-none">
          <span className="text-black font-bold text-xl">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white">{user?.name || "Utilizador"}</p>
          <p className="text-gray-400 text-xs mt-0.5">@{user?.username || "user"}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={10} className="text-gold-400 fill-gold-400" />
            <span className="text-[10px] text-gold-400 font-semibold">{roleLabel}</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {MENU_ITEMS.map(({ icon: Icon, label, sub }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3.5 text-left hover:border-gray-700 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center flex-none">
              <Icon size={16} className="text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
            </div>
            <ChevronRight size={14} className="text-gray-600 flex-none" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl py-3.5 font-semibold text-sm hover:bg-red-500/20 transition-colors"
      >
        <LogOut size={16} />
        Terminar sessão
      </button>
    </div>
  )
}
