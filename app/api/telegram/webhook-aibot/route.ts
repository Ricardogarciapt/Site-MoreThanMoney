import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// IDs/usernames dos canais configurados em env
const TRADE_IDEAS_ID = process.env.TELEGRAM_CHANNEL_TRADE_IDEAS || ""    // ex: -3716578747
const PREMIUM_ID    = process.env.TELEGRAM_CHANNEL_PREMIUM_SIGNALS || "" // ex: @MTMgold

// Resolve channel key por ID numérico OU por username (@...)
function resolveChannelKey(chatId: number | string, username?: string): string | null {
  const id = String(chatId)
  const uname = username ? `@${username.replace(/^@/, "")}` : ""

  if (TRADE_IDEAS_ID && (id === TRADE_IDEAS_ID || uname === TRADE_IDEAS_ID)) return "trade_ideas"
  if (PREMIUM_ID    && (id === PREMIUM_ID    || uname === PREMIUM_ID))    return "premium_signals"

  // Fallback: tenta também com prefixo -100 (supergroups)
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = body.channel_post || body.message

    if (!post) {
      return NextResponse.json({ ok: true })
    }

    const chatId = post.chat?.id
    const chatUsername = post.chat?.username
    const channelKey = resolveChannelKey(chatId, chatUsername)

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
