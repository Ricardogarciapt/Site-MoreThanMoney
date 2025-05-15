"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Users, Brain, PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MoreThanMoneyCourses() {
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
                <div className="rounded-lg overflow-hidden mb-4 aspect-video relative">
                  <Image src="/placeholder-ckgdy.png" alt="Bootcamp MoreThanMoney" fill className="object-cover" />
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
                    <span>12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duração:</span>
                    <span>24 horas</span>
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
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                  Acessar Curso <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <PlayCircle size={20} className="mr-2 text-gold-500" />
                    Aula 1: Introdução ao Trading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-2">
                    Visão geral dos mercados financeiros e como funciona o trading.
                  </p>
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>Duração: 45 min</span>
                    <span>Concluído: Sim</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                    Rever Aula
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <PlayCircle size={20} className="mr-2 text-gold-500" />
                    Aula 2: Estruturas de Mercado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-2">
                    Identificação de estruturas de mercado e pontos de entrada/saída.
                  </p>
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>Duração: 52 min</span>
                    <span>Concluído: Em progresso</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                    Continuar Aula
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <PlayCircle size={20} className="mr-2 text-gold-500" />
                    Aula 3: Análise de Tendências
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-2">
                    Como identificar e analisar tendências de mercado para operações mais precisas.
                  </p>
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>Duração: 48 min</span>
                    <span>Concluído: Não</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                    Iniciar Aula
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Módulos da Segunda Playlist</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-md flex items-center">
                    <PlayCircle size={18} className="mr-2 text-gold-500" />
                    Padrões de Candles
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-300">
                    Identificação e interpretação de padrões de candles japoneses.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10"
                  >
                    Ver Aula
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-md flex items-center">
                    <PlayCircle size={18} className="mr-2 text-gold-500" />
                    Suporte e Resistência
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-300">Como identificar e utilizar níveis de suporte e resistência.</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10"
                  >
                    Ver Aula
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-md flex items-center">
                    <PlayCircle size={18} className="mr-2 text-gold-500" />
                    Fibonacci Retracement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-300">Aplicação da sequência de Fibonacci na análise técnica.</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10"
                  >
                    Ver Aula
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-md flex items-center">
                    <PlayCircle size={18} className="mr-2 text-gold-500" />
                    Médias Móveis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-300">
                    Estratégias de trading com médias móveis simples e exponenciais.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10"
                  >
                    Ver Aula
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-md flex items-center">
                    <PlayCircle size={18} className="mr-2 text-gold-500" />
                    Gestão de Risco
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-300">Técnicas de gestão de risco e dimensionamento de posições.</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10"
                  >
                    Ver Aula
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-md flex items-center">
                    <PlayCircle size={18} className="mr-2 text-gold-500" />
                    Psicologia do Trading
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-300">Aspectos psicológicos e emocionais do trading.</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10"
                  >
                    Ver Aula
                  </Button>
                </CardFooter>
              </Card>
            </div>
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
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                  Iniciar Nível 1 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="rounded-lg overflow-hidden mb-4 aspect-video relative">
                  <Image src="/placeholder-1k6bt.png" alt="Inteligência Artificial" fill className="object-cover" />
                </div>
                <CardTitle>Educação de Inteligência Artificial</CardTitle>
                <CardDescription>
                  Aprenda a utilizar a inteligência artificial para melhorar seus resultados no trading e nos negócios.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Módulos:</span>
                    <span>10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duração:</span>
                    <span>20 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nível:</span>
                    <span>Intermediário</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">O que você vai aprender:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Fundamentos da inteligência artificial e machine learning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Aplicações da IA no trading e análise de mercado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Criação de modelos preditivos para trading</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Automação de processos com IA</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                  Acessar Curso <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Módulo 1: Introdução à Inteligência Artificial</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Conceitos básicos de IA, machine learning e deep learning aplicados ao mercado financeiro.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                    Continuar Módulo
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Módulo 2: IA na Análise de Mercado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Como utilizar ferramentas de IA para identificar padrões e tendências no mercado.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                    Iniciar Módulo
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Módulo 3: Modelos Preditivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Desenvolvimento de modelos preditivos para previsão de preços e tendências de mercado.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500/10">
                    Iniciar Módulo
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-black/50 border border-gold-500/30 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold mb-4">Seu Progresso</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Bootcamp MoreThanMoney</span>
              <span>25%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-gold-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Programa de Educação de Distribuidores</span>
              <span>10%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-gold-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Inteligência Artificial</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-gold-500 h-2.5 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>
      </div>

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
