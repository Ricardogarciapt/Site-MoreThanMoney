"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processAdminAction } from "@/lib/admin-service"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Check, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define os tipos para configurações do site
interface SiteConfig {
  name: string
  logoUrl: string
  footerText: string
  contactEmail: string
  ownerInfo: {
    name: string
    email: string
    phone: string
    address: string
    taxId: string
  }
  socialLinks: {
    platform: string
    url: string
    icon: string
  }[]
  seo: {
    title: string
    description: string
    keywords: string
  }
  analytics: {
    googleAnalyticsId: string
    facebookPixelId: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  features: {
    id: string
    name: string
    enabled: boolean
  }[]
  display: {
    showIdeas: boolean
    showPortfolios: boolean
    showTapToTrade: boolean
    showScanner: boolean
    showEducation?: boolean
    showCopytrading?: boolean
  }
}

// Configuração inicial do site
const defaultConfig: SiteConfig = {
  name: "MoreThanMoney",
  logoUrl: "/logo-new.png",
  footerText: "© 2025 MoreThanMoney. Todos os direitos reservados.",
  contactEmail: "suporte@morethanmoney.pt",
  ownerInfo: {
    name: "Ricardo Garcia",
    email: "info@morethanmoney.pt",
    phone: "+351 912 666 699",
    address: "Santarém, Portugal",
    taxId: "PT241991439",
  },
  socialLinks: [
    {
      platform: "Instagram",
      url: "https://instagram.com/morethanmoney",
      icon: "instagram",
    },
    {
      platform: "Telegram",
      url: "https://t.me/morethanmoney",
      icon: "telegram",
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/morethanmoney",
      icon: "youtube",
    },
  ],
  seo: {
    title: "MoreThanMoney | Trading e Investimentos",
    description: "Plataforma de trading, educação financeira e soluções de investimento automatizado.",
    keywords: "trading, investimentos, forex, criptomoedas, scanner, copytrading",
  },
  analytics: {
    googleAnalyticsId: "",
    facebookPixelId: "",
  },
  colors: {
    primary: "#f9b208",
    secondary: "#000000",
    accent: "#f9b208",
    background: "#0f0f0f",
    text: "#ffffff",
  },
  features: [
    { id: "scanner", name: "Scanner MTM", enabled: true },
    { id: "copytrading", name: "Copytrading", enabled: true },
    { id: "education", name: "Educação JIFU", enabled: true },
    { id: "automation", name: "Automatização", enabled: true },
    { id: "affiliate", name: "Sistema de Afiliados", enabled: true },
    { id: "ideas", name: "Ideias de Trading", enabled: true },
  ],
  display: {
    showIdeas: true,
    showPortfolios: true,
    showTapToTrade: true,
    showScanner: true,
    showEducation: true,
    showCopytrading: true,
  },
}

// Componente para editar as configurações do site
export default function SiteSettingsPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Lidar com campos aninhados como ownerInfo.name
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

  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // Salvar configurações usando o serviço de admin
      await processAdminAction({
        type: "UPDATE_SITE_CONFIG",
        payload: config,
      })

      // Atualizar o estado local
      if (typeof window !== "undefined") {
        localStorage.setItem("siteConfig", JSON.stringify(config))
      }

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

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Visibilidade das Seções</CardTitle>
              <CardDescription>Controle quais seções são exibidas no site.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Scanner MTM</h3>
                  <p className="text-sm text-gray-500">Exibir a seção de Scanner no site</p>
                </div>
                <Switch
                  checked={config.display.showScanner}
                  onCheckedChange={(checked) => handleSwitchChange("showScanner", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Ideias de Trading</h3>
                  <p className="text-sm text-gray-500">Exibir a seção de Ideias de Trading no site</p>
                </div>
                <Switch
                  checked={config.display.showIdeas}
                  onCheckedChange={(checked) => handleSwitchChange("showIdeas", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Portfólios</h3>
                  <p className="text-sm text-gray-500">Exibir a seção de Portfólios no site</p>
                </div>
                <Switch
                  checked={config.display.showPortfolios}
                  onCheckedChange={(checked) => handleSwitchChange("showPortfolios", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Tap to Trade</h3>
                  <p className="text-sm text-gray-500">Exibir a funcionalidade Tap to Trade no site</p>
                </div>
                <Switch
                  checked={config.display.showTapToTrade}
                  onCheckedChange={(checked) => handleSwitchChange("showTapToTrade", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Educação JIFU</h3>
                  <p className="text-sm text-gray-500">Exibir a seção de Educação JIFU no site</p>
                </div>
                <Switch
                  checked={config.display.showEducation || false}
                  onCheckedChange={(checked) => handleSwitchChange("showEducation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Copytrading</h3>
                  <p className="text-sm text-gray-500">Exibir a seção de Copytrading no site</p>
                </div>
                <Switch
                  checked={config.display.showCopytrading || false}
                  onCheckedChange={(checked) => handleSwitchChange("showCopytrading", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recursos Habilitados</CardTitle>
              <CardDescription>Ative ou desative recursos específicos do site.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {config.features.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{feature.name}</h3>
                    <p className="text-sm text-gray-500">Habilitar o recurso {feature.name}</p>
                  </div>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={(checked) => {
                      setConfig((prevConfig) => ({
                        ...prevConfig,
                        features: prevConfig.features.map((f) =>
                          f.id === feature.id ? { ...f, enabled: checked } : f,
                        ),
                      }))
                    }}
                  />
                </div>
              ))}
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
