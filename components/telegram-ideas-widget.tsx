"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Lock, MessageSquare, ExternalLink } from "lucide-react"
import TelegramWidget from "./telegram-widget"

export default function TelegramIdeasWidget() {
  const { user, isAuthenticated } = useAuth()

  // Verificar se o usuário pode acessar ideias premium
  const canAccessPremium =
    isAuthenticated &&
    user?.role &&
    [
      "Membro VIP",
      "Distribuidor",
      "Educador",
      "Liderança",
      "Rising Star",
      "Silver Manager",
      "Gold Manager",
      "Platinum Manager",
      "Elite",
      "Director",
      "Diamond",
      "Presidential",
    ].includes(user.role)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gold-500">Canal MoreThanMoney VIP</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Acesse em tempo real as análises, sinais e ideias de trading compartilhadas no nosso canal exclusivo do
          Telegram.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-400" />
                Canal MoreThanMoney VIP Telegram
              </CardTitle>
              <CardDescription>
                Acompanhe as análises em tempo real e sinais compartilhados diariamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {canAccessPremium ? (
                <TelegramWidget channelUrl="https://t.me/+2XMn1YEjfjYwYTE0" />
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center bg-black/30 rounded-lg">
                  <Lock className="h-16 w-16 text-gold-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Canal VIP Exclusivo</h3>
                  <p className="text-gray-400 mb-4">
                    O acesso ao canal do Telegram é exclusivo para membros VIP ou superiores.
                  </p>
                  <Link href="/member-area">
                    <Button className="bg-gold-600 hover:bg-gold-700 text-black">Upgrade para VIP</Button>
                  </Link>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-400">Atualizado em tempo real</div>
              {canAccessPremium && (
                <a href="https://t.me/+2XMn1YEjfjYwYTE0" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir no Telegram
                  </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle>Benefícios do Canal VIP</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">1</span>
                  </div>
                  <div>
                    <span className="font-medium">Sinais de Trading</span>
                    <p className="text-sm text-gray-400">
                      Receba sinais de trading diariamente para Forex, Criptomoedas e outros mercados.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">2</span>
                  </div>
                  <div>
                    <span className="font-medium">Análises Técnicas</span>
                    <p className="text-sm text-gray-400">
                      Acesse análises detalhadas com gráficos, níveis de suporte e resistência, e alvo de lucro.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">3</span>
                  </div>
                  <div>
                    <span className="font-medium">Atualizações de Mercado</span>
                    <p className="text-sm text-gray-400">
                      Fique por dentro de notícias importantes e eventos que podem impactar o mercado.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-gold-500 text-sm">4</span>
                  </div>
                  <div>
                    <span className="font-medium">Webinars Exclusivos</span>
                    <p className="text-sm text-gray-400">
                      Participe de sessões ao vivo e webinars conduzidos por nossos educadores e especialistas.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quem Pode Acessar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">O acesso ao canal VIP do Telegram está disponível para:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Membros VIP</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Distribuidores</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Educadores</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Lideranças</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Membros Elite</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500 mr-2"></div>
                  <span>Diretores</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {!canAccessPremium && (
                <Link href="/member-area" className="w-full">
                  <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">Upgrade para Acesso VIP</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
