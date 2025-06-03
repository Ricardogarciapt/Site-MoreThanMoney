"use client"

import dynamic from "next/dynamic"

const AdminDashboardClient = dynamic(() => import("./admin-dashboard-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <AdminDashboardClient />
}
