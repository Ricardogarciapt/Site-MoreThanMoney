"use client"

import Link from "next/link"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

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

// Redirecionar para a página de configurações existente
export default function SiteSettingsRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin-dashboard/site-settings")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-[350px] bg-black/50 border-gold-500/30">
        <CardHeader>
          <CardTitle className="text-xl text-center">Redirecionando...</CardTitle>
          <CardDescription className="text-center">
            Aguarde enquanto redirecionamos você para as configurações do site.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-16 w-16 text-gold-500 animate-spin" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/admin-dashboard">
            <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
              Voltar para o Painel
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
