import { type NextRequest, NextResponse } from "next/server"
import { memberService } from "@/lib/member-service"
import { ideasService } from "@/lib/ideas-service"

// API para obter estatísticas gerais
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação (em produção, isso seria mais robusto)
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user.isAdmin) {
    //   return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    // }

    const memberStats = await memberService.getMemberStats()
    const ideasStats = await ideasService.getIdeasStats()

    return NextResponse.json({
      members: memberStats,
      ideas: ideasStats,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
