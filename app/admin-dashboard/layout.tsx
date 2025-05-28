import type React from "react"
import type { Metadata } from "next"
import Sidebar from "@/components/admin-sidebar"
import { MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the application.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

const navItems = [
  {
    title: "Telegram Bot",
    href: "/admin-dashboard/telegram-test",
    icon: MessageSquare,
    description: "Testar integração com Telegram",
  },
]

const AdminDashboardLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar navItems={navItems} />
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

export default AdminDashboardLayout
