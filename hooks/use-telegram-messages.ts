"use client"

import { useState, useEffect } from "react"
import type { ProcessedTelegramMessage } from "@/lib/telegram-service"

interface UseTelegramMessagesOptions {
  type?: string
  category?: string
  limit?: number
  autoRefresh?: boolean
  refreshInterval?: number
}

interface UseTelegramMessagesReturn {
  messages: ProcessedTelegramMessage[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  lastUpdated: Date | null
}

export function useTelegramMessages(options: UseTelegramMessagesOptions = {}): UseTelegramMessagesReturn {
  const {
    type,
    category,
    limit = 20,
    autoRefresh = true,
    refreshInterval = 5 * 60 * 1000, // 5 minutos
  } = options

  const [messages, setMessages] = useState<ProcessedTelegramMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (type) params.append("type", type)
      if (category) params.append("category", category)
      if (limit) params.append("limit", limit.toString())

      const response = await fetch(`/api/telegram/messages?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setMessages(data.messages)
        setLastUpdated(new Date())
      } else {
        setError(data.error || "Erro ao carregar mensagens")
      }
    } catch (err) {
      setError("Erro de conexão")
      console.error("Erro ao buscar mensagens:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [type, category, limit])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchMessages, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, type, category, limit])

  return {
    messages,
    loading,
    error,
    refresh: fetchMessages,
    lastUpdated,
  }
}
