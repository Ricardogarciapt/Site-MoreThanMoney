"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import MembershipRequired from "./membership-required"
import { Loader2, Play, Lock, RefreshCw } from "lucide-react"
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
    } catch (error) {
      console.error("Erro ao carregar dados da playlist:", error)
      setError("Não foi possível carregar os dados do bootcamp. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
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
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          Bootcamp MoreThanMoney
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Aprenda a dominar o mercado financeiro com nosso treinamento completo
        </p>

        {playlistThumbnail && (
          <div className="relative max-w-2xl mx-auto mb-8">
            <img
              src={playlistThumbnail || "/placeholder.svg"}
              alt="Bootcamp MoreThanMoney"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
              <Play className="h-16 w-16 text-white opacity-80" />
            </div>
          </div>
        )}

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeVideo ? (
            <Card className="mb-6 bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                {hasAccess ? (
                  <div className="aspect-video bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${activeVideo.id}`}
                      title={activeVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="aspect-video"
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
                <CardTitle>{activeVideo.title}</CardTitle>
                <CardDescription className="text-gray-400 mt-2">{activeVideo.description}</CardDescription>
                <p className="text-xs text-gray-500 mt-2">
                  Publicado em: {new Date(activeVideo.publishedAt).toLocaleDateString("pt-PT")}
                </p>
              </CardHeader>
            </Card>
          ) : (
            <Card className="mb-6 bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400">Nenhum vídeo selecionado</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {modules.length > 0 ? (
            <Tabs defaultValue={activeModule} onValueChange={setActiveModule}>
              <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${modules.length}, 1fr)` }}>
                {modules.map((module, index) => (
                  <TabsTrigger key={`module${index + 1}`} value={`module${index + 1}`}>
                    Módulo {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {modules.map((module, index) => (
                <TabsContent key={`module${index + 1}`} value={`module${index + 1}`} className="mt-0">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl text-gold-500">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-2">
                        {module.videos.map((video) => (
                          <div
                            key={video.id}
                            className={`flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors ${activeVideo?.id === video.id ? "bg-gray-800" : ""}`}
                            onClick={() => setActiveVideo(video)}
                          >
                            <div className="relative flex-shrink-0 w-24 h-16 mr-3">
                              <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full h-full object-cover rounded"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="h-6 w-6 text-white opacity-80" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-white">{video.title}</h4>
                              <p className="text-xs text-gray-400 line-clamp-1">{video.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
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
