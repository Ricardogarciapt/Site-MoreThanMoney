import CopytradingPath from "@/components/copytrading-path"
import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"

export default function CopytradingPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <CopytradingPath />
      </main>
    </AuthProvider>
  )
}
