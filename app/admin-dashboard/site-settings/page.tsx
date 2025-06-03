"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useConfigStore } from "@/lib/config-service"
import dynamic from "next/dynamic"

const SiteSettingsComponent = dynamic(() => import("./site-settings-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando configurações do site...</p>
      </div>
    </div>
  ),
})

export default function SiteSettingsPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { config, updateConfig } = useConfigStore()
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [tradingViewCode, setTradingViewCode] = useState(config.tradingViewCustomCode || "")
  const [copytradingEnabled, setCopytradingEnabled] = useState(config.copytrading?.enabled || false)
  const [masterAccount, setMasterAccount] = useState({
    brokerName: config.copytrading?.masterAccount?.brokerName || "InfinoxLimited",
    accountNumber: config.copytrading?.masterAccount?.accountNumber || "87047541",
    serverName: config.copytrading?.masterAccount?.serverName || "InfinoxLimited-MT5Live",
    password: config.copytrading?.masterAccount?.password || "Superacao2022#",
  })

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  // Atualizar estado local quando a configuração global mudar
  useEffect(() => {
    setTradingViewCode(config.tradingViewCustomCode || "")
    setCopytradingEnabled(config.copytrading?.enabled || false)
    setMasterAccount({
      brokerName: config.copytrading?.masterAccount?.brokerName || "InfinoxLimited",
      accountNumber: config.copytrading?.masterAccount?.accountNumber || "87047541",
      serverName: config.copytrading?.masterAccount?.serverName || "InfinoxLimited-MT5Live",
      password: config.copytrading?.masterAccount?.password || "Superacao2022#",
    })
  }, [config])

  const handleSaveTradingViewCode = () => {
    setIsSaving(true)

    try {
      // Validar o código antes de salvar
      new Function("container", "isAuthenticated", "pineScriptScanner", tradingViewCode)

      // Atualizar a configuração
      updateConfig({ tradingViewCustomCode: tradingViewCode })

      setSaveSuccess(true)
      toast({
        title: "Código salvo",
        description: "O código do TradingView foi salvo com sucesso.",
      })

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: `Erro de sintaxe no código: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveCopytradingSettings = () => {
    setIsSaving(true)

    try {
      // Atualizar a configuração
      updateConfig({
        copytrading: {
          enabled: copytradingEnabled,
          masterAccount: masterAccount,
        },
      })

      setSaveSuccess(true)
      toast({
        title: "Configurações salvas",
        description: "As configurações de copytrading foram salvas com sucesso.",
      })

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: `Erro ao salvar configurações: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  return <SiteSettingsComponent />
}
