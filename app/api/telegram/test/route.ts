import { NextResponse } from "next/server"

export async function GET() {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN

    if (!botToken) {
      return NextResponse.json({
        connected: false,
        error: "TELEGRAM_BOT_TOKEN não configurado",
      })
    }

    // Testar conexão com o bot
    const botResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`)
    const botData = await botResponse.json()

    if (!botData.ok) {
      return NextResponse.json({
        connected: false,
        error: "Token do bot inválido",
      })
    }

    // Testar acesso ao canal
    const chatId = "-1002055149876" // ID do seu canal
    const chatResponse = await fetch(`https://api.telegram.org/bot${botToken}/getChat?chat_id=${chatId}`)
    const chatData = await chatResponse.json()

    return NextResponse.json({
      connected: true,
      botInfo: botData.result,
      chatInfo: chatData.ok ? chatData.result : null,
      error: chatData.ok ? null : "Não foi possível acessar o canal",
    })
  } catch (error) {
    return NextResponse.json({
      connected: false,
      error: "Erro na conexão com Telegram API",
    })
  }
}
