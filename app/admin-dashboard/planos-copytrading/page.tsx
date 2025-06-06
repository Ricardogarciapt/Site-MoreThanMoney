"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { TrendingUp, Edit, Trash2, Plus, Save, Eye, EyeOff, ExternalLink, BarChart3 } from "lucide-react"

interface CopyTradingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  lifetimePrice?: number
  features: string[]
  redirectUrl: string
  isActive: boolean
  planType: "basic" | "premium" | "ai"
  riskLevel: "low" | "medium" | "high"
  expectedReturn: string
  createdAt: string
  updatedAt: string
  subscribers: number
  conversionRate: number
}

export default function PlanosCopyTradingPage() {
  const [plans, setPlans] = useState<CopyTradingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPlan, setEditingPlan] = useState<CopyTradingPlan | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Dados mock para demonstração
  useEffect(() => {
    const mockPlans: CopyTradingPlan[] = [
      {
        id: "1",
        name: "Plano Básico",
        description: "Ideal para iniciantes que querem começar no copytrading com baixo risco.",
        monthlyPrice: 97,
        features: [
          "10% de lucro mensal esperado",
          "Risco baixo",
          "Suporte por email",
          "Relatórios mensais",
          "Acesso a 3 traders",
        ],
        redirectUrl: "/checkout?plan=basic",
        isActive: true,
        planType: "basic",
        riskLevel: "low",
        expectedReturn: "10%",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        subscribers: 156,
        conversionRate: 12.5,
      },
      {
        id: "2",
        name: "Plano Premium",
        description: "Para traders experientes que buscam maiores retornos com risco controlado.",
        monthlyPrice: 197,
        features: [
          "30% de lucro mensal esperado",
          "Risco médio-alto",
          "Suporte prioritário 24/7",
          "Relatórios semanais",
          "Acesso a 10 traders premium",
          "Análises exclusivas",
        ],
        redirectUrl: "/checkout?plan=premium",
        isActive: true,
        planType: "premium",
        riskLevel: "high",
        expectedReturn: "30%",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-18",
        subscribers: 89,
        conversionRate: 18.3,
      },
      {
        id: "3",
        name: "The Ultimate AI",
        description: "Sistema 100% automático com IA avançada para máximos retornos.",
        monthlyPrice: 49,
        lifetimePrice: 99,
        features: [
          "Sistema 100% automático",
          "Triplica/Quadriplica conta em 2-3 meses",
          "Funcionamento 24/7",
          "Risco médio-alto",
          "Aulas de instalação",
          "Módulo bônus de mentalidade",
          "Sem fidelização",
        ],
        redirectUrl: "https://theinfinityshift.co/",
        isActive: true,
        planType: "ai",
        riskLevel: "high",
        expectedReturn: "300-400%",
        createdAt: "2024-01-25",
        updatedAt: "2024-01-25",
        subscribers: 234,
        conversionRate: 25.7,
      },
    ]

    setTimeout(() => {
      setPlans(mockPlans)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSavePlan = (plan: CopyTradingPlan) => {
    if (editingPlan) {
      // Atualizar plano existente
      setPlans((prev) =>
        prev.map((p) => (p.id === plan.id ? { ...plan, updatedAt: new Date().toISOString().split("T")[0] } : p)),
      )
      toast({
        title: "Plano atualizado",
        description: "O plano foi atualizado com sucesso.",
      })
    } else {
      // Criar novo plano
      const newPlan = {
        ...plan,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        subscribers: 0,
        conversionRate: 0,
      }
      setPlans((prev) => [...prev, newPlan])
      toast({
        title: "Plano criado",
        description: "O novo plano foi criado com sucesso.",
      })
    }
    setIsDialogOpen(false)
    setEditingPlan(null)
  }

  const handleDeletePlan = (planId: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== planId))
    toast({
      title: "Plano removido",
      description: "O plano foi removido com sucesso.",
    })
  }

  const togglePlanStatus = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString().split("T")[0] } : p,
      ),
    )
  }

  const getPlanTypeColor = (type: string) => {
    switch (type) {
      case "basic":
        return "bg-blue-500"
      case "premium":
        return "bg-purple-500"
      case "ai":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Gestão de Planos CopyTrading</h1>
            <p className="text-gray-400 mt-2">Gerir e configurar todos os planos de copytrading</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingPlan(null)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <PlanDialog plan={editingPlan} onSave={handleSavePlan} onClose={() => setIsDialogOpen(false)} />
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-gray-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Planos
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total de Planos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{plans.length}</div>
                  <p className="text-xs text-gray-400">{plans.filter((p) => p.isActive).length} ativos</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Subscritores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {plans.reduce((acc, plan) => acc + plan.subscribers, 0)}
                  </div>
                  <p className="text-xs text-green-400">+12% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Taxa de Conversão Média</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {(plans.reduce((acc, plan) => acc + plan.conversionRate, 0) / plans.length).toFixed(1)}%
                  </div>
                  <p className="text-xs text-green-400">+2.3% vs mês anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Receita Mensal Est.</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    €{plans.reduce((acc, plan) => acc + plan.subscribers * plan.monthlyPrice, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-green-400">+18% este mês</p>
                </CardContent>
              </Card>
            </div>

            {/* Planos em Destaque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{plan.name}</CardTitle>
                        <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                      </div>
                      <Badge className={`${getPlanTypeColor(plan.planType)} text-white`}>
                        {plan.planType.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Preço Mensal:</span>
                      <span className="text-white font-bold">€{plan.monthlyPrice}</span>
                    </div>
                    {plan.lifetimePrice && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Preço Lifetime:</span>
                        <span className="text-white font-bold">€{plan.lifetimePrice}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Subscritores:</span>
                      <span className="text-white">{plan.subscribers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Conversão:</span>
                      <span className="text-white">{plan.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Risco:</span>
                      <span className={getRiskLevelColor(plan.riskLevel)}>{plan.riskLevel.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Status:</span>
                      <Badge variant={plan.isActive ? "default" : "secondary"}>
                        {plan.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-white">{plan.name}</CardTitle>
                          <Badge className={`${getPlanTypeColor(plan.planType)} text-white`}>
                            {plan.planType.toUpperCase()}
                          </Badge>
                          <Badge variant={plan.isActive ? "default" : "secondary"}>
                            {plan.isActive ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPlan(plan)
                            setIsDialogOpen(true)
                          }}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePlanStatus(plan.id)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {plan.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePlan(plan.id)}
                          className="border-red-600 text-red-400 hover:bg-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-gray-400">Preços</Label>
                        <div className="text-white">
                          <div>Mensal: €{plan.monthlyPrice}</div>
                          {plan.lifetimePrice && <div>Lifetime: €{plan.lifetimePrice}</div>}
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400">Performance</Label>
                        <div className="text-white">
                          <div>Subscritores: {plan.subscribers}</div>
                          <div>Conversão: {plan.conversionRate}%</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400">Características</Label>
                        <div className="text-white">
                          <div>Retorno: {plan.expectedReturn}</div>
                          <div className={getRiskLevelColor(plan.riskLevel)}>Risco: {plan.riskLevel.toUpperCase()}</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400">URL de Redirecionamento</Label>
                        <div className="text-white flex items-center gap-2">
                          <span className="truncate max-w-32">{plan.redirectUrl}</span>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label className="text-gray-400">Funcionalidades</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {plan.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance por Plano</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div key={plan.id} className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">{plan.name}</div>
                          <div className="text-gray-400 text-sm">{plan.subscribers} subscritores</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">{plan.conversionRate}%</div>
                          <div className="text-gray-400 text-sm">conversão</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Receita por Plano</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div key={plan.id} className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">{plan.name}</div>
                          <div className="text-gray-400 text-sm">€{plan.monthlyPrice}/mês</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">€{(plan.subscribers * plan.monthlyPrice).toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">mensal</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Componente do Dialog para editar/criar planos
function PlanDialog({
  plan,
  onSave,
  onClose,
}: {
  plan: CopyTradingPlan | null
  onSave: (plan: CopyTradingPlan) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState<Partial<CopyTradingPlan>>({
    name: "",
    description: "",
    monthlyPrice: 0,
    lifetimePrice: undefined,
    features: [],
    redirectUrl: "",
    isActive: true,
    planType: "basic",
    riskLevel: "low",
    expectedReturn: "",
    ...plan,
  })

  const [newFeature, setNewFeature] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.description && formData.monthlyPrice && formData.redirectUrl) {
      onSave(formData as CopyTradingPlan)
    }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || [],
    }))
  }

  return (
    <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-white">{plan ? "Editar Plano" : "Criar Novo Plano"}</DialogTitle>
        <DialogDescription className="text-gray-400">Configure os detalhes do plano de copytrading.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Nome do Plano
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="planType" className="text-gray-300">
              Tipo de Plano
            </Label>
            <Select
              value={formData.planType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, planType: value as any }))}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="basic">Básico</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-300">
            Descrição
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="bg-gray-700 border-gray-600 text-white"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyPrice" className="text-gray-300">
              Preço Mensal (€)
            </Label>
            <Input
              id="monthlyPrice"
              type="number"
              value={formData.monthlyPrice}
              onChange={(e) => setFormData((prev) => ({ ...prev, monthlyPrice: Number(e.target.value) }))}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lifetimePrice" className="text-gray-300">
              Preço Lifetime (€)
            </Label>
            <Input
              id="lifetimePrice"
              type="number"
              value={formData.lifetimePrice || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lifetimePrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedReturn" className="text-gray-300">
              Retorno Esperado
            </Label>
            <Input
              id="expectedReturn"
              value={formData.expectedReturn}
              onChange={(e) => setFormData((prev) => ({ ...prev, expectedReturn: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="ex: 10%, 300-400%"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="riskLevel" className="text-gray-300">
            Nível de Risco
          </Label>
          <Select
            value={formData.riskLevel}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, riskLevel: value as any }))}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="low">Baixo</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="high">Alto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="redirectUrl" className="text-gray-300">
            URL de Redirecionamento
          </Label>
          <Input
            id="redirectUrl"
            value={formData.redirectUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, redirectUrl: e.target.value }))}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="https://..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Funcionalidades</Label>
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Adicionar funcionalidade..."
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
            />
            <Button type="button" onClick={addFeature} variant="outline" className="border-gray-600">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.features?.map((feature, index) => (
              <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
          />
          <Label htmlFor="isActive" className="text-gray-300">
            Plano Ativo
          </Label>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {plan ? "Atualizar" : "Criar"} Plano
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
