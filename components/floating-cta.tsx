"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, X, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 1000
      setIsVisible(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    router.push("/jifu-education")
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? "scale-75" : "scale-100"}`}
    >
      {!isMinimized ? (
        <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg shadow-2xl p-4 max-w-sm border border-gold-400">
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-2 right-2 text-black/60 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
            <div>
              <h4 className="font-bold text-black">Oferta Especial!</h4>
              <p className="text-black/80 text-sm">Pack completo por €299</p>
            </div>
          </div>

          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-3 text-center">
            <Clock className="w-3 h-3 inline mr-1" />
            77% OFF - Economia €1,000
          </div>

          <Button onClick={handleClick} className="w-full bg-black hover:bg-gray-800 text-gold-400 font-semibold">
            Ver Oferta Completa
          </Button>

          <div className="text-center mt-2">
            <span className="text-black/70 text-xs">🔥 Apenas 8 vagas restantes</span>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black shadow-2xl animate-pulse relative"
        >
          <TrendingUp className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            77%
          </div>
        </Button>
      )}
    </div>
  )
}
