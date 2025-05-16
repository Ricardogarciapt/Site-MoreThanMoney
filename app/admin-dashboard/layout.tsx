import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-100`}>
      <AuthProvider>
        {/* Aqui você pode adicionar componentes específicos do admin como sidebar, header, etc. */}
        <div className="flex">
          {/* Conteúdo principal */}
          <main className="flex-1">{children}</main>
        </div>
      </AuthProvider>
    </div>
  )
}
