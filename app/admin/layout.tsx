import type React from "react"
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/admin-dashboard" className="text-white font-bold text-xl">
                MoreThanMoney Admin
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/admin/affiliates"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Afiliados
              </a>
              <a
                href="/admin-dashboard"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
