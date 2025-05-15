import MemberRegistration from "@/components/member-registration"
import { AuthProvider } from "@/contexts/auth-context"

export default function RegisterPage() {
  return (
    <AuthProvider>
      <main className="relative min-h-screen bg-black text-white">
        <MemberRegistration />
      </main>
    </AuthProvider>
  )
}
