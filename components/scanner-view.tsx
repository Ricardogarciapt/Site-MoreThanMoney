"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { LogOut, ArrowLeft, HelpCircle, Home } from "lucide-react"
import Link from "next/link"
import ScannerInfo from "@/components/scanner-info"

export default function ScannerView() {
  const { user, isAuthenticated, logout } = useAuth()
  const [showInfo, setShowInfo] = useState(false)

  // URL do TradingView com o script PineScript incorporado
  // Nota: O script real seria incorporado via ID do script no TradingView
  const tradingViewUrl =
    "https://s.tradingview.com/widgetembed/?symbol=FX:EURUSD&interval=60&theme=dark&style=1&timezone=exchange&studies=%5B%7B%22id%22%3A%22MoreThanMoney%20-%20Scanner%20V3.4%22%7D%5D&withdateranges=1&showpopupbutton=1&width=100%25&height=100%25"

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="absolute top-4 left-4">
            <Link href="/">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium flex items-center gap-2">
                <Home size={16} />
                Início
              </Button>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Scanner MTM
            </h2>
            <p className="text-gray-300 text-lg mb-8">Faça login para acessar o Scanner MTM.</p>
          </div>

          <LoginForm />
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 bg-black py-2 px-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          Scanner MTM ao Vivo
        </h2>

        <div className="flex gap-2">
          <Link href="/">
            <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium flex items-center gap-2">
              <ArrowLeft size={16} />
              Início
            </Button>
          </Link>

          <Button
            className="bg-gold-600 hover:bg-gold-700 text-black font-medium flex items-center gap-2"
            onClick={() => setShowInfo(true)}
          >
            <HelpCircle size={16} />O que é o Scanner MoreThanMoney?
          </Button>

          <Button
            onClick={logout}
            className="bg-gold-600 hover:bg-gold-700 text-black font-medium flex items-center gap-2"
          >
            <LogOut size={16} />
            Sair
          </Button>
        </div>
      </div>

      <div className="fixed top-14 left-0 right-0 bottom-0">
        <iframe src={tradingViewUrl} style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen></iframe>
      </div>

      {showInfo && <ScannerInfo onClose={() => setShowInfo(false)} />}
    </>
  )
}
