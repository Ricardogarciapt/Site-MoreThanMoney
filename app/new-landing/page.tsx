import NewLandingPage from "@/components/new-landing-page"
import { AuthProvider } from "@/contexts/auth-context"

export default function NewLanding() {
  return (
    <AuthProvider>
      <main className="relative min-h-screen bg-black text-white">
        <NewLandingPage />
      </main>
    </AuthProvider>
  )
}
