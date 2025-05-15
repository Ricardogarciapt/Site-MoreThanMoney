"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Users, Brain } from "lucide-react"
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
          <TabsTrigger value="affiliation" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            <Users size={16} className="mr-2" />
            Negócio de Afiliação
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
                <CardHeader>
                  <CardTitle className="text-lg">Módulo 1: Fundamentos do Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Introdução aos mercados financeiros, tipos de análise e configuração da plataforma de trading.
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
                  <CardTitle className="text-lg">Módulo 2: Análise Técnica Básica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Identificação de tendências, suportes e resistências, e padrões de candles básicos.
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
                  <CardTitle className="text-lg">Módulo 3: Estruturas de Mercado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Compreensão das estruturas de mercado, identificação de pontos de entrada e saída.
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

        {/* Negócio de Afiliação */}
        <TabsContent value="affiliation" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="rounded-lg overflow-hidden mb-4 aspect-video relative">
                  <Image src="/affiliate-marketing-concept.png" alt="Negócio de Afiliação" fill className="object-cover" />
                </div>
                <CardTitle>Como Construir um Negócio de Afiliação</CardTitle>
                <CardDescription>
                  Aprenda a construir um negócio lucrativo como afiliado da Jifu e da MoreThanMoney.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Módulos:</span>
                    <span>8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duração:</span>
                    <span>16 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nível:</span>
                    <span>Todos os níveis</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">O que você vai aprender:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Fundamentos do marketing de afiliados</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Como criar conteúdo que converte</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Estratégias de tráfego pago e orgânico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Construção de funil de vendas eficiente</span>
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
                  <CardTitle className="text-lg">Módulo 1: Introdução ao Marketing de Afiliados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Conceitos básicos, como funciona o programa de afiliados da Jifu e MoreThanMoney.
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
                  <CardTitle className="text-lg">Módulo 2: Criação de Conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Como criar conteúdo atrativo e persuasivo para diferentes plataformas.
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
                  <CardTitle className="text-lg">Módulo 3: Estratégias de Tráfego</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Como gerar tráfego qualificado através de redes sociais, SEO e anúncios pagos.
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
              <span>Negócio de Afiliação</span>
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

      <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-6">
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
