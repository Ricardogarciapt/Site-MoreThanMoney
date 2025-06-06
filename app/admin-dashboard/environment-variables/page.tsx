"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Save, RefreshCw, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EnvironmentVariable {
  key: string
  value: string
  description: string
  category: string
  required: boolean
  isSecret: boolean
}

const environmentVariables: EnvironmentVariable[] = [
  // Analytics
  {
    key: "NEXT_PUBLIC_GA_ID",
    value: "",
    description: "Google Analytics Tracking ID",
    category: "analytics",
    required: false,
    isSecret: false,
  },

  // Payments
  {
    key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    value: "",
    description: "Stripe Publishable Key (público)",
    category: "payments",
    required: true,
    isSecret: false,
  },
  {
    key: "STRIPE_SECRET_KEY",
    value: "",
    description: "Stripe Secret Key (privado)",
    category: "payments",
    required: true,
    isSecret: true,
  },
  {
    key: "STRIPE_WEBHOOK_SECRET",
    value: "",
    description: "Stripe Webhook Secret",
    category: "payments",
    required: true,
    isSecret: true,
  },

  // Database
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    value: "",
    description: "URL do projeto Supabase",
    category: "database",
    required: true,
    isSecret: false,
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    value: "",
    description: "Chave anônima do Supabase",
    category: "database",
    required: true,
    isSecret: false,
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    value: "",
    description: "Chave de service role do Supabase",
    category: "database",
    required: true,
    isSecret: true,
  },

  // Integrations
  {
    key: "YOUTUBE_API_KEY",
    value: "",
    description: "Chave da API do YouTube",
    category: "integrations",
    required: false,
    isSecret: true,
  },
  {
    key: "NOTION_API_KEY",
    value: "",
    description: "Chave da API do Notion",
    category: "integrations",
    required: false,
    isSecret: true,
  },
  {
    key: "NOTION_DATABASE_ID",
    value: "",
    description: "ID da base de dados do Notion",
    category: "integrations",
    required: false,
    isSecret: false,
  },
  {
    key: "TELEGRAM_BOT_TOKEN",
    value: "",
    description: "Token do Bot do Telegram",
    category: "integrations",
    required: false,
    isSecret: true,
  },
  {
    key: "TELEGRAM_WEBHOOK_SECRET",
    value: "",
    description: "Secret do Webhook do Telegram",
    category: "integrations",
    required: false,
    isSecret: true,
  },

  // General
  {
    key: "NEXT_PUBLIC_BASE_URL",
    value: "",
    description: "URL base do site",
    category: "general",
    required: true,
    isSecret: false,
  },
  {
    key: "NEXTAUTH_SECRET",
    value: "",
    description: "Secret para NextAuth.js",
    category: "general",
    required: true,
    isSecret: true,
  },
  {
    key: "NEXTAUTH_URL",
    value: "",
    description: "URL para NextAuth.js",
    category: "general",
    required: true,
    isSecret: false,
  },
]

export default function EnvironmentVariablesPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [variables, setVariables] = useState<EnvironmentVariable[]>(environmentVariables)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("general")

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  // Carregar valores existentes das variáveis de ambiente
  useEffect(() => {
    const loadEnvironmentVariables = () => {
      const updatedVariables = variables.map((variable) => {
        // Tentar carregar do localStorage primeiro (para desenvolvimento)
        const storedValue = localStorage.getItem(`env_${variable.key}`)
        if (storedValue) {
          return { ...variable, value: storedValue }
        }

        // Para variáveis públicas, tentar carregar do process.env
        if (variable.key.startsWith("NEXT_PUBLIC_")) {
          const envValue = process.env[variable.key]
          if (envValue) {
            return { ...variable, value: envValue }
          }
        }

        return variable
      })

      setVariables(updatedVariables)
    }

    loadEnvironmentVariables()
  }, [])

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => prev.map((variable) => (variable.key === key ? { ...variable, value } : variable)))
  }

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Salvar no localStorage (para desenvolvimento)
      variables.forEach((variable) => {
        if (variable.value) {
          localStorage.setItem(`env_${variable.key}`, variable.value)
        } else {
          localStorage.removeItem(`env_${variable.key}`)
        }
      })

      // Em produção, você enviaria essas variáveis para o Supabase ou outro serviço
      // await saveEnvironmentVariables(variables)

      setSaveSuccess(true)
      toast({
        title: "Variáveis salvas",
        description: "As variáveis de ambiente foram salvas com sucesso.",
      })

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: `Erro ao salvar variáveis: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const generateEnvFile = () => {
    const envContent = variables
      .filter((variable) => variable.value)
      .map((variable) => `${variable.key}=${variable.value}`)
      .join("\n")

    const blob = new Blob([envContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = ".env.local"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Arquivo gerado",
      description: "O arquivo .env.local foi baixado com sucesso.",
    })
  }

  const getVariablesByCategory = (category: string) => {
    return variables.filter((variable) => variable.category === category)
  }

  const getRequiredMissingVariables = () => {
    return variables.filter((variable) => variable.required && !variable.value)
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  const missingRequired = getRequiredMissingVariables()

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Variáveis de Ambiente</h1>
          <p className="text-gray-500">Gerencie as configurações de ambiente do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateEnvFile} variant="outline">
            Baixar .env
          </Button>
          <Button onClick={() => router.push("/admin-dashboard")} variant="outline">
            Voltar ao Painel
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <Alert className="bg-green-500/10 border-green-500 mb-6">
          <Check className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-500">Variáveis de ambiente salvas com sucesso!</AlertDescription>
        </Alert>
      )}

      {missingRequired.length > 0 && (
        <Alert className="bg-red-500/10 border-red-500 mb-6">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-500">
            <strong>Atenção:</strong> {missingRequired.length} variáveis obrigatórias não estão configuradas:
            <ul className="list-disc list-inside mt-2">
              {missingRequired.map((variable) => (
                <li key={variable.key}>
                  {variable.key} - {variable.description}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="database">Base de Dados</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {["general", "database", "payments", "integrations", "analytics"].map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{category === "analytics" ? "Analytics" : category}</CardTitle>
                <CardDescription>
                  Configure as variáveis de ambiente para{" "}
                  {category === "general"
                    ? "configurações gerais"
                    : category === "database"
                      ? "base de dados"
                      : category === "payments"
                        ? "pagamentos"
                        : category === "integrations"
                          ? "integrações"
                          : "analytics"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getVariablesByCategory(category).map((variable) => (
                    <div key={variable.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={variable.key} className="flex items-center gap-2">
                          {variable.key}
                          {variable.required && <span className="text-red-500">*</span>}
                          {variable.isSecret && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">SECRET</span>
                          )}
                        </Label>
                        {variable.isSecret && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSecretVisibility(variable.key)}
                          >
                            {showSecrets[variable.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        )}
                      </div>
                      <Input
                        id={variable.key}
                        type={variable.isSecret && !showSecrets[variable.key] ? "password" : "text"}
                        value={variable.value}
                        onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                        placeholder={variable.description}
                      />
                      <p className="text-sm text-gray-500">{variable.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Variáveis
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
