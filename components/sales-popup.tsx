"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Clock, Zap, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface SalesPopupProps {
  delay?: number
  showOnExit?: boolean
}

export default function SalesPopup({ delay = 45000, showOnExit = true }: SalesPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos
  const [hasShown, setHasShown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar se já foi mostrado nesta sessão
    const popupShown = sessionStorage.getItem("salesPopupShown")
    if (popupShown) {
      setHasShown(true)
      return
    }

    // Mostrar após delay
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        sessionStorage.setItem("salesPopupShown", "true")
        setHasShown(true)
      }
    }, delay)

    // Mostrar ao tentar sair da página
    const handleMouseLeave = (e: MouseEvent) => {
      if (showOnExit && !hasShown && e.clientY <= 0) {
        setIsVisible(true)
        sessionStorage.setItem("salesPopupShown", "true")
        setHasShown(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [delay, showOnExit, hasShown])

  // Countdown timer
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsVisible(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isVisible])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleAcceptOffer = () => {
    setIsVisible(false)
    router.push("/jifu-education")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gold-500 max-w-xl w-full relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-500/10 animate-pulse" />

        <CardHeader className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-4">
            <Zap className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            🔥 ESPERA! OFERTA ESPECIAL 🔥
          </CardTitle>
          <p className="text-xl text-gray-300 mt-2">Antes de sair, vê esta oferta incrível!</p>
        </CardHeader>

        <CardContent className="relative z-10 p-3">
          {/* Countdown Timer */}
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold">Esta oferta expira em:</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{formatTime(timeLeft)}</div>
          </div>

          {/* Offer Details */}
          <div className="space-y-6 mb-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Pack Completo: JIFU + Scanner MTM + Bootcamp + Mentoria
              </h3>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl text-gray-400 line-through">€1,299</span>
                <span className="text-3xl font-bold text-gold-400">€299</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-77%</span>
              </div>
              <div className="text-green-400 font-semibold mt-2">Economia de €1,000!</div>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Pack Educação JIFU completo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Scanner MTM vitalício</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Bootcamp MoreThanMoney</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">3 meses mentoria VIP</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-semibold">73 pessoas compraram hoje</span>
            </div>
            <div className="text-sm text-orange-400">⚡ Apenas 8 vagas restantes para esta oferta especial</div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAcceptOffer}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-bold py-3 text-lg transform transition-transform duration-300 hover:scale-105"
            >
              🚀 SIM! QUERO ESTA OFERTA AGORA
            </Button>
            <button onClick={handleClose} className="w-full text-gray-400 hover:text-white transition-colors text-sm">
              Não, obrigado. Prefiro pagar €1,299 mais tarde.
            </button>
          </div>

          {/* Guarantee */}
          <div className="text-center mt-4 text-sm text-gray-400">
            🛡️ Garantia de 30 dias | 💳 Pagamento seguro | ⚡ Acesso imediato
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
