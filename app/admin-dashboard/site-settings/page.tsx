"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"

// Define os tipos para configurações do site
interface SiteConfig {
  name: string
  logoUrl: string
  footerText: string
  contactEmail: string
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
}

// Configuração inicial do site
const defaultConfig: SiteConfig = {
  name: "MoreThanMoney",
  logoUrl: "/logo-new.png",
  footerText: "© 2023 MoreThanMoney. Todos os direitos reservados.",
  contactEmail: "suporte@morethanmoney.com",
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
}

export default function SiteSettingsPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Ao carregar, verificar se há configuração salva
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("siteConfig")
      if (savedConfig) {
        try {
          setConfig(JSON.parse(savedConfig))
        } catch (e) {
          console.error("Erro ao carregar configurações:", e)
        }
      }
    }
  }, [])

  // Redirecionar se não for autenticado ou admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (!isAdmin) {
      router.push("/member-area")
    }
  }, [isAuthenticated, isAdmin, router])

  // Função para salvar configurações
  const saveConfig = () => {
    setIsSaving(true)
    // Simulação de salvamento - em produção seria uma API
    setTimeout(() => {
      try {
        localStorage.setItem("siteConfig", JSON.stringify(config))
        setSaveMessage("Configurações salvas com sucesso!")
      } catch (e) {
        console.error("Erro ao salvar configurações:", e)
        setSaveMessage("Erro ao salvar configurações.")
      } finally {
        setIsSaving(false)
        setTimeout(() => setSaveMessage(""), 3000) // Limpa a mensagem após 3 segundos
      }
    }, 1500)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }))
  }

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedSocialLinks = [...config.socialLinks]
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], [field]: value }
    setConfig((prevConfig) => ({
      ...prevConfig,
      socialLinks: updatedSocialLinks,
    }))
  }

  const handleAddSocialLink = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      socialLinks: [...prevConfig.socialLinks, { platform: "", url: "", icon: "" }],
    }))
  }

  const handleRemoveSocialLink = (index: number) => {
    const updatedSocialLinks = [...config.socialLinks]
    updatedSocialLinks.splice(index, 1)
    setConfig((prevConfig) => ({
      ...prevConfig,
      socialLinks: updatedSocialLinks,
    }))
  }

  const handleFeatureChange = (id: string, enabled: boolean) => {
    const updatedFeatures = config.features.map((feature) => (feature.id === id ? { ...feature, enabled } : feature))
    setConfig((prevConfig) => ({
      ...prevConfig,
      features: updatedFeatures,
    }))
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Site</CardTitle>
          <CardDescription>Gerencie as configurações globais do seu site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="colors">Cores</TabsTrigger>
              <TabsTrigger value="features">Recursos</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Nome do Site</Label>
                  <Input type="text" id="name" name="name" value={config.name} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="logoUrl">URL do Logo</Label>
                  <Input type="text" id="logoUrl" name="logoUrl" value={config.logoUrl} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="footerText">Texto do Rodapé</Label>
                  <Textarea id="footerText" name="footerText" value={config.footerText} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email de Contato</Label>
                  <Input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={config.contactEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="seo" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="seo.title">Título SEO</Label>
                  <Input type="text" id="seo.title" name="seo.title" value={config.seo.title} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="seo.description">Descrição SEO</Label>
                  <Textarea
                    id="seo.description"
                    name="seo.description"
                    value={config.seo.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="seo.keywords">Palavras-chave SEO</Label>
                  <Input
                    type="text"
                    id="seo.keywords"
                    name="seo.keywords"
                    value={config.seo.keywords}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="analytics.googleAnalyticsId">ID Google Analytics</Label>
                  <Input
                    type="text"
                    id="analytics.googleAnalyticsId"
                    name="analytics.googleAnalyticsId"
                    value={config.analytics.googleAnalyticsId}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="analytics.facebookPixelId">ID Facebook Pixel</Label>
                  <Input
                    type="text"
                    id="analytics.facebookPixelId"
                    name="analytics.facebookPixelId"
                    value={config.analytics.facebookPixelId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="colors" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="colors.primary">Cor Primária</Label>
                  <Input
                    type="color"
                    id="colors.primary"
                    name="colors.primary"
                    value={config.colors.primary}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="colors.secondary">Cor Secundária</Label>
                  <Input
                    type="color"
                    id="colors.secondary"
                    name="colors.secondary"
                    value={config.colors.secondary}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="colors.accent">Cor de Destaque</Label>
                  <Input
                    type="color"
                    id="colors.accent"
                    name="colors.accent"
                    value={config.colors.accent}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="colors.background">Cor de Fundo</Label>
                  <Input
                    type="color"
                    id="colors.background"
                    name="colors.background"
                    value={config.colors.background}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="colors.text">Cor do Texto</Label>
                  <Input
                    type="color"
                    id="colors.text"
                    name="colors.text"
                    value={config.colors.text}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="space-y-4">
              <div className="grid gap-4">
                {config.features.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between">
                    <Label htmlFor={`feature-${feature.id}`}>{feature.name}</Label>
                    <Input
                      type="checkbox"
                      id={`feature-${feature.id}`}
                      checked={feature.enabled}
                      onChange={(e) => handleFeatureChange(feature.id, e.target.checked)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={saveConfig} disabled={isSaving}>
            {isSaving ? (
              <>
                Salvando... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Salvar <Save className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {saveMessage && <div className="ml-4 text-sm text-gray-500">{saveMessage}</div>}
        </CardFooter>
      </Card>
    </div>
  )
}
