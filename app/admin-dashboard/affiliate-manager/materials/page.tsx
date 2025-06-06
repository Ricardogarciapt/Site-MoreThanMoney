"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash, Save, ImageIcon, Video, FileText, Mail, Eye, Copy } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface MarketingMaterial {
  id: number
  name: string
  type: "banner" | "video" | "email" | "document" | "social"
  size?: string
  campaign: string
  url: string
  downloadUrl: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const initialMaterials: MarketingMaterial[] = [
  {
    id: 1,
    name: "Banner Principal Scanner MTM",
    type: "banner",
    size: "728x90",
    campaign: "Scanner",
    url: "/affiliate-materials/banner-scanner-main.jpg",
    downloadUrl: "https://drive.google.com/file/d/1abc123/view?usp=sharing",
    description: "Banner principal para promoção do Scanner MTM V3.4",
    isActive: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: 2,
    name: "Vídeo Promocional JIFU",
    type: "video",
    campaign: "JIFU",
    url: "/affiliate-materials/video-jifu-promo.mp4",
    downloadUrl: "https://drive.google.com/file/d/2def456/view?usp=sharing",
    description: "Vídeo promocional da plataforma JIFU para redes sociais",
    isActive: true,
    createdAt: "2025-01-02",
    updatedAt: "2025-01-02",
  },
  {
    id: 3,
    name: "Template Email Copytrading",
    type: "email",
    campaign: "Copytrading",
    url: "/affiliate-materials/email-copytrading.html",
    downloadUrl: "https://drive.google.com/file/d/3ghi789/view?usp=sharing",
    description: "Template de email para promoção do serviço de Copytrading",
    isActive: true,
    createdAt: "2025-01-03",
    updatedAt: "2025-01-03",
  },
]

export default function AffiliateMaterialsPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [materials, setMaterials] = useState<MarketingMaterial[]>(initialMaterials)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentMaterial, setCurrentMaterial] = useState<MarketingMaterial | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCampaign, setFilterCampaign] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const [newMaterial, setNewMaterial] = useState<Partial<MarketingMaterial>>({
    name: "",
    type: "banner",
    size: "",
    campaign: "Geral",
    url: "",
    downloadUrl: "",
    description: "",
    isActive: true,
  })

  // Redirecionar se não for autenticado ou admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (!isAdmin) {
      router.push("/member-area")
    }
  }, [isAuthenticated, isAdmin, router])

  // Carregar materiais do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMaterials = localStorage.getItem("marketingMaterials")
      if (storedMaterials) {
        setMaterials(JSON.parse(storedMaterials))
      }
    }
  }, [])

  // Salvar materiais no localStorage
  const saveMaterials = (updatedMaterials: MarketingMaterial[]) => {
    setMaterials(updatedMaterials)
    if (typeof window !== "undefined") {
      localStorage.setItem("marketingMaterials", JSON.stringify(updatedMaterials))
    }
  }

  // Filtrar materiais
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampaign = filterCampaign === "all" || material.campaign === filterCampaign
    const matchesType = filterType === "all" || material.type === filterType

    return matchesSearch && matchesCampaign && matchesType
  })

  // Abrir dialog de edição
  const openEditDialog = (material: MarketingMaterial) => {
    setCurrentMaterial({ ...material })
    setIsEditDialogOpen(true)
  }

  // Salvar material editado
  const saveMaterial = () => {
    if (!currentMaterial) return

    const updatedMaterials = materials.map((material) =>
      material.id === currentMaterial.id
        ? { ...currentMaterial, updatedAt: new Date().toISOString().split("T")[0] }
        : material,
    )

    saveMaterials(updatedMaterials)
    setIsEditDialogOpen(false)
    setCurrentMaterial(null)

    toast({
      title: "Material atualizado",
      description: "O material de marketing foi atualizado com sucesso.",
    })
  }

  // Adicionar novo material
  const addMaterial = () => {
    if (!newMaterial.name || !newMaterial.url) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e URL são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const material: MarketingMaterial = {
      id: Math.max(...materials.map((m) => m.id)) + 1,
      name: newMaterial.name!,
      type: newMaterial.type!,
      size: newMaterial.size || "",
      campaign: newMaterial.campaign!,
      url: newMaterial.url!,
      downloadUrl: newMaterial.downloadUrl || "",
      description: newMaterial.description || "",
      isActive: newMaterial.isActive!,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    saveMaterials([...materials, material])
    setIsAddDialogOpen(false)
    setNewMaterial({
      name: "",
      type: "banner",
      size: "",
      campaign: "Geral",
      url: "",
      downloadUrl: "",
      description: "",
      isActive: true,
    })

    toast({
      title: "Material adicionado",
      description: "O novo material de marketing foi adicionado com sucesso.",
    })
  }

  // Remover material
  const removeMaterial = (id: number) => {
    const updatedMaterials = materials.filter((material) => material.id !== id)
    saveMaterials(updatedMaterials)

    toast({
      title: "Material removido",
      description: "O material de marketing foi removido com sucesso.",
    })
  }

  // Alternar status ativo
  const toggleMaterialStatus = (id: number) => {
    const updatedMaterials = materials.map((material) =>
      material.id === id
        ? { ...material, isActive: !material.isActive, updatedAt: new Date().toISOString().split("T")[0] }
        : material,
    )

    saveMaterials(updatedMaterials)

    toast({
      title: "Status atualizado",
      description: "O status do material foi atualizado com sucesso.",
    })
  }

  // Copiar link
  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copiado",
      description: "O link foi copiado para a área de transferência.",
    })
  }

  // Ícone por tipo
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "banner":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin-dashboard/affiliate-manager">
              <Button variant="outline" size="sm" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Gestão de Materiais</h1>
              <p className="text-gray-400">Gerencie os materiais de marketing para afiliados</p>
            </div>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gold-600 hover:bg-gold-700 text-black">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Material
          </Button>
        </div>

        {/* Filtros */}
        <Card className="mb-6 bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Buscar</Label>
                <Input
                  id="search"
                  placeholder="Nome ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800/50 border-white/10"
                />
              </div>
              <div>
                <Label htmlFor="campaign-filter">Campanha</Label>
                <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as campanhas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as campanhas</SelectItem>
                    <SelectItem value="Geral">Geral</SelectItem>
                    <SelectItem value="Scanner">Scanner</SelectItem>
                    <SelectItem value="JIFU">JIFU</SelectItem>
                    <SelectItem value="Copytrading">Copytrading</SelectItem>
                    <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type-filter">Tipo</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="document">Documento</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Materiais */}
        <Card className="bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle>Materiais de Marketing ({filteredMaterials.length})</CardTitle>
            <CardDescription>Gerencie todos os materiais disponíveis para os afiliados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Material</th>
                    <th className="text-left py-3 px-4">Tipo</th>
                    <th className="text-left py-3 px-4">Campanha</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Atualizado</th>
                    <th className="text-right py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{material.name}</p>
                          {material.size && <p className="text-sm text-gray-400">{material.size}</p>}
                          <p className="text-xs text-gray-500 mt-1">{material.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(material.type)}
                          <span className="capitalize">{material.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gold-500/20 text-gold-400 rounded-full text-xs">
                          {material.campaign}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleMaterialStatus(material.id)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            material.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {material.isActive ? "Ativo" : "Inativo"}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{material.updatedAt}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyLink(material.url)}
                            className="h-8 px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          {material.downloadUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(material.downloadUrl, "_blank")}
                              className="h-8 px-2"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(material)}
                            className="h-8 px-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeMaterial(material.id)}
                            className="h-8 px-2 border-red-500 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Material</DialogTitle>
              <DialogDescription>Atualize as informações do material de marketing.</DialogDescription>
            </DialogHeader>

            {currentMaterial && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentMaterial.name}
                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-type" className="text-right">
                    Tipo
                  </Label>
                  <Select
                    value={currentMaterial.type}
                    onValueChange={(value) => setCurrentMaterial({ ...currentMaterial, type: value as any })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="document">Documento</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {currentMaterial.type === "banner" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-size" className="text-right">
                      Tamanho
                    </Label>
                    <Input
                      id="edit-size"
                      value={currentMaterial.size || ""}
                      onChange={(e) => setCurrentMaterial({ ...currentMaterial, size: e.target.value })}
                      className="col-span-3"
                      placeholder="Ex: 728x90"
                    />
                  </div>
                )}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-campaign" className="text-right">
                    Campanha
                  </Label>
                  <Select
                    value={currentMaterial.campaign}
                    onValueChange={(value) => setCurrentMaterial({ ...currentMaterial, campaign: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Geral">Geral</SelectItem>
                      <SelectItem value="Scanner">Scanner</SelectItem>
                      <SelectItem value="JIFU">JIFU</SelectItem>
                      <SelectItem value="Copytrading">Copytrading</SelectItem>
                      <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-url" className="text-right">
                    URL
                  </Label>
                  <Input
                    id="edit-url"
                    value={currentMaterial.url}
                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, url: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-download-url" className="text-right">
                    URL Download
                  </Label>
                  <Input
                    id="edit-download-url"
                    value={currentMaterial.downloadUrl}
                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, downloadUrl: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="edit-description" className="text-right mt-2">
                    Descrição
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={currentMaterial.description}
                    onChange={(e) => setCurrentMaterial({ ...currentMaterial, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={saveMaterial} className="bg-gold-600 hover:bg-gold-700 text-black">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog de Adição */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Material</DialogTitle>
              <DialogDescription>Adicione um novo material de marketing para os afiliados.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-name" className="text-right">
                  Nome *
                </Label>
                <Input
                  id="new-name"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-type" className="text-right">
                  Tipo
                </Label>
                <Select
                  value={newMaterial.type}
                  onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value as any })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="document">Documento</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newMaterial.type === "banner" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-size" className="text-right">
                    Tamanho
                  </Label>
                  <Input
                    id="new-size"
                    value={newMaterial.size}
                    onChange={(e) => setNewMaterial({ ...newMaterial, size: e.target.value })}
                    className="col-span-3"
                    placeholder="Ex: 728x90"
                  />
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-campaign" className="text-right">
                  Campanha
                </Label>
                <Select
                  value={newMaterial.campaign}
                  onValueChange={(value) => setNewMaterial({ ...newMaterial, campaign: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Geral">Geral</SelectItem>
                    <SelectItem value="Scanner">Scanner</SelectItem>
                    <SelectItem value="JIFU">JIFU</SelectItem>
                    <SelectItem value="Copytrading">Copytrading</SelectItem>
                    <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-url" className="text-right">
                  URL *
                </Label>
                <Input
                  id="new-url"
                  value={newMaterial.url}
                  onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-download-url" className="text-right">
                  URL Download
                </Label>
                <Input
                  id="new-download-url"
                  value={newMaterial.downloadUrl}
                  onChange={(e) => setNewMaterial({ ...newMaterial, downloadUrl: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="new-description" className="text-right mt-2">
                  Descrição
                </Label>
                <Textarea
                  id="new-description"
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={addMaterial} className="bg-gold-600 hover:bg-gold-700 text-black">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
