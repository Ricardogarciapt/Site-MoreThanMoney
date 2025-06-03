import AdminDashboardClient from "./admin-dashboard-client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
