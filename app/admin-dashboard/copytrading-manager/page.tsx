"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeftRight, Plus, Trash2, Edit, Save, RefreshCw, LinkIcon, Users, Settings, Server } from "lucide-react"

// Tipos
interface MasterAccount {
  id: string
  name: string
  broker: string
  serverType: "MT4" | "MT5"
  accountNumber: string
  password: string
  server: string
  status: "active" | "inactive"
  subscribers: number
}

interface Subscriber {
  id: string
  username: string
  name: string
  broker: string
  serverType: "MT4" | "MT5"
  accountNumber: string
  server: string
  masterAccountId: string
  status: "active" | "pending" | "error"
  dateLinked: string
}

interface Broker {
  name: string
  servers: {
    mt4: string[]
    mt5: string[]
  }
}

// Lista de brokers e servidores
const brokers: Broker[] = [
  {
    name: "XM",
    servers: {
      mt4: ["XM-Real 1", "XM-Real 2", "XM-Real 3", "XM-Demo"],
      mt5: ["XM-MT5 Real 1", "XM-MT5 Real 2", "XM-MT5 Demo"],
    },
  },
  {
    name: "IC Markets",
    servers: {
      mt4: ["IC Markets-Live01", "IC Markets-Live02", "IC Markets-Live03", "IC Markets-Demo01"],
      mt5: ["IC Markets-Live01", "IC Markets-Live02", "IC Markets-Demo01"],
    },
  },
  {
    name: "Exness",
    servers: {
      mt4: ["Exness-Real", "Exness-Demo"],
      mt5: ["Exness-MT5 Real", "Exness-MT5 Demo"],
    },
  },
  {
    name: "FBS",
    servers: {
      mt4: ["FBS-Real Server", "FBS-Demo Server"],
      mt5: ["FBS-MT5 Real", "FBS-MT5 Demo"],
    },
  },
  {
    name: "Pepperstone",
    servers: {
      mt4: ["Pepperstone-01", "Pepperstone-02", "Pepperstone-Demo"],
      mt5: ["Pepperstone-Live01", "Pepperstone-Live02", "Pepperstone-Demo"],
    },
  },
  {
    name: "FXCM",
    servers: {
      mt4: ["FXCM-Server01", "FXCM-Server02", "FXCM-Demo"],
      mt5: ["FXCM-MT5-01", "FXCM-MT5-02", "FXCM-MT5-Demo"],
    },
  },
  {
    name: "OANDA",
    servers: {
      mt4: ["OANDA-Live", "OANDA-Practice"],
      mt5: ["OANDA-MT5 Live", "OANDA-MT5 Practice"],
    },
  },
  {
    name: "AvaTrade",
    servers: {
      mt4: ["AvaTrade-Live1", "AvaTrade-Live2", "AvaTrade-Demo"],
      mt5: ["AvaTrade-MT5 Live", "AvaTrade-MT5 Demo"],
    },
  },
  {
    name: "FXTM",
    servers: {
      mt4: ["ForexTime-Live1", "ForexTime-Live2", "ForexTime-Demo"],
      mt5: ["FXTM-MT5-Live", "FXTM-MT5-Demo"],
    },
  },
  {
    name: "FxPro",
    servers: {
      mt4: ["FxPro-Real1", "FxPro-Real2", "FxPro-Demo"],
      mt5: ["FxPro-MT5 Real", "FxPro-MT5 Demo"],
    },
  },
]

// Dados de exemplo para demonstração
const initialMasterAccounts: MasterAccount[] = [
  {
    id: "1",
    name: "Conta Mestre Principal",
    broker: "XM",
    serverType: "MT4",
    accountNumber: "12345678",
    password: "********",
    server: "XM-Real 1",
    status: "active",
    subscribers: 3,
  },
  {
    id: "2",
    name: "Conta VIP Forex",
    broker: "IC Markets",
    serverType: "MT5",
    accountNumber: "87654321",
    password: "********",
    server: "IC Markets-Live01",
    status: "active",
    subscribers: 1,
  },
]

const initialSubscribers: Subscriber[] = [
  {
    id: "1",
    username: "joao123",
    name: "João Silva",
    broker: "XM",
    serverType: "MT4",
    accountNumber: "98765432",
    server: "XM-Real 2",
    masterAccountId: "1",
    status: "active",
    dateLinked: "2023-05-15",
  },
  {
    id: "2",
    username: "maria456",
    name: "Maria Oliveira",
    broker: "XM",
    serverType: "MT4",
    accountNumber: "56781234",
    server: "XM-Real 1",
    masterAccountId: "1",
    status: "pending",
    dateLinked: "2023-05-20",
  },
  {
    id: "3",
    username: "pedro789",
    name: "Pedro Santos",
    broker: "XM",
    serverType: "MT4",
    accountNumber: "43218765",
    server: "XM-Real 3",
    masterAccountId: "1",
    status: "error",
    dateLinked: "2023-05-18",
  },
  {
    id: "4",
    username: "ana321",
    name: "Ana Pereira",
    broker: "IC Markets",
    serverType: "MT5",
    accountNumber: "12348765",
    server: "IC Markets-Live01",
    masterAccountId: "2",
    status: "active",
    dateLinked: "2023-05-22",
  },
]

export default function CopytradingManagerPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [masterAccounts, setMasterAccounts] = useState<MasterAccount[]>(initialMasterAccounts)
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers)
  const [selectedBroker, setSelectedBroker] = useState<string>("")
  const [selectedServerType, setSelectedServerType] = useState<"MT4" | "MT5">("MT4")
  const [availableServers, setAvailableServers] = useState<string[]>([])
  const [newMasterAccount, setNewMasterAccount] = useState<Partial<MasterAccount>>({
    name: "",
    broker: "",
    serverType: "MT4",
    accountNumber: "",
    password: "",
    server: "",
    status: "active",
  })
  const [editingAccount, setEditingAccount] = useState<MasterAccount | null>(null)
  const [pendingSubscribers, setPendingSubscribers] = useState<Subscriber[]>([])
  const [selectedMasterAccount, setSelectedMasterAccount] = useState<string>("")

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  // Atualizar lista de servidores quando o broker ou tipo de servidor mudar
  useEffect(() => {
    if (selectedBroker) {
      const broker = brokers.find((b) => b.name === selectedBroker)
      if (broker) {
        setAvailableServers(broker.servers[selectedServerType.toLowerCase() as "mt4" | "mt5"])
      }
    } else {
      setAvailableServers([])
    }
  }, [selectedBroker, selectedServerType])

  // Atualizar pendingSubscribers
  useEffect(() => {
    setPendingSubscribers(subscribers.filter((sub) => sub.status === "pending"))
  }, [subscribers])

  // Manipuladores de eventos para o formulário de nova conta mestre
  const handleBrokerChange = (value: string) => {
    setSelectedBroker(value)
    setNewMasterAccount((prev) => ({ ...prev, broker: value, server: "" }))
  }

  const handleServerTypeChange = (value: "MT4" | "MT5") => {
    setSelectedServerType(value)
    setNewMasterAccount((prev) => ({ ...prev, serverType: value, server: "" }))
  }

  const handleServerChange = (value: string) => {
    setNewMasterAccount((prev) => ({ ...prev, server: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMasterAccount((prev) => ({ ...prev, [name]: value }))
  }

  // Adicionar nova conta mestre
  const handleAddMasterAccount = () => {
    const newAccount: MasterAccount = {
      id: Date.now().toString(),
      name: newMasterAccount.name || "",
      broker: newMasterAccount.broker || "",
      serverType: newMasterAccount.serverType as "MT4" | "MT5",
      accountNumber: newMasterAccount.accountNumber || "",
      password: newMasterAccount.password || "",
      server: newMasterAccount.server || "",
      status: "active",
      subscribers: 0,
    }

    setMasterAccounts((prev) => [...prev, newAccount])
    setNewMasterAccount({
      name: "",
      broker: "",
      serverType: "MT4",
      accountNumber: "",
      password: "",
      server: "",
      status: "active",
    })
  }

  // Editar conta mestre
  const handleEditMasterAccount = (account: MasterAccount) => {
    setEditingAccount(account)
    setSelectedBroker(account.broker)
    setSelectedServerType(account.serverType)
  }

  // Salvar edição de conta mestre
  const handleSaveEdit = () => {
    if (editingAccount) {
      setMasterAccounts((prev) => prev.map((acc) => (acc.id === editingAccount.id ? editingAccount : acc)))
      setEditingAccount(null)
    }
  }

  // Excluir conta mestre
  const handleDeleteMasterAccount = (id: string) => {
    setMasterAccounts((prev) => prev.filter((acc) => acc.id !== id))
    // Também remover assinantes vinculados a esta conta
    setSubscribers((prev) => prev.filter((sub) => sub.masterAccountId !== id))
  }

  // Aprovar assinante pendente
  const handleApproveSubscriber = (id: string) => {
    setSubscribers((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status: "active" } : sub)))
  }

  // Rejeitar assinante pendente
  const handleRejectSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((sub) => sub.id !== id))
  }

  // Desvincular assinante
  const handleUnlinkSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((sub) => sub.id !== id))
  }

  // Verificar status do servidor
  const checkServerStatus = () => {
    // Simulação de verificação de status
    alert("Verificação de status do servidor iniciada. O servidor está operacional.")
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciador de Copytrading</h1>
          <p className="text-gray-500">Configure e gerencie contas mestre e assinantes de copytrading</p>
        </div>
        <Button onClick={() => router.push("/admin-dashboard")} variant="outline">
          Voltar ao Painel
        </Button>
      </div>

      <Tabs defaultValue="master-accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="master-accounts">Contas Mestre</TabsTrigger>
          <TabsTrigger value="subscribers">Assinantes</TabsTrigger>
          <TabsTrigger value="pending">Pendentes ({pendingSubscribers.length})</TabsTrigger>
          <TabsTrigger value="server-status">Status do Servidor</TabsTrigger>
        </TabsList>

        {/* Aba de Contas Mestre */}
        <TabsContent value="master-accounts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Contas Mestre de Copytrading
              </CardTitle>
              <CardDescription>
                Configure as contas mestre que serão usadas para copiar operações para os assinantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-4">
                    <Plus className="h-4 w-4 mr-2" /> Adicionar Conta Mestre
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Conta Mestre</DialogTitle>
                    <DialogDescription>Preencha os detalhes da conta mestre para copytrading</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={newMasterAccount.name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="broker" className="text-right">
                        Broker
                      </Label>
                      <Select onValueChange={handleBrokerChange} value={newMasterAccount.broker}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o broker" />
                        </SelectTrigger>
                        <SelectContent>
                          {brokers.map((broker) => (
                            <SelectItem key={broker.name} value={broker.name || ""}>
                              {broker.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="serverType" className="text-right">
                        Tipo
                      </Label>
                      <Select
                        onValueChange={(value) => handleServerTypeChange(value as "MT4" | "MT5")}
                        value={newMasterAccount.serverType}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MT4">MetaTrader 4</SelectItem>
                          <SelectItem value="MT5">MetaTrader 5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="accountNumber" className="text-right">
                        Número da Conta
                      </Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={newMasterAccount.accountNumber}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Senha
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={newMasterAccount.password}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="server" className="text-right">
                        Servidor
                      </Label>
                      <Select
                        onValueChange={handleServerChange}
                        value={newMasterAccount.server}
                        disabled={!newMasterAccount.broker || !newMasterAccount.serverType}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o servidor" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableServers.map((server) => (
                            <SelectItem key={server} value={server}>
                              {server}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddMasterAccount}>
                      Adicionar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Broker</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Número da Conta</TableHead>
                    <TableHead>Servidor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assinantes</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {masterAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">{account.name}</TableCell>
                      <TableCell>{account.broker}</TableCell>
                      <TableCell>{account.serverType}</TableCell>
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell>{account.server}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            account.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {account.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                      <TableCell>{account.subscribers}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleEditMasterAccount(account)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {editingAccount && (
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Editar Conta Mestre</DialogTitle>
                                  <DialogDescription>Atualize os detalhes da conta mestre</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                      Nome
                                    </Label>
                                    <Input
                                      id="edit-name"
                                      value={editingAccount.name}
                                      onChange={(e) => setEditingAccount({ ...editingAccount, name: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-broker" className="text-right">
                                      Broker
                                    </Label>
                                    <Select
                                      onValueChange={(value) => {
                                        setSelectedBroker(value)
                                        setEditingAccount({ ...editingAccount, broker: value, server: "" })
                                      }}
                                      value={editingAccount.broker}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecione o broker" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {brokers.map((broker) => (
                                          <SelectItem key={broker.name} value={broker.name}>
                                            {broker.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-serverType" className="text-right">
                                      Tipo
                                    </Label>
                                    <Select
                                      onValueChange={(value) => {
                                        const serverType = value as "MT4" | "MT5"
                                        setSelectedServerType(serverType)
                                        setEditingAccount({ ...editingAccount, serverType, server: "" })
                                      }}
                                      value={editingAccount.serverType}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecione o tipo" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="MT4">MetaTrader 4</SelectItem>
                                        <SelectItem value="MT5">MetaTrader 5</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-accountNumber" className="text-right">
                                      Número da Conta
                                    </Label>
                                    <Input
                                      id="edit-accountNumber"
                                      value={editingAccount.accountNumber}
                                      onChange={(e) =>
                                        setEditingAccount({ ...editingAccount, accountNumber: e.target.value })
                                      }
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-password" className="text-right">
                                      Senha
                                    </Label>
                                    <Input
                                      id="edit-password"
                                      type="password"
                                      value={editingAccount.password}
                                      onChange={(e) =>
                                        setEditingAccount({ ...editingAccount, password: e.target.value })
                                      }
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-server" className="text-right">
                                      Servidor
                                    </Label>
                                    <Select
                                      onValueChange={(value) => setEditingAccount({ ...editingAccount, server: value })}
                                      value={editingAccount.server}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecione o servidor" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {availableServers.map((server) => (
                                          <SelectItem key={server} value={server}>
                                            {server}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-status" className="text-right">
                                      Status
                                    </Label>
                                    <Select
                                      onValueChange={(value) =>
                                        setEditingAccount({
                                          ...editingAccount,
                                          status: value as "active" | "inactive",
                                        })
                                      }
                                      value={editingAccount.status}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecione o status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Ativo</SelectItem>
                                        <SelectItem value="inactive">Inativo</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={handleSaveEdit}>
                                    Salvar Alterações
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. Isso excluirá permanentemente a conta mestre e
                                  removerá todos os assinantes vinculados a ela.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteMasterAccount(account.id)}
                                  className="bg-red-600 text-white hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Assinantes */}
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Assinantes de Copytrading
              </CardTitle>
              <CardDescription>Gerencie os assinantes vinculados às contas mestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="filter-master" className="mr-2">
                  Filtrar por Conta Mestre:
                </Label>
                <Select onValueChange={setSelectedMasterAccount} value={selectedMasterAccount}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Todas as contas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as contas</SelectItem>
                    {masterAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Broker</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Número da Conta</TableHead>
                    <TableHead>Servidor</TableHead>
                    <TableHead>Conta Mestre</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Vinculação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers
                    .filter((sub) => (selectedMasterAccount ? sub.masterAccountId === selectedMasterAccount : true))
                    .map((subscriber) => {
                      const masterAccount = masterAccounts.find((acc) => acc.id === subscriber.masterAccountId)
                      return (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">{subscriber.username}</TableCell>
                          <TableCell>{subscriber.name}</TableCell>
                          <TableCell>{subscriber.broker}</TableCell>
                          <TableCell>{subscriber.serverType}</TableCell>
                          <TableCell>{subscriber.accountNumber}</TableCell>
                          <TableCell>{subscriber.server}</TableCell>
                          <TableCell>{masterAccount?.name || "N/A"}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                subscriber.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : subscriber.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {subscriber.status === "active"
                                ? "Ativo"
                                : subscriber.status === "pending"
                                  ? "Pendente"
                                  : "Erro"}
                            </span>
                          </TableCell>
                          <TableCell>{subscriber.dateLinked}</TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                >
                                  <LinkIcon className="h-4 w-4 mr-1" /> Desvincular
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Desvincular assinante?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta ação removerá a vinculação entre o assinante e a conta mestre. O assinante não
                                    receberá mais as operações da conta mestre.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleUnlinkSubscriber(subscriber.id)}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                  >
                                    Desvincular
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Pendentes */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowLeftRight className="h-5 w-5 mr-2" />
                Solicitações Pendentes
              </CardTitle>
              <CardDescription>Aprove ou rejeite solicitações de vinculação pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingSubscribers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Não há solicitações pendentes no momento.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Broker</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Número da Conta</TableHead>
                      <TableHead>Servidor</TableHead>
                      <TableHead>Conta Mestre</TableHead>
                      <TableHead>Data da Solicitação</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingSubscribers.map((subscriber) => {
                      const masterAccount = masterAccounts.find((acc) => acc.id === subscriber.masterAccountId)
                      return (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">{subscriber.username}</TableCell>
                          <TableCell>{subscriber.name}</TableCell>
                          <TableCell>{subscriber.broker}</TableCell>
                          <TableCell>{subscriber.serverType}</TableCell>
                          <TableCell>{subscriber.accountNumber}</TableCell>
                          <TableCell>{subscriber.server}</TableCell>
                          <TableCell>{masterAccount?.name || "N/A"}</TableCell>
                          <TableCell>{subscriber.dateLinked}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                onClick={() => handleApproveSubscriber(subscriber.id)}
                              >
                                Aprovar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                onClick={() => handleRejectSubscriber(subscriber.id)}
                              >
                                Rejeitar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Status do Servidor */}
        <TabsContent value="server-status">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Status do Servidor de Copytrading
              </CardTitle>
              <CardDescription>Monitore o status do servidor e verifique a conectividade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-black/5 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Informações do Servidor</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Online
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Uptime</p>
                      <p className="font-medium">99.8% (30 dias)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contas Ativas</p>
                      <p className="font-medium">{masterAccounts.filter((acc) => acc.status === "active").length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assinantes Ativos</p>
                      <p className="font-medium">{subscribers.filter((sub) => sub.status === "active").length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Última Verificação</p>
                      <p className="font-medium">Hoje, 15:30</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Versão do Servidor</p>
                      <p className="font-medium">1.2.5</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/5 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Ações do Servidor</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={checkServerStatus} className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Verificar Status
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Server className="h-4 w-4 mr-2" />
                      Reiniciar Serviço
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Backup de Configurações
                    </Button>
                  </div>
                </div>

                <div className="bg-black/5 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Logs do Sistema</h3>
                  <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-40 overflow-y-auto">
                    <p>[2023-05-25 15:30:22] INFO: Servidor iniciado com sucesso</p>
                    <p>[2023-05-25 15:30:25] INFO: Conectado a 2 contas mestre</p>
                    <p>[2023-05-25 15:45:10] INFO: Nova operação detectada na conta mestre "Conta Mestre Principal"</p>
                    <p>[2023-05-25 15:45:12] INFO: Operação copiada para 3 assinantes</p>
                    <p>[2023-05-25 16:20:05] INFO: Nova solicitação de vinculação recebida</p>
                    <p>[2023-05-25 16:35:18] INFO: Operação fechada na conta mestre "Conta VIP Forex"</p>
                    <p>[2023-05-25 16:35:20] INFO: Operação fechada para 1 assinante</p>
                    <p>[2023-05-25 17:00:00] INFO: Verificação de status concluída - Todos os sistemas operacionais</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
