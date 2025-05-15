"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Check, AlertCircle } from "lucide-react"

// Lista de corretoras e servidores
const brokers = [
  {
    name: "XM",
    servers: ["XM-Real 1", "XM-Real 2", "XM-Real 3", "XM-Real 4", "XM-Real 5"],
  },
  {
    name: "IC Markets",
    servers: ["IC Markets-Live01", "IC Markets-Live02", "IC Markets-Live03", "IC Markets-Live04", "IC Markets-Live05"],
  },
  {
    name: "Exness",
    servers: ["Exness-Real 1", "Exness-Real 2", "Exness-Real 3", "Exness-Real 4", "Exness-Real 5"],
  },
  {
    name: "FBS",
    servers: ["FBS-Real Server", "FBS-Real Server 2", "FBS-Real Server 3"],
  },
  {
    name: "Hotforex",
    servers: ["HotForex-Live", "HotForex-Live2", "HotForex-Live3"],
  },
  {
    name: "FXTM",
    servers: ["ForexTime-Live", "ForexTime-Live2"],
  },
  {
    name: "Tickmill",
    servers: ["Tickmill-Live", "Tickmill-Live2"],
  },
  {
    name: "FxPro",
    servers: ["FxPro-Real1", "FxPro-Real2", "FxPro-Real3"],
  },
  {
    name: "Pepperstone",
    servers: ["Pepperstone-Live01", "Pepperstone-Live02"],
  },
  {
    name: "FXCM",
    servers: ["FXCM-Real01", "FXCM-Real02"],
  },
  {
    name: "AvaTrade",
    servers: ["AvaTrade-Live01", "AvaTrade-Live02"],
  },
  {
    name: "OANDA",
    servers: ["OANDA-Live"],
  },
  {
    name: "ThinkMarkets",
    servers: ["ThinkMarkets-Live01", "ThinkMarkets-Live02"],
  },
  {
    name: "Alpari",
    servers: ["Alpari-Live01", "Alpari-Live02"],
  },
  {
    name: "FIBO Group",
    servers: ["FIBO-Live01", "FIBO-Live02"],
  },
]

// Planos disponíveis
const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "R$ 97/mês",
    maxTraders: 2,
    maxReturn: "5% ao mês",
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 197/mês",
    maxTraders: 5,
    maxReturn: "10% ao mês",
  },
  {
    id: "vip",
    name: "VIP",
    price: "R$ 497/mês",
    maxTraders: 10,
    maxReturn: "15%+ ao mês",
  },
]

interface CopytradingSetupProps {
  initialPlan: string | null
}

export function CopytradingSetup({ initialPlan }: CopytradingSetupProps) {
  const [activeTab, setActiveTab] = useState("plans")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(initialPlan)
  const [selectedBroker, setSelectedBroker] = useState("")
  const [selectedServer, setSelectedServer] = useState("")
  const [accountId, setAccountId] = useState("")
  const [password, setPassword] = useState("")
  const [isConfigured, setIsConfigured] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"none" | "connecting" | "success" | "error">("none")
  const [availableServers, setAvailableServers] = useState<string[]>([])

  // Atualiza os servidores disponíveis quando a corretora é selecionada
  useEffect(() => {
    if (selectedBroker) {
      const broker = brokers.find((b) => b.name === selectedBroker)
      if (broker) {
        setAvailableServers(broker.servers)
        setSelectedServer("")
      }
    } else {
      setAvailableServers([])
      setSelectedServer("")
    }
  }, [selectedBroker])

  // Atualiza a aba ativa quando um plano é selecionado
  useEffect(() => {
    if (selectedPlan && activeTab === "plans") {
      setActiveTab("configuration")
    }
  }, [selectedPlan, activeTab])

  // Simula a conexão com a corretora
  const handleConnect = () => {
    if (!selectedBroker || !selectedServer || !accountId || !password) {
      alert("Por favor, preencha todos os campos")
      return
    }

    setIsConnecting(true)
    setConnectionStatus("connecting")

    // Simulação de conexão
    setTimeout(() => {
      setIsConnecting(false)
      setConnectionStatus("success")
      setIsConfigured(true)

      // Simula o armazenamento das configurações
      console.log("Configurações salvas:", {
        plan: selectedPlan,
        broker: selectedBroker,
        server: selectedServer,
        accountId,
      })

      // Avança para a próxima aba
      setActiveTab("portfolio")
    }, 2000)
  }

  return (
    <Card className="border-gray-700 bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>Configuração de Copytrading</CardTitle>
        <CardDescription className="text-gray-300">
          Configure sua conta para começar a copiar as operações dos nossos traders profissionais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="configuration" disabled={!selectedPlan}>
              Configuração
            </TabsTrigger>
            <TabsTrigger value="portfolio" disabled={!isConfigured}>
              Portfólios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`border ${
                    selectedPlan === plan.id
                      ? "border-purple-500 bg-gradient-to-b from-gray-700 to-gray-800"
                      : "border-gray-600 bg-gray-700"
                  } text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-300">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-gray-300">Copie até {plan.maxTraders} traders</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-gray-300">Rentabilidade de até {plan.maxReturn}</span>
                      </li>
                    </ul>
                    <div className="mt-4 text-center">
                      <button
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                          selectedPlan === plan.id
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-gray-600 hover:bg-gray-500 text-white"
                        }`}
                        onClick={() => {
                          setSelectedPlan(plan.id)
                          setActiveTab("configuration")
                        }}
                      >
                        {selectedPlan === plan.id ? "Selecionado" : "Selecionar"}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configuration">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Conecte sua conta de corretora</h3>
                <p className="text-gray-300 mb-6">
                  Para começar a copiar as operações, precisamos conectar sua conta de corretora ao nosso sistema. Todas
                  as informações são criptografadas e seguras.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="broker">Corretora</Label>
                      <select
                        id="broker"
                        value={selectedBroker}
                        onChange={(e) => setSelectedBroker(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Selecione uma corretora</option>
                        {brokers.map((broker) => (
                          <option key={broker.name} value={broker.name}>
                            {broker.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="server">Servidor</Label>
                      <select
                        id="server"
                        value={selectedServer}
                        onChange={(e) => setSelectedServer(e.target.value)}
                        disabled={!selectedBroker}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      >
                        <option value="">Selecione um servidor</option>
                        {availableServers.map((server) => (
                          <option key={server} value={server}>
                            {server}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="account-id">Número da Conta</Label>
                      <Input
                        id="account-id"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Senha do Investidor</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Utilizamos apenas a senha do investidor, que permite apenas leitura e cópia de operações.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleConnect}
                    disabled={isConnecting || !selectedBroker || !selectedServer || !accountId || !password}
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? "Conectando..." : "Conectar Conta"}
                  </button>

                  {connectionStatus === "connecting" && (
                    <div className="flex items-center mt-4 text-yellow-400">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>Conectando à sua conta, por favor aguarde...</span>
                    </div>
                  )}

                  {connectionStatus === "success" && (
                    <div className="flex items-center mt-4 text-green-400">
                      <Check className="h-5 w-5 mr-2" />
                      <span>Conta conectada com sucesso!</span>
                    </div>
                  )}

                  {connectionStatus === "error" && (
                    <div className="flex items-center mt-4 text-red-400">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>Erro ao conectar. Verifique suas credenciais e tente novamente.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Portfólios de Traders</h3>
                <p className="text-gray-300 mb-6">
                  Selecione os traders que você deseja copiar. Você pode escolher até{" "}
                  {selectedPlan && plans.find((p) => p.id === selectedPlan)?.maxTraders} traders com seu plano atual.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border-gray-600 bg-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg">Trader Profissional {i}</CardTitle>
                        <CardDescription className="text-gray-300">
                          Especialista em {i % 2 === 0 ? "Forex" : "Índices"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Rentabilidade Média:</span>
                            <span className="text-green-400">{5 + i}% ao mês</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Drawdown Máximo:</span>
                            <span>{10 + i}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Operações por Dia:</span>
                            <span>
                              {i} - {i + 2}
                            </span>
                          </div>
                          <div className="mt-4">
                            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                              Selecionar Trader
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-300 mb-4">
                    Você selecionou 0 de {selectedPlan && plans.find((p) => p.id === selectedPlan)?.maxTraders} traders
                    disponíveis.
                  </p>
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors opacity-50 cursor-not-allowed">
                    Iniciar Copytrading
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
