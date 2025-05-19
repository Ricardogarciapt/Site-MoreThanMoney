"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Save, Check, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useConfigStore } from "@/lib/config-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Código padrão do TradingView (mesmo usado no painel de administração)
const defaultTradingViewCode = `// Este é o código padrão do widget TradingView
// Você pode personalizá-lo conforme necessário

// Verificar se o TradingView está disponível
if (!window.TradingView) {
  console.error("TradingView não está disponível");
  return;
}

// Criar o widget com configurações básicas
const widget = new window.TradingView.widget({
  autosize: true,
  symbol: "OANDA:XAUUSD",
  interval: "60",
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  locale: "br",
  toolbar_bg: "#1E1E1E",
  enable_publishing: false,
  allow_symbol_change: true,
  hide_side_toolbar: false,
  withdateranges: true,
  save_image: false,
  studies: ["STD;MACD", "STD;RSI"],
  container_id: container.querySelector("#tradingview_widget").id,
});

// Adicionar callback para quando o gráfico estiver pronto
if (isAuthenticated) {
  widget.onChartReady(function() {
    try {
      // Criar um novo estudo com o PineScript
      widget.chart().createStudy("Custom Script", false, false, {
        text: pineScriptScanner
      });
      console.log("PineScript MTM Scanner aplicado com sucesso");
    } catch (error) {
      console.error("Erro ao aplicar o PineScript:", error);
    }
  });
}`

export function CopytradingConfig() {
  const { toast } = useToast()
  const { config, updateConfig } = useConfigStore()
  const [activeTab, setActiveTab] = useState("planos")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [brokerConnected, setBrokerConnected] = useState(false)
  const [tradingViewCode, setTradingViewCode] = useState(config.tradingViewCustomCode || defaultTradingViewCode)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  // Sincronizar com a store quando ela mudar
  useEffect(() => {
    setTradingViewCode(config.tradingViewCustomCode || defaultTradingViewCode)
  }, [config.tradingViewCustomCode])

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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Configure seu acesso ao copytrading</h2>
        <p className="text-gray-400">para começar a copiar operações automaticamente.</p>
      </div>

      <Card className="bg-black border-gray-800">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-gold-500/30 mb-8">
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
              <TabsTrigger
                value="tradingview"
                className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
              >
                TradingView
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

            {/* Nova aba para configuração do TradingView */}
            <TabsContent value="tradingview" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Configuração do TradingView</h3>
                  <p className="text-gray-400 mb-6">
                    Personalize o código do widget TradingView usado nos scanners e gráficos.
                  </p>
                </div>

                {saveStatus === "success" && (
                  <Alert className="mb-5 bg-green-500/20 border-green-500">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertTitle>Sucesso!</AlertTitle>
                    <AlertDescription>O código foi salvo com sucesso.</AlertDescription>
                  </Alert>
                )}

                {saveStatus === "error" && (
                  <Alert className="mb-5 bg-red-500/20 border-red-500">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertTitle>Erro!</AlertTitle>
                    <AlertDescription>Ocorreu um erro ao salvar o código. Verifique a sintaxe.</AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-2">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md mb-4">
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
                  <textarea
                    rows={15}
                    className="w-full p-4 font-mono text-sm bg-black/30 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    value={tradingViewCode}
                    onChange={(e) => setTradingViewCode(e.target.value)}
                    spellCheck="false"
                  />
                  <div className="flex justify-between mt-2">
                    <Button
                      variant="outline"
                      className="text-red-400 border-red-400/30 hover:bg-red-500/10"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Tem certeza que deseja restaurar o código padrão? Todas as alterações serão perdidas.",
                          )
                        ) {
                          setTradingViewCode(defaultTradingViewCode)
                          toast({
                            title: "Código restaurado",
                            description: "O código padrão foi restaurado com sucesso.",
                          })
                        }
                      }}
                    >
                      Restaurar Padrão
                    </Button>
                    <Button
                      variant="outline"
                      className="text-blue-400 border-blue-400/30 hover:bg-blue-500/10"
                      onClick={() => {
                        try {
                          // Validação básica do código
                          new Function("container", "isAuthenticated", "pineScriptScanner", tradingViewCode)
                          toast({
                            title: "Código válido",
                            description: "O código parece ser válido. Salve as alterações para aplicá-las.",
                          })
                        } catch (error) {
                          toast({
                            title: "Erro de sintaxe",
                            description: `Erro no código: ${error.message}`,
                            variant: "destructive",
                          })
                        }
                      }}
                    >
                      Validar Código
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2 mt-6">
                  <h3 className="text-lg font-medium">Documentação e Recursos</h3>
                  <div className="grid gap-4 p-4 bg-black/30 rounded-md">
                    <div>
                      <h4 className="font-medium mb-1">Documentação Oficial</h4>
                      <ul className="list-disc list-inside text-sm text-blue-400">
                        <li>
                          <a
                            href="https://www.tradingview.com/widget/advanced-chart/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Documentação do Widget Avançado
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.tradingview.com/widget-docs/chart_object/methods/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Métodos do Objeto Chart
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Exemplos Comuns</h4>
                      <ul className="list-disc list-inside text-sm">
                        <li>
                          Alterar o tema: <code className="bg-black/30 px-1 rounded">theme: "light"</code>
                        </li>
                        <li>
                          Adicionar indicadores:{" "}
                          <code className="bg-black/30 px-1 rounded">studies: ["RSI", "MACD"]</code>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleSaveCode}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-700 text-black"
                  >
                    {isSaving ? (
                      "Salvando..."
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Salvar Código do TradingView
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
