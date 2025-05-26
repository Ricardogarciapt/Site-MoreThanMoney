"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useConfigStore } from "@/lib/config-service"

export default function JifuEducationPath() {
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const { config } = useConfigStore()
  const [jifuAffiliateLink, setJifuAffiliateLink] = useState(
    config.affiliateLinks?.jifuAffiliateLink || "https://ricardogarcia.jifu.com",
  )

  // Atualizar o link quando a configuração mudar
  useEffect(() => {
    if (config.affiliateLinks?.jifuAffiliateLink) {
      setJifuAffiliateLink(config.affiliateLinks.jifuAffiliateLink)
    }
  }, [config.affiliateLinks?.jifuAffiliateLink])

  const handleRegisterClick = () => {
    // Parar o vídeo quando o usuário clica para se registrar
    setVideoPlaying(false)

    // Garantir que o link comece com https://
    let secureLink = jifuAffiliateLink
    if (!secureLink.startsWith("http")) {
      secureLink = "https://" + secureLink
    } else if (secureLink.startsWith("http://")) {
      secureLink = secureLink.replace("http://", "https://")
    }

    // Abrir a página de registro da JIFU em uma nova aba com o link de afiliação configurado
    window.open(secureLink, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center" id="jifu-education">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <Image src="/logo-new.png" alt="MoreThanMoney Logo" width={220} height={180} className="mx-auto" />
        </div>
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

            {/* Botão Principal de Registro */}
            <div className="text-center">
              <button
                onClick={handleRegisterClick}
                className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-12 py-4 text-xl rounded-md transform transition-transform duration-300 hover:scale-105"
              >
                Registrar na JIFU
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
