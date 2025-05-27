"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, TrendingUp } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  location: string
  role: string
  text: string
  rating: number
  profit?: string
  timeframe?: string
  avatar: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rafael Bastos",
    location: "Leiria, Portugal",
    role: "Pai Proffisional",
    text: "Rising Star foi uma conquista 100%! Com dedicação ao máximo consegui resultados incríveis usando os scanners MTM.",
    rating: 5,
    profit: "+450 pips",
    timeframe: "3 meses",
    avatar: "/testimonials/rafael-bastos.jpg",
    verified: true,
  },
  {
    id: "2",
    name: "Sandra Oliveira",
    location: "Leiria, Portugal",
    role: "Contabilista",
    text: "Focada em criptomoedas, uso o método MoreThanMoney em dinâmica de cripto. Juntar-me à JIFU trouxe-me confiança e clareza sobre os meus objetivos financeiros.",
    rating: 5,
    profit: "+1,820 pips",
    timeframe: "18 meses",
    avatar: "/testimonials/sandra-oliveira.jpg",
    verified: true,
  },
  {
    id: "3",
    name: "Liliana Faria",
    location: "Alpiarça, Portugal",
    role: "Gold Manager JIFU",
    text: "A tua fundação para director foi criada! Estás a um passo de distância! Trabalhar contigo tem sido uma inspiração diária.",
    rating: 5,
    profit: "+3,200 pips",
    timeframe: "18 meses",
    avatar: "/testimonials/liliana-faria.jpg",
    verified: true,
  },
  {
    id: "4",
    name: "Gonçalo & Vânia",
    location: "Braga, Portugal",
    role: "Casal Empreendedor",
    text: "Mais uma recompensa pelo bom trabalho para este casal incrível da minha equipa. Parabéns, feliz por vocês! Withdraw Club conquistado!",
    rating: 5,
    profit: "+4,100 pips",
    timeframe: "5 meses",
    avatar: "/testimonials/goncalo-vania.jpg",
    verified: true,
  },
  {
    id: "5",
    name: "Rui Rodrigues e Carla",
    location: "Coimbra, Portugal",
    role: "Casal Investidor",
    text: "Somos um casal lindo. Estes quatro meses de JIFU têm sido intensos, loucos, mas muito prazerosos. Ser ensinável e grato por tudo predomina nos nossos dias.",
    rating: 5,
    profit: "+2,850 pips",
    timeframe: "18 meses",
    avatar: "/testimonials/rui-carla.jpg",
    verified: true,
  },
  {
    id: "6",
    name: "André Dias",
    location: "Suiça",
    role: "Chefe de Equipa de Construção",
    text: "Muito obrigado pelo vosso apoio, maltinha, principalmente ao Ricardo e Liliana que não me deixaram desistir nos momentos mais difíceis. Withdraw Club alcançado!",
    rating: 5,
    profit: "+3,650 pips",
    timeframe: "6 meses",
    avatar: "/testimonials/andre-dias.jpg",
    verified: true,
  },
]

export default function TestimonialsSection() {
  const [currentTestimonials, setCurrentTestimonials] = useState(testimonials.slice(0, 3))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
      setCurrentTestimonials(shuffled.slice(0, 3))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Resultados Reais de Membros Reais
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mais de 100 traders já transformaram suas vidas financeiras com nossos sistemas
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-gold-400 fill-current" />
              ))}
            </div>
            <span className="text-gold-400 font-semibold">4.9/5 (205 avaliações)</span>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {currentTestimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.id}-${index}`}
              className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6">
                {/* Header com Avatar e Info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gold-500/30" />
                  <p className="text-gray-300 italic pl-6">"{testimonial.text}"</p>
                </div>

                {/* Profit Info */}
                {testimonial.profit && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold">Lucro:</span>
                      </div>
                      <span className="text-green-400 font-bold">{testimonial.profit}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400 text-sm">Período:</span>
                      <span className="text-gray-300 text-sm">{testimonial.timeframe}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">100+</div>
            <div className="text-gray-400">Membros Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">45,000+</div>
            <div className="text-gray-400">Pips Gerados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">87%</div>
            <div className="text-gray-400">Taxa de Sucesso</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-400">Suporte Ativo</div>
          </div>
        </div>
      </div>
    </section>
  )
}
