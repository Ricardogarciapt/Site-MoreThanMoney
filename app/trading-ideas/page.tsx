import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import TradingIdeasCards from "@/components/trading-ideas-cards"

export default function TradingIdeasPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <TradingIdeasCards />
      </main>
    </AuthProvider>
  )
}
