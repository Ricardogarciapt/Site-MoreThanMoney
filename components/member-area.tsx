"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { CopytradingSetup } from "@/components/copytrading-setup"

export function MemberArea() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    const tabParam = searchParams.get("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }

    const planParam = searchParams.get("plan")
    if (planParam) {
      setSelectedPlan(planParam)
    }
  }, [isAuthenticated, router, searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Área do Membro</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="copytrading">Copytrading</TabsTrigger>
          <TabsTrigger value="education">Educação</TabsTrigger>
          <TabsTrigger value="account">Minha Conta</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo, {user?.name || "Membro"}</CardTitle>
                <CardDescription>Resumo da sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Último acesso: {new Date().toLocaleDateString()}</p>
                <p>Status da assinatura: Ativo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Copytrading</CardTitle>
                <CardDescription>Status das suas operações</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Operações copiadas: 0</p>
                <p>Rentabilidade: 0%</p>
                <button
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  onClick={() => setActiveTab("copytrading")}
                >
                  Configurar Copytrading
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Educação</CardTitle>
                <CardDescription>Seu progresso nos cursos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cursos em andamento: 0</p>
                <p>Cursos concluídos: 0</p>
                <button
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  onClick={() => setActiveTab("education")}
                >
                  Acessar Cursos
                </button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="copytrading">
          <CopytradingSetup initialPlan={selectedPlan} />
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Educação Financeira</CardTitle>
              <CardDescription>Acesse nossos cursos e materiais educativos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Em breve, você terá acesso a cursos exclusivos sobre trading, investimentos e educação financeira.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Curso {i}</h3>
                    <p className="text-sm text-gray-400">Em breve</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Minha Conta</CardTitle>
              <CardDescription>Gerencie suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Nome</h3>
                  <p>{user?.name || "Nome não disponível"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p>{user?.email || "Email não disponível"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Plano Atual</h3>
                  <p>Plano Básico</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Data de Registro</h3>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                  Atualizar Informações
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
