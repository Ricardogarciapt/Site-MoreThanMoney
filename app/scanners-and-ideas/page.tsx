import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import ScannersAndIdeas from "@/components/scanners-and-ideas"

export default function ScannersAndIdeasPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <ScannersAndIdeas />
      </main>
    </AuthProvider>
  )
}
