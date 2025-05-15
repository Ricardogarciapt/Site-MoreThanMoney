import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function CopytradingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600">
              Copytrading MoreThanMoney
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Copie automaticamente as operações dos nossos traders profissionais e obtenha resultados consistentes sem
              precisar operar manualmente.
            </p>
            <Link href="/member-area">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-3 rounded-md">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Escolha o Plano Ideal para Você</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Oferecemos diferentes planos para atender às suas necessidades de investimento. Quanto maior o plano, mais
              traders você pode seguir simultaneamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <Card className="bg-gray-900 border-gray-800 hover:border-gold-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-center">Plano Básico</CardTitle>
                <CardDescription className="text-center">Para investidores iniciantes</CardDescription>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-white">R$ 97</span>
                  <span className="text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acesso a 1 trader</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Cópia automática de operações</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Suporte por email</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Relatórios mensais</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/member-area" className="w-full">
                  <Button className="w-full bg-gray-800 hover:bg-gold-600 hover:text-black transition-colors">
                    Selecionar Plano
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plano Premium */}
            <Card className="bg-gradient-to-b from-gray-900 to-gray-900 border-gold-500 transform scale-105 shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold-600 text-black px-4 py-1 rounded-full text-sm font-bold">
                MAIS POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-center">Plano Premium</CardTitle>
                <CardDescription className="text-center">Para investidores intermediários</CardDescription>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-white">R$ 197</span>
                  <span className="text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acesso a 3 traders</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Cópia automática de operações</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Relatórios semanais</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Configurações personalizadas</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/member-area" className="w-full">
                  <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">Selecionar Plano</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plano VIP */}
            <Card className="bg-gray-900 border-gray-800 hover:border-gold-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-center">Plano VIP</CardTitle>
                <CardDescription className="text-center">Para investidores avançados</CardDescription>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-white">R$ 397</span>
                  <span className="text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acesso a 7 traders</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Cópia automática de operações</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Suporte VIP 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Relatórios diários</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Configurações avançadas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acesso a traders exclusivos</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/member-area" className="w-full">
                  <Button className="w-full bg-gray-800 hover:bg-gold-600 hover:text-black transition-colors">
                    Selecionar Plano
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona o Copytrading</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Nosso sistema de copytrading é simples e eficiente. Siga estes passos para começar a copiar os melhores
              traders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-gold-600 text-black rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Escolha um Plano</h3>
              <p className="text-gray-400">
                Selecione o plano que melhor atende às suas necessidades de investimento e orçamento.
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-gold-600 text-black rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Configure sua Conta</h3>
              <p className="text-gray-400">
                Conecte sua conta de corretora ao nosso sistema através da área de membros.
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-gold-600 text-black rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Comece a Copiar</h3>
              <p className="text-gray-400">
                Selecione os traders que deseja seguir e deixe nosso sistema copiar automaticamente as operações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Tire suas dúvidas sobre o nosso serviço de copytrading.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Preciso ter experiência em trading?</h3>
              <p className="text-gray-400">
                Não, nosso sistema é projetado para ser acessível tanto para iniciantes quanto para traders experientes.
                Você não precisa ter conhecimento prévio em trading para utilizar o copytrading.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Quais corretoras são compatíveis?</h3>
              <p className="text-gray-400">
                Nosso sistema é compatível com as principais corretoras que utilizam a plataforma MetaTrader 4 e
                MetaTrader 5, incluindo XM, IC Markets, FBS, Exness, entre outras.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Posso cancelar minha assinatura a qualquer momento?</h3>
              <p className="text-gray-400">
                Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. O acesso ao serviço
                permanecerá ativo até o final do período pago.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Qual é o capital mínimo recomendado?</h3>
              <p className="text-gray-400">
                Recomendamos um capital mínimo de US$ 500 para começar a utilizar o copytrading, mas você pode começar
                com qualquer valor que sua corretora permita.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar a Lucrar com Copytrading?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Junte-se a milhares de investidores que estão transformando sua experiência de trading com nossa
              plataforma.
            </p>
            <Link href="/member-area">
              <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium px-8 py-3 rounded-md">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
