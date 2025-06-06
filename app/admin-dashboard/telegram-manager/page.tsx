"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  MessageSquare,
  Bot,
  Send,
  Settings,
  Activity,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface TelegramStatus {
  bot: {
    id: number
    username: string
    first_name: string
    status: "online" | "offline"
  }
  channel: {
    id: string
    title: string
    member_count?: number
    status: "connected" | "disconnected"
  }
  webhook: {
    url: string
    status: "active" | "inactive"
  }
  lastSignal?: {
    content: string
    timestamp: string
    type: string
  }
}

export default function TelegramManagerPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [telegramStatus, setTelegramStatus] = useState<TelegramStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [testMessage, setTestMessage] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [botConfig, setBotConfig] = useState({
    token: "",
    channelId: "",
    webhookUrl: "",
    autoSignals: true,
    signalKeywords: ["BUY", "SELL", "🚀", "🔻", "LONG", "SHORT"],
  })
  const [signals, setSignals] = useState([])
  const [loadingSignals, setLoadingSignals] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "active":
      case "connected":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "offline":
      case "inactive":
      case "disconnected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "active":
      case "connected":
        return <CheckCircle className="h-4 w-4" />
      case "offline":
      case "inactive":
      case "disconnected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Load Telegram status
  useEffect(() => {
    loadTelegramStatus()

    // Auto-refresh if enabled
    let interval: NodeJS.Timeout
    if (autoRefresh) {
      interval = setInterval(loadTelegramStatus, 30000) // 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  const loadTelegramStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/telegram/status")
      const data = await response.json()

      if (data.success) {
        setTelegramStatus(data.data)
      } else {
        toast({
          title: "Erro",
          description: "Erro ao carregar status do Telegram",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao carregar status:", error)
      toast({
        title: "Erro",
        description: "Erro ao conectar com o Telegram",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const sendTestMessage = async () => {
    if (!testMessage.trim()) {
      toast({
        title: "Erro",
        description: "Digite uma mensagem para testar",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/telegram/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: testMessage }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Sucesso",
          description: "Mensagem enviada com sucesso",
        })
        setTestMessage("")
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao enviar mensagem",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem",
        variant: "destructive",
      })
    }
  }

  const configureWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Erro",
        description: "Digite a URL do webhook",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/telegram/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: webhookUrl }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Sucesso",
          description: "Webhook configurado com sucesso",
        })
        loadTelegramStatus()
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao configurar webhook",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao configurar webhook:", error)
      toast({
        title: "Erro",
        description: "Erro ao configurar webhook",
        variant: "destructive",
      })
    }
  }

  const saveBotConfig = async () => {
    try {
      const response = await fetch("/api/telegram/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(botConfig),
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Configurações do bot salvas com sucesso",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações",
        variant: "destructive",
      })
    }
  }

  const loadSignals = async () => {
    try {
      setLoadingSignals(true)
      const response = await fetch("/api/telegram/signals?limit=10")
      const data = await response.json()

      if (data.success) {
        setSignals(data.data)
      }
    } catch (error) {
      console.error("Erro ao carregar sinais:", error)
    } finally {
      setLoadingSignals(false)
    }
  }

  useEffect(() => {
    loadSignals()
  }, [])

  if (!isAuthenticated || !isAdmin) {
    return <div>Acesso negado</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestão do Telegram</h1>
            <p className="text-gray-400">Configurar bot, canal e monitorizar sinais de trading</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              <Label className="text-white text-sm">Auto-refresh</Label>
            </div>
            <Button
              onClick={loadTelegramStatus}
              disabled={loading}
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        {telegramStatus && telegramStatus.bot && telegramStatus.channel && telegramStatus.webhook && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Bot Status</p>
                    <p className="text-lg font-bold text-white">{telegramStatus.bot?.username || "N/A"}</p>
                    <Badge className={getStatusColor(telegramStatus.bot?.status || "offline")}>
                      {getStatusIcon(telegramStatus.bot?.status || "offline")}
                      <span className="ml-2">{telegramStatus.bot?.status || "offline"}</span>
                    </Badge>
                  </div>
                  <Bot className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Canal VIP</p>
                    <p className="text-lg font-bold text-white">{telegramStatus.channel?.title || "N/A"}</p>
                    <Badge className={getStatusColor(telegramStatus.channel?.status || "disconnected")}>
                      {getStatusIcon(telegramStatus.channel?.status || "disconnected")}
                      <span className="ml-2">{telegramStatus.channel?.status || "disconnected"}</span>
                    </Badge>
                  </div>
                  <Users className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Webhook</p>
                    <p className="text-lg font-bold text-white">
                      {telegramStatus.webhook?.status === "active" ? "Configurado" : "Inativo"}
                    </p>
                    <Badge className={getStatusColor(telegramStatus.webhook?.status || "inactive")}>
                      {getStatusIcon(telegramStatus.webhook?.status || "inactive")}
                      <span className="ml-2">{telegramStatus.webhook?.status || "inactive"}</span>
                    </Badge>
                  </div>
                  <Activity className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configuração
              </CardTitle>
              <CardDescription className="text-gray-400">Configurar bot e webhook do Telegram</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bot" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger value="bot" className="text-white">
                    Bot
                  </TabsTrigger>
                  <TabsTrigger value="webhook" className="text-white">
                    Webhook
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bot" className="space-y-4">
                  {telegramStatus && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Bot Information</Label>
                        <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                          <p className="text-white">
                            <span className="text-gray-400">ID:</span> {telegramStatus.bot?.id || "N/A"}
                          </p>
                          <p className="text-white">
                            <span className="text-gray-400">Username:</span> {telegramStatus.bot?.username || "N/A"}
                          </p>
                          <p className="text-white">
                            <span className="text-gray-400">Nome:</span> {telegramStatus.bot?.first_name || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Canal VIP</Label>
                        <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                          <p className="text-white">
                            <span className="text-gray-400">ID:</span> {telegramStatus.channel?.id || "N/A"}
                          </p>
                          <p className="text-white">
                            <span className="text-gray-400">Título:</span> {telegramStatus.channel?.title || "N/A"}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                              onClick={() => window.open("https://t.me/+2XMn1YEjfjYwYTE0", "_blank")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Abrir Canal
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="autoSignals" className="text-white">
                        Processamento Automático de Sinais
                      </Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Switch
                          id="autoSignals"
                          checked={botConfig.autoSignals}
                          onCheckedChange={(checked) => setBotConfig((prev) => ({ ...prev, autoSignals: checked }))}
                        />
                        <span className="text-gray-400 text-sm">Processar sinais automaticamente</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signalKeywords" className="text-white">
                        Palavras-chave para Sinais
                      </Label>
                      <Input
                        id="signalKeywords"
                        value={botConfig.signalKeywords.join(", ")}
                        onChange={(e) =>
                          setBotConfig((prev) => ({
                            ...prev,
                            signalKeywords: e.target.value.split(",").map((k) => k.trim()),
                          }))
                        }
                        placeholder="BUY, SELL, 🚀, 🔻"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <Button onClick={saveBotConfig} className="bg-blue-600 hover:bg-blue-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="webhook" className="space-y-4">
                  <div>
                    <Label htmlFor="webhookUrl" className="text-white">
                      URL do Webhook
                    </Label>
                    <Input
                      id="webhookUrl"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://seu-dominio.com/api/telegram/webhook"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button onClick={configureWebhook} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Webhook
                  </Button>

                  {telegramStatus && (
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-white text-sm">
                        <span className="text-gray-400">URL Atual:</span>{" "}
                        {telegramStatus.webhook?.url || "Não configurado"}
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Test & Monitor */}
          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Teste & Monitorização
              </CardTitle>
              <CardDescription className="text-gray-400">Testar bot e monitorizar sinais</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="test" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger value="test" className="text-white">
                    Teste
                  </TabsTrigger>
                  <TabsTrigger value="signals" className="text-white">
                    Sinais
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="test" className="space-y-4">
                  <div>
                    <Label htmlFor="testMessage" className="text-white">
                      Mensagem de Teste
                    </Label>
                    <Textarea
                      id="testMessage"
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      placeholder="Digite uma mensagem para testar o bot..."
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={sendTestMessage}
                    disabled={!testMessage.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem de Teste
                  </Button>
                </TabsContent>

                <TabsContent value="signals" className="space-y-4">
                  {telegramStatus?.lastSignal ? (
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Último Sinal Recebido</h4>
                      <p className="text-gray-300 text-sm mb-2">{telegramStatus.lastSignal.content}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {telegramStatus.lastSignal.type}
                        </Badge>
                        <span className="text-gray-400 text-xs">
                          {new Date(telegramStatus.lastSignal.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Nenhum sinal recebido ainda</p>
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">Histórico de Sinais</h4>
                      <Button size="sm" variant="outline" onClick={loadTelegramStatus}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Atualizar
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {loadingSignals ? (
                        <div className="text-center py-4">
                          <RefreshCw className="h-6 w-6 text-gray-400 mx-auto animate-spin" />
                          <p className="text-gray-400 mt-2">Carregando sinais...</p>
                        </div>
                      ) : signals.length > 0 ? (
                        signals.map((signal) => (
                          <div key={signal.id} className="bg-gray-800 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Badge
                                className={
                                  signal.type === "BUY"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                }
                              >
                                {signal.type} Signal
                              </Badge>
                              <span className="text-gray-400 text-xs">
                                {new Date(signal.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {signal.type === "BUY" ? "🚀" : "🔻"} {signal.symbol} {signal.type} @ {signal.price} | TP:{" "}
                              {signal.takeProfit} | SL: {signal.stopLoss}
                            </p>
                            <div className="mt-2">
                              <Badge
                                variant="outline"
                                className={
                                  signal.status === "active"
                                    ? "border-blue-500/50 text-blue-400"
                                    : "border-gray-500/50 text-gray-400"
                                }
                              >
                                {signal.status}
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">Nenhum sinal encontrado</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl mt-8">
          <CardHeader>
            <CardTitle className="text-white">Ações Rápidas</CardTitle>
            <CardDescription className="text-gray-400">Links úteis e configurações do Telegram</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 h-auto p-4"
                onClick={() => window.open("https://t.me/BotFather", "_blank")}
              >
                <Bot className="h-6 w-6 mb-2" />
                <div className="text-center">
                  <p className="font-medium">BotFather</p>
                  <p className="text-xs opacity-70">Gerir bots</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 h-auto p-4"
                onClick={() => window.open("https://t.me/+2XMn1YEjfjYwYTE0", "_blank")}
              >
                <Users className="h-6 w-6 mb-2" />
                <div className="text-center">
                  <p className="font-medium">Canal VIP</p>
                  <p className="text-xs opacity-70">Abrir canal</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 h-auto p-4"
                onClick={() => window.open("https://core.telegram.org/bots/api", "_blank")}
              >
                <Settings className="h-6 w-6 mb-2" />
                <div className="text-center">
                  <p className="font-medium">API Docs</p>
                  <p className="text-xs opacity-70">Documentação</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
