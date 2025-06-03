import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database-service"
import { verifyPassword } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    console.log("API Login - dados recebidos:", { username, password: "***" })

    if (!username || !password) {
      console.log("API Login - dados faltando")
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    // Get user from database
    console.log("API Login - buscando usuário no banco:", username)
    const dbUser = await db.getUserByUsername(username)

    if (!dbUser) {
      console.log("API Login - usuário não encontrado no banco")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("API Login - usuário encontrado, verificando senha")
    // Verify password
    const isValidPassword = await verifyPassword(password, dbUser.password_hash)

    if (!isValidPassword) {
      console.log("API Login - senha inválida")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("API Login - login bem-sucedido")
    // Update last login
    await db.updateUser(dbUser.id, { last_login: new Date().toISOString() })

    // Return user data (without password)
    const userData = {
      id: dbUser.id,
      username: dbUser.username,
      name: dbUser.name,
      email: dbUser.email,
      phone: dbUser.phone,
      social_link: dbUser.social_link,
      jifu_id: dbUser.jifu_id,
      package: dbUser.package,
      role: dbUser.role || "Membro",
      is_admin: dbUser.is_admin,
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error("API Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
