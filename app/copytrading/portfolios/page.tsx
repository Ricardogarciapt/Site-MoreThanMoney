import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import { MembershipRequired } from "@/components/membership-required"
import { CopytradingPortfolios } from "@/components/copytrading-portfolios"

export default function PortfoliosPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <MembershipRequired>
            <CopytradingPortfolios />
          </MembershipRequired>
        </div>
      </main>
    </AuthProvider>
  )
}
