"use client"

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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useConfigStore } from "@/lib/config-service"
import { copytradingService, type CopytradingAccount, type TradeOperation } from "@/lib/copytrading-service"
import {
  ArrowLeftRight,
  Check,
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
  AlertCircle,
} from "lucide-react"

export default function CopytradingManagerClient() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { config, updateConfig } = useConfigStore()
  const [activeTab, setActiveTab] = useState("accounts")
  const [isServiceRunning, setIsServiceRunning] = useState(false)
  const [accounts, setAccounts] = useState<CopytradingAccount[]>([])
  const [operations, setOperations] = useState<TradeOperation[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState<string>("all")
  const [masterAccount, setMasterAccount] = useState({
    brokerName: config.copytrading?.masterAccount?.brokerName || "InfinoxLimited",
    accountNumber: config.copytrading?.masterAccount?.accountNumber || "87047541",
    serverName: config.copytrading?.masterAccount?.serverName || "InfinoxLimited-MT5Live",
    password: config.copytrading?.masterAccount?.password || "Superacao2022#",
  })
  const [isSaving, setIsSaving] = useState(false)

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    } else {
      loadData()
    }
  }, [isAuthenticated, isAdmin, router])

  // Carregar dados
  const loadData = async () => {
    setIsLoading(true)
    try {
      // Verificar se o serviço está ativo
      setIsServiceRunning(config.copytrading?.enabled || false)

      // Carregar contas
      const accounts = await copytradingService.getAccounts()
      setAccounts(accounts)

      // Carregar operações
      const operations = await copytradingService.getOperationsByUserId("all")
      setOperations(operations)

      // Adicionar log
      addLog("Dados carregados com sucesso")
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error)
      addLog(`Erro ao carregar dados: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Adicionar log
  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19)
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 100))
  }

  // Iniciar/parar serviço
  const toggleService = () => {
    if (isServiceRunning) {
      // Parar serviço
      copytradingService.stopService()
      setIsServiceRunning(false)
      updateConfig({ copytrading: { ...config.copytrading, enabled: false } })
      addLog("Serviço de copytrading parado")
      toast({
        title: "Serviço parado",
        description: "O serviço de copytrading foi parado com sucesso.",
      })
    } else {
      // Iniciar serviço
      updateConfig({ copytrading: { ...config.copytrading, enabled: true } })
      copytradingService.startService()
      setIsServiceRunning(true)
      addLog("Serviço de copytrading iniciado")
      toast({
        title: "Serviço iniciado",
        description: "O serviço de copytrading foi iniciado com sucesso.",
      })
    }
  }

  // Atualizar status de conta
  const updateAccountStatus = (userId: string, status: CopytradingAccount["status"]) => {
    try {
      copytradingService.updateAccountStatus(userId, status)
      loadData() // Recarregar dados
      addLog(`Status da conta ${userId} atualizado para ${status}`)
      toast({
        title: "Status atualizado",
        description: `O status da conta foi atualizado para ${status}.`,
      })
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error)
      addLog(`Erro ao atualizar status: ${error.message}`)
      toast({
        title: "Erro",
        description: `Erro ao atualizar status: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  // Sincronizar operações
  const syncOperations = async () => {
    addLog("Iniciando sincronização manual...")
    try {
      await copytradingService.syncTrades()
      loadData() // Recarregar dados
      addLog("Sincronização manual concluída com sucesso")
      toast({
        title: "Sincronização concluída",
        description: "As operações foram sincronizadas com sucesso.",
      })
    } catch (error: any) {
      console.error("Erro na sincronização:", error)
      addLog(`Erro na sincronização: ${error.message}`)
      toast({
        title: "Erro",
        description: `Erro na sincronização: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  // Salvar configurações da conta mestre
  const saveMasterAccount = () => {
    setIsSaving(true)
    try {
      updateConfig({
        copytrading: {
          ...config.copytrading,
          masterAccount: masterAccount,
        },
      })
      addLog("Configurações da conta mestre salvas com sucesso")
      toast({
        title: "Configurações salvas",
        description: "As configurações da conta mestre foram salvas com sucesso.",
      })
    } catch (error: any) {
      console.error("Erro ao salvar configurações:", error)
      addLog(`Erro ao salvar configurações: ${error.message}`)
      toast({
        title: "Erro",
        description: `Erro ao salvar configurações: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Filtrar operações por conta
  const filteredOperations =
    selectedAccount === "all" ? operations : operations.filter((op) => op.userId === selectedAccount)

  // Filtrar contas pendentes
  const pendingAccounts = accounts.filter((acc) => acc.status === "pending")

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciador de Copytrading</h1>
          <p className="text-gray-500">Configure e gerencie o sistema de copytrading</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={toggleService}
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
          <AlertDescription>
            O serviço de copytrading está ativo e sincronizando operações. Última sincronização:{" "}
            {new Date().toLocaleTimeString()}
          </AlertDescription>
        </Alert>
      )}

      {!isServiceRunning && (
        <Alert className="mb-6 bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            O serviço de copytrading está desativado. Clique em "Iniciar Serviço" para ativar.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="accounts">Contas ({accounts.length})</TabsTrigger>
          <TabsTrigger value="operations">Operações ({operations.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendentes ({pendingAccounts.length})</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        {/* Aba de Contas */}
        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2" />
                Contas de Copytrading
              </CardTitle>
              <CardDescription>Gerencie as contas de clientes conectadas ao copytrading</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : accounts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Nenhuma conta de copytrading registrada.</div>
              ) : (
                <>
                  <div className="mb-4">
                    <Button variant="outline" onClick={loadData} className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Atualizar Dados
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Broker</TableHead>
                        <TableHead>Conta</TableHead>
                        <TableHead>Servidor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Última Sinc.</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accounts.map((account) => (
                        <TableRow key={account.userId}>
                          <TableCell className="font-medium">{account.userId}</TableCell>
                          <TableCell>{account.brokerName}</TableCell>
                          <TableCell>{account.accountNumber}</TableCell>
                          <TableCell>{account.serverName}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                account.status === "active"
                                  ? "default"
                                  : account.status === "error"
                                    ? "destructive"
                                    : account.status === "pending"
                                      ? "outline"
                                      : "secondary"
                              }
                              className={
                                account.status === "active"
                                  ? "bg-green-500/20 text-green-500"
                                  : account.status === "error"
                                    ? "bg-red-500/20 text-red-500"
                                    : account.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-500"
                                      : "bg-gray-500/20 text-gray-500"
                              }
                            >
                              {account.status === "active"
                                ? "Ativo"
                                : account.status === "error"
                                  ? "Erro"
                                  : account.status === "pending"
                                    ? "Pendente"
                                    : "Desativado"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(account.lastSync).toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {account.status === "active" ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                  onClick={() => updateAccountStatus(account.userId, "disabled")}
                                >
                                  <PowerOff className="h-4 w-4 mr-1" /> Desativar
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                  onClick={() => updateAccountStatus(account.userId, "active")}
                                >
                                  <PlayCircle className="h-4 w-4 mr-1" /> Ativar
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  addLog(`Sincronização manual iniciada para ${account.userId}`)
                                  toast({
                                    title: "Sincronização iniciada",
                                    description: `Sincronização manual iniciada para ${account.userId}`,
                                  })
                                }}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" /> Sincronizar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Operações */}
        <TabsContent value="operations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowLeftRight className="h-5 w-5 mr-2" />
                Operações de Trading
              </CardTitle>
              <CardDescription>Visualize e gerencie as operações copiadas</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-4">
                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Todas as contas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as contas</SelectItem>
                        {accounts.map((account) => (
                          <SelectItem key={account.userId} value={account.userId}>
                            {account.userId} ({account.accountNumber})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={syncOperations} className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sincronizar Operações
                    </Button>
                  </div>

                  {filteredOperations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Nenhuma operação encontrada.</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Símbolo</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Volume</TableHead>
                          <TableHead>Preço Abertura</TableHead>
                          <TableHead>Preço Fechamento</TableHead>
                          <TableHead>Lucro</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data Abertura</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOperations.map((operation) => (
                          <TableRow key={operation.id}>
                            <TableCell className="font-medium">{operation.symbol}</TableCell>
                            <TableCell>
                              <span
                                className={
                                  operation.type === "buy" ? "text-green-500 font-medium" : "text-red-500 font-medium"
                                }
                              >
                                {operation.type === "buy" ? "Compra" : "Venda"}
                              </span>
                            </TableCell>
                            <TableCell>{operation.volume.toFixed(2)}</TableCell>
                            <TableCell>{operation.openPrice.toFixed(2)}</TableCell>
                            <TableCell>{operation.closePrice ? operation.closePrice.toFixed(2) : "-"}</TableCell>
                            <TableCell>
                              {operation.profit !== undefined ? (
                                <span
                                  className={
                                    operation.profit >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"
                                  }
                                >
                                  {operation.profit >= 0 ? "+" : ""}
                                  {operation.profit.toFixed(2)}
                                </span>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  operation.status === "open"
                                    ? "outline"
                                    : operation.status === "closed"
                                      ? "secondary"
                                      : "default"
                                }
                                className={
                                  operation.status === "open"
                                    ? "bg-blue-500/20 text-blue-500"
                                    : operation.status === "closed"
                                      ? "bg-gray-500/20 text-gray-500"
                                      : "bg-yellow-500/20 text-yellow-500"
                                }
                              >
                                {operation.status === "open"
                                  ? "Aberta"
                                  : operation.status === "closed"
                                    ? "Fechada"
                                    : "Pendente"}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(operation.openTime).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Pendentes */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Solicitações Pendentes
              </CardTitle>
              <CardDescription>Aprove ou rejeite solicitações de copytrading</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : pendingAccounts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Não há solicitações pendentes no momento.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Broker</TableHead>
                      <TableHead>Conta</TableHead>
                      <TableHead>Servidor</TableHead>
                      <TableHead>Data Solicitação</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAccounts.map((account) => (
                      <TableRow key={account.userId}>
                        <TableCell className="font-medium">{account.userId}</TableCell>
                        <TableCell>{account.brokerName}</TableCell>
                        <TableCell>{account.accountNumber}</TableCell>
                        <TableCell>{account.serverName}</TableCell>
                        <TableCell>{new Date(account.lastSync).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              onClick={() => updateAccountStatus(account.userId, "active")}
                            >
                              <Check className="h-4 w-4 mr-1" /> Aprovar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              onClick={() => updateAccountStatus(account.userId, "disabled")}
                            >
                              <X className="h-4 w-4 mr-1" /> Rejeitar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Configurações */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações do Copytrading
              </CardTitle>
              <CardDescription>Configure os parâmetros do sistema de copytrading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Conta Mestre</h3>
                  <p className="text-sm text-blue-400 mb-4">
                    Esta é a conta principal de onde as operações serão copiadas para as contas dos clientes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="master-broker">Broker</Label>
                      <Input
                        id="master-broker"
                        value={masterAccount.brokerName}
                        onChange={(e) => setMasterAccount({ ...masterAccount, brokerName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="master-server">Servidor</Label>
                      <Input
                        id="master-server"
                        value={masterAccount.serverName}
                        onChange={(e) => setMasterAccount({ ...masterAccount, serverName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="master-account">Número da Conta</Label>
                      <Input
                        id="master-account"
                        value={masterAccount.accountNumber}
                        onChange={(e) => setMasterAccount({ ...masterAccount, accountNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="master-password">Senha</Label>
                      <Input
                        id="master-password"
                        type="password"
                        value={masterAccount.password}
                        onChange={(e) => setMasterAccount({ ...masterAccount, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button onClick={saveMasterAccount} disabled={isSaving} className="flex items-center">
                      {isSaving ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Configurações
                        </>
                      )}
                    </Button>
                  </div>
                </div>

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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
