import JifuEducationPath from "@/components/jifu-education-path"
import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"

export default function JifuEducationPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <JifuEducationPath />
      </main>
    </AuthProvider>
  )
}
