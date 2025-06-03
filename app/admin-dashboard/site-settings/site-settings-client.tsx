"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Save, RefreshCw } from "lucide-react"

export default function SiteSettingsClient() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { config, updateConfig } = useConfigStore()
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [tradingViewCode, setTradingViewCode] = useState(config.tradingViewCustomCode || "")
  const [copytradingEnabled, setCopytradingEnabled] = useState(config.copytrading?.enabled || false)
  const [masterAccount, setMasterAccount] = useState({
    brokerName: config.copytrading?.masterAccount?.brokerName || "InfinoxLimited",
    accountNumber: config.copytrading?.masterAccount?.accountNumber || "87047541",
    serverName: config.copytrading?.masterAccount?.serverName || "InfinoxLimited-MT5Live",
    password: config.copytrading?.masterAccount?.password || "Superacao2022#",
  })

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  // Atualizar estado local quando a configuração global mudar
  useEffect(() => {
    setTradingViewCode(config.tradingViewCustomCode || "")
    setCopytradingEnabled(config.copytrading?.enabled || false)
    setMasterAccount({
      brokerName: config.copytrading?.masterAccount?.brokerName || "InfinoxLimited",
      accountNumber: config.copytrading?.masterAccount?.accountNumber || "87047541",
      serverName: config.copytrading?.masterAccount?.serverName || "InfinoxLimited-MT5Live",
      password: config.copytrading?.masterAccount?.password || "Superacao2022#",
    })
  }, [config])

  const handleSaveTradingViewCode = () => {
    setIsSaving(true)

    try {
      // Validar o código antes de salvar
      new Function("container", "isAuthenticated", "pineScriptScanner", tradingViewCode)

      // Atualizar a configuração
      updateConfig({ tradingViewCustomCode: tradingViewCode })

      setSaveSuccess(true)
      toast({
        title: "Código salvo",
        description: "O código do TradingView foi salvo com sucesso.",
      })

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: `Erro de sintaxe no código: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveCopytradingSettings = () => {
    setIsSaving(true)

    try {
      // Atualizar a configuração
      updateConfig({
        copytrading: {
          enabled: copytradingEnabled,
          masterAccount: masterAccount,
        },
      })

      setSaveSuccess(true)
      toast({
        title: "Configurações salvas",
        description: "As configurações de copytrading foram salvas com sucesso.",
      })

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: `Erro ao salvar configurações: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações do Site</h1>
          <p className="text-gray-500">Gerencie as configurações globais do site</p>
        </div>
        <Button onClick={() => router.push("/admin-dashboard")} variant="outline">
          Voltar ao Painel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="tradingview">TradingView</TabsTrigger>
          <TabsTrigger value="copytrading">Copytrading</TabsTrigger>
        </TabsList>

        {/* Aba Geral */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações básicas do site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Nome do Site</Label>
                    <Input id="site-name" defaultValue={config.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email de Contato</Label>
                    <Input id="contact-email" defaultValue={config.contactEmail} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footer-text">Texto do Rodapé</Label>
                  <Input id="footer-text" defaultValue={config.footerText} />
                </div>

                <div className="space-y-2">
                  <Label>Recursos Ativos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.features.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <Switch id={feature.id} defaultChecked={feature.enabled} />
                        <Label htmlFor={feature.id}>{feature.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Salvar Configurações</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba TradingView */}
        <TabsContent value="tradingview">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do TradingView</CardTitle>
              <CardDescription>Personalize o código do widget TradingView</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {saveSuccess && (
                  <Alert className="bg-green-500/10 border-green-500">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-500">Código salvo com sucesso!</AlertDescription>
                  </Alert>
                )}

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
                  <p className="text-sm text-yellow-400">
                    <strong>Atenção:</strong> Editar o código diretamente pode causar problemas de funcionamento.
                    Certifique-se de testar suas alterações antes de salvar.
                  </p>
                  <p className="text-sm text-yellow-400 mt-2">
                    O código deve criar e inicializar um widget TradingView. Você tem acesso às variáveis:
                    <code className="bg-black/30 px-1 mx-1 rounded">container</code>,
                    <code className="bg-black/30 px-1 mx-1 rounded">isAuthenticated</code> e
                    <code className="bg-black/30 px-1 mx-1 rounded">pineScriptScanner</code>.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tradingview-code">Código Personalizado</Label>
                  <textarea
                    id="tradingview-code"
                    rows={15}
                    className="w-full p-4 font-mono text-sm bg-black/10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={tradingViewCode}
                    onChange={(e) => setTradingViewCode(e.target.value)}
                    spellCheck="false"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveTradingViewCode} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Código
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Copytrading */}
        <TabsContent value="copytrading">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Copytrading</CardTitle>
              <CardDescription>Configure o sistema de copytrading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {saveSuccess && (
                  <Alert className="bg-green-500/10 border-green-500">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-500">Configurações salvas com sucesso!</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="copytrading-enabled"
                    checked={copytradingEnabled}
                    onCheckedChange={setCopytradingEnabled}
                  />
                  <Label htmlFor="copytrading-enabled">Ativar Sistema de Copytrading</Label>
                </div>

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
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveCopytradingSettings} disabled={isSaving}>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
