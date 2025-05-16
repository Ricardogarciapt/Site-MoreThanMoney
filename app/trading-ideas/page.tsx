import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import TradingIdeasCards from "@/components/trading-ideas-cards"
import MemberAccessCheck from "@/components/member-access-check"

export default function TradingIdeasPage() {
  return (
    <AuthProvider>
      <MemberAccessCheck>
        <Breadcrumbs />
        <main className="min-h-screen bg-black text-white">
          <TradingIdeasCards />
        </main>
      </MemberAccessCheck>
    </AuthProvider>
  )
}
