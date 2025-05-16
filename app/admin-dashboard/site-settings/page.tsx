"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  }
}

// Configuração inicial do site
const defaultConfig: SiteConfig = {
  name: "MoreThanMoney",
  logoUrl: "/logo-new.png",
  footerText: "© 2023 MoreThanMoney. Todos os direitos reservados.",
  contactEmail: "suporte@morethanmoney.com",
  ownerInfo: {
    name: "Ricardo Garcia",
    email: "info@morethanmoney.com",
    phone: "+351 912 345 678",
    address: "Rua Principal 123, 1000-000 Lisboa, Portugal",
    taxId: "PT123456789",
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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Configurações do Site</h1>

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

      <Card>
        <CardHeader>
          <CardTitle>Informações do Proprietário</CardTitle>
          <CardDescription>Informações de contato do proprietário do site.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="ownerInfo.name">Nome do Proprietário</Label>
            <Input id="ownerInfo.name" name="ownerInfo.name" value={config.ownerInfo.name} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ownerInfo.email">Email do Proprietário</Label>
            <Input id="ownerInfo.email" name="ownerInfo.email" value={config.ownerInfo.email} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ownerInfo.phone">Telefone do Proprietário</Label>
            <Input id="ownerInfo.phone" name="ownerInfo.phone" value={config.ownerInfo.phone} onChange={handleChange} />
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
            <Input id="ownerInfo.taxId" name="ownerInfo.taxId" value={config.ownerInfo.taxId} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
