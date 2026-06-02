/**
 * Script de configuração do bot @MoreThanMoney_aibot
 * Executa: npx ts-node scripts/setup-telegram-aibot.ts
 *
 * O que faz:
 * 1. Define comandos/menus do bot
 * 2. Configura descrição
 * 3. Define webhook para receber mensagens dos canais
 * 4. Lista info do bot e webhook atual
 */

const BOT_TOKEN = process.env.TELEGRAM_AIBOT_TOKEN || "8918862800:AAEXM03NYwbEDjCBZprfioPp4NGADnRnaHc"
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`

// URL base do site em produção — alterar se necessário
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://morethanmoney.pt"
const WEBHOOK_URL = `${SITE_URL}/api/telegram/webhook-aibot`

const COMMANDS = [
  { command: "start", description: "🚀 Iniciar o bot MTM" },
  { command: "sinais", description: "📈 Últimos sinais de trading" },
  { command: "ideias", description: "💡 Ideias de trading recentes" },
  { command: "premium", description: "⭐ Sinais MTM Premium" },
  { command: "status", description: "🟢 Estado dos canais" },
  { command: "ajuda", description: "❓ Ajuda e comandos" },
]

async function call(method: string, body?: object) {
  const url = `${BASE_URL}/${method}`
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  return data
}

async function main() {
  console.log("🤖 Configurando @MoreThanMoney_aibot...\n")

  // 1. Verificar bot
  const me = await call("getMe")
  if (!me.ok) {
    console.error("❌ Token inválido:", me.description)
    process.exit(1)
  }
  console.log(`✅ Bot: @${me.result.username} (ID: ${me.result.id})`)

  // 2. Definir comandos
  const cmds = await call("setMyCommands", { commands: COMMANDS })
  console.log(`✅ Comandos definidos: ${cmds.ok ? "OK" : cmds.description}`)

  // 3. Definir descrição
  const desc = await call("setMyDescription", {
    description:
      "Bot oficial MoreThanMoney. Recebe sinais e ideias de trading dos canais MTM Trade Ideas e MTM Premium Signals em tempo real.",
  })
  console.log(`✅ Descrição: ${desc.ok ? "OK" : desc.description}`)

  // 4. Short description
  const short = await call("setMyShortDescription", {
    short_description: "Sinais & ideias de trading MTM",
  })
  console.log(`✅ Short description: ${short.ok ? "OK" : short.description}`)

  // 5. Configurar webhook
  const webhook = await call("setWebhook", {
    url: WEBHOOK_URL,
    allowed_updates: ["message", "channel_post"],
    drop_pending_updates: true,
  })
  console.log(`✅ Webhook (${WEBHOOK_URL}): ${webhook.ok ? "OK" : webhook.description}`)

  // 6. Verificar webhook
  const webhookInfo = await call("getWebhookInfo")
  console.log("\n📡 Webhook info:")
  console.log(`   URL: ${webhookInfo.result?.url || "não definido"}`)
  console.log(`   Pending updates: ${webhookInfo.result?.pending_update_count || 0}`)
  console.log(`   Last error: ${webhookInfo.result?.last_error_message || "nenhum"}`)

  console.log("\n✅ Configuração completa!")
  console.log("\n⚠️  PRÓXIMOS PASSOS:")
  console.log("   1. Adiciona o bot @MoreThanMoney_aibot como ADMIN nos canais:")
  console.log("      - More Than Money Ideias de Forex")
  console.log("      - MoreThanMoney Premium Signals")
  console.log("   2. Envia uma mensagem de teste em cada canal")
  console.log("   3. Verifica os IDs dos canais em Supabase > telegram_messages")
  console.log("   4. Adiciona os IDs nas env vars:")
  console.log("      TELEGRAM_CHANNEL_TRADE_IDEAS=<id_do_canal_ideias>")
  console.log("      TELEGRAM_CHANNEL_PREMIUM_SIGNALS=<id_do_canal_premium>")
}

main().catch(console.error)
