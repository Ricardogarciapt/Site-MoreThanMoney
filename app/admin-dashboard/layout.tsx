import type React from "react"
import { Suspense } from "react"
import AdminSidebar from "@/components/admin-sidebar"

// Force dynamic rendering
export const dynamic = "force-dynamic"
export const revalidate = 0

function AdminLayoutLoading() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-64 bg-gray-900 animate-pulse"></div>
      <div className="flex-1 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 bg-gray-800 rounded mb-2"></div>
          <div className="h-4 bg-gray-800 rounded mb-2"></div>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Suspense fallback={<div className="w-64 bg-gray-900 animate-pulse"></div>}>
        <AdminSidebar />
      </Suspense>
      <main className="flex-1 overflow-auto">
        <Suspense fallback={<AdminLayoutLoading />}>{children}</Suspense>
      </main>
    </div>
  )
}
