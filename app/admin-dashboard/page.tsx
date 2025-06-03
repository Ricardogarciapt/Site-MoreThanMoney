import dynamic from "next/dynamic"

// Force dynamic rendering
export const revalidate = 0

const AdminDashboardClient = dynamic(() => import("./admin-dashboard-client"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
    </div>
  ),
})

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
