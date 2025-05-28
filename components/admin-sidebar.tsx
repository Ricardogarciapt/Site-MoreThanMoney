"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Settings, Users, BarChart3 } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

interface SidebarProps {
  navItems?: NavItem[]
}

const Sidebar: React.FC<SidebarProps> = ({ navItems = [] }) => {
  const pathname = usePathname()

  const defaultNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/admin-dashboard",
      icon: Home,
      description: "Overview and statistics",
    },
    {
      title: "Statistics",
      href: "/admin-dashboard/statistics",
      icon: BarChart3,
      description: "View platform statistics",
    },
    {
      title: "User Roles",
      href: "/admin-dashboard/user-roles",
      icon: Users,
      description: "Manage user permissions",
    },
    {
      title: "Site Settings",
      href: "/admin-dashboard/site-settings",
      icon: Settings,
      description: "Configure site settings",
    },
  ]

  const allNavItems = [...defaultNavItems, ...navItems]

  return (
    <div className="w-64 bg-white shadow-lg border-r h-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-80px)]">
        {allNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-auto p-3",
                  isActive && "bg-blue-600 text-white hover:bg-blue-700",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div className="text-left flex-1">
                  <div className="font-medium">{item.title}</div>
                  {item.description && (
                    <div className={cn("text-xs opacity-70", isActive ? "text-blue-100" : "text-gray-500")}>
                      {item.description}
                    </div>
                  )}
                </div>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
