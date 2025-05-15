import AutomationCards from "@/components/automation-cards"
import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"

export default function AutomationPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <AutomationCards />
      </main>
    </AuthProvider>
  )
}
