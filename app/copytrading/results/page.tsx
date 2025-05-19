import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import CopytradingResults from "@/components/copytrading-results"

export default function CopytradingResultsPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <CopytradingResults />
      </main>
    </AuthProvider>
  )
}
