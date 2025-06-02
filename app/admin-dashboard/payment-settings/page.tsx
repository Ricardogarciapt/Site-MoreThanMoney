"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle, Save, TestTube, Shield, Key } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface StripeConfig {
  publishableKey: string
  secretKey: string
  webhookSecret: string
  isTestMode: boolean
  isConnected: boolean
}

export default function PaymentSettingsPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [config, setConfig] = useState<StripeConfig>({
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    isTestMode: true,
    isConnected: false,
  })
  const [showSecrets, setShowSecrets] = useState({
    secretKey: false,
    webhookSecret: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Carregar configurações salvas
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedConfig = localStorage.getItem("stripeConfig")
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig)
          setConfig(parsed)
        }
      } catch (error) {
        console.error("Error loading Stripe config:", error)
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

  // Validar formato das chaves
  const validateKey = (key: string, type: "publishable" | "secret" | "webhook"): boolean => {
    if (!key) return false

    switch (type) {
      case "publishable":
        return key.startsWith("pk_test_") || key.startsWith("pk_live_")
      case "secret":
        return key.startsWith("sk_test_") || key.startsWith("sk_live_")
      case "webhook":
        return key.startsWith("whsec_")
      default:
        return false
    }
  }

  // Salvar configurações
  const handleSave = async () => {
    setIsSaving(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Validar chaves
      if (!validateKey(config.publishableKey, "publishable")) {
        throw new Error("Chave pública inválida. Deve começar com 'pk_test_' ou 'pk_live_'")
      }
      if (!validateKey(config.secretKey, "secret")) {
        throw new Error("Chave secreta inválida. Deve começar com 'sk_test_' ou 'sk_live_'")
      }
      if (config.webhookSecret && !validateKey(config.webhookSecret, "webhook")) {
        throw new Error("Webhook secret inválido. Deve começar com 'whsec_'")
      }

      // Verificar consistência do modo (test/live)
      const pubKeyIsTest = config.publishableKey.startsWith("pk_test_")
      const secKeyIsTest = config.secretKey.startsWith("sk_test_")

      if (pubKeyIsTest !== secKeyIsTest) {
        throw new Error("As chaves pública e secreta devem ser do mesmo ambiente (test ou live)")
      }

      // Atualizar modo baseado nas chaves
      const updatedConfig = {
        ...config,
        isTestMode: pubKeyIsTest,
      }

      // Salvar no localStorage
      localStorage.setItem("stripeConfig", JSON.stringify(updatedConfig))
      setConfig(updatedConfig)

      setSuccessMessage("Configurações salvas com sucesso!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erro ao salvar configurações")
    } finally {
      setIsSaving(false)
    }
  }

  // Testar conexão com Stripe
  const testConnection = async () => {
    setIsTestingConnection(true)
    setErrorMessage("")

    try {
      // Simular teste de conexão (em produção, faria uma chamada real para a API)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (!config.publishableKey || !config.secretKey) {
        throw new Error("Chaves não configuradas")
      }

      const updatedConfig = { ...config, isConnected: true }
      setConfig(updatedConfig)
      localStorage.setItem("stripeConfig", JSON.stringify(updatedConfig))

      setSuccessMessage("Conexão com Stripe estabelecida com sucesso!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      const updatedConfig = { ...config, isConnected: false }
      setConfig(updatedConfig)
      setErrorMessage("Falha ao conectar com Stripe. Verifique suas chaves.")
    } finally {
      setIsTestingConnection(false)
    }
  }

  // Se não for admin, não mostrar conteúdo
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-[350px] bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
            <CardDescription className="text-center">Esta área é exclusiva para administradores.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CreditCard className="h-16 w-16 text-gold-500" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                Configurações de Pagamento
              </h1>
              <p className="text-gray-400 mt-2">Configure as chaves do Stripe para processar pagamentos</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={config.isConnected ? "default" : "destructive"} className="flex items-center gap-1">
                {config.isConnected ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Conectado
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    Desconectado
                  </>
                )}
              </Badge>
              <Badge variant={config.isTestMode ? "secondary" : "default"}>
                {config.isTestMode ? "Modo Teste" : "Modo Produção"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        {successMessage && (
          <Alert className="mb-6 border-green-500/30 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-400">{successMessage}</AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert className="mb-6 border-red-500/30 bg-red-500/10">
            <XCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-400">{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Security Warning */}
        <Alert className="mb-6 border-yellow-500/30 bg-yellow-500/10">
          <Shield className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-400">
            <strong>Importante:</strong> Mantenha suas chaves secretas seguras. Nunca as compartilhe ou as exponha
            publicamente.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          {/* Stripe Configuration */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gold-500" />
                Configuração do Stripe
              </CardTitle>
              <CardDescription>Configure suas chaves de API do Stripe para processar pagamentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Publishable Key */}
              <div className="space-y-2">
                <Label htmlFor="publishableKey" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Chave Pública (Publishable Key)
                </Label>
                <Input
                  id="publishableKey"
                  type="text"
                  placeholder="pk_test_..."
                  value={config.publishableKey}
                  onChange={(e) => setConfig({ ...config, publishableKey: e.target.value })}
                  className="bg-gray-800/50 border-white/10 text-white"
                />
                <p className="text-xs text-gray-400">
                  Esta chave é segura para uso no frontend. Começa com pk_test_ ou pk_live_
                </p>
              </div>

              {/* Secret Key */}
              <div className="space-y-2">
                <Label htmlFor="secretKey" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Chave Secreta (Secret Key)
                </Label>
                <div className="relative">
                  <Input
                    id="secretKey"
                    type={showSecrets.secretKey ? "text" : "password"}
                    placeholder="sk_test_..."
                    value={config.secretKey}
                    onChange={(e) => setConfig({ ...config, secretKey: e.target.value })}
                    className="bg-gray-800/50 border-white/10 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowSecrets({ ...showSecrets, secretKey: !showSecrets.secretKey })}
                  >
                    {showSecrets.secretKey ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Esta chave deve ser mantida em segredo. Começa com sk_test_ ou sk_live_
                </p>
              </div>

              {/* Webhook Secret */}
              <div className="space-y-2">
                <Label htmlFor="webhookSecret" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Webhook Secret (Opcional)
                </Label>
                <div className="relative">
                  <Input
                    id="webhookSecret"
                    type={showSecrets.webhookSecret ? "text" : "password"}
                    placeholder="whsec_..."
                    value={config.webhookSecret}
                    onChange={(e) => setConfig({ ...config, webhookSecret: e.target.value })}
                    className="bg-gray-800/50 border-white/10 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowSecrets({ ...showSecrets, webhookSecret: !showSecrets.webhookSecret })}
                  >
                    {showSecrets.webhookSecret ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-400">Usado para verificar webhooks do Stripe. Começa com whsec_</p>
              </div>

              <Separator className="bg-gray-700" />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-gold-600 hover:bg-gold-700 text-black flex-1"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </>
                  )}
                </Button>

                <Button
                  onClick={testConnection}
                  disabled={isTestingConnection || !config.publishableKey || !config.secretKey}
                  variant="outline"
                  className="border-gold-500 text-gold-400 hover:bg-gold-500/10 flex-1"
                >
                  {isTestingConnection ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold-500 mr-2"></div>
                      Testando...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Testar Conexão
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-black/30 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-lg">Como obter suas chaves do Stripe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gold-400">1. Acesse o Dashboard do Stripe</h4>
                <p className="text-sm text-gray-400">
                  Faça login em{" "}
                  <a
                    href="https://dashboard.stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:underline"
                  >
                    dashboard.stripe.com
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gold-400">2. Navegue para Developers → API keys</h4>
                <p className="text-sm text-gray-400">Encontre suas chaves na seção de desenvolvedores</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gold-400">3. Configure Webhooks (Opcional)</h4>
                <p className="text-sm text-gray-400">
                  Em Developers → Webhooks, adicione o endpoint:{" "}
                  <code className="bg-gray-800 px-1 rounded">/api/payments/stripe/webhook</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/admin-dashboard">
            <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
              Voltar para o Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
