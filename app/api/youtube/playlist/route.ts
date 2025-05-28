import { type NextRequest, NextResponse } from "next/server"
import { fetchPlaylistData } from "@/app/actions/youtube-actions"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const forceRefresh = searchParams.get("forceRefresh") === "true"

    const data = await fetchPlaylistData(forceRefresh)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("Erro na API do YouTube:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar dados da playlist",
      },
      { status: 500 },
    )
  }
}
