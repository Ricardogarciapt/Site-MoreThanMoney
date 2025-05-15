"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image - Replace the URL with your image from the Canva site */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="MoreThanMoney Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Logo */}
      <div className="absolute top-4 left-4 z-30">
        <div className="animate-logo-fade-in">
          <Image
            src="/placeholder.svg?height=80&width=200"
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
          <Link href="/new-landing">
            <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg">
              Conhece a Plataforma
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
