import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import { PortfoliosIntelligent } from "@/components/portfolios-intelligent"

export default function PortfoliosPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <PortfoliosIntelligent />
        </div>
      </main>
    </AuthProvider>
  )
}
