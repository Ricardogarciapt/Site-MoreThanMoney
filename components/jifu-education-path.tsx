"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useConfigStore } from "@/lib/config-service"
import { ArrowRight } from "lucide-react"

export default function JifuEducationPath() {
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const { config } = useConfigStore()
  const [jifuAffiliateLink, setJifuAffiliateLink] = useState(
    config.affiliateLinks?.jifuAffiliateLink || "https://ricardogarcia.jifu.com",
  )

  // Atualizar o link quando a configuração mudar
  useEffect(() => {
    if (config.affiliateLinks?.jifuAffiliateLink) {
      setJifuAffiliateLink(config.affiliateLinks.jifuAffiliateLink)
    }
  }, [config.affiliateLinks?.jifuAffiliateLink])

  const handleRegisterClick = () => {
    // Parar o vídeo quando o usuário clica para se registrar
    setVideoPlaying(false)

    // Garantir que o link comece com https://
    let secureLink = jifuAffiliateLink
    if (!secureLink.startsWith("http")) {
      secureLink = "https://" + secureLink
    } else if (secureLink.startsWith("http://")) {
      secureLink = secureLink.replace("http://", "https://")
    }

    // Abrir a página de registro da JIFU em uma nova aba com o link de afiliação configurado
    window.open(secureLink, "_blank", "noopener,noreferrer")
  }

  const registrationSteps = [
    {
      number: "1",
      title: 'Clique em "Registrar Já"',
      description: 'Clique no botão "Registrar na JIFU" abaixo para ser direcionado ao site oficial da JIFU.',
    },
    {
      number: "2",
      title: 'Selecione "Começar uma Conta de Cliente"',
      description:
        'Na página de registro da JIFU, escolha a opção "Começar uma Conta de Cliente" para iniciar o processo.',
    },
    {
      number: "3",
      title: "Escolha o Pacote Desejado",
      description:
        "Selecione um dos pacotes disponíveis (GO, GROW ou GLOBAL) de acordo com suas necessidades e orçamento.",
    },
    {
      number: "4",
      title: "Preencha seus Dados e Proceda ao Pagamento",
      description:
        "Complete o formulário com suas informações pessoais e realize o pagamento através dos métodos disponíveis.",
    },
    {
      number: "5",
      title: "Contato do Patrocinador",
      description:
        "Após finalizar o registro, você será contactado pelo seu patrocinador para iniciar o processo de início rápido e orientação na plataforma.",
    },
  ]

  const plans = [
    {
      name: "GO",
      price: "€299,99",
      monthly: "+ €169,99/mês",
      features: [
        "JIFU Travel Portal Access (4 semanas)",
        "Acesso a JIFU Live All Educational Courses* (4 semanas)",
        "50 Free Trial Passes por mês",
        "Acesso ao JIFU Compensation Plan",
        "1 Complimentary Vacation Voucher",
        "$50 First Order Bonus to the Sponsor",
      ],
      buttonText: "Selecionar GO",
      popular: false,
    },
    {
      name: "GROW",
      price: "€1.000",
      monthly: "+ €169,99/mês",
      features: [
        "JIFU Travel Portal Access (4 semanas)",
        "Acesso a JIFU Live All Educational Courses* & FX Global Ideas* for (4 semanas)",
        "100 Free Trial Passes por mês",
        "Acesso ao JIFU Compensation Plan",
        "2 Complimentary Vacation Vouchers",
        "$200 First Order Bonus to the Sponsor",
      ],
      buttonText: "Selecionar GROW",
      popular: true,
    },
    {
      name: "GLOBAL",
      price: "€2.500",
      monthly: "+ €169,99/mês",
      features: [
        "JIFU Travel Portal Access (4 semanas)",
        "Acesso a JIFU Live All Educational Courses* & FX Global Ideas* for (4 semanas)",
        "Unlimited Free Trial Passes por mês",
        "Acesso ao JIFU Compensation Plan",
        "3 Complimentary Vacation Vouchers",
        "$400 First Order Bonus to the Sponsor",
      ],
      buttonText: "Selecionar GLOBAL",
      popular: false,
    },
  ]

  const benefits = [
    "Acesso a mais diversos cursos especializados",
    "Comunidade de traders e investidores",
    "Webinars semanais com especialistas dentro e fora da plataforma",
    "Suporte personalizado para iniciantes com início rápido",
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      location: "Lisboa, Portugal",
      text: "A formação JIFU mudou completamente a minha perspectiva sobre investimentos. Os cursos são muito práticos e o suporte é excelente!",
      rating: 5,
    },
    {
      name: "João Santos",
      location: "Porto, Portugal",
      text: "Excelente plataforma! Consegui aprender trading de forma estruturada e já estou a ver resultados positivos.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      location: "Braga, Portugal",
      text: "O acesso aos cursos de IA e e-commerce através da JIFU foi fundamental para expandir o meu negócio online.",
      rating: 5,
    },
    {
      name: "Pedro Oliveira",
      location: "Coimbra, Portugal",
      text: "A comunidade de traders é fantástica. Aprendo algo novo todos os dias com os webinars e discussões.",
      rating: 5,
    },
    {
      name: "Carla Ferreira",
      location: "Faro, Portugal",
      text: "Recomendo a todos! A qualidade dos cursos e o suporte personalizado fazem toda a diferença.",
      rating: 5,
    },
    {
      name: "Ricardo Mendes",
      location: "Aveiro, Portugal",
      text: "Investimento que vale a pena. Em poucos meses já recuperei o valor investido com os conhecimentos adquiridos.",
      rating: 5,
    },
  ]

  const [currentTestimonials, setCurrentTestimonials] = useState(testimonials.slice(0, 3))

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
      setCurrentTestimonials(shuffled.slice(0, 3))
    }, 8000) // Change testimonials every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center" id="jifu-education">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <Image src="/logo-new.png" alt="MoreThanMoney Logo" width={220} height={180} className="mx-auto" />
        </div>
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
            {/* Vídeo do YouTube */}
            <div className="rounded-lg overflow-hidden border border-gold-500/30 mb-8 relative aspect-video">
              <iframe
                ref={videoRef}
                src={`https://www.youtube.com/embed/iV6M9weCnmA?autoplay=1&controls=0&mute=0&loop=0&modestbranding=1&showinfo=0&rel=0&fs=0&playsinline=1${videoPlaying ? "" : "&enablejsapi=1"}`}
                title="Apresentação JIFU"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
              ></iframe>
            </div>

            {/* Botão Principal de Registro */}
            <div className="text-center">
              <button
                onClick={handleRegisterClick}
                className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-12 py-4 text-xl rounded-md transform transition-transform duration-300 hover:scale-105"
              >
                Registrar na JIFU
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Como Registrar-se na JIFU */}
        <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">Como Registrar-se na JIFU</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {registrationSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold-600 text-black rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={handleRegisterClick}
                className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-8 py-3 rounded-md inline-flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
              >
                <span>Registrar na JIFU</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Planos de Educação JIFU */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Planos de Educação JIFU</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-black/50 border-gold-500/30 backdrop-blur-sm relative ${plan.popular ? "ring-2 ring-gold-500" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gold-600 text-black font-bold px-4 py-1">POPULAR</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-gold-400 mb-1">{plan.price}</div>
                    <div className="text-sm text-gray-400">{plan.monthly}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleRegisterClick}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black font-bold py-3 rounded-md transform transition-transform duration-300 hover:scale-105"
                  >
                    {plan.buttonText}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            *May vary from market to market. Go to your Web Office to see the details
          </p>
        </div>

        {/* Benefícios e Como Começar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Benefícios da Formação JIFU */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Benefícios da Formação JIFU</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Como Começar */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Como Começar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Registre-se na plataforma JIFU para acessar todos os cursos e recursos disponíveis. Após o registro,
                você terá acesso imediato a todo o conteúdo.
              </p>
              <button
                onClick={handleRegisterClick}
                className="w-full bg-gold-600 hover:bg-gold-700 text-black font-bold py-3 rounded-md inline-flex items-center justify-center space-x-2 transform transition-transform duration-300 hover:scale-105"
              >
                <span>Registrar na JIFU</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Testemunhos */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">O que dizem os nossos membros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial, index) => (
              <Card key={`${testimonial.name}-${index}`} className="bg-black/30 border-gold-500/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-gold-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t border-gold-500/20 pt-4">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
