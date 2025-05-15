"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check } from "lucide-react"
import Image from "next/image"

export default function JifuEducationPath() {
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)

  const handleRegisterClick = () => {
    // Parar o vídeo quando o usuário clica para se registrar
    setVideoPlaying(false)

    // Abrir a página de registro da JIFU em uma nova aba
    window.open("https://jifu.com", "_blank", "noopener,noreferrer")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center" id="jifu-education">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Formação JIFU
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Acede a cursos especializados em trading, investimentos, e-commerce, IA e muito mais através da plataforma
            JIFU.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            {/* Vídeo do YouTube */}
            <div className="rounded-lg overflow-hidden border border-gold-500/30 mb-8 relative aspect-video">
              <iframe
                ref={videoRef}
                src={`https://www.youtube.com/embed/iV6M9weCnmA?autoplay=1&controls=0&mute=0&loop=0&modestbranding=1&showinfo=0&rel=0&fs=0&playsinline=1${videoPlaying ? "" : "&enablejsapi=1"}`}
                title="Apresentação JIFU"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
              ></iframe>
            </div>

            {/* Botão de registro sempre visível */}
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleRegisterClick}
                className="bg-gold-600 hover:bg-gold-700 text-black px-8 py-6 text-lg animate-pulse"
              >
                Registrar na JIFU <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Benefícios da Formação JIFU</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Acesso a mais diversos cursos especializados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Comunidade de traders e investidores</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Webinars semanais com especialistas dentro e fora da plataforma</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Suporte personalizado para iniciantes com inicio rápido</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Como Começar</h3>
                <p className="text-gray-300">
                  Registre-se na plataforma JIFU para acessar todos os cursos e recursos disponíveis. Após o registro,
                  você terá acesso imediato a todo o conteúdo.
                </p>
                <div className="pt-4">
                  <Button onClick={handleRegisterClick} className="bg-gold-600 hover:bg-gold-700 text-black w-full">
                    Registrar na JIFU <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scanners JIFU */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Scanners JIFU para Trading
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            A plataforma JIFU oferece diversos scanners avançados para melhorar sua análise técnica e resultados no
            trading.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            {/* Prévia dos scanners JIFU */}
            <div className="rounded-lg overflow-hidden border border-gold-500/30 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-05-15%2C%20a%CC%80s%2012.04.02-jWz0dwacl9wBVrdKFpRg9kl4PVRECS.png"
                alt="Scanners JIFU"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Scanners Disponíveis</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">1</span>
                    </div>
                    <div>
                      <span className="font-bold">GOLDEN ERA SCANNER</span>
                      <p className="text-gray-300 text-sm">
                        Identifica padrões de alta probabilidade em mercados de tendência
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">2</span>
                    </div>
                    <div>
                      <span className="font-bold">TREND WAVE SCANNER</span>
                      <p className="text-gray-300 text-sm">Analisa ondas de tendência e pontos de reversão</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">3</span>
                    </div>
                    <div>
                      <span className="font-bold">SMART SCANNER</span>
                      <p className="text-gray-300 text-sm">
                        Utiliza inteligência artificial para identificar oportunidades
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">4</span>
                    </div>
                    <div>
                      <span className="font-bold">SMARTMONICS SCANNER</span>
                      <p className="text-gray-300 text-sm">
                        Identifica momentos de transição entre mercados de alta e baixa
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Vantagens dos Scanners</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Análise em tempo real de múltiplos pares</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Identificação automática de padrões e estruturas de mercado</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Alertas personalizáveis para oportunidades de entrada</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Compatível com múltiplos timeframes e instrumentos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Integração com a plataforma TradingView Diretamente na Plataforma</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notícias e Dados de Mercado JIFU */}
        <div className="text-center max-w-3xl mx-auto my-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Notícias e Dados de Mercado em Tempo Real
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Mantenha-se atualizado com as últimas notícias financeiras e dados de mercado diretamente na plataforma
            JIFU.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            {/* Prévia das notícias e dados de mercado JIFU */}
            <div className="rounded-lg overflow-hidden border border-gold-500/30 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-05-15%2C%20a%CC%80s%2012.05.50-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png"
                alt="Notícias e Dados de Mercado JIFU"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Informações de Mercado</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Cotações em tempo real de moedas, criptomoedas e índices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Tabelas de correlação entre diferentes pares de moedas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Calendário econômico com eventos importantes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Integração com TradingView para análises avançadas</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Notícias Financeiras</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Notícias atualizadas sobre mercados globais</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Análises de especialistas sobre tendências de mercado</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Alertas sobre movimentos significativos de preços</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Cobertura de eventos econômicos importantes</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão de registro fixo no final da página */}
        <div className="text-center mt-8">
          <Button onClick={handleRegisterClick} className="bg-gold-600 hover:bg-gold-700 text-black px-8 py-6 text-lg">
            Registrar na JIFU Agora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
