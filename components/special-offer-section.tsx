"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, TrendingUp, Users, Zap, CheckCircle, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SpecialOfferSection() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 horas
  const router = useRouter()

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

  const handleGetOffer = () => {
    router.push("/jifu-education")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 mb-4">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-semibold">OFERTA POR TEMPO LIMITADO</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            🔥 OFERTA ESPECIAL 🔥
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Compre um Pack de Educação JIFU e receba acesso completo ao ecossistema MoreThanMoney
          </p>

          {/* Countdown */}
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-red-400 font-semibold mb-2">Esta oferta expira em:</div>
            <div className="text-4xl font-bold text-red-400">{formatTime(timeLeft)}</div>
          </div>
        </div>

        {/* Main Offer Card */}
        <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gold-500 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-500/10" />

          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl font-bold text-white mb-4">Pack Completo de Educação Financeira</CardTitle>

            {/* Pricing */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-gray-400 line-through text-xl">€1,299</div>
                <div className="text-sm text-gray-500">Valor Normal</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gold-400">€299</div>
                <div className="text-sm text-gold-300">Oferta Especial</div>
              </div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full">
                <div className="font-bold text-lg">77% OFF</div>
                <div className="text-sm">Economia €1,000</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            {/* What's Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-black/30 rounded-lg border border-gold-500/30">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Pack Educação JIFU</h4>
                <p className="text-sm text-gray-400">Acesso completo à plataforma educacional</p>
                <div className="text-gold-400 font-semibold mt-2">Valor: €299</div>
              </div>

              <div className="text-center p-6 bg-black/30 rounded-lg border border-gold-500/30">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-black" />
                </div>
                <h4 className="font-semibold text-white mb-2">Scanner MTM V3.4</h4>
                <p className="text-sm text-gray-400">Licença vitalícia do scanner profissional</p>
                <div className="text-gold-400 font-semibold mt-2">Valor: €1,000</div>
              </div>

              <div className="text-center p-6 bg-black/30 rounded-lg border border-gold-500/30">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Bootcamp MTM</h4>
                <p className="text-sm text-gray-400">Formação completa com acesso vitalício</p>
                <div className="text-gold-400 font-semibold mt-2">Valor: €200</div>
              </div>

              <div className="text-center p-6 bg-black/30 rounded-lg border border-gold-500/30">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Mentoria VIP</h4>
                <p className="text-sm text-gray-400">3 meses de acompanhamento direto</p>
                <div className="text-gold-400 font-semibold mt-2">Valor: €297</div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Acesso vitalício ao Scanner MTM</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Formação completa no Bootcamp</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">3 meses de mentoria personalizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Acesso ao canal VIP de sinais</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Suporte técnico prioritário</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Comunidade exclusiva de traders</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Atualizações gratuitas vitalícias</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Garantia de 30 dias</span>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-semibold">73 pessoas compraram hoje</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="text-orange-400 font-semibold">⚡ Apenas 8 vagas restantes</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={handleGetOffer}
                className="w-full md:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-bold py-4 px-12 text-xl transform transition-transform duration-300 hover:scale-105"
              >
                🚀 QUERO APROVEITAR ESTA OFERTA AGORA
              </Button>
              <div className="text-gray-400 text-sm mt-3">
                💳 Pagamento seguro | 🛡️ Garantia de 30 dias | ⚡ Acesso imediato
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgency Footer */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-3">
            <Clock className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">
              ⚠️ Esta oferta expira em {formatTime(timeLeft)} - Não perca!
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
