"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function ScannerAccessSection() {
  const handleRequestAccess = () => {
    window.open("https://wa.link/08k5so", "_blank")
  }

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Overlay para garantir a legibilidade do texto */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Conteúdo */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image src="/logo.png" alt="MoreThanMoney Logo" width={200} height={80} className="mx-auto" />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gold-gradient">
          Scanner MoreThanMoneyTM – Acesso Exclusivo
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Solicita acesso ao nosso Scanner MoreThanMoney exclusivo, que identifica estruturas de mercado e níveis chave
          automaticamente.
        </p>

        <div className="mb-2">
          <Button
            onClick={handleRequestAccess}
            className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-8 py-3 text-lg rounded-md transform transition-transform duration-300 hover:scale-105"
          >
            Pedir Acesso ao Scanner
          </Button>
        </div>

        <div className="mb-12 text-sm text-gray-400">
          <Link
            href="https://br.tradingview.com/script/BtIDtpBs-MoreThanMoney-Scanner-V3-4-Market-structures-and-ATR/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            Indicador disponível apenas por aquisição de licença
          </Link>
        </div>

        <div className="rounded-lg overflow-hidden border border-gold-500/30 shadow-lg shadow-gold-500/10">
          {/* Animação ou vídeo relacionado ao tema */}
          <div className="relative aspect-video">
            <Image src="/trading-animation.png" alt="Trading Animation" width={1200} height={600} className="w-full" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-md text-xs">
              <span className="text-gold-400">MoreThanMoneyTM</span>
              <span className="text-gray-400">|</span>
              <span className="text-white">Trading Intelligence</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-gray-300">
          <p className="text-sm">© 2025 MoreThanMoney. Todos os direitos reservados.</p>
        </div>
      </div>
    </section>
  )
}
