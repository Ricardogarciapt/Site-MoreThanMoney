import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const IQONIC_WEBHOOK = "ite5r9Qtin82q"
const IQONIC_API_BASE = "https://shield.iqonic.life/outerinfo.dhtml"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e password são obrigatórios" }, { status: 400 })
    }

    // 1. Verificar credenciais no IQONIC
    const iqonicUrl = `${IQONIC_API_BASE}?webhook=${IQONIC_WEBHOOK}&action=verifylogin&distid=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`

    const iqonicRes = await fetch(iqonicUrl)
    const iqonicData = await iqonicRes.json()

    // Resposta de erro: [{"error":"Login Failed"}]
    if (!Array.isArray(iqonicData) || iqonicData[0]?.error) {
      return NextResponse.json(
        { error: "Credenciais IQONIC inválidas. Verifica o teu email e password." },
        { status: 401 }
      )
    }

    // 2. Auth bem-sucedida — criar/encontrar utilizador no Supabase
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Tentar sign in primeiro
    let session = null

    const { data: signInData } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password: `iqonic_${email}_${IQONIC_WEBHOOK}`,
    })

    if (signInData?.session) {
      session = signInData.session
    } else {
      // Utilizador não existe — criar
      const iqonicUserData = iqonicData[0] || {}
      const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: `iqonic_${email}_${IQONIC_WEBHOOK}`,
        email_confirm: true,
        user_metadata: {
          full_name: iqonicUserData.name || iqonicUserData.fullname || email.split("@")[0],
          iqonic_id: iqonicUserData.distid || iqonicUserData.id || null,
          auth_provider: "iqonic",
        },
      })

      if (createError) {
        console.error("Erro ao criar utilizador Supabase:", createError)
        return NextResponse.json({ error: "Erro ao criar conta. Tenta novamente." }, { status: 500 })
      }

      // Sign in após criação
      const { data: newSignIn, error: newSignInError } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password: `iqonic_${email}_${IQONIC_WEBHOOK}`,
      })

      if (newSignInError || !newSignIn?.session) {
        console.error("Erro ao fazer sign in após criação:", newSignInError)
        return NextResponse.json({ error: "Erro de autenticação. Tenta novamente." }, { status: 500 })
      }

      session = newSignIn.session
    }

    return NextResponse.json({ session, iqonic: iqonicData[0] || {} })
  } catch (error) {
    console.error("Erro na autenticação IQONIC:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
