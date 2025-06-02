import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database-service"
import { hashPassword } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    if (!userData.username || !userData.password || !userData.name) {
      return NextResponse.json({ error: "Username, password, and name are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.getUserByUsername(userData.username)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hashPassword(userData.password)

    // Create user in database
    const newUser = await db.createUser({
      username: userData.username,
      name: userData.name,
      email: userData.email || null,
      phone: userData.phone || null,
      social_link: userData.social_link || null,
      jifu_id: userData.jifu_id || null,
      package: userData.package || null,
      role: userData.role || "Membro",
      password_hash: passwordHash,
      is_admin: false,
    })

    if (!newUser) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Return user data (without password)
    const responseData = {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      social_link: newUser.social_link,
      jifu_id: newUser.jifu_id,
      package: newUser.package,
      role: newUser.role || "Membro",
      is_admin: false,
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Registration API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
