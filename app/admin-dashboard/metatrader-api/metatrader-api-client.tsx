"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeftRight,
  Check,
  Copy,
  Database,
  PlayCircle,
  PowerOff,
  RefreshCw,
  Save,
  Settings,
  StopCircle,
  User,
  UserCheck,
  X,
} from "lucide-react"

// Tipos
interface MetaTraderConfig {
  enabled: boolean
  apiUrl: string
  apiKey: string
  serverType: "MT4" | "MT5"
  serverName: string
  brokerName: string
  masterAccounts: MasterAccount[]
}

interface MasterAccount {
  id: string
  name: string
  login: string
  password: string
  server: string
  enabled: boolean
  subscribers: number
}

interface Subscriber {
  id: string
  userId: string
  name: string
  accountNumber: string
  server: string
  status: "active" | "pending" | "disabled" | "error"
  masterAccountId: string
  lastSync: string
  copyratio: number
}

// Estado inicial simulado
const initialConfig: MetaTraderConfig = {
  enabled: false,
  apiUrl: "https://api.metatrader-integration.com/v1",
  apiKey: "mt_api_key_12345",
  serverType: "MT5",
  serverName: "TradingServer01",
  brokerName: "XM",
  masterAccounts: [
    {
      id: "1",
      name: "Conta Principal MTM",
      login: "12345678",
      password: "********",
      server: "XM-Real1",
      enabled: true,
      subscribers: 3,
    },
    {
      id: "2",
      name: "Conta VIP Forex",
      login: "87654321",
      password: "********",
      server: "XM-Real2",
      enabled: false,
      subscribers: 1,
    },
  ],
}

const subscribers: Subscriber[] = [
  {
    id: "1",
    userId: "user123",
    name: "João Silva",
    accountNumber: "345678",
    server: "XM-Real1",
    status: "active",
    masterAccountId: "1",
    lastSync: "2023-10-12 14:30:45",
    copyratio: 1.0,
  },
  {
    id: "2",
    userId: "user456",
    name: "Maria Souza",
    accountNumber: "456789",
    server: "XM-Real1",
    status: "active",
    masterAccountId: "1",
    lastSync: "2023-10-12 14:28:12",
    copyratio: 0.5,
  },
  {
    id: "3",
    userId: "user789",
    name: "Pedro Alves",
    accountNumber: "567890",
    server: "XM-Real1",
    status: "pending",
    masterAccountId: "1",
    lastSync: "-",
    copyratio: 1.0,
  },
  {
    id: "4",
    userId: "user321",
    name: "Ana Costa",
    accountNumber: "654321",
    server: "XM-Real2",
    status: "active",
    masterAccountId: "2",
    lastSync: "2023-10-12 13:15:30",
    copyratio: 0.75,
  },
  {
    id: "5",
    userId: "user654",
    name: "Carlos Mendes",
    accountNumber: "123987",
    server: "XM-Real1",
    status: "error",
    masterAccountId: "1",
    lastSync: "2023-10-12 10:45:22 (Erro)",
    copyratio: 1.0,
  },
]

export default function MetaTraderAPIClient() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [config, setConfig] = useState<MetaTraderConfig>(initialConfig)
  const [subscriberList, setSubscriberList] = useState<Subscriber[]>(subscribers)
  const [activeTab, setActiveTab] = useState("geral")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [selectedMaster, setSelectedMaster] = useState<string>("all")
  const [isServiceRunning, setIsServiceRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "[2023-10-12 14:30:45] INFO: Conexão estabelecida com servidor MT5",
    "[2023-10-12 14:30:47] INFO: 2 contas mestre encontradas",
    "[2023-10-12 14:31:00] INFO: Sincronização iniciada para 4 assinantes",
    "[2023-10-12 14:31:10] WARN: Falha ao conectar com conta de Carlos Mendes",
    "[2023-10-12 14:31:15] INFO: Sincronização completada com sucesso para 3 assinantes",
  ])

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  // Funções
  const handleToggleService = () => {
    setIsServiceRunning(!isServiceRunning)
    addLog(
      `[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Serviço de copytrading ${
        !isServiceRunning ? "iniciado" : "parado"
      }`,
    )
  }

  const handleToggleMasterAccount = (id: string) => {
    setConfig({
      ...config,
      masterAccounts: config.masterAccounts.map((acc) => (acc.id === id ? { ...acc, enabled: !acc.enabled } : acc)),
    })
    addLog(
      `[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Conta mestre ${id} ${
        config.masterAccounts.find((acc) => acc.id === id)?.enabled ? "desativada" : "ativada"
      }`,
    )
  }

  const handleToggleSubscriber = (id: string) => {
    setSubscriberList(
      subscriberList.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: sub.status === "active" ? "disabled" : sub.status === "disabled" ? "active" : sub.status,
            }
          : sub,
      ),
    )
    const subscriber = subscriberList.find((sub) => sub.id === id)
    addLog(
      `[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Assinante ${
        subscriber?.name
      } ${subscriber?.status === "active" ? "desativado" : "ativado"}`,
    )
  }

  const handleConfigChange = (field: keyof MetaTraderConfig, value: any) => {
    setConfig({ ...config, [field]: value })
  }

  const handleSaveConfig = () => {
    setIsSaving(true)
    // Simulação de salvamento
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      addLog(`[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Configurações salvas com sucesso`)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }

  const handleRefreshConnections = () => {
    addLog(`[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Atualizando conexões...`)
    // Simulação de atualização
    setTimeout(() => {
      addLog(
        `[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Conexões atualizadas, ${
          subscriberList.filter((s) => s.status === "active").length
        } assinantes ativos`,
      )
    }, 1500)
  }

  const handleApproveSubscriber = (id: string) => {
    setSubscriberList(
      subscriberList.map((sub) => (sub.id === id ? { ...sub, status: "active", lastSync: "Agora" } : sub)),
    )
    const subscriber = subscriberList.find((sub) => sub.id === id)
    addLog(
      `[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Assinante ${
        subscriber?.name
      } aprovado e ativado`,
    )
  }

  const handleRejectSubscriber = (id: string) => {
    setSubscriberList(subscriberList.filter((sub) => sub.id !== id))
    const subscriber = subscriberList.find((sub) => sub.id === id)
    addLog(`[${new Date().toISOString().slice(0, 19).replace("T", " ")}] INFO: Assinante ${subscriber?.name} rejeitado`)
  }

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev].slice(0, 100))
  }

  const filterSubscribers = () => {
    return subscriberList.filter((sub) => {
      if (selectedMaster === "all") return true
      if (selectedMaster === "pending") return sub.status === "pending"
      return sub.masterAccountId === selectedMaster
    })
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">API MetaTrader - Copytrading</h1>
          <p className="text-gray-500">Configure a integração com MetaTrader para copytrading</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleToggleService}
            className={`${
              isServiceRunning ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isServiceRunning ? (
              <>
                <StopCircle className="h-4 w-4 mr-2" /> Parar Serviço
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-2" /> Iniciar Serviço
              </>
            )}
          </Button>
          <Button onClick={() => router.push("/admin-dashboard")} variant="outline">
            Voltar ao Painel
          </Button>
        </div>
      </div>

      {isServiceRunning && (
        <Alert className="mb-6 bg-green-500/10 text-green-500 border-green-500/30">
          <PlayCircle className="h-4 w-4" />
          <AlertTitle>Serviço em Execução</AlertTitle>
          <AlertDescription>
            O serviço de copytrading está ativo e sincronizando operações. Última sincronização:{" "}
            {new Date().toLocaleTimeString()}
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="geral">Configurações Gerais</TabsTrigger>
          <TabsTrigger value="master">Contas Mestre ({config.masterAccounts.length})</TabsTrigger>
          <TabsTrigger value="subscribers">
            Assinantes ({subscriberList.filter((s) => s.status !== "pending").length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pendentes ({subscriberList.filter((s) => s.status === "pending").length})
          </TabsTrigger>
        </TabsList>

        {/* Aba de Configurações Gerais */}
        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações da API MetaTrader
              </CardTitle>
              <CardDescription>Configure os parâmetros de conexão com a API do MetaTrader</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="api-enabled"
                  checked={config.enabled}
                  onCheckedChange={(checked) => handleConfigChange("enabled", checked)}
                />
                <Label htmlFor="api-enabled">Habilitar API de Copytrading</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-url">URL da API</Label>
                    <Input
                      id="api-url"
                      value={config.apiUrl}
                      onChange={(e) => handleConfigChange("apiUrl", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="api-key">Chave da API</Label>
                    <div className="flex gap-2">
                      <Input
                        id="api-key"
                        type="password"
                        value={config.apiKey}
                        onChange={(e) => handleConfigChange("apiKey", e.target.value)}
                      />
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="server-type">Tipo de Servidor</Label>
                    <Select
                      value={config.serverType}
                      onValueChange={(value) => handleConfigChange("serverType", value)}
                    >
                      <SelectTrigger id="server-type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MT4">MetaTrader 4</SelectItem>
                        <SelectItem value="MT5">MetaTrader 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="server-name">Nome do Servidor</Label>
                    <Input
                      id="server-name"
                      value={config.serverName}
                      onChange={(e) => handleConfigChange("serverName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="broker-name">Nome do Broker</Label>
                    <Input
                      id="broker-name"
                      value={config.brokerName}
                      onChange={(e) => handleConfigChange("brokerName", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={handleRefreshConnections}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Testar Conexão
                </Button>
                <Button onClick={handleSaveConfig} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </div>

              {saveSuccess && (
                <Alert className="mt-4 bg-green-500/10 text-green-500 border-green-500/30">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Salvo com Sucesso</AlertTitle>
                  <AlertDescription>As configurações foram salvas com sucesso.</AlertDescription>
                </Alert>
              )}

              <div className="mt-6 border border-gray-800 rounded-md bg-black/30 p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Logs do Sistema
                </h3>
                <div className="bg-black text-green-400 p-3 rounded font-mono text-xs h-40 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Contas Mestre */}
        <TabsContent value="master">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowLeftRight className="h-5 w-5 mr-2" />
                Contas Mestre
              </CardTitle>
              <CardDescription>Gerencie as contas de origem para o copytrading</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Login</TableHead>
                    <TableHead>Servidor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assinantes</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.masterAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">{account.name}</TableCell>
                      <TableCell>{account.login}</TableCell>
                      <TableCell>{account.server}</TableCell>
                      <TableCell>
                        <Badge
                          variant={account.enabled ? "success" : "destructive"}
                          className={account.enabled ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}
                        >
                          {account.enabled ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>{account.subscribers}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleMasterAccount(account.id)}
                            className={
                              account.enabled
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            }
                          >
                            {account.enabled ? (
                              <>
                                <PowerOff className="h-4 w-4 mr-1" /> Desativar
                              </>
                            ) : (
                              <>
                                <PlayCircle className="h-4 w-4 mr-1" /> Ativar
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-1" /> Editar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex justify-end">
                <Button>
                  <span className="mr-1">+</span> Adicionar Conta Mestre
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Assinantes */}
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2" />
                Assinantes
              </CardTitle>
              <CardDescription>Gerencie os assinantes que estão copiando operações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="filter-master">Filtrar por Conta Mestre</Label>
                  <Select value={selectedMaster} onValueChange={setSelectedMaster}>
                    <SelectTrigger id="filter-master">
                      <SelectValue placeholder="Todas as contas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as contas</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      {config.masterAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-6">
                  <Button variant="outline" onClick={handleRefreshConnections}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Atualizar Conexões
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead>Vinculado a</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Proporção</TableHead>
                    <TableHead>Última Sinc.</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterSubscribers()
                    .filter((sub) => sub.status !== "pending")
                    .map((subscriber) => {
                      const masterAccount = config.masterAccounts.find((acc) => acc.id === subscriber.masterAccountId)
                      return (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">{subscriber.name}</TableCell>
                          <TableCell>{subscriber.accountNumber}</TableCell>
                          <TableCell>{masterAccount?.name || "—"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                subscriber.status === "active"
                                  ? "success"
                                  : subscriber.status === "error"
                                    ? "destructive"
                                    : "outline"
                              }
                              className={
                                subscriber.status === "active"
                                  ? "bg-green-500/20 text-green-500"
                                  : subscriber.status === "error"
                                    ? "bg-red-500/20 text-red-500"
                                    : "bg-gray-500/20 text-gray-500"
                              }
                            >
                              {subscriber.status === "active"
                                ? "Ativo"
                                : subscriber.status === "error"
                                  ? "Erro"
                                  : "Desativado"}
                            </Badge>
                          </TableCell>
                          <TableCell>{subscriber.copyratio}x</TableCell>
                          <TableCell>{subscriber.lastSync}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleSubscriber(subscriber.id)}
                                className={
                                  subscriber.status === "active"
                                    ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                    : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                }
                              >
                                {subscriber.status === "active" ? (
                                  <>
                                    <PowerOff className="h-4 w-4 mr-1" /> Desativar
                                  </>
                                ) : (
                                  <>
                                    <PlayCircle className="h-4 w-4 mr-1" /> Ativar
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addLog(`Sincronização manual iniciada para ${subscriber.name}`)}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" /> Sincronizar
                              </Button>
                            </div>
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
                <User className="h-5 w-5 mr-2" />
                Assinantes Pendentes
              </CardTitle>
              <CardDescription>Aprovar ou rejeitar solicitações de copytrading</CardDescription>
            </CardHeader>
            <CardContent>
              {subscriberList.filter((sub) => sub.status === "pending").length === 0 ? (
                <div className="text-center py-8 text-gray-500">Não há solicitações pendentes no momento.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Conta</TableHead>
                      <TableHead>Vinculado a</TableHead>
                      <TableHead>Servidor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriberList
                      .filter((sub) => sub.status === "pending")
                      .map((subscriber) => {
                        const masterAccount = config.masterAccounts.find((acc) => acc.id === subscriber.masterAccountId)
                        return (
                          <TableRow key={subscriber.id}>
                            <TableCell className="font-medium">{subscriber.name}</TableCell>
                            <TableCell>{subscriber.accountNumber}</TableCell>
                            <TableCell>{masterAccount?.name || "—"}</TableCell>
                            <TableCell>{subscriber.server}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                  onClick={() => handleApproveSubscriber(subscriber.id)}
                                >
                                  <Check className="h-4 w-4 mr-1" /> Aprovar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                  onClick={() => handleRejectSubscriber(subscriber.id)}
                                >
                                  <X className="h-4 w-4 mr-1" /> Rejeitar
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
      </Tabs>
    </div>
  )
}
