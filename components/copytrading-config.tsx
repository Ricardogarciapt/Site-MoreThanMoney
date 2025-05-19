"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowRight } from "lucide-react"

export function CopytradingConfig() {
  const [activeTab, setActiveTab] = useState("planos")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [brokerConnected, setBrokerConnected] = useState(false)

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
  }

  const handleContinue = () => {
    if (activeTab === "planos" && selectedPlan) {
      setActiveTab("configuracao")
    } else if (activeTab === "configuracao") {
      setActiveTab("portfolios")
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
              <TabsTrigger
                value="portfolios"
                className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
              >
                Portfólios
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
                          <p className="text-sm text-gray-400">{brokerConnected ? "Conectado" : "Não conectado"}</p>
                        </div>
                        <Switch
                          checked={brokerConnected}
                          onCheckedChange={setBrokerConnected}
                          className="data-[state=checked]:bg-gold-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="broker">Broker</Label>
                          <Input id="broker" placeholder="MetaTrader 5" className="bg-black/50 border-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account">Número da Conta</Label>
                          <Input id="account" placeholder="12345678" className="bg-black/50 border-gray-700" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-4">Configurações de Risco</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="volume">Volume Máximo por Operação</Label>
                          <Input id="volume" placeholder="0.1 lote" className="bg-black/50 border-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxDrawdown">Drawdown Máximo</Label>
                          <Input id="maxDrawdown" placeholder="10%" className="bg-black/50 border-gray-700" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="stopLoss" className="data-[state=checked]:bg-gold-500" />
                        <Label htmlFor="stopLoss">Usar Stop Loss Fixo</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="takeProfit" className="data-[state=checked]:bg-gold-500" />
                        <Label htmlFor="takeProfit">Usar Take Profit Fixo</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button onClick={handleContinue} className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                    Continuar para Portfólios <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolios" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Selecione os Portfólios</h3>
                  <p className="text-gray-400 mb-6">Escolha quais estratégias você deseja copiar automaticamente.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold mb-2">Forex Conservador</h4>
                          <p className="text-gray-400 mb-4">
                            Estratégia de baixo risco focada em pares de moedas principais.
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                              Risco Baixo
                            </span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
                              Forex
                            </span>
                          </div>
                        </div>
                        <Switch className="data-[state=checked]:bg-gold-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold mb-2">Cripto Agressivo</h4>
                          <p className="text-gray-400 mb-4">
                            Estratégia de alto risco focada em criptomoedas de alta volatilidade.
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
                              Risco Alto
                            </span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400">
                              Cripto
                            </span>
                          </div>
                        </div>
                        <Switch className="data-[state=checked]:bg-gold-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold mb-2">Índices Moderado</h4>
                          <p className="text-gray-400 mb-4">Estratégia balanceada focada em índices globais.</p>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                              Risco Médio
                            </span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                              Índices
                            </span>
                          </div>
                        </div>
                        <Switch className="data-[state=checked]:bg-gold-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-gray-800 hover:border-gold-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold mb-2">Multi-mercado</h4>
                          <p className="text-gray-400 mb-4">
                            Estratégia diversificada com operações em múltiplos mercados.
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                              Risco Médio
                            </span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
                              Diversificado
                            </span>
                          </div>
                        </div>
                        <Switch className="data-[state=checked]:bg-gold-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">Salvar Configurações</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
