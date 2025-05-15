import MemberArea from "@/components/member-area"
import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"

export default function MemberAreaPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <MemberArea />
      </main>
    </AuthProvider>
  )
}
