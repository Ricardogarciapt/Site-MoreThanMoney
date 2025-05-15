"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Shield, Clock, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/login-form"

export default function CopytradingPath() {
  const { isAuthenticated } = useAuth()
  const [riskPercentage, setRiskPercentage] = useState(1)
  const [activeTab, setActiveTab] = useState("setup")

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
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Copytrading MTM
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Automatize seus investimentos copiando as operações dos nossos traders profissionais.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 bg-black/50 border border-gold-500/30">
                <TabsTrigger value="setup" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                  Configuração
                </TabsTrigger>
                <TabsTrigger
                  value="portfolios"
                  className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
                >
                  Portfólios
                </TabsTrigger>
                <TabsTrigger value="ideas" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                  Ideias dos Educadores
                </TabsTrigger>
              </TabsList>

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
                    <p className="text-gray-300">
                      Preencha os dados abaixo para configurar sua conta de copytrading e começar a copiar nossas
                      operações automaticamente.
                    </p>

                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform">Plataforma</Label>
                        <select
                          id="platform"
                          className="w-full h-10 px-3 py-2 bg-gray-800/50 border border-white/10 rounded-md text-white"
                        >
                          <option value="mt4">MetaTrader 4</option>
                          <option value="mt5">MetaTrader 5</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="broker">Corretora</Label>
                        <Input
                          id="broker"
                          placeholder="Nome da sua corretora"
                          className="bg-gray-800/50 border-white/10 text-white"
                        />
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

              <TabsContent value="ideas" className="mt-0">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold">Ideias dos Educadores</h3>
                  <p className="text-gray-300">
                    Acompanhe as análises e ideias de trading dos nossos educadores e especialistas de mercado.
                  </p>

                  <div className="space-y-6">
                    {/* Ideia 1 */}
                    <div className="bg-black/50 border border-gold-500/30 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold">EUR/USD: Oportunidade de Compra</h4>
                          <p className="text-sm text-gray-400">Por Ricardo Garcia • 15 de Maio, 2025</p>
                        </div>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">Compra</span>
                      </div>
                      <p className="text-gray-300 mb-4">
                        O par EUR/USD formou uma estrutura de mercado de alta após romper a resistência em 1.1208.
                        Espero um movimento para 1.1300 nas próximas semanas.
                      </p>
                      <div className="flex justify-between text-sm mb-4">
                        <div>
                          <span className="text-gray-400">Entrada:</span> <span>1.1208</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Stop:</span> <span className="text-red-400">1.1169</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Alvo:</span> <span className="text-green-400">1.1300</span>
                        </div>
                      </div>
                      <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Copiar Operação</Button>
                    </div>

                    {/* Ideia 2 */}
                    <div className="bg-black/50 border border-gold-500/30 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold">BTC/USD: Correção de Curto Prazo</h4>
                          <p className="text-sm text-gray-400">Por Ana Silva • 14 de Maio, 2025</p>
                        </div>
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">Venda</span>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Bitcoin está sobrecomprado no curto prazo e deve corrigir antes de continuar sua tendência de
                        alta. Oportunidade para operação de venda com alvo na média móvel de 50 períodos.
                      </p>
                      <div className="flex justify-between text-sm mb-4">
                        <div>
                          <span className="text-gray-400">Entrada:</span> <span>102,000</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Stop:</span> <span className="text-red-400">104,500</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Alvo:</span> <span className="text-green-400">96,000</span>
                        </div>
                      </div>
                      <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Copiar Operação</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
