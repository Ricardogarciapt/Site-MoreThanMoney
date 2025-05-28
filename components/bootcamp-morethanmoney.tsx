"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import MembershipRequired from "./membership-required"
import { Loader2, Play, Lock, RefreshCw, Clock, Users, BookOpen, Star } from "lucide-react"
import { fetchPlaylistData, fetchPlaylistThumbnail } from "@/app/actions/youtube-actions"
import type { Module, VideoItem } from "@/lib/youtube-service"

export default function BootcampMoreThanMoney() {
  const { isAuthenticated, user } = useAuth()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const [activeModule, setActiveModule] = useState<string>("module1")
  const [playlistThumbnail, setPlaylistThumbnail] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({})

  // Verificar se o usuário tem acesso ao bootcamp
  const hasAccess = isAuthenticated && user?.package && ["Pro Trader", "VIP Trader"].includes(user.package)

  // Função para carregar os dados da playlist
  const loadPlaylistData = async (forceRefresh = false) => {
    if (forceRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    setError(null)

    try {
      // Busca os dados da playlist usando o Server Action
      const moduleData = await fetchPlaylistData(forceRefresh)
      setModules(moduleData)

      // Define o primeiro vídeo como ativo por padrão, se houver
      if (moduleData.length > 0 && moduleData[0].videos.length > 0) {
        setActiveVideo(moduleData[0].videos[0])
        setActiveModule("module1")
      }

      // Busca a imagem de capa da playlist usando o Server Action
      const thumbnail = await fetchPlaylistThumbnail()
      setPlaylistThumbnail(thumbnail)

      // Carrega progresso do usuário
      const savedProgress = localStorage.getItem(`course_progress_${user?.email}`)
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }
    } catch (error) {
      console.error("Erro ao carregar dados da playlist:", error)
      setError("Não foi possível carregar os dados do bootcamp. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Marcar vídeo como assistido
  const markVideoAsWatched = (videoId: string) => {
    const newProgress = { ...progress, [videoId]: true }
    setProgress(newProgress)
    localStorage.setItem(`course_progress_${user?.email}`, JSON.stringify(newProgress))
  }

  // Calcular estatísticas do curso
  const getTotalVideos = () => modules.reduce((total, module) => total + module.videos.length, 0)
  const getWatchedVideos = () => Object.keys(progress).filter((id) => progress[id]).length
  const getProgressPercentage = () => {
    const total = getTotalVideos()
    const watched = getWatchedVideos()
    return total > 0 ? Math.round((watched / total) * 100) : 0
  }

  // Carrega os dados da playlist ao montar o componente
  useEffect(() => {
    loadPlaylistData()

    // Configura um intervalo para atualizar os dados a cada hora
    const intervalId = setInterval(() => {
      loadPlaylistData(true)
    }, 3600000) // 1 hora

    return () => clearInterval(intervalId)
  }, [])

  // Função para atualizar manualmente os dados
  const handleRefresh = () => {
    loadPlaylistData(true)
  }

  if (!isAuthenticated) {
    return <MembershipRequired />
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
        <span className="ml-2 text-gold-500">Carregando bootcamp...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={handleRefresh} className="bg-gold-500 hover:bg-gold-600 text-black">
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header do Curso */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-gold-500 mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Bootcamp MoreThanMoney
          </h1>
        </div>

        <p className="text-lg text-gray-300 mb-6">
          Domine o mercado financeiro com nosso treinamento completo e estruturado
        </p>

        {/* Estatísticas do Curso */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Play className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">{getTotalVideos()}</span>
              </div>
              <p className="text-sm text-gray-400">Total de Vídeos</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-2xl font-bold text-white">{getWatchedVideos()}</span>
              </div>
              <p className="text-sm text-gray-400">Assistidos</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-gold-400 mr-2" />
                <span className="text-2xl font-bold text-white">{getProgressPercentage()}%</span>
              </div>
              <p className="text-sm text-gray-400">Progresso</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-white">1.2k+</span>
              </div>
              <p className="text-sm text-gray-400">Estudantes</p>
            </CardContent>
          </Card>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-gray-800 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-gold-500 to-gold-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleRefresh} disabled={refreshing} className="bg-gray-800 hover:bg-gray-700 text-white">
            {refreshing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar conteúdo
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Player de Vídeo */}
        <div className="lg:col-span-3">
          {activeVideo ? (
            <Card className="mb-6 bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                {hasAccess ? (
                  <div className="aspect-video bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0`}
                      title={activeVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="aspect-video"
                      onLoad={() => markVideoAsWatched(activeVideo.id)}
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-800 flex flex-col items-center justify-center">
                    <Lock className="h-16 w-16 text-gold-500 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Conteúdo Exclusivo</h3>
                    <p className="text-gray-400 mb-4 text-center max-w-md px-4">
                      Faça upgrade para o pacote Pro Trader ou VIP Trader para acessar este conteúdo.
                    </p>
                    <Button className="bg-gold-500 hover:bg-gold-600 text-black">Fazer Upgrade</Button>
                  </div>
                )}
              </CardContent>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{activeVideo.title}</CardTitle>
                    <CardDescription className="text-gray-400">{activeVideo.description}</CardDescription>
                  </div>
                  {progress[activeVideo.id] && (
                    <Badge className="bg-green-500/20 text-green-400 ml-4">✓ Assistido</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500">
                    Publicado em: {new Date(activeVideo.publishedAt).toLocaleDateString("pt-PT")}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markVideoAsWatched(activeVideo.id)}
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                  >
                    Marcar como assistido
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ) : (
            <Card className="mb-6 bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400">Selecione um vídeo para começar</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lista de Vídeos */}
        <div className="lg:col-span-1">
          {modules.length > 0 ? (
            <div className="space-y-4">
              <Card className="bg-black/50 border-gold-500/30 sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold-500 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Conteúdo do Curso
                  </CardTitle>
                  <CardDescription>
                    {getTotalVideos()} vídeos • {getWatchedVideos()} assistidos
                  </CardDescription>
                </CardHeader>
              </Card>

              <Tabs defaultValue={activeModule} onValueChange={setActiveModule} className="w-full">
                <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${modules.length}, 1fr)` }}>
                  {modules.map((module, index) => (
                    <TabsTrigger key={`module${index + 1}`} value={`module${index + 1}`} className="text-xs">
                      M{index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {modules.map((module, index) => (
                  <TabsContent key={`module${index + 1}`} value={`module${index + 1}`} className="mt-4">
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-gold-500">
                          Módulo {index + 1}: {module.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-400">
                          <Play className="h-4 w-4 mr-1" />
                          {module.videos.length} vídeos
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="max-h-96 overflow-y-auto">
                          {module.videos.map((video, videoIndex) => (
                            <div
                              key={video.id}
                              className={`flex items-start p-3 cursor-pointer hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0 ${
                                activeVideo?.id === video.id ? "bg-gray-800 border-l-4 border-l-gold-500" : ""
                              }`}
                              onClick={() => setActiveVideo(video)}
                            >
                              <div className="relative flex-shrink-0 w-20 h-12 mr-3">
                                <img
                                  src={video.thumbnail || "/placeholder.svg"}
                                  alt={video.title}
                                  className="w-full h-full object-cover rounded"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  {progress[video.id] ? (
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  ) : (
                                    <Play className="h-4 w-4 text-white opacity-80" />
                                  )}
                                </div>
                                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                                  {videoIndex + 1}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-white line-clamp-2 mb-1">{video.title}</h4>
                                <p className="text-xs text-gray-400 line-clamp-2">{video.description}</p>
                                <div className="flex items-center mt-2">
                                  <Clock className="h-3 w-3 text-gray-500 mr-1" />
                                  <span className="text-xs text-gray-500">
                                    {Math.floor(Math.random() * 15 + 5)} min
                                  </span>
                                  {progress[video.id] && (
                                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">Concluído</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400">Nenhum módulo disponível</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
