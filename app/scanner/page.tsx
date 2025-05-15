import ScannerView from "@/components/scanner-view"
import { AuthProvider } from "@/contexts/auth-context"

export default function ScannerPage() {
  return (
    <AuthProvider>
      <main className="min-h-screen bg-black text-white">
        <ScannerView />
      </main>
    </AuthProvider>
  )
}
