import LandingPage from "@/components/landing-page"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="fixed top-4 right-4 z-50">
        <Link href="/new-landing">
          <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
            Ver Nova Versão
          </Button>
        </Link>
      </div>
      <LandingPage />
    </main>
  )
}
