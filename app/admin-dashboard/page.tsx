"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Home, LogOut, Users, Settings, BarChart, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const router = useRouter()

  // Redirecionar se não for autenticado ou admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin-login")
    } else if (!isAdmin) {
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, router])

  // Se não for admin, não mostrar conteúdo
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-[350px] bg-black/50 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
            <CardDescription className="text-center">Esta área é exclusiva para administradores.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Lock className="h-16 w-16 text-gold-500" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/admin-login">
              <Button variant="default" className="bg-gold-600 hover:bg-gold-700 text-black">
                Fazer Login como Admin
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-10 bg-black border-b border-gold-500/30 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gold-500">Painel Administrativo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
                <Home className="h-4 w-4 mr-2" /> Ver Site
              </Button>
            </Link>
            <Button onClick={logout} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user?.name}</h1>
          <p className="text-gray-400">Aqui você pode gerenciar as configurações e conteúdo do site MoreThanMoney.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin-dashboard/user-roles">
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full hover:border-gold-400 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Gerenciar Funções
                </CardTitle>
                <CardDescription>Atribua funções aos membros</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Defina funções como Liderança, Educador, Distribuidor, Membro VIP e muito mais.
                </p>
              </CardContent>
            </Card>
          </Link>

          <div onClick={() => router.push("/admin-dashboard/site-settings")}>
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full hover:border-gold-400 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Configurações do Site
                </CardTitle>
                <CardDescription>Gerencie as configurações gerais do site</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Personalize cores, navegação, seções visíveis e outras configurações do site.
                </p>
              </CardContent>
            </Card>
          </div>

          <div onClick={() => router.push("/admin-dashboard/statistics")}>
            <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full hover:border-gold-400 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Estatísticas
                </CardTitle>
                <CardDescription>Visualize estatísticas da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Acompanhe o desempenho da plataforma, usuários ativos e outras métricas importantes.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Gerenciar Conteúdo
              </CardTitle>
              <CardDescription>Edite o conteúdo do site</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Atualize textos, imagens e outros conteúdos exibidos nas diferentes páginas do site.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
