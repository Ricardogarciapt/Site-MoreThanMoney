"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import ParticleBackground from "@/components/particle-background"
import Link from "next/link"

export default function LandingPage() {
  const [videoPlaying, setVideoPlaying] = useState(false)

  // Efeito para animar os botões
  useEffect(() => {
    const interval = setInterval(() => {
      const buttons = document.querySelectorAll(".cta-button")
      buttons.forEach((button) => {
        button.classList.add("animate-pulse")
        setTimeout(() => {
          button.classList.remove("animate-pulse")
        }, 1000)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleWatchVideo = () => {
    setVideoPlaying(true)
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Logo */}
      <div className="absolute top-4 left-4 z-30">
        <div className="animate-logo-fade-in">
          <Image
            src="/logo.png"
            alt="MoreThanMoney Logo"
            width={200}
            height={80}
            className="object-contain animate-logo-slide-in"
          />
        </div>
      </div>

      {/* Content */}
      <section className="relative min-h-screen flex items-center justify-center z-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gold-gradient">MoreThanMoney</h1>
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto">
            Não precisas de te frustrar mais, chegou a tua hora. Investe com Inteligência
          </p>

          {!videoPlaying ? (
            <Button
              onClick={handleWatchVideo}
              className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg cta-button transform transition-transform duration-300 hover:scale-105"
            >
              Conhece a Plataforma
            </Button>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black/50 border border-gold-500/30 rounded-xl overflow-hidden mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/7Ip2w9bKxVw?autoplay=1"
                  title="MoreThanMoney Presentation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>

              <Link href="/new-landing">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg cta-button transform transition-transform duration-300 hover:scale-105 animate-pulse">
                  Vê as nossas ofertas!
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
