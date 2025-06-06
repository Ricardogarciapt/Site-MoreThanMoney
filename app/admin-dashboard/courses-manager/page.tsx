"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Check, Save, RefreshCw, Plus, Trash } from "lucide-react"

export default function CoursesManagerPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("bootcamp")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Estado para os cursos
  const [bootcampPlaylist, setBootcampPlaylist] = useState(
    "https://youtube.com/playlist?list=PL6XU0y2YUMZLpIsO63P_E6w4OCY8Y467m",
  )
  const [distributorPlaylist, setDistributorPlaylist] = useState(
    "https://youtube.com/playlist?list=PL6XU0y2YUMZI3mi9RSpEmsO5V90b9lbZS",
  )
  const [aiPlaylist, setAiPlaylist] = useState("")

  // Estado para os vídeos do bootcamp
  const [bootcampVideos, setBootcampVideos] = useState([
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 1 - Introdução ao Bootcamp MoreThanMoney",
      description: "Visão geral do bootcamp e introdução aos conceitos fundamentais de trading.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 1 - Fundamentos do Trading",
      description: "Conceitos básicos e terminologia essencial para iniciantes no mercado financeiro.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 1 - Análise de Mercado",
      description: "Métodos e ferramentas para análise de mercados financeiros.",
    },
  ])

  // Estado para os vídeos do distribuidor
  const [distributorVideos, setDistributorVideos] = useState([
    {
      id: "Wd-Iq9gKZQw",
      title: "Nível 1 - Introdução ao Marketing de Rede",
      description: "Visão geral do marketing de rede e conceitos fundamentais.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Nível 1 - A Filosofia JIFU",
      description: "Entendendo a filosofia e o modelo de negócio da JIFU.",
    },
  ])

  // Funções para adicionar e remover vídeos
  const addBootcampVideo = () => {
    setBootcampVideos([...bootcampVideos, { id: "", title: "", description: "" }])
  }

  const removeBootcampVideo = (index) => {
    const newVideos = [...bootcampVideos]
    newVideos.splice(index, 1)
    setBootcampVideos(newVideos)
  }

  const updateBootcampVideo = (index, field, value) => {
    const newVideos = [...bootcampVideos]
    newVideos[index][field] = value
    setBootcampVideos(newVideos)
  }

  const addDistributorVideo = () => {
    setDistributorVideos([...distributorVideos, { id: "", title: "", description: "" }])
  }

  const removeDistributorVideo = (index) => {
    const newVideos = [...distributorVideos]
    newVideos.splice(index, 1)
    setDistributorVideos(newVideos)
  }

  const updateDistributorVideo = (index, field, value) => {
    const newVideos = [...distributorVideos]
    newVideos[index][field] = value
    setDistributorVideos(newVideos)
  }

  // Função para salvar as alterações
  const handleSave = () => {
    setIsSaving(true)

    // Simulação de salvamento - em produção seria uma API
    setTimeout(() => {
      setSaveSuccess(true)
      setIsSaving(false)

      toast({
        title: "Configurações salvas",
        description: "As configurações dos cursos foram salvas com sucesso.",
      })

      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciador de Cursos</h1>
          <p className="text-gray-500">Configure as playlists e vídeos dos cursos</p>
        </div>
        <Button onClick={() => router.push("/admin-dashboard")} variant="outline">
          Voltar ao Painel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bootcamp">Bootcamp MoreThanMoney</TabsTrigger>
          <TabsTrigger value="distributor">Educação de Distribuidores</TabsTrigger>
          <TabsTrigger value="ai">Inteligência Artificial</TabsTrigger>
        </TabsList>

        {/* Aba Bootcamp */}
        <TabsContent value="bootcamp">
          <Card>
            <CardHeader>
              <CardTitle>Bootcamp MoreThanMoney</CardTitle>
              <CardDescription>Configure a playlist e os vídeos do bootcamp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {saveSuccess && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-500">Configurações salvas com sucesso!</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bootcamp-playlist">URL da Playlist</Label>
                  <Input
                    id="bootcamp-playlist"
                    value={bootcampPlaylist}
                    onChange={(e) => setBootcampPlaylist(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">URL completa da playlist do YouTube</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Vídeos do Bootcamp</h3>
                    <Button onClick={addBootcampVideo} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" /> Adicionar Vídeo
                    </Button>
                  </div>

                  {bootcampVideos.map((video, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Vídeo {index + 1}</h4>
                        <Button onClick={() => removeBootcampVideo(index)} size="sm" variant="destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`video-id-${index}`}>ID do Vídeo</Label>
                        <Input
                          id={`video-id-${index}`}
                          value={video.id}
                          onChange={(e) => updateBootcampVideo(index, "id", e.target.value)}
                          placeholder="Ex: Wd-Iq9gKZQw"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`video-title-${index}`}>Título</Label>
                        <Input
                          id={`video-title-${index}`}
                          value={video.title}
                          onChange={(e) => updateBootcampVideo(index, "title", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`video-desc-${index}`}>Descrição</Label>
                        <Textarea
                          id={`video-desc-${index}`}
                          value={video.description}
                          onChange={(e) => updateBootcampVideo(index, "description", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Educação de Distribuidores */}
        <TabsContent value="distributor">
          <Card>
            <CardHeader>
              <CardTitle>Educação de Distribuidores</CardTitle>
              <CardDescription>Configure a playlist e os vídeos do programa de educação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="distributor-playlist">URL da Playlist</Label>
                  <Input
                    id="distributor-playlist"
                    value={distributorPlaylist}
                    onChange={(e) => setDistributorPlaylist(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">URL completa da playlist do YouTube</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Vídeos do Programa</h3>
                    <Button onClick={addDistributorVideo} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" /> Adicionar Vídeo
                    </Button>
                  </div>

                  {distributorVideos.map((video, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Vídeo {index + 1}</h4>
                        <Button onClick={() => removeDistributorVideo(index)} size="sm" variant="destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`dist-video-id-${index}`}>ID do Vídeo</Label>
                        <Input
                          id={`dist-video-id-${index}`}
                          value={video.id}
                          onChange={(e) => updateDistributorVideo(index, "id", e.target.value)}
                          placeholder="Ex: Wd-Iq9gKZQw"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`dist-video-title-${index}`}>Título</Label>
                        <Input
                          id={`dist-video-title-${index}`}
                          value={video.title}
                          onChange={(e) => updateDistributorVideo(index, "title", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`dist-video-desc-${index}`}>Descrição</Label>
                        <Textarea
                          id={`dist-video-desc-${index}`}
                          value={video.description}
                          onChange={(e) => updateDistributorVideo(index, "description", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Inteligência Artificial */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>Inteligência Artificial</CardTitle>
              <CardDescription>Configure a playlist e os vídeos do curso de IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ai-playlist">URL da Playlist</Label>
                  <Input
                    id="ai-playlist"
                    value={aiPlaylist}
                    onChange={(e) => setAiPlaylist(e.target.value)}
                    placeholder="Adicione a URL da playlist quando o curso estiver disponível"
                  />
                  <p className="text-sm text-gray-500">URL completa da playlist do YouTube</p>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
                  <p className="text-yellow-400">
                    Este curso ainda não está disponível. Configure a URL da playlist quando o curso for lançado.
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
