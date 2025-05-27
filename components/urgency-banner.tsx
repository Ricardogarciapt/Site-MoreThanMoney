"use client"

import { useState, useEffect } from "react"
import { Clock, Users, TrendingUp } from "lucide-react"

export default function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 horas
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 24 * 60 * 60 // Reset para 24h
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-2 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Oferta Pack JIFU (77% OFF) termina em: {formatTime(timeLeft)}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>73 pessoas compraram hoje</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Apenas 8 vagas restantes</span>
          </div>
        </div>
        <button onClick={() => setIsVisible(false)} className="text-white/80 hover:text-white transition-colors">
          ✕
        </button>
      </div>
    </div>
  )
}
