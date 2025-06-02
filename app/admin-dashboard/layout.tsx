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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        <Sidebar navItems={navItems} />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4 pb-20">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboardLayout
