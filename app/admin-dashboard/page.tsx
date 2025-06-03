import dynamic from "next/dynamic"
import ClientWrapper from "./client-wrapper"

const AdminDashboardClient = dynamic(() => import("./admin-dashboard-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando painel administrativo...</p>
      </div>
    </div>
  ),
})

export default function AdminDashboardPage() {
  return <ClientWrapper />
}
