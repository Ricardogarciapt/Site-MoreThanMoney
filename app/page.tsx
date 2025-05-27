import LandingPage from "@/components/landing-page"
import { AuthProvider } from "@/contexts/auth-context"
import MemberArea from "@/components/member-area"
import ScannerAccessSection from "@/components/scanner-access-section"
import TestimonialsSection from "@/components/testimonials-section"
import KeyBenefits from "@/components/key-benefits"
import SalesPopup from "@/components/sales-popup"
import UrgencyBanner from "@/components/urgency-banner"
import FloatingCTA from "@/components/floating-cta"

export default function Page() {
  return (
    <AuthProvider>
      <main className="relative min-h-screen bg-black text-white">
        <UrgencyBanner />
        <LandingPage />
        <KeyBenefits />
        <ScannerAccessSection />
        <TestimonialsSection />
        <MemberArea />
        <SalesPopup delay={45000} showOnExit={true} />
        <FloatingCTA />
      </main>
    </AuthProvider>
  )
}
