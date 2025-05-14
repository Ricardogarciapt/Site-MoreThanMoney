"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check, ExternalLink } from "lucide-react"

export default function JifuEducationPath() {
  const [step, setStep] = useState<"video" | "registration">("video")

  return (
    <section className="relative min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
            Educação com Jifu
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Acesso a formação completa em trading, investimentos, e-commerce, IA e muito mais.
          </p>
        </div>

        {step === "video" ? (
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black/50 border border-gold-500/30 rounded-xl overflow-hidden mb-8">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/iV6M9weCnmA"
                title="Apresentação Jifu"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="text-center">
              <Button
                onClick={() => setStep("registration")}
                className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg"
              >
                Quero Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Como Criar Sua Conta na Jifu</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Acesse o site oficial</h4>
                      <p className="text-gray-300 mb-2">
                        Visite o site oficial da Jifu através do link abaixo para iniciar seu cadastro.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Preencha seus dados</h4>
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
                      <h4 className="text-lg font-medium mb-2">Escolha seu pacote</h4>
                      <p className="text-gray-300 mb-2">
                        Selecione o pacote de entrada única de 299€ para ter acesso a todos os módulos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Realize o pagamento</h4>
                      <p className="text-gray-300 mb-2">
                        Efetue o pagamento através dos métodos disponíveis (cartão de crédito, transferência bancária,
                        etc.).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Acesse sua conta</h4>
                      <p className="text-gray-300 mb-2">
                        Após a confirmação do pagamento, você receberá as credenciais para acessar a plataforma.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a href="https://morethanmoney.jifu.com" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-6 text-lg">
                      Criar Conta na Jifu <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="bg-black/50 border border-gold-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Benefícios da Jifu</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>Acesso à app Jifu Connect com Tap2Trade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>Módulos completos em trading e investimentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>Formação em e-commerce e redes sociais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>Conteúdo sobre inteligência artificial aplicada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>Literacia financeira e imobiliário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>Possibilidade de upgrade para Pack Grow Digital</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
