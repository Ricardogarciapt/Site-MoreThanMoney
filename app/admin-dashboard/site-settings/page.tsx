"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Settings, Palette, Code, Globe } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SiteSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    siteName: "MoreThanMoney",
    siteDescription: "Plataforma de Trading e Educação Financeira",
    primaryColor: "#f9b208",
    secondaryColor: "#1a1a1a",
    enableRegistration: true,
    enablePayments: true,
    maintenanceMode: false,
    tradingViewCode: "",
    customCSS: "",
    footerText: "© 2024 MoreThanMoney. Todos os direitos reservados.",
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Salvar no localStorage
      localStorage.setItem("siteSettings", JSON.stringify(settings))

      toast({
        title: "Configurações salvas",
        description: "As configurações do site foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar as configurações.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Carregar configurações salvas
    const savedSettings = localStorage.getItem("siteSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <Card className="max-w-6xl mx-auto bg-black/50 border-gray-800/50 backdrop-blur-xl">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-gold-500" />
              <div>
                <CardTitle className="text-xl text-white">Configurações do Site</CardTitle>
                <CardDescription className="text-gray-400">
                  Personalize a aparência e funcionalidades da plataforma
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
              onClick={() => router.push("/admin-dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="general" className="data-[state=active]:bg-gold-500/20">
                <Globe className="h-4 w-4 mr-2" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-gold-500/20">
                <Palette className="h-4 w-4 mr-2" />
                Aparência
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-gold-500/20">
                <Settings className="h-4 w-4 mr-2" />
                Funcionalidades
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-gold-500/20">
                <Code className="h-4 w-4 mr-2" />
                Avançado
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName" className="text-white">
                    Nome do Site
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerText" className="text-white">
                    Texto do Rodapé
                  </Label>
                  <Input
                    id="footerText"
                    value={settings.footerText}
                    onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription" className="text-white">
                  Descrição do Site
                </Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-white">
                    Cor Primária
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-16 h-10 bg-gray-800/50 border-gray-700"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-white">
                    Cor Secundária
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="w-16 h-10 bg-gray-800/50 border-gray-700"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customCSS" className="text-white">
                  CSS Personalizado
                </Label>
                <Textarea
                  id="customCSS"
                  value={settings.customCSS}
                  onChange={(e) => setSettings({ ...settings, customCSS: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white font-mono"
                  rows={6}
                  placeholder="/* Adicione seu CSS personalizado aqui */"
                />
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Registro de Usuários</h3>
                    <p className="text-gray-400 text-sm">Permitir que novos usuários se registrem na plataforma</p>
                  </div>
                  <Switch
                    checked={settings.enableRegistration}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Sistema de Pagamentos</h3>
                    <p className="text-gray-400 text-sm">Habilitar funcionalidades de pagamento e assinaturas</p>
                  </div>
                  <Switch
                    checked={settings.enablePayments}
                    onCheckedChange={(checked) => setSettings({ ...settings, enablePayments: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Modo Manutenção</h3>
                    <p className="text-gray-400 text-sm">Ativar página de manutenção para todos os usuários</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tradingViewCode" className="text-white">
                  Código TradingView Personalizado
                </Label>
                <Textarea
                  id="tradingViewCode"
                  value={settings.tradingViewCode}
                  onChange={(e) => setSettings({ ...settings, tradingViewCode: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white font-mono"
                  rows={8}
                  placeholder="// Adicione seu código JavaScript personalizado para TradingView aqui"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6 border-t border-gray-800">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
