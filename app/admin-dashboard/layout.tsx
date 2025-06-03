import type React from "react"
import type { Metadata } from "next"
import AdminAuthCheck from "./admin-auth-check"
import Sidebar from "@/components/admin-sidebar"
import { MessageSquare, Users, Settings, BarChart, UserCheck, TrendingUp, DollarSign, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the application.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

const navItems = [
  {
    title: "Gerenciar Funções",
    href: "/admin-dashboard/user-roles",
    icon: Users,
    description: "Atribua funções aos membros",
  },
  {
    title: "Configurações do Site",
    href: "/admin-dashboard/site-settings",
    icon: Settings,
    description: "Personalize a plataforma",
  },
  {
    title: "Estatísticas",
    href: "/admin-dashboard/statistics",
    icon: BarChart,
    description: "Visualize métricas",
  },
  {
    title: "Gestão de Afiliados",
    href: "/admin-dashboard/affiliate-manager",
    icon: UserCheck,
    description: "Gerencie afiliados",
  },
  {
    title: "API MetaTrader",
    href: "/admin-dashboard/metatrader-api",
    icon: TrendingUp,
    description: "Configure integração MT5",
  },
  {
    title: "Gerenciar Cursos",
    href: "/admin-dashboard/courses-manager",
    icon: BookOpen,
    description: "Configure conteúdo educativo",
  },
  {
    title: "Bot Telegram",
    href: "/admin-dashboard/telegram-test",
    icon: MessageSquare,
    description: "Configure bot Telegram",
  },
  {
    title: "Configurações de Pagamento",
    href: "/admin-dashboard/payment-settings",
    icon: DollarSign,
    description: "Configure pagamentos",
  },
  {
    title: "Copytrading Manager",
    href: "/admin-dashboard/copytrading-manager",
    icon: TrendingUp,
    description: "Gerencie copytrading",
  },
]

const AdminDashboardLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex flex-1">
          <Sidebar navItems={navItems} />
          <main className="flex-1 flex flex-col">
            <div className="flex-1 p-4 pb-20">{children}</div>
          </main>
        </div>
      </div>
    </AdminAuthCheck>
  )
}

export default AdminDashboardLayout
