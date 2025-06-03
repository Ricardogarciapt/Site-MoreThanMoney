export const dynamic = "force-dynamic"
export const revalidate = 0

import { Suspense } from "react"
import { supabaseAdmin } from "@/lib/supabase"
import AdminDashboardClient from "./admin-dashboard-client"

// Server action to check Supabase connection
async function checkSupabaseConnection() {
  "use server"

  try {
    const { data, error } = await supabaseAdmin.from("users").select("count").limit(1)

    return { connected: !error, error: error?.message }
  } catch (err) {
    return { connected: false, error: "Connection failed" }
  }
}

export default async function AdminDashboardPage() {
  const supabaseStatus = await checkSupabaseConnection()

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-600">Database Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs ${
              supabaseStatus.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {supabaseStatus.connected ? "Connected" : "Disconnected"}
          </span>
          {!supabaseStatus.connected && <span className="text-xs text-red-600">({supabaseStatus.error})</span>}
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <AdminDashboardClient />
      </Suspense>
    </div>
  )
}
