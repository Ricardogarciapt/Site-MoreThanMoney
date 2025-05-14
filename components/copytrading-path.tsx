"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check, Download, ExternalLink, Play } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CopytradingPath() {
  const [step, setStep] = useState<"intro" | "account" | "confirmation" | "setup">("intro")
  const [accountNumber, setAccountNumber] = useState("")

  const handleContinue = () => {
    if (step === "intro") {
      setStep("account")
    } else if (step === "account") {
      setStep("confirmation")
    } else if (step === "confirmation") {
      setStep("setup")
    }
  }

  return (
    <section className="relative min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Copytrading MoreThanMoney
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Automatize seus investimentos com nossas estratégias comprovadas.
          </p>
        </div>

        {step === "intro" && (
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black/50 border border-gold-500/30 rounded-xl overflow-hidden mb-8">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-gold-500" />
                  </div>
                  <p className="text-gray-400">Vídeo de Apresentação do Copytrading</p>
                </div>
              </div>
            </div>

            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Estratégias Disponíveis</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-white/5">
                    <h4 className="text-xl font-bold mb-2">Conservador</h4>
                    <p className="text-gray-300 mb-4">Estratégia de baixo risco com foco em consistência.</p>
                    <div className="text-2xl font-bold text-gold-400 mb-2">5% mensal</div>
                    <p className="text-sm text-gray-400">Depósito mínimo: 100€</p>
                  </div>

                  <div className="bg-gray-800/50 p-6 rounded-xl border border-white/5">
                    <h4 className="text-xl font-bold mb-2">Agressivo</h4>
                    <p className="text-gray-300 mb-4">Estratégia de alto risco com foco em retornos expressivos.</p>
                    <div className="text-2xl font-bold text-gold-400 mb-2">30% mensal</div>
                    <p className="text-sm text-gray-400">Depósito mínimo: 100€</p>
                  </div>

                  <div className="bg-gray-800/50 p-6 rounded-xl border border-white/5">
                    <h4 className="text-xl font-bold mb-2">VIP Manual</h4>
                    <p className="text-gray-300 mb-4">Gestão personalizada adaptada ao seu perfil.</p>
                    <div className="text-2xl font-bold text-gold-400 mb-2">10-15% mensal</div>
                    <p className="text-sm text-gray-400">Depósito mínimo: 1000€</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-bold mb-4">Performance Fee</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>30% (padrão)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>10-15% para fundadores ou clientes com packs Jifu</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={handleContinue}
                className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg"
              >
                Quero Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {step === "account" && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Criar Conta de Negociação</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Acesse a corretora parceira</h4>
                      <p className="text-gray-300 mb-2">
                        Clique no botão abaixo para acessar o site da corretora parceira e criar sua conta.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Preencha o formulário de registro</h4>
                      <p className="text-gray-300 mb-2">
                        Complete o formulário com seus dados pessoais e informações de contato.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Verifique sua identidade</h4>
                      <p className="text-gray-300 mb-2">
                        Complete o processo de verificação KYC (Conheça Seu Cliente) enviando os documentos solicitados.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Realize o depósito mínimo</h4>
                      <p className="text-gray-300 mb-2">
                        Faça um depósito mínimo de 100€ (ou 1000€ para a estratégia VIP) em sua conta.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Anote seu número de conta</h4>
                      <p className="text-gray-300 mb-2">
                        Após a criação da conta, anote o número da sua conta para o próximo passo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg">
                      Criar Conta na Corretora <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Já criou sua conta?</h3>
                <p className="text-gray-300 mb-6">
                  Insira o número da sua conta abaixo e clique em continuar para prosseguir com a configuração do
                  copytrading.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Número da Conta</Label>
                    <Input
                      id="account-number"
                      placeholder="Ex: 12345678"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="bg-gray-800/50 border-white/10 text-white"
                    />
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                    disabled={!accountNumber}
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "confirmation" && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-8">
              <CardContent className="p-8 text-center">
                <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-500" />
                </div>

                <h3 className="text-2xl font-bold mb-4">Conta Verificada</h3>
                <p className="text-gray-300 mb-8">
                  Sua conta número <span className="text-gold-400 font-bold">{accountNumber}</span> foi verificada com
                  sucesso. Agora vamos configurar o copytrading.
                </p>

                <Button
                  onClick={handleContinue}
                  className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg"
                >
                  Configurar Copytrading <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "setup" && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Configuração do Copytrading</h3>

                <div className="aspect-video bg-black/50 border border-gold-500/30 rounded-xl overflow-hidden mb-8">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                        <Play className="h-8 w-8 text-gold-500" />
                      </div>
                      <p className="text-gray-400">Vídeo de Configuração do Copytrading</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Baixe o manual de configuração</h4>
                      <p className="text-gray-300 mb-2">
                        Clique no botão abaixo para baixar o PDF com instruções detalhadas sobre como configurar o
                        copytrading na IXSocial.
                      </p>
                      <Button variant="outline" className="mt-2 border-gold-500 text-gold-400 hover:bg-gold-500/10">
                        <Download className="mr-2 h-4 w-4" /> Baixar Manual PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Acesse a plataforma IXSocial</h4>
                      <p className="text-gray-300 mb-2">
                        Faça login na plataforma IXSocial com as credenciais da sua conta.
                      </p>
                      <Button variant="outline" className="mt-2 border-gold-500 text-gold-400 hover:bg-gold-500/10">
                        <ExternalLink className="mr-2 h-4 w-4" /> Acessar IXSocial
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Configure as permissões</h4>
                      <p className="text-gray-300 mb-2">
                        Siga as instruções do vídeo e do PDF para configurar as permissões de copytrading.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Selecione sua estratégia</h4>
                      <p className="text-gray-300 mb-2">
                        Escolha entre as estratégias Conservadora, Agressiva ou VIP Manual de acordo com seu perfil de
                        risco.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Ative o copytrading</h4>
                      <p className="text-gray-300 mb-2">Finalize a configuração ativando o copytrading em sua conta.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-300 mb-4">Precisa de ajuda? Entre em contato com nosso suporte.</p>
                  <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium">Contatar Suporte</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
