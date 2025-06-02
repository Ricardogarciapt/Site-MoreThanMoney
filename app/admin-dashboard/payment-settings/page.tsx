"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Save, RefreshCw, CreditCard, AlertTriangle, Eye, EyeOff } from "lucide-react"

interface StripeConfig {
  publishableKey: string
  secretKey: string
  webhookSecret: string
  enabled: boolean
  testMode: boolean
}

export default function PaymentSettingsPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showSecrets, setShowSecrets] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "error" | "not-configured">(
    "checking",
  )

  const [stripeConfig, setStripeConfig] = useState<StripeConfig>({
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    enabled: true,
    testMode: true,
  })

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  // Carregar configurações existentes
  useEffect(() => {
    loadStripeConfig()
    checkStripeConnection()
  }, [])

  const loadStripeConfig = () => {
    // Carregar do localStorage ou API
    const saved = localStorage.getItem("stripe-config")
    if (saved) {
      try {
        const config = JSON.parse(saved)
        setStripeConfig(config)
      } catch (error) {
        console.error("Erro ao carregar configuração:", error)
      }
    }
  }

  const checkStripeConnection = async () => {
    try {
      const response = await fetch("/api/payments/stripe/create-session")
      if (response.status === 200) {
        setConnectionStatus("connected")
      } else if (response.status === 503) {
        setConnectionStatus("not-configured")
      } else {
        setConnectionStatus("error")
      }
    } catch (error) {
      setConnectionStatus("error")
    }
  }

  const handleSaveConfig = async () => {
    setIsSaving(true)

    try {
      // Validar chaves
      if (!stripeConfig.publishableKey.startsWith("pk_")) {
        throw new Error('Chave pública deve começar com "pk_"')
      }

      if (!stripeConfig.secretKey.startsWith("sk_")) {
        throw new Error('Chave secreta deve começar com "sk_"')
      }

      if (!stripeConfig.webhookSecret.startsWith("whsec_")) {
        throw new Error('Webhook secret deve começar com "whsec_"')
      }

      // Salvar no localStorage (em produção, salvar no banco de dados)
      localStorage.setItem("stripe-config", JSON.stringify(stripeConfig))

      // Atualizar variáveis de ambiente (simulado)
      if (typeof window !== "undefined") {
        // Em produção, isso seria uma chamada para API que atualiza as env vars
        console.log("Configurações do Stripe salvas:", {
          ...stripeConfig,
          secretKey: "***",
          webhookSecret: "***",
        })
      }

      setSaveSuccess(true)
      toast({
        title: "Configurações salvas",
        description: "As configurações do Stripe foram salvas com sucesso.",
      })

      // Verificar conexão novamente
      setTimeout(() => {
        checkStripeConnection()
        setSaveSuccess(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const testStripeConnection = async () => {
    try {
      const response = await fetch("/api/payments/stripe/create-session", {
        method: "GET",
      })

      const result = await response.json()

      if (result.stripe_configured) {
        toast({
          title: "Conexão bem-sucedida",
          description: "Stripe está configurado e funcionando.",
        })
        setConnectionStatus("connected")
      } else {
        toast({
          title: "Stripe não configurado",
          description: "Verifique as chaves de API.",
          variant: "destructive",
        })
        setConnectionStatus("not-configured")
      }
    } catch (error) {
      toast({
        title: "Erro na conexão",
        description: "Não foi possível conectar ao Stripe.",
        variant: "destructive",
      })
      setConnectionStatus("error")
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-500"
      case "error":
        return "text-red-500"
      case "not-configured":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Conectado"
      case "error":
        return "Erro de conexão"
      case "not-configured":
        return "Não configurado"
      case "checking":
        return "Verificando..."
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Configurações de Pagamento
          </h1>
          <p className="text-gray-400">Configure as integrações de pagamento do sistema</p>
        </div>
        <Button onClick={() => router.push("/admin-dashboard")} variant="outline">
          Voltar ao Painel
        </Button>
      </div>

      {/* Status da Conexão */}
      <Card className="mb-6 bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Status da Conexão Stripe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${connectionStatus === "connected" ? "bg-green-500 animate-pulse" : connectionStatus === "error" ? "bg-red-500" : "bg-yellow-500"}`}
              />
              <span className={getStatusColor()}>{getStatusText()}</span>
            </div>
            <Button onClick={testStripeConnection} variant="outline" size="sm">
              Testar Conexão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configurações do Stripe */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle>Configurações do Stripe</CardTitle>
          <CardDescription>Configure as chaves de API do Stripe para processar pagamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {saveSuccess && (
              <Alert className="bg-green-500/10 border-green-500">
                <Check className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-500">Configurações salvas com sucesso!</AlertDescription>
              </Alert>
            )}

            {/* Modo de Teste */}
            <div className="flex items-center space-x-2">
              <Switch
                id="test-mode"
                checked={stripeConfig.testMode}
                onCheckedChange={(checked) => setStripeConfig({ ...stripeConfig, testMode: checked })}
              />
              <Label htmlFor="test-mode">Modo de Teste</Label>
              <span className="text-sm text-gray-400">(Use chaves de teste para desenvolvimento)</span>
            </div>

            {/* Ativar Stripe */}
            <div className="flex items-center space-x-2">
              <Switch
                id="stripe-enabled"
                checked={stripeConfig.enabled}
                onCheckedChange={(checked) => setStripeConfig({ ...stripeConfig, enabled: checked })}
              />
              <Label htmlFor="stripe-enabled">Ativar Pagamentos Stripe</Label>
            </div>

            {/* Chave Pública */}
            <div className="space-y-2">
              <Label htmlFor="publishable-key">Chave Pública (Publishable Key)</Label>
              <Input
                id="publishable-key"
                placeholder={stripeConfig.testMode ? "pk_test_..." : "pk_live_..."}
                value={stripeConfig.publishableKey}
                onChange={(e) => setStripeConfig({ ...stripeConfig, publishableKey: e.target.value })}
              />
              <p className="text-sm text-gray-400">
                Esta chave é segura para usar no frontend.{" "}
                {stripeConfig.testMode ? "Use uma chave de teste." : "Use uma chave de produção."}
              </p>
            </div>

            {/* Chave Secreta */}
            <div className="space-y-2">
              <Label htmlFor="secret-key">Chave Secreta (Secret Key)</Label>
              <div className="relative">
                <Input
                  id="secret-key"
                  type={showSecrets ? "text" : "password"}
                  placeholder={stripeConfig.testMode ? "sk_test_..." : "sk_live_..."}
                  value={stripeConfig.secretKey}
                  onChange={(e) => setStripeConfig({ ...stripeConfig, secretKey: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                Esta chave deve ser mantida em segredo. Nunca a compartilhe publicamente.
              </p>
            </div>

            {/* Webhook Secret */}
            <div className="space-y-2">
              <Label htmlFor="webhook-secret">Webhook Secret</Label>
              <div className="relative">
                <Input
                  id="webhook-secret"
                  type={showSecrets ? "text" : "password"}
                  placeholder="whsec_..."
                  value={stripeConfig.webhookSecret}
                  onChange={(e) => setStripeConfig({ ...stripeConfig, webhookSecret: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                Usado para verificar webhooks do Stripe. Configure o endpoint:{" "}
                <code className="bg-gray-800 px-1 rounded">/api/payments/stripe/webhook</code>
              </p>
            </div>

            {/* Aviso de Segurança */}
            <Alert className="bg-yellow-500/10 border-yellow-500">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-400">
                <strong>Importante:</strong> Em produção, estas chaves devem ser armazenadas como variáveis de ambiente
                seguras, não no localStorage. Esta interface é apenas para desenvolvimento/teste.
              </AlertDescription>
            </Alert>

            {/* Botão Salvar */}
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveConfig} disabled={isSaving} className="bg-yellow-600 hover:bg-yellow-700">
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
