import { NextResponse } from "next/server"
import { healthCheck } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const health = await healthCheck()

    return NextResponse.json(health, {
      status: health.status === "healthy" ? 200 : 503,
    })
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
