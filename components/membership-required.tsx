"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import LoginModal from "@/components/login-modal"

export default function MembershipRequired() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  // Se o usuário se autenticar, redireciona para a página atual
  if (isAuthenticated) {
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-amber-500">
          <Lock className="h-12 w-12 text-amber-500" />
        </div>
        <h1 className="mb-2 text-center text-3xl font-bold text-amber-500">Acesso Restrito</h1>
        <p className="mb-6 max-w-md text-center text-gray-300">
          Esta área é exclusiva para membros da plataforma MoreThanMoney. Faça login ou torne-se um membro para acessar
          as ideias de trading.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowLoginModal(true)}
            className="rounded bg-amber-500 px-6 py-2 font-semibold text-black transition hover:bg-amber-600"
          >
            Fazer Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="rounded border border-amber-500 px-6 py-2 font-semibold text-amber-500 transition hover:bg-amber-500/10"
          >
            Registrar-se
          </button>
        </div>
      </div>

      {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}
    </div>
  )
}
