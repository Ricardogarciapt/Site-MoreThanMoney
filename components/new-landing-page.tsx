"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Play, BookOpen, TrendingUp } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import JifuEducationPath from "@/components/jifu-education-path"
import CopytradingPath from "@/components/copytrading-path"
import ScannerSection from "@/components/scanner-section"
import AutomationCards from "@/components/automation-cards"
import MemberRegistration from "@/components/member-registration"

export default function NewLandingPage() {
  const [currentView, setCurrentView] = useState<
    "intro" | "pathSelection" | "education" | "automation" | "registration"
  >("intro")
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

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

  const handleWatchVideo = () => {
    setVideoPlaying(true)
    // Em uma implementação real, você reproduziria o vídeo e então
    // chamaria setCurrentView("pathSelection") quando o vídeo terminar
    setTimeout(() => {
      setVideoPlaying(false)
      setCurrentView("pathSelection")
    }, 1000) // Simulando o fim do vídeo após 1 segundo
  }

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

      {currentView === "intro" && (
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gold-gradient">MoreThanMoney</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Plataforma integrada de formação financeira e serviços de automatização com inteligência artificial,
              especializada em Forex e Cripto.
            </p>

            {!videoPlaying ? (
              <Button
                onClick={handleWatchVideo}
                className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg"
              >
                <Play className="mr-2 h-5 w-5" /> Ver Apresentação
              </Button>
            ) : (
              <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black/50 border border-gold-500/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Carregando vídeo...</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {currentView === "pathSelection" && (
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-20">
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

      {currentView === "education" && <JifuEducationPath />}

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
