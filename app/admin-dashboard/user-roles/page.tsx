export const dynamic = "force-dynamic"
export const revalidate = 0

import { Suspense } from "react"
import UserRolesClient from "./user-roles-client"

export default function UserRolesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Roles Management</h1>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <UserRolesClient />
      </Suspense>
    </div>
  )
}
