import { Suspense } from "react"
import LandingPage from "@/components/landing-page"

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Carregando...</div>
        </div>
      }
    >
      <LandingPage />
    </Suspense>
  )
}
