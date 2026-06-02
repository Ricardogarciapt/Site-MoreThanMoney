import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const TRADE_IDEAS_ID = process.env.TELEGRAM_CHANNEL_TRADE_IDEAS || ""
const PREMIUM_ID    = process.env.TELEGRAM_CHANNEL_PREMIUM_SIGNALS || ""

// chat_channels slugs existentes no Supabase
const CHANNEL_SLUG: Record<string, string> = {
  trade_ideas:     "trade-ideas-setup",
  premium_signals: "premium-ideas",
}

function resolveChannelKey(chatId: number | string, username?: string): string | null {
  const id = String(chatId)
  const uname = username ? `@${username.replace(/^@/, "")}` : ""

  if (TRADE_IDEAS_ID && (id === TRADE_IDEAS_ID || uname === TRADE_IDEAS_ID)) return "trade_ideas"
  if (PREMIUM_ID    && (id === PREMIUM_ID    || uname === PREMIUM_ID))    return "premium_signals"

  // Fallback com prefixo -100 (supergroups)
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

    if (!post) return NextResponse.json({ ok: true })

    const chatId   = post.chat?.id
    const chatUser = post.chat?.username
    const channelKey = resolveChannelKey(chatId, chatUser)
    const text = post.text || post.caption || ""

    if (!text) return NextResponse.json({ ok: true })

    const sender = post.from?.first_name || post.chat?.title || "MTM"
    const slug   = channelKey ? CHANNEL_SLUG[channelKey] : null

    console.log(`[webhook-aibot] canal=${channelKey || chatId} slug=${slug} msg=${text.substring(0, 60)}`)

    const supabase = getSupabase()
    if (!supabase) {
      console.error("[webhook-aibot] Supabase não configurado")
      return NextResponse.json({ ok: true })
    }

    // Insere em chat_messages (tabela principal da app)
    if (slug) {
      const { error: chatErr } = await supabase
        .from("chat_messages")
        .upsert(
          {
            channel_slug:        slug,
            content:             text,
            message_type:        "telegram",
            telegram_sender:     sender,
            telegram_message_id: post.message_id,
            user_id:             null,
            created_at:          new Date(post.date * 1000).toISOString(),
          },
          { onConflict: "telegram_message_id,channel_slug" }
        )
      if (chatErr) console.error("[webhook-aibot] chat_messages error:", chatErr.message)
    }

    // Também guarda em telegram_messages (backup/histórico)
    const { error: tmErr } = await supabase
      .from("telegram_messages")
      .upsert(
        {
          message_id:   post.message_id,
          channel_id:   String(chatId),
          channel_key:  channelKey || "unknown",
          channel_name: post.chat?.title || channelKey || "Unknown",
          text,
          author:       sender,
          timestamp:    post.date,
          created_at:   new Date().toISOString(),
        },
        { onConflict: "message_id,channel_id" }
      )
    if (tmErr) console.error("[webhook-aibot] telegram_messages error:", tmErr.message)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[webhook-aibot] Error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Webhook aibot ativo",
    bot: "@MoreThanMoney_aibot",
    channels: { trade_ideas: CHANNEL_SLUG.trade_ideas, premium_signals: CHANNEL_SLUG.premium_signals },
  })
}
