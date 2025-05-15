"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle, CheckCircle, XCircle, Lock, Home, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock do contexto de autenticação
const useAuth = () => {
  // Simulação de um usuário autenticado como admin
  return {
    user: {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
    },
    isAuthenticated: true,
    isAdmin: true,
    logout: () => console.log("Logout"),
  }
}

// Dados simulados de usuários com copytrading
const copytradingUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    plan: "Premium",
    broker: "XM",
    accountId: "12345678",
    status: "active",
    lastSync: "2023-05-14T10:30:00",
    traders: 3,
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@example.com",
    plan: "VIP",
    broker: "IC Markets",
    accountId: "87654321",
    status: "active",
    lastSync: "2023-05-14T11:45:00",
    traders: 5,
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro@example.com",
    plan: "Basic",
    broker: "Exness",
    accountId: "23456789",
    status: "error",
    lastSync: "2023-05-13T09:15:00",
    traders: 1,
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    plan: "Premium",
    broker: "FBS",
    accountId: "34567890",
    status: "pending",
    lastSync: "2023-05-14T08:00:00",
    traders: 2,
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    plan: "VIP",
    broker: "Hotforex",
    accountId: "45678901",
    status: "active",
    lastSync: "2023-05-14T14:20:00",
    traders: 7,
  },
]

export default function AdminPage() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [users, setUsers] = useState(copytradingUsers)
  const [syncingAll, setSyncingAll] = useState(false)
  const [syncingUser, setSyncingUser] = useState<number | null>(null)

  // Simula a sincronização de um usuário específico
  const handleSyncUser = (userId: number) => {
    setSyncingUser(userId)

    setTimeout(() => {
      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              status: "active",
              lastSync: new Date().toISOString(),
            }
          }
          return user
        }),
      )
      setSyncingUser(null)
    }, 1500)
  }

  // Simula a sincronização de todos os usuários
  const handleSyncAll = () => {
    setSyncingAll(true)

    setTimeout(() => {
      setUsers(
        users.map((user) => ({
          ...user,
          status: "active",
          lastSync: new Date().toISOString(),
        })),
      )
      setSyncingAll(false)
    }, 2000)
  }

  // Simula o reset de uma conexão com erro
  const handleResetConnection = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: "pending",
            lastSync: new Date().toISOString(),
          }
        }
        return user
      }),
    )
  }

  // Renderiza o status do usuário com o ícone apropriado
  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Ativo
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-600">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Erro
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-600">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return <Badge className="bg-gray-600">Desconhecido</Badge>
    }
  }

  // Formata a data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-[350px] bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
            <CardDescription className="text-center">Esta área é exclusiva para administradores.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Lock className="h-16 w-16 text-gold-500" />
          </CardContent>
          <CardContent className="flex justify-center">
            <Link href="/">
              <Button variant="default" className="bg-gold-600 hover:bg-gold-700 text-black">
                Voltar para o Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-10 bg-black border-b border-gold-500/30 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gold-500">Painel Administrativo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
                <Home className="h-4 w-4 mr-2" /> Ver Site
              </Button>
            </Link>
            <Button onClick={logout} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user?.name}</h1>
          <p className="text-gray-400">Aqui você pode gerenciar as configurações e conteúdo do site MoreThanMoney.</p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/50 border border-gold-500/30">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Usuários
            </TabsTrigger>
            <TabsTrigger value="copytrading" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Copytrading
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-black/50 border-gold-500/30">
                <CardHeader>
                  <CardTitle>Usuários</CardTitle>
                  <CardDescription>Total de usuários registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">125</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-gold-500/30">
                <CardHeader>
                  <CardTitle>Assinaturas Ativas</CardTitle>
                  <CardDescription>Usuários com planos ativos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">87</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-gold-500/30">
                <CardHeader>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>Receita total do mês atual</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">R$ 15.430</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas ações no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gold-500/30">
                      <TableHead className="text-gold-400">Usuário</TableHead>
                      <TableHead className="text-gold-400">Ação</TableHead>
                      <TableHead className="text-gold-400">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-gold-500/30">
                      <TableCell>João Silva</TableCell>
                      <TableCell>Assinatura do plano Premium</TableCell>
                      <TableCell>14/05/2023 10:30</TableCell>
                    </TableRow>
                    <TableRow className="border-gold-500/30">
                      <TableCell>Maria Oliveira</TableCell>
                      <TableCell>Configuração de copytrading</TableCell>
                      <TableCell>14/05/2023 11:45</TableCell>
                    </TableRow>
                    <TableRow className="border-gold-500/30">
                      <TableCell>Pedro Santos</TableCell>
                      <TableCell>Novo registro</TableCell>
                      <TableCell>13/05/2023 09:15</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>Lista de todos os usuários registrados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gold-500/30">
                      <TableHead className="text-gold-400">Nome</TableHead>
                      <TableHead className="text-gold-400">Email</TableHead>
                      <TableHead className="text-gold-400">Plano</TableHead>
                      <TableHead className="text-gold-400">Data de Registro</TableHead>
                      <TableHead className="text-gold-400">Status</TableHead>
                      <TableHead className="text-gold-400">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-gold-500/30">
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.plan}</TableCell>
                        <TableCell>14/05/2023</TableCell>
                        <TableCell>{renderStatus(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gold-500 text-gold-400 hover:bg-gold-500/10"
                            >
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500 text-red-400 hover:bg-red-500/10"
                            >
                              Excluir
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="copytrading">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciamento de Copytrading</CardTitle>
                  <CardDescription>Monitoramento e controle das conexões de copytrading</CardDescription>
                </div>
                <Button
                  className="bg-gold-600 hover:bg-gold-700 text-black"
                  onClick={handleSyncAll}
                  disabled={syncingAll}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${syncingAll ? "animate-spin" : ""}`} />
                  {syncingAll ? "Sincronizando..." : "Sincronizar Todos"}
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gold-500/30">
                      <TableHead className="text-gold-400">Usuário</TableHead>
                      <TableHead className="text-gold-400">Plano</TableHead>
                      <TableHead className="text-gold-400">Corretora</TableHead>
                      <TableHead className="text-gold-400">Conta</TableHead>
                      <TableHead className="text-gold-400">Traders</TableHead>
                      <TableHead className="text-gold-400">Status</TableHead>
                      <TableHead className="text-gold-400">Última Sincronização</TableHead>
                      <TableHead className="text-gold-400">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-gold-500/30">
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.plan}</TableCell>
                        <TableCell>{user.broker}</TableCell>
                        <TableCell>{user.accountId}</TableCell>
                        <TableCell>{user.traders}</TableCell>
                        <TableCell>{renderStatus(user.status)}</TableCell>
                        <TableCell>{formatDate(user.lastSync)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gold-500 text-gold-400 hover:bg-gold-500/10"
                              onClick={() => handleSyncUser(user.id)}
                              disabled={syncingUser === user.id}
                            >
                              <RefreshCw className={`h-3 w-3 mr-1 ${syncingUser === user.id ? "animate-spin" : ""}`} />
                              {syncingUser === user.id ? "Sincronizando..." : "Sincronizar"}
                            </Button>

                            {user.status === "error" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleResetConnection(user.id)}
                              >
                                Resetar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>Configurações gerais da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Configurações de Copytrading</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="auto-sync" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="auto-sync">Ativar sincronização automática</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notify-users" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="notify-users">Notificar usuários sobre problemas de conexão</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="log-history" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="log-history">Registrar histórico de operações</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Configurações de Email</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="smtp-server" className="block mb-1">
                          Servidor SMTP
                        </label>
                        <input
                          id="smtp-server"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-800/50 border-white/10 text-white"
                          defaultValue="smtp.example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="smtp-port" className="block mb-1">
                          Porta
                        </label>
                        <input
                          id="smtp-port"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-800/50 border-white/10 text-white"
                          defaultValue="587"
                        />
                      </div>
                      <div>
                        <label htmlFor="smtp-email" className="block mb-1">
                          Email de Envio
                        </label>
                        <input
                          id="smtp-email"
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-800/50 border-white/10 text-white"
                          defaultValue="noreply@jifu.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-gold-600 hover:bg-gold-700 text-black">Salvar Configurações</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
