"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MemberCopytradingSetup from "@/components/member-copytrading-setup"

export default function MemberAreaPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Área do Membro</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/50 border border-gold-500/30">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="copytrading" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Copytrading
            </TabsTrigger>
            <TabsTrigger value="scanner" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Scanner
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Perfil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Visão geral da sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-black/50 border-gold-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Plano Atual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gold-500">Premium</div>
                      <p className="text-gray-400">Válido até 15/06/2023</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 border-gold-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Copytrading</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gold-500">3 Traders</div>
                      <p className="text-gray-400">Conectado com XM</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 border-gold-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Scanner</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gold-500">12 Alertas</div>
                      <p className="text-gray-400">Nas últimas 24h</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Atividade Recente</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Operação Copiada</h4>
                            <p className="text-sm text-gray-400">Compra de EURUSD</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-500">+0.87%</p>
                            <p className="text-sm text-gray-400">Hoje, 14:32</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Alerta do Scanner</h4>
                            <p className="text-sm text-gray-400">BTCUSD - Cruzamento de Médias</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Ontem, 19:45</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Operação Copiada</h4>
                            <p className="text-sm text-gray-400">Venda de GBPUSD</p>
                          </div>
                          <div className="text-right">
                            <p className="text-red-500">-0.32%</p>
                            <p className="text-sm text-gray-400">Ontem, 11:20</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="copytrading">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Configuração de Copytrading</CardTitle>
                <CardDescription>Configure sua conta para copiar operações dos traders profissionais</CardDescription>
              </CardHeader>
              <CardContent>
                <MemberCopytradingSetup />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scanner">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Scanner MTM</CardTitle>
                <CardDescription>Acesse o scanner de oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo do Scanner será exibido aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-black/50 border-gold-500/30">
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Gerencie suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo do Perfil será exibido aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
