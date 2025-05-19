"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Save, AlertCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Lista de brokers e servidores
const brokers = [
  {
    name: "InfinoxLimited",
    servers: ["InfinoxLimited-MT5Live", "InfinoxLimited-MT5Demo"],
  },
  {
    name: "XM",
    servers: ["XM-Real 1", "XM-Real 2", "XM-Real 3", "XM-Demo"],
  },
  {
    name: "IC Markets",
    servers: ["IC Markets-Live01", "IC Markets-Live02", "IC Markets-Live03", "IC Markets-Demo01"],
  },
  {
    name: "Exness",
    servers: ["Exness-Real", "Exness-Demo"],
  },
]

export function CopytradingConfig() {
  const { toast } = useToast()
  const { config, updateConfig } = useConfigStore()
  const [activeTab, setActiveTab] = useState("planos")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [brokerConnected, setBrokerConnected] = useState(false)
  const [tradingViewCode, setTradingViewCode] = useState(config.tradingViewCustomCode || "")
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [isConnecting, setIsConnecting] = useState(false)

  // Configurações de copytrading
  const [brokerName, setBrokerName] = useState("")
  const [serverName, setServerName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountPassword, setAccountPassword] = useState("")
  const [availableServers, setAvailableServers] = useState<string[]>([])
  const [riskSettings, setRiskSettings] = useState({
    maxVolume: "0.1",
    maxDrawdown: "10",
    useStopLoss: true,
    useTakeProfit: true,
    copyRatio: "1.0",
  })

  // Sincronizar com a store quando ela mudar
  useEffect(() => {
    setTradingViewCode(config.tradingViewCustomCode || "")
  }, [config.tradingViewCustomCode])

  // Atualizar servidores disponíveis quando o broker mudar
  useEffect(() => {
    if (brokerName) {
      const broker = brokers.find((b) => b.name === brokerName)
      if (broker) {
        setAvailableServers(broker.servers)
        setServerName(broker.servers[0] || "")
      } else {
        setAvailableServers([])
        setServerName("")
      }
    } else {
      setAvailableServers([])
      setServerName("")
    }
  }, [brokerName])

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
  }

  const handleContinue = () => {
    if (activeTab === "planos" && selectedPlan) {
      setActiveTab("configuracao")
    } else if (activeTab === "configuracao") {
      setActiveTab("risco")
    }
  }

  const handleSaveCode = async () => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // Validar o código antes de salvar
      new Function("container", "isAuthenticated", "pineScriptScanner", tradingViewCode)

      // Atualizar a configuração na store
      updateConfig({ tradingViewCustomCode: tradingViewCode })

      setSaveStatus("success")
      toast({
        title: "Código salvo",
        description: "O código do TradingView foi salvo com sucesso e será aplicado em todo o site.",
      })
    } catch (error) {
      console.error("Erro ao salvar código:", error)
      setSaveStatus("error")
      toast({
        title: "Erro ao salvar",
        description: `Erro de sintaxe no código: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)

      // Resetar o status após 3 segundos
      setTimeout(() => {
        setSaveStatus("idle")
      }, 3000)
    }
  }

  const handleConnectBroker = async () => {
    if (!brokerName || !serverName || !accountNumber || !accountPassword) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos de conexão com o broker.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      // Simulação de conexão com o broker
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setBrokerConnected(true)
      toast({
        title: "Conexão estabelecida",
        description: `Conta ${accountNumber} conectada com sucesso ao servidor ${serverName}.`,
      })

      // Salvar configurações na store
      updateConfig({
        copytrading: {
          ...config.copytrading,
          enabled: true,
          brokerName,
          serverName,
          accountNumber,
          lastConnected: new Date().toISOString(),
        },
      })
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao broker. Verifique suas credenciais.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSaveRiskSettings = () => {
    setIsSaving(true)

    try {
      // Salvar configurações de risco na store
      updateConfig({
        copytrading: {
          ...config.copytrading,
          riskSettings: {
            maxVolume: riskSettings.maxVolume,
            maxDrawdown: riskSettings.maxDrawdown,
            useStopLoss: riskSettings.useStopLoss,
            useTakeProfit: riskSettings.useTakeProfit,
            copyRatio: riskSettings.copyRatio,
          },
        },
      })

      toast({
        title: "Configurações salvas",
        description: "Suas configurações de risco foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas configurações de risco.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Configure seu acesso ao copytrading</h2>
        <p className="text-gray-400">para começar a copiar operações automaticamente.</p>
      </div>

      <Card className="bg-black border-gray-800">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gold-500/30 mb-8">
              <TabsTrigger value="planos" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                Planos
              </TabsTrigger>
              <TabsTrigger
                value="configuracao"
                className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
              >
                Configuração
              </TabsTrigger>
              <TabsTrigger value="risco" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                Gestão de Risco
              </TabsTrigger>
            </TabsList>

            <TabsContent value="planos" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Selecione seu plano</h3>
                  <p className="text-gray-400 mb-6">
                    Escolha o plano de copytrading que melhor se adapta às suas necessidades.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card
                    className={`bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all cursor-pointer ${
                      selectedPlan === "basico" ? "border-gold-500 ring-1 ring-gold-500" : ""
                    }`}
                    onClick={() => handlePlanSelect("basico")}
                  >
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2">Plano Básico</h4>
                      <p className="text-gold-500 text-xl font-bold mb-4">5% mensal</p>
                      <p className="text-gray-400 mb-4">
                        Ideal para iniciantes que desejam experimentar o copytrading.
                      </p>
                      <p className="text-sm text-gray-500">Depósito: 500€</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all cursor-pointer ${
                      selectedPlan === "premium" ? "border-gold-500 ring-1 ring-gold-500" : ""
                    }`}
                    onClick={() => handlePlanSelect("premium")}
                  >
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2">Plano Premium</h4>
                      <p className="text-gold-500 text-xl font-bold mb-4">30% mensal</p>
                      <p className="text-gray-400 mb-4">
                        Para traders que buscam resultados consistentes e maior diversificação.
                      </p>
                      <p className="text-sm text-gray-500">Depósito: 350€</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all cursor-pointer ${
                      selectedPlan === "vip" ? "border-gold-500 ring-1 ring-gold-500" : ""
                    }`}
                    onClick={() => handlePlanSelect("vip")}
                  >
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2">Plano VIP</h4>
                      <p className="text-gold-500 text-xl font-bold mb-4">Customizado</p>
                      <p className="text-gray-400 mb-4">Solução personalizada para investidores de alto volume.</p>
                      <p className="text-sm text-gray-500">Depósito: 1000€+</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                    disabled={!selectedPlan}
                  >
                    Continuar para Configuração <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configuracao" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Configuração do Copytrading</h3>
                  <p className="text-gray-400 mb-6">Configure como as operações serão copiadas para sua conta.</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-black/30 border border-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-4">Conexão com Broker</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Status da Conexão</p>
                          <p className="text-sm text-gray-400">
                            {brokerConnected ? (
                              <span className="text-green-500">Conectado</span>
                            ) : (
                              <span className="text-red-500">Não conectado</span>
                            )}
                          </p>
                        </div>
                        <Switch
                          checked={brokerConnected}
                          onCheckedChange={setBrokerConnected}
                          className="data-[state=checked]:bg-gold-500"
                          disabled={true}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="broker">Broker</Label>
                          <Select value={brokerName} onValueChange={setBrokerName} disabled={brokerConnected}>
                            <SelectTrigger className="bg-black/50 border-gray-700">
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
                        <div className="space-y-2">
                          <Label htmlFor="server">Servidor</Label>
                          <Select
                            value={serverName}
                            onValueChange={setServerName}
                            disabled={brokerConnected || !brokerName}
                          >
                            <SelectTrigger className="bg-black/50 border-gray-700">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="account">Número da Conta</Label>
                          <Input
                            id="account"
                            placeholder="12345678"
                            className="bg-black/50 border-gray-700"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            disabled={brokerConnected}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Senha</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            className="bg-black/50 border-gray-700"
                            value={accountPassword}
                            onChange={(e) => setAccountPassword(e.target.value)}
                            disabled={brokerConnected}
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        {brokerConnected ? (
                          <Button variant="destructive" className="w-full" onClick={() => setBrokerConnected(false)}>
                            Desconectar Conta
                          </Button>
                        ) : (
                          <Button
                            className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                            onClick={handleConnectBroker}
                            disabled={isConnecting || !brokerName || !serverName || !accountNumber || !accountPassword}
                          >
                            {isConnecting ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Conectando...
                              </>
                            ) : (
                              "Conectar Conta"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-4">Informações da Conta Mestre</h4>
                    <div className="space-y-4">
                      <Alert className="bg-gold-500/10 border-gold-500/30">
                        <AlertDescription>
                          Suas operações serão copiadas da nossa conta mestre oficial:
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Broker:</p>
                          <p className="font-medium">InfinoxLimited</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Número da Conta:</p>
                          <p className="font-medium">87047541</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Servidor:</p>
                          <p className="font-medium">InfinoxLimited-MT5Live</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Status:</p>
                          <p className="font-medium text-green-500">Ativo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                    disabled={!brokerConnected}
                  >
                    Continuar para Gestão de Risco <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risco" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Gestão de Risco</h3>
                  <p className="text-gray-400 mb-6">Configure os parâmetros de risco para as operações copiadas.</p>
                </div>

                <div className="bg-black/30 border border-gray-800 rounded-lg p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxVolume">Volume Máximo por Operação (lotes)</Label>
                      <Input
                        id="maxVolume"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.1"
                        className="bg-black/50 border-gray-700"
                        value={riskSettings.maxVolume}
                        onChange={(e) => setRiskSettings({ ...riskSettings, maxVolume: e.target.value })}
                      />
                      <p className="text-xs text-gray-400">Limite o tamanho máximo de cada operação copiada.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxDrawdown">Drawdown Máximo (%)</Label>
                      <Input
                        id="maxDrawdown"
                        type="number"
                        min="1"
                        max="100"
                        placeholder="10"
                        className="bg-black/50 border-gray-700"
                        value={riskSettings.maxDrawdown}
                        onChange={(e) => setRiskSettings({ ...riskSettings, maxDrawdown: e.target.value })}
                      />
                      <p className="text-xs text-gray-400">
                        Defina a perda máxima permitida antes de parar o copytrading.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="copyRatio">Proporção de Cópia</Label>
                    <Select
                      value={riskSettings.copyRatio}
                      onValueChange={(value) => setRiskSettings({ ...riskSettings, copyRatio: value })}
                    >
                      <SelectTrigger className="bg-black/50 border-gray-700">
                        <SelectValue placeholder="Selecione a proporção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.25">0.25x (25% do volume da conta mestre)</SelectItem>
                        <SelectItem value="0.5">0.5x (50% do volume da conta mestre)</SelectItem>
                        <SelectItem value="0.75">0.75x (75% do volume da conta mestre)</SelectItem>
                        <SelectItem value="1.0">1.0x (Mesmo volume da conta mestre)</SelectItem>
                        <SelectItem value="1.5">1.5x (150% do volume da conta mestre)</SelectItem>
                        <SelectItem value="2.0">2.0x (200% do volume da conta mestre)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">
                      Defina a proporção do volume a ser copiado em relação à conta mestre.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="stopLoss"
                        checked={riskSettings.useStopLoss}
                        onCheckedChange={(checked) => setRiskSettings({ ...riskSettings, useStopLoss: checked })}
                        className="data-[state=checked]:bg-gold-500"
                      />
                      <Label htmlFor="stopLoss">Usar Stop Loss da Conta Mestre</Label>
                    </div>
                    <p className="text-xs text-gray-400 pl-7">
                      Quando ativado, as operações copiadas usarão o mesmo stop loss da conta mestre.
                    </p>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="takeProfit"
                        checked={riskSettings.useTakeProfit}
                        onCheckedChange={(checked) => setRiskSettings({ ...riskSettings, useTakeProfit: checked })}
                        className="data-[state=checked]:bg-gold-500"
                      />
                      <Label htmlFor="takeProfit">Usar Take Profit da Conta Mestre</Label>
                    </div>
                    <p className="text-xs text-gray-400 pl-7">
                      Quando ativado, as operações copiadas usarão o mesmo take profit da conta mestre.
                    </p>
                  </div>
                </div>

                <Alert className="bg-yellow-500/10 border-yellow-500/30">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-500">
                    Atenção: O copytrading envolve riscos. Nunca invista mais do que pode perder.
                  </AlertDescription>
                </Alert>

                <div className="mt-8">
                  <Button
                    onClick={handleSaveRiskSettings}
                    disabled={isSaving}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar e Ativar Copytrading
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
