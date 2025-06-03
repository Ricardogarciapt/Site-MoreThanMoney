export const dynamic = "force-dynamic"
export const revalidate = 0

import { redirect } from "next/navigation"

interface AdminCatchAllPageProps {
  params: {
    path: string[]
  }
}

export default function AdminCatchAllPage({ params }: AdminCatchAllPageProps) {
  const path = params.path?.join("/") || ""

  // Redirect to the actual admin dashboard page
  if (!path) {
    redirect("/admin-dashboard")
  }

  // For any other admin paths, redirect to main dashboard
  redirect("/admin-dashboard")
}
