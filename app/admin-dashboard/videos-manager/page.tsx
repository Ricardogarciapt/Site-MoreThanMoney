"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"
import { useVideoManager, type VideoConfig, extractYouTubeVideoId } from "@/lib/videos-manager"
import { Play, Edit, Trash2, RefreshCw, AlertCircle, Video, Settings, Eye } from "lucide-react"

export default function VideosManagerPage() {
  const videoManager = useVideoManager()
  const [videos, setVideos] = useState<VideoConfig[]>([])
  const [editingVideo, setEditingVideo] = useState<VideoConfig | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState<VideoConfig | null>(null)
  const [previewVideo, setPreviewVideo] = useState<VideoConfig | null>(null)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Carregar vídeos
  useEffect(() => {
    setVideos(videoManager.getAllVideos())
  }, [])

  // Função para recarregar vídeos
  const reloadVideos = () => {
    setVideos(videoManager.getAllVideos())
  }

  // Função para validar URL do YouTube
  const isValidYouTubeUrl = (url: string): boolean => {
    return extractYouTubeVideoId(url) !== null
  }

  // Função para atualizar vídeo
  const handleUpdateVideo = () => {
    if (!editingVideo) return

    if (!editingVideo.title || !editingVideo.youtubeUrl) {
      toast({
        title: "Campos obrigatórios",
        description: "Título e URL do YouTube são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    if (!isValidYouTubeUrl(editingVideo.youtubeUrl)) {
      toast({
        title: "URL inválida",
        description: "Insira uma URL válida do YouTube.",
        variant: "destructive",
      })
      return
    }

    const success = videoManager.updateVideo(editingVideo.id, {
      title: editingVideo.title,
      description: editingVideo.description,
      youtubeUrl: editingVideo.youtubeUrl,
      active: editingVideo.active,
    })

    if (success) {
      reloadVideos()
      setIsEditDialogOpen(false)
      setEditingVideo(null)
      toast({
        title: "Vídeo atualizado",
        description: "O vídeo foi atualizado com sucesso.",
      })
    }
  }

  // Função para excluir vídeo
  const handleDeleteVideo = () => {
    if (!videoToDelete) return

    const success = videoManager.deleteVideo(videoToDelete.id)
    if (success) {
      reloadVideos()
      setIsDeleteDialogOpen(false)
      setVideoToDelete(null)
      toast({
        title: "Vídeo excluído",
        description: "O vídeo foi excluído com sucesso.",
      })
    }
  }

  // Função para resetar para padrões
  const handleResetToDefaults = () => {
    videoManager.resetToDefaults()
    reloadVideos()
    toast({
      title: "Vídeos resetados",
      description: "Todos os vídeos foram resetados para os padrões.",
    })
  }

  // Filtrar vídeos
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Estatísticas
  const stats = {
    total: videos.length,
    active: videos.filter((v) => v.active).length,
    inactive: videos.filter((v) => !v.active).length,
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciador de Vídeos</h1>
          <p className="text-gray-500 mt-1">Gerencie os vídeos do YouTube exibidos no site</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={reloadVideos}>
            <RefreshCw className="mr-2 h-4 w-4" /> Recarregar
          </Button>
          <Button variant="destructive" onClick={handleResetToDefaults}>
            <Settings className="mr-2 h-4 w-4" /> Resetar Padrões
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vídeos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vídeos Ativos</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vídeos Inativos</CardTitle>
            <Play className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">{stats.inactive}</div>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <div className="relative">
          <Input
            placeholder="Pesquisar vídeos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Lista de Vídeos */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Visualização em Grade</TabsTrigger>
          <TabsTrigger value="list">Visualização em Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=320"
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={video.active ? "default" : "outline"} className="bg-black/70">
                      {video.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {video.location}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPreviewVideo(video)
                        setIsPreviewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingVideo(video)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setVideoToDelete(video)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="space-y-4">
            {filteredVideos.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=48&width=80"
                        }}
                      />
                      <div>
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-sm text-gray-500">{video.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={video.active ? "default" : "outline"}>
                            {video.active ? "Ativo" : "Inativo"}
                          </Badge>
                          <Badge variant="secondary">{video.location}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPreviewVideo(video)
                          setIsPreviewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" /> Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingVideo(video)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setVideoToDelete(video)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de Preview */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Preview do Vídeo</DialogTitle>
            <DialogDescription>{previewVideo?.title}</DialogDescription>
          </DialogHeader>
          {previewVideo && (
            <div className="space-y-4">
              <div className="aspect-video">
                <iframe
                  src={previewVideo.embedUrl}
                  title={previewVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Localização:</strong> {previewVideo.location}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <Badge variant={previewVideo.active ? "default" : "outline"}>
                    {previewVideo.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <strong>URL:</strong>{" "}
                  <a
                    href={previewVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {previewVideo.youtubeUrl}
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Editar Vídeo</DialogTitle>
            <DialogDescription>Atualize as informações do vídeo.</DialogDescription>
          </DialogHeader>
          {editingVideo && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Título*
                </Label>
                <Input
                  id="edit-title"
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-youtubeUrl" className="text-right">
                  URL do YouTube*
                </Label>
                <Input
                  id="edit-youtubeUrl"
                  value={editingVideo.youtubeUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                  className="col-span-3"
                  placeholder="https://youtu.be/..."
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right pt-2">
                  Descrição
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingVideo.description}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-active" className="text-right">
                  Ativo
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-active"
                    checked={editingVideo.active}
                    onCheckedChange={(checked) => setEditingVideo({ ...editingVideo, active: checked })}
                  />
                  <Label htmlFor="edit-active">{editingVideo.active ? "Sim" : "Não"}</Label>
                </div>
              </div>
              <div className="col-span-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Localização:</strong> {editingVideo.location}
                    <br />
                    Esta localização determina onde o vídeo será exibido no site.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateVideo} className="bg-gold-600 hover:bg-gold-700 text-black">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o vídeo "{videoToDelete?.title}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteVideo}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Informações de Ajuda */}
      <div className="mt-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="text-sm mb-2">
              <strong>Localizações dos Vídeos:</strong>
            </p>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>
                <code>home-scanner-section</code> - Seção "Conhece tudo sobre os Scanner's" na página inicial
              </li>
              <li>
                <code>new-landing-intro</code> - Botão "Ver Apresentação" na página new-landing
              </li>
              <li>
                <code>jifu-education-page</code> - Vídeo de apresentação na página JIFU Education
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
