"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Check, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useConfigStore, type SiteConfig } from "@/lib/config-service"

// Componente para editar as configurações do site
export default function SiteSettingsPage() {
  const { config: storeConfig, updateConfig } = useConfigStore()
  const [config, setConfig] = useState<SiteConfig>(storeConfig)
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  // Sincronizar com a store quando ela mudar
  useEffect(() => {
    setConfig(storeConfig)
  }, [storeConfig])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Lidar com campos aninhados como ownerInfo.name ou affiliateLinks.jifuAffiliateLink
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setConfig((prevConfig) => ({
        ...prevConfig,
        [parent]: {
          ...prevConfig[parent as keyof SiteConfig],
          [child]: value,
        },
      }))
    } else {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [name]: value,
      }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // Atualizar a configuração na store
      updateConfig(config)

      setSaveStatus("success")
      toast({
        title: "Configurações salvas",
        description: "As alterações foram aplicadas com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      setSaveStatus("error")
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
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

  // Função para lidar com alterações em switches
  const handleSwitchChange = (key: string, value: boolean) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      display: {
        ...prevConfig.display,
        [key]: value,
      },
    }))
  }

  // Função para lidar com alterações em cores
  const handleColorChange = (key: string, value: string) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      colors: {
        ...prevConfig.colors,
        [key]: value,
      },
    }))
  }

  // Função para lidar com alterações no programa de afiliados
  const handleAffiliateChange = (key: string, value: any) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      affiliateProgram: {
        ...prevConfig.affiliateProgram!,
        [key]: value,
      },
    }))
  }

  // Função para lidar com alterações nas taxas de comissão
  const handleCommissionChange = (level: string, value: string) => {
    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return

    setConfig((prevConfig) => ({
      ...prevConfig,
      affiliateProgram: {
        ...prevConfig.affiliateProgram!,
        commissionRates: {
          ...prevConfig.affiliateProgram!.commissionRates,
          [level]: numValue,
        },
      },
    }))
  }

  return (
    <div className="container mx-auto py-10 bg-black/50 min-h-screen rounded-lg border border-gold-500/20">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
            onClick={() => window.history.back()}
          >
            ← Voltar
          </Button>
          <h1 className="text-3xl font-bold">Configurações do Site</h1>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-black"
        >
          {isSaving ? (
            "Salvando..."
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>

      {saveStatus === "success" && (
        <Alert className="mb-5 bg-green-500/20 border-green-500">
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>As configurações foram salvas com sucesso.</AlertDescription>
        </Alert>
      )}

      {saveStatus === "error" && (
        <Alert className="mb-5 bg-red-500/20 border-red-500">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertTitle>Erro!</AlertTitle>
          <AlertDescription>Ocorreu um erro ao salvar as configurações. Tente novamente.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="mb-10">
        <TabsList className="mb-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="features">Recursos</TabsTrigger>
          <TabsTrigger value="affiliates">Links de Afiliado</TabsTrigger>
          <TabsTrigger value="affiliate-program">Programa de Afiliados</TabsTrigger>
          <TabsTrigger value="tradingview">TradingView</TabsTrigger>
          <TabsTrigger value="owner">Proprietário</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Defina as informações básicas do seu site.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Site</Label>
                <Input id="name" name="name" value={config.name} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logoUrl">URL do Logo</Label>
                <Input id="logoUrl" name="logoUrl" value={config.logoUrl} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="footerText">Texto do Rodapé</Label>
                <Input id="footerText" name="footerText" value={config.footerText} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Email de Contato</Label>
                <Input id="contactEmail" name="contactEmail" value={config.contactEmail} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Cores do Site</CardTitle>
              <CardDescription>Personalize as cores do seu site.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="colors.primary">Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="colors.primary"
                      name="colors.primary"
                      value={config.colors.primary}
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                    />
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: config.colors.primary }} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="colors.secondary">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="colors.secondary"
                      name="colors.secondary"
                      value={config.colors.secondary}
                      onChange={(e) => handleColorChange("secondary", e.target.value)}
                    />
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: config.colors.secondary }} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="colors.accent">Cor de Destaque</Label>
                  <div className="flex gap-2">
                    <Input
                      id="colors.accent"
                      name="colors.accent"
                      value={config.colors.accent}
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                    />
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: config.colors.accent }} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="colors.background">Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="colors.background"
                      name="colors.background"
                      value={config.colors.background}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                    />
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: config.colors.background }} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="colors.text">Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input
                      id="colors.text"
                      name="colors.text"
                      value={config.colors.text}
                      onChange={(e) => handleColorChange("text", e.target.value)}
                    />
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: config.colors.text }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">{/* Conteúdo existente da aba features */}</TabsContent>

        {/* Aba de Links de Afiliado */}
        <TabsContent value="affiliates">
          <Card>
            <CardHeader>
              <CardTitle>Links de Afiliado</CardTitle>
              <CardDescription>Configure os links de afiliado utilizados no site.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="affiliateLinks.jifuAffiliateLink">Link de Afiliado JIFU</Label>
                  <Input
                    id="affiliateLinks.jifuAffiliateLink"
                    name="affiliateLinks.jifuAffiliateLink"
                    value={config.affiliateLinks?.jifuAffiliateLink || ""}
                    onChange={handleChange}
                    placeholder="https://seunome.jifu.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Este link será usado em todos os botões de registro na JIFU do site.
                  </p>
                  <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
                    <p className="text-sm text-yellow-400">
                      <strong>Nota:</strong> Recomendamos usar HTTPS para garantir uma conexão segura. O link será
                      automaticamente convertido para HTTPS se necessário.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nova aba de Programa de Afiliados */}
        <TabsContent value="affiliate-program">
          <Card>
            <CardHeader>
              <CardTitle>Programa de Afiliados</CardTitle>
              <CardDescription>Configure as opções do programa de afiliados.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Ativar Programa de Afiliados</h3>
                  <p className="text-sm text-gray-500">Habilitar o programa de afiliados no site</p>
                </div>
                <Switch
                  checked={config.affiliateProgram?.enabled || false}
                  onCheckedChange={(checked) => handleAffiliateChange("enabled", checked)}
                />
              </div>

              <div className="grid gap-4">
                <h3 className="text-lg font-medium">Taxas de Comissão</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="level1">Nível 1 (Direto) %</Label>
                    <Input
                      id="level1"
                      type="number"
                      min="0"
                      max="100"
                      value={config.affiliateProgram?.commissionRates.level1 || 10}
                      onChange={(e) => handleCommissionChange("level1", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="level2">Nível 2 (Indireto) %</Label>
                    <Input
                      id="level2"
                      type="number"
                      min="0"
                      max="100"
                      value={config.affiliateProgram?.commissionRates.level2 || 5}
                      onChange={(e) => handleCommissionChange("level2", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payoutThreshold">Valor Mínimo para Pagamento (€)</Label>
                <Input
                  id="payoutThreshold"
                  type="number"
                  min="0"
                  value={config.affiliateProgram?.payoutThreshold || 50}
                  onChange={(e) => handleAffiliateChange("payoutThreshold", Number.parseFloat(e.target.value))}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Valor mínimo que um afiliado precisa acumular para solicitar um pagamento.
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Métodos de Pagamento Disponíveis</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {["PayPal", "Transferência Bancária", "Crypto"].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`payment-${method}`}
                        checked={config.affiliateProgram?.paymentMethods.includes(method) || false}
                        onChange={(e) => {
                          const currentMethods = config.affiliateProgram?.paymentMethods || []
                          const newMethods = e.target.checked
                            ? [...currentMethods, method]
                            : currentMethods.filter((m) => m !== method)
                          handleAffiliateChange("paymentMethods", newMethods)
                        }}
                        className="rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                      />
                      <Label htmlFor={`payment-${method}`}>{method}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tradingview">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do TradingView</CardTitle>
              <CardDescription>Personalize as configurações do widget TradingView usado no scanner.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tradingViewSettings.defaultSymbol">Símbolo Padrão</Label>
                <Input
                  id="tradingViewSettings.defaultSymbol"
                  name="tradingViewSettings.defaultSymbol"
                  value={config.tradingViewSettings?.defaultSymbol || "BINANCE:BTCUSDT"}
                  onChange={(e) => {
                    setConfig((prev) => ({
                      ...prev,
                      tradingViewSettings: {
                        ...prev.tradingViewSettings,
                        defaultSymbol: e.target.value,
                      },
                    }))
                  }}
                  placeholder="BINANCE:BTCUSDT"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tradingViewSettings.defaultInterval">Intervalo Padrão</Label>
                <select
                  id="tradingViewSettings.defaultInterval"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={config.tradingViewSettings?.defaultInterval || "240"}
                  onChange={(e) => {
                    setConfig((prev) => ({
                      ...prev,
                      tradingViewSettings: {
                        ...prev.tradingViewSettings,
                        defaultInterval: e.target.value,
                      },
                    }))
                  }}
                >
                  <option value="1">1 minuto</option>
                  <option value="5">5 minutos</option>
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="240">4 horas</option>
                  <option value="D">Diário</option>
                  <option value="W">Semanal</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tradingViewSettings.enabledFeatures">Recursos Habilitados</Label>
                <Input
                  id="tradingViewSettings.enabledFeatures"
                  placeholder="use_localstorage_for_settings,save_chart_properties_to_local_storage"
                  value={(config.tradingViewSettings?.enabledFeatures || []).join(",")}
                  onChange={(e) => {
                    setConfig((prev) => ({
                      ...prev,
                      tradingViewSettings: {
                        ...prev.tradingViewSettings,
                        enabledFeatures: e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      },
                    }))
                  }}
                />
                <p className="text-sm text-gray-500">Separe os recursos com vírgulas</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tradingViewSettings.disabledFeatures">Recursos Desabilitados</Label>
                <Input
                  id="tradingViewSettings.disabledFeatures"
                  placeholder="header_symbol_search,header_saveload"
                  value={(config.tradingViewSettings?.disabledFeatures || []).join(",")}
                  onChange={(e) => {
                    setConfig((prev) => ({
                      ...prev,
                      tradingViewSettings: {
                        ...prev.tradingViewSettings,
                        disabledFeatures: e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      },
                    }))
                  }}
                />
                <p className="text-sm text-gray-500">Separe os recursos com vírgulas</p>
              </div>

              <div className="grid gap-2">
                <Label>Configurações Avançadas</Label>
                <div className="p-4 bg-black/30 rounded-md">
                  <p className="text-sm text-yellow-400 mb-4">
                    As configurações avançadas do TradingView (overrides e studiesOverrides) podem ser modificadas
                    diretamente no código. Consulte a documentação do TradingView para mais informações.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="owner">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Proprietário</CardTitle>
              <CardDescription>Informações de contato do proprietário do site.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ownerInfo.name">Nome do Proprietário</Label>
                <Input
                  id="ownerInfo.name"
                  name="ownerInfo.name"
                  value={config.ownerInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ownerInfo.email">Email do Proprietário</Label>
                <Input
                  id="ownerInfo.email"
                  name="ownerInfo.email"
                  value={config.ownerInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ownerInfo.phone">Telefone do Proprietário</Label>
                <Input
                  id="ownerInfo.phone"
                  name="ownerInfo.phone"
                  value={config.ownerInfo.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ownerInfo.address">Endereço do Proprietário</Label>
                <Input
                  id="ownerInfo.address"
                  name="ownerInfo.address"
                  value={config.ownerInfo.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ownerInfo.taxId">ID Fiscal do Proprietário</Label>
                <Input
                  id="ownerInfo.taxId"
                  name="ownerInfo.taxId"
                  value={config.ownerInfo.taxId}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-black"
        >
          {isSaving ? (
            "Salvando..."
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
