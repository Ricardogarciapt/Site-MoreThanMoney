"use client"

import { useEffect, useRef } from "react"

interface TelegramWidgetProps {
  channelUrl: string
}

export default function TelegramWidget({ channelUrl }: TelegramWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Função para criar o widget do Telegram
    const loadTelegramWidget = () => {
      if (!containerRef.current) return

      // Limpar o container primeiro
      containerRef.current.innerHTML = ""

      // Criar elemento iframe
      const iframe = document.createElement("iframe")
      iframe.src = `https://t.me/widget/share?url=${encodeURIComponent(channelUrl)}`
      iframe.width = "100%"
      iframe.height = "500"
      iframe.frameBorder = "0"
      iframe.scrolling = "no"
      iframe.style.border = "none"
      iframe.style.borderRadius = "8px"
      iframe.style.overflow = "hidden"

      // Adicionar ao container
      containerRef.current.appendChild(iframe)
    }

    // Tenta carregar o widget
    loadTelegramWidget()

    // Se não funcionou, pode tentar uma abordagem alternativa
    if (containerRef.current && containerRef.current.childElementCount === 0) {
      const fallbackContainer = document.createElement("div")
      fallbackContainer.className = "bg-[#1E1E1E] p-6 rounded-lg text-center"
      fallbackContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 240 240" class="mb-4">
            <defs>
              <linearGradient id="a" x1=".667" x2=".417" y1=".167" y2=".75">
                <stop offset="0" stopColor="#37aee2"/>
                <stop offset="1" stopColor="#1e96c8"/>
              </linearGradient>
              <linearGradient id="b" x1=".66" x2=".851" y1=".437" y2=".802">
                <stop offset="0" stopColor="#eff7fc"/>
                <stop offset="1" stopColor="#fff"/>
              </linearGradient>
            </defs>
            <circle cx="120" cy="120" r="120" fill="url(#a)"/>
            <path fill="#c8daea" d="M98 175c-3.888 0-3.227-1.468-4.568-5.17L82 132.207 170 80"/>
            <path fill="#a9c9dd" d="M98 175c3 0 4.325-1.372 6-3l16-15.558-19.958-12.035"/>
            <path fill="url(#b)" d="M100.04 144.41l48.36 35.729c5.519 3.045 9.501 1.468 10.876-5.123l19.685-92.763c2.015-8.08-3.08-11.746-8.36-9.349l-115.59 44.571c-7.89 3.165-7.843 7.567-1.438 9.528l29.663 9.259 68.673-43.325c3.242-1.966 6.218-.91 3.776 1.258"/>
          </svg>
          <h3 class="text-white text-xl font-bold mb-2">Canal MoreThanMoney VIP</h3>
          <p class="text-gray-300 mb-4">Acompanhe análises e sinais em tempo real no nosso canal exclusivo do Telegram.</p>
          <a href="${channelUrl}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="inline-block px-6 py-2 bg-[#0088cc] text-white font-medium rounded hover:bg-[#0077b5] transition-colors">
            Acessar Canal
          </a>
        </div>
      `

      containerRef.current.appendChild(fallbackContainer)
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [channelUrl])

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center"
    >
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Carregando canal do Telegram...</p>
      </div>
    </div>
  )
}
