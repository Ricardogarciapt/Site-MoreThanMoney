// Configuração completa para o Telegram com verificação melhorada
import type { TelegramIdea } from "./telegram-ideas"
import { telegramConfig } from "./telegram-config"

// Configuração centralizada do Telegram com verificação de ambiente
const telegramInfo = {
  botToken: process.env.TELEGRAM_BOT_TOKEN || "",
  channelId: process.env.TELEGRAM_CHANNEL_ID || "",
  inviteLink: process.env.TELEGRAM_INVITE_LINK || "https://t.me/+2XMn1YEjfjYwYTE0",
  channelName: process.env.TELEGRAM_CHANNEL_NAME || "MoreThanMoney Trade Ideas",
  botUsername: process.env.TELEGRAM_BOT_USERNAME || "@MoreThanMoney_Copierbot",
}

// Verificação de configuração apenas no servidor com modo reduzido
const isTelegramConfigured = () => {
  const isConfigured = !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHANNEL_ID)

  if (!isConfigured) {
    console.warn("Telegram configuration is incomplete - running in reduced functionality mode")
  }

  return isConfigured
}

if (typeof window === "undefined") {
  isTelegramConfigured()
}

// Interfaces para tipagem
interface TelegramMessage {
  message_id: number
  from: {
    id: number
    is_bot: boolean
    first_name: string
    username?: string
  }
  chat: {
    id: number
    title?: string
    type: string
  }
  date: number
  text?: string
  entities?: Array<{
    type: string
    offset: number
    length: number
  }>
}

interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
  channel_post?: TelegramMessage
}

/**
 * Serviço principal do Telegram
 * Implementa o padrão Singleton para garantir uma única instância
 */
class TelegramService {
  private static instance: TelegramService
  private baseUrl: string

  constructor() {
    this.baseUrl = telegramConfig.botToken ? `https://api.telegram.org/bot${telegramConfig.botToken}` : ""
  }

  public static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService()
    }
    return TelegramService.instance
  }

  /**
   * Verifica se o token está configurado
   * @returns boolean indicando se está configurado
   */
  private isConfigured(): boolean {
    return !!(telegramConfig.botToken && telegramConfig.channelId)
  }

  /**
   * Envia uma mensagem para o canal do Telegram
   * @param text Texto da mensagem
   * @param chatId ID do chat (opcional, usa o canal padrão se não fornecido)
   * @returns Resposta da API do Telegram ou null se não configurado
   */
  async sendMessage(text: string, chatId?: string): Promise<any> {
    if (!this.isConfigured()) {
      console.warn("Telegram not configured - message not sent")
      return null
    }

    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId || telegramConfig.channelId,
          text,
          parse_mode: "HTML",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      throw error
    }
  }

  /**
   * Obtém informações sobre o bot
   * @returns Informações do bot ou null se não configurado
   */
  async getMe(): Promise<any> {
    if (!this.isConfigured()) {
      console.warn("Telegram not configured - cannot get bot info")
      return null
    }

    try {
      const response = await fetch(`${this.baseUrl}/getMe`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao verificar bot:", error)
      throw error
    }
  }

  /**
   * Configura um webhook para receber atualizações do Telegram
   * @param webhookUrl URL do webhook
   * @returns Resposta da API do Telegram ou null se não configurado
   */
  async setWebhook(webhookUrl: string): Promise<any> {
    if (!this.isConfigured()) {
      console.warn("Telegram not configured - cannot set webhook")
      return null
    }

    try {
      const response = await fetch(`${this.baseUrl}/setWebhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ["message", "channel_post"],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao configurar webhook:", error)
      throw error
    }
  }

  /**
   * Obtém atualizações do canal
   * @param offset ID da última atualização recebida
   * @returns Lista de atualizações ou array vazio se não configurado
   */
  async getUpdates(offset?: number): Promise<TelegramUpdate[]> {
    if (!this.isConfigured()) {
      console.warn("Telegram not configured - cannot get updates")
      return []
    }

    try {
      const url = `${this.baseUrl}/getUpdates${offset ? `?offset=${offset}` : ""}`
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
      }

      const data = await response.json()

      if (data.ok) {
        return data.result
      }
      throw new Error(data.description || "Erro ao obter atualizações")
    } catch (error) {
      console.error("Erro ao obter atualizações:", error)
      return []
    }
  }

  /**
   * Processa uma mensagem e extrai informações de sinais de trading
   * @param message Mensagem do Telegram
   * @returns Objeto com informações do sinal ou null se não for um sinal
   */
  processSignalMessage(message: TelegramMessage): TelegramIdea | null {
    if (!message.text) return null

    const text = message.text
    const timestamp = new Date(message.date * 1000).toISOString()

    // Detectar tipo de mensagem
    let type: "signal" | "analysis" | "market_update" = "market_update"
    let symbol: string | undefined
    let direction: "buy" | "sell" | undefined
    let category: "forex" | "crypto" | "commodities" = "forex"

    // Detectar sinais de compra/venda
    if (text.includes("🚀") || text.toLowerCase().includes("buy") || text.toLowerCase().includes("compra")) {
      type = "signal"
      direction = "buy"
    } else if (text.includes("🔻") || text.toLowerCase().includes("sell") || text.toLowerCase().includes("venda")) {
      type = "signal"
      direction = "sell"
    } else if (text.includes("📊") || text.includes("📈") || text.includes("📉")) {
      type = "analysis"
    }

    // Detectar símbolo
    const symbolPatterns = [
      /([A-Z]{3}\/[A-Z]{3})/g, // EUR/USD
      /([A-Z]{6})/g, // EURUSD
      /([A-Z]{3}USD)/g, // BTCUSD
      /(XAU\/USD|XAUUSD)/g, // Gold
      /(WTI|BRENT)/g, // Oil
    ]

    for (const pattern of symbolPatterns) {
      const match = text.match(pattern)
      if (match) {
        symbol = match[0]
        break
      }
    }

    // Detectar categoria
    if (symbol) {
      if (symbol.includes("BTC") || symbol.includes("ETH") || symbol.includes("crypto")) {
        category = "crypto"
      } else if (symbol.includes("XAU") || symbol.includes("WTI") || symbol.includes("BRENT")) {
        category = "commodities"
      }
    }

    return {
      id: `tg_${message.message_id}`,
      content: text,
      author: message.from?.first_name || "MTM Analyst",
      timestamp,
      type,
      symbol,
      direction,
      category,
    }
  }

  /**
   * Obtém informações do canal
   * @returns Informações do canal ou null se não configurado
   */
  async getChannelInfo(): Promise<any> {
    if (!this.isConfigured()) {
      console.warn("Telegram not configured - cannot get channel info")
      return null
    }

    try {
      const response = await fetch(`${this.baseUrl}/getChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramConfig.channelId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao obter info do canal:", error)
      throw error
    }
  }

  /**
   * Verifica se o bot é admin do canal
   * @returns Informações sobre as permissões do bot no canal ou null se não configurado
   */
  async getBotPermissions(): Promise<any> {
    if (!this.isConfigured()) {
      console.warn("Telegram not configured - cannot get bot permissions")
      return null
    }

    try {
      const me = await this.getMe()
      if (!me || !me.ok) {
        throw new Error("Não foi possível obter informações do bot")
      }

      const response = await fetch(`${this.baseUrl}/getChatMember`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramConfig.channelId,
          user_id: me.result.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao verificar permissões:", error)
      throw error
    }
  }
}

// Exporta a instância singleton do serviço
export const telegramService = TelegramService.getInstance()

// Função auxiliar para enviar mensagens (compatível com a sugestão do usuário)
export async function sendTelegramMessage(message: string): Promise<any> {
  if (!isTelegramConfigured()) {
    console.warn("Telegram message not sent: configuration incomplete")
    return { success: false, message: "Telegram not configured" }
  }

  try {
    return await telegramService.sendMessage(message)
  } catch (error) {
    console.error("Error sending Telegram message:", error)
    return { success: false, error }
  }
}

export async function getTelegramStatus() {
  if (!isTelegramConfigured()) {
    return {
      configured: false,
      status: "not_configured",
      message:
        "Telegram bot is not configured. Please add TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID environment variables.",
    }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`)

    if (!response.ok) {
      return {
        configured: true,
        status: "error",
        message: `Error connecting to Telegram API: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return {
      configured: true,
      status: "ok",
      botInfo: data.result,
      message: `Connected to Telegram bot: @${data.result.username}`,
    }
  } catch (error) {
    return {
      configured: true,
      status: "error",
      message: `Error connecting to Telegram API: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// Exporta as configurações do Telegram para compatibilidade com o código existente
export const TELEGRAM_CONFIG = telegramConfig
