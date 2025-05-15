"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, User, BookOpen, BarChart2 } from "lucide-react"
import Scanners from "@/components/scanners"
import MoreThanMoneyCourses from "@/components/morethanmoney-courses"

export default function MemberArea() {
  const { user, isAuthenticated, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("courses")

  if (!isAuthenticated) {
    return (
      <section id="member-area" className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Área de Membros
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Faça login para acessar conteúdos exclusivos, suporte e ferramentas avançadas.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    )
  }

  return (
    <section id="member-area" className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Bem-vindo, {user.name}
            </h2>
            <p className="text-gray-300 mt-2">Acesse os recursos exclusivos para membros.</p>
          </div>

          <Button
            onClick={logout}
            variant="outline"
            className="border-gold-500 text-gold-400 hover:bg-gold-500/10 flex items-center gap-2"
          >
            <LogOut size={16} />
            Sair
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-black/50 border border-gold-500/30">
            <TabsTrigger value="courses" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              <BookOpen size={16} className="mr-2" />
              Cursos MoreThanMoney
            </TabsTrigger>
            <TabsTrigger value="scanners" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              <BarChart2 size={16} className="mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              <User size={16} className="mr-2" />
              Perfil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-0">
            <MoreThanMoneyCourses />
          </TabsContent>

          <TabsContent value="scanners" className="mt-0">
            <Scanners />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <div className="bg-black/50 border border-gold-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Informações do Perfil</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Nome de Usuário:</p>
                  <p className="text-white font-medium">{user.username}</p>
                </div>
                <div>
                  <p className="text-gray-400">Nome Completo:</p>
                  <p className="text-white font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status da Assinatura:</p>
                  <p className="text-gold-400 font-medium">Ativo</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
