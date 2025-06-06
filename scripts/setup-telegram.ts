#!/usr/bin/env tsx

import { telegramConfig, isTelegramConfigured } from "../lib/telegram-config"
import fetch from "node-fetch"

async function checkTelegramConfig() {
  console.log("Checking Telegram configuration...")

  if (!isTelegramConfigured()) {
    console.error("❌ Telegram configuration is incomplete!")
    console.error("Please set the following environment variables:")
    console.error("- TELEGRAM_BOT_TOKEN")
    console.error("- TELEGRAM_CHANNEL_ID")
    console.error("Optional environment variables:")
    console.error("- TELEGRAM_INVITE_LINK")
    console.error("- TELEGRAM_CHANNEL_NAME")
    console.error("- TELEGRAM_BOT_USERNAME")
    process.exit(1)
  }

  console.log("✅ Telegram environment variables are set")

  try {
    console.log("Testing connection to Telegram API...")
    const response = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/getMe`)

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}: ${response.statusText}`)
    }

    const data = (await response.json()) as any

    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description}`)
    }

    console.log("✅ Successfully connected to Telegram API")
    console.log(`Bot information:`)
    console.log(`- Username: @${data.result.username}`)
    console.log(`- Name: ${data.result.first_name}`)
    console.log(`- Bot ID: ${data.result.id}`)

    console.log("\nTelegram configuration is valid and working!")
  } catch (error) {
    console.error("❌ Failed to connect to Telegram API:")
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

checkTelegramConfig().catch(console.error)
