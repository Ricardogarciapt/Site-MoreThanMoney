"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, type LucideIcon } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

interface SidebarProps {
  navItems?: NavItem[]
}

const defaultNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: Home,
    description: "Overview and statistics",
  },
]

const Sidebar: React.FC<SidebarProps> = ({ navItems = [] }) => {
  const pathname = usePathname()
  const router = useRouter()

  // Safely combine nav items with null check
  const allNavItems = [...defaultNavItems, ...(navItems || [])]

  const handleNavigation = (href: string) => {
    console.log("Navegando para:", href)
    router.push(href)
  }

  return (
    <div className="w-64 bg-white shadow-lg border-r flex-shrink-0 h-screen sticky top-0">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-2">
          {allNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-auto p-3",
                  isActive && "bg-blue-600 text-white hover:bg-blue-700",
                )}
                onClick={() => handleNavigation(item.href)}
              >
                <Icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{item.title}</div>
                  {item.description && (
                    <div className={cn("text-xs opacity-70", isActive ? "text-blue-100" : "text-gray-500")}>
                      {item.description}
                    </div>
                  )}
                </div>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Sidebar
