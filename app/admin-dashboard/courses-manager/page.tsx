"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import ClientWrapper from "./client-wrapper"

const CoursesManagerClient = dynamic(() => import("./courses-manager-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando gerenciador de cursos...</p>
      </div>
    </div>
  ),
})

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold-400 font-medium">Carregando gerenciador de cursos...</p>
        </div>
      </div>
    )
  }

  return <ClientWrapper />
}
