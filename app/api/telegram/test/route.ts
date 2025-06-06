import { NextResponse } from "next/server"
import { sendTelegramMessage } from "@/lib/telegram-service"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Mensagem não fornecida",
        },
        { status: 400 },
      )
    }

    // Formatar a mensagem de teste
    const formattedMessage = `
<b>🧪 MENSAGEM DE TESTE</b>

${message}

<i>Enviado via painel de administração</i>
<code>${new Date().toLocaleString("pt-BR")}</code>
`

    const result = await sendTelegramMessage(formattedMessage)

    if (result && result.ok) {
      return NextResponse.json({
        success: true,
        message: "Mensagem enviada com sucesso",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.description || "Erro ao enviar mensagem",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Erro ao enviar mensagem de teste:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erro ao enviar mensagem",
      },
      { status: 500 },
    )
  }
}
