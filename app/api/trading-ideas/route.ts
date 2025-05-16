import { type NextRequest, NextResponse } from "next/server"
import { ideasService } from "@/lib/ideas-service"

// API para gerenciar ideias de trading
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const authorId = searchParams.get("authorId")
    const status = searchParams.get("status")

    let ideas

    if (authorId) {
      ideas = await ideasService.getIdeasByAuthor(authorId)
    } else if (status === "active") {
      ideas = await ideasService.getActiveIdeas()
    } else {
      ideas = await ideasService.getAllIdeas()
    }

    return NextResponse.json({ ideas })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validar dados (em produção, isso seria mais robusto)
    if (!data.title || !data.symbol || !data.direction || !data.authorId) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    const idea = await ideasService.createIdea(data)
    return NextResponse.json({ idea }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
