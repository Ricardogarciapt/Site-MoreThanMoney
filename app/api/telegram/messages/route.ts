import { NextResponse } from "next/server"
import { telegramService } from "@/lib/telegram-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    let messages

    if (type) {
      messages = await telegramService.getMessagesByType(type, limit)
    } else if (category) {
      messages = await telegramService.getMessagesByCategory(category, limit)
    } else {
      messages = await telegramService.getRecentMessages(limit)
    }

    return NextResponse.json({
      success: true,
      messages,
      total: messages.length,
    })
  } catch (error) {
    console.error("Erro ao buscar mensagens do Telegram:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        messages: [],
        total: 0,
      },
      { status: 500 },
    )
  }
}

// Endpoint para limpar cache
export async function DELETE() {
  try {
    telegramService.clearCache()
    return NextResponse.json({
      success: true,
      message: "Cache limpo com sucesso",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao limpar cache",
      },
      { status: 500 },
    )
  }
}
