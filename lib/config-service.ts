// Serviço centralizado para gerenciar configurações do site
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Tipos para as configurações
export interface SiteConfig {
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
  affiliateLinks?: {
    jifuAffiliateLink: string
  }
  affiliateProgram?: {
    enabled: boolean
    commissionRates: {
      level1: number
      level2: number
    }
    payoutThreshold: number
    paymentMethods: string[]
  }
  tradingViewSettings?: {
    studiesOverrides?: Record<string, any>
    overrides?: Record<string, any>
    disabledFeatures?: string[]
    enabledFeatures?: string[]
    defaultSymbol?: string
    defaultInterval?: string
  }
  tradingViewCustomCode?: string // Novo campo para código personalizado
}

// Configuração padrão
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
  affiliateLinks: {
    jifuAffiliateLink: "https://ricardogarcia.jifu.com",
  },
  affiliateProgram: {
    enabled: true,
    commissionRates: {
      level1: 10, // 10%
      level2: 5, // 5%
    },
    payoutThreshold: 50, // €50
    paymentMethods: ["PayPal", "Transferência Bancária", "Crypto"],
  },
  tradingViewSettings: {
    studiesOverrides: {
      "volume.volume.color.0": "#FF0000",
      "volume.volume.color.1": "#00FF00",
    },
    overrides: {
      "paneProperties.background": "#131722",
      "paneProperties.vertGridProperties.color": "#363c4e",
      "paneProperties.horzGridProperties.color": "#363c4e",
      "symbolWatermarkProperties.transparency": 90,
      "scalesProperties.textColor": "#AAA",
    },
    disabledFeatures: ["header_symbol_search"],
    enabledFeatures: ["use_localstorage_for_settings"],
    defaultSymbol: "BINANCE:BTCUSDT",
    defaultInterval: "240",
  },
  tradingViewCustomCode: "", // Código personalizado para TradingView
}

// Criar a store com persistência
export const useConfigStore = create(
  persist<{
    config: SiteConfig
    updateConfig: (newConfig: Partial<SiteConfig>) => void
    resetConfig: () => void
  }>(
    (set) => ({
      config: defaultConfig,
      updateConfig: (newConfig) =>
        set((state) => ({
          config: {
            ...state.config,
            ...newConfig,
            // Lidar com objetos aninhados
            ...(newConfig.ownerInfo ? { ownerInfo: { ...state.config.ownerInfo, ...newConfig.ownerInfo } } : {}),
            ...(newConfig.colors ? { colors: { ...state.config.colors, ...newConfig.colors } } : {}),
            ...(newConfig.display ? { display: { ...state.config.display, ...newConfig.display } } : {}),
            ...(newConfig.affiliateLinks
              ? { affiliateLinks: { ...state.config.affiliateLinks, ...newConfig.affiliateLinks } }
              : {}),
            ...(newConfig.affiliateProgram
              ? { affiliateProgram: { ...state.config.affiliateProgram, ...newConfig.affiliateProgram } }
              : {}),
            ...(newConfig.tradingViewSettings
              ? {
                  tradingViewSettings: {
                    ...state.config.tradingViewSettings,
                    ...newConfig.tradingViewSettings,
                  },
                }
              : {}),
            ...(newConfig.tradingViewCustomCode ? { tradingViewCustomCode: newConfig.tradingViewCustomCode } : {}),
          },
        })),
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: "site-config", // nome para o localStorage
    },
  ),
)

// Função para obter configuração atual
export function getConfig(): SiteConfig {
  // Se estiver no servidor, retorna a configuração padrão
  if (typeof window === "undefined") {
    return defaultConfig
  }

  // Se estiver no cliente, tenta obter do store
  return useConfigStore.getState().config
}

// Função para atualizar configuração
export function updateConfig(newConfig: Partial<SiteConfig>): void {
  useConfigStore.getState().updateConfig(newConfig)
}
