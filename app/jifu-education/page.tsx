"use client"

import JifuEducationPath from "@/components/jifu-education-path"
import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function JifuEducationPage() {
  const searchParams = useSearchParams()
  const ref = searchParams?.get("ref")

  // Se houver um parâmetro ref, armazenar no localStorage para uso posterior
  useEffect(() => {
    if (ref) {
      localStorage.setItem("jifuAffiliateRef", ref)
    }
  }, [ref])

  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="relative min-h-screen bg-black text-white">
        <JifuEducationPath affiliateRef={ref} />
      </main>
    </AuthProvider>
  )
}
