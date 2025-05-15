import LandingPage from "@/components/landing-page"
import { AuthProvider } from "@/contexts/auth-context"
import MemberArea from "@/components/member-area"
import ScannerAccessSection from "@/components/scanner-access-section"

export default function Page() {
  return (
    <AuthProvider>
      <main className="relative min-h-screen bg-black text-white">
        <LandingPage />
        <ScannerAccessSection />
        <MemberArea />
      </main>
    </AuthProvider>
  )
}
