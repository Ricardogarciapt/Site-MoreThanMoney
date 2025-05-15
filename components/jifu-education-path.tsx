"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function JifuEducationPath() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Formação JIFU
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Acede a cursos especializados em trading, investimentos, e-commerce, IA e muito mais através da plataforma
            JIFU.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            {/* Prévia da plataforma JIFU */}
            <div className="rounded-lg overflow-hidden border border-gold-500/30 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-05-15%2C%20a%CC%80s%2012.02.39-nLrQHYaDBITdi8yHldaqNrPH2116L1.png"
                alt="Plataforma JIFU Academy"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Benefícios da Formação JIFU</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Acesso a mais diversos cursos especializados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Comunidade de traders e investidores</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Webinars semanais com especialistas dentro e fora da plataforma</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>Suporte personalizado para iniciantes com inicio rápido</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Como Começar</h3>
                <p className="text-gray-300">
                  Registre-se na plataforma JIFU para acessar todos os cursos e recursos disponíveis. Após o registro,
                  você terá acesso imediato a todo o conteúdo.
                </p>
                <div className="pt-4">
                  <Link href="https://jifu.com" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">
                      Registrar na JIFU <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scanners JIFU */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Scanners JIFU para Trading
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            A plataforma JIFU oferece diversos scanners avançados para melhorar sua análise técnica e resultados no
            trading.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            {/* Prévia dos scanners JIFU */}
            <div className="rounded-lg overflow-hidden border border-gold-500/30 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-05-15%2C%20a%CC%80s%2012.04.02-jWz0dwacl9wBVrdKFpRg9kl4PVRECS.png"
                alt="Scanners JIFU"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Scanners Disponíveis</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">1</span>
                    </div>
                    <div>
                      <span className="font-bold">GOLDEN ERA SCANNER</span>
                      <p className="text-gray-300 text-sm">
                        Identifica padrões de alta probabilidade em mercados de tendência
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">2</span>
                    </div>
                    <div>
                      <span className="font-bold">TREND WAVE SCANNER</span>
                      <p className="text-gray-300 text-sm">Analisa ondas de tendência e pontos de reversão</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">3</span>
                    </div>
                    <div>
                      <span className="font-bold">SMART SCANNER</span>
                      <p className="text-gray-300 text-sm">
                        Utiliza inteligência artificial para identificar oportunidades
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span className="text-gold-500 text-xs">4</span>
                    </div>
                    <div>
                      <span className="font-bold">SMARTMONICS SCANNER</span>
                      <p className="text-gray-300 text-sm">
                        Identifica momentos de transição entre mercados de alta e baixa
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Vantagens dos Scanners</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Análise em tempo real de múltiplos pares</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Identificação automática de padrões e estruturas de mercado</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Alertas personalizáveis para oportunidades de entrada</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Compatível com múltiplos timeframes e instrumentos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Integração com a plataforma TradingView Diretamente na Plataforma</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notícias e Dados de Mercado JIFU */}
        <div className="text-center max-w-3xl mx-auto my-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Notícias e Dados de Mercado em Tempo Real
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Mantenha-se atualizado com as últimas notícias financeiras e dados de mercado diretamente na plataforma
            JIFU.
          </p>
        </div>

        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            {/* Prévia das notícias e dados de mercado JIFU */}
            <div className="rounded-lg overflow-hidden border border-gold-500/30 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-05-15%2C%20a%CC%80s%2012.05.50-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png"
                alt="Notícias e Dados de Mercado JIFU"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Informações de Mercado</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Cotações em tempo real de moedas, criptomoedas e índices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Tabelas de correlação entre diferentes pares de moedas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Calendário econômico com eventos importantes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Integração com TradingView para análises avançadas</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Notícias Financeiras</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Notícias atualizadas sobre mercados globais</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Análises de especialistas sobre tendências de mercado</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Alertas sobre movimentos significativos de preços</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                    <span>Cobertura de eventos econômicos importantes</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pacotes de Upgrade JIFU */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Pacotes de Upgrade JIFU
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Escolha o pacote que melhor se adapta às suas necessidades e objetivos de aprendizado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Pacote Básico */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Pacote Básico</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">€99</span>
                <span className="text-gray-400 ml-2">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso a Jifulive.com</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Scanners e FX Global Ideias e app JIFUCONNECT</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso a portal de Viagens</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso a criação de Negócio Online</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="https://morethanmoney.jifu.com" className="w-full" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Escolher Pacote Básico</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pacote Premium */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold-500 text-black px-4 py-1 text-sm font-bold">POPULAR</div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Pacote Premium</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">€199</span>
                <span className="text-gray-400 ml-2">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso a todos os cursos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Todos os scanners disponíveis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Webinars semanais</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Mentoria mensal (1 hora)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="https://jifu.com/premium" className="w-full" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Escolher Pacote Premium</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pacote VIP */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm hover:border-gold-500/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Pacote VIP</CardTitle>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gold-500">€299</span>
                <span className="text-gray-400 ml-2">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso a todos os cursos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Todos os scanners disponíveis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Webinars exclusivos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Suporte VIP 24/7</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Mentoria semanal (1 hora)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0 mt-0.5" />
                  <span>Acesso ao grupo VIP de traders</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="https://jifu.com/vip" className="w-full" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black w-full">Escolher Pacote VIP</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
