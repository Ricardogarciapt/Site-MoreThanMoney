import { type NextRequest, NextResponse } from "next/server"

// Simulação de dados de sinais
const mockSignals = [
  {
    id: 1,
    type: "BUY",
    symbol: "EURUSD",
    price: "1.0850",
    takeProfit: "1.0900",
    stopLoss: "1.0800",
    timestamp: new Date().toISOString(),
    status: "active",
  },
  {
    id: 2,
    type: "SELL",
    symbol: "GBPUSD",
    price: "1.2650",
    takeProfit: "1.2600",
    stopLoss: "1.2700",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "closed",
  },
  {
    id: 3,
    type: "BUY",
    symbol: "BTCUSD",
    price: "45000",
    takeProfit: "46000",
    stopLoss: "44000",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    let signals = mockSignals

    if (status) {
      signals = signals.filter((signal) => signal.status === status)
    }

    signals = signals.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: signals,
      total: mockSignals.length,
    })
  } catch (error) {
    console.error("Erro ao carregar sinais:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao carregar sinais",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const signal = await request.json()

    // Aqui você salvaria o sinal no banco de dados
    console.log("Novo sinal recebido:", signal)

    return NextResponse.json({
      success: true,
      message: "Sinal processado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao processar sinal:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar sinal",
      },
      { status: 500 },
    )
  }
}
