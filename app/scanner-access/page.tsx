import ScannerAccessSection from "@/components/scanner-access-section"
import { AuthProvider } from "@/contexts/auth-context"

export default function ScannerAccessPage() {
  return (
    <AuthProvider>
      <main className="relative min-h-screen bg-black text-white">
        <ScannerAccessSection />
      </main>
    </AuthProvider>
  )
}
