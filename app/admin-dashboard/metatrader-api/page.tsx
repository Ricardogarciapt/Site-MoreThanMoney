"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import dynamic from "next/dynamic"

// Tipos
interface MetaTraderConfig {
  enabled: boolean
  apiUrl: string
  apiKey: string
  serverType: "MT4" | "MT5"
  serverName: string
  brokerName: string
  masterAccounts: MasterAccount[]
}

interface MasterAccount {
  id: string
  name: string
  login: string
  password: string
  server: string
  enabled: boolean
  subscribers: number
}

interface Subscriber {
  id: string
  userId: string
  name: string
  accountNumber: string
  server: string
  status: "active" | "pending" | "disabled" | "error"
  masterAccountId: string
  lastSync: string
  copyratio: number
}

// Estado inicial simulado
const initialConfig: MetaTraderConfig = {
  enabled: false,
  apiUrl: "https://api.metatrader-integration.com/v1",
  apiKey: "mt_api_key_12345",
  serverType: "MT5",
  serverName: "TradingServer01",
  brokerName: "XM",
  masterAccounts: [
    {
      id: "1",
      name: "Conta Principal MTM",
      login: "12345678",
      password: "********",
      server: "XM-Real1",
      enabled: true,
      subscribers: 3,
    },
    {
      id: "2",
      name: "Conta VIP Forex",
      login: "87654321",
      password: "********",
      server: "XM-Real2",
      enabled: false,
      subscribers: 1,
    },
  ],
}

const subscribers: Subscriber[] = [
  {
    id: "1",
    userId: "user123",
    name: "João Silva",
    accountNumber: "345678",
    server: "XM-Real1",
    status: "active",
    masterAccountId: "1",
    lastSync: "2023-10-12 14:30:45",
    copyratio: 1.0,
  },
  {
    id: "2",
    userId: "user456",
    name: "Maria Souza",
    accountNumber: "456789",
    server: "XM-Real1",
    status: "active",
    masterAccountId: "1",
    lastSync: "2023-10-12 14:28:12",
    copyratio: 0.5,
  },
  {
    id: "3",
    userId: "user789",
    name: "Pedro Alves",
    accountNumber: "567890",
    server: "XM-Real1",
    status: "pending",
    masterAccountId: "1",
    lastSync: "-",
    copyratio: 1.0,
  },
  {
    id: "4",
    userId: "user321",
    name: "Ana Costa",
    accountNumber: "654321",
    server: "XM-Real2",
    status: "active",
    masterAccountId: "2",
    lastSync: "2023-10-12 13:15:30",
    copyratio: 0.75,
  },
  {
    id: "5",
    userId: "user654",
    name: "Carlos Mendes",
    accountNumber: "123987",
    server: "XM-Real1",
    status: "error",
    masterAccountId: "1",
    lastSync: "2023-10-12 10:45:22 (Erro)",
    copyratio: 1.0,
  },
]

const MetaTraderAPIComponent = dynamic(() => import("./metatrader-api-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando API MetaTrader...</p>
      </div>
    </div>
  ),
})

export default function MetaTraderAPIPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  return <MetaTraderAPIComponent />
}
