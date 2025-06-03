import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database-service" // Adjust path as necessary
// import { getSession } from 'next-auth/react'; // Or your preferred auth check

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement proper authentication and authorization here.
    // For example, check if the requester is an admin or the user themselves.
    // const session = await getSession({ req: request });
    // if (!session || (!session.user.isAdmin && session.user.id !== userIdFromBody)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { userId, newRole } = await request.json()

    if (!userId || !newRole) {
      return NextResponse.json({ error: "Missing userId or newRole" }, { status: 400 })
    }

    // Validate newRole if necessary (e.g., ensure it's one of the allowed roles)

    const updatedUser = await db.updateUser(userId, { role: newRole })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user role or user not found" }, { status: 404 })
    }

    // Return the updated user object (excluding sensitive info like password_hash)
    const { password_hash, ...userResponse } = updatedUser
    return NextResponse.json(userResponse)
  } catch (error: any) {
    console.error("Error in /api/user/update-role:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
