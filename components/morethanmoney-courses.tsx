"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Users, Brain, PlayCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { canAccessStreams, getUpgradeMessage } from "@/lib/permissions"

export default function MoreThanMoneyCourses() {
  // URL da playlist
  const playlistUrl = "https://youtube.com/playlist?list=PL6XU0y2YUMZLpIsO63P_E6w4OCY8Y467m&si=Ok6-0Ast2Y8DYU5i"
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { user, isAuthenticated } = useAuth()

  const hasStreamAccess = canAccessStreams(user, isAuthenticated)

  // Lista de vídeos da playlist com títulos reais
  const playlistVideos = [
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
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 2 - Estratégias de Entrada",
      description: "Técnicas para identificar pontos de entrada com alta probabilidade de sucesso.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 2 - Gestão de Risco",
      description: "Princípios e práticas para gerenciar riscos em operações de trading.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 2 - Psicologia do Trading",
      description: "Aspectos psicológicos e emocionais que afetam as decisões de trading.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 3 - Scanner MTM: Configuração Básica",
      description: "Como configurar e utilizar as funcionalidades básicas do Scanner MoreThanMoney.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 3 - Scanner MTM: Funcionalidades Avançadas",
      description: "Explorando recursos avançados do Scanner para identificar oportunidades de mercado.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 3 - Aplicação Prática do Scanner",
      description: "Casos de uso reais e exemplos práticos de operações com o Scanner MTM.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 4 - Estratégias de Saída",
      description: "Técnicas para determinar pontos de saída e maximizar lucros.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 4 - Análise de Resultados",
      description: "Como analisar e aprender com seus resultados de trading.",
    },
    {
      id: "Wd-Iq9gKZQw",
      title: "Módulo 4 - Plano de Trading Profissional",
      description: "Desenvolvimento de um plano de trading completo e personalizado.",
    },
  ]

  // Função para inscrever o usuário na lista de e-mails
  const subscribeToMailingList = () => {
    // Em produção, aqui seria uma chamada API para salvar o e-mail do usuário
    // Simulação de inscrição bem-sucedida
    console.log("Inscrevendo usuário:", user?.email || "Usuário não autenticado")

    // Marcar como inscrito
    setIsSubscribed(true)

    // Em um ambiente real, você enviaria os dados para seu backend
    // fetch('/api/subscribe', {
    //   method: 'POST',
    //   body: JSON.stringify({ email: user?.email }),
    //   headers: { 'Content-Type': 'application/json' }
    // })
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="bootcamp" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gold-500/30">
          <TabsTrigger value="bootcamp" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <BookOpen size={16} className="mr-2" />
            Bootcamp MoreThanMoney
          </TabsTrigger>
          <TabsTrigger value="distributor" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <Users size={16} className="mr-2" />
            Educação de Distribuidores
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <Brain size={16} className="mr-2" />
            Inteligência Artificial
          </TabsTrigger>
        </TabsList>

        {/* Bootcamp MoreThanMoney */}
        <TabsContent value="bootcamp" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="rounded-lg overflow-hidden mb-4 aspect-video relative bg-gray-900 flex items-center justify-center">
                  {hasStreamAccess ? (
                    <iframe
                      src="https://www.youtube.com/embed/videoseries?list=PL6XU0y2YUMZLpIsO63P_E6w4OCY8Y467m"
                      title="Bootcamp MoreThanMoney"
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <span className="text-4xl">🔒</span>
                      <p className="text-sm text-gray-400">{getUpgradeMessage("streams")}</p>
                    </div>
                  )}
                </div>
                <CardTitle>Bootcamp MoreThanMoney: Do Iniciante ao Experiente</CardTitle>
                <CardDescription>
                  Um curso completo que leva você do conhecimento básico até estratégias avançadas de trading.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Módulos:</span>
                    <span>4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vídeos:</span>
                    <span>{playlistVideos.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nível:</span>
                    <span>Iniciante a Avançado</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">O que você vai aprender:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Fundamentos de análise técnica e estruturas de mercado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Estratégias de entrada e saída com alta probabilidade</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Gestão de risco e psicologia do trading</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Uso avançado do Scanner MTM</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={playlistUrl} target="_blank" className="w-full">
                  <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                    Acessar Curso Completo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Vídeos do Bootcamp</CardTitle>
                <CardDescription>Clique em um vídeo para assistir diretamente no YouTube</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto pr-2">
                <ul className="space-y-3">
                  {playlistVideos.map((video, index) => (
                    <li key={index} className="border-b border-gray-700 pb-3 last:border-0">
                      <Link href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" className="group">
                        <div className="flex items-start">
                          <PlayCircle size={20} className="mr-2 mt-1 text-gold-500 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium group-hover:text-gold-400 transition-colors">{video.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{video.description}</p>
                          </div>
                          <ExternalLink
                            size={16}
                            className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={playlistUrl} target="_blank" className="w-full">
                  <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                    Ver Playlist Completa
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Programa de Educação de Distribuidores JIFU */}
        <TabsContent value="distributor" className="mt-6">
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Programa de Educação de Distribuidores JIFU</CardTitle>
              <CardDescription>Baseado no livro Go Pro de Eric Worre, conforme normativa da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2 text-gold-500">🎯 Objetivo:</h3>
                <p className="text-gray-300">
                  Formar distribuidores profissionais, éticos e eficazes, capazes de construir equipas, apoiar clientes
                  e promover produtos com foco em educação e liderança.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2 text-gold-500">
                  📚 Estrutura do Programa – 3 Níveis de Progressão
                </h3>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nível 1 */}
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center mr-3">
                    <span className="text-gold-500 font-bold">1</span>
                  </div>
                  Início Profissional
                </CardTitle>
                <CardDescription>"Torna-te Profissional"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Duração:</p>
                    <p>1-2 semanas</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Objetivo:</p>
                    <p>Capacitar o novo distribuidor a dar os primeiros passos com clareza e confiança.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conteúdo:</p>
                    <ul className="space-y-1 mt-1">
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>📘 O que é o Marketing de Rede Profissional (Go Pro – Cap. 1)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>💡 A filosofia JIFU e o modelo 25/50/25</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>🗣️ Como contar a tua história em 2 minutos (storytelling pessoal)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>🧭 Identificação dos 3 tipos de contactos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>💸 Apresentação do plano de compensação e produtos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>🧰 Ferramentas básicas da JIFU</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Missão:</p>
                    <p>Convidar 10 pessoas com equilíbrio:</p>
                    <ul className="space-y-1 mt-1">
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>5 Clientes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>2-3 Promotores</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>2-3 Distribuidores</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="https://youtube.com/playlist?list=PL6XU0y2YUMZI3mi9RSpEmsO5V90b9lbZS&si=zSLzr9qid4CdQHRd"
                  target="_blank"
                  className="w-full"
                >
                  <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                    Iniciar Nível 1 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Nível 2 */}
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center mr-3">
                    <span className="text-gold-500 font-bold">2</span>
                  </div>
                  Desenvolvimento de Competência
                </CardTitle>
                <CardDescription>"As 7 Habilidades"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Duração:</p>
                    <p>4-6 semanas</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Objetivo:</p>
                    <p>Ensinar as 7 habilidades essenciais do marketing de rede profissional.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conteúdo:</p>
                    <ol className="space-y-1 mt-1 list-decimal list-inside">
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">1.</span>
                        <span>🔍 Encontrar potenciais contactos (prospeção ética)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">2.</span>
                        <span>📞 Convidar para conhecer o negócio</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">3.</span>
                        <span>🧑‍💻 Apresentar eficazmente a oportunidade</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">4.</span>
                        <span>⏱️ Dar seguimento com profissionalismo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">5.</span>
                        <span>✅ Ajudar a tomar decisões</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">6.</span>
                        <span>🤝 Formar novos associados</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">7.</span>
                        <span>📢 Promover eventos</span>
                      </li>
                    </ol>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Inclui:</p>
                    <ul className="space-y-1 mt-1">
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>🎭 Role plays semanais (simulações)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>🎙️ Webinars com líderes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>📅 Check-ins semanais com mentor</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black" disabled>
                  Iniciar Nível 2 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Nível 3 */}
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center mr-3">
                    <span className="text-gold-500 font-bold">3</span>
                  </div>
                  Liderança e Expansão
                </CardTitle>
                <CardDescription>"Duplar, duplicar, liderar"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Duração:</p>
                    <p>Contínuo</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Objetivo:</p>
                    <p>Transformar distribuidores em líderes multiplicadores com equipas sustentáveis.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conteúdo:</p>
                    <ul className="space-y-1 mt-1">
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>🧩 Construção e gestão de equipas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>🔁 Sistema de duplicação baseado em ferramentas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>⚙️ Treino de promotores e clientes para transição gradual</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>📆 Criação de eventos locais e online</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>❤️ Liderança servidora e cultura de equipa</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Métrica:</p>
                    <p>Cada líder forma:</p>
                    <ul className="space-y-1 mt-1">
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>3 novos distribuidores</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold-500 mr-2">•</span>
                        <span>6 novos clientes/promotores</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black" disabled>
                  Iniciar Nível 3 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Modelo de Crescimento */}
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">📊 Modelo de Crescimento – Regra 25/50/25</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Clientes (50%):</span>
                      <p className="text-gray-300">Foco em retenção e uso consistente dos produtos</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Promotores (25%):</span>
                      <p className="text-gray-300">Formação leve + incentivos por recomendação</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Distribuidores (25%):</span>
                      <p className="text-gray-300">Programa completo, visão de longo prazo</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Extras */}
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">🎁 Extras</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">🏅 Certificação e incentivo de término</span>
                      <p className="text-gray-300">Após completar os 3 níveis</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">🧑‍🤝‍🧑 Comunidade exclusiva de líderes</span>
                      <p className="text-gray-300">Grupo privado, masterminds</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">🌟 Plano de reconhecimento mensal e anual</span>
                      <p className="text-gray-300">Baseado em impacto real, não só volume</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Entrevista para representação oficial</span>
                      <p className="text-gray-300">Do corporativo da empresa</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inteligência Artificial */}
        <TabsContent value="ai" className="mt-6">
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-6 bg-gold-500/10 border border-gold-500/30 rounded-full px-6 py-2 inline-block">
                <span className="text-gold-400 font-semibold">EM BREVE</span>
              </div>
              <CardTitle className="text-2xl">Inteligência Artificial para Trading</CardTitle>
              <CardDescription className="text-lg mt-2">
                Estamos preparando um conteúdo exclusivo sobre como utilizar IA para potencializar seus resultados
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <div className="text-center max-w-2xl">
                <div className="mb-8">
                  <Brain size={80} className="mx-auto text-gold-500/60 mb-4" />
                  <p className="text-gray-300">
                    Aprenda a utilizar as mais avançadas ferramentas de inteligência artificial para análise de mercado,
                    previsão de tendências e automação de estratégias de trading.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/30 p-4 rounded-lg border border-gold-500/20">
                    <h4 className="font-medium text-gold-400 mb-2">Análise Preditiva</h4>
                    <p className="text-sm text-gray-400">Modelos de IA para prever movimentos de mercado</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-gold-500/20">
                    <h4 className="font-medium text-gold-400 mb-2">Trading Automatizado</h4>
                    <p className="text-sm text-gray-400">Sistemas inteligentes para execução de operações</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-gold-500/20">
                    <h4 className="font-medium text-gold-400 mb-2">Gestão de Risco</h4>
                    <p className="text-sm text-gray-400">Algoritmos avançados para otimização de portfolio</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button
                variant="outline"
                className="border-gold-500 text-gold-400 hover:bg-gold-500/10"
                onClick={() => setIsDialogOpen(true)}
              >
                Receber Notificação de Lançamento
              </Button>
            </CardFooter>

            {/* Dialog para inscrição na lista de e-mails */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="bg-black/90 border-gold-500/30 text-white">
                <DialogHeader>
                  <DialogTitle className="text-gold-400 text-xl">Notificação de Lançamento</DialogTitle>
                  <DialogDescription className="text-gray-300">
                    {!isSubscribed ? (
                      <>
                        Você será notificado quando o curso de Inteligência Artificial estiver disponível.
                        {user ? (
                          <div className="mt-4 p-3 bg-black/50 border border-gold-500/20 rounded-md">
                            <p className="text-sm">Seus dados de contato:</p>
                            <p className="font-medium mt-1">{user.name}</p>
                            <p className="text-gold-400">{user.email || "E-mail não disponível"}</p>
                          </div>
                        ) : (
                          <p className="mt-2 text-amber-400">Você precisa estar logado para receber notificações.</p>
                        )}
                      </>
                    ) : (
                      <div className="py-4">
                        <div className="flex items-center justify-center mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                        <p className="text-center text-lg font-medium">Inscrição realizada com sucesso!</p>
                        <p className="text-center text-gray-400 mt-2">
                          Você receberá uma notificação quando o curso estiver disponível.
                        </p>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
                {!isSubscribed && (
                  <DialogFooter>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-400 hover:bg-gray-800"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="bg-gold-600 hover:bg-gold-700 text-black"
                      onClick={subscribeToMailingList}
                      disabled={!user}
                    >
                      Confirmar Inscrição
                    </Button>
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-6 mt-6">
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold-500"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2">Precisa de ajuda?</h4>
            <p className="text-gray-300 mb-4">
              Se tiver dúvidas sobre os cursos ou precisar de suporte adicional, entre em contato com nossa equipe.
            </p>
            <Link href="/support">
              <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
                Contatar Suporte
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
