"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { RefreshCw, TrendingUp, Star, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TelegramMessage {
  id: string | number
  text: string
  date: string
  timestamp: number
  author: string
  channel: string
  topic?: string
}

const CHANNELS = [
  {
    key: "trade_ideas",
    label: "MTM Trade Ideas",
    icon: TrendingUp,
    color: "text-blue-400",
    activeBg: "bg-blue-500",
  },
  {
    key: "premium_signals",
    label: "Premium Signals",
    icon: Star,
    color: "text-gold-400",
    activeBg: "bg-gold-500",
  },
]

function MessageBubble({ msg }: { msg: TelegramMessage }) {
  const lines = msg.text.split("\n")
  return (
    <div className="flex flex-col gap-0.5 mb-3">
      <div className="flex items-center gap-2 px-1">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-none">
          <span className="text-black font-bold text-[8px]">M</span>
        </div>
        <span className="text-xs text-gold-400 font-semibold">{msg.author}</span>
        <span className="text-[10px] text-gray-600 ml-auto flex items-center gap-1">
          <Clock size={10} />
          {msg.date}
        </span>
      </div>
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl rounded-tl-sm px-3.5 py-2.5 ml-7">
        {lines.map((line, i) => (
          <p key={i} className={cn("text-sm text-gray-100 leading-relaxed", !line && "h-2")}>
            {line || " "}
          </p>
        ))}
        {msg.topic && (
          <span className="inline-block mt-1.5 text-[10px] bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full font-medium">
            {msg.topic}
          </span>
        )}
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState<string>("trade_ideas")
  const [messages, setMessages] = useState<Record<string, TelegramMessage[]>>({
    trade_ideas: [],
    premium_signals: [],
  })
  const [loading, setLoading] = useState<Record<string, boolean>>({
    trade_ideas: false,
    premium_signals: false,
  })
  const [lastFetch, setLastFetch] = useState<Record<string, number>>({})
  const bottomRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  const fetchMessages = useCallback(async (channel: string) => {
    setLoading((prev) => ({ ...prev, [channel]: true }))
    try {
      const res = await fetch(`/api/telegram/messages-aibot?channel=${channel}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.messages)) {
        setMessages((prev) => ({ ...prev, [channel]: data.messages }))
        setLastFetch((prev) => ({ ...prev, [channel]: Date.now() }))
      }
    } catch {
      // silent
    } finally {
      setLoading((prev) => ({ ...prev, [channel]: false }))
    }
  }, [])

  // Load both channels on mount
  useEffect(() => {
    fetchMessages("trade_ideas")
    fetchMessages("premium_signals")
  }, [fetchMessages])

  // Auto-refresh active channel every 30s
  useEffect(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => fetchMessages(activeChannel), 30000)
    return () => clearInterval(intervalRef.current)
  }, [activeChannel, fetchMessages])

  // Scroll to bottom when messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages[activeChannel]])

  const currentMessages = messages[activeChannel] || []
  const isLoading = loading[activeChannel]
  const channelInfo = CHANNELS.find((c) => c.key === activeChannel)!

  return (
    <div className="flex flex-col h-full">
      {/* Channel Tabs */}
      <div className="flex-none flex gap-2 px-3 py-2 border-b border-gray-800/50 bg-black/90">
        {CHANNELS.map(({ key, label, icon: Icon, activeBg }) => (
          <button
            key={key}
            onClick={() => setActiveChannel(key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
              activeChannel === key
                ? `${activeBg} text-black`
                : "bg-gray-900 text-gray-400 border border-gray-800"
            )}
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
        <button
          onClick={() => fetchMessages(activeChannel)}
          disabled={isLoading}
          className="ml-auto p-1.5 rounded-full text-gray-500 hover:text-gray-300 transition-colors"
        >
          <RefreshCw size={14} className={cn(isLoading && "animate-spin")} />
        </button>
      </div>

      {/* Channel Header */}
      <div className="flex-none px-4 py-2 bg-black/50 border-b border-gray-800/30">
        <div className="flex items-center gap-2">
          <channelInfo.icon size={14} className={channelInfo.color} />
          <span className="text-xs font-medium text-gray-300">{channelInfo.label}</span>
          <span className="ml-auto text-[10px] text-gray-600">
            {currentMessages.length} mensagens
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {isLoading && currentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-600">
            <RefreshCw size={24} className="animate-spin" />
            <p className="text-sm">A carregar mensagens...</p>
          </div>
        ) : currentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-600">
            <channelInfo.icon size={32} className="opacity-30" />
            <p className="text-sm text-center">
              Sem mensagens ainda.<br />
              Adiciona o bot ao canal para começar.
            </p>
          </div>
        ) : (
          <>
            {currentMessages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Footer hint */}
      <div className="flex-none px-4 py-2 border-t border-gray-800/30 bg-black/50">
        <p className="text-[10px] text-gray-600 text-center">
          Mensagens do canal Telegram · Atualiza a cada 30s
        </p>
      </div>
    </div>
  )
}
