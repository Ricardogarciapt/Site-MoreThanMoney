"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, TrendingUp, Users, Award } from "lucide-react"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setIsLoading(true)
    window.location.href = "/register"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">Transforme Seu Futuro Financeiro</h1>
          <p className="mb-8 text-xl text-gray-300 md:text-2xl">
            Plataforma completa de educação financeira e trading automatizado
          </p>
          <Button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 text-lg"
          >
            {isLoading ? "Carregando..." : "Começar Agora"}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">Por que escolher MoreThanMoney?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                <h3 className="mb-2 text-xl font-semibold text-white">Trading Automatizado</h3>
                <p className="text-gray-300">Sistemas de trading automatizado com resultados comprovados</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                <h3 className="mb-2 text-xl font-semibold text-white">Comunidade Exclusiva</h3>
                <p className="text-gray-300">Acesso a uma comunidade de traders experientes</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Award className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                <h3 className="mb-2 text-xl font-semibold text-white">Educação Premium</h3>
                <p className="text-gray-300">Cursos e materiais educativos de alta qualidade</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 bg-gray-800/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">O que você vai conseguir</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Resultados consistentes no trading",
              "Conhecimento financeiro sólido",
              "Estratégias comprovadas",
              "Suporte especializado",
              "Ferramentas profissionais",
              "Comunidade ativa",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                <span className="text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">O que nossos membros dizem</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Rafael Bastos",
                text: "Resultados incríveis em poucos meses. Recomendo!",
              },
              {
                name: "Sandra Oliveira",
                text: "A melhor plataforma de trading que já usei.",
              },
              {
                name: "André Dias",
                text: "Educação de qualidade e suporte excepcional.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-300">"{testimonial.text}"</p>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Pronto para começar sua jornada?</h2>
          <p className="mb-8 text-xl text-gray-300">
            Junte-se a milhares de pessoas que já transformaram suas vidas financeiras
          </p>
          <Button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 text-lg"
          >
            {isLoading ? "Carregando..." : "Começar Agora"}
          </Button>
        </div>
      </section>
    </div>
  )
}
