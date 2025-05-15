"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, AlertCircle, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Lista de corretoras populares
const brokers = [
  {
    name: "XM",
    servers: ["XMGlobal-Real 1", "XMGlobal-Real 2", "XMGlobal-Real 3", "XMGlobal-Real 4", "XMGlobal-Real 5"],
  },
  {
    name: "IC Markets",
    servers: ["ICMarkets-Live01", "ICMarkets-Live02", "ICMarkets-Live03", "ICMarkets-Live04", "ICMarkets-Live05"],
  },
  { name: "Exness", servers: ["Exness-Real1", "Exness-Real2", "Exness-Real3", "Exness-Real4", "Exness-Real5"] },
  { name: "FBS", servers: ["FBS-Real Server", "FBS-Real Server 2", "FBS-Real Server 3"] },
  { name: "Hotforex", servers: ["HotForex-Live", "HotForex-Live2", "HotForex-Live3"] },
  { name: "Pepperstone", servers: ["Pepperstone-Live01", "Pepperstone-Live02", "Pepperstone-Live03"] },
  { name: "FXTM", servers: ["ForexTime-Live", "ForexTime-Live2"] },
  { name: "AvaTrade", servers: ["AvaTrade-Live", "AvaTrade-Live2"] },
  { name: "FxPro", servers: ["FxPro-Real1", "FxPro-Real2", "FxPro-Real3"] },
  { name: "OANDA", servers: ["OANDA-Live", "OANDA-Live2"] },
  { name: "eToro", servers: ["eToro-Live"] },
  { name: "Plus500", servers: ["Plus500-Live"] },
  { name: "IG", servers: ["IG-Live01", "IG-Live02"] },
  { name: "Forex.com", servers: ["FOREX.com-Live01", "FOREX.com-Live02"] },
  { name: "FXCM", servers: ["FXCM-Live01", "FXCM-Live02"] },
  { name: "Alpari", servers: ["Alpari-Live", "Alpari-Live2"] },
  { name: "Dukascopy", servers: ["Dukascopy-Live01", "Dukascopy-Live02"] },
  { name: "LBLV", servers: ["LBLV-Live"] },
  { name: "Tickmill", servers: ["Tickmill-Live", "Tickmill-Live2"] },
  { name: "ThinkMarkets", servers: ["ThinkMarkets-Live01", "ThinkMarkets-Live02"] },
  { name: "Axiory", servers: ["Axiory-Live"] },
  { name: "Vantage", servers: ["Vantage-Live", "Vantage-Live2"] },
  { name: "FXDD", servers: ["FXDD-Live"] },
  { name: "LMFX", servers: ["LMFX-Live"] },
  { name: "FP Markets", servers: ["FP Markets-Live01", "FP Markets-Live02"] },
]

// Lista de traders disponíveis
const traders = [
  {
    id: 1,
    name: "Trader Alpha",
    winRate: "68%",
    monthlyReturn: "12.4%",
    style: "Swing",
    markets: "Forex, Indices",
    risk: "Médio",
  },
  {
    id: 2,
    name: "Trader Beta",
    winRate: "72%",
    monthlyReturn: "9.8%",
    style: "Scalping",
    markets: "Forex",
    risk: "Alto",
  },
  {
    id: 3,
    name: "Trader Gamma",
    winRate: "65%",
    monthlyReturn: "7.5%",
    style: "Day Trading",
    markets: "Forex, Commodities",
    risk: "Baixo",
  },
  {
    id: 4,
    name: "Trader Delta",
    winRate: "70%",
    monthlyReturn: "11.2%",
    style: "Position",
    markets: "Indices, Stocks",
    risk: "Médio",
  },
  {
    id: 5,
    name: "Trader Epsilon",
    winRate: "75%",
    monthlyReturn: "14.3%",
    style: "Scalping",
    markets: "Forex, Crypto",
    risk: "Alto",
  },
  {
    id: 6,
    name: "Trader Zeta",
    winRate: "67%",
    monthlyReturn: "8.9%",
    style: "Swing",
    markets: "Forex, Indices",
    risk: "Médio-Baixo",
  },
  {
    id: 7,
    name: "Trader Eta",
    winRate: "71%",
    monthlyReturn: "10.5%",
    style: "Day Trading",
    markets: "Forex, Commodities, Indices",
    risk: "Médio-Alto",
  },
]

// Planos disponíveis
const plans = [
  { id: "basic", name: "Básico", price: "R$ 97", traderLimit: 1 },
  { id: "premium", name: "Premium", price: "R$ 197", traderLimit: 3 },
  { id: "vip", name: "VIP", price: "R$ 397", traderLimit: 7 },
]

export default function MemberCopytradingSetup() {
  const [selectedTab, setSelectedTab] = useState("plans")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null)
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [accountId, setAccountId] = useState("")
  const [investorPassword, setInvestorPassword] = useState("")
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)
  const [selectedTraders, setSelectedTraders] = useState<number[]>([])
  const [expandedTraders, setExpandedTraders] = useState<number[]>([])

  // Obter servidores para a corretora selecionada
  const getServersForBroker = () => {
    if (!selectedBroker) return []
    const broker = brokers.find((b) => b.name === selectedBroker)
    return broker ? broker.servers : []
  }

  // Alternar expansão do card do trader
  const toggleTraderExpand = (traderId: number) => {
    if (expandedTraders.includes(traderId)) {
      setExpandedTraders(expandedTraders.filter((id) => id !== traderId))
    } else {
      setExpandedTraders([...expandedTraders, traderId])
    }
  }

  // Selecionar/deselecionar trader
  const toggleTraderSelection = (traderId: number) => {
    if (selectedTraders.includes(traderId)) {
      setSelectedTraders(selectedTraders.filter((id) => id !== traderId))
    } else {
      // Verificar limite de traders do plano
      const plan = plans.find((p) => p.id === selectedPlan)
      if (plan && selectedTraders.length < plan.traderLimit) {
        setSelectedTraders([...selectedTraders, traderId])
      } else {
        alert(
          `Seu plano ${plan?.name} permite no máximo ${plan?.traderLimit} traders. Faça upgrade para adicionar mais.`,
        )
      }
    }
  }

  // Simular configuração da conta
  const handleConfigureAccount = () => {
    if (!selectedBroker || !selectedServer || !accountId || !investorPassword) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    setIsConfiguring(true)

    // Simulação de configuração
    setTimeout(() => {
      setIsConfiguring(false)
      setIsConfigured(true)
      setSelectedTab("portfolio")
    }, 2000)
  }

  // Renderizar status da configuração
  const renderConfigStatus = () => {
    if (isConfigured) {
      return (
        <div className="flex items-center p-3 bg-green-500/20 border border-green-500/30 rounded-md">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-400">Conta configurada com sucesso!</span>
        </div>
      )
    }

    return null
  }

  return (
    <div className="w-full">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="setup" disabled={!selectedPlan}>
            Configuração
          </TabsTrigger>
          <TabsTrigger value="portfolio" disabled={!isConfigured}>
            Portfólios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "border-gold-500 bg-gold-500/10"
                      : "border-gray-800 hover:border-gold-500/50"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.id === "basic" && "Para investidores iniciantes"}
                      {plan.id === "premium" && "Para investidores intermediários"}
                      {plan.id === "vip" && "Para investidores avançados"}
                    </CardDescription>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-gray-400">/mês</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>
                          Acesso a {plan.traderLimit} trader{plan.traderLimit > 1 ? "s" : ""}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Cópia automática de operações</span>
                      </li>
                      {plan.id === "premium" && (
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Suporte prioritário</span>
                        </li>
                      )}
                      {plan.id === "vip" && (
                        <>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Suporte VIP 24/7</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Acesso a traders exclusivos</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        selectedPlan === plan.id
                          ? "bg-gold-600 hover:bg-gold-700 text-black"
                          : "bg-gray-800 hover:bg-gold-600 hover:text-black"
                      }`}
                      onClick={() => {
                        setSelectedPlan(plan.id)
                        setSelectedTab("setup")
                      }}
                    >
                      {selectedPlan === plan.id ? "Selecionado" : "Selecionar"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {selectedPlan && (
              <div className="flex justify-center mt-8">
                <Button
                  className="bg-gold-600 hover:bg-gold-700 text-black px-8"
                  onClick={() => setSelectedTab("setup")}
                >
                  Continuar para Configuração
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>Configuração da Conta</CardTitle>
              <CardDescription>Conecte sua conta de corretora para começar a copiar operações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderConfigStatus()}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="broker">Corretora</Label>
                  <Select value={selectedBroker || ""} onValueChange={setSelectedBroker}>
                    <SelectTrigger id="broker">
                      <SelectValue placeholder="Selecione sua corretora" />
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

                <div>
                  <Label htmlFor="server">Servidor</Label>
                  <Select value={selectedServer || ""} onValueChange={setSelectedServer} disabled={!selectedBroker}>
                    <SelectTrigger id="server">
                      <SelectValue
                        placeholder={selectedBroker ? "Selecione o servidor" : "Selecione uma corretora primeiro"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {getServersForBroker().map((server) => (
                        <SelectItem key={server} value={server}>
                          {server}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="account-id">Número da Conta</Label>
                  <Input
                    id="account-id"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="Ex: 12345678"
                  />
                </div>

                <div>
                  <Label htmlFor="investor-password">Senha de Investidor</Label>
                  <Input
                    id="investor-password"
                    type="password"
                    value={investorPassword}
                    onChange={(e) => setInvestorPassword(e.target.value)}
                    placeholder="Senha de investidor (somente leitura)"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Nota: Utilizamos apenas a senha de investidor, que permite apenas leitura e cópia de operações, sem
                    acesso para saques.
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-md">
                  <h4 className="font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 text-blue-400 mr-2" />
                    Como obter a senha de investidor?
                  </h4>
                  <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                    <li>Acesse sua conta na plataforma MetaTrader 4/5</li>
                    <li>Vá em "Ferramentas" &gt; "Opções" &gt; "Segurança"</li>
                    <li>Clique em "Alterar senha de investidor"</li>
                    <li>Defina uma senha de investidor e anote-a</li>
                    <li>Use esta senha no campo acima</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("plans")}>
                Voltar
              </Button>
              <Button
                className="bg-gold-600 hover:bg-gold-700 text-black"
                onClick={handleConfigureAccount}
                disabled={isConfiguring || isConfigured}
              >
                {isConfiguring ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Configurando...
                  </>
                ) : isConfigured ? (
                  "Configurado"
                ) : (
                  "Configurar Conta"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Selecione seus Traders</CardTitle>
              <CardDescription>
                Escolha até {plans.find((p) => p.id === selectedPlan)?.traderLimit} traders para copiar suas operações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {traders.map((trader) => (
                  <div
                    key={trader.id}
                    className={`border rounded-lg transition-all ${
                      selectedTraders.includes(trader.id)
                        ? "border-gold-500 bg-gold-500/10"
                        : "border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <div
                      className="p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleTraderExpand(trader.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {trader.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">{trader.name}</h3>
                          <div className="text-sm text-gray-400">
                            Win Rate: {trader.winRate} | Retorno Mensal: {trader.monthlyReturn}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`mr-3 ${
                            selectedTraders.includes(trader.id)
                              ? "bg-gold-600 text-black border-gold-600 hover:bg-gold-700 hover:border-gold-700"
                              : "border-gray-700"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleTraderSelection(trader.id)
                          }}
                        >
                          {selectedTraders.includes(trader.id) ? "Selecionado" : "Selecionar"}
                        </Button>
                        {expandedTraders.includes(trader.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>

                    {expandedTraders.includes(trader.id) && (
                      <div className="p-4 pt-0 border-t border-gray-800 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Estilo de Trading:</span>
                            <p>{trader.style}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Mercados:</span>
                            <p>{trader.markets}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Nível de Risco:</span>
                            <p>{trader.risk}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Histórico de Performance</h4>
                          <div className="h-20 bg-gray-800/50 rounded-md flex items-end p-2">
                            {/* Simulação de gráfico de performance */}
                            <div className="w-1/12 h-[30%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[45%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[25%] bg-red-500 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[60%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[40%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[20%] bg-red-500 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[50%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[65%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[35%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[15%] bg-red-500 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[55%] bg-gold-600 mx-[0.1rem]"></div>
                            <div className="w-1/12 h-[70%] bg-gold-600 mx-[0.1rem]"></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Jan</span>
                            <span>Fev</span>
                            <span>Mar</span>
                            <span>Abr</span>
                            <span>Mai</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Ago</span>
                            <span>Set</span>
                            <span>Out</span>
                            <span>Nov</span>
                            <span>Dez</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("setup")}>
                Voltar
              </Button>
              <Button className="bg-gold-600 hover:bg-gold-700 text-black" disabled={selectedTraders.length === 0}>
                Salvar Seleção
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
