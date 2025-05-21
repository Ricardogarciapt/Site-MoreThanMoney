"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertCircle, User, Lock, Bell, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jifuId: "",
    jifuAffiliateLink: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [error, setError] = useState("")

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  // Preencher dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        jifuId: user.jifuId || "",
        jifuAffiliateLink: user.jifuAffiliateLink || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")
    setSaveMessage("")

    // Simulação de salvamento - em produção seria uma API
    setTimeout(() => {
      setSaveMessage("Informações da conta atualizadas com sucesso!")
      setIsSaving(false)

      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setSaveMessage("")
      }, 3000)
    }, 1000)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")
    setSaveMessage("")

    // Validação de senha
    if (formData.newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.")
      setIsSaving(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("As senhas não coincidem.")
      setIsSaving(false)
      return
    }

    // Simulação de salvamento - em produção seria uma API
    setTimeout(() => {
      setSaveMessage("Senha alterada com sucesso!")
      setIsSaving(false)
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))

      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setSaveMessage("")
      }, 3000)
    }, 1000)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col items-center py-4">
                  <div className="h-20 w-20 rounded-full bg-gold-500/20 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-gold-500" />
                  </div>
                  <h3 className="text-xl font-bold">{user?.name}</h3>
                  <p className="text-sm text-gray-400">{user?.email || user?.username}</p>
                  {user?.role && (
                    <span className="mt-2 text-xs px-2 py-1 rounded-full bg-gold-500/20 text-gold-400">
                      {user.role}
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "account" ? "bg-gold-500/10 text-gold-400" : "text-gray-300 hover:bg-gold-500/5 hover:text-gold-400"}`}
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Conta
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "security" ? "bg-gold-500/10 text-gold-400" : "text-gray-300 hover:bg-gold-500/5 hover:text-gold-400"}`}
                    onClick={() => setActiveTab("security")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Segurança
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "notifications" ? "bg-gold-500/10 text-gold-400" : "text-gray-300 hover:bg-gold-500/5 hover:text-gold-400"}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notificações
                  </Button>
                  {isAdmin && (
                    <Link href="/admin">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:bg-gold-500/5 hover:text-gold-400"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Painel Admin
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="hidden md:block">
              <Link href="/member-area">
                <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                  Voltar para Área de Membro
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {saveMessage && (
              <div className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-md flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-400">{saveMessage}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-400">{error}</span>
              </div>
            )}

            {activeTab === "account" && (
              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Informações da Conta</CardTitle>
                  <CardDescription>Atualize suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveAccount} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone/WhatsApp</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jifuId">ID da JIFU</Label>
                      <Input
                        id="jifuId"
                        name="jifuId"
                        value={formData.jifuId || ""}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="Seu ID na plataforma JIFU"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jifuAffiliateLink">Link de Afiliado JIFU</Label>
                      <Input
                        id="jifuAffiliateLink"
                        name="jifuAffiliateLink"
                        value={formData.jifuAffiliateLink || ""}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                        placeholder="seunome.jifu.com"
                      />
                      <p className="text-xs text-gray-400">Formato: seunome.jifu.com (sem https://)</p>
                    </div>

                    {formData.jifuAffiliateLink && (
                      <div className="mt-2 p-3 bg-gold-500/10 border border-gold-500/30 rounded-md">
                        <p className="text-sm font-medium mb-1">Seu link personalizado para Educação JIFU:</p>
                        <p className="text-gold-400 text-sm break-all">
                          {`${window.location.origin}/jifu-education?ref=${formData.jifuAffiliateLink.split(".")[0]}`}
                        </p>
                      </div>
                    )}

                    <Button type="submit" className="bg-gold-600 hover:bg-gold-700 text-black" disabled={isSaving}>
                      {isSaving ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Altere sua senha e configure opções de segurança</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                      <p className="text-xs text-gray-400">A senha deve ter pelo menos 6 caracteres.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                    </div>

                    <Button type="submit" className="bg-gold-600 hover:bg-gold-700 text-black" disabled={isSaving}>
                      {isSaving ? "Alterando..." : "Alterar Senha"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Configure suas preferências de notificação</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notificações por Email</h4>
                        <p className="text-sm text-gray-400">Receba atualizações sobre novos conteúdos e eventos</p>
                      </div>
                      <div className="w-12 h-6 flex items-center bg-green-500/20 justify-end rounded-full p-1 cursor-pointer">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notificações de Trading</h4>
                        <p className="text-sm text-gray-400">Alertas sobre sinais de trading e oportunidades</p>
                      </div>
                      <div className="w-12 h-6 flex items-center bg-green-500/20 justify-end rounded-full p-1 cursor-pointer">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notificações de Marketing</h4>
                        <p className="text-sm text-gray-400">Promoções, ofertas e novidades</p>
                      </div>
                      <div className="w-12 h-6 flex items-center bg-gray-700 justify-start rounded-full p-1 cursor-pointer">
                        <div className="h-4 w-4 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6 bg-gold-600 hover:bg-gold-700 text-black">Salvar Preferências</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="md:hidden mt-8">
          <Link href="/member-area">
            <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
              Voltar para Área de Membro
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
