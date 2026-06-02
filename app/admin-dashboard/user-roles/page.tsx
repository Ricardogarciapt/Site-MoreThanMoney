"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Search, Shield, User, Users, Smartphone, Star, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Packs de acesso (subscription tiers)
const MEMBERSHIP_PACKS = [
  {
    key: "member_skool",
    label: "Skool Member",
    price: "$65/mês",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/30",
    access: ["Stream Skool para membros", "Site MoreThanMoney", "Conteúdo educacional"],
  },
  {
    key: "member_iqonic",
    label: "Member IQonic",
    price: "—",
    icon: Star,
    color: "text-gold-400",
    bg: "bg-gold-500/10 border-gold-500/30",
    access: ["Todos os streams", "Site MoreThanMoney", "App Mobile", "Copytrading", "Scanners Premium"],
  },
  {
    key: "member_app",
    label: "Member APP",
    price: "—",
    icon: Smartphone,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/30",
    access: ["Acesso apenas à App Mobile", "Chat de sinais", "Canais Telegram MTM"],
  },
]

// Lista completa de roles disponíveis
const availableRoles = [
  // Packs de acesso
  "member_skool",
  "member_iqonic",
  "member_app",
  // Roles de organização
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

const ROLE_LABELS: Record<string, string> = {
  member_skool: "Skool Member",
  member_iqonic: "Member IQonic",
  member_app: "Member APP",
}

interface UserData {
  username: string
  name: string
  email?: string
  role?: string
}

export default function UserRolesPage() {
  const { user, isAuthenticated, isAdmin, updateUserRole } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState("")

  // Carregar usuários do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const formattedUsers = registeredUsers.map((u: any) => ({
        username: u.username,
        name: u.name,
        email: u.email,
        role: u.role || "Membro",
      }))
      setUsers(formattedUsers)
    }
  }, [])

  // Redirecionar se não for autenticado ou admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (!isAdmin) {
      router.push("/member-area")
    }
  }, [isAuthenticated, isAdmin, router])

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Selecionar usuário para edição
  const handleSelectUser = (user: UserData) => {
    setSelectedUser(user)
    setSelectedRole(user.role || "Membro")
    setSuccessMessage("")
  }

  // Atualizar role do usuário
  const handleUpdateRole = () => {
    if (selectedUser && selectedRole) {
      const success = updateUserRole(selectedUser.username, selectedRole)

      if (success) {
        // Atualizar a lista de usuários
        setUsers(users.map((u) => (u.username === selectedUser.username ? { ...u, role: selectedRole } : u)))

        setSuccessMessage(`Role de ${selectedUser.name} atualizado para ${selectedRole}`)

        // Limpar a mensagem após 3 segundos
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      }
    }
  }

  // Se não for admin, não mostrar conteúdo
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-[350px] bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
            <CardDescription className="text-center">Esta área é exclusiva para administradores.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Shield className="h-16 w-16 text-gold-500" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button variant="default" className="bg-gold-600 hover:bg-gold-700 text-black">
                Voltar para o Início
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestão de Funções & Packs</h1>
          <p className="text-gray-400">Atribua packs de acesso e funções aos membros da plataforma MoreThanMoney.</p>
        </div>

        {/* Membership Packs Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {MEMBERSHIP_PACKS.map(({ key, label, price, icon: Icon, color, bg, access }) => (
            <div key={key} className={`border rounded-xl p-4 ${bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className={color} />
                <span className={`font-bold text-sm ${color}`}>{label}</span>
                {price !== "—" && (
                  <span className="ml-auto text-xs text-gray-400">{price}</span>
                )}
              </div>
              <ul className="space-y-1">
                {access.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Check size={10} className="text-green-400 flex-none" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {successMessage && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-md flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-400">{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lista de Usuários */}
          <div className="md:col-span-2">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Usuários Registrados
                </CardTitle>
                <CardDescription>Selecione um usuário para gerenciar sua função</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.username}
                        className={`p-3 border rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                          selectedUser?.username === user.username
                            ? "border-gold-500 bg-gold-500/10"
                            : "border-gray-700 hover:border-gold-500/50 hover:bg-gold-500/5"
                        }`}
                        onClick={() => handleSelectUser(user)}
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-gray-300" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.username}</p>
                          </div>
                        </div>
                        <div>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            user.role === "member_app"
                              ? "bg-green-500/20 text-green-400"
                              : user.role === "member_iqonic"
                              ? "bg-gold-500/20 text-gold-400"
                              : user.role === "member_skool"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-gray-700 text-gray-300"
                          }`}>
                            {ROLE_LABELS[user.role || ""] || user.role || "Membro"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      Nenhum usuário encontrado com o termo de busca.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel de Edição */}
          <div>
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Gerenciar Função</CardTitle>
                <CardDescription>
                  {selectedUser ? `Editando função de ${selectedUser.name}` : "Selecione um usuário para editar"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedUser ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Usuário</Label>
                      <Input
                        id="username"
                        value={selectedUser.username}
                        disabled
                        className="bg-gray-800/50 border-white/10 text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role">Função</Label>
                      <select
                        id="role"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-gray-800/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <optgroup label="── Packs de Acesso ──">
                            <option value="member_skool">Skool Member ($65/mês)</option>
                            <option value="member_iqonic">Member IQonic (Todos os streams)</option>
                            <option value="member_app">Member APP (Só App Mobile)</option>
                          </optgroup>
                          <optgroup label="── Roles de Organização ──">
                            {availableRoles.filter(r => !r.startsWith("member_")).map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </optgroup>
                      </select>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleUpdateRole} className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                        Atualizar Função
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-400">
                    Selecione um usuário da lista para gerenciar sua função.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-4">
              <Link href="/admin-dashboard">
                <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                  Voltar para o Painel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
