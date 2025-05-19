"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, AlertTriangle, ChevronRight, Settings, Wallet, BarChart3 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CopytradingConfigProps {
  userName?: string
}

export function CopytradingConfig({ userName = "Usuário" }: CopytradingConfigProps) {
  const [activeTab, setActiveTab] = useState("plans")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [brokerConnected, setBrokerConnected] = useState(false)
  const [settings, setSettings] = useState({
    copyMode: "automatic",
    maxVolume: "0.1",
    maxRisk: "2",
    autoStart: true,
    followSL: true,
    followTP: true,
    alertsEnabled: true,
    tradeNotifications: true,
  })

  const { toast } = useToast()

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
  }

  const handleContinue = () => {
    if (selectedPlan) {
      setActiveTab("configuration")
    } else {
      toast({
        variant: "destructive",
        title: "Selecione um plano",
        description: "Por favor, selecione um plano para continuar.",
      })
    }
  }

  const handleConnectBroker = () => {
    // Simulação de conexão com broker
    toast({
      title: "Conexão em andamento",
      description: "Conectando com MetaTrader...",
    })

    setTimeout(() => {
      setBrokerConnected(true)
      toast({
        title: "Conexão estabelecida",
        description: "Sua conta de trading foi conectada com sucesso.",
      })
    }, 2000)
  }

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações de copytrading foram salvas com sucesso.",
    })
  }

  const handleActivateService = () => {
    toast({
      title: "Serviço ativado",
      description: `Parabéns ${userName}! O serviço de copytrading foi ativado com sucesso.`,
    })
  }

  return (
    <Card className="w-full bg-black/50 border-gold-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gold-500">
          Configure seu acesso ao copytrading para começar a copiar operações automaticamente.
        </CardTitle>
        <CardDescription>
          Siga os passos abaixo para configurar e começar a usar o serviço de copytrading MTM.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gold-500/30">
            <TabsTrigger
              value="plans"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <Wallet className="h-4 w-4" /> Planos
            </TabsTrigger>
            <TabsTrigger
              value="configuration"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black flex items-center gap-2"
              disabled={!selectedPlan}
            >
              <Settings className="h-4 w-4" /> Configuração
            </TabsTrigger>
            <TabsTrigger
              value="portfolios"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" /> Portfólios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Selecione seu plano</h3>
              <p className="text-gray-400">Escolha o plano de copytrading que melhor se adapta às suas necessidades.</p>

              <div className="grid gap-4 md:grid-cols-3">
                {/* Plano Básico */}
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedPlan === "basic"
                      ? "border-gold-500 bg-gold-500/10"
                      : "border-gray-700 bg-black/30 hover:border-gold-500/50"
                  }`}
                  onClick={() => handlePlanSelect("basic")}
                >
                  <CardHeader>
                    <CardTitle>Plano Básico</CardTitle>
                    <CardDescription>Ideal para iniciantes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gold-500 mb-2">5%</div>
                    <p className="text-sm text-gray-400">mensal</p>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Acesso a 3 estratégias</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Notificações básicas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Suporte por e-mail</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <div className="text-xl font-bold text-amber-500">Depósito: 500€</div>
                    <div className="text-xs text-gray-400 mt-1">Mínimo para começar</div>
                  </CardFooter>
                </Card>

                {/* Plano Premium */}
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedPlan === "premium"
                      ? "border-gold-500 bg-gold-500/10"
                      : "border-gray-700 bg-black/30 hover:border-gold-500/50"
                  }`}
                  onClick={() => handlePlanSelect("premium")}
                >
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>Plano Premium</CardTitle>
                      <span className="text-xs bg-gold-500/20 text-gold-500 px-2 py-1 rounded-full">Popular</span>
                    </div>
                    <CardDescription>Para traders ativos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gold-500 mb-2">30%</div>
                    <p className="text-sm text-gray-400">mensal</p>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Acesso a 10 estratégias</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Notificações avançadas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Suporte prioritário</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <div className="text-xl font-bold text-amber-500">Depósito: 350€</div>
                    <div className="text-xs text-gray-400 mt-1">Mínimo para começar</div>
                  </CardFooter>
                </Card>

                {/* Plano VIP */}
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedPlan === "vip"
                      ? "border-gold-500 bg-gold-500/10"
                      : "border-gray-700 bg-black/30 hover:border-gold-500/50"
                  }`}
                  onClick={() => handlePlanSelect("vip")}
                >
                  <CardHeader>
                    <CardTitle>Plano VIP</CardTitle>
                    <CardDescription>Solução personalizada</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gold-500 mb-2">Customizado</div>
                    <p className="text-sm text-gray-400">baseado no seu perfil</p>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Todas as estratégias</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Consultoria personalizada</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Suporte VIP 24/7</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <div className="text-xl font-bold text-amber-500">Depósito: 1000€+</div>
                    <div className="text-xs text-gray-400 mt-1">Valores flexíveis</div>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8">
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                  onClick={handleContinue}
                  disabled={!selectedPlan}
                >
                  Continuar para Configuração <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Configuração do Copytrading</h3>
              <p className="text-gray-400">
                Configure sua conta de trading e preferências para o serviço de copytrading.
              </p>

              {/* Conexão com Broker */}
              <Card className="border-gray-700 bg-black/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Conectar sua Conta de Trading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Status da Conexão:</p>
                      <p className="text-sm text-gray-400">
                        {brokerConnected ? "Conectado ao MetaTrader" : "Não conectado"}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        brokerConnected ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {brokerConnected ? (
                        <div className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Conectado
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Não Conectado
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={brokerConnected ? "outline" : "default"}
                    className={
                      brokerConnected
                        ? "border-green-500 text-green-500 hover:bg-green-500/10"
                        : "bg-amber-500 hover:bg-amber-600 text-black"
                    }
                    onClick={handleConnectBroker}
                    disabled={brokerConnected}
                  >
                    {brokerConnected ? "Conectado com Sucesso" : "Conectar ao MetaTrader"}
                  </Button>
                </CardContent>
              </Card>

              {/* Configurações de Trading */}
              <Card className="border-gray-700 bg-black/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Configurações de Trading</CardTitle>
                  <CardDescription>Personalize como as operações serão copiadas para sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="copyMode">Modo de Cópia</Label>
                      <select
                        id="copyMode"
                        className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
                        value={settings.copyMode}
                        onChange={(e) => setSettings({ ...settings, copyMode: e.target.value })}
                      >
                        <option value="automatic">Automático (Recomendado)</option>
                        <option value="manual">Manual (Confirmar cada operação)</option>
                        <option value="filtered">Filtrado (Baseado em critérios)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxVolume">Volume Máximo (Lotes)</Label>
                      <Input
                        id="maxVolume"
                        type="number"
                        value={settings.maxVolume}
                        onChange={(e) => setSettings({ ...settings, maxVolume: e.target.value })}
                        className="bg-black border-gray-700"
                        placeholder="0.01 - 100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxRisk">Risco Máximo por Operação (%)</Label>
                      <Input
                        id="maxRisk"
                        type="number"
                        value={settings.maxRisk}
                        onChange={(e) => setSettings({ ...settings, maxRisk: e.target.value })}
                        className="bg-black border-gray-700"
                        placeholder="1-10%"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoStart" className="cursor-pointer">
                        Iniciar automaticamente
                      </Label>
                      <Switch
                        id="autoStart"
                        checked={settings.autoStart}
                        onCheckedChange={(checked) => setSettings({ ...settings, autoStart: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="followSL" className="cursor-pointer">
                        Seguir Stop Loss
                      </Label>
                      <Switch
                        id="followSL"
                        checked={settings.followSL}
                        onCheckedChange={(checked) => setSettings({ ...settings, followSL: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="followTP" className="cursor-pointer">
                        Seguir Take Profit
                      </Label>
                      <Switch
                        id="followTP"
                        checked={settings.followTP}
                        onCheckedChange={(checked) => setSettings({ ...settings, followTP: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="alertsEnabled" className="cursor-pointer">
                        Receber alertas
                      </Label>
                      <Switch
                        id="alertsEnabled"
                        checked={settings.alertsEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, alertsEnabled: checked })}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleSaveSettings} className="bg-amber-500 hover:bg-amber-600 text-black">
                      Salvar Configurações
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Ativação */}
              <Card className="border-gray-700 bg-black/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ativar Serviço</CardTitle>
                  <CardDescription>Comece a copiar operações agora</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-amber-500">Importante</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Ao ativar o serviço, você concorda em seguir as operações do sistema de copytrading conforme
                          as configurações definidas acima. Você pode alterar essas configurações ou desativar o serviço
                          a qualquer momento.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleActivateService}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!brokerConnected}
                  >
                    Ativar Serviço de Copytrading
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolios" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Portfólios Disponíveis</h3>
              <p className="text-gray-400">
                Escolha os portfólios que deseja copiar com base no seu plano e perfil de risco.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Portfólio 1 */}
                <Card className="border-gray-700 bg-black/30 hover:border-gold-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                        Conservador
                      </span>
                      <span className="text-xs text-gray-500">Risco: Baixo</span>
                    </div>
                    <CardTitle>Swing Trader FX</CardTitle>
                    <CardDescription>Operações de swing trade em pares de forex</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Performance (3m)</span>
                        <span className="text-sm text-green-500">+12.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Operações por semana</span>
                        <span className="text-sm">3-5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tempo médio</span>
                        <span className="text-sm">2-5 dias</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">EUR/USD</span>
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">GBP/USD</span>
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">USD/JPY</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">Selecionar</Button>
                  </CardFooter>
                </Card>

                {/* Portfólio 2 */}
                <Card className="border-gray-700 bg-black/30 hover:border-gold-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                        Moderado
                      </span>
                      <span className="text-xs text-gray-500">Risco: Médio</span>
                    </div>
                    <CardTitle>Crypto Momentum</CardTitle>
                    <CardDescription>Operações em criptomoedas de alta capitalização</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Performance (3m)</span>
                        <span className="text-sm text-green-500">+31.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Operações por semana</span>
                        <span className="text-sm">5-10</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tempo médio</span>
                        <span className="text-sm">1-3 dias</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">BTC</span>
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">ETH</span>
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">SOL</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">Selecionar</Button>
                  </CardFooter>
                </Card>

                {/* Portfólio 3 */}
                <Card className="border-gray-700 bg-black/30 hover:border-gold-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
                        Agressivo
                      </span>
                      <span className="text-xs text-gray-500">Risco: Alto</span>
                    </div>
                    <CardTitle>Scalping Pro</CardTitle>
                    <CardDescription>Operações de curto prazo em múltiplos mercados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Performance (3m)</span>
                        <span className="text-sm text-green-500">+45.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Operações por semana</span>
                        <span className="text-sm">30+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tempo médio</span>
                        <span className="text-sm">1-4 horas</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">Gold</span>
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">Forex</span>
                      <span className="px-2 py-1 text-xs bg-black/50 rounded-full">Crypto</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">Selecionar</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-4 mb-2">
                <p className="text-sm text-gray-400">
                  Os resultados passados não garantem retornos futuros. Todos os portfólios são monitorados e
                  atualizados diariamente por nossa equipe de especialistas.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
