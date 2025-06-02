import {
  BarChart,
  Building2,
  CogIcon as Cog6Tooth,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  ShoppingBag,
  Users,
} from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentação",
      href: "/docs",
    },
    {
      title: "Suporte",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Geral",
      items: [
        {
          title: "Dashboard",
          href: "/admin-dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Gerenciamento",
      items: [
        {
          title: "Usuários",
          href: "/admin-dashboard/users",
          icon: Users,
        },
        {
          title: "Produtos",
          href: "/admin-dashboard/products",
          icon: ShoppingBag,
        },
        {
          title: "Pedidos",
          href: "/admin-dashboard/orders",
          icon: ListChecks,
        },
        {
          title: "Relatórios",
          href: "/admin-dashboard/reports",
          icon: BarChart,
        },
      ],
    },
    {
      title: "Configurações",
      items: [
        {
          title: "Configurações do Site",
          href: "/admin-dashboard/site-settings",
          icon: Building2,
        },
        {
          title: "Configurações de Pagamento",
          href: "/admin-dashboard/payment-settings",
          icon: CreditCard,
        },
        {
          title: "Configurações da Conta",
          href: "/admin-dashboard/account-settings",
          icon: Cog6Tooth,
        },
      ],
    },
  ],
}
