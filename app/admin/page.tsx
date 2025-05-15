"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Check,
  Pencil,
  Save,
  X,
  LogOut,
  Lock,
  Home,
  ImageIcon,
  Layout,
  FileText,
  LinkIcon,
  BookOpen,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Define os tipos para configurações do site
interface SiteConfig {
  name: string
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  navigation: Array<{ name: string; href: string }>
  sections: Array<{ id: string; title: string; visible: boolean }>
}

// Configuração inicial do site
const defaultConfig: SiteConfig = {
  name: "MoreThanMoney",
  logoUrl: "/logo-new.png",
  primaryColor: "#f9b208",
  secondaryColor: "#000000",
  navigation: [
    { name: "Início", href: "/" },
    { name: "Scanner", href: "/scanner" },
    { name: "Copytrading", href: "/copytrading" },
    { name: "Educação", href: "/education" },
    { name: "Área de Membros", href: "/member-area" },
  ],
  sections: [
    { id: "hero", title: "Seção de Destaque", visible: true },
    { id: "scanner", title: "Scanner MTM", visible: true },
    { id: "copytrading", title: "Copytrading", visible: true },
    { id: "education", title: "Educação JIFU", visible: true },
    { id: "membership", title: "Área de Membros", visible: true },
  ],
}

export default function AdminPage() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const router = useRouter()
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultConfig)
  const [editingNav, setEditingNav] = useState<number | null>(null)
  const [newNavItem, setNewNavItem] = useState({ name: "", href: "" })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Ao carregar, verificar se há configuração salva
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("siteConfig")
      if (savedConfig) {
        setSiteConfig(JSON.parse(savedConfig))
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
            <Lock className="h-16 w-16 text-gold-500" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button variant="default" className="bg-gold-600 hover:bg-gold-700 text-black">
                Voltar para o Início
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Função para salvar configurações
  const saveConfig = () => {
    setIsSaving(true)
    // Simulação de salvamento - em produção seria uma API
    setTimeout(() => {
      localStorage.setItem("siteConfig", JSON.stringify(siteConfig))
      setSaveMessage("Configurações salvas com sucesso!")
      setIsSaving(false)

      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setSaveMessage("")
      }, 3000)
    }, 1000)
  }

  // Funções para editar navegação
  const startEditingNav = (index: number) => {
    setEditingNav(index)
  }

  const cancelEditingNav = () => {
    setEditingNav(null)
  }

  const saveNavItem = (index: number, item: { name: string; href: string }) => {
    const updatedNav = [...siteConfig.navigation]
    updatedNav[index] = item
    setSiteConfig({
      ...siteConfig,
      navigation: updatedNav,
    })
    setEditingNav(null)
  }

  const addNavItem = () => {
    if (newNavItem.name && newNavItem.href) {
      setSiteConfig({
        ...siteConfig,
        navigation: [...siteConfig.navigation, newNavItem],
      })
      setNewNavItem({ name: "", href: "" })
    }
  }

  const removeNavItem = (index: number) => {
    const updatedNav = [...siteConfig.navigation]
    updatedNav.splice(index, 1)
    setSiteConfig({
      ...siteConfig,
      navigation: updatedNav,
    })
  }

  // Função para alternar visibilidade das seções
  const toggleSectionVisibility = (index: number) => {
    const updatedSections = [...siteConfig.sections]
    updatedSections[index].visible = !updatedSections[index].visible
    setSiteConfig({
      ...siteConfig,
      sections: updatedSections,
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-10 bg-black border-b border-gold-500/30 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gold-500">Painel Administrativo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
                <Home className="h-4 w-4 mr-2" /> Ver Site
              </Button>
            </Link>
            <Button onClick={logout} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user?.name}</h1>
          <p className="text-gray-400">Aqui você pode gerenciar as configurações e conteúdo do site MoreThanMoney.</p>
        </div>

        {saveMessage && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-md flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-400">{saveMessage}</span>
          </div>
        )}

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/50 border border-gold-500/30">
            <TabsTrigger value="general" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Geral
            </TabsTrigger>
            <TabsTrigger value="navigation" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Navegação
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Conteúdo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Personalize as configurações básicas do site.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nome do Site</Label>
                  <Input
                    id="site-name"
                    value={siteConfig.name}
                    onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                    className="bg-gray-800/50 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-url">URL do Logo</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="logo-url"
                      value={siteConfig.logoUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, logoUrl: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                    />
                    <div className="h-10 w-10 bg-white rounded flex items-center justify-center overflow-hidden">
                      <img
                        src={siteConfig.logoUrl || "/placeholder.svg"}
                        alt="Logo Preview"
                        className="max-h-full max-w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Cor Primária</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primary-color"
                        type="text"
                        value={siteConfig.primaryColor}
                        onChange={(e) => setSiteConfig({ ...siteConfig, primaryColor: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                      <input
                        type="color"
                        value={siteConfig.primaryColor}
                        onChange={(e) => setSiteConfig({ ...siteConfig, primaryColor: e.target.value })}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Cor Secundária</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="secondary-color"
                        type="text"
                        value={siteConfig.secondaryColor}
                        onChange={(e) => setSiteConfig({ ...siteConfig, secondaryColor: e.target.value })}
                        className="bg-gray-800/50 border-white/10 text-white"
                      />
                      <input
                        type="color"
                        value={siteConfig.secondaryColor}
                        onChange={(e) => setSiteConfig({ ...siteConfig, secondaryColor: e.target.value })}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveConfig} disabled={isSaving} className="bg-gold-600 hover:bg-gold-700 text-black">
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Navegação do Site</CardTitle>
                <CardDescription>Gerencie os links de navegação do site.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {siteConfig.navigation.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-700 rounded-md flex items-center justify-between"
                    >
                      {editingNav === index ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            value={item.name}
                            onChange={(e) => {
                              const updatedNav = [...siteConfig.navigation]
                              updatedNav[index].name = e.target.value
                              setSiteConfig({ ...siteConfig, navigation: updatedNav })
                            }}
                            className="bg-gray-800/50 border-white/10 text-white"
                            placeholder="Nome do Link"
                          />
                          <Input
                            value={item.href}
                            onChange={(e) => {
                              const updatedNav = [...siteConfig.navigation]
                              updatedNav[index].href = e.target.value
                              setSiteConfig({ ...siteConfig, navigation: updatedNav })
                            }}
                            className="bg-gray-800/50 border-white/10 text-white"
                            placeholder="URL"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => saveNavItem(index, item)}
                              className="border-green-500 text-green-400 hover:bg-green-500/10"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={cancelEditingNav}
                              className="border-red-500 text-red-400 hover:bg-red-500/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <span className="font-medium">{item.name}</span>
                            <div className="text-sm text-gray-400 flex items-center">
                              <LinkIcon className="h-3 w-3 mr-1" />
                              {item.href}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => startEditingNav(index)}
                              className="border-gold-500 text-gold-400 hover:bg-gold-500/10"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeNavItem(index)}
                              className="border-red-500 text-red-400 hover:bg-red-500/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 border border-dashed border-gray-700 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Adicionar Novo Link</h3>
                  <div className="flex gap-2">
                    <Input
                      value={newNavItem.name}
                      onChange={(e) => setNewNavItem({ ...newNavItem, name: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="Nome do Link"
                    />
                    <Input
                      value={newNavItem.href}
                      onChange={(e) => setNewNavItem({ ...newNavItem, href: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="URL"
                    />
                    <Button onClick={addNavItem} className="bg-gold-600 hover:bg-gold-700 text-black">
                      Adicionar
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveConfig} disabled={isSaving} className="bg-gold-600 hover:bg-gold-700 text-black">
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Gerenciamento de Conteúdo</CardTitle>
                <CardDescription>Controle quais seções estão visíveis no site.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {siteConfig.sections.map((section, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-700 rounded-md flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="font-medium flex items-center">
                          {section.id === "hero" && <Layout className="h-4 w-4 mr-2" />}
                          {section.id === "scanner" && <ImageIcon className="h-4 w-4 mr-2" />}
                          {section.id === "copytrading" && <FileText className="h-4 w-4 mr-2" />}
                          {section.id === "education" && <BookOpen className="h-4 w-4 mr-2" />}
                          {section.id === "membership" && <Users className="h-4 w-4 mr-2" />}
                          {section.title}
                        </div>
                        <div className="text-sm text-gray-400">ID: {section.id}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={section.visible ? "text-green-400" : "text-gray-500"}>
                          {section.visible ? "Visível" : "Oculto"}
                        </span>
                        <div
                          onClick={() => toggleSectionVisibility(index)}
                          className={`w-12 h-6 flex items-center ${section.visible ? "bg-green-500/20 justify-end" : "bg-gray-700 justify-start"} rounded-full p-1 cursor-pointer`}
                        >
                          <div
                            className={`h-4 w-4 rounded-full ${section.visible ? "bg-green-500" : "bg-gray-400"}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveConfig} disabled={isSaving} className="bg-gold-600 hover:bg-gold-700 text-black">
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
