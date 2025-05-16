"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Shield, Clock, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/login-form"
import CopytradingPlans from "./copytrading-plans"

export default function CopytradingPath() {
  // Lista de brokers MT4
  const mt4Brokers = [
    { id: "xm", name: "XM" },
    { id: "fxpro", name: "FxPro" },
    { id: "icmarkets", name: "IC Markets" },
    { id: "fbs", name: "FBS" },
    { id: "exness", name: "Exness" },
    { id: "hotforex", name: "HotForex" },
    { id: "pepperstone", name: "Pepperstone" },
    { id: "admiralmarkets", name: "Admiral Markets" },
    { id: "fxtm", name: "FXTM" },
    { id: "roboforex", name: "RoboForex" },
  ]

  // Lista de brokers MT5
  const mt5Brokers = [
    { id: "xm", name: "XM" },
    { id: "fxpro", name: "FxPro" },
    { id: "icmarkets", name: "IC Markets" },
    { id: "exness", name: "Exness" },
    { id: "pepperstone", name: "Pepperstone" },
    { id: "admiralmarkets", name: "Admiral Markets" },
    { id: "fxtm", name: "FXTM" },
    { id: "roboforex", name: "RoboForex" },
    { id: "tickmill", name: "Tickmill" },
    { id: "fxcm", name: "FXCM" },
  ]

  // Servidores por broker (simplificado)
  const brokerServers = {
    // MT4 Servers
    "xm-mt4": ["XM-Real 1", "XM-Real 2", "XM-Real 3", "XM-Demo"],
    "fxpro-mt4": ["FxPro-Real", "FxPro-Demo"],
    "icmarkets-mt4": ["IC Markets-Live01", "IC Markets-Live02", "IC Markets-Demo01"],
    "fbs-mt4": ["FBS-Real", "FBS-Demo"],
    "exness-mt4": ["Exness-Real", "Exness-Demo"],
    "hotforex-mt4": ["HotForex-Live", "HotForex-Demo"],
    "pepperstone-mt4": ["Pepperstone-Live01", "Pepperstone-Live02", "Pepperstone-Demo"],
    "admiralmarkets-mt4": ["AdmiralMarkets-Live", "AdmiralMarkets-Demo"],
    "fxtm-mt4": ["FXTM-Live", "FXTM-Demo"],
    "roboforex-mt4": ["RoboForex-Live", "RoboForex-Demo"],

    // MT5 Servers
    "xm-mt5": ["XM-MT5-Real", "XM-MT5-Demo"],
    "fxpro-mt5": ["FxPro-MT5-Real", "FxPro-MT5-Demo"],
    "icmarkets-mt5": ["IC Markets-MT5-Live01", "IC Markets-MT5-Live02", "IC Markets-MT5-Demo"],
    "exness-mt5": ["Exness-MT5-Real", "Exness-MT5-Demo"],
    "pepperstone-mt5": ["Pepperstone-MT5-Live", "Pepperstone-MT5-Demo"],
    "admiralmarkets-mt5": ["AdmiralMarkets-MT5-Live", "AdmiralMarkets-MT5-Demo"],
    "fxtm-mt5": ["FXTM-MT5-Live", "FXTM-MT5-Demo"],
    "roboforex-mt5": ["RoboForex-MT5-Live", "RoboForex-MT5-Demo"],
    "tickmill-mt5": ["Tickmill-MT5-Live", "Tickmill-MT5-Demo"],
    "fxcm-mt5": ["FXCM-MT5-Live", "FXCM-MT5-Demo"],
  }

  const { isAuthenticated } = useAuth()
  const [riskPercentage, setRiskPercentage] = useState(1)
  const [activeTab, setActiveTab] = useState("plans")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [platform, setPlatform] = useState("mt4")
  const [selectedBroker, setSelectedBroker] = useState("")
  const [availableBrokers, setAvailableBrokers] = useState(mt4Brokers)
  const [availableServers, setAvailableServers] = useState<string[]>([])

  // Atualiza a lista de brokers quando a plataforma muda
  useEffect(() => {
    setAvailableBrokers(platform === "mt4" ? mt4Brokers : mt5Brokers)
    setSelectedBroker("")
    setAvailableServers([])
  }, [platform])

  // Atualiza a lista de servidores quando o broker muda
  useEffect(() => {
    if (selectedBroker) {
      const serverKey = `${selectedBroker}-${platform}`
      setAvailableServers(brokerServers[serverKey] || [])
    } else {
      setAvailableServers([])
    }
  }, [selectedBroker, platform])

  if (!isAuthenticated) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Copytrading MTM
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Faça login para configurar o serviço de copytrading e começar a copiar as operações dos nossos traders
              profissionais.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    )
  }

  return (
    <>
      <CopytradingPlans />

      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Copytrading MTM - Configuração
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Configure seu acesso ao copytrading para começar a copiar operações automaticamente.
            </p>
          </div>

          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-black/50 border border-gold-500/30">
                  <TabsTrigger value="plans" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    Planos
                  </TabsTrigger>
                  <TabsTrigger value="setup" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    Configuração
                  </TabsTrigger>
                  <TabsTrigger
                    value="portfolios"
                    className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
                  >
                    Portfólios
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="plans" className="mt-0">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Selecione seu plano</h3>
                    <p className="text-gray-300 mb-8">
                      Escolha o plano de copytrading que melhor se adapta às suas necessidades.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          selectedPlan === "basic"
                            ? "border-gold-500 bg-gold-500/10"
                            : "border-gray-700 hover:border-gold-500/50"
                        }`}
                        onClick={() => setSelectedPlan("basic")}
                      >
                        <h4 className="font-bold">Plano Básico</h4>
                        <p className="text-sm text-gray-400">5% mensal</p>
                        <p className="text-sm text-gold-400 mt-2">Depósito: 500€</p>
                      </div>

                      <div
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          selectedPlan === "premium"
                            ? "border-gold-500 bg-gold-500/10"
                            : "border-gray-700 hover:border-gold-500/50"
                        }`}
                        onClick={() => setSelectedPlan("premium")}
                      >
                        <h4 className="font-bold">Plano Premium</h4>
                        <p className="text-sm text-gray-400">30% mensal</p>
                        <p className="text-sm text-gold-400 mt-2">Depósito: 350€</p>
                      </div>

                      <div
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          selectedPlan === "vip"
                            ? "border-gold-500 bg-gold-500/10"
                            : "border-gray-700 hover:border-gold-500/50"
                        }`}
                        onClick={() => setSelectedPlan("vip")}
                      >
                        <h4 className="font-bold">Plano VIP</h4>
                        <p className="text-sm text-gray-400">Customizado</p>
                        <p className="text-sm text-gold-400 mt-2">Depósito: 1000€+</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button
                        className="bg-gold-600 hover:bg-gold-700 text-black w-full"
                        disabled={!selectedPlan}
                        onClick={() => setActiveTab("setup")}
                      >
                        Continuar para Configuração <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="setup" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">Vantagens do Copytrading</h3>

                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                          <TrendingUp className="h-5 w-5 text-gold-500" />
                        </div>
                        <div>
                          <h4 className="font-bold">Resultados Consistentes</h4>
                          <p className="text-gray-300">
                            Copie as operações de traders com histórico comprovado de resultados.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                          <Shield className="h-5 w-5 text-gold-500" />
                        </div>
                        <div>
                          <h4 className="font-bold">Gestão de Risco</h4>
                          <p className="text-gray-300">Sistemas com controle de risco e proteção do seu capital.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5 text-gold-500" />
                        </div>
                        <div>
                          <h4 className="font-bold">Automatizado 24/7</h4>
                          <p className="text-gray-300">
                            Opere nos mercados 24 horas por dia sem precisar acompanhar os gráficos.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                        <h4 className="font-bold mb-2">Sistema Tap to Trade</h4>
                        <p className="text-gray-300 mb-4">
                          Nosso sistema Tap to Trade envia sinais diretamente para seu dispositivo. Você tem 2 minutos
                          para aceitar cada sinal, garantindo que você esteja sempre no controle das suas operações.
                        </p>
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>Notificações em tempo real</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>Prazo de 2 minutos para aceitar cada sinal</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>Controle total sobre suas operações</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">Configure sua Conta</h3>
                      {selectedPlan && (
                        <div className="mb-4 p-3 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                          <h4 className="font-medium">
                            Plano selecionado:{" "}
                            {selectedPlan === "basic"
                              ? "Básico (5% mensal)"
                              : selectedPlan === "premium"
                                ? "Premium (30% mensal)"
                                : "VIP (Customizado)"}
                          </h4>
                          <p className="text-sm text-gold-400">
                            Depósito mínimo:{" "}
                            {selectedPlan === "basic" ? "500€" : selectedPlan === "premium" ? "350€" : "1000€+"}
                          </p>
                        </div>
                      )}

                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="platform">Plataforma</Label>
                          <select
                            id="platform"
                            className="w-full h-10 px-3 py-2 bg-gray-800/50 border border-white/10 rounded-md text-white"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                          >
                            <option value="mt4">MetaTrader 4</option>
                            <option value="mt5">MetaTrader 5</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="broker">Corretora</Label>
                          <select
                            id="broker"
                            className="w-full h-10 px-3 py-2 bg-gray-800/50 border border-white/10 rounded-md text-white"
                            value={selectedBroker}
                            onChange={(e) => setSelectedBroker(e.target.value)}
                            disabled={!platform}
                          >
                            <option value="">Selecione uma corretora</option>
                            {availableBrokers.map((broker) => (
                              <option key={broker.id} value={broker.id}>
                                {broker.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="server">Servidor</Label>
                          <select
                            id="server"
                            className="w-full h-10 px-3 py-2 bg-gray-800/50 border border-white/10 rounded-md text-white"
                            disabled={!selectedBroker}
                          >
                            <option value="">Selecione um servidor</option>
                            {availableServers.map((server) => (
                              <option key={server} value={server}>
                                {server}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="account">Número da Conta</Label>
                          <Input
                            id="account"
                            placeholder="Seu número de conta"
                            className="bg-gray-800/50 border-white/10 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Senha do Investidor</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Senha de acesso somente leitura"
                            className="bg-gray-800/50 border-white/10 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="master-password">Senha Mestre</Label>
                          <Input
                            id="master-password"
                            type="password"
                            placeholder="Senha mestre para execução de ordens"
                            className="bg-gray-800/50 border-white/10 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="risk">Nível de Risco: {riskPercentage}%</Label>
                            <span className="text-sm text-gray-400">(0.1% - 10%)</span>
                          </div>
                          <Slider
                            id="risk"
                            min={0.1}
                            max={10}
                            step={0.1}
                            value={[riskPercentage]}
                            onValueChange={(value) => setRiskPercentage(value[0])}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Conservador</span>
                            <span>Moderado</span>
                            <span>Agressivo</span>
                          </div>
                        </div>

                        <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full mt-4">
                          Configurar Copytrading <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="portfolios" className="mt-0">
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold">Portfólios Recomendados</h3>
                    <p className="text-gray-300">
                      Explore nossos portfólios diversificados criados por especialistas para diferentes perfis de
                      investidor.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Portfólio 1 */}
                      <div className="bg-black/50 border border-gold-500/30 rounded-lg p-5">
                        <h4 className="text-xl font-bold mb-2">Portfólio Cripto</h4>
                        <p className="text-gray-300 mb-4">
                          Diversificação em criptomoedas de alta capitalização e projetos promissores.
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span>Bitcoin (BTC)</span>
                            <span className="text-gold-400">40%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ethereum (ETH)</span>
                            <span className="text-gold-400">30%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Solana (SOL)</span>
                            <span className="text-gold-400">15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Outros</span>
                            <span className="text-gold-400">15%</span>
                          </div>
                        </div>
                        <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Copiar Portfólio</Button>
                      </div>

                      {/* Portfólio 2 */}
                      <div className="bg-black/50 border border-gold-500/30 rounded-lg p-5">
                        <h4 className="text-xl font-bold mb-2">Portfólio ETFs</h4>
                        <p className="text-gray-300 mb-4">
                          Diversificação global através de ETFs de diferentes setores e regiões.
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span>S&P 500 (SPY)</span>
                            <span className="text-gold-400">35%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tecnologia (QQQ)</span>
                            <span className="text-gold-400">25%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mercados Emergentes</span>
                            <span className="text-gold-400">20%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Outros</span>
                            <span className="text-gold-400">20%</span>
                          </div>
                        </div>
                        <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Copiar Portfólio</Button>
                      </div>

                      {/* Portfólio 3 */}
                      <div className="bg-black/50 border border-gold-500/30 rounded-lg p-5">
                        <h4 className="text-xl font-bold mb-2">Portfólio CFDs</h4>
                        <p className="text-gray-300 mb-4">Exposição a diferentes classes de ativos através de CFDs.</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span>Forex</span>
                            <span className="text-gold-400">40%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Índices</span>
                            <span className="text-gold-400">30%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Commodities</span>
                            <span className="text-gold-400">20%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ações</span>
                            <span className="text-gold-400">10%</span>
                          </div>
                        </div>
                        <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Copiar Portfólio</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
