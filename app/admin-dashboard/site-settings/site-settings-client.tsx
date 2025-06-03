"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Settings, Save, Palette, Globe, Shield } from "lucide-react"

export default function SiteSettingsClient() {
  const [settings, setSettings] = useState({
    siteName: "MoreThanMoney",
    siteDescription: "Plataforma de Trading e Educação Financeira",
    primaryColor: "#f9b208",
    secondaryColor: "#000000",
    enableRegistration: true,
    enableTelegram: true,
    enablePayments: true,
    maintenanceMode: false,
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("siteSettings", JSON.stringify(settings))
    setSaving(false)
    alert("Configurações salvas com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Settings className="mr-3 text-gold-400" />
            Configurações do Site
          </h1>
          <p className="text-gray-400">Personalize a aparência e funcionalidades da plataforma</p>
        </div>

        <div className="grid gap-6">
          {/* Configurações Gerais */}
          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="mr-2 text-blue-400" />
                Configurações Gerais
              </CardTitle>
              <CardDescription className="text-gray-400">Informações básicas do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName" className="text-gray-300">
                  Nome do Site
                </Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="siteDescription" className="text-gray-300">
                  Descrição do Site
                </Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Aparência */}
          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="mr-2 text-purple-400" />
                Aparência
              </CardTitle>
              <CardDescription className="text-gray-400">Cores e tema da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor" className="text-gray-300">
                    Cor Primária
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-16 h-10 bg-gray-800 border-gray-700"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor" className="text-gray-300">
                    Cor Secundária
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="w-16 h-10 bg-gray-800 border-gray-700"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Funcionalidades */}
          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 text-green-400" />
                Funcionalidades
              </CardTitle>
              <CardDescription className="text-gray-400">Ativar/desativar recursos da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Permitir Registros</Label>
                  <p className="text-sm text-gray-500">Permitir que novos usuários se registrem</p>
                </div>
                <Switch
                  checked={settings.enableRegistration}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Integração Telegram</Label>
                  <p className="text-sm text-gray-500">Ativar funcionalidades do Telegram</p>
                </div>
                <Switch
                  checked={settings.enableTelegram}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableTelegram: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Sistema de Pagamentos</Label>
                  <p className="text-sm text-gray-500">Ativar Stripe e outros gateways</p>
                </div>
                <Switch
                  checked={settings.enablePayments}
                  onCheckedChange={(checked) => setSettings({ ...settings, enablePayments: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Modo Manutenção</Label>
                  <p className="text-sm text-gray-500">Desativar o site para manutenção</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
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
      </div>
    </div>
  )
}
