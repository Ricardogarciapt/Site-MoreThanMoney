"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  BarChart3,
  FileText,
  Zap,
  BookOpen,
  Star,
  Wallet,
  ChevronDown,
  ChevronRight,
  Database,
  Cpu,
  Send,
  Briefcase,
  LineChart,
  Video,
  TrendingUp,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SidebarNavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: SidebarNavItem[]
  expanded?: boolean
}

export default function AdminSidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()
  const [navItems, setNavItems] = useState<SidebarNavItem[]>([
    {
      title: "Dashboard",
      href: "/admin-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Estatísticas",
      href: "/admin-dashboard/statistics",
      icon: BarChart3,
    },
    {
      title: "Usuários",
      href: "/admin-dashboard/user-roles",
      icon: Users,
    },
    {
      title: "Produtos",
      href: "/admin-dashboard/products-manager",
      icon: ShoppingCart,
    },
    {
      title: "Testemunhos",
      href: "/admin-dashboard/testimonials-manager",
      icon: Star,
    },
    {
      title: "Vídeos",
      href: "/admin-dashboard/videos-manager",
      icon: Video,
    },
    {
      title: "Cursos",
      href: "/admin-dashboard/courses-manager",
      icon: BookOpen,
    },
    {
      title: "Afiliados",
      href: "/admin-dashboard/affiliate-manager",
      icon: Briefcase,
      expanded: false,
      submenu: [
        {
          title: "Dashboard",
          href: "/admin-dashboard/affiliate-manager",
          icon: LayoutDashboard,
        },
        {
          title: "Comissões",
          href: "/admin-dashboard/affiliate-manager/commissions",
          icon: Wallet,
        },
        {
          title: "Relatórios",
          href: "/admin-dashboard/affiliate-manager/reports",
          icon: FileText,
        },
      ],
    },
    {
      title: "CopyTrading",
      href: "/admin-dashboard/copytrading-manager",
      icon: LineChart,
      expanded: false,
      submenu: [
        {
          title: "Dashboard",
          href: "/admin-dashboard/copytrading-manager",
          icon: LayoutDashboard,
        },
        {
          title: "Planos",
          href: "/admin-dashboard/planos-copytrading",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "Telegram",
      href: "/admin-dashboard/telegram-manager",
      icon: Send,
      expanded: false,
      submenu: [
        {
          title: "Configurações",
          href: "/admin-dashboard/telegram-manager",
          icon: Settings,
        },
        {
          title: "Teste",
          href: "/admin-dashboard/telegram-test",
          icon: Zap,
        },
      ],
    },
    {
      title: "MetaTrader API",
      href: "/admin-dashboard/metatrader-api",
      icon: Cpu,
    },
    {
      title: "Configurações",
      href: "/admin-dashboard/site-settings",
      icon: Settings,
    },
    {
      title: "Variáveis de Ambiente",
      href: "/admin-dashboard/environment-variables",
      icon: Database,
    },
    {
      title: "Status do Sistema",
      href: "/admin-dashboard/system-status",
      icon: Zap,
    },
  ])

  const toggleSubmenu = (index: number) => {
    setNavItems((prev) => prev.map((item, i) => (i === index ? { ...item, expanded: !item.expanded } : item)))
  }

  const allNavItems = navItems.flatMap((item) => (item.submenu ? [item, ...item.submenu] : [item]))

  return (
    <div className={cn("w-48 bg-black text-white border-r border-gray-800", className)} {...props}>
      <div className="py-4 border-b border-gray-800">
        <div className="px-4 flex items-center justify-center">
          <Link href="/admin-dashboard" className="flex items-center">
            <span className="text-xl font-bold">Admin</span>
          </Link>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <div key={item.href} className="space-y-1">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      )}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </div>
                      {item.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {item.expanded && item.submenu && (
                      <div className="ml-4 space-y-1 pt-1">
                        {item.submenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href
                          const SubIcon = subItem.icon
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isSubActive
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
                              )}
                            >
                              <SubIcon className="h-4 w-4 mr-2" />
                              <span>{subItem.title}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
