import { NextRequest, NextResponse } from "next/server"

const BOT_TOKEN = process.env.TELEGRAM_AIBOT_TOKEN || ""
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`

// Bot commands menu
const BOT_COMMANDS = [
  { command: "start", description: "Iniciar o bot" },
  { command: "sinais", description: "Ver últimos sinais de trading" },
  { command: "ideias", description: "Ver ideias de trading" },
  { command: "premium", description: "Ver sinais premium" },
  { command: "status", description: "Estado dos canais" },
  { command: "ajuda", description: "Ajuda e comandos disponíveis" },
]

export async function POST(request: NextRequest) {
  if (!BOT_TOKEN) {
    return NextResponse.json({ success: false, error: "TELEGRAM_AIBOT_TOKEN not set" }, { status: 400 })
  }

  const { action, webhookUrl } = await request.json().catch(() => ({}))

  const results: Record<string, any> = {}

  try {
    // 1. Set commands
    const commandsRes = await fetch(`${BASE_URL}/setMyCommands`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commands: BOT_COMMANDS }),
    })
    results.commands = await commandsRes.json()

    // 2. Set bot description
    const descRes = await fetch(`${BASE_URL}/setMyDescription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: "Bot oficial da MoreThanMoney. Recebe sinais e ideias de trading dos canais MTM Trade Ideas e MTM Premium Signals.",
      }),
    })
    results.description = await descRes.json()

    // 3. Set short description
    const shortDescRes = await fetch(`${BASE_URL}/setMyShortDescription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ short_description: "Sinais e ideias de trading MTM" }),
    })
    results.shortDescription = await shortDescRes.json()

    // 4. Set webhook if URL provided
    if (webhookUrl) {
      const webhookRes = await fetch(`${BASE_URL}/setWebhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ["message", "channel_post"],
          drop_pending_updates: true,
        }),
      })
      results.webhook = await webhookRes.json()
    }

    // 5. Get bot info
    const meRes = await fetch(`${BASE_URL}/getMe`)
    results.botInfo = await meRes.json()

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  if (!BOT_TOKEN) {
    return NextResponse.json({ success: false, error: "TELEGRAM_AIBOT_TOKEN not set" })
  }

  try {
    const [meRes, webhookRes, commandsRes] = await Promise.all([
      fetch(`${BASE_URL}/getMe`),
      fetch(`${BASE_URL}/getWebhookInfo`),
      fetch(`${BASE_URL}/getMyCommands`),
    ])

    return NextResponse.json({
      success: true,
      bot: await meRes.json(),
      webhook: await webhookRes.json(),
      commands: await commandsRes.json(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) })
  }
}
