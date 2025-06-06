// Script para verificar variáveis de ambiente críticas
const criticalVars = [
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
]

const importantVars = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHANNEL_ID", "TELEGRAM_WEBHOOK_SECRET"]

const optionalVars = ["NEXT_PUBLIC_GA_ID", "YOUTUBE_API_KEY", "NOTION_API_KEY", "NOTION_DATABASE_ID"]

function checkEnvVariables(vars, level) {
  console.log(`\n${level} VARIABLES:`)
  let allPresent = true

  vars.forEach((varName) => {
    const value = process.env[varName]
    if (!value) {
      console.log(`❌ ${varName} is missing`)
      if (level === "CRITICAL") allPresent = false
    } else {
      const maskedValue =
        varName.includes("SECRET") || varName.includes("KEY")
          ? value.substring(0, 4) + "..." + value.substring(value.length - 4)
          : value
      console.log(`✅ ${varName}: ${maskedValue}`)
    }
  })

  return allPresent
}

// Verificar variáveis
const criticalOk = checkEnvVariables(criticalVars, "CRITICAL")
checkEnvVariables(importantVars, "IMPORTANT")
checkEnvVariables(optionalVars, "OPTIONAL")

if (!criticalOk) {
  console.log("\n⚠️ AVISO: Algumas variáveis críticas estão faltando!")
  console.log("O aplicativo pode não funcionar corretamente.")
} else {
  console.log("\n✅ Todas as variáveis críticas estão configuradas!")
}
