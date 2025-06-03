"use client"
import dynamic from "next/dynamic"

// Lista de roles disponíveis
const availableRoles = [
  "Membro",
  "Membro VIP",
  "Distribuidor",
  "Educador",
  "Liderança",
  "Rising Star",
  "Silver Manager",
  "Gold Manager",
  "Platinum Manager",
  "Elite",
  "Director",
  "Diamond",
  "Presidential",
]

interface UserData {
  username: string
  name: string
  email?: string
  role?: string
}

const UserRolesPageComponent = dynamic(() => import("./user-roles-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando gerenciamento de funções...</p>
      </div>
    </div>
  ),
})

export default function UserRolesPage() {
  return <UserRolesPageComponent />
}
