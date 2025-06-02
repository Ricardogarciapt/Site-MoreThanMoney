"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function PaymentSettingsPage() {
  const [isTestMode, setIsTestMode] = useState(true)
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [showWebhookSecret, setShowWebhookSecret] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected" | "error">(
    "disconnected",
  )

  const [settings, setSettings] = useState({
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    testPublishableKey: "",
    testSecretKey: "",
    testWebhookSecret: "",
  })

  const validateStripeKey = (key: string, type: "publishable" | "secret" | "webhook") => {
    if (!key) return false

    switch (type) {
      case "publishable":
        return key.startsWith("pk_")
      case "secret":
        return key.startsWith("sk_")
      case "webhook":
        return key.startsWith("whsec_")
      default:
        return false
    }
  }

  const testConnection = async () => {
    setConnectionStatus("connecting")

    try {
      // Simular teste de conexão
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const currentSecretKey = isTestMode ? settings.testSecretKey : settings.secretKey

      if (validateStripeKey(currentSecretKey, "secret")) {
        setConnectionStatus("connected")
      } else {
        setConnectionStatus("error")
      }
    } catch (error) {
      setConnectionStatus("error")
    }
  }

  const saveSettings = async () => {
    // Aqui você salvaria as configurações no banco de dados
    console.log("Saving settings:", settings)
    alert("Configurações salvas com sucesso!")
  }

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Conectado
          </Badge>
        )
      case "connecting":
        return <Badge className="bg-yellow-500 text-white animate-pulse">Testando...</Badge>
      case "error":
        return (
          <Badge className="bg-red-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Erro
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconectado</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin-dashboard">
            <Button variant="outline" size="sm" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Configurações de Pagamento
            </h1>
            <p className="text-gray-400 mt-1">Configure as chaves do Stripe para processar pagamentos</p>
          </div>
        </div>

        <div className="grid gap-6 max-w-4xl">
          {/* Status Card */}
          <Card className="bg-black/50 border-gold-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gold-400">Status da Conexão</CardTitle>
                  <CardDescription>Estado atual da integração com o Stripe</CardDescription>
                </div>
                {getStatusBadge()}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button onClick={testConnection} disabled={connectionStatus === "connecting"}>
                  {connectionStatus === "connecting" ? "Testando..." : "Testar Conexão"}
                </Button>
                <div className="text-sm text-gray-400">
                  Modo: <span className="text-gold-400">{isTestMode ? "Teste" : "Produção"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Toggle */}
          <Card className="bg-black/50 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-400">Ambiente</CardTitle>
              <CardDescription>Alternar entre modo de teste e produção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch id="test-mode" checked={isTestMode} onCheckedChange={setIsTestMode} />
                <Label htmlFor="test-mode" className="text-white">
                  {isTestMode ? "Modo de Teste" : "Modo de Produção"}
                </Label>
              </div>
              {!isTestMode && (
                <Alert className="mt-4 border-red-500/50 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-400">
                    Cuidado! Você está no modo de produção. Transações reais serão processadas.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Stripe Configuration */}
          <Card className="bg-black/50 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-400">
                Configurações do Stripe - {isTestMode ? "Teste" : "Produção"}
              </CardTitle>
              <CardDescription>
                Configure suas chaves do Stripe para {isTestMode ? "teste" : "produção"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Publishable Key */}
              <div className="space-y-2">
                <Label htmlFor="publishable-key" className="text-white">
                  Chave Pública (Publishable Key)
                </Label>
                <Input
                  id="publishable-key"
                  type="text"
                  placeholder={`pk_${isTestMode ? "test" : "live"}_...`}
                  value={isTestMode ? settings.testPublishableKey : settings.publishableKey}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      [isTestMode ? "testPublishableKey" : "publishableKey"]: e.target.value,
                    }))
                  }
                  className="bg-black/30 border-gold-500/30 text-white"
                />
                <p className="text-xs text-gray-400">Esta chave é segura para uso no frontend</p>
              </div>

              {/* Secret Key */}
              <div className="space-y-2">
                <Label htmlFor="secret-key" className="text-white">
                  Chave Secreta (Secret Key)
                </Label>
                <div className="relative">
                  <Input
                    id="secret-key"
                    type={showSecretKey ? "text" : "password"}
                    placeholder={`sk_${isTestMode ? "test" : "live"}_...`}
                    value={isTestMode ? settings.testSecretKey : settings.secretKey}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [isTestMode ? "testSecretKey" : "secretKey"]: e.target.value,
                      }))
                    }
                    className="bg-black/30 border-gold-500/30 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                  >
                    {showSecretKey ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-red-400">⚠️ Mantenha esta chave segura! Nunca a compartilhe publicamente.</p>
              </div>

              {/* Webhook Secret */}
              <div className="space-y-2">
                <Label htmlFor="webhook-secret" className="text-white">
                  Webhook Secret
                </Label>
                <div className="relative">
                  <Input
                    id="webhook-secret"
                    type={showWebhookSecret ? "text" : "password"}
                    placeholder="whsec_..."
                    value={isTestMode ? settings.testWebhookSecret : settings.webhookSecret}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [isTestMode ? "testWebhookSecret" : "webhookSecret"]: e.target.value,
                      }))
                    }
                    className="bg-black/30 border-gold-500/30 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                  >
                    {showWebhookSecret ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-400">Usado para verificar a autenticidade dos webhooks do Stripe</p>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <Button
                  onClick={saveSettings}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
                >
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-black/50 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-400">Como obter as chaves do Stripe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-300">
              <div>
                <strong className="text-white">1. Acesse o Dashboard do Stripe:</strong>
                <p>
                  Vá para{" "}
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
              <div>
                <strong className="text-white">2. Navegue para Developers → API keys:</strong>
                <p>Encontre suas chaves públicas e secretas</p>
              </div>
              <div>
                <strong className="text-white">3. Configure Webhooks:</strong>
                <p>
                  Em Developers → Webhooks, adicione o endpoint:{" "}
                  <code className="bg-gray-800 px-1 rounded">https://seudominio.com/api/payments/stripe/webhook</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
