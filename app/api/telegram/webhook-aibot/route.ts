import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Channel key mapping — configured via env vars
const CHANNEL_MAP: Record<string, string> = {
  [process.env.TELEGRAM_CHANNEL_TRADE_IDEAS || "trade_ideas_placeholder"]: "trade_ideas",
  [process.env.TELEGRAM_CHANNEL_PREMIUM_SIGNALS || "premium_signals_placeholder"]: "premium_signals",
}

function resolveChannelKey(chatId: number | string): string | null {
  const id = String(chatId)
  return CHANNEL_MAP[id] || null
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = body.channel_post || body.message

    if (!post) {
      return NextResponse.json({ ok: true })
    }

    const chatId = post.chat?.id
    const channelKey = resolveChannelKey(chatId)

    const text = post.text || post.caption || ""
    if (!text) {
      return NextResponse.json({ ok: true })
    }

    const messageData = {
      message_id: post.message_id,
      channel_id: String(chatId),
      channel_key: channelKey || "unknown",
      channel_name: post.chat?.title || channelKey || "Unknown Channel",
      text,
      author: post.from?.first_name || post.chat?.title || "MTM",
      timestamp: post.date,
      created_at: new Date().toISOString(),
    }

    console.log(`[aibot webhook] New message from channel ${channelKey || chatId}:`, text.substring(0, 80))

    const supabase = getSupabase()
    if (supabase) {
      const { error } = await supabase
        .from("telegram_messages")
        .upsert(messageData, { onConflict: "message_id,channel_id" })

      if (error) {
        console.error("[aibot webhook] Supabase error:", error.message)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[aibot webhook] Error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Webhook aibot ativo",
    bot: "@MoreThanMoney_aibot",
    channels: ["trade_ideas", "premium_signals"],
  })
}
