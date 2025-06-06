"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, TrendingUp } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import JifuEducationPath from "@/components/jifu-education-path"
import CopytradingPath from "@/components/copytrading-path"
import ScannerSection from "@/components/scanner-section"
import AutomationCards from "@/components/automation-cards"
import MemberRegistration from "@/components/member-registration"

export default function NewLandingPage() {
  const [currentView, setCurrentView] = useState<
    "intro" | "pathSelection" | "education" | "automation" | "registration"
  >("pathSelection")
  const [animateCards, setAnimateCards] = useState(false)

  const handleSkipToPathSelection = () => {
    setCurrentView("pathSelection")
  }

  // Efeito para animar os cards periodicamente
  useEffect(() => {
    if (currentView === "pathSelection") {
      const interval = setInterval(() => {
        setAnimateCards(true)
        setTimeout(() => {
          setAnimateCards(false)
        }, 1000)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [currentView])

  // Efeito para rolar até a seção da JIFU quando o usuário seleciona "education"
  useEffect(() => {
    if (currentView === "education") {
      // Pequeno timeout para garantir que o componente foi renderizado
      setTimeout(() => {
        const jifuSection = document.getElementById("jifu-education")
        if (jifuSection) {
          jifuSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [currentView])

  const handleSelectEducation = () => {
    setCurrentView("education")
  }

  const handleSelectAutomation = () => {
    setCurrentView("automation")
  }

  const handleSelectRegistration = () => {
    setCurrentView("registration")
  }

  return (
    <>
      <ParticleBackground />

      {currentView === "pathSelection" && (
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-8">
              <Image src="/logo-new.png" alt="MoreThanMoney Logo" width={220} height={180} className="mx-auto" />
            </div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
                Escolha Seu Caminho
              </h2>
              <p className="text-xl text-gray-300 mb-12">O que você deseja fazer hoje?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card
                className={`bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 cursor-pointer ${
                  animateCards ? "animate-wiggle" : ""
                }`}
                onClick={handleSelectEducation}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gold-500/20 flex items-center justify-center mb-6">
                    <BookOpen className="h-10 w-10 text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Quero Aprender</h3>
                  <p className="text-gray-300 mb-6">
                    Acede a formação especializada em trading, investimentos, e-commerce, IA e muito mais através da
                    plataforma Jifu.
                  </p>
                  <Button className="bg-gold-600 hover:bg-gold-700 text-black mt-auto">
                    Começar a Aprender <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card
                className={`bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 cursor-pointer ${
                  animateCards ? "animate-wiggle" : ""
                }`}
                onClick={handleSelectAutomation}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gold-500/20 flex items-center justify-center mb-6">
                    <TrendingUp className="h-10 w-10 text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Quero Automatizar</h3>
                  <p className="text-gray-300 mb-6">
                    Automatiza os teus investimentos com nosso serviço de copytrading e tem acesso ao Scanner MTM com
                    inteligência artificial.
                  </p>
                  <Button className="bg-gold-600 hover:bg-gold-700 text-black mt-auto">
                    Começar a Automatizar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card
                className={`bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 cursor-pointer ${
                  animateCards ? "animate-wiggle" : ""
                }`}
                onClick={handleSelectRegistration}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gold-500/20 flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gold-500"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Quero Ser Membro</h3>
                  <p className="text-gray-300 mb-6">
                    Torne-se um membro MoreThanMoney e tenha acesso a conteúdos exclusivos, suporte personalizado e
                    ferramentas avançadas.
                  </p>
                  <Button className="bg-gold-600 hover:bg-gold-700 text-black mt-auto">
                    Registrar Agora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {currentView === "education" && (
        <>
          <JifuEducationPath />

          {/* Seção de Educação Adicional */}
          <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
                  Mais Opções de Educação
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Expande os teus conhecimentos com as nossas recomendações especializadas
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* AI com os GEMEOS */}
                <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image src="/ai-com-osgemeos.png" alt="AI com os GEMEOS" fill className="object-cover" />
                      <div className="absolute top-4 right-4 bg-gold-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                        $39/mês
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">Mais de 400 Alunos</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">AI com os GEMEOS</h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        Cada vez mais se ouve falar de IA, mas são poucos os que realmente entendem o tema e sabem
                        aplicá-lo. Criámos esta comunidade para quem quer melhorar a sua vida pessoal e profissional com
                        IA 🤖, mesmo sem qualquer background técnico.
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-1 w-1 bg-gold-500 rounded-full"></div>
                          <span>Fundamentos explicados de forma simples</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-1 w-1 bg-gold-500 rounded-full"></div>
                          <span>Tutoriais step-by-step com aplicação prática</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-1 w-1 bg-gold-500 rounded-full"></div>
                          <span>Desafios semanais com prémios em dinheiro 🏆</span>
                        </div>
                      </div>
                      <div className="text-xs text-gold-400 mb-4 italic">⭐ Sugestão MoreThanMoney</div>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => window.open("https://www.skool.com/ai-com-osgemeos-9197/about", "_blank")}
                      >
                        Juntar-se à Comunidade
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Educação MoreThanMoney */}
                <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="/educacao-morethanmoney.png"
                        alt="Educação MoreThanMoney"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-gold-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                        Premium
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-2 w-2 bg-gold-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">Por Ricardo Garcia</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Educação MoreThanMoney</h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        Formação completa em trading, forex e investimentos com mais de 50 horas de conteúdo premium.
                        Aprende análise técnica, gestão de risco e estratégias avançadas com scanners AI para maximizar
                        os teus resultados.
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-1 w-1 bg-gold-500 rounded-full"></div>
                          <span>Bootcamp completo de Trading & Forex</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-1 w-1 bg-gold-500 rounded-full"></div>
                          <span>Scanners AI para análise de mercado</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-1 w-1 bg-gold-500 rounded-full"></div>
                          <span>Estratégias de copytrading e automação</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-1 w-1 bg-gold-500 rounded-full"></div>
                          <span>Suporte VIP e comunidade exclusiva</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                        onClick={() => (window.location.href = "/bootcamp")}
                      >
                        Começar Agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </>
      )}

      {currentView === "automation" && (
        <>
          <AutomationCards />
          <CopytradingPath />
        </>
      )}

      {currentView === "registration" && <MemberRegistration />}

      <ScannerSection />
    </>
  )
}
