import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const BOT_TOKEN = process.env.TELEGRAM_AIBOT_TOKEN || ""

// Channel IDs configured in env or defaults
const CHANNEL_IDS: Record<string, string> = {
  trade_ideas: process.env.TELEGRAM_CHANNEL_TRADE_IDEAS || "",
  premium_signals: process.env.TELEGRAM_CHANNEL_PREMIUM_SIGNALS || "",
}

const CHANNEL_NAMES: Record<string, string> = {
  trade_ideas: "MTM Trade Ideas",
  premium_signals: "MTM Premium Signals",
}

function extractTopic(text: string): string {
  if (text.includes("💰") || text.toLowerCase().includes("sinal")) return "SINAIS"
  if (text.includes("🏛️") || text.toLowerCase().includes("etf")) return "ETF"
  if (text.includes("🚀") || text.toLowerCase().includes("cripto")) return "CRIPTO"
  if (text.includes("📈") || text.toLowerCase().includes("forex")) return "FOREX"
  if (text.includes("⚡") || text.toLowerCase().includes("alert")) return "ALERTA"
  if (text.includes("XAU") || text.toLowerCase().includes("gold")) return "GOLD"
  return "GERAL"
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.searchParams.get("channel") || "trade_ideas"
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "30")

  if (!CHANNEL_IDS[channel]) {
    // Fallback: try to get from Supabase cache
    return getFromSupabase(channel, limit)
  }

  // Try Supabase first (cached messages from webhook)
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const channelId = CHANNEL_IDS[channel]

      const { data, error } = await supabase
        .from("telegram_messages")
        .select("*")
        .eq("channel_key", channel)
        .order("timestamp", { ascending: false })
        .limit(limit)

      if (!error && data && data.length > 0) {
        const messages = data.reverse().map((row) => ({
          id: row.message_id,
          text: row.text,
          date: formatDate(row.timestamp),
          timestamp: row.timestamp,
          author: row.author || CHANNEL_NAMES[channel],
          channel: channel,
          topic: extractTopic(row.text || ""),
        }))
        return NextResponse.json({ success: true, messages, source: "supabase" })
      }
    }
  } catch {
    // fall through to direct API
  }

  // Direct Telegram API fallback
  if (!BOT_TOKEN) {
    return NextResponse.json({
      success: false,
      messages: [],
      error: "Bot token not configured. Set TELEGRAM_AIBOT_TOKEN env var.",
    })
  }

  try {
    const chatId = CHANNEL_IDS[channel]
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?limit=50`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.ok) {
      return NextResponse.json({ success: false, messages: [], error: data.description })
    }

    const messages = data.result
      .filter((update: any) => {
        const post = update.channel_post || update.message
        if (!post) return false
        if (chatId && String(post.chat?.id) !== chatId) return false
        return true
      })
      .map((update: any) => {
        const post = update.channel_post || update.message
        return {
          id: post.message_id,
          text: post.text || post.caption || "",
          date: formatDate(post.date),
          timestamp: post.date,
          author: post.chat?.title || CHANNEL_NAMES[channel],
          channel,
          topic: extractTopic(post.text || ""),
        }
      })
      .filter((m: any) => m.text)
      .slice(-limit)

    return NextResponse.json({ success: true, messages, source: "telegram_api" })
  } catch (error) {
    return NextResponse.json({ success: false, messages: [], error: String(error) })
  }
}

async function getFromSupabase(channel: string, limit: number) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: true, messages: [], note: "No channel ID configured" })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data } = await supabase
      .from("telegram_messages")
      .select("*")
      .eq("channel_key", channel)
      .order("timestamp", { ascending: false })
      .limit(limit)

    const messages = (data || []).reverse().map((row) => ({
      id: row.message_id,
      text: row.text,
      date: formatDate(row.timestamp),
      timestamp: row.timestamp,
      author: row.author || "MTM",
      channel,
      topic: extractTopic(row.text || ""),
    }))

    return NextResponse.json({ success: true, messages, source: "supabase" })
  } catch {
    return NextResponse.json({ success: true, messages: [] })
  }
}
