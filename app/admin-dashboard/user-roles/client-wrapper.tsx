"use client"

import dynamic from "next/dynamic"

const UserRolesClient = dynamic(() => import("./user-roles-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando gerenciamento de funções...</p>
      </div>
    </div>
  ),
})

export default function ClientWrapper() {
  return <UserRolesClient />
}
