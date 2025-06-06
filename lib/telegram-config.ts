export const telegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  channelId: process.env.TELEGRAM_CHANNEL_ID,
  inviteLink: process.env.TELEGRAM_INVITE_LINK || "https://t.me/+2XMn1YEjfjYwYTE0",
  channelName: process.env.TELEGRAM_CHANNEL_NAME || "MoreThanMoney Trade Ideas",
  botUsername: process.env.TELEGRAM_BOT_USERNAME || "@MoreThanMoney_Copierbot",
}

export function isTelegramConfigured(): boolean {
  return !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHANNEL_ID)
}
