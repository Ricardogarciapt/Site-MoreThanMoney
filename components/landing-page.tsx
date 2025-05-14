"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gold-gradient">MoreThanMoney</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Não precisas de te frustrar mais, chegou a tua hora. Investe com Inteligência
        </p>
        <Link href="/new-landing">
          <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg">
            Explore a Plataforma
          </Button>
        </Link>
      </div>
    </section>
  )
}
