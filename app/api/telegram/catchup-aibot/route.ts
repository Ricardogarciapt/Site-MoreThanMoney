import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const BOT_TOKEN = process.env.TELEGRAM_AIBOT_TOKEN || ""
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`
const WEBHOOK_URL = "https://morethanmoney.pt/api/telegram/webhook-aibot"

const TRADE_IDEAS_ID = process.env.TELEGRAM_CHANNEL_TRADE_IDEAS || ""
const PREMIUM_ID    = process.env.TELEGRAM_CHANNEL_PREMIUM_SIGNALS || ""

function resolveChannelKey(chatId: number | string, username?: string): string | null {
  const id = String(chatId)
  const uname = username ? `@${username.replace(/^@/, "")}` : ""
  if (TRADE_IDEAS_ID && (id === TRADE_IDEAS_ID || uname === TRADE_IDEAS_ID)) return "trade_ideas"
  if (PREMIUM_ID    && (id === PREMIUM_ID    || uname === PREMIUM_ID))    return "premium_signals"
  const withPrefix = id.startsWith("-100") ? id : `-100${id.replace(/^-/, "")}`
  if (TRADE_IDEAS_ID && withPrefix === TRADE_IDEAS_ID) return "trade_ideas"
  if (PREMIUM_ID    && withPrefix === PREMIUM_ID)    return "premium_signals"
  return null
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

function todayStart(): number {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return Math.floor(d.getTime() / 1000)
}

export async function POST(request: NextRequest) {
  if (!BOT_TOKEN) {
    return NextResponse.json({ success: false, error: "TELEGRAM_AIBOT_TOKEN not set" }, { status: 400 })
  }

  const stats = { fetched: 0, saved: 0, skipped: 0, errors: 0 }

  try {
    // 1. Remove webhook temporariamente para poder usar getUpdates
    await fetch(`${BASE_URL}/deleteWebhook`, { method: "POST" })

    // 2. Busca até 100 updates (com offset 0 para apanhar tudo)
    const updRes = await fetch(`${BASE_URL}/getUpdates?limit=100&offset=0&allowed_updates=["channel_post","message"]`)
    const updData = await updRes.json()

    if (!updData.ok) {
      // Restaura webhook e retorna erro
      await setWebhook()
      return NextResponse.json({ success: false, error: updData.description })
    }

    const updates = updData.result || []
    stats.fetched = updates.length

    const supabase = getSupabase()
    const todayTs = todayStart()

    for (const update of updates) {
      const post = update.channel_post || update.message
      if (!post) { stats.skipped++; continue }

      const text = post.text || post.caption || ""
      if (!text) { stats.skipped++; continue }

      // Filtra mensagens de hoje
      if (post.date < todayTs) { stats.skipped++; continue }

      const channelKey = resolveChannelKey(post.chat?.id, post.chat?.username)

      const messageData = {
        message_id: post.message_id,
        channel_id: String(post.chat?.id),
        channel_key: channelKey || "unknown",
        channel_name: post.chat?.title || channelKey || "MTM",
        text,
        author: post.from?.first_name || post.chat?.title || "MTM",
        timestamp: post.date,
        created_at: new Date().toISOString(),
      }

      if (supabase) {
        const { error } = await supabase
          .from("telegram_messages")
          .upsert(messageData, { onConflict: "message_id,channel_id" })

        if (error) {
          console.error("[catchup] Supabase error:", error.message)
          stats.errors++
        } else {
          stats.saved++
        }
      } else {
        stats.skipped++
      }
    }

    // 3. Restaura webhook
    await setWebhook()

    return NextResponse.json({
      success: true,
      stats,
      message: `Catchup concluído: ${stats.saved} mensagens guardadas de hoje.`,
    })
  } catch (error) {
    await setWebhook()
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

async function setWebhook() {
  return fetch(`${BASE_URL}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: WEBHOOK_URL,
      allowed_updates: ["message", "channel_post"],
      drop_pending_updates: false,
    }),
  })
}

export async function GET() {
  if (!BOT_TOKEN) {
    return NextResponse.json({ success: false, error: "TELEGRAM_AIBOT_TOKEN not set" })
  }
  // Verifica quantas updates existem sem as consumir
  const res = await fetch(`${BASE_URL}/getWebhookInfo`)
  const data = await res.json()
  return NextResponse.json({
    webhook: data.result?.url,
    pending: data.result?.pending_update_count,
    last_error: data.result?.last_error_message || null,
  })
}
