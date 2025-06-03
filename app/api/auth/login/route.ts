import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database-service"
import { verifyPassword } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    // Get user from database
    const dbUser = await db.getUserByUsername(username)

    if (!dbUser) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, dbUser.password_hash)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

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
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
