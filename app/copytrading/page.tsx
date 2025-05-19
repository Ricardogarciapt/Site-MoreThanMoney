import CopytradingPath from "@/components/copytrading-path"
import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import { MembershipRequired } from "@/components/membership-required"

export default function CopytradingPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <MembershipRequired>
          <CopytradingPath />
        </MembershipRequired>
      </main>
    </AuthProvider>
  )
}
