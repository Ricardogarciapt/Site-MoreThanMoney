import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import CopytradingPlans from "@/components/copytrading-plans"

export default function CopytradingPlansPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <CopytradingPlans />
      </main>
    </AuthProvider>
  )
}
