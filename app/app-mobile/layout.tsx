"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, MessageSquare, BarChart2, TrendingUp, User } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Home", icon: Home, href: "/app-mobile" },
  { label: "Chat", icon: MessageSquare, href: "/app-mobile/chat" },
  { label: "Scanners", icon: BarChart2, href: "/app-mobile/scanners" },
  { label: "Copytrading", icon: TrendingUp, href: "/app-mobile/copytrading" },
  { label: "Perfil", icon: User, href: "/app-mobile/profile" },
]

export default function AppMobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen max-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-4 py-3 border-b border-gold-500/20 bg-black/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <span className="text-black font-bold text-xs">M</span>
          </div>
          <span className="font-bold text-gold-400 text-sm tracking-wide">MoreThanMoney</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Online" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-none border-t border-gold-500/20 bg-black/95 backdrop-blur-sm safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {tabs.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href || (href !== "/app-mobile" && pathname.startsWith(href))
            return (
              <button
                key={href}
                onClick={() => router.push(href)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                  isActive
                    ? "text-gold-400"
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                <Icon size={22} className={cn(isActive && "drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]")} />
                <span className={cn("text-[10px] font-medium", isActive ? "text-gold-400" : "text-gray-500")}>
                  {label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-gold-400" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
