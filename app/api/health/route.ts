import { NextResponse } from "next/server"
import { healthCheck } from "@/lib/supabase"

export async function GET() {
  try {
    const health = await healthCheck()

    // Retornar status HTTP baseado na saúde do sistema
    const statusCode = health.status === "healthy" ? 200 : 503

    return NextResponse.json(health, { status: statusCode })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}
