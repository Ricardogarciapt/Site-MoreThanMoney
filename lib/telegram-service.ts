interface TelegramMessage {
  message_id: number
  text?: string
  date: number
  from?: {
    id: number
    first_name: string
    username?: string
  }
  chat?: {
    id: number
    title?: string
    type: string
  }
}

interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
  channel_post?: TelegramMessage
}

interface TelegramResponse {
  ok: boolean
  result: TelegramUpdate[]
  description?: string
}

export interface ProcessedTelegramMessage {
  id: string
  content: string
  author: string
  timestamp: string
  type: "signal" | "analysis" | "market_update"
  symbol?: string
  direction?: "buy" | "sell"
  category: "forex" | "crypto" | "commodities"
  originalDate: Date
}

class TelegramService {
  private static instance: TelegramService
  private botToken: string
  private channelId: string
  private cache: ProcessedTelegramMessage[] = []
  private lastFetch = 0
  private cacheTimeout: number = 5 * 60 * 1000 // 5 minutos

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || ""
    this.channelId = "-1002055149876" // Canal MoreThanMoney VIP
  }

  public static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService()
    }
    return TelegramService.instance
  }

  private extractSymbol(text: string): string | undefined {
    // Regex para encontrar símbolos de trading comuns
    const symbolPatterns = [
      /([A-Z]{3}\/[A-Z]{3})/g, // EUR/USD, GBP/USD
      /([A-Z]{6})/g, // EURUSD, GBPUSD
      /([A-Z]{2,4}USD)/g, // BTCUSD, ETHUSD
      /(XAU[A-Z]{3})/g, // XAUUSD
      /(BTC|ETH|ADA|DOT|SOL)/gi, // Crypto symbols
    ]

    for (const pattern of symbolPatterns) {
      const match = text.match(pattern)
      if (match) {
        return match[0].toUpperCase()
      }
    }
    return undefined
  }

  private extractDirection(text: string): "buy" | "sell" | undefined {
    const buyKeywords = ["compra", "buy", "long", "📈", "🚀", "⬆️"]
    const sellKeywords = ["venda", "sell", "short", "📉", "⬇️"]

    const lowerText = text.toLowerCase()

    if (buyKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "buy"
    }
    if (sellKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "sell"
    }
    return undefined
  }

  private categorizeMessage(text: string, symbol?: string): "forex" | "crypto" | "commodities" {
    if (symbol) {
      if (
        symbol.includes("BTC") ||
        symbol.includes("ETH") ||
        symbol.includes("ADA") ||
        symbol.includes("DOT") ||
        symbol.includes("SOL")
      ) {
        return "crypto"
      }
      if (symbol.includes("XAU") || symbol.includes("XAG") || symbol.includes("OIL")) {
        return "commodities"
      }
    }

    const cryptoKeywords = ["bitcoin", "btc", "ethereum", "eth", "crypto", "cripto"]
    const commodityKeywords = ["ouro", "gold", "prata", "silver", "petróleo", "oil"]

    const lowerText = text.toLowerCase()

    if (cryptoKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "crypto"
    }
    if (commodityKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "commodities"
    }

    return "forex"
  }

  private determineMessageType(text: string): "signal" | "analysis" | "market_update" {
    const signalKeywords = ["sinal", "signal", "entrada", "entry", "tp", "sl", "take profit", "stop loss"]
    const analysisKeywords = [
      "análise",
      "analysis",
      "técnica",
      "technical",
      "suporte",
      "support",
      "resistência",
      "resistance",
    ]
    const newsKeywords = ["notícia", "news", "fed", "banco central", "mercado", "market update"]

    const lowerText = text.toLowerCase()

    if (signalKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "signal"
    }
    if (analysisKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "analysis"
    }
    if (newsKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "market_update"
    }

    // Default baseado no conteúdo
    if (text.includes("📊") || text.includes("📈") || text.includes("📉")) {
      return "analysis"
    }
    if (text.includes("🚀") || text.includes("💰") || text.includes("🎯")) {
      return "signal"
    }

    return "market_update"
  }

  private processMessage(message: TelegramMessage): ProcessedTelegramMessage {
    const text = message.text || "Mensagem sem texto"
    const symbol = this.extractSymbol(text)
    const direction = this.extractDirection(text)
    const category = this.categorizeMessage(text, symbol)
    const type = this.determineMessageType(text)
    const author = message.from?.first_name || "Canal MTM"
    const timestamp = new Date(message.date * 1000)

    return {
      id: `tg_${message.message_id}`,
      content: text,
      author,
      timestamp: timestamp.toISOString(),
      type,
      symbol,
      direction,
      category,
      originalDate: timestamp,
    }
  }

  public async fetchMessages(limit = 50): Promise<ProcessedTelegramMessage[]> {
    // Verificar cache
    const now = Date.now()
    if (this.cache.length > 0 && now - this.lastFetch < this.cacheTimeout) {
      return this.cache.slice(0, limit)
    }

    try {
      if (!this.botToken) {
        console.warn("TELEGRAM_BOT_TOKEN não configurado")
        return []
      }

      const response = await fetch(
        `https://api.telegram.org/bot${this.botToken}/getUpdates?limit=${limit}&offset=-${limit}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: TelegramResponse = await response.json()

      if (!data.ok) {
        throw new Error(`Telegram API error: ${data.description}`)
      }

      const processedMessages = data.result
        .filter((update) => update.message || update.channel_post)
        .map((update) => {
          const message = update.message || update.channel_post!
          return this.processMessage(message)
        })
        .sort((a, b) => b.originalDate.getTime() - a.originalDate.getTime())

      // Atualizar cache
      this.cache = processedMessages
      this.lastFetch = now

      return processedMessages.slice(0, limit)
    } catch (error) {
      console.error("Erro ao buscar mensagens do Telegram:", error)
      return []
    }
  }

  public async getMessagesByType(type?: string, limit = 20): Promise<ProcessedTelegramMessage[]> {
    const messages = await this.fetchMessages(50)

    if (!type || type === "all") {
      return messages.slice(0, limit)
    }

    return messages.filter((message) => message.type === type).slice(0, limit)
  }

  public async getMessagesByCategory(category?: string, limit = 20): Promise<ProcessedTelegramMessage[]> {
    const messages = await this.fetchMessages(50)

    if (!category || category === "all") {
      return messages.slice(0, limit)
    }

    return messages.filter((message) => message.category === category).slice(0, limit)
  }

  public async getRecentMessages(limit = 10): Promise<ProcessedTelegramMessage[]> {
    const messages = await this.fetchMessages(30)
    return messages.slice(0, limit)
  }

  public clearCache(): void {
    this.cache = []
    this.lastFetch = 0
  }
}

export const telegramService = TelegramService.getInstance()
