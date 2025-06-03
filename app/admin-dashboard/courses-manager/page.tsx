"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Plus, Trash2, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Video {
  id: string
  title: string
  description: string
  youtubeId: string
}

interface Course {
  name: string
  playlist: string
  videos: Video[]
}

export default function CoursesManagerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<{ [key: string]: Course }>({
    bootcamp: {
      name: "Bootcamp MoreThanMoney",
      playlist: "https://youtube.com/playlist?list=PL6XU0y2YUMZLpIsO63P_E6w4OCY8Y467m",
      videos: [
        {
          id: "1",
          title: "Módulo 1 - Introdução ao Bootcamp MoreThanMoney",
          description: "Visão geral do bootcamp e introdução aos conceitos fundamentais de trading.",
          youtubeId: "Wd-Iq9gKZQw",
        },
        {
          id: "2",
          title: "Módulo 2 - Fundamentos do Trading",
          description: "Conceitos básicos e terminologia essencial para iniciantes no mercado financeiro.",
          youtubeId: "Wd-Iq9gKZQw",
        },
      ],
    },
    jifu: {
      name: "Curso JIFU",
      playlist: "https://youtube.com/playlist?list=PL6XU0y2YUMZI3mi9RSpEmsO5V90b9lbZS",
      videos: [
        {
          id: "1",
          title: "Nível 1 - Introdução ao Marketing de Rede",
          description: "Visão geral do marketing de rede e conceitos fundamentais.",
          youtubeId: "Wd-Iq9gKZQw",
        },
        {
          id: "2",
          title: "Nível 2 - A Filosofia JIFU",
          description: "Entendendo a filosofia e o modelo de negócio da JIFU.",
          youtubeId: "Wd-Iq9gKZQw",
        },
      ],
    },
  })

  const addVideo = (courseKey: string) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: "",
      description: "",
      youtubeId: "",
    }
    setCourses({
      ...courses,
      [courseKey]: {
        ...courses[courseKey],
        videos: [...courses[courseKey].videos, newVideo],
      },
    })
  }

  const removeVideo = (courseKey: string, videoId: string) => {
    setCourses({
      ...courses,
      [courseKey]: {
        ...courses[courseKey],
        videos: courses[courseKey].videos.filter((video) => video.id !== videoId),
      },
    })
  }

  const updateVideo = (courseKey: string, videoId: string, field: keyof Video, value: string) => {
    setCourses({
      ...courses,
      [courseKey]: {
        ...courses[courseKey],
        videos: courses[courseKey].videos.map((video) => (video.id === videoId ? { ...video, [field]: value } : video)),
      },
    })
  }

  const updateCourse = (courseKey: string, field: keyof Course, value: string) => {
    setCourses({
      ...courses,
      [courseKey]: {
        ...courses[courseKey],
        [field]: value,
      },
    })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Salvar no localStorage
      localStorage.setItem("courses", JSON.stringify(courses))

      toast({
        title: "Cursos salvos",
        description: "As configurações dos cursos foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar os cursos.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Carregar cursos salvos
    const savedCourses = localStorage.getItem("courses")
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <Card className="max-w-6xl mx-auto bg-black/50 border-gray-800/50 backdrop-blur-xl">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-gold-500" />
              <div>
                <CardTitle className="text-xl text-white">Gerenciar Cursos</CardTitle>
                <CardDescription className="text-gray-400">Configure playlists e conteúdo educativo</CardDescription>
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
          <Tabs defaultValue="bootcamp" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
              <TabsTrigger value="bootcamp" className="data-[state=active]:bg-gold-500/20">
                Bootcamp MoreThanMoney
              </TabsTrigger>
              <TabsTrigger value="jifu" className="data-[state=active]:bg-gold-500/20">
                Curso JIFU
              </TabsTrigger>
            </TabsList>

            {Object.entries(courses).map(([courseKey, course]) => (
              <TabsContent key={courseKey} value={courseKey} className="space-y-6">
                {/* Configurações do Curso */}
                <Card className="bg-gray-800/30 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Configurações do Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${courseKey}-name`} className="text-white">
                        Nome do Curso
                      </Label>
                      <Input
                        id={`${courseKey}-name`}
                        value={course.name}
                        onChange={(e) => updateCourse(courseKey, "name", e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${courseKey}-playlist`} className="text-white">
                        URL da Playlist
                      </Label>
                      <Input
                        id={`${courseKey}-playlist`}
                        value={course.playlist}
                        onChange={(e) => updateCourse(courseKey, "playlist", e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="https://youtube.com/playlist?list=..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Vídeos do Curso */}
                <Card className="bg-gray-800/30 border-gray-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Vídeos do Curso</CardTitle>
                      <Button
                        onClick={() => addVideo(courseKey)}
                        size="sm"
                        className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Vídeo
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.videos.map((video, index) => (
                      <Card key={video.id} className="bg-gray-700/30 border-gray-600/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-white font-medium">Vídeo {index + 1}</h4>
                            <Button
                              onClick={() => removeVideo(courseKey, video.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-white">Título</Label>
                              <Input
                                value={video.title}
                                onChange={(e) => updateVideo(courseKey, video.id, "title", e.target.value)}
                                className="bg-gray-800/50 border-gray-700 text-white"
                                placeholder="Título do vídeo"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white">ID do YouTube</Label>
                              <Input
                                value={video.youtubeId}
                                onChange={(e) => updateVideo(courseKey, video.id, "youtubeId", e.target.value)}
                                className="bg-gray-800/50 border-gray-700 text-white"
                                placeholder="Ex: Wd-Iq9gKZQw"
                              />
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <Label className="text-white">Descrição</Label>
                            <Textarea
                              value={video.description}
                              onChange={(e) => updateVideo(courseKey, video.id, "description", e.target.value)}
                              className="bg-gray-800/50 border-gray-700 text-white"
                              placeholder="Descrição do vídeo"
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {course.videos.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhum vídeo adicionado ainda</p>
                        <p className="text-sm">Clique em "Adicionar Vídeo" para começar</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Botão Salvar */}
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
                  Salvar Cursos
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
