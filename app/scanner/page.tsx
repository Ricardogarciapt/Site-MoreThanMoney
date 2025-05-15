import ScannerView from "@/components/scanner-view"
import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"

export default function ScannerPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <ScannerView />
      </main>
    </AuthProvider>
  )
}
