"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Settings, Users, Activity } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface MetaTraderConfig {
  enabled: boolean
  apiUrl: string
  apiKey: string
  serverType: "MT4" | "MT5"
  serverName: string
  brokerName: string
}

interface MasterAccount {
  id: string
  name: string
  login: string
  server: string
  enabled: boolean
  subscribers: number
}

export default function MetatraderApiPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [config, setConfig] = useState<MetaTraderConfig>({
    enabled: false,
    apiUrl: "https://api.metatrader-integration.com/v1",
    apiKey: "",
    serverType: "MT5",
    serverName: "TradingServer01",
    brokerName: "XM",
  })
  const [masterAccounts, setMasterAccounts] = useState<MasterAccount[]>([
    {
      id: "1",
      name: "Conta Principal MTM",
      login: "12345678",
      server: "XM-Real1",
      enabled: true,
      subscribers: 3,
    },
    {
      id: "2",
      name: "Conta VIP Forex",
      login: "87654321",
      server: "XM-Real2",
      enabled: false,
      subscribers: 1,
    },
  ])
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Salvar no localStorage
      localStorage.setItem("metatraderConfig", JSON.stringify(config))
      localStorage.setItem("masterAccounts", JSON.stringify(masterAccounts))

      toast({
        title: "Configurações salvas",
        description: "As configurações da API MetaTrader foram atualizadas.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar as configurações.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setLoading(true)
    try {
      // Simular teste de conexão
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Conexão testada",
        description: "Conexão com a API MetaTrader estabelecida com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar com a API MetaTrader.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleMasterAccount = (id: string) => {
    const updatedAccounts = masterAccounts.map((account) =>
      account.id === id ? { ...account, enabled: !account.enabled } : account,
    )
    setMasterAccounts(updatedAccounts)
  }

  useEffect(() => {
    // Carregar configurações salvas
    const savedConfig = localStorage.getItem("metatraderConfig")
    const savedAccounts = localStorage.getItem("masterAccounts")

    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
    if (savedAccounts) {
      setMasterAccounts(JSON.parse(savedAccounts))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <Card className="max-w-6xl mx-auto bg-black/50 border-gray-800/50 backdrop-blur-xl">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-gold-500" />
              <div>
                <CardTitle className="text-xl text-white">API MetaTrader</CardTitle>
                <CardDescription className="text-gray-400">Configure integração MT5 e copytrading</CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
              onClick={() => router.push("/admin-dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Status da Conexão */}
          <Card className="bg-gray-800/30 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Status da Conexão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Status da API:</span>
                <Badge className={config.enabled ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                  {config.enabled ? "Conectado" : "Desconectado"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Servidor:</span>
                <span className="text-white">{config.serverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Broker:</span>
                <span className="text-white">{config.brokerName}</span>
              </div>
              <Button
                onClick={testConnection}
                disabled={loading}
                variant="outline"
                className="w-full border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
              >
                {loading ? "Testando..." : "Testar Conexão"}
              </Button>
            </CardContent>
          </Card>

          {/* Configurações da API */}
          <Card className="bg-gray-800/30 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações da API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Habilitar API MetaTrader</Label>
                  <p className="text-sm text-gray-400">Ativar integração com MetaTrader 5</p>
                </div>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiUrl" className="text-white">
                    URL da API
                  </Label>
                  <Input
                    id="apiUrl"
                    value={config.apiUrl}
                    onChange={(e) => setConfig({ ...config, apiUrl: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-white">
                    Chave da API
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                    placeholder="Insira sua chave da API"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serverName" className="text-white">
                    Nome do Servidor
                  </Label>
                  <Input
                    id="serverName"
                    value={config.serverName}
                    onChange={(e) => setConfig({ ...config, serverName: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brokerName" className="text-white">
                    Nome do Broker
                  </Label>
                  <Input
                    id="brokerName"
                    value={config.brokerName}
                    onChange={(e) => setConfig({ ...config, brokerName: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contas Master */}
          <Card className="bg-gray-800/30 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Contas Master
              </CardTitle>
              <CardDescription className="text-gray-400">
                Gerencie as contas que serão copiadas pelos assinantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {masterAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{account.name}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                      <span>Login: {account.login}</span>
                      <span>Servidor: {account.server}</span>
                      <span>Assinantes: {account.subscribers}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={account.enabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                    >
                      {account.enabled ? "Ativo" : "Inativo"}
                    </Badge>
                    <Switch checked={account.enabled} onCheckedChange={() => toggleMasterAccount(account.id)} />
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full border-gold-500/50 text-gold-400 hover:bg-gold-500/10">
                Adicionar Nova Conta Master
              </Button>
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black"
            >
              {loading ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
